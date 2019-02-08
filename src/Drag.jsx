import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import rafSchd from 'raf-schd';
import { prefix } from './util';


// todo auto scroll
// todo auto height srcoll bug
// todo ref bug movedown move up

function findAllParentNode(node) {
  const els = [window];
  let currNode = node;
  while (currNode) {
    els.unshift(currNode);
    currNode = currNode.parentNode;
  }
  return els;
}


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

const animDuration = 700;

const springConfig = { stiffness: 200, damping: 20 };

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
      originalPosOfLastPressed: undefined,
      order: [...order],
      newOrder: [...order],
    };

    this.handleMouseMove = rafSchd(this.handleMouseMove);
    this.childrenMap = {};
  }

  componentDidMount() {
    [this.container, ...findAllParentNode(this.container)].forEach((dom) => {
      dom.addEventListener('scroll', this.onScroll);
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { order } = this.state;

    if (
      order.length === nextProps.order.length
      && JSON.stringify(order) !== JSON.stringify(nextProps.order)
    ) {
      this.clearMotions().then(() => {
        this.setState({
          newOrder: [...nextProps.order],
          // originalPosOfLastPressed: order.find((ID, index) => nextProps.order.indexOf(ID) !== index),
          originalPosOfLastPressed: 0,
          isPressed: true,
        });
        return;
        this.clearMotions(animDuration).then(() => {
          this.setState({
            newOrder: [...nextProps.order],
            order: [...nextProps.order],
            originalPosOfLastPressed: undefined,
            isPressed: false,
          });
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

  componentWillUnmount() {
    [this.container, ...findAllParentNode(this.container)].forEach((dom) => {
      dom.removeEventListener('scroll', this.onScroll);
    });
  }

  onScroll = () => {
    clearTimeout(pressTimer);
    this.setState({ isPressed: false });
  }

  addListener = ({ move = true } = {}) => {
    move && window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    window.addEventListener('touchend', this.handleMouseUp);
    move && window.addEventListener('mousemove', this.handleMouseMove);
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
    this.addListener({ move: false });

    // const a = +new Date();
    if (!pressTimer) {
      pressTimer = window.setTimeout(() => {
        pressTimer = window.clearTimeout(pressTimer);
        // console.log(+new Date() - a);
        this.removeListener();
        this.addListener();
        func();
      }, 700);
    }
  }

  handleTouchStart = (e, ID, pressY) => {
    // console.log('handleTouchStart');
    e.persist();
    // const { top } = e.currentTarget.getBoundingClientRect();

    this.handleStart(e, () => {
      const event = e.touches[0];
      const { pageY } = event;

      debugger;
      // console.log(pageY, pressY);
      this.setState({
        topDeltaY: pageY - pressY,
        mouseY: pressY,
        isPressed: true,
        originalPosOfLastPressed: ID,
      });
    });
  };

  handleMouseDown = (e, ID, pressY) => {
    // console.log('handleMouseDown');
    const { pageY } = e;

    this.handleStart(e, () => {
      // console.log(pageY, pressY);
      this.setState({
        topDeltaY: pageY - pressY,
        mouseY: pressY,
        isPressed: true,
        originalPosOfLastPressed: ID,
      });
    });
  };

  handleTouchMove = (e) => {
    // console.log('handleTouchMove');
    const { isPressed } = this.state;

    // pressTimer = clearTimeout(pressTimer);

    if (isPressed) {
      e.preventDefault();
      this.handleMouseMove(e.touches[0]);
    }
  };

  reOrder = () => {
    const {
      originalPosOfLastPressed, newOrder,
    } = this.state;

    const currIndex = newOrder.indexOf(originalPosOfLastPressed);
    const realRow = newOrder.reduce((row, ID) => {
      if (originalPosOfLastPressed === ID) {
        return row;
      }

      const index = newOrder.indexOf(ID);
      const { ref: { offsetHeight, offsetTop }, style: currStyle } = this.childrenMap[ID];
      const top = offsetTop + currStyle.y;
      const bottom = top + offsetHeight;

      // const { top, bottom } = this.childrenMap[ID].ref.getBoundingClientRect();
      const { ref: cursor, style } = this.childrenMap[originalPosOfLastPressed];
      const { offsetTop: cursorOffsetTop, offsetHeight: cursorOffsetHeight } = cursor;

      const cursorMiddleLine = cursorOffsetTop + style.y + (cursorOffsetHeight / 2);

      console.log(cursorMiddleLine, top + (offsetHeight / 4), bottom - (offsetHeight / 4), ID);
      if (
        cursorMiddleLine > top + (offsetHeight / 4)
        && cursorMiddleLine < bottom - (offsetHeight / 4)
      ) {
        return index;
      }
      return row;
    }, currIndex);

    const originIndex = newOrder.indexOf(originalPosOfLastPressed);

    if (originIndex !== realRow) {
      const nextNewOrder = reinsert(newOrder, originIndex, realRow);
      return nextNewOrder;
    }
    return newOrder;
  }

  setMouseY = (pageY) => {
    const {
      isPressed, topDeltaY, originalPosOfLastPressed, newOrder,
    } = this.state;
    const mouseY = pageY - topDeltaY;
    this.setState({ mouseY });
  }

  handleMouseMove = (event) => {
    // console.log('handleMouseMove');
    const { pageY } = event;

    const {
      isPressed, topDeltaY, originalPosOfLastPressed, newOrder,
    } = this.state;

    this.setMouseY(pageY);

    if (isPressed && !this.moveing) {
      if (+new Date() - this.preTime < animDuration) {
        return;
      }
      const nextNewOrder = this.reOrder();

      if (newOrder !== nextNewOrder) {
        this.setState({ newOrder: [...nextNewOrder] });

        this.preTime = +new Date();
      }
    }
    // });
  };

  changeDone = () => {
    const { onDrop = () => {} } = this.props;

    this.clearMotions(animDuration).then(() => {
      const { newOrder } = this.state;
      this.setState({ newOrder: [...newOrder], order: [...newOrder] });
      this.setState({ topDeltaY: 0, mouseY: 0, originalPosOfLastPressed: undefined });
      onDrop(newOrder);
    });
  }

  handleMouseUp = (e) => {
    // console.log('handleMouseUp');
    const { isPressed } = this.state;

    pressTimer = window.clearTimeout(pressTimer);
    this.setState({ isPressed: false });
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

          if (originalPosOfLastPressed === ID && !isPressed) {
          // if (originalPosOfLastPressed === ID ) {
            let nowY = 0;
            const { startIndex, endIndex } = newIndex - index > 0
              ? ({ startIndex: index, endIndex: newIndex })
              : ({ startIndex: newIndex, endIndex: index });

            for (let i = startIndex; i < endIndex; i++) {
              const { ref: { offsetHeight } } = this.childrenMap[order[i]];
              nowY += offsetHeight;
              // debugger;
            }
            // const { ref: { offsetHeight } } = this.childrenMap[originalPosOfLastPressed];
            y = newIndex - index > 0 ? nowY : -nowY;
            debugger;
          } else if (index !== newIndex) {
            // console.log(index, newIndex);
            y = (newIndex - index > 0 ? 1 : -1)
                * this.childrenMap[originalPosOfLastPressed].ref.offsetHeight;
          }

          console.log(mouseY);
          const style = originalPosOfLastPressed === ID && isPressed
            ? {
              scale: spring(1, springConfig),
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

                 if (!this.childrenMap[ID]) this.childrenMap[ID] = {};

                 this.childrenMap[ID].style = { scale, shadow, y };
                 return (
                   <div
                     onMouseDown={ (event) => {
                       this.handleMouseDown(event, ID, y);
                     } }
                     ref={ (ref) => {
                       this.childrenMap[ID].ref = ref;
                     } }
                     onTouchStart={ event => this.handleTouchStart(event, ID, y) }
                     className={ `${prefix('group-item-wrap')} ${originalPosOfLastPressed === ID && isPressed ? prefix('group-item-wrap-pressed') : ''}` }
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
