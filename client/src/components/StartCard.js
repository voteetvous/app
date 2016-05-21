import React from 'react';
import idx from 'idx';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import Card from './Card';
import logo from './voteetvous.png';

const enhance = compose(
  setPropTypes({
  }),
  setDisplayName('StartCard'),
);
export default enhance(({ card: { election } }) =>
  <Card background="#0257a0">
    <div style={styles.container}>
      <img style={styles.logo} src={logo} alt="Vote & Vous" />
      <div style={styles.electionName}>{idx(election, _ => _.name)}</div>
      <p style={styles.intro}>
        Bienvenue sur que questionaire de Vote&Vous
      </p>
      <div style={styles.partner}>
        <div style={styles.partnerText}>En partenariat avec</div>
      </div>
    </div>
  </Card>,
);

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    fontSize: 18,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: 'white',
    fontWeight: 300,
  },
  voteetvous: {
    fontSize: '1.6em',
    fontWeight: 100,
    color: 'white',
  },
  logo: {
    justifySelf: 'flex-start',
    width: '120px',
  },
  intro: {
    textAlign: 'center',
    // fontStyle: 'italic',
  },
  partnerText: {
    fontSize: '0.8em',
  },
};
