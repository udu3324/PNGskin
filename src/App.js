import './styles/App.css';
import Content from './Content'
import Nav from './Nav';
import Info from './Info';

function App() {
  return (
    <div className="App">
      <Nav />
      <Content />
      
      <Info />
    </div>
  );
}

export default App;