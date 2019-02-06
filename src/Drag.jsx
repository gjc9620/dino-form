import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { prefix } from './util';


// todo auto scroll
// todo auto height
// todo react-beautiful-dnd control scroll when touch

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

const height = 400;
const animDuration = 500;

const springConfig = { stiffness: 200, damping: 20 };
const itemsCount = 4;

let pressTimer;

export default class Drag extends Component {
  constructor(props) {
    super(props);
    const { order } = props;

    console.log('Drag constructor');

    this.Motions = {};
    this.nextRenderClearMotions = false;

    this.state = {
      topDeltaY: 0,
      mouseY: 0,
      isPressed: false,
      originalPosOfLastPressed: 0,
      order: [...order],
      newOrder: [...order],
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { order } = this.state;

    if (
      order.length === nextProps.order.length
      && JSON.stringify(order) !== JSON.stringify(nextProps.order)
    ) {
      this.clearMotions().then(() => {
        this.setState({ newOrder: [...nextProps.order] });
        this.clearMotions(animDuration).then(() => {
          this.setState({ newOrder: [...nextProps.order], order: [...nextProps.order] });
        });
      });
    }

    if (order.length !== nextProps.order.length) {
      this.clearMotions().then(() => {
        this.setState({ newOrder: [...nextProps.order], order: [...nextProps.order] });
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.nextRenderClearMotions = false;
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
        // console.log(+new Date() - a);
        func();
      }, 700);
    }
  }

  handleTouchStart = (e, key, pressY) => {
    // console.log('handleTouchStart');
    e.persist();
    this.handleStart(e, () => {
      const event = e.touches[0];
      const { pageY } = event;

      // console.log(pageY, pressY);
      this.setState({
        topDeltaY: pageY - pressY,
        mouseY: pressY,
        isPressed: true,
        originalPosOfLastPressed: key,
      });
    });
  };

  handleMouseDown = (e, pos, pressY) => {
    // console.log('handleMouseDown');
    const { pageY } = e;

    this.handleStart(e, () => {
      // console.log(pageY, pressY);
      this.setState({
        topDeltaY: pageY - pressY,
        mouseY: pressY,
        isPressed: true,
        originalPosOfLastPressed: pos,
      });
    });
  };

  handleTouchMove = (e) => {
    // console.log('handleTouchMove');
    const { isPressed } = this.state;

    pressTimer = clearTimeout(pressTimer);

    if (isPressed) {
      e.preventDefault();
      this.handleMouseMove(e.touches[0]);
    }
  };

  handleMouseMove = (event) => {
    // console.log('handleMouseMove');
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
      }
      // console.log('row', row);

      const currentRow = clamp(row, 0, itemsCount - 1);

      const newOrder = reinsert(order, order.indexOf(originalPosOfLastPressed), currentRow);

      this.setState({ newOrder: [...newOrder] });
      this.setState({ mouseY });
    }
  };

  changeDone = () => {
    const { onDrop = () => {} } = this.props;

    this.clearMotions(animDuration).then(() => {
      const { newOrder } = this.state;
      this.setState({ newOrder: [...newOrder], order: [...newOrder] });
      onDrop(newOrder);
    });
  }

  handleMouseUp = (e) => {
    // console.log('handleMouseUp');
    const { isPressed } = this.state;

    pressTimer = window.clearTimeout(pressTimer);
    this.setState({ isPressed: false, topDeltaY: 0 });
    this.removeListener();

    if (isPressed) {
      // console.log('onDrop');
      this.changeDone();
    }
  };

  clearMotions =delay => new Promise((r) => {
    setTimeout(() => {
      this.nextRenderClearMotions = true;
      this.setState({}, r);
    }, delay);
  })

  getContainer = (ref) => {
    this.container = ref;
  }

  render() {
    const {
      mouseY, isPressed, originalPosOfLastPressed, newOrder, order = [],
    } = this.state;

    const { nextRenderClearMotions } = this;

    const { children } = this.props;

    return (
      <div className={ `${prefix('drag-container')} ${prefix('map-container')}` } ref={ this.getContainer }>
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
            : nextRenderClearMotions
              ? {
                scale: 1,
                shadow: 0,
                y: 0,
              } : {
                scale: spring(1, springConfig),
                shadow: spring(0, springConfig),
                y: spring(y, springConfig),
              };
          return (
            <Motion style={ style } key={ ID } ref={ ref => this.Motions[ID] = ref }>
              {
               // console.log(ID, ' ', y);
               // console.trace(ID, ' ', y);
               // console.log('scale', ' ', scale);
               // console.log('shadow', ' ', shadow);
               ({ scale, shadow, y }) => {
                 1111;

                 return (
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
                     {/* { children[index] } */}
                     {/* <div>{ID}</div> */}
                     { children[ID] }
                   </div>
                 );
               }
              }
            </Motion>
          );
        })}
      </div>
    );
  }
}

Drag.defaultProps = {
  onDrop: () => {},
};
