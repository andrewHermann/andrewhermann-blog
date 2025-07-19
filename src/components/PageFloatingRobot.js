import React from 'react';
import ThreeSceneCustom from './ThreeSceneCustom';
import './PageFloatingRobot.css';

const PageFloatingRobot = ({ bodyColor = '#4a90e2', glowColor = '#ffffff' }) => {
  return (
    <div className="page-floating-robot-container">
      <ThreeSceneCustom bodyColor={bodyColor} glowColor={glowColor} />
    </div>
  );
};

export default PageFloatingRobot;
