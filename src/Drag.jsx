import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import rafSchd from 'raf-schd';
import { prefix, sleep, isExist } from './util';


// todo auto scroll

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

const animDuration = 300;

const springConfig = { stiffness: 200, damping: 20 };

let pressTimer;


export default class Drag extends Component {
  constructor(props) {
    super(props);
    const { order, children } = props;

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
      children,
      newChildren: children,
    };

    this.handleMouseMove = rafSchd(this.handleMouseMove);
    this.childrenMap = {};
  }

  componentDidMount() {
    [this.container, ...findAllParentNode(this.container)].forEach((dom) => {
      dom.addEventListener('scroll', this.onScroll);
    });
  }

  async componentWillReceiveProps(nextProps, nextContext) {
    const { order, newOrder } = this.state;
    const { lastActionMoveID, lastMoveID, children } = nextProps;

    if (
      order.length === nextProps.order.length
      && JSON.stringify(order) !== JSON.stringify(nextProps.order)
      && isExist(lastActionMoveID)
      && isExist(lastMoveID)
    ) {
      await this.clearMotions();
      this.setState({
        // newOrder: [...nextProps.order],
        originalPosOfLastPressed: lastActionMoveID,
        isPressed: true,
      });

      await this.setMouseY(
        this.childrenMap[lastMoveID].ref.offsetTop
        - this.childrenMap[lastActionMoveID].ref.offsetTop,
      );

      this.setState({ newOrder: [...nextProps.order] });

      await sleep(animDuration);

      this.setState({ isPressed: false });

      await sleep(200);

      await this.clearMotions();

      this.setState({
        newOrder: [...nextProps.order],
        order: [...nextProps.order],
        originalPosOfLastPressed: undefined,
        children,
      });

      return;
    }

    if (order.length !== nextProps.order.length) {
      this.clearMotions().then(() => {
        this.setState({ newOrder: [...nextProps.order], order: [...nextProps.order] });
      });
    }

    this.setState({ children });
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

      // console.log(cursorMiddleLine, top + (offsetHeight / 4), bottom - (offsetHeight / 4), ID);
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

  setMouseY = mouseY => new Promise((r) => {
    this.setState({ mouseY }, () => {
      sleep(300).then(r);
    });
  })

  handleMouseMove = (event) => {
    // console.log('handleMouseMove');
    const { pageY } = event;

    const {
      isPressed, topDeltaY, originalPosOfLastPressed, newOrder,
    } = this.state;

    const mouseY = pageY - topDeltaY;

    this.setMouseY(mouseY);

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
    const { changeDone } = this.props;

    this.clearMotions(animDuration).then(() => {
      const { newOrder } = this.state;
      this.setState({ newOrder: [...newOrder], order: [...newOrder] });
      this.setState({ topDeltaY: 0, mouseY: 0, originalPosOfLastPressed: undefined });
      changeDone(newOrder);
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
      mouseY, isPressed, originalPosOfLastPressed, newOrder, order = [], children, newChildren,
    } = this.state;

    const { nextRenderClearMotions } = this;

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
              const {
                ref: { offsetHeight },
              } = this.childrenMap[(newIndex - index > 0 ? newOrder : order)[i]];
              nowY += offsetHeight;
              // debugger;
            }

            // for (let i = index; i <= newIndex; newIndex > index ? i++ : i--) {
            //   if (order[i] === originalPosOfLastPressed) {
            //     continue;
            //   }
            //   const { ref: { offsetHeight } } = this.childrenMap[order[i]];
            //   nowY += offsetHeight;
            //   // debugger;
            // }
            // const { ref: { offsetHeight } } = this.childrenMap[originalPosOfLastPressed];
            y = newIndex - index > 0 ? nowY : -nowY;
          } else if (index !== newIndex) {
            // console.log(index, newIndex);
            y = (newIndex - index > 0 ? 1 : -1)
                * this.childrenMap[originalPosOfLastPressed].ref.offsetHeight;
          }

          // console.log(mouseY);
          const style = originalPosOfLastPressed === ID && isPressed
            ? {
              scale: spring(0.6, springConfig),
              shadow: spring(16, springConfig),
              y: spring(mouseY, { stiffness: 500, damping: 50 }),
              // y: mouseY,
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
  changeDone: () => {},
};
