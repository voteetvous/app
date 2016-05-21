import dynamo from '../dynamo';

export default async (ids = []) => {
  if (ids.length === 0) {
    return [];
  }

  const params = {
    RequestItems: {
      [dynamo.tableNames.CANDIDATES_TABLE]: {
        Keys: ids.map(id => ({ id })),
        ProjectionExpression: 'id, first_name, last_name',
      },
    },
  };
  const data = await dynamo.batchGet(params).promise();

  return data.Responses[dynamo.tableNames.CANDIDATES_TABLE];
};
