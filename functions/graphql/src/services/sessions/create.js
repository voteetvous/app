import guuid from 'uuid/v4';
import crypto from 'crypto';
import { map } from 'lodash';
import dynamo from '../dynamo';
import geoip from '../geoip';

import getQuestionsByElectionId from '../questions/getByElectionId';
import getCandidatesByElectionId from '../candidates/getByElectionId';

export default async (electionId, { ip }) => {
  const [questions, candidates, geoIPData] = await Promise.all([
    getQuestionsByElectionId(electionId),
    getCandidatesByElectionId(electionId),
    geoip(ip),
  ]);

  const session = {
    election_id: electionId,
    id: guuid(),
    secret: (await crypto.randomBytes(48)).toString('hex'),
    progress: {
      current: 0,
      total: 25,
    },
    candidate_ids: map(candidates, 'id'),
    question_ids: map(questions, 'id'),
    created_at: new Date(),
    geoip_data: geoIPData,
  };

  await dynamo.put({
    TableName: dynamo.tableNames.SESSIONS_TABLE,
    Item: {
      ...session,
      created_at: session.created_at.toJSON(),
    },
  }).promise();

  return session;
};
