const textPromptInput = document.getElementById('text-prompt');
const generateButton = document.getElementById('generate-button');
const imageContainer = document.getElementById('image-container');

generateButton.addEventListener('click', async () => {
    const textPrompt = textPromptInput.value;

    const response = await fetch('/generate_image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text_prompt: textPrompt })
    });

    const data = await response.json();
    console.log('Response JSON:', data);

    const imageUrl = `/get_image/${data.image_filename}`;
    console.log('Image URL:', imageUrl);

    imageContainer.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
});
