import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
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