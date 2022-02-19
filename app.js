const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema, buildSchema } = require('graphql')

const app = express()
const seedData = [
  {id: 1, language: 'JavaScript', lodev: true},
  {id: 2, language: 'Python', lodev: false},
  {id: 3, language: 'Rust', lodev: true},
]

//resolver
const languageType = new GraphQLObjectType({
  name: 'Language',
  description: 'A programming language',
  fields: {
    id: {
      type: GraphQLInt,
    },
    language: {
      type: GraphQLString,
    },
    loved: {
      type: GraphQLBoolean,
    }
  }
})

const rootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'This is the root query',
  fields: {
    languages: {
      type: new GraphQLList(languageType),
      resolve: () => seedData
    },
    language: {
      type: languageType,
      args: {
        id: {type: GraphQLInt}
      },
      resolve: (parents, {id}, context, info) => seedData.find(language => language.id === id)
    }
  }
})
const rootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'This is the root mutation',
  fields: {
    language: {
      type: languageType,
      args: {
        language: {type: GraphQLString},
        loved: {type: GraphQLBoolean}
      },
      resolve: (_, {language, loved}) => {
        const newLaguaje = {id: seedData.length + 1, language, loved}
        seedData.push(newLaguaje)
        return newLaguaje
      }
    },
  }
})

const schema = new GraphQLSchema({
  mutation: rootMutation,
  query: rootQuery
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Server is running on port ${port} 🚀`)
})
