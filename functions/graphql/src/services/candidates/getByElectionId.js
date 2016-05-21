import dynamo from '../dynamo';

export default async (electionId) => {
  const data = await dynamo.query({
    TableName: dynamo.tableNames.CANDIDATES_TABLE,
    IndexName: 'by_election_id-index',
    ProjectionExpression: 'id, first_name, last_name',
    KeyConditionExpression: 'election_id = :election_id',
    ExpressionAttributeValues: {
      ':election_id': electionId,
    },
  }).promise();

  return data.Items;
};
