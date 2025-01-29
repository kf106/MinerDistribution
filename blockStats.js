// Import the axios library
const axios = require('axios');
// Import the fs module
const fs = require('fs');

// Define the initial block number
let blockNumber = 881300; // Change this number as needed
const iterations = 800; // Number of API calls to make
const delay = 2000; // Delay in milliseconds (5 seconds)

// Function to format the current date and time
function getFormattedDate() {
    const now = new Date();
    return now.toISOString().replace(/:/g, '-').split('.')[0]; // Format: YYYY-MM-DDTHH-MM-SS
}

// Function to fetch data from the API
async function fetchData() {
    try {
        // Create a filename with the current date and time
        const timestamp = getFormattedDate();
        const filename = `blockStatsOutput_${timestamp}.txt`;

        // Prepare the output string
        let output = '';

        for (let i = 0; i < iterations; i++) {
            // Define the API endpoint using the current block number
            const apiUrl = `https://mempool.space/api/v1/blocks/${blockNumber}`;
            
            // Make the API call
            const response = await axios.get(apiUrl);
            
            // Check for HTTP 429 error
            if (response.status === 429) {
                console.error('HTTP 429: Too Many Requests. Exiting...');
                return; // Exit the function
            }

            // Check if no data is returned
            if (!response.data || response.data.length === 0) {
                console.error('No data returned. Exiting...');
                return; // Exit the function
            }

            // Sort the data by height in descending order
            const sortedData = response.data.sort((a, b) => b.height - a.height);
            
            // Iterate through the sorted array and extract height and extras.pool.id
            sortedData.forEach(item => {
                const height = item.height;
                const poolId = item.extras?.pool?.id; // Optional chaining to avoid errors
                output += `${height},${poolId}\n`; // Comma-separated format
            });

            // Write the output to the file after each iteration
            fs.appendFileSync(filename, output);
            console.log(`Data written to ${filename} for block number ${blockNumber}`);

            // Clear the output for the next iteration
            output = '';

            // Decrease the block number by 15 for the next iteration
            blockNumber -= 15;

            // Wait for the specified delay before the next API call
            if (i < iterations - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    } catch (error) {
        // Handle any other errors
        console.error('Error fetching data:', error);
    }
}

// Call the function to fetch data
fetchData();