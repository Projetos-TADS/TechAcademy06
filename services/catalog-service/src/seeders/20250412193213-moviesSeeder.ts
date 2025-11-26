"use strict";
import { v4 as uuidv4 } from "uuid";

interface MovieData {
  movieId: string;
  title: string;
  description: string;
  releaseYear: number;
  duration: number;
  rating: number;
  urlImage: string;
  createdAt: Date;
  updatedAt?: Date;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(
    queryInterface: import("sequelize").QueryInterface,
    Sequelize: typeof import("sequelize")
  ) {
    const now = new Date();

    const moviesData: MovieData[] = [
      {
        movieId: uuidv4(),
        title: "The Shawshank Redemption",
        description:
          "Wrongly imprisoned, two men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        releaseYear: 1994,
        duration: 142,
        rating: 4.65,
        urlImage:
          "https://images.justwatch.com/poster/177638617/s166/the-shawshank-redemption.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "The Godfather",
        description:
          "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        releaseYear: 1972,
        duration: 175,
        rating: 4.6,
        urlImage: "https://images.justwatch.com/poster/309947338/s166/o-poderoso-chefao.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "The Dark Knight",
        description:
          "When the menace known as the Joker emerges, he wreaks havoc on the people of Gotham, testing Batman's strength.",
        releaseYear: 2008,
        duration: 152,
        rating: 4.5,
        urlImage: "https://images.justwatch.com/poster/312677323/s166/o-cavaleiro-das-trevas.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Pulp Fiction",
        description:
          "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in tales of violence and redemption.",
        releaseYear: 1994,
        duration: 154,
        rating: 4.45,
        urlImage: "https://images.justwatch.com/poster/8539951/s166/pulp-fiction.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Forrest Gump",
        description:
          "The life story of Forrest Gump, a man with a low IQ who unintentionally influences several historical events.",
        releaseYear: 1994,
        duration: 142,
        rating: 4.4,
        urlImage:
          "https://images.justwatch.com/poster/301039564/s166/forrest-gump-o-contador-de-historias.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Inception",
        description:
          "A skilled thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
        releaseYear: 2010,
        duration: 148,
        rating: 4.4,
        urlImage: "https://images.justwatch.com/poster/241712232/s166/a-origem.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "The Matrix",
        description:
          "A hacker uncovers the disturbing truth about reality and his role in the war against its controllers.",
        releaseYear: 1999,
        duration: 136,
        rating: 4.35,
        urlImage: "https://images.justwatch.com/poster/318005292/s166/matrix.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Fight Club",
        description:
          "An insomniac office worker and a soap salesman form an underground fight club that evolves into much more.",
        releaseYear: 1999,
        duration: 139,
        rating: 4.4,
        urlImage: "https://images.justwatch.com/poster/243405440/s166/clube-da-luta.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "The Empire Strikes Back",
        description:
          "As the Rebels are pursued by the Empire, Luke Skywalker seeks Jedi training with Yoda while his friends are in danger.",
        releaseYear: 1980,
        duration: 124,
        rating: 4.35,
        urlImage:
          "https://images.justwatch.com/poster/249957005/s166/star-wars-episodio-v-o-imperio-contra-ataca.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "The Lord of the Rings: The Return of the King",
        description:
          "The final confrontation between the forces of good and evil fighting for the control of Middle-earth.",
        releaseYear: 2003,
        duration: 201,
        rating: 4.45,
        urlImage:
          "https://images.justwatch.com/poster/312201681/s166/o-senhor-dos-aneis-o-retorno-do-rei.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Terminator 2: Judgment Day",
        description:
          "A cyborg, identical to the one who failed to kill Sarah Connor, must protect her son from a more advanced Terminator.",
        releaseYear: 1991,
        duration: 137,
        rating: 4.3,
        urlImage:
          "https://images.justwatch.com/poster/308772236/s166/o-exterminador-do-futuro-2-o-julgamento-final.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Star Wars: A New Hope",
        description:
          "Luke Skywalker joins forces with a Jedi Knight to save the galaxy from the Empire's world-destroying battle station.",
        releaseYear: 1977,
        duration: 121,
        rating: 4.3,
        urlImage:
          "https://images.justwatch.com/poster/249957625/s166/guerra-nas-estrelas-episodio-iv-uma-nova-esperanca.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Gladiator",
        description:
          "A former Roman General seeks vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
        releaseYear: 2000,
        duration: 155,
        rating: 4.25,
        urlImage: "https://images.justwatch.com/poster/175288985/s166/gladiador.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Jaws",
        description:
          "A giant great white shark arrives on the shores of a New England beach and causes numerous deaths.",
        releaseYear: 1975,
        duration: 124,
        rating: 4.0,
        urlImage: "https://images.justwatch.com/poster/321656055/s166/tubarao.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Jurassic Park",
        description:
          "During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.",
        releaseYear: 1993,
        duration: 127,
        rating: 4.05,
        urlImage:
          "https://images.justwatch.com/poster/175326866/s166/jurassic-park-parque-dos-dinossauros.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "The Silence of the Lambs",
        description:
          "A young FBI cadet must confide in an incarcerated and manipulative killer to receive his help on catching another serial killer.",
        releaseYear: 1991,
        duration: 118,
        rating: 4.3,
        urlImage: "https://images.justwatch.com/poster/98960712/s166/o-silencio-dos-inocentes.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Schindler's List",
        description:
          "In German-occupied Poland, industrialist Oskar Schindler saves his Jewish workers from Nazis.",
        releaseYear: 1993,
        duration: 195,
        rating: 4.45,
        urlImage: "https://images.justwatch.com/poster/175256567/s166/a-lista-de-schindler.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Se7en",
        description:
          "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
        releaseYear: 1995,
        duration: 127,
        rating: 4.3,
        urlImage:
          "https://images.justwatch.com/poster/321588740/s166/seven-os-sete-crimes-capitais.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Saving Private Ryan",
        description:
          "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed.",
        releaseYear: 1998,
        duration: 169,
        rating: 4.3,
        urlImage:
          "https://images.justwatch.com/poster/321644227/s166/o-resgate-do-soldado-ryan.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Braveheart",
        description:
          "Scottish warrior William Wallace leads his countrymen in a rebellion to free his homeland from the tyranny of King Edward I of England.",
        releaseYear: 1995,
        duration: 178,
        rating: 4.15,
        urlImage: "https://images.justwatch.com/poster/253758785/s166/coracao-valente.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "The Green Mile",
        description:
          "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
        releaseYear: 1999,
        duration: 189,
        rating: 4.3,
        urlImage: "https://images.justwatch.com/poster/175628360/s166/a-espera-de-um-milagre.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Avatar",
        description:
          "A paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.",
        releaseYear: 2009,
        duration: 162,
        rating: 3.95,
        urlImage:
          "https://images.justwatch.com/poster/8729681/s166/avatar-edicao-estendida-de-colecionador.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Black Panther",
        description:
          "T'Challa returns home to Wakanda to take his rightful place as king, only to face a new adversary challenging his reign.",
        releaseYear: 2018,
        duration: 134,
        rating: 3.65,
        urlImage: "https://images.justwatch.com/poster/312869327/s166/pantera-negra.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Titanic",
        description:
          "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
        releaseYear: 1997,
        duration: 195,
        rating: 3.9,
        urlImage: "https://images.justwatch.com/poster/161964560/s166/titanic-1997.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "The Avengers",
        description:
          "Earth's mightiest heroes must come together to stop a mischievous demigod from enslaving humanity.",
        releaseYear: 2012,
        duration: 143,
        rating: 4.0,
        urlImage: "https://images.justwatch.com/poster/204366450/s166/marvels-the-avengers.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Rocky",
        description:
          "A small-time boxer gets a once-in-a-lifetime shot to fight the heavyweight champion in a bout in which he strives to go the distance.",
        releaseYear: 1976,
        duration: 120,
        rating: 4.05,
        urlImage: "https://images.justwatch.com/poster/302629532/s166/rocky-um-lutador.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "The Lion King",
        description:
          "A lion prince flees his kingdom after the death of his father, only to learn the true meaning of responsibility and bravery.",
        releaseYear: 1994,
        duration: 88,
        rating: 4.25,
        urlImage: "https://images.justwatch.com/poster/115572244/s166/o-rei-leao.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "The Godfather Part II",
        description:
          "The early life and career of Vito Corleone in 1920s New York City, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
        releaseYear: 1974,
        duration: 202,
        rating: 4.5,
        urlImage: "https://images.justwatch.com/poster/300461443/s166/the-godfather-part-ii.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Gone with the Wind",
        description:
          "A manipulative woman and a roguish man conduct a turbulent romance during the American Civil War and Reconstruction periods.",
        releaseYear: 1939,
        duration: 238,
        rating: 4.05,
        urlImage: "https://images.justwatch.com/poster/197912720/s166/gone-with-the-wind.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Toy Story",
        description:
          "A cowboy doll is profoundly threatened and jealous when a new spaceman action figure supplants him as top toy in a boy's room.",
        releaseYear: 1995,
        duration: 81,
        rating: 4.15,
        urlImage: "https://images.justwatch.com/poster/242985629/s166/toy-story-os-rivais.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "The Incredibles",
        description:
          "A family of undercover superheroes, while trying to live the quiet suburban life, are forced into action to save the world.",
        releaseYear: 2004,
        duration: 115,
        rating: 4.0,
        urlImage: "https://images.justwatch.com/poster/242373985/s166/os-incriveis.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Up",
        description:
          "An old man ties thousands of balloons to his house to fulfill his dream of seeing the wilds of South America and ends up traveling with an unexpected companion.",
        releaseYear: 2009,
        duration: 96,
        rating: 4.1,
        urlImage: "https://images.justwatch.com/poster/242984644/s166/up-altas-aventuras.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "A Clockwork Orange",
        description:
          "In a dystopic future, a gang leader is captured and experimented on with an aversion therapy developed by the government.",
        releaseYear: 1971,
        duration: 136,
        rating: 4.15,
        urlImage: "https://images.justwatch.com/poster/304951771/s166/laranja-mecanica.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Psycho",
        description:
          "A secretary embezzles money from her employer's client, goes on the run, and checks into a remote motel run by a strange young man.",
        releaseYear: 1960,
        duration: 109,
        rating: 4.25,
        urlImage: "https://images.justwatch.com/poster/306385653/s166/psycho.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Casablanca",
        description:
          "In Casablanca, during World War II, a mysterious man is rekindled in a timeless love affair.",
        releaseYear: 1942,
        duration: 102,
        rating: 4.25,
        urlImage: "https://images.justwatch.com/poster/93191473/s166/casablanca.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Back to the Future",
        description:
          "A teenager is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, Dr. Emmett Brown.",
        releaseYear: 1985,
        duration: 116,
        rating: 4.25,
        urlImage: "https://images.justwatch.com/poster/309168176/s166/de-volta-para-o-futuro.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "The Terminator",
        description:
          "A cyborg is sent from the future on a deadly mission to kill Sarah Connor, whose son will lead a human resistance against the machines.",
        releaseYear: 1984,
        duration: 107,
        rating: 4.0,
        urlImage:
          "https://images.justwatch.com/poster/308772235/s166/o-exterminador-do-futuro.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "The Wizard of Oz",
        description:
          "Dorothy Gale is swept away to a magical land in a tornado and embarks on a quest to see the Wizard.",
        releaseYear: 1939,
        duration: 102,
        rating: 4.0,
        urlImage: "https://images.justwatch.com/poster/238879997/s166/the-wizard-of-oz.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "E.T. the Extra-Terrestrial",
        description:
          "A troubled child summons the courage to help a friendly alien escape Earth and return to his home world.",
        releaseYear: 1982,
        duration: 115,
        rating: 3.9,
        urlImage: "https://images.justwatch.com/poster/8697427/s166/e-t-o-extraterrestre.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Joker",
        description:
          "A mentally troubled comedian embarks on a downward spiral that leads to awful acts of madness in Gotham City.",
        releaseYear: 2019,
        duration: 122,
        rating: 4.2,
        urlImage: "https://images.justwatch.com/poster/153120348/s166/joker-2019.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Parasite",
        description:
          "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        releaseYear: 2019,
        duration: 132,
        rating: 4.3,
        urlImage: "https://images.justwatch.com/poster/240639868/s166/parasitas.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Goodfellas",
        description:
          "The story of Henry Hill and his life in the mob, covering his relationship with his wife and the mob's powerful crime family.",
        releaseYear: 1990,
        duration: 146,
        rating: 4.35,
        urlImage: "https://images.justwatch.com/poster/181256977/s166/goodfellas.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Leon: The Professional",
        description:
          "Mathilda, a young girl, forms an unusual relationship with Léon, a hitman working in New York City.",
        releaseYear: 1994,
        duration: 110,
        rating: 4.25,
        urlImage: "https://images.justwatch.com/poster/99343340/s166/o-profissional.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "The Great Dictator",
        description:
          "A poor Jewish barber and lookalike to the dictator is swept into events leading to a revolution against tyranny.",
        releaseYear: 1940,
        duration: 125,
        rating: 4.2,
        urlImage: "https://images.justwatch.com/poster/318454465/s166/o-grande-ditador.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "Interstellar",
        description:
          "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        releaseYear: 2014,
        duration: 169,
        rating: 4.3,
        urlImage: "https://images.justwatch.com/poster/312160153/s166/interestelar.avif",
        createdAt: now,
      },
      {
        movieId: uuidv4(),
        title: "The Prestige",
        description:
          "After a tragic accident, two magicians engage in a battle to create the ultimate illusion while sacrificing everything they have.",
        releaseYear: 2006,
        duration: 130,
        rating: 4.25,
        urlImage: "https://images.justwatch.com/poster/304262071/s166/the-prestige.avif",
        createdAt: now,
      },
    ];

    const transaction = await queryInterface.sequelize.transaction();

    try {
      const BATCH_SIZE = 100;
      for (let i = 0; i < moviesData.length; i += BATCH_SIZE) {
        const batch = moviesData.slice(i, i + BATCH_SIZE);
        await queryInterface.bulkInsert("movies", batch, { transaction });
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
    await queryInterface.bulkDelete("movies", {}, {});
  },
};
