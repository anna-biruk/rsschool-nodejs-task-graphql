import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { userType } from './users.js';
import { memberType } from './member.js';
import { MemberTypeId } from './member-type-id.js';

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

export const createProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
  }),
});

export const createProfileMutation = {
  type: new GraphQLNonNull(profileType),
  args: { dto: { type: new GraphQLNonNull(createProfileInputType) } },
  resolve: (_source, { dto }, { prisma }) => prisma.profile.create({ data: dto }),
};

export const changeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeId },
  }),
});

export const changeProfileMutation = {
  type: new GraphQLNonNull(profileType),
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(changeProfileInputType) },
  },
  resolve: (_source, { id, dto }, { prisma }) =>
    prisma.profile.update({ where: { id }, data: dto }),
};

export const deleteProfileMutation = {
  type: new GraphQLNonNull(GraphQLBoolean),
  args: { id: { type: new GraphQLNonNull(UUIDType) } },
  resolve: async (_source, { id }, { prisma }) => {
    const deletedProfile = await prisma.profile.delete({ where: { id } });
    return Boolean(deletedProfile);
  },
};
