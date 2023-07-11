import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="container mx-auto p-4">
      <Outlet />
    </div>
  );
}

export default App;
