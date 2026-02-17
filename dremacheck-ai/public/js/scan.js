const fileInput = document.getElementById('file-input');
const cameraBtn = document.getElementById('camera-btn');
const cameraVideo = document.getElementById('camera-video');
const captureBtn = document.getElementById('capture-btn');
const previewCanvas = document.getElementById('preview-canvas');
const analyzeBtn = document.getElementById('analyze-btn');
const loading = document.getElementById('loading');

let stream;
let capturedImageData;

// Handle file upload
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      displayImage(reader.result);
    };
    reader.readAsDataURL(file);
  }
});

// Handle camera
cameraBtn.addEventListener('click', async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    cameraVideo.srcObject = stream;
    cameraVideo.style.display = 'block';
    captureBtn.style.display = 'block';
    cameraVideo.play();
  } catch (err) {
    alert('Camera access denied or not available.');
  }
});

// Capture image from camera
captureBtn.addEventListener('click', () => {
  const ctx = previewCanvas.getContext('2d');
  previewCanvas.width = cameraVideo.videoWidth;
  previewCanvas.height = cameraVideo.videoHeight;
  ctx.drawImage(cameraVideo, 0, 0);
  capturedImageData = previewCanvas.toDataURL();
  displayImage(capturedImageData);
  stream.getTracks().forEach(track => track.stop());
  cameraVideo.style.display = 'none';
  captureBtn.style.display = 'none';
});

// Display image on canvas
function displayImage(dataUrl) {