import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import resolvers from './resolvers'

const typeDefs = gql`
  ${require('fs').readFileSync(require.resolve('./schema.graphql'), 'utf8')}
`

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()
server.applyMiddleware({ app })

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}${server.graphqlPath}`)
})