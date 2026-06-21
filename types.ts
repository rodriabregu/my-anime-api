export interface CharacterInt {
  id: number
  name: string
  age?: string[]
  height?: string
  weight?: string
  birthday?: string
  hairColor?: string
  eyeColor?: string
  animeDebut?: string
  image?: string
}

export interface InfoInt {
  characters: CharacterInt[]
  curiosities?: string[]
}

export interface AnimeInt {
  id: number
  title: string
  info: InfoInt
}

export interface NameInt {
  name: string
  image?: string
}
