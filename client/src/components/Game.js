import React from 'react';
import { connect } from 'react-redux';
import idx from 'idx';
import { gql, graphql } from 'react-apollo';
import size from 'lodash/size';
import defaultTo from 'lodash/defaultTo';
import { compose, setDisplayName, lifecycle, withState, withProps, withReducer, withHandlers } from 'recompose';
import CardStack from './CardStack';
import { SET_SESSION_TOKEN } from '../redux/modules/session';
import Buttons from './Buttons';
import BackgroundMessages from './BackgroundMessages';

const CurrentElectionQuery = gql`
  query CurrentElection {
    currentElection {
      id
      name
    }
  }
`;

const createSession = gql`
  mutation createSession($election_id: ID!) {
    createSession(election_id: $election_id) {
      id
      token
    }
  }
`;

const currentSession = gql`
  query Session {
    session {
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
    }
  }
`;

const putSessionResponseMutation = gql`
  mutation putSessionResponse($question_id: ID!, $value: ResponseValue!) {
    putSessionResponse(question_id: $question_id, value: $value) {
      id
    }
  }
`;

const createAndLoadSession = compose(
  connect(
    ({ session: token }) => ({ token }),
    dispatch => ({
      setSessionToken: (sessionId, token) => {
        dispatch({ type: SET_SESSION_TOKEN, sessionId, token });
      },
    }),
  ),
  withState('startPressed', 'setStartPressed', false),
  graphql(createSession, {
    props: ({ ownProps: { setSessionToken, currentElectionData, setStartPressed }, mutate }) => ({
      start: async () => {
        const electionId = idx(currentElectionData, _ => _.currentElection.id);

        if (!electionId) {
          throw new Error('Missing electionId');
        }

        setStartPressed(true);
        const [result] = await Promise.all([
          mutate({
            variables: { election_id: electionId },
          }),
          new Promise((resolve) => { setTimeout(() => { resolve(); }, 3000); }),
        ]);

        const sessionId = idx(result, _ => _.data.createSession.id);
        const sessionToken = idx(result, _ => _.data.createSession.token);
        setSessionToken(sessionId, sessionToken);
      },
    }),
  }),
  graphql(currentSession, {
    name: 'sessionData',
    skip: ({ token }) => !token,
  }),
  lifecycle({
    componentWillReceiveProps({ token: newToken }) {
      if (this.props.token !== newToken) {
        idx(this.props, _ => _.data.refetch());
      }
    },
  }),
  withProps(({ sessionData }) => ({
    session: idx(sessionData, _ => _.session),
    questions: defaultTo(idx(sessionData, _ => _.session.questions), []),
  })),
);

const loadCurrentElection = compose(
  graphql(CurrentElectionQuery, {
    name: 'currentElectionData',
    skip: ({ isFontLoaded }) => !isFontLoaded,
  }),
  withProps(({ currentElectionData }) => ({
    election: idx(currentElectionData, _ => _.currentElection),
  })),
);

const loadResponses = compose(
  withReducer('responses',
    'setResponse',
    (state, { questionId, value }) => ({ ...state, [questionId]: value }),
    {},
  ),
);

const loadFont = compose(
  withState('isFontLoaded', 'setIsFontLoaded', false),
  lifecycle({
    componentWillMount() {
      const { setIsFontLoaded } = this.props;
      WebFont.load({
        google: {
          families: ['Roboto'],
        },
        active: () => { console.log('WONT WAS LOADED'); setIsFontLoaded(true); },
      });
    },
  }),
);

const enhance = compose(
  loadFont,
  loadCurrentElection,
  createAndLoadSession,
  loadResponses,
  withReducer('savedResponses',
    'markResponseAsSaved',
    (state, questionId) => ({ ...state, [questionId]: true }),
    {},
  ),
  graphql(putSessionResponseMutation, {
    props: ({ ownProps: { setResponse, markResponseAsSaved }, mutate }) => ({
      putSessionResponse: async (questionId, responseValue) => {
        setResponse({ questionId, value: responseValue });
        await mutate({ variables: { question_id: questionId, value: responseValue } });
        markResponseAsSaved(questionId);
      },
    }),
  }),
  withProps(({ savedResponses, questions }) => ({
    allRespondedAndSaved: size(questions) > 0 &&
      (size(savedResponses) === size(questions)),
  })),
  withProps(({ startPressed }) => ({ started: startPressed })),
  withProps(({ responses }) => ({
    currentQuestionIndex: size(responses),
  })),
  withProps(({ questions, started, currentQuestionIndex }) => ({
    currentQuestionId: idx(questions[currentQuestionIndex], _ => _.id),
    currentIndex: (0 + (started ? 1 : 0) + currentQuestionIndex),
  })),
  withProps(({ putSessionResponse, currentQuestionId }) => ({
    agree: () => putSessionResponse(currentQuestionId, 'AGREE'),
    disagree: () => putSessionResponse(currentQuestionId, 'DISAGREE'),
    pass: () => putSessionResponse(currentQuestionId, 'NEUTRAL'),
  })),
  withProps(({ questions, allRespondedAndSaved, election }) => ({
    cards: [
      ...(election ? [{ type: 'start-card', election }] : []),
      ...(questions.map(question => ({
        type: 'question',
        question,
      }))),
      ...(questions.length > 0 ? [{
        type: 'results-card',
        allRespondedAndSaved,
      }] : []),
    ],
  })),
  withProps(({ cards, currentIndex }) => ({ currentCard: cards[currentIndex] })),
  withHandlers({
    viewResults: ({ session }) => (e) => {
      e.preventDefault();
      window.open(`/sessions/${session.id}/results`);
    },
  }),
  setDisplayName('Game'),
);
export default enhance(({
  currentIndex,
  agree,
  disagree,
  start = () => {},
  responses,
  cards,
  currentCard,
  pass,
  startPressed,
  session,
  election,
  viewResults,
}) => (
  <div style={styles.container}>
    <BackgroundMessages
      currentCard={currentCard}
      messages={[
        ...(!election ? [{ id: 'loading', text: 'Chargement' }] : []),
        ...(
          (startPressed && !session) ? [
            { id: 'm1', text: 'Préparation de vos questions' },
            { id: 'm2', text: 'Chargement des réponses des candidats' },
          ] : []
        ),
      ]}
    />
    <CardStack
      currentIndex={currentIndex}
      responses={responses}
      cards={cards}
    />
    <Buttons
      currentCard={currentCard}
      start={start}
      agree={agree}
      disagree={disagree}
      pass={pass}
      viewResults={viewResults}
    />
  </div>
));

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 20,
    position: 'relative',
  },
};
