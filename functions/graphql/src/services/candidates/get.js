import dynamo from '../dynamo';

export default async candidateId =>
  (await dynamo.get({
    TableName: dynamo.tableNames.CANDIDATES_TABLE,
    Key: { id: candidateId },
  }).promise()).Item;
