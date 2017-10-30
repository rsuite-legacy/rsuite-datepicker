
import PropTypes from 'prop-types';

export const globalClassName = 'rsuite-datepicker';
export default function decorate(skin = {
  prefixClass: globalClassName
}) {
  return (Component) => {
    const { prefixClass } = skin;
    let propTypes = Component.propTypes || (Component.propTypes = {});
    let defaultProps = Component.defaultProps || (Component.defaultProps = {});

    propTypes.prefixClass = PropTypes.string;
    propTypes.defaultClassName = PropTypes.string;

    defaultProps.prefixClass = prefixClass;
    defaultProps.defaultClassName = prefixClass;

    Component.prototype.prefix = className => `${prefixClass}-${className}`;

    return Component;
  };
}
