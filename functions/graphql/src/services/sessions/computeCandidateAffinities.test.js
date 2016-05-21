import computeCandidateAffinities from './computeCandidateAffinities';

const QUESTION_1 = 'QUESTION_1';
const QUESTION_2 = 'QUESTION_2';
const CANDIDATE_1 = 'CANDIDATE_1';
const CANDIDATE_2 = 'CANDIDATE_2';
const CANDIDATE_3 = 'CANDIDATE_3';

test('Test affinities', () => {
  const affinities = computeCandidateAffinities(
    [CANDIDATE_1, CANDIDATE_2, CANDIDATE_3],
    [QUESTION_1, QUESTION_2],
    [{ question_id: QUESTION_1, value: 1 },
     { question_id: QUESTION_2, value: -1 }],
    [{ candidate_id: CANDIDATE_1, question_id: QUESTION_1, value: 1 },
     { candidate_id: CANDIDATE_1, question_id: QUESTION_2, value: 1 },
     { candidate_id: CANDIDATE_2, question_id: QUESTION_1, value: 1 },
     { candidate_id: CANDIDATE_2, question_id: QUESTION_2, value: -1 },
     { candidate_id: CANDIDATE_3, question_id: QUESTION_1, value: 1 },
     { candidate_id: CANDIDATE_3, question_id: QUESTION_2, value: 0 }],
  );
  expect(affinities).toEqual([
    { candidate_id: CANDIDATE_2, score: 1 },
    { candidate_id: CANDIDATE_3, score: 0.75 },
    { candidate_id: CANDIDATE_1, score: 0.5 },
  ]);
});
