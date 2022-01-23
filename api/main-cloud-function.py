import base64
import io
from PIL import Image, ImageDraw

NOTCH_HEIGHT = 65
TARGET_DEVICE_WIDTH = 3024
TARGET_DEVICE_HEIGHT = 1964

def main(request):
    if request.method != "POST":
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)
    file = request.files["file"]
    image = Image.open(io.BytesIO(file.read()))
    size = image.size
    width = size[0]
    height = size[1]
    ratio = width / height
    if ratio < 1.54:
        # Cropping vertically
        new_height = (width * TARGET_DEVICE_HEIGHT) / TARGET_DEVICE_WIDTH
        new_height_pos = (height - new_height) / 2
        image = image.crop((0, new_height_pos, width, new_height_pos + new_height))
        height = new_height
    else:
        # Cropping horizontally
        new_width = (height * TARGET_DEVICE_WIDTH) / TARGET_DEVICE_HEIGHT
        new_width_pos = (width - new_width) / 2
        image = image.crop((new_width_pos, 0, new_width_pos + new_width, height))
        width = new_width
        pass

    notch_height = (NOTCH_HEIGHT * height) / TARGET_DEVICE_HEIGHT
    rectangle = [(0, 0), width, notch_height]
    masked = ImageDraw.Draw(image)
    masked.rectangle(rectangle, fill="#00000088")

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
