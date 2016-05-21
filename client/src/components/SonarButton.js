import React, { Component, PropTypes } from 'react';
import uuidV1 from 'uuid/v1';
import { spring, TransitionMotion } from 'react-motion';

export default class SonarButton extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    color: '#aaa',
    disabled: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      waves: [],
    };
  }

  componentDidUpdate() {
    this.removeWaves();
  }

  onClick = () => {
    const { onClick } = this.props;
    this.setState({
      waves: [
        ...this.state.waves,
        { key: uuidV1() },
      ],
    });
    onClick();
  }

  removeWaves() {
    if (this.state.waves.length > 0) {
      this.setState({ waves: [] });
    }
  }

  render() {
    const { children, disabled, color } = this.props;
    const { waves } = this.state;

    return (
      <button
        style={{
          ...styles.container,
          color,
          borderColor: color,
        }}
        onClick={this.onClick}
        disabled={disabled}
      >
        <TransitionMotion
          styles={waves.map(({ key }) => ({
            key,
            style: {
              opacity: 1,
              scale: 1,
            },
          }))}
          willLeave={() => ({
            opacity: spring(0),
            scale: spring(1.5),
          })}
        >
          {interpolatedStyles =>
            <div style={styles.wavesContainer}>
              {interpolatedStyles.map(config =>
                <div
                  key={config.key}
                  style={{
                    ...styles.wave,
                    borderColor: color,
                    opacity: config.style.opacity,
                    transform: `scale(${config.style.scale})`,
                  }}
                />,
              )}
            </div>
          }
        </TransitionMotion>
        {children}
      </button>
    );
  }
}

const styles = {
  container: {
    height: 50,
    width: 50,
    borderWidth: 3,
    borderStyle: 'solid',
    borderRadius: 25,
    background: 'transparent',
    outline: 0,
    fontSize: 22,
    padding: 0,
    position: 'relative',
  },
  wave: {
    position: 'absolute',
    zIndex: -1,
    top: -3,
    bottom: -3,
    left: -3,
    right: -3,
    borderWidth: 3,
    borderStyle: 'solid',
    borderRadius: '50%',
  },
};
