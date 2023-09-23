
// SECOND APPLICANT
document.addEventListener("DOMContentLoaded", function () {
    const showApplicantCheckbox = document.getElementById("showApplicantCheckbox");
    const hiddenApplicant = document.getElementById("hiddenApplicant");

    showApplicantCheckbox.addEventListener("change", function () {
        if (showApplicantCheckbox.checked) {
            hiddenApplicant.style.display = "block";
        } else {
            hiddenApplicant.style.display = "none";
        }
    });
});



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


// PROFILE PHOTO 1

const profile_img1 = document.getElementById("profile-img-upload-1");
const profile_imgLabel1 = document.querySelector('.profil-img-box-1 label');
const profile_selectedImage1 = document.getElementById("profile-select-img");
const profile_changeButton1 = document.getElementById("profileimg-btn");
profile_img1.addEventListener("change", function () {
    if (profile_img1.files.length > 0) {
        const file = profile_img1.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = document.createElement("img");
            img.src = event.target.result;
            img.classList.add("img-fluid");
            profile_imgLabel1.innerHTML = "";
            profile_imgLabel1.appendChild(img);
            profile_changeButton1.style.display = 'block';
            profile_imgLabel1.style.display = 'none';
            profile_selectedImage1.innerHTML = "";
            profile_selectedImage1.appendChild(img);
        };

        reader.readAsDataURL(file);
    } else {
        profile_imgLabel1.innerHTML = '<img class="img-fluid" src="assets/images/upload.png" alt=""><span>Upload Signature</span>';
        profile_imgLabel1.style.display = 'block';
        profile_changeButton1.style.display = 'none';
        profile_selectedImage1.innerHTML = "";
    }
});

profile_changeButton1.addEventListener("click", function () {
    profile_img1.click();
});

// PROFILE PHOTO 2

const profile_img2 = document.getElementById("profile-img-upload-2");
const profile_imgLabel2 = document.querySelector('.profile-img-box-2 label');
const profile_selectedImage2 = document.getElementById("profile-select-img2");
const profile_changeButton2 = document.getElementById("profileimg-btn2");

profile_img2.addEventListener("change", function () {
    if (profile_img2.files.length > 0) {
        const file = profile_img2.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const img = document.createElement("img");
            img.src = event.target.result;
            img.classList.add("img-fluid");

            // Replace the existing image with the uploaded image
            profile_imgLabel2.innerHTML = ""; // Clear the label content
            profile_imgLabel2.appendChild(img); // Append the uploaded image

            // Show the "Change" button and hide the label (image)
            profile_changeButton2.style.display = 'block';
            profile_imgLabel2.style.display = 'none';

            // Display the uploaded image below the button
            profile_selectedImage2.innerHTML = "";
            profile_selectedImage2.appendChild(img);
        };

        reader.readAsDataURL(file);
    } else {
        profile_imgLabel2.innerHTML = '<img class="img-fluid" src="assets/images/upload.png" alt=""><span>Upload profile</span>';
        profile_imgLabel2.style.display = 'block';
        profile_changeButton2.style.display = 'none';
        profile_selectedImage2.innerHTML = "";
    }
});

profile_changeButton2.addEventListener("click", function () {
    profile_img2.click();
});



// UPLOAD AADHAAR

const aadharFileInput1 = document.getElementById("aadhar-file-upload-input1");
const aadharFileLabel1 = document.querySelector('.aadhar-file-upload1 label');
const aadharSelectedFile1 = document.getElementById("aadhar-selected-file1");
const aadharFileChangeBtn1 = document.getElementById("aadhar-file-change-btn1");

