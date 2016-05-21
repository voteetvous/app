import React, { PropTypes } from 'react';
import { compose, setDisplayName, setPropTypes } from 'recompose';
// import { Motion } from 'react-motion';
import Card from './Card';
import europeIcon from './europe.png';

const iconsIndex = {
  europe: europeIcon,
};


const enhance = compose(
  setPropTypes({
    question: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  }),
  setDisplayName('Question'),
);
export default enhance(({ question: { text, color = '#5cc2f1' } }) =>
  <Card
    background={color}
  >
    <div style={styles.iconContainerContainer}>
      <div style={styles.iconContainer}>
        <img style={styles.icon} alt={text} src={iconsIndex.europe} />
      </div>
    </div>
    <div style={styles.title}>{text}</div>
  </Card>,
);

const styles = {
  iconContainerContainer: {
    flex: 1,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexDirection: 'column',
  },
  iconContainer: {
    display: 'flex',
    flex: 1,
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    maxHeight: '100px',
    maxWidth: '100px',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 300,
    padding: 10,
    textAlign: 'center',
  },
  questionMark: {
    position: 'absolute',
    top: 7,
    right: 7,
    height: 24,
    width: 24,
    borderColor: 'white',
    borderWidth: 2,
    borderStyle: 'solid',
    textAlign: 'center',
    color: 'white',
    borderRadius: '100%',
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: '400',
  },
};
