import {gql} from 'apollo-server';

export const typeDefs = gql`
  type Characters {
    id: Int!
    name: String!
    age: [String]
    height: String
    weight: String
    birthday: String
    hairColor: String
    eyeColor: String
    animeDebut: String
    image: String
  }

  type Seasons {
    season: String
  }

  type Info {
    characters: [Characters]!
    curiosities: [String]
    season: Seasons
  }

  type Anime {
    id: Int!
    title: String!
    info: Info!
  }

  type Names {
    name: String
    image: String
  }

  type Query {
    animeCount: Int!
    allAnimes: [Anime]!
    findAnime(id: Int!): Anime
    allCharactersAnime(name: String!): [Names]
    oneCharacter(name: String!): Characters
  }

  type Mutation {
    createAnime(
      title: String!
      ): Anime
  }
`