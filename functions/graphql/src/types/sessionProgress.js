import { GraphQLObjectType, GraphQLInt } from 'graphql';

export default new GraphQLObjectType({
  name: 'SessionProgress',
  fields: () => ({
    current: { type: GraphQLInt },
    total: { type: GraphQLInt },
  }),
});
