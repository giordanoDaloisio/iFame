import auth from '@react-native-firebase/auth';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_COLOR } from '../common/theme';
import { ErrorMessage } from '../components';
import { joinEvent, unjoinEvent } from '../features/events/eventSlice';
import EventDetail from '../features/events/EventDetail';
import { ScrollView } from 'react-native-gesture-handler';

const EventDetailPage = ({ route }) => {
  const id = route.params.id;
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.event);
  const event = events.find((item) => item.id === id);

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <>
      {event ? (
        <ScrollView style={styles.container}>
          <EventDetail event={event} />
          {event.currentParticipants ? (
            <>
              {event.currentParticipants.includes(auth().currentUser.uid) ? (
                <Button
                  title="Esci dall'evento"
                  onPress={() => {
                    dispatch(unjoinEvent(id));
                  }}
                  loading={loading}
                  buttonStyle={{ backgroundColor: DELETE_COLOR }}
                />
              ) : (
                <>
                  {event.currentParticipants.length >= event.partecipants ? (
                    <Button title="Evento pieno" disabled />
                  ) : (
                    <Button
                      title="Partecipa all'evento"
                      onPress={() => {
                        dispatch(joinEvent(id));
                      }}
                      loading={loading}
                    />
                  )}
                </>
              )}
            </>
          ) : (
            <Button
              title="Partecipa all'evento"
              onPress={() => {
                dispatch(joinEvent(id));
              }}
              loading={loading}
            />
          )}
        </ScrollView>
      ) : null}
    </>
  );
};

export default EventDetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
