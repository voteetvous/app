import { GraphQLObjectType } from 'graphql';
import createCandidate from './createCandidate';
import createElection from './createElection';
import createQuestion from './createQuestion';
import putCandidateResponse from './putCandidateResponse';
import createSession from './createSession';
import putSessionResponse from './putSessionResponse';
import putSessionResponses from './putSessionResponses';

export default new GraphQLObjectType({
  name: 'SessionMutation',
  fields: {
    createCandidate,
    createElection,
    createQuestion,
    putCandidateResponse,
    createSession,
    putSessionResponse,
    putSessionResponses,
  },
});
