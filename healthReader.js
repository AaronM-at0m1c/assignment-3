const fs = require('fs/promises');

//Read health data from file asynchronously
async function healthMetricsCounter(file) {
    
    try {

        //Use fs to read from filesystem
        const data = await fs.readFile(file, 'utf-8');

        //Parse json data into object
        const healthData = JSON.parse(data);

        //Count total number of entries
        try {

            const metricsCount = healthData.metrics.length;
            console.log('Total health entries:', metricsCount);
            return metricsCount, healthData;

        } catch(error) {

            if (error.name === 'TypeError') { 
                console.log('Health metrics not found: Check your JSON data');
            } else {
                console.log('Unknown error:', error.message);
            }
        }
        
    } catch(error) {
        
        //Return an object containing the error so dataProcessor can catch & tests can access
        if (error.code === 'ENOENT') { 
            console.log('Health data file not found: check the file path');
            return { error: 'Health data file not found: check the file path' };

        } else if (error.name === 'SyntaxError') { 
            console.log('Invalid JSON: Check the file format');
            return { error: 'Invalid JSON: Check the file format' };

        } else { 
            console.log('Unknown error:', error.message);
            return { error: error.message }; 

        } 
    }
}

//Execute function
//healthMetricsCounter('./data/health-metrics.json')

module.exports = { healthMetricsCounter }