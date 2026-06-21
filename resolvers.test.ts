import { describe, expect, test } from 'bun:test'
import { resolvers } from './index'

// Convenience: call resolvers without GraphQL execution context
const Q = resolvers.Query
const M = resolvers.Mutation
const noop = undefined as unknown

describe('behavior preservation (R1, R3, R8)', () => {
  test('animeCount returns 3 for initial dataset', () => {
    const count = Q.animeCount()
    expect(count).toBe(3)
  })

  test('findAnime(1) returns Evangelion', () => {
    const anime = Q.findAnime(noop, { id: 1 })
    expect(anime).not.toBeNull()
    expect(anime?.title).toBe('Evangelion')
  })

  test('findAnime(999) returns null on no match (R3)', () => {
    const anime = Q.findAnime(noop, { id: 999 })
    expect(anime).toBeNull()
  })
})

describe('null guards (BUG-003, R4, R5)', () => {
  test('allCharactersAnime with unknown title returns null, does not throw', () => {
    expect(() => Q.allCharactersAnime(noop, { name: 'nope' })).not.toThrow()
    expect(Q.allCharactersAnime(noop, { name: 'nope' })).toBeNull()
  })

  test('oneCharacter with unknown name returns null, does not throw', () => {
    expect(() => Q.oneCharacter(noop, { name: 'nope' })).not.toThrow()
    expect(Q.oneCharacter(noop, { name: 'nope' })).toBeNull()
  })

  test('oneCharacter matches case-insensitively and returns character (R5, R8)', () => {
    const char = Q.oneCharacter(noop, { name: 'goku' })
    expect(char).not.toBeNull()
    expect(char?.name).toBe('Goku')
  })
})

describe('createAnime mutation (BUG-001, R6)', () => {
  test('createAnime returns new anime with unique id and given title', () => {
    const initial = Q.animeCount()
    const created = M.createAnime(noop, { title: 'Naruto' })
    expect(created.title).toBe('Naruto')
    expect(typeof created.id).toBe('number')
    expect(created.info.characters).toEqual([])
    expect(created.info.curiosities ?? null).toBeNull()
    expect(Q.animeCount()).toBe(initial + 1)
  })

  test('created anime appears in allAnimes after creation', () => {
    const all = Q.allAnimes()
    const found = all.find(a => a.title === 'Naruto')
    expect(found).toBeDefined()
  })
})
