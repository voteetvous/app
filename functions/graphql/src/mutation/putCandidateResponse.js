import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import CandidateResponse from '../types/candidateResponse';
import putCandidateResponse from '../services/candidateResponses/put';
import ResponseValue from '../types/ResponseValue';

export default {
  type: CandidateResponse,
  description: 'Candidate response',
  args: {
    election_id: { type: new GraphQLNonNull(GraphQLID) },
    candidate_id: { type: new GraphQLNonNull(GraphQLID) },
    question_id: { type: new GraphQLNonNull(GraphQLID) },
    value: { type: new GraphQLNonNull(ResponseValue) },
    text: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (source,
    { candidate_id: candidateId, question_id: questionId, ...responseAttributes }) =>
      putCandidateResponse(candidateId, questionId, responseAttributes),
};
