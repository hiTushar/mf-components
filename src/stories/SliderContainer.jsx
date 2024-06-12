import React from 'react';
import PropTypes from 'prop-types';
import './sliderContainer.css';
import Slider from '../components/Slider/Slider';

/**
 * Primary UI component for user interaction
 */
export const SliderContainer = ({ data }) => (
  <div className='slider-container'>
    <Slider data={data} />
  </div>
);

SliderContainer.propTypes = {
  data: PropTypes.object,
};

SliderContainer.defaultProps = {
  data: [
    {
      name: 'Item 1',
      id: 1
    }
  ]
};
