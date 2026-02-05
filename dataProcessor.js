require('dotenv').config();
const { fileReader, workoutCalculator }  = require("./workoutReader.js");
const { healthMetricsCounter } = require("./healthReader.js");

async function processFiles() {

    try {

    //Process workout data
    console.log("Processing health data for:", process.env.USER_NAME);
    console.log("Reading workout data...");
    const workoutdata = await workoutCalculator('./data/workouts.csv');

    //Process health data
    console.log("Reading health data...");
    const healthdata = await healthMetricsCounter('./data/health-metrics.json');
    console.log("\n");

    //Summary
    console.log("+-----SUMMARY-----+");
    console.log("Workouts found:", workoutdata.workoutLength);
    console.log("Total workout minutes:", workoutdata.workoutTime);
    console.log("Health entries found:", healthdata);
    console.log("Weekly goal:", process.env.WEEKLY_GOAL, "minutes");

    //Check if user met exercise goal
    if (parseInt(process.env.WEEKLY_GOAL) <= parseInt(workoutdata.workoutTime)) {
        console.log("Congrats,", process.env.USER_NAME + "! You have met this week's goal.");
    } else {
        console.log("It looks like you were a little short this week. You'll get it next time!");
    }
    } catch(error) {
        process.exit(1);
    }
}

//Execute function
processFiles();