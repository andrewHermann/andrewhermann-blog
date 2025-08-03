import React from 'react';
import ThreeSceneCustom from './ThreeSceneCustom';
import OpenSourceBadge from './OpenSourceBadge';
import './PageFloatingRobot.css';

const PageFloatingRobot = ({ bodyColor = '#4a90e2', glowColor = '#ffffff' }) => {
  return (
    <div className="page-floating-robot-wrapper">
      <div className="page-floating-robot-container">
        <ThreeSceneCustom bodyColor={bodyColor} glowColor={glowColor} />
      </div>
      <div className="opensource-badge-container">
        <OpenSourceBadge 
          variant="default" 
          position="static" 
          size="medium"
          className="floating-robot-badge"
        />
      </div>
    </div>
  );
};

export default PageFloatingRobot;
