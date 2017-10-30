import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'rsuite-utils/lib/propTypes';

const propTypes = {
  id: PropTypes.string,
  componentClass: elementType
};

const defaultProps = {
  componentClass: 'span'
};

const contextTypes = {
  locale: PropTypes.object
};


class FormattedMessage extends React.Component {
  getText() {
    const { id } = this.props;
    const { locale = {} } = this.context;
    const text = locale[id];

    if (!text) {
      return id;
    }

    return text;
  }
  render() {
    const { componentClass: Component, id } = this.props;

    return (
      <Component>
        {this.getText() || id}
      </Component>
    );
  }
}

FormattedMessage.propTypes = propTypes;
FormattedMessage.defaultProps = defaultProps;
FormattedMessage.contextTypes = contextTypes;


export default FormattedMessage;
