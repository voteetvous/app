import guuid from 'uuid/v4';
import dynamo from '../dynamo';

export default async ({ election_id: electionId, ...candidateAttributes }) => {
  const candidate = {
    id: guuid(),
    election_id: electionId,
    ...candidateAttributes,
  };

  await dynamo.put({
    TableName: dynamo.tableNames.CANDIDATES_TABLE,
    Item: candidate,
  }).promise();

  return candidate;
};
