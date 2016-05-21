import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
import Election from './election';
import getElection from '../services/elections/get';

export default new GraphQLObjectType({
  name: 'Candidate',
  description: 'A candidate to a election',
  fields: () => ({
    id: { type: GraphQLID },
    election: {
      type: Election,
      resolve: ({ election_id: electionId }) => getElection(electionId),
    },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    face_picture_url: { type: GraphQLString },
  }),
});
