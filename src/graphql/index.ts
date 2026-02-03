import { schema as userSchema } from "../modules/user/schema"
import { resolver as userResolver } from "../modules/user/resolver"

export const typeDefs = userSchema
export const resolvers = userResolver
