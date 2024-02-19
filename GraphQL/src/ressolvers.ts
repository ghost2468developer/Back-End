import { AddUserInput, User } from './types'

const users: User[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'admin' },
    { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com', role: 'user' }
]

const resolvers = {
    Query: {
        hello: () => 'Hello GraphQL'
    },

    Mutation: {
        addUser: (_parent, { input }: { input: AddUserInput }): User => {
            const id = String(users.length + 1)
            const user = { id, ...input }
            users.push(user)
            return user
        }
    }
}

export default resolvers