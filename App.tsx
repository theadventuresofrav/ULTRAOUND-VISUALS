import React, { useState } from 'react';
import UltrasoundResolutionVis from './components/UltrasoundResolutionVis';
import { ResolutionType } from './types';

const App: React.FC = () => {
  const [resolutionType, setResolutionType] = useState<ResolutionType>(ResolutionType.All);

  const resolutionTypes = [
    { id: ResolutionType.All, label: 'All Types' },
    { id: ResolutionType.Axial, label: 'Axial' },
    { id: ResolutionType.Lateral, label: 'Lateral' },
    { id: ResolutionType.Elevational, label: 'Elevational' },
    { id: ResolutionType.Temporal, label: 'Temporal' },
  ];

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col items-center p-4 sm:p-8">
      <header className="w-full max-w-6xl text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-amber-200 to-yellow-300 text-transparent bg-clip-text mb-2">Ultrasound Resolution Visualizer</h1>
        <p className="text-lg text-textSecondary">
          An interactive guide to the core concepts of ultrasound image quality.
        </p>
      </header>

      <div className="w-full max-w-6xl bg-backgroundAlt rounded-lg shadow-2xl p-4 sm:p-6">
        <div className="flex flex-wrap justify-center gap-2 mb-6 border-b border-border pb-4">
          {resolutionTypes.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setResolutionType(id)}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-backgroundAlt focus:ring-primary ${
                resolutionType === id
                  ? 'bg-primary text-white'
                  : 'bg-border text-textSecondary hover:bg-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <main>
          <UltrasoundResolutionVis type={resolutionType} />
        </main>
      </div>
      
      <footer className="w-full max-w-6xl text-center mt-8 text-textSecondary text-sm">
          <p>Visualizations are conceptual and not to scale. Created with React, TypeScript, and Framer Motion.</p>
      </footer>
    </div>
  );
};

export default App;