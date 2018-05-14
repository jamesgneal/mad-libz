//Somewhere along the way, we will be typing user IDs to the stories and madlibs that are stored on the database

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
    });

    return User;
};