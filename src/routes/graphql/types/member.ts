import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { profileType } from './profiles.js';
import { MemberTypeId } from './member-type-id.js';

export const memberType: GraphQLObjectType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: new GraphQLNonNull(MemberTypeId) },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLFloat },
    profiles: { type: new GraphQLList(profileType) },
  }),
});

export const getMemberTypeQuery = {
  type: new GraphQLNonNull(memberType),
  args: {
    id: { type: new GraphQLNonNull(MemberTypeId) },
  },
  resolve: (_source, { id }, { prisma }) => {
    prisma.memberType.findUnique({ where: { id } });
  },
};

export const getMemberTypesQuery = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(memberType))),
  resolve: (_source, _args, { prisma }) => prisma.memberType.findMany(),
};
