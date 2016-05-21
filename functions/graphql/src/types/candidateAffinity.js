import { GraphQLObjectType, GraphQLID, GraphQLFloat } from 'graphql';
import Candidate from './candidate';
import getCandidate from '../services/candidates/get';

export default new GraphQLObjectType({
  name: 'CandidateAffinity',
  fields: () => ({
    candidate_id: { type: GraphQLID },
    candidate: {
      type: Candidate,
      resolve: ({ candidate_id: candidateId }) => getCandidate(candidateId),
    },
    score: { type: GraphQLFloat },
  }),
});
