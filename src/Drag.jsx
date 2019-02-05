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

const springConfig = { stiffness: 200, damping: 20 };
const itemsCount = 3;

let pressTimer;

export default class Drag extends Component {
  constructor(props) {
    super(props);
    const { order } = props;
    this.state = {
      topDeltaY: 0,
      mouseY: 0,
      isPressed: false,
      originalPosOfLastPressed: 0,
      newOrder: order,
    };
  }

  componentDidMount() {

  }

  addListener = ({ move = true } = {}) => {
    move && window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
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
    this.removeListener();
    this.addListener();

    const a = +new Date();
    if (!pressTimer) {
      pressTimer = window.setTimeout(() => {
        pressTimer = window.clearTimeout(pressTimer);
        console.log(+new Date() - a);
        func();
      }, 700);
    }
  }

  handleTouchStart = (e, key, pressY) => {
    console.log('handleTouchStart');
    e.persist();
    this.handleStart(e, () => {
      const event = e.touches[0];
      const { pageY } = event;

      console.log(pageY, pressY);
      this.setState({
        topDeltaY: pageY - pressY,
        mouseY: pressY,
        isPressed: true,
        originalPosOfLastPressed: key,
      });
    });
  };

  handleMouseDown = (e, pos, pressY) => {
    console.log('handleMouseDown');
    const { pageY } = e;

    this.handleStart(e, () => {
      console.log(pageY, pressY);
      this.setState({
        topDeltaY: pageY - pressY,
        mouseY: pressY,
        isPressed: true,
        originalPosOfLastPressed: pos,
      });
    });
  };

  handleTouchMove = (e) => {
    console.log('handleTouchMove');
    const { isPressed } = this.state;

    pressTimer = clearTimeout(pressTimer);

    if (isPressed) {
      const { onDrop = () => {} } = this.props;
      e.preventDefault();
      this.handleMouseMove(e.touches[0]);
    }
  };

  handleMouseMove = (event) => {
    console.log('handleMouseMove');
    const { pageY } = event;

    // pressTimer = clearTimeout(pressTimer);

    const {
      isPressed, topDeltaY, originalPosOfLastPressed,
    } = this.state;

    const { order = [], children } = this.props;

    if (isPressed) {
      const mouseY = pageY - topDeltaY;

      let row = Math.round(mouseY / height);
      if (mouseY < 0) {
        row = (itemsCount - 1) * height + mouseY;
        row = Math.round(row / height);
        console.log('row', row);
      }

      const currentRow = clamp(row, 0, itemsCount - 1);
      console.log('mouseY', mouseY, 'pageY', pageY, 'topDeltaY', topDeltaY, 'currentRow', Math.abs(currentRow));
      // console.log(mouseY, mouseY / height, currentRow);

      const newOrder = reinsert(order, order.indexOf(originalPosOfLastPressed), currentRow);

      // console.log(currentRow);
      // console.log(newOrder);

      this.setState({ newOrder });
      this.setState({ mouseY });

      // if (currentRow !== order.indexOf(originalPosOfLastPressed)) {
      //
      //   // return
      //   // console.log(newOrder);
      //   // const { doAction } = this.props;
      //   // doAction(({
      //   //   getGroup,
      //   //   setID,
      //   //   getID,
      //   //   render,
      //   // }) => {
      //   //   getGroup().IDList = newOrder;
      //   //   render();
      //   // });
      // }
    }
  };

  handleMouseUp = (e) => {
    console.log('handleMouseUp');

    pressTimer = window.clearTimeout(pressTimer);
    this.setState({ isPressed: false, topDeltaY: 0 });
    this.removeListener();
  };

  render() {
    const {
      mouseY, isPressed, originalPosOfLastPressed, newOrder,
    } = this.state;

    const { order = [], children } = this.props;


    return (
      <div className="demo8">
        {order.map((ID, index) => {
          let y = 0;
          const newIndex = newOrder.indexOf(ID);

          if (index !== newIndex) {
            y = (newIndex - index) * height;
          }


          const style = originalPosOfLastPressed === ID && isPressed
            ? {
              scale: spring(1.1, springConfig),
              shadow: spring(16, springConfig),
              y: mouseY,
            }
            : {
              scale: spring(1, springConfig),
              shadow: spring(0, springConfig),
              y: spring(y, springConfig),
            };
          return (
            <Motion style={ style } key={ ID }>
              {({ scale, shadow, y }) => (
                <div
                  onMouseDown={ (event) => {
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
