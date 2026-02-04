const fs = require('fs');
const csv = require('csv-parser');

async function fileReader(file) {

    //Wrap in promise for async functionality
    return new Promise((resolve, reject) => {
        const results = [];
        
        //Read csv file from filesystem
        const stream = fs.createReadStream(file);

        //Catch errors on the filestream so 'file not found' error handling will work
        stream.on('error', (error) => {
            reject(error);
        });

        //CSV stream
        stream
            .pipe(csv())
            .on('data', (row) => {
                results.push(row);
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

//Function to calculate information about loaded workout file
async function workoutCalculator(file) {
    try {

    //Read csv file
    const workoutData = await fileReader(file)
    
    //Calculate number of loaded workouts
    const workoutLength = workoutData.length;
    
    //Calculate total workout minutes
    let workoutTime = 0
    for (let i = 0; i < workoutLength; i++) {
        const workout = workoutData[i];
        workoutTime += parseFloat(workout.duration);
    }

    //Print and return calculations
    console.log('Workouts loaded:', workoutLength);
    console.log('Total workout duration:', workoutTime, 'minutes');
    return { workoutLength, workoutTime };

    } catch(error) {

        if (error.code === 'ENOENT') { 
            console.log('CSV file not found check the file path'); 
        } else { 
            console.log('Error processing CSV file:', error.message); 
        } 
        return null;

    }
}

//Execute function
workoutCalculator('./data/workouts.csv')