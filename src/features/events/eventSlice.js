/**
 * Event slice - Redux
 */
import { createSlice } from '@reduxjs/toolkit';
import { logger } from 'react-native-logs';
import {
  getEvents,
  getFilteredEvents,
  joinEvent as joinEventApi,
  unjoinEvent as unjoinEventApi,
} from '../../api/FirebaseApi';

const log = logger.createLogger();

const selectEventState = (state) => state.event;
export const selectAllEvents = (state) => selectEventState(state).events;
export const selectEventById = (state, eventId) =>
  selectAllEvents(state).find((id) => id === eventId);
export const selectEventLoading = (state) => selectEventState(state).loading;
export const selectEventError = (state) => selectEventState(state).error;

const initialState = {
  events: [],
  loading: true,
  error: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    eventGet(state) {
      state.loading = true;
    },
    eventGetSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.events = [...action.payload];
    },
    eventGetFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    cleanErrors(state) {
      state.error = null;
    },
    joinEventsStart(state) {
      state.loading = true;
      state.error = null;
    },
    joinEventSuccess(state) {
      state.loading = false;
    },
    joinEventFail(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  eventGet,
  eventGetSuccess,
  eventGetFail,
  cleanErrors,
  joinEventsStart,
  joinEventSuccess,
  joinEventFail,
} = eventSlice.actions;

export const getAllEvents = (params) => {
  log.info('[EventSlice]::[getAllEvents]');
  return (dispatch) => {
    dispatch(eventGet());
    const sub = getEvents(
      params,
      (events) => dispatch(eventGetSuccess(events)),
      (error) => handleError(error, dispatch),
    );
    return sub;
  };
};

export const getHomeEvents = (params) => {
  log.info('[EventSlice]::[getFilteredEvents]');
  return (dispatch) => {
    dispatch(eventGet());
    const sub = getFilteredEvents(
      params,
      (events) => dispatch(eventGetSuccess(events)),
      (error) => handleError(error, dispatch),
    );
    return sub;
  };
};

export const joinEvent = (id) => {
  log.info('[EventSlice]::[joinEvent]');
  return async (dispatch) => {
    dispatch(joinEventsStart());
    try {
      await joinEventApi(id);
      dispatch(joinEventSuccess());
    } catch (error) {
      handleError(error);
    }
  };
};

export const unjoinEvent = (id) => {
  log.info('[EventSlice]::[joinEvent]');
  return async (dispatch) => {
    dispatch(joinEventsStart());
    try {
      unjoinEventApi(id);
      dispatch(joinEventSuccess());
    } catch (error) {
      handleError(error);
    }
  };
};

const handleError = (error, dispatch) => {
  const code = error.code;
  switch (code) {
    case 'event/invalid-user':
      dispatch(eventGetFail('Invalid user'));
      break;
    case 'event/invalid-parameters':
      dispatch(eventGetFail('Invalid get parameters'));
      break;
    default:
      dispatch(eventGetFail('Server error'));
      break;
  }
  log.error('[EventSlice]', error);
};

export default eventSlice.reducer;
