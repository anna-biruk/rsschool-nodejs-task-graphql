import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { userType } from './users.js';

export const postType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    author: {
      type: new GraphQLNonNull(userType),
      resolve: async (post, _, { prisma }) =>
        prisma.user.findUnique({ where: { id: post.authorId } }),
    },
  }),
});

// export const getPostQuery = {
//   type: postType,
//   args: { id: { type: new GraphQLNonNull(UUIDType) } },
//   resolve: (_source, { id }, { prisma }) => prisma.post.findUnique({ where: { id } }),
// };
//
// export const getPostsQuery = {
//   type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(postType))),
//   resolve: (_source, _args, { prisma }) => prisma.post.findMany(),
// };

export const createPostInputType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  }),
});

export const createPostMutation = {
  type: new GraphQLNonNull(postType),
  args: { dto: { type: new GraphQLNonNull(createPostInputType) } },
  resolve: (_source, { dto }, { prisma }) => prisma.post.create({ data: dto }),
};

export const changePostInputType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => ({
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  }),
});

export const changePostMutation = {
  type: new GraphQLNonNull(postType),
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(changePostInputType) },
  },
  resolve: (_source, { id, dto }, { prisma }) =>
    prisma.post.update({ where: { id }, data: dto }),
};

export const deletePostMutation = {
  type: new GraphQLNonNull(GraphQLBoolean),
  args: { id: { type: new GraphQLNonNull(UUIDType) } },
  resolve: async (_source, { id }, { prisma }) => {
    const deletedPost = await prisma.post.delete({ where: { id } });
    return Boolean(deletedPost);
  },
};
