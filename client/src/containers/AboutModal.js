import React, { Component, PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { spring, TransitionMotion } from 'react-motion';
import { HIDE_ABOUT } from '../redux/modules/ui';

const mapStateToProps = createStructuredSelector({
  shouldShow: ({ ui: { showAbout } }) => showAbout,
});

const mapDispatchToProps = {
  hide: () => ({ type: HIDE_ABOUT }),
};

@connect(mapStateToProps, mapDispatchToProps)
export default class AboutModal extends Component {
  static propTypes = {
    shouldShow: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
  };

  render() {
    const { shouldShow, hide } = this.props;

    return (
      <TransitionMotion
        willLeave={() => ({ opacity: spring(0), top: spring(0) })}
        willEnter={() => ({ opacity: 1, top: 100 })}
        styles={
          !shouldShow ?
            [] :
            [{ key: 'modal', style: { opacity: spring(1), top: spring(0) } }]
        }
      >
        { interpolatedStyles =>
          <span>
            {interpolatedStyles.map(config =>
              <div
                key={config.key}
                style={{
                  ...styles.container,
                  opacity: config.style.opacity,
                  top: `${config.style.top}%`,
                }}
              >
                <div
                  style={styles.closeButton}
                  onClick={() => {
                    hide();
                  }}
                >x</div>
                <p>
                  Cette application vous est proposé par <a href="https://www.vote-et-vous.fr">Vote&Vous</a> en
                  partenariat avec <a href="https://www.publicsenat.fr">Public Sénat</a> et
                  a réalisé par <a href="mailto:paul@chobert.fr">Paul Chobert</a>.
                </p>
                <p>Les sources de l'application sont disponible sur le <a href="https://github.com/voteetvous/app">github de l'association</a>.</p>
              </div>
            )}
          </span>
        }
      </TransitionMotion>
    );
  }
}

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#39CCCC',
    color: 'white',
    padding: 10,
    paddingRight: 30,
    fontFamily: 'Helvetica Neue',
    // fontWeight: '200',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    fontWeight: '100',
    // border: '1px solid white',
    fontSize: 24,
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: '24px',
    cursor: 'pointer',
  },
};
