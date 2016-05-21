import React from 'react';
import { connect } from 'react-redux';
import idx from 'idx';
import {
  compose,
  setDisplayName,
  withProps,
  renderNothing,
  renderComponent,
  branch,
  lifecycle,
  withState,
  withHandlers,
} from 'recompose';
import { gql, graphql } from 'react-apollo';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import { FETCH_SESSION_TOKEN } from '../redux/modules/session';
import CandidateAffinity from '../components/CandidateAffinity';
import Section from '../components/Section';
import SectionItem from '../components/SectionItem';


const BY_QUESTIONS = 'BY_QUESTIONS';
const BY_CANDIDATES = 'BY_CANDIDATES';

const SessionQuery = gql`
  query Session($session_id: ID!) {
    session(id: $session_id) {
      id
      candidates {
        id
        first_name
        last_name
      }
      questions {
        id
        text
      }
      results {
        candidate_responses {
          question_id
          candidate_id
          value
        }
        session_responses {
          question_id
          value
        }
        candidate_affinities {
          candidate_id
          score
        }
      }
    }
  }
`;

const enhance = compose(
  withProps(({ match }) => ({ sessionId: idx(match, _ => _.params.sessionId) })),
  connect(
    ({ session: sessionToken }) => ({ sessionToken }),
    (dispatch, { sessionId }) => ({
      fetchSessionToken: () => { dispatch({ type: FETCH_SESSION_TOKEN, sessionId }); },
    }),
  ),
  lifecycle({
    componentWillMount() {
      const { fetchSessionToken, sessionToken } = this.props;
      if (!sessionToken) {
        fetchSessionToken();
      }
    },
  }),
  graphql(SessionQuery, {
    name: 'sessionData',
    options: ({ sessionId }) => ({ variables: { session_id: sessionId } }),
    skip: ({ sessionId, sessionToken }) => !sessionToken || !sessionId,
  }),
  branch(
    ({ sessionData }) => idx(sessionData, _ => _.loading),
    renderComponent(() => <div>chargement</div>),
  ),
  branch(
    ({ sessionData }) => !sessionData || idx(sessionData, _ => _.error),
    renderNothing,
  ),
  withProps(({ sessionData }) => ({
    affinities: idx(sessionData, _ => _.session.results.candidate_affinities),
    candidates: idx(sessionData, _ => _.session.candidates),
    questions: idx(sessionData, _ => _.session.questions),
    candidateResponses: idx(sessionData, _ => _.session.results.candidate_responses),
  })),
  withProps(({ candidateResponses, questions, candidates }) => ({
    candidateResponses: mapValues(groupBy(candidateResponses, 'candidate_id'), responses =>
      mapValues(groupBy(responses, 'question_id'), r => r[0]),
    ),
    questionsById: mapValues(groupBy(questions, 'id'), _ => _[0]),
    candidatesById: mapValues(groupBy(candidates, 'id'), _ => _[0]),
  })),
  withState('selectedTab', 'setSelectedTab', BY_QUESTIONS),
  withHandlers({
    showByQuestionsTab: ({ setSelectedTab }) => (e) => {
      e.preventDefault();
      setSelectedTab(BY_QUESTIONS);
    },
    showByCandidatesTab: ({ setSelectedTab }) => (e) => {
      e.preventDefault();
      setSelectedTab(BY_CANDIDATES);
    },
  }),
  setDisplayName('Results'),
);
export default enhance(({
  affinities,
  candidates,
  questions,
  showByCandidatesTab,
  showByQuestionsTab,
  selectedTab,
  candidatesById,
}) =>
  <div style={styles.container}>
    <div style={styles.content}>
      <div style={styles.logoContainer} />
      <div style={styles.title}>Vos résultats</div>
      <div style={styles.candidateAffinitiesContainer}>
        { affinities.map(({ candidate_id: candidateId, score }) =>
          <CandidateAffinity
            key={candidateId}
            candidate={candidatesById[candidateId]}
            score={score}
          />,
        ) }
      </div>
      <div style={styles.candidateResponsesContainer}>
        <div style={styles.tabBar}>
          <button
            style={{
              ...styles.tab,
              ...selectedTab === BY_QUESTIONS && styles.tabActive,
            }}
            onClick={showByQuestionsTab}
          >Par questions</button>
          <button
            style={{
              ...styles.tab,
              ...selectedTab === BY_CANDIDATES && styles.tabActive,
            }}
            onClick={showByCandidatesTab}
          >Par candidats</button>
        </div>
        { selectedTab === BY_QUESTIONS ?
          <div style={styles.byQuestionsContainer}>
            {questions.map(question =>
              <Section key={question.id} title={question.text}>
                {candidates.map(candidate =>
                  <SectionItem key={candidate.id} style={styles.candidate}>
                    { candidate.first_name }
                  </SectionItem>,
                )}
              </Section>,
            )}
          </div> : null
        }
        { selectedTab === BY_CANDIDATES ?
          <div style={styles.byCandidatesContainer}>
            {candidates.map(candidate =>
              <div key={candidate.id}>
                <div>{candidate.first_name}</div>
                {questions.map(question =>
                  <div key={question.id} style={styles.candidate}>{ question.text }</div>,
                )}
              </div>,
            )}
          </div> : null
        }
      </div>
    </div>
  </div>,
);

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 500,
  },
  title: {
    textAlign: 'center',
    fontSize: '1.4em',
    paddingBottom: 15,
    fontWeight: 300,
  },
  candidateAffinitiesContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  candidateResponsesContainer: {
    // flex: 1,
    display: 'flex',
    flexDirection: 'column',
    // paddingBottom: 20,
  },
  tabBar: {
    // flex: 1,
    flexDirection: 'row',
    display: 'flex',
    // borderBottom: '1px solid #ccc',
    justifyContent: 'space-around',
  },
  tab: {
    flex: 1,
    textAlign: 'center',
    maxWidth: 200,
    background: 'transparent',
    border: 0,
    fontWeight: 300,
    color: '#333',
    borderBottom: '2px solid transparent',
    outline: 'none',
    cursor: 'pointer',
  },
  tabActive: {
    fontWeight: 400,
    color: 'rgb(14, 122, 254)',
    borderBottom: '2px solid rgb(14, 122, 254)',
  },
  byQuestionsContainer: {
    minHeight: '100%',
  },
  byCandidatesContainer: {
    minHeight: '100%',
  },
};
