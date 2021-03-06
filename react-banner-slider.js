'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./react-banner-slider.css');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = require('omit.js');

var _omit2 = _interopRequireDefault(_omit);

require('./iconfont.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * container
 */
var Banner = function (_React$Component) {
  _inherits(Banner, _React$Component);

  function Banner(props) {
    _classCallCheck(this, Banner);

    var _this = _possibleConstructorReturn(this, (Banner.__proto__ || Object.getPrototypeOf(Banner)).call(this, props));

    _this.state = {
      current: 0,
      moving: 0,
      autoPlayer: props.autoPlayer || false,
      direction: props.direction || false,
      duration: parseInt(props.duration) && parseInt(props.duration) >= 500 ? parseInt(props.duration) : 2000,
      stopDuration: parseInt(props.stopDuration) && parseInt(props.stopDuration) >= 500 ? parseInt(props.stopDuration) : 2000
    };
    _this.autoPlayerInterval = null;
    _this.checkAutoPlay = _this.checkAutoPlay.bind(_this);
    _this.clearAutoPlayer = _this.clearAutoPlayer.bind(_this);
    _this.reSetAutoPlayer = _this.reSetAutoPlayer.bind(_this);
    _this.pre = _this.pre.bind(_this);
    _this.next = _this.next.bind(_this);
    _this.change = _this.change.bind(_this);
    _this.endMoving = _this.endMoving.bind(_this);
    return _this;
  }

  _createClass(Banner, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.checkAutoPlay();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(next) {
      var autoPlayer = next.autoPlayer,
          direction = next.direction,
          duration = next.duration,
          stopDuration = next.stopDuration;

      if (!autoPlayer) {
        this.clearAutoPlayer();
      } else {
        this.setState({
          autoPlayer: true,
          direction: direction ? true : false,
          duration: parseInt(duration) && parseInt(duration) >= 500 ? parseInt(duration) : 2000,
          stopDuration: parseInt(stopDuration) && parseInt(stopDuration) >= 500 ? parseInt(stopDuration) : 2000
        }, this.checkAutoPlay);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearAutoPlayer();
    }
  }, {
    key: 'checkAutoPlay',
    value: function checkAutoPlay() {
      var _this2 = this;

      var _state = this.state,
          autoPlayer = _state.autoPlayer,
          direction = _state.direction,
          duration = _state.duration;

      if (autoPlayer) {
        this.clearAutoPlayer();
        if (direction) {
          this.autoPlayerInterval = setInterval(function () {
            _this2.next(true);
          }, duration);
        } else {
          this.autoPlayerInterval = setInterval(function () {
            _this2.pre(true);
          }, duration);
        }
      }
    }
  }, {
    key: 'clearAutoPlayer',
    value: function clearAutoPlayer() {
      this.autoPlayerInterval && clearInterval(this.autoPlayerInterval);
    }
  }, {
    key: 'reSetAutoPlayer',
    value: function reSetAutoPlayer() {
      this.clearAutoPlayer();
      setTimeout(this.checkAutoPlay, this.state.stopDuration);
    }
  }, {
    key: 'pre',
    value: function pre(internal) {
      if (internal !== true) {
        this.reSetAutoPlayer();
      }
      var _state2 = this.state,
          current = _state2.current,
          moving = _state2.moving;
      // console.log('flag', moving);

      if (moving !== 0) {
        return;
      }
      if (--current >= 0) {
        this.setState({ current: current });
      } else {
        var children = this.ref && this.ref.children.length - 2;
        if (children) {
          this.setState({ current: --children, pre: true });
        }
      }
    }
  }, {
    key: 'next',
    value: function next(internal) {
      if (internal !== true) {
        this.reSetAutoPlayer();
      }
      var _state3 = this.state,
          current = _state3.current,
          moving = _state3.moving;

      if (moving !== 0) {
        return;
      }
      var children = this.ref && this.ref.children.length - 2;
      if (children) {
        if (++current >= children) {
          this.setState({ current: 0, next: true });
        } else {
          this.setState({ current: current });
        }
      }
    }
  }, {
    key: 'change',
    value: function change(index) {
      var _state4 = this.state,
          current = _state4.current,
          moving = _state4.moving;

      if (moving !== 0) {
        return;
      }
      this.setState({ current: index });
    }
  }, {
    key: 'endMoving',
    value: function endMoving() {
      // console.log('执行end')
      var moving = this.state.moving;

      if (++moving === 2) {
        this.setState({ moving: 0, pre: false, next: false });
      } else {
        this.setState({ moving: moving });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          children = _props.children,
          _props$className = _props.className,
          className = _props$className === undefined ? '' : _props$className,
          _props$style = _props.style,
          style = _props$style === undefined ? {} : _props$style;
      var _state5 = this.state,
          current = _state5.current,
          moving = _state5.moving,
          pre = _state5.pre,
          next = _state5.next;

      var _children = [];
      if (children) {
        if ((typeof children === 'undefined' ? 'undefined' : _typeof(children)) === 'object') {
          if (children.length) {
            children.map(function (element, index) {
              if ((typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object' && typeof element.type === 'function' && element.type.name === 'BannerItem') {
                _children.push(_react2.default.createElement(BannerItem, _extends({ pre: pre, next: next, endMoving: _this3.endMoving }, element.props, { uniqueIndex: _children.length, key: _children.length, current: current })));
              }
            });
          } else {
            // children是唯一的 但是object或者dom元素
            if (typeof children.type === 'function' && children.type.name === 'BannerItem') {
              _children.push(_react2.default.createElement(BannerItem, _extends({ pre: pre, next: next, endMoving: this.endMoving }, children.props, { uniqueIndex: _children.length, key: _children.length, current: current })));
            }
          }
        }
      }
      var _circle = _children.map(function (item, index) {
        var _cls = (0, _classnames2.default)({
          'circle': true,
          'circle-active': index === current
        });
        return _react2.default.createElement('div', { className: _cls, key: index, onClick: function onClick() {
            _this3.change(index);
          } });
      });
      var divProps = (0, _omit2.default)(this.props, ['className', 'style', 'children', 'autoPlayer', 'duration', 'direction', 'stopDuration']);
      return _react2.default.createElement(
        'div',
        _extends({ className: 'banner-wrapper ' + className, style: style }, divProps, { ref: function ref(_ref) {
            _this3.ref = _ref;
          } }),
        _children,
        _react2.default.createElement(
          'div',
          { className: 'slider-wrapper' },
          _react2.default.createElement(
            'div',
            { className: 'slider slider-pre', onClick: this.pre },
            _react2.default.createElement('i', { className: 'icon iconfont icon-back' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'slider slider-next', onClick: this.next },
            _react2.default.createElement('i', { className: 'icon iconfont icon-more' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'circle-wrapper' },
          _circle
        )
      );
    }
  }]);

  return Banner;
}(_react2.default.Component);

/**
 * item
 */


var BannerItem = function (_React$Component2) {
  _inherits(BannerItem, _React$Component2);

  function BannerItem(props) {
    _classCallCheck(this, BannerItem);

    var _this4 = _possibleConstructorReturn(this, (BannerItem.__proto__ || Object.getPrototypeOf(BannerItem)).call(this, props));

    _this4.state = {
      current: _this4.props.current,
      uniqueIndex: _this4.props.uniqueIndex,
      toLeftHidden: false,
      toLeftShow: false,
      toRightHidden: false,
      toRightShow: false,
      moving: false,
      show: _this4.props.current === _this4.props.uniqueIndex
    };
    _this4.clear = _this4.clear.bind(_this4);
    _this4.toLeftMovingShow = _this4.toLeftMovingShow.bind(_this4);
    _this4.toLeftMovingHidden = _this4.toLeftMovingHidden.bind(_this4);
    _this4.toRightMovingShow = _this4.toRightMovingShow.bind(_this4);
    _this4.toRightMovingHidden = _this4.toRightMovingHidden.bind(_this4);
    return _this4;
  }

  _createClass(BannerItem, [{
    key: 'clear',
    value: function clear() {
      var _this5 = this;

      setTimeout(function () {
        _this5.setState({
          toLeftHidden: false,
          toLeftShow: false,
          toRightHidden: false,
          toRightShow: false,

          moving: false,
          show: _this5.state.willShow,
          willShow: false
        }, _this5.props.endMoving);
      }, 500);
    }
  }, {
    key: 'toLeftMovingShow',
    value: function toLeftMovingShow() {
      this.setState({
        toLeftHidden: false,
        toLeftShow: true,
        toRightHidden: false,
        toRightShow: false,
        moving: true
      }, this.clear);
    }
  }, {
    key: 'toLeftMovingHidden',
    value: function toLeftMovingHidden() {
      this.setState({
        toLeftHidden: true,
        toLeftShow: false,
        toRightHidden: false,
        toRightShow: false,
        moving: true
      }, this.clear);
    }
  }, {
    key: 'toRightMovingShow',
    value: function toRightMovingShow() {
      this.setState({
        toLeftHidden: false,
        toLeftShow: false,
        toRightHidden: false,
        toRightShow: true,
        moving: true
      }, this.clear);
    }
  }, {
    key: 'toRightMovingHidden',
    value: function toRightMovingHidden() {
      this.setState({
        toLeftHidden: false,
        toLeftShow: false,
        toRightHidden: true,
        toRightShow: false,
        moving: true
      }, this.clear);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(next) {
      var _state6 = this.state,
          current = _state6.current,
          uniqueIndex = _state6.uniqueIndex;

      if (next.current !== current) {
        this.setState({ current: next.current });
      } else {
        return;
      }
      // 下一次要显示出来
      if (next.current === uniqueIndex) {
        if (next.pre) {
          this.toRightMovingShow();
        } else if (next.next) {
          this.toLeftMovingShow();
        } else {
          if (current < uniqueIndex) {
            this.toLeftMovingShow();
          } else {
            this.toRightMovingShow();
          }
        }

        this.setState({ willShow: true });
      }
      // 当前显示，即将要隐藏起来
      if (current === uniqueIndex) {
        if (next.pre) {
          this.toRightMovingHidden();
        } else if (next.next) {
          this.toLeftMovingHidden();
        } else {
          if (next.current < uniqueIndex) {
            this.toRightMovingHidden();
          } else {
            this.toLeftMovingHidden();
          }
        }

        this.setState({ willShow: false });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          backgroundSrc = _props2.backgroundSrc,
          _props2$className = _props2.className,
          className = _props2$className === undefined ? '' : _props2$className,
          _props2$style = _props2.style,
          style = _props2$style === undefined ? {} : _props2$style,
          children = _props2.children;
      var _state7 = this.state,
          toLeftHidden = _state7.toLeftHidden,
          toLeftShow = _state7.toLeftShow,
          toRightHidden = _state7.toRightHidden,
          toRightShow = _state7.toRightShow,
          show = _state7.show;

      var localClassName = (0, _classnames2.default)(_defineProperty({
        'banner-item': true,
        'banner-item-visible': show,
        'banner-to-left-hidden': toLeftHidden,
        'banner-to-left-show': toLeftShow,
        'banner-to-right-hidden': toRightHidden,
        'banner-to-right-show': toRightShow
      }, className, true));
      var divProps = (0, _omit2.default)(this.props, ['pre', 'next', 'endMoving', 'backgroundSrc', 'className', 'style', 'children', 'uniqueIndex', 'current']);
      return _react2.default.createElement(
        'div',
        _extends({ className: localClassName, style: Object.assign({}, style, { backgroundImage: 'url(' + backgroundSrc + ')' }) }, divProps),
        children
      );
    }
  }]);

  return BannerItem;
}(_react2.default.Component);

Banner.Item = BannerItem;
exports.default = Banner;