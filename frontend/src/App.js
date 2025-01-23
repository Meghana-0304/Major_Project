import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import LoginRegister from './LoginRegister';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/register" element={<LoginRegister />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
