import { GraphQLNonNull, GraphQLString } from 'graphql';
import Election from '../types/election';
import createElection from '../services/elections/create';

export default {
  type: Election,
  description: 'Create an election',
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (source, args) => createElection(args),
};
