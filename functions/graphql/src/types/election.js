import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from 'graphql';
import Candidate from './candidate';
import Question from './question';
import getCandidatesByElectionId from '../services/candidates/getByElectionId';
import getQuestionsByElectionId from '../services/questions/getByElectionId';

export default new GraphQLObjectType({
  name: 'Election',
  description: 'An Election',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    is_current: { type: GraphQLString },
    candidates: {
      type: new GraphQLList(Candidate),
      resolve: ({ id: electionId }) => getCandidatesByElectionId(electionId),
    },
    questions: {
      type: new GraphQLList(Question),
      resolve: ({ id: electionId }) => getQuestionsByElectionId(electionId),
    },
  }),
});
