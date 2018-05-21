//Stories are a way to build something slightly more
//interactive then just posting a single word. Stories 
//will contain blocks of text, codified with something
//like VERB1 or ADJ1 and the table will just contain all the words
//that the user plugs in.
module.exports = function(sequelize, DataTypes) {
    var CompletedStory = sequelize.define("CompletedStory", {
        newStory : {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return CompletedStory;
};