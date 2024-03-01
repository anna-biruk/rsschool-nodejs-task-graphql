import { GraphQLObjectType } from 'graphql';
import { createPostMutation, changePostMutation, deletePostMutation } from './posts.js';
import {
  createProfileMutation,
  changeProfileMutation,
  deleteProfileMutation,
} from './profiles.js';
import {
  createUserMutation,
  changeUserMutation,
  deleteUserMutation,
  subscribeToMutation,
  unsubscribeFromMutation,
} from './users.js';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createPost: createPostMutation,
    changePost: changePostMutation,
    deletePost: deletePostMutation,
    createProfile: createProfileMutation,
    changeProfile: changeProfileMutation,
    deleteProfile: deleteProfileMutation,
    createUser: createUserMutation,
    changeUser: changeUserMutation,
    deleteUser: deleteUserMutation,
    subscribeTo: subscribeToMutation,
    unsubscribeFrom: unsubscribeFromMutation,
  }),
});
