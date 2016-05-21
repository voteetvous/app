import React, { PropTypes } from 'react';
import { compose, setPropTypes, setDisplayName } from 'recompose';

const enhance = compose(
  setPropTypes({
    background: PropTypes.string.isRequired,
    children: PropTypes.node,
  }),
  setDisplayName('Card'),
);
export default enhance(({ background, children }) =>
  <div
    style={{
      ...styles.container,
      background,
    }}
  >
    {children}
  </div>);

const styles = {
  container: {
    display: 'flex',
    position: 'absolute',
    borderRadius: 4,
    flexDirection: 'column',
    padding: 20,
    height: '100%',
    width: '100%',
  },
};
