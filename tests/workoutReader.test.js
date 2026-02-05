const path = require('path');
const fs = require('fs');
const { fileReader, workoutCalculator } = require('../workoutReader');

const TEST_CSV_FILE = path.join(__dirname, 'test-sales.csv');
// Create test CSV data
const testCsvData = `date,exercise,duration,calories
2024-01-15,Running,21,435
2024-01-16,Swimming,69,500
2024-01-17,Rock Climbing,67,220`;

const emptyCsvData = `date,exercise,duration,calories`;

beforeAll(async () => {
    // Create test files before running tests
    fs.writeFileSync(TEST_CSV_FILE, testCsvData);
});

describe('CSV workout data processing', () => { 
    test('reads and processes valid CSV file', 
async () => { 
        const result = await 
     workoutCalculator(TEST_CSV_FILE); 
        expect(result).not.toBeNull(); 
        expect(result.workoutLength).toBe(3); 
        expect(result.workoutTime).toBe(157); 
  }); 

      test('workoutCalculator returns correct data structure', async () => { 
          const data = await 
      workoutCalculator(TEST_CSV_FILE);
        expect(Array.isArray(data.workoutData)).toBe(true);
        expect(data.workoutData).toHaveLength(3); 
        expect(data.workoutData[0]).toHaveProperty('date'); 
        expect(data.workoutData[0]).toHaveProperty('calories'); 
        expect(data.workoutData[0]).toHaveProperty('duration');
    }); 
});



afterAll(async () => {
    // Clean up test files after tests complete
    try {
        fs.unlinkSync(TEST_CSV_FILE);
    } catch {
        // It's okay if files don't exist
    }
});