import { GraphQLObjectType } from 'graphql';
import { createPostMutation, changePostMutation, deletePostMutation } from './posts.js';
import {
  createProfileMutation,
  changeProfileMutation,
  deleteProfileMutation,
} from './profiles.js';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createPost: createPostMutation,
    changePost: changePostMutation,
    deletePost: deletePostMutation,
    createProfile: createProfileMutation,
    changeProfile: changeProfileMutation,
    deleteProfile: deleteProfileMutation,
  }),
});
