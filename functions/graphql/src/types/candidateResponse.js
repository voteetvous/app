import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
import GraphQLDate from '../../../../lib/GraphQLDate';
// import Question from './question';
// import Candidate from './candidate';
// import getCandidate from '../services/candidates/get';
// import getQuestion from '../services/questions/get';
import ResponseValue from './ResponseValue';

export default new GraphQLObjectType({
  name: 'CandidateResponse',
  fields: () => ({
    id: { type: GraphQLID },
    question_id: { type: GraphQLID },
    candidate_id: { type: GraphQLID },
    // question: {
    //   type: Question,
    //   resolve: ({ question_id: questionId }) => getQuestion(questionId),
    // },
    // candidate: {
    //   type: Candidate,
    //   resolve: ({ candidate_id: candidateId }) => getCandidate(candidateId),
    // },
    value: { type: ResponseValue },
    text: { type: GraphQLString },
    created_at: { type: GraphQLDate },
  }),
});
