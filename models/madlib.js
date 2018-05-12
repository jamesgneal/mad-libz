module.exports = function(sequelize, DataTypes) {
    var MadLib = sequelize.define("MadLib", {
      word: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,50]
        }
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      client_id: {
          type: DataTypes.INTEGER,
          allowNull: false
      }
    });
  
    return MadLib;
  };
  