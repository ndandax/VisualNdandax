$(document).ready(function() {
    $("html").css("background-color", "#000000");
    $("body").css("color", "#FFFFFF");
    $(".title1").css("font-family", "Roboto, sans-serif")

    const $textPrompt = $("#text-prompt");
    const minHeight = 30;
    const maxHeight = 100;

    $textPrompt.on("input", function() {
        const inputHeight = Math.min(maxHeight, Math.max(minHeight, this.value.length * 10));
        const scrollHeight = this.scrollHeight; // Get the scroll height of the content

        // Set both the height and scrollHeight of the input box
        $(this).height(inputHeight).css("overflow-y", scrollHeight > inputHeight ? "scroll" : "hidden");
    });
});