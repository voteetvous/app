import { GraphQLInputObjectType, GraphQLID, GraphQLNonNull } from 'graphql';
import ResponseValue from './ResponseValue';

export default new GraphQLInputObjectType({
  name: 'SessionResponseInput',
  fields: {
    question_id: { type: new GraphQLNonNull(GraphQLID) },
    value: { type: new GraphQLNonNull(ResponseValue) },
  },
});
