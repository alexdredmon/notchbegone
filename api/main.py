from flask import jsonify, send_file
import base64
import io
from PIL import Image, ImageDraw

DEFAULT_DEVICE = "laptop"
DEFAULT_MODEL = "14"
DEFAULT_OPACITY = 75
TARGET_DEVICES = {
    # (width, height, notch_height)
    "laptop": {
        "14": (3024, 1964, 65),
        "16": (3456, 2234, 65),
    },
    "phone": {
        "13": (1170, 2532, 100),
        "12": (1170, 2532, 100),
        "11": (828, 1792, 100),
    }
}
TINT_COLOR = (0, 0, 0)

def action(request):
    if request.method != "POST":
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return (jsonify(''), 204, headers)
    opacity = int((int(request.form.get("opacity")) or DEFAULT_OPACITY) / 100 * 255)
    device = request.form.get("device") or DEFAULT_DEVICE
    model = request.form.get("model") or DEFAULT_MODEL

    target_device = TARGET_DEVICES.get(device).get(model)
    TARGET_DEVICE_WIDTH = target_device[0]
    TARGET_DEVICE_HEIGHT = target_device[1]
    NOTCH_HEIGHT = target_device[2]

    file = request.files["file"]
    image = Image.open(io.BytesIO(file.read()))
    image = image.convert("RGBA")
    size = image.size
    width = size[0]
    height = size[1]
    ratio = width / height
    target_ratio = TARGET_DEVICE_WIDTH / TARGET_DEVICE_HEIGHT
    if ratio < target_ratio:
        # Cropping vertically
        new_height = (width * TARGET_DEVICE_HEIGHT) / TARGET_DEVICE_WIDTH
        new_height_pos = (height - new_height) / 2
        image = image.crop((0, new_height_pos, width, new_height_pos + new_height))
        height = int(new_height)
    else:
        # Cropping horizontally
        new_width = (height * TARGET_DEVICE_WIDTH) / TARGET_DEVICE_HEIGHT
        new_width_pos = (width - new_width) / 2
        image = image.crop((new_width_pos, 0, new_width_pos + new_width, height))
        width = int(new_width)

    notch_height = (NOTCH_HEIGHT * height) / TARGET_DEVICE_HEIGHT

    overlay = Image.new('RGBA', image.size, TINT_COLOR+(0,))
    draw = ImageDraw.Draw(overlay)
    draw.rectangle(
        (
            (0, 0),
            (width, notch_height)
        ),
        fill=TINT_COLOR+(opacity,)
    )

    image = Image.alpha_composite(image, overlay)
    image = image.convert("RGB")

    modified = io.BytesIO()
    image.save(modified, format='JPEG')
    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    return (
        jsonify({
            "image": base64.b64encode(modified.getvalue()).decode('utf-8'),
        }),
        200,
        headers,
    )
