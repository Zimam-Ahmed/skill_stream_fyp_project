import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter,
  createRoutesFromElements, 
  Route, 
  RouterProvider,

} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import PrivateRoute from './components/PrivateRoute';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import Profile from './screens/Profile.jsx';
import DashboardScreen from './screens/DasboardScreen.jsx';
import ClassScreen from './screens/ClassScreen.jsx';
import  TeacherClassScreen from './screens/TeacherClassScreen.jsx';
import ClassWorkScreen from './screens/ClassWorkScreen.jsx';
import StudentClassScreen from './screens/StudentClassScreen.jsx';
import StudentClassViewScreen from './screens/StudentClassViewScreen.jsx';
import PeopleScreen from './screens/PeopleScreen.jsx'
import AttendenceScreen from './screens/AttendenceScreen.jsx';
import StudentClassWorkScreen from './screens/StudentClassWorkScreen.jsx';
import ClassWorkSubmissionScreen from './screens/ClassWorkSubmissionScreen';
import GetClassWorkScreen from './screens/GetClassWorkScreen.jsx';
import ViewSubmission from './screens/ViewSubmission.jsx';
import DownloadSubmissionScreen from './screens/DownloadSubmissionScreen';

const router =  createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      
      <Route index={true} path='/'  element={<HomeScreen/>}/>
      <Route path='/login'  element={<LoginScreen/>}/>
      <Route path='/register'  element={<RegisterScreen/>}/>

      <Route path='/' element={<PrivateRoute/>}>

        <Route path='/profile'  element={<Profile/>}/>
        <Route path='/dashboard'  element={<DashboardScreen/>}/>
        <Route path='/class'  element={<ClassScreen/>}/>
        <Route path='/teacherClass/:classId'  element={<TeacherClassScreen/>}/>
        <Route path='/classWork/:classId'  element={<ClassWorkScreen/>}/>
        <Route path='/studentClasses'  element={<StudentClassScreen/>}/>
        <Route path='/studentClassView/:classId'  element={<StudentClassViewScreen/>}/>
        <Route path='/people/:classId'  element={<PeopleScreen/>}/>
        <Route path='/attendence/:classId'  element={<AttendenceScreen/>}/>
        <Route path='/studentClassWork/:classId'  element={<StudentClassWorkScreen/>}/>
        <Route path='/ClassWorkSubmission/:classworkId'  element={<ClassWorkSubmissionScreen/>}/>
        <Route path='/submission/:classworkId'  element={<GetClassWorkScreen/>}/>
        <Route path='/view-submission/:classworkId/:filename'  element={<ViewSubmission/>}/>
        <Route path='/download-submission/:classworkId'  element={<DownloadSubmissionScreen/>}/>

      </Route>
    </Route>
  )
) 

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>
  </Provider>
)
