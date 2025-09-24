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
  const pulseDuration = 2.5;
  const reactionDuration = 0.5;

  // Precise timing calculations
  const startY = -50;
  const endY = height + 20;
  const totalDistance = endY - startY;
  const speed = totalDistance / pulseDuration; // units per second
  
  const target1Y = height * 0.6;
  const target2Y = height * 0.6 + 25;

  const target1Time = (target1Y - startY) / speed; // Time for pulse to reach target 1
  const target2Time = (target2Y - startY) / speed; // Time for pulse to reach target 2

  return (
    <svg viewBox={`0 0 ${width} ${height}`} height="100%" width="100%" className="max-h-[250px] mx-auto">
      {/* Transducer */}
      <rect x={width / 2 - 25} y={10} width={50} height={15} className="fill-primary" rx={3} />
      
      {/* Ripple effect for Target 1 */}
      <motion.circle
        cx={width / 2}
        cy={target1Y}
        r="8"
        className="stroke-success"
        fill="transparent"
        strokeWidth="2"
        animate={{ scale: [1, 4], opacity: [0.8, 0] }}
        transition={{ duration: reactionDuration, repeat: Infinity, delay: target1Time, ease: "easeOut", repeatDelay: pulseDuration - reactionDuration }}
      />
      {/* Ripple effect for Target 2 */}
      <motion.circle
        cx={width / 2}
        cy={target2Y}
        r="8"
        className="stroke-success"
        fill="transparent"
        strokeWidth="2"
        animate={{ scale: [1, 4], opacity: [0.8, 0] }}
        transition={{ duration: reactionDuration, repeat: Infinity, delay: target2Time, ease: "easeOut", repeatDelay: pulseDuration - reactionDuration }}
      />

      {/* Targets that react to the pulse */}
      <motion.circle
        cx={width / 2}
        cy={target1Y}
        r="8"
        className="fill-success"
        animate={{ scale: [1, 1.6, 1] }}
        transition={{ duration: reactionDuration, repeat: Infinity, delay: target1Time, ease: "easeOut", repeatDelay: pulseDuration - reactionDuration }}
      />
      <motion.circle
        cx={width / 2}
        cy={target2Y}
        r="8"
        className="fill-success"
        animate={{ scale: [1, 1.6, 1] }}
        transition={{ duration: reactionDuration, repeat: Infinity, delay: target2Time, ease: "easeOut", repeatDelay: pulseDuration - reactionDuration }}
      />
      
      {/* Animated Ultrasound Pulse */}
      <motion.g
        animate={{ y: [startY, endY] }}
        transition={{
          duration: pulseDuration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <rect x={width / 2 - 15} y={30} width={30} height={20} className="fill-accent opacity-70" rx={3} />
        <rect x={width / 2 - 15} y={25} width={30} height={5} className="fill-accent opacity-40" rx={3} />
      </motion.g>

      {/* Distance marker */}
      <line x1={width / 2 + 20} y1={target1Y} x2={width / 2 + 20} y2={target2Y} className="stroke-warning" strokeWidth="2" />
      <line x1={width / 2 + 15} y1={target1Y} x2={width / 2 + 25} y2={target1Y} className="stroke-warning" strokeWidth="2" />
      <line x1={width / 2 + 15} y1={target2Y} x2={width / 2 + 25} y2={target2Y} className="stroke-warning" strokeWidth="2" />

      {showLabels && (
        <>
          <text x={width / 2} y={target1Y - 15} fontSize="10" className="fill-success" textAnchor="middle">Target 1</text>
          <text x={width / 2} y={target2Y + 15} fontSize="10" className="fill-success" textAnchor="middle">Target 2</text>
          <text x={width / 2 + 35} y={target1Y + 15} fontSize="9" className="fill-warning">Axial Distance</text>
        </>
      )}
    </svg>
  );
};

const LateralResolution: React.FC<ResolutionVisProps> = ({ width = 320, height = 200, showLabels = true }) => {
  const scanDuration = 3;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} height="100%" width="100%" className="max-h-[250px] mx-auto">
      {/* Transducer */}
      <rect x={width / 2 - 25} y={10} width={50} height={15} className="fill-primary" rx={3} />

      {/* Beam Shape */}
      <path
        d={`M ${width / 2 - 20} 25 L ${width / 2 - 30} ${height * 0.8} L ${width / 2 + 30} ${height * 0.8} L ${width / 2 + 20} 25 Z`}
        className="stroke-accent/30 fill-accent/10"
        strokeWidth="1"
      />
      {/* Scanning Line Animation */}
      <motion.g
        style={{ transformOrigin: `${width / 2}px 17.5px` }}
        animate={{ rotate: [-15, 15, -15] }}
        transition={{ duration: scanDuration, repeat: Infinity, ease: 'easeInOut' }}
      >
        <line
          x1={width / 2} y1={25}
          x2={width / 2} y2={height * 0.8}
          className="stroke-accent"
          strokeWidth="1.5"
        />
      </motion.g>

      {/* Targets that react to scan line */}
      <motion.circle 
        cx={width / 2 - 15} 
        cy={height * 0.6} 
        r="8" 
        className="fill-success" 
        animate={{ scale: [1, 1.5, 1, 1, 1, 1, 1, 1.5, 1] }}
        transition={{ duration: scanDuration, repeat: Infinity, ease: 'linear', times: [0, 0.1, 0.2, 0.5, 0.8, 0.9, 1] }}
      />
      <motion.circle 
        cx={width / 2 + 15} 
        cy={height * 0.6} 
        r="8" 
        className="fill-success" 
        animate={{ scale: [1, 1, 1, 1.5, 1, 1, 1] }}
        transition={{ duration: scanDuration, repeat: Infinity, ease: 'linear', times: [0, 0.3, 0.4, 0.5, 0.6, 0.7, 1] }}
      />

      {/* Distance marker */}
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
  const duration = 3;

  // Define slice boundaries for clarity
  const sliceThinY = height * 0.4; // 80
  const sliceThinHeight = 30;
  const sliceThickY = height * 0.35; // 70
  const sliceThickHeight = 50;
  
  // Define target positions
  const inSliceTargetY = height * 0.45; // 90, well within the slice
  const partialVolumeTargetY = height * 0.6; // 120, at the very edge of the thickest slice

  return (
    <svg viewBox={`0 0 ${width} ${height}`} height="100%" width="100%" className="max-h-[250px] mx-auto">
      {/* Transducer */}
      <rect x={width / 2 - 25} y={10} width={50} height={15} className="fill-primary" rx={3} />
      
      {/* Beam path lines to suggest volume */}
      <path
        d={`M ${width / 2 - 20} 25 
           L ${width / 2 - 45} ${height * 0.9} 
           L ${width / 2 + 45} ${height * 0.9} 
           L ${width / 2 + 20} 25 Z`}
        className="stroke-accent/20 fill-accent/10"
        strokeWidth="1"
      />

      {/* Pulsing Slice Thickness visualization */}
      <motion.rect
        x={width / 2 - 40}
        width={80}
        className="fill-accent"
        rx={5}
        animate={{
          y: [sliceThinY, sliceThickY, sliceThinY],
          height: [sliceThinHeight, sliceThickHeight, sliceThinHeight],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* In-slice Target - clear signal with glow */}
      <g>
        <motion.circle 
          cx={width / 2} 
          cy={inSliceTargetY} 
          r="6" 
          className="fill-success" 
          animate={{ scale: [1, 1.6, 1] }}
          transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle 
          cx={width / 2} 
          cy={inSliceTargetY} 
          r="6" 
          className="stroke-success"
          fill="transparent"
          strokeWidth="2"
          animate={{ 
            scale: [1.2, 2.5, 1.2],
            opacity: [0, 0.6, 0]
          }}
          transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      </g>

      {/* Partial Volume Artifact - sharp, flickering signal */}
      <motion.g
        animate={{ y: [2, -1, 0, 1, 2] }} // Add a subtle vertical jitter
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        <motion.circle
          cx={width / 2}
          cy={partialVolumeTargetY}
          r="6"
          className="fill-error"
          animate={{ 
            opacity: [0, 0, 1, 0, 0], // Sharper flicker
            scale: [0.8, 0.8, 1.5, 0.8, 0.8], // Scale up only at the peak
          }}
          transition={{ 
            duration: duration, 
            repeat: Infinity, 
            ease: 'linear',
            times: [0, 0.49, 0.5, 0.51, 1], // Make the peak extremely brief
          }}
        />
      </motion.g>
      
      {/* Slice thickness marker */}
      <line x1={width / 2 - 55} y1={sliceThinY} x2={width / 2 - 55} y2={sliceThinY + sliceThinHeight} className="stroke-warning" strokeWidth="2" />
      <line x1={width / 2 - 60} y1={sliceThinY} x2={width / 2 - 50} y2={sliceThinY} className="stroke-warning" strokeWidth="2" />
      <line x1={width / 2 - 60} y1={sliceThinY + sliceThinHeight} x2={width / 2 - 50} y2={sliceThinY + sliceThinHeight} className="stroke-warning" strokeWidth="2" />
      {showLabels && (
        <>
          <text x={width / 2 + 15} y={inSliceTargetY + 4} fontSize="10" className="fill-success">Clear Signal</text>
          <text x={width / 2 + 15} y={partialVolumeTargetY + 4} fontSize="10" className="fill-error">Artifact</text>
          <text x={width / 2 - 65} y={sliceThinY + 18} fontSize="9" className="fill-warning" textAnchor="end">Slice Thickness</text>
        </>
      )}
    </svg>
  );
};

const TemporalResolution: React.FC<ResolutionVisProps> = ({ width = 320, height = 200, showLabels = true }) => {
  const animProps = {
    duration: 3,
    repeat: Infinity,
    ease: 'steps(6, end)',
  };
  return (
    <svg viewBox={`0 0 ${width} ${height}`} height="100%" width="100%" className="max-h-[250px] mx-auto">
      {/* Static Frames */}
      {Array.from({ length: 4 }).map((_, i) => (
        <rect key={i} x={50 + i * 60} y={height / 2 - 30} width={50} height={60} className="fill-background stroke-border" strokeWidth="2" rx={3} />
      ))}

      {/* Highlight for active frame */}
      <motion.rect 
        y={height / 2 - 30} 
        width={50} 
        height={60} 
        className="fill-primary/30 stroke-primary" 
        strokeWidth="2" 
        rx={3}
        animate={{ x: [50, 110, 170, 230, 170, 110, 50] }}
        transition={animProps}
      />
      
      {/* Animated object jumping between frames */}
      <motion.circle
        cy={height / 2}
        r="8"
        className="fill-success"
        animate={{ cx: [75, 135, 195, 255, 195, 135, 75] }}
        transition={animProps}
      />

      {/* Time axis */}
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
