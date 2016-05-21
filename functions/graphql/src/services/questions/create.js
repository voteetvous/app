import guuid from 'uuid/v4';
import dynamo from '../dynamo';

export default async ({ electionId, ...questionAttributes }) => {
  const question = {
    id: guuid(),
    election_id: electionId,
    ...questionAttributes,
  };

  await dynamo.put({
    TableName: dynamo.tableNames.QUESTIONS_TABLE,
    Item: question,
  }).promise();

  return question;
};
