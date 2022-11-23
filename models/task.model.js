module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("tasks", {
      title: {
        type: Sequelize.STRING
      },
      assign: {
        type: Sequelize.INTEGER
      },
      creator: {
        type: Sequelize.INTEGER
      }
    });
  
    return Task;
  };