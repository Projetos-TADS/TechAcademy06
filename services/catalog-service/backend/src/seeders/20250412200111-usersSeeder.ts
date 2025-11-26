"use strict";
import { v4 as uuidv4 } from "uuid";
import bcryptjs from "bcryptjs";

interface UserData {
  userId: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  admin: boolean;
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
    const saltRounds = 10;

    const usersData: UserData[] = [
      {
        userId: uuidv4(),
        name: "Teste",
        email: "test@mail.com",
        password: bcryptjs.hashSync("password123", saltRounds),
        cpf: "00000000191",
        admin: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: uuidv4(),
        name: "Lucas",
        email: "lucas@mail.com",
        password: bcryptjs.hashSync("123456", saltRounds),
        cpf: "89499635076",
        admin: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: uuidv4(),
        name: "Mariana",
        email: "mariana@mail.com",
        password: bcryptjs.hashSync("123456", saltRounds),
        cpf: "23711464041",
        admin: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: uuidv4(),
        name: "Thiago",
        email: "thiago@mail.com",
        password: bcryptjs.hashSync("123456", saltRounds),
        cpf: "62842214013",
        admin: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: uuidv4(),
        name: "Camila",
        email: "camila@mail.com",
        password: bcryptjs.hashSync("123456", saltRounds),
        cpf: "51039941001",
        admin: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: uuidv4(),
        name: "Rafael",
        email: "rafael@mail.com",
        password: bcryptjs.hashSync("123456", saltRounds),
        cpf: "20739842072",
        admin: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: uuidv4(),
        name: "Bia",
        email: "bia@mail.com",
        password: bcryptjs.hashSync("123456", saltRounds),
        cpf: "39262185090",
        admin: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: uuidv4(),
        name: "Laura",
        email: "laura@mail.com",
        password: bcryptjs.hashSync("123456", saltRounds),
        cpf: "83996888007",
        admin: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: uuidv4(),
        name: "Felipe",
        email: "felipe@mail.com",
        password: bcryptjs.hashSync("123456", saltRounds),
        cpf: "81685385010",
        admin: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: uuidv4(),
        name: "Sofia",
        email: "sofia@mail.com",
        password: bcryptjs.hashSync("123456", saltRounds),
        cpf: "37290600070",
        admin: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        userId: uuidv4(),
        name: "Victor",
        email: "victor@mail.com",
        password: bcryptjs.hashSync("123456", saltRounds),
        cpf: "54454556024",
        admin: false,
        createdAt: now,
        updatedAt: now,
      },
    ];

    const transaction = await queryInterface.sequelize.transaction();

    try {
      const BATCH_SIZE = 50;
      for (let i = 0; i < usersData.length; i += BATCH_SIZE) {
        const batch = usersData.slice(i, i + BATCH_SIZE);
        await queryInterface.bulkInsert("users", batch, { transaction });
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
    await queryInterface.bulkDelete("users", {}, {});
  },
};
