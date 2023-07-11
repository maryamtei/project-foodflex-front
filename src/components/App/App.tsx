import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <button type="submit" className="btn text-secondary">
        Debut du Projet
      </button>
      <Outlet />
    </div>
  );
}

export default App;
