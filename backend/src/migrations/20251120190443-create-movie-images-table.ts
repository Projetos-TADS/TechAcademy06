import { QueryInterface, DataTypes } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("movie_images", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      movieId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "movies",
          key: "movieId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("movie_images");
  },
};
