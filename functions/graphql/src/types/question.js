import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
import Election from './election';
import getElection from '../services/elections/get';

export default new GraphQLObjectType({
  name: 'Question',
  description: 'A question',
  fields: () => ({
    id: { type: GraphQLID },
    election: {
      type: Election,
      resolve: ({ election_id: electionId }) => getElection(electionId),
    },
    text: { type: GraphQLString },
    icon_url: { type: GraphQLString },
    card_background_color: { type: GraphQLString },
  }),
});
