// FORM ADDING

document.getElementById("form-add-btn").addEventListener("click", function () {
    const formContainer = document.getElementById("add-form-content");
    const clone = formContainer.cloneNode(true);
    formContainer.parentNode.appendChild(clone);
});


// FORM WIZARD

let currentStep = 1;

function nextStep(step) {
    document.getElementById(`step-${step}`).classList.remove('active');
    document.getElementById(`step-${step + 1}`).classList.add('active');
    currentStep = step + 1;
}

function prevStep(step) {
    document.getElementById(`step-${step}`).classList.remove('active');
    document.getElementById(`step-${step - 1}`).classList.add('active');
    currentStep = step - 1;
}

document.getElementById('wizard-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Form submitted successfully!');
});


// DISPLAY THE SELECTED IMAGE NAME

// function displaySelectedFile() {
//     const fileInput = document.getElementById("signature-upload-box");
//     const selectedFile = document.getElementById("selected-file");

//     if (fileInput.files.length > 0) {
//         const fileName = fileInput.files[0].name;
//         selectedFile.textContent = "Selected file: " + fileName;
//     } else {
//         selectedFile.textContent = "";
//     }
// }