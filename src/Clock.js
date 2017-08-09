import React, { PropTypes } from 'react';
import { clockPropTypes } from './clockPropTypes';

function leftPad(number) {
  number = '' + number;
  var pad = number.length < 2 ? '0' : '';
  return pad + number;
}

/**
 * Clamp value between min and max
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

const Digit = ({
    number
}) => (
    <span className="digit-number"> {leftPad(number)} </span>
  );

Digit.propTypes = {
  number: PropTypes.number
};

const Separater = () => <span className="separater">:</span>;

const Digits = ({ time }) => (
  <div className="digits">
    {
      ['hours', 'minutes', 'seconds']
        .filter(k => time[k] !== undefined)
        .map(k => <Digit key={k} number={time[k]} />)
        .reduce((prev, cur, idx) => {
          if (idx) {
            prev.push(<Separater key={idx} />);
          }
          prev.push(cur);
          return prev;
        }, [])
    }
  </div>
);

Digits.propTypes = {
  time: PropTypes.shape({
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number
  })
};

function getPercentage(a, b) {
  return (a / b) * 100 + '%';
}

const Slider = React.createClass({
  propTypes: {
    range: PropTypes.array,
    value: PropTypes.number,
    step: PropTypes.number,
    ruler: PropTypes.bool,
    onChange: PropTypes.func
  },

  getInitialState() {
    const { value } = this.props;
    return {
      value: value
    };
  },

  shouldComponentUpdate(nextProps, nextState) {
    const props = this.props;
    return (
      nextProps.value !== props.value
    );
  },

  render() {
    const { range, value, step, ruler } = this.props;



    return (
      <div className="slider">
        {
          ruler ? (
            <div className="slider-ruler">
              <ul>
                {
                  [...Array(Math.round((range[1] - range[0]) / step))].map((value, index) => <li key={index} />)
                }
              </ul>
            </div>
          ) : null
        }

        <span className="slider-label slider-label--min">{range[0]}</span>
        <div className="slider-track slider-track--container" ref="track">
          <div
            className="slider-track slider-track--active"
            style={{ width: getPercentage(value - range[0], range[1] - range[0]) }}
          >
          </div>
          <span
            className="slider-sliderContainer"
            style={{ left: getPercentage(value - range[0], range[1] - range[0]) }}
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
  },

  handleStart() {
    document.addEventListener('mousemove', this.handleDrag);
    document.addEventListener('touchmove', this.handleDrag);
    document.addEventListener('mouseup', this.handleEnd);
    document.addEventListener('touchend', this.handleEnd);
  },

  handleEnd() {
    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('touchmove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleEnd);
    document.removeEventListener('touchend', this.handleEnd);
  },

  handleDrag(e) {

    // Noop
    e.stopPropagation();
    e.preventDefault();

    const { onChange, value } = this.props;
    const position = this.positionFromEvent(e);
    const nextValue = this.valueFromPosition(position);
    if (value !== nextValue && onChange) {
      onChange(nextValue);
    }
  },

  positionFromEvent(e) {
    const track = this.refs.track;
    const {
      width: trackClientWidth,
      left: trackClientLeft
    } = track.getBoundingClientRect();
    const eventClientX = e.clientX || e.touches[0].clientX;
    return clamp(eventClientX - trackClientLeft, 0, trackClientWidth);
  },

  valueFromPosition(position) {

    const track = this.refs.track;
    const trackClientWidth = track.getBoundingClientRect().width;
    const { range, step } = this.props;
    const rangeDiff = range[1] - range[0];
    const croppedValue = Math.round(position / (trackClientWidth / (rangeDiff / step))) * step + range[0];

    return croppedValue > range[1] ? croppedValue - step : croppedValue;
  }

});


const Sliders = ({
  time,
  onChange,
  hourStep,
  minuteStep,
  secondStep,
  hourRange,
  minuteRange,
  secondRange,
  ruler
}) => (
    <div className="sliders">
      {
        ['hours', 'minutes', 'seconds']
          .filter(k => time[k] !== undefined)
          .map(k => {
            switch (k) {
              case 'hours':
                return (
                  <Slider
                    range={hourRange}
                    value={time[k]}
                    key={k}
                    step={hourStep}
                    ruler={ruler}
                    onChange={
                      value => onChange({ ...time, hours: value })
                    }
                  />
                );
              case 'minutes':
                return (
                  <Slider
                    range={minuteRange}
                    value={time[k]}
                    key={k}
                    step={minuteStep}
                    ruler={ruler}
                    onChange={
                      value => onChange({ ...time, minutes: value })
                    }
                  />
                );
              case 'seconds':
                return (
                  <Slider
                    range={secondRange}
                    value={time[k]}
                    key={k}
                    step={secondStep}
                    ruler={ruler}
                    onChange={
                      value => onChange({ ...time, seconds: value })
                    }
                  />
                );
              default:
                return;
            }
          })
      }
    </div>
  );

Sliders.propTypes = {
  ...clockPropTypes,
  time: PropTypes.shape({
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number
  }),
  onChange: PropTypes.func
};



const Clock = ({
  onChange,
  time,
  ...props
}) => (
    <div className="clock">
      <Digits
        time={time}
      />
      <Sliders
        {...props}
        time={time}
        onChange={onChange}
      />
    </div>
  );

Clock.propTypes = {
  ...clockPropTypes,
  onChange: PropTypes.func,
  time: PropTypes.object,
  hourRange: PropTypes.array,
  hourStep: PropTypes.number,
  minuteStep: PropTypes.number,
  secondStep: PropTypes.number
};

export default Clock;
