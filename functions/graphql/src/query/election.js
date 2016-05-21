import { GraphQLID } from 'graphql';
import Election from '../types/election';
import getElection from '../services/elections/get';

export default {
  type: Election,
  description: 'An Election',
  args: {
    id: { type: GraphQLID },
  },
  resolve: (source, { id: electionId }) => getElection(electionId),
};
