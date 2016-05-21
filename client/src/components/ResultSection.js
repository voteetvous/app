import React from 'react';

export default (({ name, items, component: Component })) =>
  <div style={styles.container}>
    <div style={styles.name}>{ name }</div>
    <div style={styles.itemsContainer}>
    </div>
  </div>;

const styles = {
  container: {
    display: 'flex',
  },
  name: {
    padding: 10,
  },
};
