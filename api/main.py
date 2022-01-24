import base64
import io
from PIL import Image, ImageDraw

DEFAULT_OPACITY = 75
NOTCH_HEIGHT = 65
TARGET_DEVICE_WIDTH = 3024
TARGET_DEVICE_HEIGHT = 1964
TINT_COLOR = (0, 0, 0)

def action(request):
    if request.method != "POST":
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)
    opacity = int((int(request.form.get("opacity")) or DEFAULT_OPACITY) / 100 * 255)
    file = request.files["file"]
    image = Image.open(io.BytesIO(file.read()))
    image = image.convert("RGBA")
    size = image.size
    width = size[0]
    height = size[1]
    ratio = width / height
    if ratio < 1.54:
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
        {
            "image": base64.b64encode(modified.getvalue()).decode('utf-8'),
        },
        200,
        headers,
    )
