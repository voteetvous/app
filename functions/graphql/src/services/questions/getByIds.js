import dynamo from '../dynamo';

export default async (questionIds = []) => {
  if (questionIds.length < 1) {
    return [];
  }

  const params = {
    RequestItems: {
      [dynamo.tableNames.QUESTIONS_TABLE]: {
        Keys: questionIds.map(id => ({ id })),
        ProjectionExpression: 'id, #text',
        ExpressionAttributeNames: {
          '#text': 'text',
        },
      },
    },
  };
  const data = await dynamo.batchGet(params).promise();

  return data.Responses[dynamo.tableNames.QUESTIONS_TABLE];
};
