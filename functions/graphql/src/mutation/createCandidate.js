import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import Candidate from '../types/candidate';
import createCandidate from '../services/candidates/create';

export default {
  type: Candidate,
  description: 'Create a candidate',
  args: {
    election_id: { type: new GraphQLNonNull(GraphQLID) },
    first_name: { type: new GraphQLNonNull(GraphQLString) },
    last_name: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (source, args) => createCandidate(args),
};
