import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Header from './Component/Header';
import Home from './Component/Home';
import Coin from './Component/Coin';
import Exchangr from './Component/Exchangr';
import CoDetail from './Component/CoDetail';
import Coincard from './Component/Coincard';
import Footer from './Component/Footer';


function App() {
  return (
    <Router>
        <Header/>
        <Routes>
        
            <Route path ="/"  element={<Home/>}/>
            <Route path ="/Coin"  element={<Coin/>}/>
            <Route path ="/exchange"  element={<Exchangr/>}/>
            <Route path ="/Coin/:id"  element={<CoDetail/>}/>
          
        </Routes>
        <Footer/>
    </Router>
  );
}

export default App;
