import { createSlice } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import * as Routes from '../routes';
import { userPrefs } from '../common/firestore';

const initialState = {
  id: null,
  name: null,
  email: null,
  avatar: null,
  foodPreferencies: [],
  loading: false,
  errors: null,
};

const userSlice = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {
    storeInformationStart(state) {
      state.loading = true;
    },
    storeInformation(state, { payload }) {
      state.id = payload.id;
      state.name = payload.firstname;
      state.email = payload.email;
      state.avatar = payload.avatar;
      state.loading = false;
      state.errors = null;
    },
    storeInformationFail(state, { payload }) {
      state.errors = payload;
      state.loading = false;
    },
    storeFoodPreferencies(state, { payload }) {
      state.errors = null;
      state.loading = false;
      state.foodPreferencies = payload;
    },
  },
});

export const {
  storeInformationStart,
  storeInformation,
  storeInformationFail,
} = userSlice.actions;

export const loadUserInfo = (navigator) => {
  return async (dispatch) => {
    const user = auth().currentUser;
    if (!user) {
      navigator.navigate(Routes.LOGIN);
    }
    dispatch(storeInformationStart);
    const foodPrefs = await userPrefs.where('id', '==', user.uid).get();
    dispatch(
      storeInformation({
        id: user.uid,
        name: user.displayName,
        email: user.email,
        avatar: user.phoneNumber,
      }),
    );
  };
};

export default userSlice.reducer;