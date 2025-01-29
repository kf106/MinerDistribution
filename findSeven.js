// Import the required modules
const fs = require('fs');

// Function to read the file and find consecutive pool IDs
function findConsecutivePoolId(filename) {
    try {
        // Read the file synchronously
        const data = fs.readFileSync(filename, 'utf8');
        
        // Split the data into lines
        const lines = data.split('\n').filter(line => line.trim() !== '');
        
        let consecutiveCount = 1; // Counter for consecutive pool IDs
        let lastPoolId = null; // Store the last pool ID
        let results = []; // Array to store block heights and pool IDs for results

        // Iterate through the lines
        for (let i = 0; i < lines.length; i++) {
            const [blockHeight, poolId] = lines[i].split(',').map(item => item.trim());

            // Check if the current pool ID matches the last one
            if (poolId === lastPoolId) {
                consecutiveCount++;
            } else {
                consecutiveCount = 1; // Reset the counter
            }

            // Update the last pool ID
            lastPoolId = poolId;

            // Check if we have found seven consecutive pool IDs
            if (consecutiveCount === 7) {
                results.push({ blockHeight, poolId }); // Store the block height and pool ID
            }
        }

        // Output the results
        if (results.length > 0) {
            results.forEach(result => {
                console.log(`Block height: ${result.blockHeight}, Pool ID: ${result.poolId}`);
            });
        } else {
            console.log('No consecutive pool ID found for seven lines in a row.');
        }
    } catch (error) {
        console.error('Error reading the file:', error);
    }
}

// Get the filename from command line arguments
const filename = process.argv[2];

// Check if the filename is provided
if (!filename) {
    console.error('Please provide a filename as a command line argument.');
    process.exit(1);
}

// Call the function with the provided filename
findConsecutivePoolId(filename);