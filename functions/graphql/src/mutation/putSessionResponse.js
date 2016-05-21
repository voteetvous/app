import { GraphQLNonNull, GraphQLID } from 'graphql';
import SessionResponse from '../types/SessionResponse';
import ResponseValue from '../types/ResponseValue';
import putCandidateResponse from '../services/sessionResponses/put';

export default {
  type: SessionResponse,
  description: 'Session response',
  args: {
    question_id: { type: new GraphQLNonNull(GraphQLID) },
    value: { type: new GraphQLNonNull(ResponseValue) },
  },
  resolve: (source,
    { question_id: questionId, ...responseAttributes },
    { session_id: sessionId }) =>
      putCandidateResponse(sessionId, questionId, responseAttributes),
};
