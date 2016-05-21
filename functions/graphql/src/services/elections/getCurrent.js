import dynamo from '../dynamo';

export default async () => {
  console.log('GET CURRENT ELECTION');
  try {
    const data = await dynamo.query({
      TableName: dynamo.tableNames.ELECTIONS_TABLE,
      IndexName: 'is_current-index',
      ProjectionExpression: 'id, #name, is_current',
      KeyConditionExpression: 'is_current = :yes',
      ExpressionAttributeValues: {
        ':yes': 'YES',
      },
      ExpressionAttributeNames: {
        '#name': 'name',
      },
    }).promise();

    console.log(data);

    return data.Items[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};
