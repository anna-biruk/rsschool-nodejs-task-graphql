import {  GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { userType } from "./users.js";
import { UUIDType } from "./uuid.js";
import { postType } from "./posts.js";
import { profileType } from "./profiles.js";
import { memberType } from "./member.js";
import { MemberTypeId } from "./member-type-id.js";

export const QueryType = new GraphQLObjectType({
    name: "Query",
    fields: {
        users: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(userType))),
            resolve: (_source, _args, { prisma }) => prisma.user.findMany(),
          },
          user: {
            type: userType,
            args: { id: { type: new GraphQLNonNull(UUIDType) } },
            resolve: (_source, args: { id: string }, { prisma }) =>
              prisma.user.findUnique({ where: { id: args.id } }),
          },
          posts: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(postType))),
            resolve: (_source, _args, { prisma }) => prisma.post.findMany(),
          },
          post: {
            type:postType ,
            args: { id: { type: new GraphQLNonNull(UUIDType) } },
            resolve: (_source, args: { id: string }, { prisma }) =>
              prisma.post.findUnique({ where: { id: args.id } }),
          },
          profiles: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(profileType))),
            resolve: (_source, _args, { prisma }) => prisma.profile.findMany(),
          },
          profile: {
            type: profileType,
            args: { id: { type: new GraphQLNonNull(UUIDType) } },
            resolve: (_source, args: { id: string }, { prisma }) =>
              prisma.profile.findUnique({ where: { id: args.id } }),
          },
          memberTypes: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(memberType))),
            resolve: (_source, _args, { prisma }) => prisma.memberType.findMany(),
          },
          memberType: {
            type: new GraphQLNonNull(memberType),
            args: { id: { type: new GraphQLNonNull(MemberTypeId) } },
            resolve: (_source, args: { id: string }, { prisma }) =>
              prisma.memberType.findUnique({ where: { id: args.id } }),
          },
    }
})