import guuid from 'uuid/v4';
import groupBy from 'lodash/groupBy';
import values from 'lodash/values';
import map from 'lodash/map';
import getSession from '../sessions/get';
import dynamo from '../dynamo';

async function putResponseGroup(sessionId, responseGroup) {
  const now = new Date();
  await dynamo.batchWrite({
    RequestItems: {
      [dynamo.tableNames.SESSION_RESPONSES_TABLE]:
        responseGroup.map(({ question_id: questionId, value }) => ({
          PutRequest: {
            Item: {
              id: guuid(),
              session_id: sessionId,
              question_id: questionId,
              value,
              created_at: now.toJSON(),
            },
          },
        })),
    },
  }).promise();
}

export default async (sessionId, responses) => {
  // responses might have more than 25 elements
  const responsesGroups = values(groupBy(responses, (r, idx) => Math.floor(idx / 25)));
  console.log(responsesGroups);
  await Promise.all(map(responsesGroups, rg => putResponseGroup(sessionId, rg)));
  console.log('SAVED');

  // Return the session
  return getSession(sessionId);
};
