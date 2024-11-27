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

function App() {
  return (
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
              </Route>
            </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
