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
import { Layout } from './components/Layout';
import { LPPFirst } from './views/lpp/First';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>

      <Route path="/" element={<Layout type="herb" />}>
        <Route path="first" element={<First />} />
        <Route path="secondary" element={<Secondary />} />
        <Route path="control" element={<Control />} />
        <Route path="interactions" element={<Interactions />} />
      </Route>

      <Route path="/srk" element={<Home />}></Route>

      <Route path="/srk"  element={<Layout type="srk" />}>
        <Route path="first" element={<SrkFirst />} />
        <Route path="secondary" element={<SrkSecondary />} />
        <Route path="control" element={<SrkControl />} />
        <Route path="interactions" element={<SrkInteractions />} />
      </Route>

      <Route path="/lpp"  element={<Layout type="srk" />}>
        <Route path="first" element={<LPPFirst />} />
      </Route>
    </Routes>
  );
}

export default App;
