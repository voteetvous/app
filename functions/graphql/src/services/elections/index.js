import create from './create';
import getCurrent from './getCurrent';

export default resources => ({
  create: create(resources),
  getCurrent: getCurrent(resources),
});
