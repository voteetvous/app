import dynamo from '../dynamo';

export default async (electionId) => {
  const data = await dynamo.query({
    TableName: dynamo.tableNames.QUESTIONS_TABLE,
    KeyConditionExpression: 'election_id = :election_id',
    ProjectionExpression: 'id, election_id, #text',
    IndexName: 'by_election_id-index',
    ExpressionAttributeNames: {
      '#text': 'text',
    },
    ExpressionAttributeValues: {
      ':election_id': electionId,
    },
  }).promise();

  return data.Items;
};
