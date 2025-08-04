import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Components/Home';
import { Detail } from './Components/Detail';
import { Genre } from './Components/Include/Genre';
import { Trending } from './Components/Trending';
import { Search } from './Components/Search';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/comics/:slug" element={<Detail></Detail>}></Route>
          <Route path="/genre/:slug" element={<Genre></Genre>}></Route>
          <Route path="/trending/:slug" element={<Trending></Trending>}></Route>
          <Route path="/search/:slug" element={<Search></Search>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
