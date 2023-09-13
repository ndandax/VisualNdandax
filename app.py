"""This is the main flask app for genereration of images using stable diffusion"""
from flask import Flask, request, send_from_directory, jsonify, render_template
import requests
import base64
import os

app = Flask(__name__, static_folder='static')

engine_id = "stable-diffusion-v1-5"
api_host = os.getenv('API_HOST', 'https://api.stability.ai')
api_key = ""

if api_key is None:
    raise Exception("Missing Stability API key.")

@app.route('/', strict_slashes=False)
def index():
    return render_template('index.html')

@app.route('/generate_image', methods=['POST'], strict_slashes=False)
def generate_image():
    # Get the text prompt from the request
    text_prompt = request.json.get('text_prompt')

    response = requests.post(
        f"{api_host}/v1/generation/{engine_id}/text-to-image",
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": f"Bearer {api_key}"
        },
        json={
            "text_prompts": [
                {
                    "text": text_prompt
                }
            ],
            "cfg_scale": 10,
            "clip_guidance_preset": "SLOW",
            "height": 512,
            "width": 512,
            "samples": 1,
            "steps": 30,
        },
    )

    if response.status_code != 200:
        return jsonify({'error': 'Something went wrong while generating the image.'}), 500

    data = response.json()

    # Create the 'out' directory if it doesn't exist
    os.makedirs('out', exist_ok=True)

    # Save the generated image to the 'out' directory
    text_prompt_short = text_prompt[:40]
    for i, image in enumerate(data["artifacts"]):
        image_filename = f'v1_txt2img_{text_prompt_short}_{i}.png'
        with open(f"./out/{image_filename}", "wb") as f:
            f.write(base64.b64decode(image["base64"]))

    return jsonify({'image_filename': image_filename})

@app.route('/get_image/<image_filename>', strict_slashes=False)
def get_image(image_filename):
    return send_from_directory('out', image_filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000')
