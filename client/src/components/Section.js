import React, { PropTypes } from 'react';
import { compose, setPropTypes, setDisplayName, withState, withHandlers } from 'recompose';

const enhance = compose(
  withState('collapsed', 'setCollapsed', true),
  withHandlers({
    toggleCollapsed: ({ setCollapsed }) => (e) => {
      e.preventDefault();
      setCollapsed(v => !v);
    },
  }),
  setPropTypes({
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }),
  setDisplayName('Section'),
);
export default enhance(({ title, children, toggleCollapsed, collapsed }) =>
  <div style={styles.container}>
    <div
      style={styles.title}
      onClick={toggleCollapsed}
    >{ title }</div>
    { !collapsed ?
      <div style={styles.content}>
        { children }
      </div> : null }
  </div>,
);

const styles = {
  container: {
  },
};
