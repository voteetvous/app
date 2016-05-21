import { difference, map, isEmpty } from 'lodash';
import getSessionResponsesBySessionId from '../sessionResponses/getBySessionId';
import getCandidateResponsesByElectionId from '../candidateResponses/getByElectionId';
import computeCandidateAffinities from './computeCandidateAffinities';

export default async (electionId, sessionId, candidateIds, questionIds) => {
  const [sessionResponses, candidateResponses] = await Promise.all([
    getSessionResponsesBySessionId(sessionId),
    getCandidateResponsesByElectionId(electionId),
  ]);

  // Ensure questions are all responded
  const nonAnsweredQuestionIds = difference(questionIds, map(sessionResponses, 'question_id'));
  if (!isEmpty(nonAnsweredQuestionIds)) {
    throw new Error(`Missing responses (${nonAnsweredQuestionIds.join(', ')})`);
  }

  const candidateAffinities = computeCandidateAffinities(
    candidateIds, questionIds, sessionResponses, candidateResponses);

  return {
    candidate_responses: candidateResponses,
    session_responses: sessionResponses,
    candidate_affinities: candidateAffinities,
  };
};
