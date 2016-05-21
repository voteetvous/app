import { chain, orderBy } from 'lodash';
import dynamo from '../dynamo';

export default async (electionId) => {
  const data = await dynamo.query({
    TableName: dynamo.tableNames.CANDIDATE_RESPONSES_TABLE,
    IndexName: 'by_election_id-index',
    ProjectionExpression: 'id, candidate_id, question_id, created_at, #value, #text',
    KeyConditionExpression: 'election_id = :election_id',
    ExpressionAttributeValues: {
      ':election_id': electionId,
    },
    ExpressionAttributeNames: {
      '#value': 'value',
      '#text': 'text',
    },
  }).promise();

  const responses = data.Items.map(({ created_at: createdAt, ...attrs }) => ({
    ...attrs,
    created_at: new Date(createdAt),
    key: `${attrs.candidate_id}--${attrs.question_id}`,
  }));

  return chain(responses)
    .groupBy('key')
    .map(responseGroup => orderBy(responseGroup, 'created_at', 'desc')[0])
    .value();
};
