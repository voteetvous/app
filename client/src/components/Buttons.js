import React from 'react';
import { compose, setDisplayName } from 'recompose';
import { TransitionMotion, spring } from 'react-motion';
import StartButton from './StartButton';
import ReplyButtons from './ReplyButtons';
import ViewResultsButton from './ViewResultsButton';

const cardTypeComponent = {
  'start-card': StartButton,
  question: ReplyButtons,
  'results-card': ViewResultsButton,
};

const currentCardToStyles = currentCard =>
  (currentCard ?
  [
    {
      key: `${currentCard.type}`,
      style: {
        opacity: spring(1),
        translateY: spring(0),
      },
      data: { Component: cardTypeComponent[currentCard.type] },
    },
  ] : []);

const enhance = compose(
  setDisplayName('Buttons'),
);
export default enhance(({ currentCard, ...props }) =>
  <TransitionMotion
    styles={currentCardToStyles(currentCard)}
    willEnter={() => ({
      opacity: 0,
      translateY: 20,
    })}
    willLeave={() => ({
      opacity: spring(0),
      translateY: spring(0),
    })}
  >
    { interpolatedStyles =>
      <div style={styles.container}>
        {interpolatedStyles.map(config =>
          <div
            key={config.key}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: config.style.opacity,
              transform: `translate(0, ${config.style.translateY}px)`,
            }}
          >
            <config.data.Component {...props} />
          </div>,
        )}
      </div>
    }
  </TransitionMotion>,
);

const styles = {
  container: {
    display: 'flex',
    zIndex: 1000,
    paddingTop: 20,
    height: 100,
    width: '100%',
    flexDirection: 'row',
    position: 'relative',
  },
};
