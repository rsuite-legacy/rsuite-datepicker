import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  /* eslint-disable */
  locale: PropTypes.object
};

const childContextTypes = {
  locale: PropTypes.object
};


class IntlProvider extends React.Component {

  getChildContext() {
    const { locale } = this.props;
    return { locale };
  }
  render() {
    return React.Children.only(this.props.children);
  }
}

IntlProvider.propTypes = propTypes;
IntlProvider.childContextTypes = childContextTypes;


export default IntlProvider;