aadharFileInput1.addEventListener("change", function () {
    if (aadharFileInput1.files.length > 0) {
        const file = aadharFileInput1.files[0];

        if (file.type === 'application/pdf') {
            // Handle PDF file
            const reader = new FileReader();

            reader.onload = function (event) {
                const pdfData = new Uint8Array(event.target.result);
                pdfjsLib.getDocument({ data: pdfData }).promise
                    .then(function (pdfDoc) {
                        // Display the first page of the PDF as an image
                        return pdfDoc.getPage(1);
                    })
                    .then(function (page) {
                        const canvas = document.createElement("canvas");
                        const context = canvas.getContext("2d");
                        const viewport = page.getViewport({ scale: 1 });
                        canvas.width = viewport.width;
                        canvas.height = viewport.height;

                        const renderContext = {
                            canvasContext: context,
                            viewport: viewport,
                        };

                        page.render(renderContext).promise
                            .then(function () {
                                const pdfImage = document.createElement("img");
                                pdfImage.src = canvas.toDataURL("image/png");
                                pdfImage.classList.add("img-fluid");

                                // Replace the existing image with the PDF image
                                aadharFileLabel1.innerHTML = ""; // Clear the label content
                                aadharFileLabel1.appendChild(pdfImage); // Append the PDF image

                                // Show the "Change" button and hide the label (image)
                                aadharFileChangeBtn1.style.display = 'block';
                                aadharFileLabel1.style.display = 'none';

                                // Display the uploaded PDF image below the button
                                aadharSelectedFile1.innerHTML = "";
                                aadharSelectedFile1.appendChild(pdfImage);
                            });
                    });
            };

            reader.readAsArrayBuffer(file);
        } else {
            // Handle non-PDF files (e.g., images)
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.classList.add("img-fluid");

            // Replace the existing image with the uploaded image
            aadharFileLabel1.innerHTML = ""; // Clear the label content
            aadharFileLabel1.appendChild(img); // Append the uploaded image

            // Show the "Change" button and hide the label (image)
            aadharFileChangeBtn1.style.display = 'block';
            aadharFileLabel1.style.display = 'none';

            // Display the uploaded image below the button
            aadharSelectedFile1.innerHTML = "";
            aadharSelectedFile1.appendChild(img);
        }
    } else {
        aadharFileLabel1.innerHTML = '<img class="img-fluid" src="assets/images/upload.png" alt=""><span>Upload File</span>';
        aadharFileLabel1.style.display = 'block';
        aadharFileChangeBtn1.style.display = 'none';
        aadharSelectedFile1.innerHTML = "";
    }
});

aadharFileChangeBtn1.addEventListener("click", function () {
    aadharFileInput1.click();
});

// UPLOAD AADHAR 2

const aadharFileInput2 = document.getElementById("aadhar-file-upload-input2");
const aadharFileLabel2 = document.querySelector('.aadhar-file-upload2 label');
const aadharSelectedFile2 = document.getElementById("aadhar-selected-file2");
const aadharFileChangeBtn2 = document.getElementById("aadhar-file-change-btn2");

aadharFileInput2.addEventListener("change", function () {
    if (aadharFileInput2.files.length > 0) {
        const file = aadharFileInput2.files[0];

        if (file.type === 'application/pdf') {
            // Handle PDF file
            const reader = new FileReader();

            reader.onload = function (event) {
                const pdfData = new Uint8Array(event.target.result);
                pdfjsLib.getDocument({ data: pdfData }).promise
                    .then(function (pdfDoc) {
                        // Display the first page of the PDF as an image
                        return pdfDoc.getPage(1);
                    })
                    .then(function (page) {
                        const canvas = document.createElement("canvas");
                        const context = canvas.getContext("2d");
                        const viewport = page.getViewport({ scale: 1 });
                        canvas.width = viewport.width;
                        canvas.height = viewport.height;

                        const renderContext = {
                            canvasContext: context,
                            viewport: viewport,
                        };

                        page.render(renderContext).promise
                            .then(function () {
                                const pdfImage = document.createElement("img");
                                pdfImage.src = canvas.toDataURL("image/png");
                                pdfImage.classList.add("img-fluid");

                                // Replace the existing image with the PDF image
                                aadharFileLabel2.innerHTML = ""; // Clear the label content
                                aadharFileLabel2.appendChild(pdfImage); // Append the PDF image

                                // Show the "Change" button and hide the label (image)
                                aadharFileChangeBtn2.style.display = 'block';
                                aadharFileLabel2.style.display = 'none';

                                // Display the uploaded PDF image below the button
                                aadharSelectedFile2.innerHTML = "";
                                aadharSelectedFile2.appendChild(pdfImage);
                            });
                    });
            };

            reader.readAsArrayBuffer(file);
        } else {
            // Handle non-PDF files (e.g., images)
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.classList.add("img-fluid");

            // Replace the existing image with the uploaded image
            aadharFileLabel2.innerHTML = ""; // Clear the label content
            aadharFileLabel2.appendChild(img); // Append the uploaded image

            // Show the "Change" button and hide the label (image)
            aadharFileChangeBtn2.style.display = 'block';
            aadharFileLabel2.style.display = 'none';

            // Display the uploaded image below the button
            aadharSelectedFile2.innerHTML = "";
            aadharSelectedFile2.appendChild(img);
        }
    } else {
        aadharFileLabel2.innerHTML = '<img class="img-fluid" src="assets/images/upload.png" alt=""><span>Upload File</span>';
        aadharFileLabel2.style.display = 'block';
        aadharFileChangeBtn2.style.display = 'none';
        aadharSelectedFile2.innerHTML = "";
    }
});

