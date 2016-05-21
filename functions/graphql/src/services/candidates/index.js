import create from './create';
import getByIds from './getByIds';
import getByElectionId from './getByElectionId';

export default resources => ({
  create: create(resources),
  getByIds: getByIds(resources),
  getByElectionId: getByElectionId(resources),
});
