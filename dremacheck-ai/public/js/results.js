// results.js
// This file handles displaying and processing scan results.
// Assumes results are an array of objects with properties like 'name', 'status', and 'details'.

class ResultsHandler {
    constructor(resultsContainerId) {
        this.container = document.getElementById(resultsContainerId);
        if (!this.container) {
            throw new Error(`Container element with ID '${resultsContainerId}' not found.`);
        }
    }

    // Process and display results
    displayResults(results) {
        if (!Array.isArray(results)) {
            console.error('Results must be an array.');
            return;
        }

        this.container.innerHTML = ''; // Clear previous results

        results.forEach((result, index) => {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result-item';
            resultDiv.innerHTML = `
                <h3>Result ${index + 1}: ${result.name || 'Unnamed'}</h3>
                <p>Status: ${result.status || 'Unknown'}</p>
                <p>Details: ${result.details || 'No details available'}</p>
            `;
            this.container.appendChild(resultDiv);
        });

        console.log(`Displayed ${results.length} results.`);
    }

    // Export results to JSON (for download or further processing)
    exportResults(results) {
        const dataStr = JSON.stringify(results, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'results.json';
        link.click();
        URL.revokeObjectURL(url);
    }
}

// Example usage (in another file or script):
// const handler = new ResultsHandler('results-container');
// handler.displayResults([{ name: 'File1', status: 'Clean', details: 'No issues' }]);
// Load result from localStorage
const data = localStorage.getItem("analysisResult");

if (data) {
  const result = JSON.parse(data);

  document.getElementById("risk").textContent = result.risk;
  document.getElementById("explanation").textContent = result.explanation;
  document.getElementById("recommendation").textContent = result.recommendation;
} else {
  document.body.innerHTML += "<p>No analysis result found. Please scan again.</p>";
}
