import AWS from 'aws-sdk';

const { APP_NAME, APP_ENV } = process.env;

const prefixTable = name => `${APP_NAME}-${APP_ENV}-${name}`;

const ELECTIONS_TABLE = prefixTable('elections');
const CANDIDATES_TABLE = prefixTable('candidates');
const SESSIONS_TABLE = prefixTable('sessions');
const QUESTIONS_TABLE = prefixTable('questions');
const CANDIDATE_RESPONSES_TABLE = prefixTable('candidate-responses');
const SESSION_RESPONSES_TABLE = prefixTable('session-responses');

const dynamoConfig = {
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: 'eu-central-1',
};

const dynamo = new AWS.DynamoDB.DocumentClient(dynamoConfig);

dynamo.tableNames = {
  ELECTIONS_TABLE,
  CANDIDATES_TABLE,
  SESSIONS_TABLE,
  QUESTIONS_TABLE,
  CANDIDATE_RESPONSES_TABLE,
  SESSION_RESPONSES_TABLE,
};

export default dynamo;
