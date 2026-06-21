import { createSchema, createYoga } from 'graphql-yoga'
import { data } from './data'
import { typeDefs } from './typeDefs'
import type { AnimeInt, CharacterInt } from './types'

export const resolvers = {
  Query: {
    animeCount: () => data.length,
    allAnimes: () => data,
    findAnime: (_: unknown, { id }: { id: number }) => {
      return data.find(e => e.id === id) ?? null
    },
    allCharactersAnime: (_: unknown, { name }: { name: string }) => {
      return data.find(e => e.title.toLowerCase() === name.toLowerCase())?.info.characters ?? null
    },
    oneCharacter: (_: unknown, { name }: { name: string }) => {
      for (const anime of data) {
        const char = anime.info.characters.find((c: CharacterInt) => c.name.toLowerCase() === name.toLowerCase())
        if (char) return char
      }
      return null
    },
  },
  Mutation: {
    createAnime: (_: unknown, { title }: { title: string }): AnimeInt => {
      const nextId = data.reduce((max, e) => (e.id > max ? e.id : max), 0) + 1
      const newAnime: AnimeInt = { id: nextId, title, info: { characters: [] } }
      data.push(newAnime)
      return newAnime
    },
  },
}

const schema = createSchema({ typeDefs, resolvers })
const yoga = createYoga({ schema, graphiql: true })

if (import.meta.main) {
  Bun.serve({ fetch: yoga, port: process.env.PORT || 3000 })
}
