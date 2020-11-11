import React, { useState } from 'react';
import { View } from 'react-native';
import AccessForm from '../components/AccessForm';
import * as Routes from '../routes';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../features/authSlice';

export default function SignInPage({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={{ flex: 1 }}>
      <AccessForm
        formTitle="Sign Up"
        buttonTitle="Sign Up"
        navigationTitle="Go to login page"
        navigationRoute={Routes.LOGIN}
        callback={() => {
          dispatch(signUpUser(email, password, navigation));
        }}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </View>
  );
}
