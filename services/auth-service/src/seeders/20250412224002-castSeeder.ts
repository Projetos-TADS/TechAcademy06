"use strict";

import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";

interface CastMember {
  castId: string;
  movieId: string;
  actorId: string;
  addedDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    const now = new Date();
    const ACTORS_PER_MOVIE = 3;
    const BATCH_SIZE = 100;

    const movies = await queryInterface.sequelize
      .query<{ movieId: string }>(`SELECT movieId FROM movies;`, {
        type: Sequelize.QueryTypes.SELECT,
      })
      .then((rows) => rows.map((row) => row.movieId));

    const actors = await queryInterface.sequelize
      .query<{ actorId: string }>(`SELECT actorId FROM actors;`, {
        type: Sequelize.QueryTypes.SELECT,
      })
      .then((rows) => rows.map((row) => row.actorId));

    const cast: CastMember[] = [];
    const transaction = await queryInterface.sequelize.transaction();

    try {
      movies.forEach((movieId) => {
        const shuffledActors = [...actors]
          .sort(() => 0.5 - Math.random())
          .slice(0, ACTORS_PER_MOVIE)
          .filter((actorId, index, self) => self.indexOf(actorId) === index);

        shuffledActors.forEach((actorId) => {
          cast.push({
            castId: uuidv4(),
            movieId,
            actorId,
            addedDate: now,
            createdAt: now,
            updatedAt: now,
          });
        });
      });

      for (let i = 0; i < cast.length; i += BATCH_SIZE) {
        const batch = cast.slice(i, i + BATCH_SIZE);
        await queryInterface.bulkInsert("cast", batch, { transaction });
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("cast", {}, {});
  },
};
