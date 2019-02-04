import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { prefix } from './util';

function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

const height = 310;

const springConfig = { stiffness: 300, damping: 20 };
const itemsCount = 4;

export default class Drag extends Component {
  constructor(props) {
    super(props);
    // const { IDList } = props;
    this.state = {
      topDeltaY: 0,
      mouseY: 0,
      isPressed: false,
      originalPosOfLastPressed: 0,
      // order: IDList,
    };
    this.pressTimer = undefined;
  }

  componentDidMount() {

  }

  addListener = () => {
    window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  removeListener = () => {
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleStart = (e, func = () => {}) => {
    console.log(e.target.attributes.dinoFormResponded);
    if (e.target.attributes.dinoFormResponded) return;
    e.target.attributes.dinoFormResponded = true;
    this.addListener();

    console.log(this.pressTimer);
    if (!this.pressTimer) {
      this.pressTimer = window.setTimeout(() => {
        console.log(this);
        func();
      }, 500);
    }
  }

  handleTouchStart = (e, key, pressY) => {
    console.log('handleTouchStart', e);
    e.persist();
    this.handleStart(e, () => {
      const event = e.touches[0];
      const { pageY } = event;

      this.setState({
        topDeltaY: pageY - pressY,
        mouseY: pressY,
        isPressed: true,
        originalPosOfLastPressed: key,
      });
    });
  };

  handleMouseDown = (e, pos, pressY) => {
    console.log('handleMouseDown', e);
    const { pageY } = e;

    this.handleStart(e, () => {
      this.setState({
        topDeltaY: pageY - pressY,
        mouseY: pressY,
        isPressed: true,
        originalPosOfLastPressed: pos,
      });
    });
  };

  handleTouchMove = (e) => {
    const { isPressed } = this.state;

    if (isPressed) {
      e.preventDefault();
      this.handleMouseMove(e.touches[0]);
    }
  };

  handleMouseMove = (event) => {
    const { pageY } = event;

    const {
      isPressed, topDeltaY, originalPosOfLastPressed,
    } = this.state;

    const { order = [], children } = this.props;

    if (isPressed) {
      const mouseY = pageY - topDeltaY;
      const currentRow = clamp(Math.round(mouseY / height), 0, itemsCount - 1);
      let newOrder = order;

      if (currentRow !== order.indexOf(originalPosOfLastPressed)) {
        newOrder = reinsert(order, order.indexOf(originalPosOfLastPressed), currentRow);
      }

      this.setState({ mouseY, order: newOrder });
    }
  };

  handleMouseUp = (e) => {
    console.log('handleMouseUp');
    clearTimeout(this.pressTimer);
    this.setState({ isPressed: false, topDeltaY: 0 });
    this.removeListener();
  };

  render() {
    const {
      mouseY, isPressed, originalPosOfLastPressed,
    } = this.state;

    const { order = [], children } = this.props;

    // console.log(order);

    return (
      <div className="demo8">
        {order.map((ID, index) => {
          const style = originalPosOfLastPressed === ID && isPressed
            ? {
              scale: spring(1.1, springConfig),
              shadow: spring(16, springConfig),
              y: mouseY,
            }
            : {
              scale: spring(1, springConfig),
              shadow: spring(0, springConfig),
              // y: spring(order.indexOf(ID) * height, springConfig),
              y: 0,
            };
          return (
            <Motion style={ style } key={ ID }>
              {({ scale, shadow, y }) => (
                <div
                  onMouseDown={ (event) => {
                    console.log(event);
                    this.handleMouseDown(event, ID, y);
                  } }
                  onTouchStart={ event => this.handleTouchStart(event, ID, y) }
                  className={ `${prefix('group-item-wrap')}` }
                  style={ {
                    boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                    transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    zIndex: ID === originalPosOfLastPressed ? 99 : ID,
                  } }>
                  { children[index] }
                </div>
              )}
            </Motion>
          );
        })}
      </div>
    );
  }
}
