import dynamo from '../dynamo';

export default async (sessionId) => {
  const data = await dynamo.get({
    TableName: dynamo.tableNames.SESSIONS_TABLE,
    Key: { id: sessionId },
  }).promise();

  return data.Item;
};
