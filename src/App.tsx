import TodayBirthdayList from './features/TodayBirthdayList/page/TodayBirthdays';
import HomePage from './features/Home/pages/HomePage';
import NotFoundPage from './features/StatusPages/pages/NotFound/NotFound';
import MainLayout from './layouts/MainLayout/MainLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/birthday-today" element={<TodayBirthdayList />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
