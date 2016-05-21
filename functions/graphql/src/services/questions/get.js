export default async (dynamo, questionId) => {
  const data = await dynamo.query({
    TableName: dynamo.tableNames.QUESTIONS_TABLE,
    KeyConditionExpression: 'id = :question_id',
    ProjectionExpression: 'id, #text, election_id',
    ExpressionAttributeValues: {
      ':question_id': questionId,
    },
    ExpressionAttributeNames: {
      '#text': 'text',
    },
  }).promise();

  return data.Items[0];
};
