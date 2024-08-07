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
import { Rucam } from './views/lpp/Rucam';
import { LPPSecondary } from './views/lpp/Secondary';
import { LPPMedicaments } from './views/lpp/Medicaments';
import { LPPTypeTool } from './views/lpp/LPPTypeTool';
import { HepatoxicityTool } from './views/lpp/HepatoxicityTool';

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

      <Route path="/lpp" element={<Home />}></Route>

      <Route path="/lpp"  element={<Layout type="lpp" />}>
        <Route path="first" element={<LPPFirst />} />
        <Route path="secondary" element={<LPPSecondary />} />
        <Route path="medicaments" element={<LPPMedicaments />} />
        <Route path="rucam" element={<Rucam />} />
        <Route path="type" element={<LPPTypeTool />} />
        <Route path="hepatoxicity" element={<HepatoxicityTool />} />
      </Route>
    </Routes>
  );
}

export default App;
