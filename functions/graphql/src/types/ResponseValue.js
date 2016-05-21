import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'ResponseValue',
  values: {
    AGREE: {
      value: 1,
    },
    DISAGREE: {
      value: -1,
    },
    NEUTRAL: {
      value: 0,
    },
  },
});
