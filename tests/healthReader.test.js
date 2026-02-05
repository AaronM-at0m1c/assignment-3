const path = require('path'); 
const fs = require('fs/promises'); 
const { healthMetricsCounter } = require('../healthReader.js');

const TEST_FILE = path.join(__dirname, '../test-health-data.json');
const testData = {
    user: 'TestUser', 
    metrics: [
    { 
        date: '2024-01-01', 
        type: 'Sleep', 
        duration: 10.0
    }], 
}; 

beforeAll(async () => { 
    await fs.writeFile(TEST_FILE, JSON.stringify(testData)); 
});

describe('healthMetricsCounter', () => { 
    test('reads a valid JSON file and returns expected data structure', async () => { 
          const result = await 
    healthMetricsCounter(TEST_FILE); 
          expect(result).not.toBeNull();
          expect(result.user).toBe('TestUser');
          expect(result.metrics).toHaveLength(1); 
          expect(result.metrics[0].type).toBe('Sleep'); 
    }); 

    test('returns proper error when the file is missing', 
    async () => { 
         const result = await
    healthMetricsCounter('missing.json'); 
          expect(result.error).toBe('Health data file not found: check the file path');
    }); 
});

afterAll(async () => {
    try {
        await fs.unlink(TEST_FILE);
    } catch {
    }
});