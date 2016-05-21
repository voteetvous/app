import React, { PropTypes } from 'react';
import { compose, setPropTypes, setDisplayName, withProps } from 'recompose';
import slice from 'lodash/slice';
// import flatten from 'lodash/flatten';
// import compact from 'lodash/compact';
import { spring, TransitionMotion } from 'react-motion';
import StartCard from './StartCard';
import QuestionCard from './QuestionCard';
import ResultsCard from './ResultsCard';

const responsesToInt = {
  AGREE: 1,
  DISAGREE: -1,
  NEUTRAL: 0,
};
const responseToInt = r => (responsesToInt[r] || 0);

const cardKey = (card) => {
  switch (card.type) {
    case 'start-card': return 'start-card';
    case 'question': return `question-${card.question.id}`;
    case 'results-card': return 'results-card';
    default: return 'default';
  }
};
const cardTranslateX = (card, responses) =>
  (card.type === 'question' ?
    (responseToInt(responses[card.question.id]) * 100) :
    0);

const cardRotateZ = (card, responses) =>
  (card.type === 'question' ?
    (responseToInt(responses[card.question.id]) * 15) :
    0);

const renderCard = (key, card) => {
  switch (card.type) {
    case 'start-card': return <StartCard key={key} card={card} />;
    case 'question': return (<QuestionCard
      key={key} question={card.question} response={card.response}
    />);
    case 'results-card': return <ResultsCard key={key} card={card} />;
    default: return null;
  }
};

const enhance = compose(
  setPropTypes({
    currentIndex: PropTypes.number.isRequired,
  }),
  withProps(({ cards, currentIndex }) => ({
    cards,
    firstRemainingCards: slice(cards, currentIndex, currentIndex + 3),
  })),
  setDisplayName('CardStack'),
);
export default enhance(({ firstRemainingCards, responses }) => (
  <div style={styles.container}>
    <TransitionMotion
      styles={firstRemainingCards.map((card, cardIndex) => ({
        key: cardKey(card),
        style: {
          opacity: spring(1),
          translateZ: spring(cardIndex * 50),
          translateX: spring(cardTranslateX(card, responses)),
          rotateZ: spring(cardRotateZ(card, responses)),
        },
        data: { card },
      }))}
      defaultStyles={[]}
      willEnter={() => ({
        opacity: 0,
        translateZ: 150,
        translateX: 0,
        rotateZ: 0,
      })}
      willLeave={config => ({
        opacity: spring(0),
        translateZ: spring(0),
        translateX: spring(cardTranslateX(config.data.card, responses)),
        rotateZ: spring(cardRotateZ(config.data.card, responses)),
      })}
    >
      { interpolatedStyles =>
        <div style={styles.stackContainer}>
          {interpolatedStyles.map((config, index) =>
            <div
              key={config.key}
              style={{
                ...styles.cardContainer,
                opacity: config.style.opacity,
                zIndex: -index,
                transform: `
                  rotate(${config.style.rotateZ}deg)
                  translate3d(${config.style.translateX}px, 0, -${config.style.translateZ}px)
                `,
              }}
            >
              { renderCard(config.key, config.data.card) }
            </div>,
          )}
        </div>
      }
    </TransitionMotion>
  </div>
));

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  stackContainer: {
    alignSelf: 'center',
    display: 'flex',
    width: 240,
    height: 240,
    position: 'relative',
    perspective: '1000px',
    perspectiveOrigin: '50% -50%',
  },
  cardContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
};
