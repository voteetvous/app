import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
export default class Spinner extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
  };

  static defaultProps = {
    color: 'black',
  };

  render() {
    const { color } = this.props;
    return (
      <div
        style={{
          ...styles.inner,
          backgroundColor: color,
        }}
      />
    );
  }
}

const pulseKeyframes = Radium.keyframes({
  '0%': { transform: 'scale(0)' },
  '100%': {
    transform: 'scale(1.0)',
    opacity: 0,
  },
}, 'pulse');

const styles = {
  inner: {
    // Use a placeholder animation name in `animation`
    animation: 'x 1.0s infinite ease-in-out',
    // Assign the result of `keyframes` to `animationName`
    animationName: pulseKeyframes,
    borderRadius: '100%',
    width: '40px',
    height: '40px',
    margin: '100px auto',
  },
};

// .spinner {
//   width: 40px;
//   height: 40px;
//   margin: 100px auto;
//   background-color: #333;
//
//   border-radius: 100%;
//   -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
//   animation: sk-scaleout 1.0s infinite ease-in-out;
// }
//
// @-webkit-keyframes sk-scaleout {
//   0% { -webkit-transform: scale(0) }
//   100% {
//     -webkit-transform: scale(1.0);
//     opacity: 0;
//   }
// }
//
// @keyframes sk-scaleout {
//   0% {
//     -webkit-transform: scale(0);
//     transform: scale(0);
//   } 100% {
//     -webkit-transform: scale(1.0);
//     transform: scale(1.0);
//     opacity: 0;
//   }
// }
