module.exports = function(sequelize, DataTypes) {
    var CompletedStory = sequelize.define("CompletedStory", {
        newStory : {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return CompletedStory;
};