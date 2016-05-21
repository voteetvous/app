import React, { PropTypes } from 'react';
import { compose, setPropTypes } from 'recompose';

const enhance = compose(
  setPropTypes({
    candidate: PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
    }),
  }),
);
export default enhance(({
  score,
  candidate: {
    first_name: firstName,
    last_name: lastName,
    color = 'blue',
  },
}) =>
  <div style={styles.container}>
    <div style={styles.name}>
      <div style={styles.firstName}>{firstName}</div>
      <div style={styles.lastName}>{lastName}</div>
    </div>
    <div style={styles.progressBar}>
      <div
        style={{
          ...styles.progressContent,
          backgroundColor: color,
          transform: `translate(${(score - 1) * 100}%, 0)`,
        }}
      />
    </div>
  </div>,
);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
  },
  name: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
  },
  firstName: {
    fontWeight: 300,
    fontSize: '0.9em',
  },
  lastName: {
    // fontWeight: 300,
    fontSize: '1em',
    marginLeft: 10,
  },
  progressBar: {
    height: 2,
    position: 'relative',
    borderRadius: 2,
    overflow: 'hidden',
    width: '100%',
  },
  progressContent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
};
