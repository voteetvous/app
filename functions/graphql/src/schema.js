import { GraphQLSchema } from 'graphql';
import Query from './query';
import Mutation from './mutation';

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
