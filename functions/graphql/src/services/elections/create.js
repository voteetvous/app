import guuid from 'uuid/v4';
import dynamo from '../dynamo';

export default async (electionAttributes) => {
  const election = {
    id: guuid(),
    ...electionAttributes,
  };

  await dynamo.put({
    TableName: dynamo.tableNames.ELECTIONS_TABLE,
    Item: election,
  }).promise();

  return election;
};
