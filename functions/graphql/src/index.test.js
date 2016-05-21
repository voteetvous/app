import fn from './index';

describe('Lambda handler', () => {
  test('Can be called', () => {
    fn({
      body: JSON.stringify({
        query: '{}',
      }),
    });
  });
});
