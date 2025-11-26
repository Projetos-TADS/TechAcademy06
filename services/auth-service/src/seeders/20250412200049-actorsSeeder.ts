"use strict";
import { v4 as uuidv4 } from "uuid";

interface Actor {
  actorId: string;
  name: string;
  birthDate: Date;
  nationality: string;
  createdAt: Date;
  updatedAt: Date;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(
    queryInterface: import("sequelize").QueryInterface,
    Sequelize: typeof import("sequelize")
  ) {
    const now = new Date();

    const actorsData: Actor[] = [
      {
        actorId: uuidv4(),
        name: "Leonardo DiCaprio",
        birthDate: new Date("1974-11-11"),
        nationality: "Americano",
        createdAt: now,
        updatedAt: now,
      },
      {
        actorId: uuidv4(),
        name: "Meryl Streep",
        birthDate: new Date("1949-06-22"),
        nationality: "Americana",
        createdAt: now,
        updatedAt: now,
      },
      {
        actorId: uuidv4(),
        name: "Denzel Washington",
        birthDate: new Date("1954-12-28"),
        nationality: "Americano",
        createdAt: now,
        updatedAt: now,
      },
      {
        actorId: uuidv4(),
        name: "Scarlett Johansson",
        birthDate: new Date("1984-11-22"),
        nationality: "Americana",
        createdAt: now,
        updatedAt: now,
      },
      {
        actorId: uuidv4(),
        name: "Robert De Niro",
        birthDate: new Date("1943-08-17"),
        nationality: "Americano",
        createdAt: now,
        updatedAt: now,
      },
      {
        actorId: uuidv4(),
        name: "Cate Blanchett",
        birthDate: new Date("1969-05-14"),
        nationality: "Australiana",
        createdAt: now,
        updatedAt: now,
      },
      {
        actorId: uuidv4(),
        name: "Morgan Freeman",
        birthDate: new Date("1937-06-01"),
        nationality: "Americano",
        createdAt: now,
        updatedAt: now,
      },
      {
        actorId: uuidv4(),
        name: "Emma Watson",
        birthDate: new Date("1990-04-15"),
        nationality: "Britânica",
        createdAt: now,
        updatedAt: now,
      },
      {
        actorId: uuidv4(),
        name: "Tom Hanks",
        birthDate: new Date("1956-07-09"),
        nationality: "Americano",
        createdAt: now,
        updatedAt: now,
      },
      {
        actorId: uuidv4(),
        name: "Natalie Portman",
        birthDate: new Date("1981-06-09"),
        nationality: "Israelense-Americana",
        createdAt: now,
        updatedAt: now,
      },
    ];

    const transaction = await queryInterface.sequelize.transaction();

    try {
      const BATCH_SIZE = 50;
      for (let i = 0; i < actorsData.length; i += BATCH_SIZE) {
        const batch = actorsData.slice(i, i + BATCH_SIZE);
        await queryInterface.bulkInsert("actors", batch, { transaction });
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(
    queryInterface: import("sequelize").QueryInterface,
    Sequelize: typeof import("sequelize")
  ) {
    await queryInterface.bulkDelete("actors", {}, {});
  },
};
