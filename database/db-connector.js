// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'capstone_2023_planner',
    password        : 'travelPlanner2023',
    database        : 'capstone_2023_planner'
})

// Export it for use in our applicaiton
module.exports.pool = pool;
