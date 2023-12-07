import { Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './views/Home';
import { First } from './views/First';
import { Secondary } from './views/Secondary';
import { Control } from './views/Control';
import { Interactions } from './views/Interactions';
import { SrkFirst } from './views/srk/First';

import { useEffect } from 'react';
import { SrkInteractions } from './views/srk/Interactions';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/first" element={<First />} />
      <Route path="/secondary" element={<Secondary />} />
      <Route path="/control" element={<Control />} />
      <Route path="/interactions" element={<Interactions />} />
      <Route path="/srk/first" element={<SrkFirst />} />
      <Route path="/srk/interactions" element={<SrkInteractions />} />
    </Routes>
  );
}

export default App;
