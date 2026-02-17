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