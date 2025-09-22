
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResolutionType } from '../types';

interface ResolutionVisProps {
  width?: number;
  height?: number;
  showLabels?: boolean;
}

const commonProps: ResolutionVisProps = {
  width: 320,
  height: 200,
  showLabels: true,
};

const AxialResolution: React.FC<ResolutionVisProps> = ({ width = 320, height = 200, showLabels = true }) => {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} height="100%" width="100%" className="max-h-[250px] mx-auto">
      <rect x={width / 2 - 25} y={10} width={50} height={15} className="fill-primary" rx={3} />
      <circle cx={width / 2} cy={height * 0.6} r="8" className="fill-success" />
      <circle cx={width / 2} cy={height * 0.6 + 25} r="8" className="fill-success" />
      <motion.g
        animate={{
          y: [0, height * 0.55],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.15, 0.75, 1],
        }}
      >
        <rect x={width / 2 - 15} y={30} width={30} height={20} className="fill-accent opacity-70" rx={3} />
      </motion.g>
      <line x1={width / 2 + 20} y1={height * 0.6} x2={width / 2 + 20} y2={height * 0.6 + 25} className="stroke-warning" strokeWidth="2" />
      <line x1={width / 2 + 15} y1={height * 0.6} x2={width / 2 + 25} y2={height * 0.6} className="stroke-warning" strokeWidth="2" />
      <line x1={width / 2 + 15} y1={height * 0.6 + 25} x2={width / 2 + 25} y2={height * 0.6 + 25} className="stroke-warning" strokeWidth="2" />
      {showLabels && (
        <>
          <text x={width / 2} y={height * 0.6 - 15} fontSize="10" className="fill-success" textAnchor="middle">Target 1</text>
          <text x={width / 2} y={height * 0.6 + 40} fontSize="10" className="fill-success" textAnchor="middle">Target 2</text>
          <text x={width / 2 + 35} y={height * 0.6 + 15} fontSize="9" className="fill-warning">Axial Distance</text>
        </>
      )}
    </svg>
  );
};

const LateralResolution: React.FC<ResolutionVisProps> = ({ width = 320, height = 200, showLabels = true }) => {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} height="100%" width="100%" className="max-h-[250px] mx-auto">
      <rect x={width / 2 - 25} y={10} width={50} height={15} className="fill-primary" rx={3} />
      <motion.path
        d={`M ${width / 2 - 20} 25 L ${width / 2 - 30} ${height * 0.8} L ${width / 2 + 30} ${height * 0.8} L ${width / 2 + 20} 25 Z`}
        className="stroke-accent fill-accent"
        strokeWidth="2"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
      />
      <circle cx={width / 2 - 15} cy={height * 0.6} r="8" className="fill-success" />
      <circle cx={width / 2 + 15} cy={height * 0.6} r="8" className="fill-success" />
      <line x1={width / 2 - 15} y1={height * 0.6 + 20} x2={width / 2 + 15} y2={height * 0.6 + 20} className="stroke-warning" strokeWidth="2" />
      <line x1={width / 2 - 15} y1={height * 0.6 + 15} x2={width / 2 - 15} y2={height * 0.6 + 25} className="stroke-warning" strokeWidth="2" />
      <line x1={width / 2 + 15} y1={height * 0.6 + 15} x2={width / 2 + 15} y2={height * 0.6 + 25} className="stroke-warning" strokeWidth="2" />
      {showLabels && (
        <>
          <text x={width / 2 - 15} y={height * 0.6 - 15} fontSize="10" className="fill-success" textAnchor="middle">Target A</text>
          <text x={width / 2 + 15} y={height * 0.6 - 15} fontSize="10" className="fill-success" textAnchor="middle">Target B</text>
          <text x={width / 2} y={height * 0.6 + 35} fontSize="9" className="fill-warning" textAnchor="middle">Lateral Distance</text>
        </>
      )}
    </svg>
  );
};

const ElevationalResolution: React.FC<ResolutionVisProps> = ({ width = 320, height = 200, showLabels = true }) => {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} height="100%" width="100%" className="max-h-[250px] mx-auto">
      <rect x={width / 2 - 25} y={10} width={50} height={15} className="fill-primary" rx={3} />
      <rect x={width / 2 - 40} y={height * 0.4} width={80} height={30} className="fill-accent opacity-30" rx={5} />
      <circle cx={width / 2} cy={height * 0.4 + 15} r="6" className="fill-success" />
      <circle cx={width / 2} cy={height * 0.4 + 40} r="6" className="fill-error opacity-50" />
      <line x1={width / 2 - 50} y1={height * 0.4} x2={width / 2 - 50} y2={height * 0.4 + 30} className="stroke-warning" strokeWidth="2" />
      <line x1={width / 2 - 55} y1={height * 0.4} x2={width / 2 - 45} y2={height * 0.4} className="stroke-warning" strokeWidth="2" />
      <line x1={width / 2 - 55} y1={height * 0.4 + 30} x2={width / 2 - 45} y2={height * 0.4 + 30} className="stroke-warning" strokeWidth="2" />
      {showLabels && (
        <>
          <text x={width / 2 + 20} y={height * 0.4 + 18} fontSize="10" className="fill-success">In Slice</text>
          <text x={width / 2 + 20} y={height * 0.4 + 43} fontSize="10" className="fill-error">Partial Volume</text>
          <text x={width / 2 - 60} y={height * 0.4 + 18} fontSize="9" className="fill-warning" textAnchor="end">Slice</text>
          <text x={width / 2 - 60} y={height * 0.4 + 28} fontSize="9" className="fill-warning" textAnchor="end">Thickness</text>
        </>
      )}
    </svg>
  );
};

