import guuid from 'uuid/v4';
import dynamo from '../dynamo';

export default async (sessionId, questionId, responseAttributes) => {
  const candidateResponse = {
    id: guuid(),
    session_id: sessionId,
    question_id: questionId,
    ...responseAttributes,
    created_at: new Date(),
  };

  await dynamo.put({
    TableName: dynamo.tableNames.SESSION_RESPONSES_TABLE,
    Item: {
      ...candidateResponse,
      created_at: candidateResponse.created_at.toJSON(),
    },
  }).promise();

  return candidateResponse;
};
