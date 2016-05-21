import dynamo from '../dynamo';

export default async (electionId) => {
  const data = await dynamo.query({
    TableName: dynamo.tableNames.ELECTIONS_TABLE,
    KeyConditionExpression: 'id = :election_id',
    ProjectionExpression: 'id, #name',
    ExpressionAttributeNames: {
      '#name': 'name',
    },
    ExpressionAttributeValues: {
      ':election_id': electionId,
    },
  }).promise();

  return data.Items[0];
};
