import 'source-map-support/register';
import AWS from 'aws-sdk';
import { graphql } from 'graphql';
import jwt from 'jsonwebtoken';
import λ from '../../../lib/fWrapper';
import Schema from './schema';

const APP_SECRET = 'APP_SECRET';

let decrypted = {};

async function decrypt(variableName) {
  let val = decrypted[variableName];

  if (val) {
    return val;
  }

  const encrypted = process.env[variableName];

  const kms = new AWS.KMS();
  const data = await kms.decrypt({ CiphertextBlob: new Buffer(encrypted, 'base64') }).promise();
  val = data.Plaintext.toString('ascii');
  decrypted = { ...decrypted, [variableName]: val };

  return val;
}

async function authenticate(secret, event) {
  const { headers: { Authorization: authorizationHeader } = {} } = event;
  if (!authorizationHeader) {
    return {};
  }

  const token = authorizationHeader.replace('Bearer ', '');
  return jwt.verify(token, secret);
}

function parseVariables(variables) {
  if (typeof variables === 'string') {
    return JSON.parse(variables);
  }

  return variables;
}

export default λ(async (event) => {
  const { requestContext: { identity: { sourceIp: ip } } } = event;
  const body = JSON.parse(event.body);

  const { query } = body;
  const variables = parseVariables(body.variables);

  const secret = await decrypt(APP_SECRET);

  const context = {
    ...(await authenticate(secret, event)),
    ip,
    secret,
  };

  const result = await graphql(Schema, query, null, context, variables);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(result),
  };
});
