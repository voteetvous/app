import { GraphQLID } from 'graphql';
import Session from '../types/session';
import getSession from '../services/sessions/get';

export default {
  type: Session,
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (source, { id: sessionIdFromQuery }, { session_id: sessionIdFromContext }) => {
    if (sessionIdFromQuery && sessionIdFromQuery !== sessionIdFromContext) {
      throw new Error('Authentication error');
    }
    return getSession(sessionIdFromContext);
  },
};
