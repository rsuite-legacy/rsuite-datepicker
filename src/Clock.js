import React, { PropTypes } from 'react';

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
    <span className="digit-number"> { leftPad(number) } </span>
);

Digit.propTypes = {
    number: PropTypes.number
};

const Separater = () => <span className="separater">:</span>;

const Digits = ({ time }) => (
    <div className="digits">
        {
            ['hours', 'minutes', 'seconds']
                .filter( k => time[k] !== undefined )
                .map( k => <Digit key={k} number={time[k]} /> )
                .reduce( ( prev, cur, idx ) => {
                    if(idx) prev.push(<Separater key={idx} />);
                    prev.push(cur);
                    return prev;
                }, [] )
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
    return ( a / b ) * 100 + '%';
}

const Slider = React.createClass({
    propTypes: {
        range: PropTypes.array,
        value: PropTypes.number,
        onChange: PropTypes.func
    },

    getInitialState() {
        const { value } = this.props;
        return {
            value: value
        };
    },

    shouldComponentUpdate( nextProps, nextState  ) {
        const props = this.props;
        return (
            nextProps.value !== props.value
        );
    },

    render () {
        const { range, value } = this.props;
        return (
            <div className="slider">
                <span className="slider-label slider-label--min">{ range[0] }</span>
                <div className="slider-track slider-track--container" ref="track">
                    <div
                        className="slider-track slider-track--active"
                        style={ { width: getPercentage(value, range[1] ) } }
                    >
                    </div>
                    <span
                        className="slider-sliderContainer"
                        style={ { left: getPercentage(value, range[1]) } }
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
                <span className="slider-label slider-label--max">{ range[1] }</span>
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
        if(value !== nextValue && onChange) onChange( nextValue );
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
        const { range } = this.props;
        const rangeDiff = range[1] - range[0];
        const value = position / trackClientWidth * rangeDiff + range[0];
        const croppedValue = Math.round(value);
        return croppedValue;
    }

});

const Sliders = ({ time, onChange }) => (
    <div className="sliders">
        {
            ['hours', 'minutes', 'seconds']
                .filter( k => time[k] !== undefined )
                .map( k => {
                    switch(k) {
                        case 'hours':
                            return (
                                <Slider
                                    range={[0, 23]}
                                    value={time[k]}
                                    key={k}
                                    onChange={
                                        value => onChange({...time, hours: value})
                                    }
                                />
                            );
                        case 'minutes':
                            return (
                                <Slider
                                    range={[0, 59]}
                                    value={time[k]}
                                    key={k}
                                    onChange={
                                        value => onChange({...time, minutes: value})
                                    }
                                />
                            );
                        case 'seconds':
                            return (
                                <Slider
                                    range={[0, 59]}
                                    value={time[k]}
                                    key={k}
                                    onChange={
                                        value => onChange({...time, seconds: value})
                                    }
                                />
                            );
                        default:
                            return ;
                    }
                } )
        }
    </div>
);

Sliders.propTypes = {
    time: PropTypes.shape({
        hours: PropTypes.number,
        minutes: PropTypes.number,
        seconds: PropTypes.number
    }),
    onChange: PropTypes.func
};

const Clock = ({
    onChange,
    time
}) => (
    <div className="clock">
        <Digits
            time={time}
        />
        <Sliders
            time={time}
            onChange={onChange}
        />
    </div>
);

Clock.propTypes = {
    onChange: PropTypes.func,
    time: PropTypes.object
};

export default Clock;
