import React, { PropTypes } from 'react';
import { compose, setPropTypes, setDisplayName } from 'recompose';
import SonarButton from './SonarButton';

const enhance = compose(
  setPropTypes({
    agree: PropTypes.func.isRequired,
    disagree: PropTypes.func.isRequired,
    pass: PropTypes.func.isRequired,
  }),
  setDisplayName('ReplyButtons'),
);
export default enhance(({ agree, disagree, pass }) =>
  <div style={styles.buttonsContainer}>
    <div style={styles.sonarButtonsContainer}>
      <div style={styles.buttonContainer}>
        <SonarButton
          onClick={() => { disagree(); }}
          disabled={false}
          color="#e66868"
        >
          <i className="fa fa-times" />
        </SonarButton>
      </div>
      <div style={styles.buttonContainer}>
        <SonarButton
          onClick={() => { agree(); }}
          disabled={false}
          color="#81d47d"
        >
          <i className="fa fa-check" />
        </SonarButton>
      </div>
    </div>
    <button onClick={pass} style={styles.passButton}>Indifférent</button>
  </div>);

const styles = {
  buttonsContainer: {
    display: 'flex',
    zIndex: 1000,
    flexDirection: 'column',
  },
  sonarButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonContainer: {
    padding: '0 10 0 10',
  },
  passButton: {
    marginTop: 10,
    background: 'transparent',
    border: '2px solid #bbb',
    color: '#bbb',
    borderRadius: 4,
    padding: '5 10',
  },
};
