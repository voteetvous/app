import math from 'mathjs';
import { zip, orderBy } from 'lodash';

export default (candidateIds, questionIds, sessionResponses, candidateResponses) => {
  const n = questionIds.length;
  const m = candidateIds.length;

  const xA = math.zeros(n).toArray();
  const rA = math.zeros(m, n).toArray();

  const questionIdx = questionIds.reduce((memo, id, i) => ({ ...memo, [id]: i }), {});
  const candidateIdx = candidateIds.reduce((memo, id, i) => ({ ...memo, [id]: i }), {});

  for (const { question_id: questionId, value } of sessionResponses) { // eslint-disable-line no-restricted-syntax, max-len
    xA[questionIdx[questionId]] = value;
  }

  for (const { candidate_id: candidateId, question_id: questionId, value } of candidateResponses) { // eslint-disable-line no-restricted-syntax, max-len
    rA[candidateIdx[candidateId]][questionIdx[questionId]] = value;
  }

  const x = math.matrix(xA);
  const r = math.matrix(rA);

  const scores = math.add(0.5, math.multiply((1 / (2 * n)), math.multiply(r, x))).toArray();
  const candidateAffinities = zip(candidateIds, scores).map(([candidateId, score]) =>
    ({ candidate_id: candidateId, score }));

  return orderBy(candidateAffinities, 'score', 'desc');
};
