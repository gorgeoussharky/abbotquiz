import { Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './views/Home';
import { First } from './views/gerb/First';
import { Secondary } from './views/gerb/Secondary';
import { Control } from './views/gerb/Control';
import { Interactions } from './views/gerb/Interactions';
import { SrkFirst } from './views/srk/First';

import { useEffect } from 'react';
import { SrkInteractions } from './views/srk/Interactions';
import { SrkSecondary } from './views/srk/Secondary';
import { SrkControl } from './views/srk/Control';

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
      <Route path="/srk/secondary" element={<SrkSecondary />} />
      <Route path="/srk/control" element={<SrkControl />} />
      <Route path="/srk/interactions" element={<SrkInteractions />} />
    </Routes>
  );
}

export default App;
