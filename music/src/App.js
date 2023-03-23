import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Music from './components/Music';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Music />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
