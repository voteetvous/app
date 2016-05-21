export default async (dynamo, electionId) => {
  const data = await dynamo.query({
    TableName: dynamo.tableNames.ELECTIONS_TABLE,
    KeyConditionExpression: '#id = :election_id',
    ExpressionAttributeNames: {
      '#id': 'id',
    },
    ExpressionAttributeValues: {
      ':election_id': electionId,
    },
  }).promise();

  if (data.Items.length < 1) {
    throw new Error('Election id does not exits');
  }
};
