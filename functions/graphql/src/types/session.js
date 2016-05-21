import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from 'graphql';
import jwt from 'jsonwebtoken';
import Election from './election';
import Candidate from './candidate';
import SessionProgress from './sessionProgress';
import Question from './question';
import SessionResponse from './SessionResponse';
import SessionResults from './sessionResults';
import getElection from '../services/elections/get';
import getCandidatesByIds from '../services/candidates/getByIds';
import getQuestionsByIds from '../services/questions/getByIds';
import getSessionResponsesBySessionId from '../services/sessionResponses/getBySessionId';
import computeResults from '../services/sessions/computeResults';

export default new GraphQLObjectType({
  name: 'Session',
  description: '',
  fields: () => ({
    id: { type: GraphQLID },
    token: {
      type: GraphQLString,
      resolve: ({ id, secret }, _, { secret: appSecret }) =>
        jwt.sign({ session_id: id, session_secret: secret }, appSecret),
    },
    election: {
      type: Election,
      resolve: ({ election_id: electionId }) => getElection(electionId),
    },
    candidates: {
      type: new GraphQLList(Candidate),
      resolve: ({ candidate_ids: candidateIds }) => getCandidatesByIds(candidateIds),
    },
    questions: {
      type: new GraphQLList(Question),
      resolve: ({ question_ids: questionIds }) => getQuestionsByIds(questionIds),
    },
    progress: { type: SessionProgress },
    responses: {
      type: new GraphQLList(SessionResponse),
      resolve: ({ id: sessionId }) => getSessionResponsesBySessionId(sessionId),
    },
    results: {
      type: SessionResults,
      resolve: ({
        id: sessionId,
        candidate_ids: candidateIds,
        question_ids: questionIds,
        election_id: electionId,
      }) => computeResults(electionId, sessionId, candidateIds, questionIds),
    },
  }),
});
