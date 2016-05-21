import { GraphQLObjectType } from 'graphql';
import election from './election';
import currentElection from './currentElection';
import session from './session';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'A comparaison session',
  fields: () => ({
    election,
    currentElection,
    session,
  }),
});
