import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import TaskSheet from './components/TaskSheet';

function App() {
  return (
    <div className="App">
      <Header/>
      <TaskSheet/>
      <Footer/>
    </div>
  );
}

export default App;
