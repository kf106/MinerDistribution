// Import the required modules
const axios = require('axios');

// Function to find a pool by its ID
async function findPoolById(poolId) {
    try {
        // Make the API call to get the pools
        const response = await axios.get('https://mempool.space/api/v1/mining/pools/3y');
        
        // Get the array of pools from the response
        const pools = response.data.pools;

        // Search for the pool with the specified poolId
        const pool = pools.find(p => p.poolUniqueId === poolId);

        // Output the result
        if (pool) {
            console.log(pool); // Print the entire pool entry
        } else {
            console.log(`No pool found with ID: ${poolId}`);
        }
    } catch (error) {
        console.error('Error fetching data from the API:', error);
    }
}

// Get the poolId from command line arguments
const poolIdArg = process.argv[2];

// Check if the poolId is provided
if (!poolIdArg) {
    console.error('Please provide a pool ID as a command line argument.');
    process.exit(1);
}

// Convert the poolId argument to a number
const poolId = parseInt(poolIdArg, 10);

// Call the function with the provided poolId
findPoolById(poolId);
