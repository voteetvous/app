import { GraphQLObjectType, GraphQLID, GraphQLList } from 'graphql';
import CandidateResponse from './candidateResponse';
import CandidateAffinity from './candidateAffinity';
import SessionResponse from './SessionResponse';

export default new GraphQLObjectType({
  name: 'SessionResults',
  fields: () => ({
    session_id: { type: GraphQLID },
    candidate_responses: { type: new GraphQLList(CandidateResponse) },
    candidate_affinities: { type: new GraphQLList(CandidateAffinity) },
    session_responses: { type: new GraphQLList(SessionResponse) },
  }),
});
