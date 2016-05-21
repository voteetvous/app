import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import Question from '../types/question';
import createQuestion from '../services/questions/create';

export default {
  type: Question,
  description: 'Create a question',
  args: {
    election_id: { type: new GraphQLNonNull(GraphQLID) },
    text: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (source, { election_id: electionId, text }) =>
    createQuestion({ electionId, text }),
};
