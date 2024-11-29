import React from 'react';
import { BrowserRouter as Router, Route, Routes ,Link} from 'react-router-dom';
import MainPage from './homepage';
import DetailsPage from './details';

const App: React.FC = () => (
  <Router>
     <Link to="/"></Link>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/details/:title" element={<DetailsPage />} />
    </Routes>
  </Router>
);

export default App;
