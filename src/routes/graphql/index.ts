import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, graphQlSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const depthLimitErrors = validate(graphQlSchema, parse(req.body.query), [
        depthLimit(5),
      ]);

      if (depthLimitErrors.length) {
        return { data: null, errors: depthLimitErrors };
      }

      const { query, variables } = req.body;

      const res = await graphql({
        schema: graphQlSchema,
        source: query,
        variableValues: variables,
        contextValue: { prisma },
      });

      return res;
    },
  });
};

export default plugin;
