import { ApolloServer } from 'apollo-server';
import { data } from './data';
import { typeDefs } from './typeDefs';
import { characterInt, animeInt } from './interfaces';

const resolvers = {
  Query: {
    animeCount: () => data.length,
    allAnimes: () => data,
    findAnime: (_: any, {id}: {id: number}) => {
      return data.find(e => e.id === id);
    },
    allCharactersAnime: (_: any, {name}: {name: string}) => {
      return data.filter(e => e.title === name)[0].info.characters.map(e => e)
    },
    oneCharacter: (_: any, {name}: {name: string}) => {
      const dataInfo:any = data.filter((e: animeInt) => e.info.characters.find((e: characterInt) => e.name === name))
      return dataInfo.filter((e: animeInt) => e.info.characters.find((e: characterInt) => e.name === name))[0].info.characters.find((e: any) => e.name === name);
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({url}) => {
  console.log(`Server ready at ${url}`)
})
