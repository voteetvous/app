import { GraphQLObjectType, GraphQLID } from 'graphql';
import GraphQLDate from '../../../../lib/GraphQLDate';
import ResponseValue from './ResponseValue';
import Session from './session';
import getSession from '../services/sessions/get';

export default new GraphQLObjectType({
  name: 'SessionResponse',
  fields: () => ({
    id: { type: GraphQLID },
    session_id: { type: GraphQLID },
    question_id: { type: GraphQLID },
    value: { type: ResponseValue },
    created_at: { type: GraphQLDate },
    session: {
      type: Session,
      resolve: ({ session_id: sessionId }) => getSession(sessionId),
    },
  }),
});
