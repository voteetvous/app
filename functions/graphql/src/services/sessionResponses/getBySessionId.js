import { chain, orderBy } from 'lodash';
import dynamo from '../dynamo';

export default async (sessionId) => {
  const data = await dynamo.query({
    TableName: dynamo.tableNames.SESSION_RESPONSES_TABLE,
    IndexName: 'by_session_id-index',
    ProjectionExpression: 'id, question_id, created_at, #value',
    KeyConditionExpression: 'session_id = :session_id',
    ExpressionAttributeValues: {
      ':session_id': sessionId,
    },
    ExpressionAttributeNames: {
      '#value': 'value',
    },
  }).promise();

  const responses = data.Items.map(({ created_at: createdAt, ...attrs }) => ({
    ...attrs,
    created_at: new Date(createdAt),
  }));

  return chain(responses)
    .groupBy('question_id')
    .map(responseGroup => orderBy(responseGroup, 'created_at', 'desc')[0])
    .value();
};
