import React, { PropTypes } from 'react';
import { compose, setPropTypes, setDisplayName, withState, withProps, lifecycle, renderNothing, branch } from 'recompose';
import { TransitionMotion, spring } from 'react-motion';

const enhance = compose(
  branch(
    ({ messages }) => messages.length === 0,
    renderNothing,
  ),
  withState('currentIndex', 'setCurrentIndex', 0),
  withProps(({ currentIndex, setCurrentIndex, messages }) => ({
    nextMessage: () => setCurrentIndex((currentIndex + 1) % messages.length),
  })),
  withProps(({ messages, currentIndex }) => ({
    message: messages[currentIndex],
  })),
  lifecycle({
    componentDidMount() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => { this.props.nextMessage(); }, 2000);
    },
    componentWillReceiveProps(nextProps) {
      if (this.mounted && this.props.message !== nextProps.message) {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => { nextProps.nextMessage(); }, 2000);
      }
    },
    componentWillUnmount() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
    },
  }),
  setPropTypes({
    message: PropTypes.shape({
      text: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }),
  setDisplayName('BackgroundMessages'),
);
export default enhance(({ message }) =>
  <TransitionMotion
    styles={message ? [{
      key: message.id,
      style: {
        opacity: spring(1),
        translateY: spring(0),
      },
      data: { message },
    }] : []}
    willEnter={() => ({
      opacity: 0,
      translateY: -20,
    })}
    willLeave={() => ({
      opacity: spring(0),
      translateY: spring(20),
    })}
  >
    {interpolatedStyles =>
      <div style={styles.container}>
        {interpolatedStyles.map(config =>
          <div
            key={config.key}
            style={{
              ...styles.message,
              opacity: config.style.opacity,
              transform: `translate(0, ${config.style.translateY}px)`,
            }}
          >
            { config.data.message.text }
          </div>,
        )}
      </div>
    }
  </TransitionMotion>);

const styles = {
  container: {
    position: 'absolute',
    color: '#ccc',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    textAlign: 'center',
    padding: 20,
  },
};
