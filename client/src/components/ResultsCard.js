import React from 'react';
import idx from 'idx';
import orderBy from 'lodash/orderBy';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import { compose, setPropTypes, setDisplayName, withProps } from 'recompose';
import { gql, graphql } from 'react-apollo';
import { TransitionMotion, spring } from 'react-motion';
import Card from './Card';

const ResultsQuery = gql`
  query ResultsQuery {
    session {
      id
      candidates {
        id
        first_name
        last_name
      }
      results {
        candidate_affinities {
          candidate_id
          score
        }
      }
    }
  }
`;

const enhance = compose(
  setPropTypes({}),
  graphql(ResultsQuery, {
    name: 'resultsData',
    skip: ({ card: { allRespondedAndSaved } }) => !allRespondedAndSaved,
  }),
  withProps(({ resultsData }) => ({
    candidatesById: mapValues(
      groupBy(
        (idx(resultsData, _ => _.session.candidates || [])),
        'id',
      ),
      ids => ids[0],
    ),
    affinities: orderBy(
      (idx(resultsData, _ => _.session.results.candidate_affinities) || []),
      'score',
      'desc',
    ),
  })),
  withProps(({ candidatesById, affinities }) => ({
    affinities: affinities.map(affinity => ({
      ...affinity,
      candidate: candidatesById[affinity.candidate_id],
    })),
  })),
  setDisplayName('ResultsCard'),
);
export default enhance(({ affinities }) =>
  <Card background="#eee">
    { affinities.length > 0 ?
      <TransitionMotion
        defaultStyles={affinities.map(affinity => ({
          key: affinity.candidate_id,
          style: { opacity: 0 },
          data: { type: 'result', affinity },
        }))}
        styles={previnterpolatedstyles => previnterpolatedstyles.map((_, i) =>
          ({
            key: previnterpolatedstyles[i].key,
            data: previnterpolatedstyles[i].data,
            style: {
              opacity: i === 0 ?
                spring(1) :
                spring(previnterpolatedstyles[i - 1].style.opacity),
            },
          }),
        )}
        // willEnter={() => ({ opacity: 0 })}
      >
        {interpolatedStyles =>
          <div>
            {interpolatedStyles.map(({ key, style, data: { affinity } }) =>
              <div
                key={key}
                style={{
                  ...styles.affinityContainer,
                  opacity: style.opacity,
                }}
              >
                <div style={styles.names}>
                  <div style={styles.firstName}>{affinity.candidate.first_name}</div>
                  <div style={styles.lastName}>{affinity.candidate.last_name}</div>
                </div>
                <div style={styles.progessbar}>
                  <div style={{ ...styles.progressContent, width: `${Math.floor(style.opacity * affinity.score * 100)}%` }} />
                </div>
              </div>,
            )}
          </div>
        }
      </TransitionMotion> : null}
  </Card>);

const styles = {
  affinityContainer: {
    padding: '0 0 10 0',
    fontWeight: 200,
  },
  progessbar: {
    height: 2,
    borderRadius: 1,
    background: '#ccc',
    position: 'relative',
  },
  progressContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    background: 'rgb(14, 122, 254)',
    borderRadius: 1,
  },
  names: {
    padding: '5 0 5 0',
  },
  firstName: {
    // size: ''
  },
  lastName: {
    fontSize: '1.2em',
    fontWeight: 300,
  },
};
