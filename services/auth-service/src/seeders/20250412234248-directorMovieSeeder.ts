"use strict";

import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";

interface DirectorMovie {
  directorMovieId: string;
  movieId: string;
  directorId: string;
  addedDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    const now = new Date();
    const DIRECTORS_PER_MOVIE = 2;

    const movies = await queryInterface.sequelize
      .query<{ movieId: string }>(`SELECT movieId FROM movies;`, {
        type: Sequelize.QueryTypes.SELECT,
      })
      .then((rows) => rows.map((row) => row.movieId));

    const directors = await queryInterface.sequelize
      .query<{ directorId: string }>(`SELECT directorId FROM directors;`, {
        type: Sequelize.QueryTypes.SELECT,
      })
      .then((rows) => rows.map((row) => row.directorId));

    const directorMovies: DirectorMovie[] = [];
    const transaction = await queryInterface.sequelize.transaction();

    try {
      movies.forEach((movieId) => {
        [...directors]
          .sort(() => 0.5 - Math.random())
          .slice(0, DIRECTORS_PER_MOVIE)
          .forEach((directorId) => {
            directorMovies.push({
              directorMovieId: uuidv4(),
              movieId,
              directorId,
              addedDate: now,
              createdAt: now,
              updatedAt: now,
            });
          });
      });

      await queryInterface.bulkInsert("director_movie", directorMovies, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("director_movie", {}, {});
  },
};
