import React from 'react';
import PropTypes from 'prop-types';
import './hero.css';

const Hero = (props) => {
  return (
    <div className="hero-simple-container">
      <div className="hero-simple-content">
        <h1 className="hero-simple-title">{props.heading1}</h1>
        <p className="hero-simple-description">{props.content1}</p>
      </div>
    </div>
  );
};

Hero.defaultProps = {
  heading1: 'Andrew J. Hermann',
  content1: 'Strategic Leadership, AI Innovation, and Organizational Excellence',
};

Hero.propTypes = {
  heading1: PropTypes.string,
  content1: PropTypes.string,
};

export default Hero;
