import express from 'express'
import { AppolloServer, gql } from 'apollo-server-express'
import resolvers from './resolvers'

const typeDefs = gql'
    ${require('fs').readFileSync(require.resolve('./schema.graphql'), 'utf8')}
'

const server = new AppolloServer({ typeDefs, resolvers })

const app = express()
