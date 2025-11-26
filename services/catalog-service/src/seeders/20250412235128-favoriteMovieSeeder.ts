"use strict";

import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";

interface FavoriteMovie {
  favoriteMovieId: string;
  movieId: string;
  userId: string;
  addedDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    const now = new Date();
    const MOVIES_PER_USER = 10;

    const [movies, users] = await Promise.all([
      queryInterface.sequelize
        .query<{ movieId: string }>(`SELECT movieId FROM movies;`, {
          type: Sequelize.QueryTypes.SELECT,
        })
        .then((rows) => rows.map((row) => row.movieId)),

      queryInterface.sequelize
        .query<{ userId: string }>(`SELECT userId FROM users;`, {
          type: Sequelize.QueryTypes.SELECT,
        })
        .then((rows) => rows.map((row) => row.userId)),
    ]);

    const favoriteMovies: FavoriteMovie[] = [];
    const transaction = await queryInterface.sequelize.transaction();

    try {
      users.forEach((userId) => {
        const uniqueMovies = new Set<string>();
        while (uniqueMovies.size < MOVIES_PER_USER) {
          const randomIndex = Math.floor(Math.random() * movies.length);
          uniqueMovies.add(movies[randomIndex]);
        }

        uniqueMovies.forEach((movieId) => {
          favoriteMovies.push({
            favoriteMovieId: uuidv4(),
            movieId,
            userId,
            addedDate: now,
            createdAt: now,
            updatedAt: now,
          });
        });
      });

      await queryInterface.bulkInsert("favorite_movies", favoriteMovies, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("favorite_movies", {}, {});
  },
};
