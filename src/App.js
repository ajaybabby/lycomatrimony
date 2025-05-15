import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home1 from './pages/home1';
import './App.css';
import ProfilePage from './pages/ProfilePage';

import MatchesPage from './pages/MatchesPage';
import AboutPage from './pages/AboutPage';
import AstrologyMatch from './pages/AstrologyMatch';
import Subscription from './pages/Subscription';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home1 />} />
          {/* Add more routes as needed */}
          {<Route path="/profile" element={<ProfilePage />} /> }
          {/* <Route path="/search" element={<Search />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          // Add this route in your Routes component
          <Route path="/matches" element={<MatchesPage />} />
          // Add this route in your Routes component
          <Route path="/about" element={<AboutPage />} />
          <Route path="/astrologymatch" element={<AstrologyMatch/>}/>
          <Route path="/subscription" element={<Subscription/>}/>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
