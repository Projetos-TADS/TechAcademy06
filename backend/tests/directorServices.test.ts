import { DirectorModel } from "../src/models/Director.model";
import directorService from "../src/services/director.services";
import { directorReturnSchema, directorReadSchema } from "../src/schemas";
import { DirectorCreate, DirectorUpdate } from "../src/interfaces";

jest.mock("../src/models/Director.model");

describe("DirectorService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllDirectors", () => {
    it("should return a list of directors with pagination data", async () => {
      const mockDirectors = [
        {
          directorId: "035481ce-9863-4511-8902-c7f219a39573",
          name: "Christopher Nolan",
          birthDate: "1970-07-30",
          nationality: "British",
        },
        {
          directorId: "035481ce-9863-4511-8902-c7f219a39574",
          name: "Quentin Tarantino",
          birthDate: "1963-03-27",
          nationality: "American",
        },
      ];

      const mockCount = 2;
      const paginationParams = {
        page: 0,
        perPage: 10,
        prevPage: null,
        nextPage: null,
        order: "ASC",
        sort: "name",
      };

      (DirectorModel.findAndCountAll as jest.Mock).mockResolvedValue({
        rows: mockDirectors,
        count: mockCount,
      });

      const result = await directorService.getAllDirectors(paginationParams);

      expect(result).toEqual({
        prevPage: paginationParams.prevPage,
        nextPage: paginationParams.nextPage,
        count: mockCount,
        data: directorReadSchema.parse(mockDirectors),
      });
    });
  });

  describe("createDirector", () => {
    it("should create and return a director with correct data", async () => {
      const mockPayload: DirectorCreate = {
        name: "Christopher Nolan",
        birthDate: "1970-07-30",
        nationality: "British",
      };

      const mockDirector = {
        directorId: "035481ce-9863-4511-8902-c7f219a39573",
        ...mockPayload,
      };

      (DirectorModel.create as jest.Mock).mockResolvedValue(mockDirector);

      const result = await directorService.createDirector(mockPayload);

      expect(result).toEqual(directorReturnSchema.parse(mockDirector));

      expect(DirectorModel.create).toHaveBeenCalledWith(mockPayload);
    });

    it("should throw an error when director creation fails", async () => {
      const mockPayload: DirectorCreate = {
        name: "Christopher Nolan",
        birthDate: "1970-07-30",
        nationality: "British",
      };

      (DirectorModel.create as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(directorService.createDirector(mockPayload)).rejects.toThrow("Database error");

      expect(DirectorModel.create).toHaveBeenCalledWith(mockPayload);
    });
  });

  describe("updateDirector", () => {
    it("should update and return the director with correct data", async () => {
      const mockPayload: DirectorUpdate = {
        name: "Christopher Nolan Updated",
        birthDate: "1970-07-30",
        nationality: "British",
      };

      const mockDirector = {
        directorId: "035481ce-9863-4511-8902-c7f219a39573",
        name: "Christopher Nolan",
        birthDate: "1970-07-30",
        nationality: "British",
        save: jest.fn().mockResolvedValue({
          ...mockPayload,
          directorId: "035481ce-9863-4511-8902-c7f219a39573",
        }),
      };

      const result = await directorService.updateDirector(
        mockDirector as unknown as DirectorModel,
        mockPayload
      );

      expect(result).toEqual(
        directorReturnSchema.parse({ ...mockPayload, directorId: mockDirector.directorId })
      );

      expect(mockDirector.save).toHaveBeenCalledTimes(1);
    });

    it("should throw an error when updating the director fails", async () => {
      const mockPayload: DirectorUpdate = {
        name: "Christopher Nolan Updated",
        birthDate: "1970-07-30",
        nationality: "British",
      };

      const mockDirector = {
        directorId: "035481ce-9863-4511-8902-c7f219a39573",
        name: "Christopher Nolan",
        birthDate: "1970-07-30",
        nationality: "British",
        save: jest.fn().mockRejectedValue(new Error("Database error")),
      };

      await expect(
        directorService.updateDirector(mockDirector as unknown as DirectorModel, mockPayload)
      ).rejects.toThrow("Database error");

      expect(mockDirector.save).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteDirector", () => {
    it("should successfully delete the director", async () => {
      const mockDirector = {
        directorId: "035481ce-9863-4511-8902-c7f219a39573",
        name: "Christopher Nolan",
        birthDate: "1970-07-30",
        nationality: "British",
        destroy: jest.fn().mockResolvedValue(undefined),
      };

      await directorService.deleteDirector(mockDirector as unknown as DirectorModel);

      expect(mockDirector.destroy).toHaveBeenCalledTimes(1);
    });

    it("should throw an error when deleting the director fails", async () => {
      const mockDirector = {
        directorId: "035481ce-9863-4511-8902-c7f219a39573",
        name: "Christopher Nolan",
        birthDate: "1970-07-30",
        nationality: "British",
        destroy: jest.fn().mockRejectedValue(new Error("Database error")),
      };

      await expect(
        directorService.deleteDirector(mockDirector as unknown as DirectorModel)
      ).rejects.toThrow("Database error");

      expect(mockDirector.destroy).toHaveBeenCalledTimes(1);
    });
  });
});
