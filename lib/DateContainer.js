"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateContainer = function DateContainer() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? props : arguments[0];

    var placeholder = _ref.placeholder;
    var onClick = _ref.onClick;
    var onClean = _ref.onClean;
    return _react2.default.createElement(
        "div",
        { className: "dateContainer", onClick: onClick },
        _react2.default.createElement(
            "div",
            { className: "dateContainer-placeholder" },
            placeholder
        ),
        onClean && _react2.default.createElement(
            "div",
            { className: "dateContainer-clean", onClick: function onClick(e) {
                    e.stopPropagation();
                    onClean();
                } },
            "✕"
        )
    );
};

exports.default = DateContainer;