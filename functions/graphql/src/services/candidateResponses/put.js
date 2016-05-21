import guuid from 'uuid/v4';
import dynamo from '../dynamo';

export default async (candidateId, questionId, responseAttributes) => {
  const candidateResponse = {
    id: guuid(),
    candidate_id_question_id: `${candidateId}--${questionId}`,
    candidate_id: candidateId,
    question_id: questionId,
    ...responseAttributes,
    created_at: new Date(),
  };

  await dynamo.put({
    TableName: dynamo.tableNames.CANDIDATE_RESPONSES_TABLE,
    Item: {
      ...candidateResponse,
      created_at: candidateResponse.created_at.toJSON(),
    },
  }).promise();

  return candidateResponse;
};
