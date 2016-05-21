import React, { PropTypes } from 'react';
import { compose, setPropTypes } from 'recompose';

const enhance = compose(
  setPropTypes({
    start: PropTypes.func.isRequired,
  }),
);

export default enhance(({ viewResults }) =>
  <button style={styles.button} onClick={viewResults}>Suite des résultats</button>,
);

const styles = {
  button: {
    color: 'rgb(14, 122, 254)',
    background: 'transparent',
    border: '2px solid rgb(14, 122, 254)',
    borderRadius: 4,
    padding: '5 10',
  },
};
