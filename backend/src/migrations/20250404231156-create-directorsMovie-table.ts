"use strict";
import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.createTable("director_movie", {
      directorMovieId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      directorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "directors",
          key: "directorId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      movieId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "movies",
          key: "movieId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      addedDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.dropTable("director_movie");
  },
};
