import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SignInPage from './pages/SignInPage/SignInPage';
import Layout from './components/Layout/Layout';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import MainPage from './pages/MainPage/MainPage';
import SurveyCreatorPage from './pages/SurveyCreatorPage/SurveyCreatorPage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import SurveyManagePage from './pages/SurveyManagePage/SurveyManagePage';
import SurveyFillPage from './pages/SurveyFillPage/SurveyFillPage';
import SurveyResponsePage from './pages/SurveyResponsePage/SurveyResponsePage';
import SurveyResultsPage from './pages/SurveyResultsPage/SurveyResultPage';
import AirStatisticsPage from './pages/AirStatisticsPage/AirStatisticsPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pl';
import UserProfile from './pages/AccountPage/UserProfile';
import UserManagementPage from './pages/UserManagementPage/UserManagementPage';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
              <Route path="/" element={ <Layout /> }>
                <Route index element={ <WelcomePage /> }/>
                <Route path="login" element={ <SignInPage /> }/>
                <Route path="register" element={ <SignUpPage /> }/>
                <Route element={ <PrivateRoute/> }>
                  <Route path="dashboard" element={ <MainPage /> }/>
                  <Route path="survey/creator" element={ <SurveyCreatorPage /> }/>
                  <Route path="survey/creator/:surveyId" element={ <SurveyCreatorPage /> }/>
                  <Route path="survey/manage/:surveyId" element={ <SurveyManagePage /> }/>
                  <Route path="survey/fill/:surveyId/:surveyLogId" element={ <SurveyFillPage /> }/>
                  <Route path="survey/response/:surveyId/:surveyLogId" element={ <SurveyResponsePage /> }/>
                  <Route path="survey/results/:surveyId" element={ <SurveyResultsPage /> }/>
                  <Route path="air" element={ <AirStatisticsPage /> }/>
                  <Route path="account" element={ <UserProfile /> }/>
                  <Route path="users" element={ <UserManagementPage /> }/>
                </Route>
              </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
