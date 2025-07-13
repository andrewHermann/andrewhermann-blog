import React from 'react';
import PropTypes from 'prop-types';
import ThreeScene from './ThreeScene';
import './hero.css';

const Hero = (props) => {
  return (
    <div className="hero-header78">
      <div className="hero-column thq-section-max-width thq-section-padding">
        <ThreeScene />
        <div className="hero-content1">
          <h1 className="hero-text1 thq-heading-1">{props.heading1}</h1>
          <p className="hero-text2 thq-body-large">{props.content1}</p>
        </div>
        <div className="hero-actions">
          <button className="thq-button-filled hero-button1" onClick={props.onExplorePortfolio}>
            <span className="thq-body-small">{props.action1}</span>
          </button>
          <button className="thq-button-outline hero-button2" onClick={props.onLearnMore}>
            <span className="thq-body-small">{props.action2}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

Hero.defaultProps = {
  heading1: 'Welcome to the Official Website of Andrew J. Hermann',
  content1: 'Explore my expertise in organizational strategy, project portfolio management, data-driven decision-making, and applied artificial intelligence in public administration.',
  action1: 'Explore Portfolio',
  action2: 'Learn More',
};

Hero.propTypes = {
  heading1: PropTypes.string,
  content1: PropTypes.string,
  action1: PropTypes.string,
  action2: PropTypes.string,
  onExplorePortfolio: PropTypes.func,
  onLearnMore: PropTypes.func,
};

export default Hero;
