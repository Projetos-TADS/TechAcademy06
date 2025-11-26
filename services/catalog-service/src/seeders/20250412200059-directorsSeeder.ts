"use strict";
import { v4 as uuidv4 } from "uuid";

interface Director {
  directorId: string;
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

    const directorsData: Director[] = [
      {
        directorId: uuidv4(),
        name: "Steven Spielberg",
        birthDate: new Date("1946-12-18"),
        nationality: "Americano",
        createdAt: now,
        updatedAt: now,
      },
      {
        directorId: uuidv4(),
        name: "Martin Scorsese",
        birthDate: new Date("1942-11-17"),
        nationality: "Americano",
        createdAt: now,
        updatedAt: now,
      },
      {
        directorId: uuidv4(),
        name: "Christopher Nolan",
        birthDate: new Date("1970-07-30"),
        nationality: "Britânico",
        createdAt: now,
        updatedAt: now,
      },
      {
        directorId: uuidv4(),
        name: "Quentin Tarantino",
        birthDate: new Date("1963-03-27"),
        nationality: "Americano",
        createdAt: now,
        updatedAt: now,
      },
      {
        directorId: uuidv4(),
        name: "Alfred Hitchcock",
        birthDate: new Date("1899-08-13"),
        nationality: "Britânico",
        createdAt: now,
        updatedAt: now,
      },
      {
        directorId: uuidv4(),
        name: "Hayao Miyazaki",
        birthDate: new Date("1941-01-05"),
        nationality: "Japonês",
        createdAt: now,
        updatedAt: now,
      },
      {
        directorId: uuidv4(),
        name: "Francis Ford Coppola",
        birthDate: new Date("1939-04-07"),
        nationality: "Americano",
        createdAt: now,
        updatedAt: now,
      },
      {
        directorId: uuidv4(),
        name: "James Cameron",
        birthDate: new Date("1954-08-16"),
        nationality: "Canadense",
        createdAt: now,
        updatedAt: now,
      },
      {
        directorId: uuidv4(),
        name: "Ridley Scott",
        birthDate: new Date("1937-11-30"),
        nationality: "Britânico",
        createdAt: now,
        updatedAt: now,
      },
      {
        directorId: uuidv4(),
        name: "Peter Jackson",
        birthDate: new Date("1961-10-31"),
        nationality: "Neozelandês",
        createdAt: now,
        updatedAt: now,
      },
    ];

    const transaction = await queryInterface.sequelize.transaction();

    try {
      const BATCH_SIZE = 50;
      for (let i = 0; i < directorsData.length; i += BATCH_SIZE) {
        const batch = directorsData.slice(i, i + BATCH_SIZE);
        await queryInterface.bulkInsert("directors", batch, { transaction });
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
    await queryInterface.bulkDelete("directors", {}, {});
  },
};
