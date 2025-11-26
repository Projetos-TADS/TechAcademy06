import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(
      "users",
      {
        userId: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
          comment: "Unique identifier for the user",
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          comment: "User's full name",
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
          comment: "User's email address",
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
          comment: "User's password (hashed)",
        },
        cpf: {
          type: DataTypes.STRING(11),
          allowNull: false,
          comment: "User's CPF (Brazilian tax identifier)",
        },
        admin: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          comment: "Indicates if the user has admin privileges",
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          comment: "Timestamp of when the user was created",
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          comment: "Timestamp of when the user was last updated",
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          comment: "Timestamp of when the user was soft-deleted",
        },
      },
      {}
    );

    await queryInterface.addIndex("users", {
      fields: ["email"],
      unique: true,
      name: "users_email_unique",
    });

    await queryInterface.addIndex("users", {
      fields: ["cpf"],
      unique: true,
      name: "users_cpf_unique",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeIndex("users", "users_email_unique");
    await queryInterface.removeIndex("users", "users_cpf_unique");
    await queryInterface.dropTable("users");
  },
};
