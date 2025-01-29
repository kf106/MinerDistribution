# Miner Distribution Script

The `blockStats.js` script uses the mempool.space API to sequentially query the data for the last 800 * 15 blocks, storing the blockheight and poolID in a timestamped CSV file.

The `findSeven.js` script scans through the CSV file to find occurrences where seven blocks in a row were found by the same mining pool.

## Installation and use

1. clone the repository
2. install the required packages with `npm install`
3. run the first script with `node blockStats.js`
4. run the second script with `node findSeven.js <csv file>`

You can edit the scripts to scrape more or less data, and to look for different patterns. It's all commented, thanks to CursorAI. I put a 2 second delay between each API call, and it seems this doesn't hit the mempool.space API limit for 800 calls, so that's nice.
