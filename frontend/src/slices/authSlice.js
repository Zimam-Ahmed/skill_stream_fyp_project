import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    }, 
    setClassInfo: (state, action) => {
      state.classInfo = action.payload; // Set classInfo from action payload
    }, 
    setClassWorkInfo: (state, action) => {
      state.classWorkInfo = action.payload; // Set classInfo from action payload
    },
    setAttendenceInfo: (state, action) => {
      state.classWorkInfo = action.payload; // Set classInfo from action payload
    },
    setSubmissionInfo: (state, action) => {
      state.submissionInfo = action.payload; // Set classInfo from action payload
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, logout, setClassInfo, setClassWorkInfo, setAttendenceInfo, setSubmissionInfo } = authSlice.actions;

export default authSlice.reducer;