aadharFileChangeBtn2.addEventListener("click", function () {
    aadharFileInput2.click();
});


// SIGNATURE UPLOAD

const signature_img1 = document.getElementById("signature-img-upload-1");
const signature_imgLabel1 = document.querySelector('.signature-img-box-1 label');
const signature_selectedImage1 = document.getElementById("signature-select-img");
const signature_changeButton1 = document.getElementById("signatureimg-btn1");

signature_img1.addEventListener("change", function () {
    if (signature_img1.files.length > 0) {
        const file = signature_img1.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const img = document.createElement("img");
            img.src = event.target.result;
            img.classList.add("img-fluid");

            // Replace the existing image with the uploaded image
            signature_imgLabel1.innerHTML = ""; // Clear the label content
            signature_imgLabel1.appendChild(img); // Append the uploaded image

            // Show the "Change" button and hide the label (image)
            signature_changeButton1.style.display = 'block';
            signature_imgLabel1.style.display = 'none';

            // Display the uploaded image below the button
            signature_selectedImage1.innerHTML = "";
            signature_selectedImage1.appendChild(img);
        };

        reader.readAsDataURL(file);
    } else {
        signature_imgLabel1.innerHTML = '<img class="img-fluid" src="assets/images/upload.png" alt=""><span>Upload Signature</span>';
        signature_imgLabel1.style.display = 'block';
        signature_changeButton1.style.display = 'none';
        signature_selectedImage1.innerHTML = "";
    }
});

signature_changeButton1.addEventListener("click", function () {
    signature_img1.click();
});


// SIGNATURE UPLOAD 2

const signature_img2 = document.getElementById("signature-img-upload-2");
const signature_imgLabel2 = document.querySelector('.signature-img-box-2 label');
const signature_selectedImage2 = document.getElementById("signature-select-img2");
const signature_changeButton2 = document.getElementById("signatureimg-btn2");

signature_img2.addEventListener("change", function () {
    if (signature_img2.files.length > 0) {
        const file = signature_img2.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const img = document.createElement("img");
            img.src = event.target.result;
            img.classList.add("img-fluid");

            // Replace the existing image with the uploaded image
            signature_imgLabel2.innerHTML = ""; // Clear the label content
            signature_imgLabel2.appendChild(img); // Append the uploaded image

            // Show the "Change" button and hide the label (image)
            signature_changeButton2.style.display = 'block';
            signature_imgLabel2.style.display = 'none';

            // Display the uploaded image below the button
            signature_selectedImage2.innerHTML = "";
            signature_selectedImage2.appendChild(img);
        };

        reader.readAsDataURL(file);
    } else {
        signature_imgLabel2.innerHTML = '<img class="img-fluid" src="assets/images/upload.png" alt=""><span>Upload Signature</span>';
        signature_imgLabel2.style.display = 'block';
        signature_changeButton2.style.display = 'none';
        signature_selectedImage2.innerHTML = "";
    }
});

signature_changeButton2.addEventListener("click", function () {
    signature_img2.click();
});