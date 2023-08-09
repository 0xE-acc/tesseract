'use client'

import React from 'react';
import TesseractVisualization from './hypercube/page';
import HopfFibration from './hopfFibration/page';
import Galaxy from './galaxy/page';
import AlmondAnimation from './almond/page';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TesseractVisualization />
      </div>
      {/* <div style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Galaxy />
      </div> */}
    </div>
  );
};

export default App;




