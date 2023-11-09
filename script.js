document.addEventListener("DOMContentLoaded", function () {
  const imageInput = document.getElementById("imageInput");
  const colorCodesContainer = document.getElementById("colorCodes");
  const getColorButton = document.getElementById("getColorButton");
  const imagePreview = document.getElementById("imagePreview");

  document
    .querySelector(".image-input-container")
    .addEventListener("click", function () {
      imageInput.click();
    });

  imageInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      document.querySelector(".text-gray-500").textContent = fileName;

      const reader = new FileReader();
      reader.onload = function () {
        imagePreview.src = reader.result;
        imagePreview.classList.remove("hidden");
      };
      reader.readAsDataURL(file);
    }
  });

  getColorButton.addEventListener("click", function () {
    const file = imageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        const image = new Image();
        image.src = reader.result;

        image.onload = function () {
          const colorThief = new ColorThief();
          const colorPalette = colorThief.getPalette(image, 10);

          colorCodesContainer.innerHTML = "";
          colorPalette.forEach((color) => {
            const colorBox = document.createElement("div");
            colorBox.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            colorBox.style.width = "50px";
            colorBox.style.height = "50px";
            colorBox.classList.add("rounded", "shadow", "color-code");
            colorBox.setAttribute(
              "data-clipboard-text",
              `rgb(${color[0]}, ${color[1]}, ${color[2]})`
            );
            colorBox.addEventListener("click", copyColorCode);

            colorCodesContainer.appendChild(colorBox);
          });
        };
      };
      reader.readAsDataURL(file);
    }
  });

  function copyColorCode(event) {
    const colorCode = event.target.getAttribute("data-clipboard-text");

    try {
      navigator.clipboard.writeText(colorCode);
      const copyMessage = document.createElement("div");
      copyMessage.innerText = "Color code copied!";
      copyMessage.classList.add(
        "bg-green-300",
        "text-green-900",
        "text-sm",
        "py-2",
        "px-4",
        "rounded",
        "absolute",
        "bottom-0",
        "right-0",
        "mr-6",
        "mb-6"
      );
      document.body.appendChild(copyMessage);

      setTimeout(() => copyMessage.remove(), 2000);
    } catch (error) {
      console.error("Failed to copy color code:", error);
    }
  }
});
