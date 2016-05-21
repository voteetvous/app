import Election from '../types/election';
import getCurrentElection from '../services/elections/getCurrent';

export default {
  type: Election,
  description: 'The current election',
  resolve: () => getCurrentElection(),
};
