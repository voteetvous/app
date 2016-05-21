import { GraphQLList } from 'graphql';
import Session from '../types/session';
import putCandidateResponses from '../services/sessionResponses/batchPut';
import SessionResponseInput from '../types/SessionResponseInput';

export default {
  type: Session,
  description: 'The session',
  args: {
    responses: { type: new GraphQLList(SessionResponseInput) },
  },
  resolve: (source,
    { responses }, { session_id: sessionId }) =>
      putCandidateResponses(sessionId, responses),
};
