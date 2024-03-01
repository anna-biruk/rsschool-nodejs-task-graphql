import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { userType } from './users.js';

export const postType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    author: { type: new GraphQLNonNull(userType),
        resolve: async (post, _, { prisma }) =>
        prisma.user.findUnique({ where: { id: post.authorId } }),},
  }),
});