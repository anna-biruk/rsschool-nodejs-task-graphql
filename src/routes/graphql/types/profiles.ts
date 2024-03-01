import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
  } from 'graphql';
import { UUIDType } from './uuid.js';
import { userType } from './users.js';
import { memberType } from './member.js';
  
  export const profileType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
      id: { type: new GraphQLNonNull(UUIDType) },
      isMale: { type: GraphQLBoolean },
      yearOfBirth: { type: GraphQLFloat },
      
      userId: { type: new GraphQLNonNull(UUIDType) },
      memberType: {
        type: new GraphQLNonNull(memberType),
        resolve: (profile, _args, { prisma }) =>
          prisma.memberType.findUnique({ where: { id: profile.memberTypeId } }),
      },
      user: {
        type: new GraphQLNonNull(userType),
        resolve: (profile, _args, { prisma }) =>
          prisma.user.findUnique({ where: { id: profile.userId } }),
      },
    }),
  });