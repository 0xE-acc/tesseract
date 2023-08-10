'use client'

import React from 'react';
import Hypercube from './hypercube/page';
import HopfFibration from './hopfFibration/page';
import Galaxy from './galaxy/page';
import AlmondAnimation from './almond/page';

import { Slider } from "@/components/ui/slider";

const App: React.FC = () => {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#333' }}>
      <div style={{ width: '80%', margin: '50px auto' }}>
      <Slider defaultValue={[33]} max={100} step={1} style={{ marginTop: '50px' }} />
      </div>
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Hypercube />
      </div>
      {/* <div style={{ width: '100%', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Galaxy />
      </div> */}
    </div>
  );
};

export default App;





