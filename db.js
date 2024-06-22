const mongoose = require('mongoose');

module.exports = () => {
    try {
        mongoose.connect(process.env.DB, {
            // Removed useNewUrlParser and useUnifiedTopology options
        });
        console.log("Connected to database successfully");
    } catch (error) {
        console.error("Error:", error.message);
        console.log("Couldn't connect to database");
    }
};
