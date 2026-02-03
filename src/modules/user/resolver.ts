import prisma from "../../prisma/client"

export const resolver = {
  Query: {
    user: () => prisma.user.findMany(),

    useraccount: (_: unknown, args: { id: string }) => {
      return prisma.user.findUnique({
        where: { id: Number(args.id) }
      })
    }
  },

  Mutation: {
    createUser: (
      _: unknown,
      args: { name: string; email: string; password: string; number: string }
    ) => {
      return prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: args.password,
          number: args.number
        }
      })
    },

    updateUser: (
      _: unknown,
      args: { id: string; name?: string; email?: string; password?: string; number?: string }
    ) => {
      const { id, ...data } = args
      return prisma.user.update({
        where: { id: Number(id) },
        data
      })
    },

    deleteUser: (_: unknown, args: { id: string }) => {
      return prisma.user.delete({
        where: { id: Number(args.id) }
      })
    }
  }
}