const TemporalResolution: React.FC<ResolutionVisProps> = ({ width = 320, height = 200, showLabels = true }) => {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} height="100%" width="100%" className="max-h-[250px] mx-auto">
      {Array.from({ length: 4 }).map((_, i) => (
        <rect key={i} x={50 + i * 60} y={height / 2 - 30} width={50} height={60} className="fill-background stroke-border" strokeWidth="2" rx={3} />
      ))}
      <motion.g initial={{ x: 0 }} animate={{ x: [0, 180, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
        <circle cx={75} cy={height / 2} r="8" className="fill-success" />
      </motion.g>
      <line x1={50} y1={height / 2 + 50} x2={290} y2={height / 2 + 50} className="stroke-warning" strokeWidth="2" />
      {showLabels && (
        <>
          <text x={75} y={height / 2 - 40} fontSize="10" className="fill-textPrimary" textAnchor="middle">Frame 1</text>
          <text x={135} y={height / 2 - 40} fontSize="10" className="fill-textPrimary" textAnchor="middle">Frame 2</text>
          <text x={195} y={height / 2 - 40} fontSize="10" className="fill-textPrimary" textAnchor="middle">Frame 3</text>
          <text x={255} y={height / 2 - 40} fontSize="10" className="fill-textPrimary" textAnchor="middle">Frame 4</text>
          <text x={170} y={height / 2 + 65} fontSize="10" className="fill-warning" textAnchor="middle">Time →</text>
        </>
      )}
    </svg>
  );
};

const descriptions: Record<ResolutionType, { title: string; description: string }> = {
  [ResolutionType.Axial]: {
    title: 'Axial Resolution',
    description: 'The ability to distinguish two objects that are close to each other along the axis of the ultrasound beam.',
  },
  [ResolutionType.Lateral]: {
    title: 'Lateral Resolution',
    description: 'The ability to distinguish two objects that are close to each other perpendicular to the beam axis.',
  },
  [ResolutionType.Elevational]: {
    title: 'Elevational Resolution',
    description: 'The resolution in the third dimension, perpendicular to the imaging plane. Related to slice thickness.',
  },
  [ResolutionType.Temporal]: {
    title: 'Temporal Resolution',
    description: 'The ability to accurately locate moving structures at a particular instant in time, measured in frames per second (FPS).',
  },
  [ResolutionType.All]: {
    title: 'Resolution Types',
    description: 'A summary of the four primary types of resolution in ultrasound imaging, each affecting image quality differently.',
  },
};

const AllResolutionsView: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-background rounded-lg p-4 border border-border">
        <h3 className="text-xl font-semibold text-center mb-2 text-textPrimary">{descriptions.axial.title}</h3>
        <p className="text-textSecondary text-center text-sm mb-4 h-10">{descriptions.axial.description}</p>
        <AxialResolution {...commonProps} />
      </div>
      <div className="bg-background rounded-lg p-4 border border-border">
        <h3 className="text-xl font-semibold text-center mb-2 text-textPrimary">{descriptions.lateral.title}</h3>
        <p className="text-textSecondary text-center text-sm mb-4 h-10">{descriptions.lateral.description}</p>
        <LateralResolution {...commonProps} />
      </div>
      <div className="bg-background rounded-lg p-4 border border-border">
        <h3 className="text-xl font-semibold text-center mb-2 text-textPrimary">{descriptions.elevational.title}</h3>
        <p className="text-textSecondary text-center text-sm mb-4 h-10">{descriptions.elevational.description}</p>
        <ElevationalResolution {...commonProps} />
      </div>
      <div className="bg-background rounded-lg p-4 border border-border">
        <h3 className="text-xl font-semibold text-center mb-2 text-textPrimary">{descriptions.temporal.title}</h3>
        <p className="text-textSecondary text-center text-sm mb-4 h-10">{descriptions.temporal.description}</p>
        <TemporalResolution {...commonProps} />
      </div>
    </div>
);

interface UltrasoundResolutionVisProps {
  type: ResolutionType;
}

const UltrasoundResolutionVis: React.FC<UltrasoundResolutionVisProps> = ({ type }) => {
  const { title, description } = descriptions[type];

  const renderContent = () => {
    switch (type) {
      case ResolutionType.Axial: return <AxialResolution {...commonProps} />;
      case ResolutionType.Lateral: return <LateralResolution {...commonProps} />;
      case ResolutionType.Elevational: return <ElevationalResolution {...commonProps} />;
      case ResolutionType.Temporal: return <TemporalResolution {...commonProps} />;
      case ResolutionType.All: return <AllResolutionsView />;
      default: return null;
    }
  };

  return (
     <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={type}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {type !== ResolutionType.All && (
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-textPrimary">{title}</h2>
              <p className="text-textSecondary max-w-2xl mx-auto mt-2">{description}</p>
            </div>
          )}
          <div className="w-full">
            {renderContent()}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default UltrasoundResolutionVis;
