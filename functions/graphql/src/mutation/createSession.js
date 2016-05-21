import { GraphQLNonNull, GraphQLID } from 'graphql';
import Session from '../types/session';
import createSession from '../services/sessions/create';

export default {
  type: Session,
  description: 'Create a new Session',
  args: {
    election_id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (source, { election_id: electionId }, { ip }) =>
    createSession(electionId, { ip }),
};
