module.exports = (client) => {
        console.log("Successfully Online!")
        client.user.setActivity("g!dispense | g!stock"); // sets bot's activities to one of the phrases in the arraylist./ Runs this every 10 seconds.
}