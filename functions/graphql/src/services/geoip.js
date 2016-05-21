import fetch from 'node-fetch';
import omit from 'lodash/omit';

export default async (ip) => {
  try {
    const response = await fetch(`https://freegeoip.net/json/${ip}`);
    const data = await response.json();
    return omit(data, ['ip']);
  } catch (err) {
    return {};
  }
};
