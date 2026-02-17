const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Mock API endpoint for image analysis
app.post('/analyze', (req, res) => {
  // Simulate processing delay
  setTimeout(() => {
    const risks = ['Low Risk', 'Medium Risk', 'High Risk'];
    const explanations = {
      'Low Risk': 'The spot appears benign based on general patterns. Monitor for changes.',
      'Medium Risk': 'Some features suggest potential concern. Regular check-ups are advised.',
      'High Risk': 'Features indicate possible malignancy. Immediate professional evaluation is recommended.'
    };
    const recommendations = {
      'Low Risk': 'Continue self-monitoring and maintain skin health.',
      'Medium Risk': 'Consult a dermatologist within a few weeks.',
      'High Risk': 'Seek urgent medical attention from a dermatologist.'
    };
    const randomRisk = risks[Math.floor(Math.random() * risks.length)];
    res.json({
      risk: randomRisk,
      explanation: explanations[randomRisk],
      recommendation: recommendations[randomRisk]
    });
  }, 2000); // 2-second delay to simulate processing
});

// Start server
app.listen(PORT, () => {
  console.log(`DermaCheck AI server running at http://localhost:${PORT}`);
});