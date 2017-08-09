import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  range: PropTypes.array,
  value: PropTypes.number,
  onChange: PropTypes.func
};

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  shouldComponentUpdate(nextProps) {
    const props = this.props;
    return (
      nextProps.value !== props.value
    );
  }

  getPercentage(a, b) {
    return (a / b) * 100 + '%';
  }
  /**
 * Clamp value between min and max
 */
  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  valueFromPosition(position) {
    const { range } = this.props;
    const track = this.track;
    const trackClientWidth = track.getBoundingClientRect().width;
    const rangeDiff = range[1] - range[0];
    const value = position / trackClientWidth * rangeDiff + range[0];
    const croppedValue = Math.round(value);
    return croppedValue;
  }

  handleStart = () => {
    document.addEventListener('mousemove', this.handleDrag);
    document.addEventListener('touchmove', this.handleDrag);
    document.addEventListener('mouseup', this.handleEnd);
    document.addEventListener('touchend', this.handleEnd);
  }

  handleEnd = () => {
    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('touchmove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleEnd);
    document.removeEventListener('touchend', this.handleEnd);
  }

  handleDrag = (e) => {

    // Noop
    e.stopPropagation();
    e.preventDefault();

    const { onChange, value } = this.props;
    const position = this.positionFromEvent(e);
    const nextValue = this.valueFromPosition(position);
    if (value !== nextValue && onChange) {
      onChange(nextValue);
    }
  }

  positionFromEvent = (e) => {
    const track = this.track;
    const {
            width: trackClientWidth,
      left: trackClientLeft
        } = track.getBoundingClientRect();
    const eventClientX = e.clientX || e.touches[0].clientX;
    return this.clamp(eventClientX - trackClientLeft, 0, trackClientWidth);
  }

  render() {
    const { range, value } = this.props;
    return (
      <div className="slider">
        <span className="slider-label slider-label--min">{range[0]}</span>
        <div
          className="slider-track slider-track--container"
          ref={(ref) => {
            this.track = ref;
          }}
        >
          <div
            className="slider-track slider-track--active"
            style={{ width: this.getPercentage(value, range[1]) }}
          >
          </div>
          <span
            className="slider-sliderContainer"
            style={{ left: this.getPercentage(value, range[1]) }}
          >
            <span className="slider-label slider-label--value">
              {value}
            </span>
            <a
              className="slider-slider"
              onMouseDown={this.handleStart}
              onTouchStart={this.handleStart}
            >
            </a>
          </span>
        </div>
        <span className="slider-label slider-label--max">{range[1]}</span>
      </div>
    );
  }
}

Slider.propTypes = propTypes;

export default Slider;
