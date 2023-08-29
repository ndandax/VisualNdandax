$(document).ready(function() {
    $("html").css("background-color", "#000010");
    $("body").css("color", "#FFFFFF");
    $(".title1").css("font-family", "Roboto, sans-serif");
     
    const $textPrompt = $("#text-prompt");
    const $generateButton = $("#generate-button");

    // Set the initial height and the minimum height
    const minHeight = 40; // Adjust as needed

    // Update the input's height as new lines are added
    $textPrompt.on("input", function() {
        // Temporarily set height to auto to calculate the scroll height
        $textPrompt.css("height", "auto");

        // Get the scroll height of the content
        const scrollHeight = this.scrollHeight;

        // Reset the height to its default
        $textPrompt.css("height", minHeight + "px");

        // Update the input's height
        if (scrollHeight > minHeight) {
            $textPrompt.css("height", scrollHeight + "px");
        }
    });

    // Function to update button text and disable/enable during generation
    function updateButtonState(isGenerating) {
        if (isGenerating) {
            $generateButton.prop("disabled", true);
            $generateButton.text("Generating, please wait...");
            $generateButton.css("background-color", "green"); // Change button color to green
        } else {
            $generateButton.prop("disabled", false);
            $generateButton.text("Generate Image");
            $generateButton.css("background-color", ""); // Reset button color
        }
    }

    $("#generate-button").click(function() {
        updateButtonState(true); // Change button text and disable
        // Your image generation logic here

        // Simulate a delay (replace with actual image generation)
        setTimeout(function() {
            updateButtonState(false); // Restore button text and enable
            // Handle the image response
        }, 3000); // Replace 3000 with the actual time it takes to generate the image
    });
      
});

//$("#text-prompt").on("input", function() {
  //  $(this).css("height", Math.min($(this).prop("scrollHeight"), 100) + "px");
  //});
  