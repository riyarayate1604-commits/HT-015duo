// scan.js (original with errors)
// Errors: No try-catch for async, 'results' might be undefined if scan fails, loop doesn't handle empty array properly.

async function performScan(targets) {
    let results = [];
    for (let i = 0; i < targets.length; i++) {  // Potential infinite loop if targets is not an array
        const result = await scanTarget(targets[i]);  // No error handling
        results.push(result);
    }
    return results;  // 'results' could be undefined if an error occurs
}

function scanTarget(target) {
    // Simulate a scan (e.g., check if a file exists or has issues)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name: target, status: 'Scanned', details: 'OK' });
        }, 100);
    });
}


// Usage: performScan(['file1.txt', 'file2.txt']).then(console.log);
// Handle analyze button
analyzeBtn.addEventListener('click', async () => {
  if (!capturedImageData) {
    alert("Please upload or capture an image first.");
    return;
  }

  loading.style.display = "block";

  try {
    const response = await fetch('/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: capturedImageData })
    });

    const result = await response.json();
    localStorage.setItem("analysisResult", JSON.stringify(result));
    window.location.href = "results.html";

  } catch (error) {
    alert("Error analyzing image.");
  }

  loading.style.display = "none";
});

