import _objectSpread from "@babel/runtime-corejs2/helpers/esm/objectSpread";
import _JSON$stringify from "@babel/runtime-corejs2/core-js/json/stringify";
import _Promise from "@babel/runtime-corejs2/core-js/promise";
import _defineProperty from "@babel/runtime-corejs2/helpers/esm/defineProperty";
import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import rafSchd from 'raf-schd';
import { prefix, sleep, isExist } from './util';
export { spring } from 'react-motion'; // todo auto scroll

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

const animDuration = 300;
const springConfig = {
  stiffness: 200,
  damping: 20
};
let pressTimer;
export default class Drag extends Component {
  constructor(props) {
    var _this;

    super(props);
    _this = this;

    _defineProperty(this, "onScroll", () => {
      clearTimeout(pressTimer);

      if (this.state.isPressed) {
        this.setState({
          isPressed: false
        });
      }
    });

    _defineProperty(this, "addListener", function () {
      let _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$move = _ref.move,
          move = _ref$move === void 0 ? true : _ref$move;

      move && window.addEventListener('touchmove', _this.handleTouchMove, {
        passive: false
      });
      window.addEventListener('touchend', _this.handleMouseUp);
      move && window.addEventListener('mousemove', _this.handleMouseMove);
      window.addEventListener('mouseup', _this.handleMouseUp);
    });

    _defineProperty(this, "removeListener", () => {
      window.removeEventListener('touchmove', this.handleTouchMove);
      window.removeEventListener('touchend', this.handleMouseUp);
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('mouseup', this.handleMouseUp);
    });

    _defineProperty(this, "handleStart", function (e) {
      let func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => {};

      _this.removeListener();

      _this.addListener({
        move: false
      }); // const a = +new Date();


      if (!pressTimer) {
        pressTimer = window.setTimeout(() => {
          pressTimer = window.clearTimeout(pressTimer); // console.log(+new Date() - a);

          _this.removeListener();

          _this.addListener();

          func();
        }, 700);
      }
    });

    _defineProperty(this, "handleTouchStart", (e, ID, pressY) => {
      // console.log('handleTouchStart');
      e.persist(); // const { top } = e.currentTarget.getBoundingClientRect();

      this.handleStart(e, () => {
        const event = e.touches[0];
        const pageY = event.pageY;
        this.setState({
          topDeltaY: pageY - pressY,
          mouseY: pressY,
          isPressed: true,
          originalPosOfLastPressed: ID
        });
      });
    });

    _defineProperty(this, "handleMouseDown", (e, ID, pressY) => {
      // console.log('handleMouseDown');
      const pageY = e.pageY;
      this.handleStart(e, () => {
        // console.log(pageY, pressY);
        this.setState({
          topDeltaY: pageY - pressY,
          mouseY: pressY,
          isPressed: true,
          originalPosOfLastPressed: ID
        });
      });
    });

    _defineProperty(this, "handleTouchMove", e => {
      // console.log('handleTouchMove');
      const isPressed = this.state.isPressed; // pressTimer = clearTimeout(pressTimer);

      if (isPressed) {
        e.preventDefault();
        this.handleMouseMove(e.touches[0]);
      }
    });

    _defineProperty(this, "reOrder", () => {
      const _this$state = this.state,
            originalPosOfLastPressed = _this$state.originalPosOfLastPressed,
            newOrder = _this$state.newOrder;
      const currIndex = newOrder.indexOf(originalPosOfLastPressed);
      const realRow = newOrder.reduce((row, ID) => {
        if (originalPosOfLastPressed === ID) {
          return row;
        }

        const index = newOrder.indexOf(ID);
        const _this$childrenMap$ID = this.childrenMap[ID],
              _this$childrenMap$ID$ = _this$childrenMap$ID.ref,
              offsetHeight = _this$childrenMap$ID$.offsetHeight,
              offsetTop = _this$childrenMap$ID$.offsetTop,
              currStyle = _this$childrenMap$ID.style;
        const top = offsetTop + currStyle.y;
        const bottom = top + offsetHeight; // const { top, bottom } = this.childrenMap[ID].ref.getBoundingClientRect();

        const _this$childrenMap$ori = this.childrenMap[originalPosOfLastPressed],
              cursor = _this$childrenMap$ori.ref,
              style = _this$childrenMap$ori.style;
        const cursorOffsetTop = cursor.offsetTop,
              cursorOffsetHeight = cursor.offsetHeight;
        const cursorMiddleLine = cursorOffsetTop + style.y + cursorOffsetHeight / 2; // console.log(cursorMiddleLine, top + (offsetHeight / 4), bottom - (offsetHeight / 4), ID);

        if (cursorMiddleLine > top + offsetHeight / 4 && cursorMiddleLine < bottom - offsetHeight / 4) {
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
    });

    _defineProperty(this, "setMouseY", mouseY => new _Promise(r => {
      this.setState({
        mouseY
      }, () => {
        sleep(300).then(r);
      });
    }));

    _defineProperty(this, "handleMouseMove", event => {
      // console.log('handleMouseMove');
      const pageY = event.pageY;
      const _this$state2 = this.state,
            isPressed = _this$state2.isPressed,
            topDeltaY = _this$state2.topDeltaY,
            originalPosOfLastPressed = _this$state2.originalPosOfLastPressed,
            newOrder = _this$state2.newOrder;
      const mouseY = pageY - topDeltaY;
      this.setMouseY(mouseY);

      if (isPressed && !this.moveing) {
        if (+new Date() - this.preTime < animDuration) {
          return;
        }

        const nextNewOrder = this.reOrder();

        if (newOrder !== nextNewOrder) {
          this.setState({
            newOrder: [...nextNewOrder]
          });
          this.preTime = +new Date();
        }
      } // });

    });

    _defineProperty(this, "changeDone", () => {
      const changeDone = this.props.changeDone;
      this.clearMotions(animDuration).then(() => {
        const newOrder = this.state.newOrder;
        this.setState({
          newOrder: [...newOrder],
          order: [...newOrder]
        });
        this.setState({
          topDeltaY: 0,
          mouseY: 0,
          originalPosOfLastPressed: undefined
        });
        changeDone(newOrder);
      });
    });

    _defineProperty(this, "handleMouseUp", e => {
      // console.log('handleMouseUp');
      const isPressed = this.state.isPressed;
      pressTimer = window.clearTimeout(pressTimer);
      this.setState({
        isPressed: false
      });
      this.removeListener();

      if (isPressed) {
        // console.log('onDrop');
        this.changeDone();
      }
    });

    _defineProperty(this, "clearMotions", delay => new _Promise(r => {
      setTimeout(() => {
        this.nextRenderClearMotions = true;
        this.setState({}, r);
      }, delay);
    }));

    _defineProperty(this, "getContainer", ref => {
      this.container = ref;
    });

    const order = props.order,
          children = props.children;
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
      newChildren: children
    };
    this.handleMouseMove = rafSchd(this.handleMouseMove);
    this.childrenMap = {};
  }

  componentDidMount() {
    [this.container, ...findAllParentNode(this.container)].forEach(dom => {
      dom.addEventListener('scroll', this.onScroll);
    });
  }

  async componentWillReceiveProps(nextProps, nextContext) {
    const _this$state3 = this.state,
          order = _this$state3.order,
          newOrder = _this$state3.newOrder;
    const lastActionMoveID = nextProps.lastActionMoveID,
          lastMoveID = nextProps.lastMoveID,
          children = nextProps.children;

    if (order.length === nextProps.order.length && _JSON$stringify(order) !== _JSON$stringify(nextProps.order) && isExist(lastActionMoveID) && isExist(lastMoveID)) {
      await this.clearMotions();
      this.setState({
        // newOrder: [...nextProps.order],
        originalPosOfLastPressed: lastActionMoveID,
        isPressed: true
      });
      await this.setMouseY(this.childrenMap[lastMoveID].ref.offsetTop - this.childrenMap[lastActionMoveID].ref.offsetTop);
      this.setState({
        newOrder: [...nextProps.order]
      });
      await sleep(animDuration);
      this.setState({
        isPressed: false
      });
      await sleep(200);
      await this.clearMotions();
      this.setState({
        newOrder: [...nextProps.order],
        order: [...nextProps.order],
        originalPosOfLastPressed: undefined,
        children
      });
      return;
    }

    this.clearMotions().then(() => {
      this.setState({
        children,
        newOrder: [...nextProps.order],
        order: [...nextProps.order]
      });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.nextRenderClearMotions = false;
  }

  componentWillUnmount() {
    [this.container, ...findAllParentNode(this.container)].forEach(dom => {
      dom.removeEventListener('scroll', this.onScroll);
    });
  }

  render() {
    const _this$state4 = this.state,
          mouseY = _this$state4.mouseY,
          isPressed = _this$state4.isPressed,
          originalPosOfLastPressed = _this$state4.originalPosOfLastPressed,
          newOrder = _this$state4.newOrder,
          _this$state4$order = _this$state4.order,
          order = _this$state4$order === void 0 ? [] : _this$state4$order,
          children = _this$state4.children,
          newChildren = _this$state4.newChildren;
    const _this$props = this.props,
          clearMotions = _this$props.clearMotions,
          pressedMotions = _this$props.pressedMotions,
          notPressedMotions = _this$props.notPressedMotions,
          createStyle = _this$props.createStyle;
    const nextRenderClearMotions = this.nextRenderClearMotions;
    return React.createElement("div", {
      className: `${prefix('drag-container')} ${prefix('map-container')}`,
      ref: this.getContainer
    }, order.map((ID, index) => {
      let y = 0;
      const newIndex = newOrder.indexOf(ID);

      if (originalPosOfLastPressed === ID && !isPressed) {
        // if (originalPosOfLastPressed === ID ) {
        let nowY = 0;

        const _ref2 = newIndex - index > 0 ? {
          startIndex: index,
          endIndex: newIndex
        } : {
          startIndex: newIndex,
          endIndex: index
        },
              startIndex = _ref2.startIndex,
              endIndex = _ref2.endIndex;

        for (let i = startIndex; i < endIndex; i++) {
          const offsetHeight = this.childrenMap[(newIndex - index > 0 ? newOrder : order)[i]].ref.offsetHeight;
          nowY += offsetHeight;
        }

        y = newIndex - index > 0 ? nowY : -nowY;
      } else if (index !== newIndex) {
        y = (newIndex - index > 0 ? 1 : -1) * this.childrenMap[originalPosOfLastPressed].ref.offsetHeight;
      }

      const style = nextRenderClearMotions ? _objectSpread({}, clearMotions(), {
        y: 0
      }) : originalPosOfLastPressed === ID && isPressed ? _objectSpread({}, pressedMotions(), {
        y: spring(mouseY, {
          stiffness: 500,
          damping: 50
        }) // y: mouseY,

      }) : _objectSpread({}, notPressedMotions(), {
        y: spring(y, springConfig)
      });
      return React.createElement(Motion, {
        style: style,
        key: ID,
        ref: _ref4 => this.Motions[ID] = _ref4
      }, // console.log(ID, ' ', y);
      // console.trace(ID, ' ', y);
      // console.log('scale', ' ', scale);
      // console.log('shadow', ' ', shadow);
      styles => {
        if (!this.childrenMap[ID]) this.childrenMap[ID] = {};
        this.childrenMap[ID].style = {
          y: styles.y
        };
        return React.createElement("div", {
          onMouseDown: event => {
            this.handleMouseDown(event, ID, y);
          },
          ref: _ref3 => {
            this.childrenMap[ID].ref = _ref3;
          },
          onTouchStart: event => this.handleTouchStart(event, ID, y),
          className: `${prefix('group-item-wrap')} ${originalPosOfLastPressed === ID && isPressed ? prefix('group-item-wrap-pressed') : ''}`,
          style: _objectSpread({}, createStyle({
            styles,
            ID,
            originalPosOfLastPressed
          }), {
            zIndex: ID === originalPosOfLastPressed ? 99 : ID,
            position: ID === originalPosOfLastPressed ? 'relative' : 'unset'
          })
        }, children[ID]);
      });
    }));
  }

}
Drag.defaultProps = {
  changeDone: () => {},
  clearMotions: () => ({
    scale: 1,
    shadow: 0
  }),
  pressedMotions: () => ({
    scale: spring(0.6, springConfig),
    shadow: spring(16, springConfig) // y: mouseY,

  }),
  notPressedMotions: () => ({
    scale: spring(1, springConfig),
    shadow: spring(0, springConfig)
  }),
  createStyle: function createStyle() {
    let _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref5$styles = _ref5.styles,
        scale = _ref5$styles.scale,
        shadow = _ref5$styles.shadow,
        y = _ref5$styles.y;

    return {
      boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
      transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
      WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EcmFnLmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIk1vdGlvbiIsInNwcmluZyIsInJhZlNjaGQiLCJwcmVmaXgiLCJzbGVlcCIsImlzRXhpc3QiLCJmaW5kQWxsUGFyZW50Tm9kZSIsIm5vZGUiLCJlbHMiLCJ3aW5kb3ciLCJjdXJyTm9kZSIsInVuc2hpZnQiLCJwYXJlbnROb2RlIiwicmVpbnNlcnQiLCJhcnIiLCJmcm9tIiwidG8iLCJfYXJyIiwic2xpY2UiLCJ2YWwiLCJzcGxpY2UiLCJhbmltRHVyYXRpb24iLCJzcHJpbmdDb25maWciLCJzdGlmZm5lc3MiLCJkYW1waW5nIiwicHJlc3NUaW1lciIsIkRyYWciLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiY2xlYXJUaW1lb3V0Iiwic3RhdGUiLCJpc1ByZXNzZWQiLCJzZXRTdGF0ZSIsIm1vdmUiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlVG91Y2hNb3ZlIiwicGFzc2l2ZSIsImhhbmRsZU1vdXNlVXAiLCJoYW5kbGVNb3VzZU1vdmUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZSIsImZ1bmMiLCJyZW1vdmVMaXN0ZW5lciIsImFkZExpc3RlbmVyIiwic2V0VGltZW91dCIsIklEIiwicHJlc3NZIiwicGVyc2lzdCIsImhhbmRsZVN0YXJ0IiwiZXZlbnQiLCJ0b3VjaGVzIiwicGFnZVkiLCJ0b3BEZWx0YVkiLCJtb3VzZVkiLCJvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQiLCJwcmV2ZW50RGVmYXVsdCIsIm5ld09yZGVyIiwiY3VyckluZGV4IiwiaW5kZXhPZiIsInJlYWxSb3ciLCJyZWR1Y2UiLCJyb3ciLCJpbmRleCIsImNoaWxkcmVuTWFwIiwicmVmIiwib2Zmc2V0SGVpZ2h0Iiwib2Zmc2V0VG9wIiwiY3VyclN0eWxlIiwic3R5bGUiLCJ0b3AiLCJ5IiwiYm90dG9tIiwiY3Vyc29yIiwiY3Vyc29yT2Zmc2V0VG9wIiwiY3Vyc29yT2Zmc2V0SGVpZ2h0IiwiY3Vyc29yTWlkZGxlTGluZSIsIm9yaWdpbkluZGV4IiwibmV4dE5ld09yZGVyIiwiciIsInRoZW4iLCJzZXRNb3VzZVkiLCJtb3ZlaW5nIiwiRGF0ZSIsInByZVRpbWUiLCJyZU9yZGVyIiwiY2hhbmdlRG9uZSIsImNsZWFyTW90aW9ucyIsIm9yZGVyIiwidW5kZWZpbmVkIiwiZGVsYXkiLCJuZXh0UmVuZGVyQ2xlYXJNb3Rpb25zIiwiY29udGFpbmVyIiwiY2hpbGRyZW4iLCJNb3Rpb25zIiwibmV3Q2hpbGRyZW4iLCJjb21wb25lbnREaWRNb3VudCIsImZvckVhY2giLCJkb20iLCJvblNjcm9sbCIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJuZXh0Q29udGV4dCIsImxhc3RBY3Rpb25Nb3ZlSUQiLCJsYXN0TW92ZUlEIiwibGVuZ3RoIiwiY29tcG9uZW50RGlkVXBkYXRlIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwic25hcHNob3QiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbmRlciIsInByZXNzZWRNb3Rpb25zIiwibm90UHJlc3NlZE1vdGlvbnMiLCJjcmVhdGVTdHlsZSIsImdldENvbnRhaW5lciIsIm1hcCIsIm5ld0luZGV4Iiwibm93WSIsInN0YXJ0SW5kZXgiLCJlbmRJbmRleCIsImkiLCJzdHlsZXMiLCJoYW5kbGVNb3VzZURvd24iLCJoYW5kbGVUb3VjaFN0YXJ0IiwiekluZGV4IiwicG9zaXRpb24iLCJkZWZhdWx0UHJvcHMiLCJzY2FsZSIsInNoYWRvdyIsImJveFNoYWRvdyIsInRyYW5zZm9ybSIsIldlYmtpdFRyYW5zZm9ybSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsU0FBU0MsTUFBVCxFQUFpQkMsTUFBakIsUUFBK0IsY0FBL0I7QUFDQSxPQUFPQyxPQUFQLE1BQW9CLFVBQXBCO0FBQ0EsU0FBU0MsTUFBVCxFQUFpQkMsS0FBakIsRUFBd0JDLE9BQXhCLFFBQXVDLFFBQXZD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QyxFQUFBQSxZQUFZLEVBQUUsT0FBTztBQUNuQnlDLElBQUFBLEtBQUssRUFBRSxDQURZO0FBRW5CQyxJQUFBQSxNQUFNLEVBQUU7QUFGVyxHQUFQLENBRkk7QUFNbEJqQixFQUFBQSxjQUFjLEVBQUUsT0FBTztBQUNyQmdCLElBQUFBLEtBQUssRUFBRTlILE1BQU0sQ0FBQyxHQUFELEVBQU1xQixZQUFOLENBRFE7QUFFckIwRyxJQUFBQSxNQUFNLEVBQUUvSCxNQUFNLENBQUMsRUFBRCxFQUFLcUIsWUFBTCxDQUZPLENBR3JCOztBQUhxQixHQUFQLENBTkU7QUFXbEIwRixFQUFBQSxpQkFBaUIsRUFBRSxPQUFPO0FBQ3hCZSxJQUFBQSxLQUFLLEVBQUU5SCxNQUFNLENBQUMsQ0FBRCxFQUFJcUIsWUFBSixDQURXO0FBRXhCMEcsSUFBQUEsTUFBTSxFQUFFL0gsTUFBTSxDQUFDLENBQUQsRUFBSXFCLFlBQUo7QUFGVSxHQUFQLENBWEQ7QUFlbEIyRixFQUFBQSxXQUFXLEVBQUU7QUFBQSxvRkFRVCxFQVJTO0FBQUEsNkJBQ1hRLE1BRFc7QUFBQSxRQUVUTSxLQUZTLGdCQUVUQSxLQUZTO0FBQUEsUUFHVEMsTUFIUyxnQkFHVEEsTUFIUztBQUFBLFFBSVQxRCxDQUpTLGdCQUlUQSxDQUpTOztBQUFBLFdBUUQ7QUFDVjJELE1BQUFBLFNBQVMsRUFBRywwQkFBeUJELE1BQU8sTUFBSyxJQUFJQSxNQUFPLFFBRGxEO0FBRVZFLE1BQUFBLFNBQVMsRUFBRyxrQkFBaUI1RCxDQUFFLGdCQUFleUQsS0FBTSxHQUYxQztBQUdWSSxNQUFBQSxlQUFlLEVBQUcsa0JBQWlCN0QsQ0FBRSxnQkFBZXlELEtBQU07QUFIaEQsS0FSQztBQUFBO0FBZkssQ0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTW90aW9uLCBzcHJpbmcgfSBmcm9tICdyZWFjdC1tb3Rpb24nO1xuaW1wb3J0IHJhZlNjaGQgZnJvbSAncmFmLXNjaGQnO1xuaW1wb3J0IHsgcHJlZml4LCBzbGVlcCwgaXNFeGlzdCB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCB7IHNwcmluZyB9IGZyb20gJ3JlYWN0LW1vdGlvbic7XG5cblxuLy8gdG9kbyBhdXRvIHNjcm9sbFxuXG5mdW5jdGlvbiBmaW5kQWxsUGFyZW50Tm9kZShub2RlKSB7XG4gIGNvbnN0IGVscyA9IFt3aW5kb3ddO1xuICBsZXQgY3Vyck5vZGUgPSBub2RlO1xuICB3aGlsZSAoY3Vyck5vZGUpIHtcbiAgICBlbHMudW5zaGlmdChjdXJyTm9kZSk7XG4gICAgY3Vyck5vZGUgPSBjdXJyTm9kZS5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiBlbHM7XG59XG5cblxuZnVuY3Rpb24gcmVpbnNlcnQoYXJyLCBmcm9tLCB0bykge1xuICBjb25zdCBfYXJyID0gYXJyLnNsaWNlKDApO1xuICBjb25zdCB2YWwgPSBfYXJyW2Zyb21dO1xuICBfYXJyLnNwbGljZShmcm9tLCAxKTtcbiAgX2Fyci5zcGxpY2UodG8sIDAsIHZhbCk7XG4gIHJldHVybiBfYXJyO1xufVxuXG5jb25zdCBhbmltRHVyYXRpb24gPSAzMDA7XG5cbmNvbnN0IHNwcmluZ0NvbmZpZyA9IHsgc3RpZmZuZXNzOiAyMDAsIGRhbXBpbmc6IDIwIH07XG5cbmxldCBwcmVzc1RpbWVyO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYWcgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCB7IG9yZGVyLCBjaGlsZHJlbiB9ID0gcHJvcHM7XG5cbiAgICB0aGlzLk1vdGlvbnMgPSB7fTtcbiAgICB0aGlzLm5leHRSZW5kZXJDbGVhck1vdGlvbnMgPSBmYWxzZTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0b3BEZWx0YVk6IDAsXG4gICAgICBtb3VzZVk6IDAsXG4gICAgICBpc1ByZXNzZWQ6IGZhbHNlLFxuICAgICAgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkOiB1bmRlZmluZWQsXG4gICAgICBvcmRlcjogWy4uLm9yZGVyXSxcbiAgICAgIG5ld09yZGVyOiBbLi4ub3JkZXJdLFxuICAgICAgY2hpbGRyZW4sXG4gICAgICBuZXdDaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgfTtcblxuICAgIHRoaXMuaGFuZGxlTW91c2VNb3ZlID0gcmFmU2NoZCh0aGlzLmhhbmRsZU1vdXNlTW92ZSk7XG4gICAgdGhpcy5jaGlsZHJlbk1hcCA9IHt9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgW3RoaXMuY29udGFpbmVyLCAuLi5maW5kQWxsUGFyZW50Tm9kZSh0aGlzLmNvbnRhaW5lcildLmZvckVhY2goKGRvbSkgPT4ge1xuICAgICAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMub25TY3JvbGwpO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMsIG5leHRDb250ZXh0KSB7XG4gICAgY29uc3QgeyBvcmRlciwgbmV3T3JkZXIgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBsYXN0QWN0aW9uTW92ZUlELCBsYXN0TW92ZUlELCBjaGlsZHJlbiB9ID0gbmV4dFByb3BzO1xuXG4gICAgaWYgKFxuICAgICAgb3JkZXIubGVuZ3RoID09PSBuZXh0UHJvcHMub3JkZXIubGVuZ3RoXG4gICAgICAmJiBKU09OLnN0cmluZ2lmeShvcmRlcikgIT09IEpTT04uc3RyaW5naWZ5KG5leHRQcm9wcy5vcmRlcilcbiAgICAgICYmIGlzRXhpc3QobGFzdEFjdGlvbk1vdmVJRClcbiAgICAgICYmIGlzRXhpc3QobGFzdE1vdmVJRClcbiAgICApIHtcbiAgICAgIGF3YWl0IHRoaXMuY2xlYXJNb3Rpb25zKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgLy8gbmV3T3JkZXI6IFsuLi5uZXh0UHJvcHMub3JkZXJdLFxuICAgICAgICBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQ6IGxhc3RBY3Rpb25Nb3ZlSUQsXG4gICAgICAgIGlzUHJlc3NlZDogdHJ1ZSxcbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCB0aGlzLnNldE1vdXNlWShcbiAgICAgICAgdGhpcy5jaGlsZHJlbk1hcFtsYXN0TW92ZUlEXS5yZWYub2Zmc2V0VG9wXG4gICAgICAgIC0gdGhpcy5jaGlsZHJlbk1hcFtsYXN0QWN0aW9uTW92ZUlEXS5yZWYub2Zmc2V0VG9wLFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IG5ld09yZGVyOiBbLi4ubmV4dFByb3BzLm9yZGVyXSB9KTtcblxuICAgICAgYXdhaXQgc2xlZXAoYW5pbUR1cmF0aW9uKTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzUHJlc3NlZDogZmFsc2UgfSk7XG5cbiAgICAgIGF3YWl0IHNsZWVwKDIwMCk7XG5cbiAgICAgIGF3YWl0IHRoaXMuY2xlYXJNb3Rpb25zKCk7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBuZXdPcmRlcjogWy4uLm5leHRQcm9wcy5vcmRlcl0sXG4gICAgICAgIG9yZGVyOiBbLi4ubmV4dFByb3BzLm9yZGVyXSxcbiAgICAgICAgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkOiB1bmRlZmluZWQsXG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jbGVhck1vdGlvbnMoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBjaGlsZHJlbiwgbmV3T3JkZXI6IFsuLi5uZXh0UHJvcHMub3JkZXJdLCBvcmRlcjogWy4uLm5leHRQcm9wcy5vcmRlcl0gfSk7XG4gICAgfSk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUsIHNuYXBzaG90KSB7XG4gICAgdGhpcy5uZXh0UmVuZGVyQ2xlYXJNb3Rpb25zID0gZmFsc2U7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBbdGhpcy5jb250YWluZXIsIC4uLmZpbmRBbGxQYXJlbnROb2RlKHRoaXMuY29udGFpbmVyKV0uZm9yRWFjaCgoZG9tKSA9PiB7XG4gICAgICBkb20ucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbCk7XG4gICAgfSk7XG4gIH1cblxuICBvblNjcm9sbCA9ICgpID0+IHtcbiAgICBjbGVhclRpbWVvdXQocHJlc3NUaW1lcik7XG4gICAgaWYgKHRoaXMuc3RhdGUuaXNQcmVzc2VkKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNQcmVzc2VkOiBmYWxzZSB9KTtcbiAgICB9XG4gIH1cblxuICBhZGRMaXN0ZW5lciA9ICh7IG1vdmUgPSB0cnVlIH0gPSB7fSkgPT4ge1xuICAgIG1vdmUgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlVG91Y2hNb3ZlLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuaGFuZGxlTW91c2VVcCk7XG4gICAgbW92ZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVNb3VzZU1vdmUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVNb3VzZVVwKTtcbiAgfVxuXG4gIHJlbW92ZUxpc3RlbmVyID0gKCkgPT4ge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRvdWNoTW92ZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5oYW5kbGVNb3VzZVVwKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVNb3VzZU1vdmUpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVNb3VzZVVwKTtcbiAgfVxuXG4gIGhhbmRsZVN0YXJ0ID0gKGUsIGZ1bmMgPSAoKSA9PiB7fSkgPT4ge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoKTtcbiAgICB0aGlzLmFkZExpc3RlbmVyKHsgbW92ZTogZmFsc2UgfSk7XG5cbiAgICAvLyBjb25zdCBhID0gK25ldyBEYXRlKCk7XG4gICAgaWYgKCFwcmVzc1RpbWVyKSB7XG4gICAgICBwcmVzc1RpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBwcmVzc1RpbWVyID0gd2luZG93LmNsZWFyVGltZW91dChwcmVzc1RpbWVyKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coK25ldyBEYXRlKCkgLSBhKTtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKCk7XG4gICAgICAgIGZ1bmMoKTtcbiAgICAgIH0sIDcwMCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlVG91Y2hTdGFydCA9IChlLCBJRCwgcHJlc3NZKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZVRvdWNoU3RhcnQnKTtcbiAgICBlLnBlcnNpc3QoKTtcbiAgICAvLyBjb25zdCB7IHRvcCB9ID0gZS5jdXJyZW50VGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgdGhpcy5oYW5kbGVTdGFydChlLCAoKSA9PiB7XG4gICAgICBjb25zdCBldmVudCA9IGUudG91Y2hlc1swXTtcbiAgICAgIGNvbnN0IHsgcGFnZVkgfSA9IGV2ZW50O1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdG9wRGVsdGFZOiBwYWdlWSAtIHByZXNzWSxcbiAgICAgICAgbW91c2VZOiBwcmVzc1ksXG4gICAgICAgIGlzUHJlc3NlZDogdHJ1ZSxcbiAgICAgICAgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkOiBJRCxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZU1vdXNlRG93biA9IChlLCBJRCwgcHJlc3NZKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZU1vdXNlRG93bicpO1xuICAgIGNvbnN0IHsgcGFnZVkgfSA9IGU7XG5cbiAgICB0aGlzLmhhbmRsZVN0YXJ0KGUsICgpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHBhZ2VZLCBwcmVzc1kpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHRvcERlbHRhWTogcGFnZVkgLSBwcmVzc1ksXG4gICAgICAgIG1vdXNlWTogcHJlc3NZLFxuICAgICAgICBpc1ByZXNzZWQ6IHRydWUsXG4gICAgICAgIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZDogSUQsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVUb3VjaE1vdmUgPSAoZSkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdoYW5kbGVUb3VjaE1vdmUnKTtcbiAgICBjb25zdCB7IGlzUHJlc3NlZCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIC8vIHByZXNzVGltZXIgPSBjbGVhclRpbWVvdXQocHJlc3NUaW1lcik7XG5cbiAgICBpZiAoaXNQcmVzc2VkKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmhhbmRsZU1vdXNlTW92ZShlLnRvdWNoZXNbMF0pO1xuICAgIH1cbiAgfTtcblxuICByZU9yZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCwgbmV3T3JkZXIsXG4gICAgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCBjdXJySW5kZXggPSBuZXdPcmRlci5pbmRleE9mKG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCk7XG4gICAgY29uc3QgcmVhbFJvdyA9IG5ld09yZGVyLnJlZHVjZSgocm93LCBJRCkgPT4ge1xuICAgICAgaWYgKG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCA9PT0gSUQpIHtcbiAgICAgICAgcmV0dXJuIHJvdztcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5kZXggPSBuZXdPcmRlci5pbmRleE9mKElEKTtcbiAgICAgIGNvbnN0IHsgcmVmOiB7IG9mZnNldEhlaWdodCwgb2Zmc2V0VG9wIH0sIHN0eWxlOiBjdXJyU3R5bGUgfSA9IHRoaXMuY2hpbGRyZW5NYXBbSURdO1xuICAgICAgY29uc3QgdG9wID0gb2Zmc2V0VG9wICsgY3VyclN0eWxlLnk7XG4gICAgICBjb25zdCBib3R0b20gPSB0b3AgKyBvZmZzZXRIZWlnaHQ7XG5cbiAgICAgIC8vIGNvbnN0IHsgdG9wLCBib3R0b20gfSA9IHRoaXMuY2hpbGRyZW5NYXBbSURdLnJlZi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IHsgcmVmOiBjdXJzb3IsIHN0eWxlIH0gPSB0aGlzLmNoaWxkcmVuTWFwW29yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZF07XG4gICAgICBjb25zdCB7IG9mZnNldFRvcDogY3Vyc29yT2Zmc2V0VG9wLCBvZmZzZXRIZWlnaHQ6IGN1cnNvck9mZnNldEhlaWdodCB9ID0gY3Vyc29yO1xuXG4gICAgICBjb25zdCBjdXJzb3JNaWRkbGVMaW5lID0gY3Vyc29yT2Zmc2V0VG9wICsgc3R5bGUueSArIChjdXJzb3JPZmZzZXRIZWlnaHQgLyAyKTtcblxuICAgICAgLy8gY29uc29sZS5sb2coY3Vyc29yTWlkZGxlTGluZSwgdG9wICsgKG9mZnNldEhlaWdodCAvIDQpLCBib3R0b20gLSAob2Zmc2V0SGVpZ2h0IC8gNCksIElEKTtcbiAgICAgIGlmIChcbiAgICAgICAgY3Vyc29yTWlkZGxlTGluZSA+IHRvcCArIChvZmZzZXRIZWlnaHQgLyA0KVxuICAgICAgICAmJiBjdXJzb3JNaWRkbGVMaW5lIDwgYm90dG9tIC0gKG9mZnNldEhlaWdodCAvIDQpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJvdztcbiAgICB9LCBjdXJySW5kZXgpO1xuXG4gICAgY29uc3Qgb3JpZ2luSW5kZXggPSBuZXdPcmRlci5pbmRleE9mKG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCk7XG5cbiAgICBpZiAob3JpZ2luSW5kZXggIT09IHJlYWxSb3cpIHtcbiAgICAgIGNvbnN0IG5leHROZXdPcmRlciA9IHJlaW5zZXJ0KG5ld09yZGVyLCBvcmlnaW5JbmRleCwgcmVhbFJvdyk7XG4gICAgICByZXR1cm4gbmV4dE5ld09yZGVyO1xuICAgIH1cbiAgICByZXR1cm4gbmV3T3JkZXI7XG4gIH1cblxuICBzZXRNb3VzZVkgPSBtb3VzZVkgPT4gbmV3IFByb21pc2UoKHIpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgbW91c2VZIH0sICgpID0+IHtcbiAgICAgIHNsZWVwKDMwMCkudGhlbihyKTtcbiAgICB9KTtcbiAgfSlcblxuICBoYW5kbGVNb3VzZU1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZygnaGFuZGxlTW91c2VNb3ZlJyk7XG4gICAgY29uc3QgeyBwYWdlWSB9ID0gZXZlbnQ7XG5cbiAgICBjb25zdCB7XG4gICAgICBpc1ByZXNzZWQsIHRvcERlbHRhWSwgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkLCBuZXdPcmRlcixcbiAgICB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGNvbnN0IG1vdXNlWSA9IHBhZ2VZIC0gdG9wRGVsdGFZO1xuXG4gICAgdGhpcy5zZXRNb3VzZVkobW91c2VZKTtcblxuICAgIGlmIChpc1ByZXNzZWQgJiYgIXRoaXMubW92ZWluZykge1xuICAgICAgaWYgKCtuZXcgRGF0ZSgpIC0gdGhpcy5wcmVUaW1lIDwgYW5pbUR1cmF0aW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5leHROZXdPcmRlciA9IHRoaXMucmVPcmRlcigpO1xuXG4gICAgICBpZiAobmV3T3JkZXIgIT09IG5leHROZXdPcmRlcikge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbmV3T3JkZXI6IFsuLi5uZXh0TmV3T3JkZXJdIH0pO1xuXG4gICAgICAgIHRoaXMucHJlVGltZSA9ICtuZXcgRGF0ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyB9KTtcbiAgfTtcblxuICBjaGFuZ2VEb25lID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgY2hhbmdlRG9uZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIHRoaXMuY2xlYXJNb3Rpb25zKGFuaW1EdXJhdGlvbikudGhlbigoKSA9PiB7XG4gICAgICBjb25zdCB7IG5ld09yZGVyIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IG5ld09yZGVyOiBbLi4ubmV3T3JkZXJdLCBvcmRlcjogWy4uLm5ld09yZGVyXSB9KTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB0b3BEZWx0YVk6IDAsIG1vdXNlWTogMCwgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkOiB1bmRlZmluZWQgfSk7XG4gICAgICBjaGFuZ2VEb25lKG5ld09yZGVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZU1vdXNlVXAgPSAoZSkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdoYW5kbGVNb3VzZVVwJyk7XG4gICAgY29uc3QgeyBpc1ByZXNzZWQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBwcmVzc1RpbWVyID0gd2luZG93LmNsZWFyVGltZW91dChwcmVzc1RpbWVyKTtcbiAgICB0aGlzLnNldFN0YXRlKHsgaXNQcmVzc2VkOiBmYWxzZSB9KTtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKCk7XG5cbiAgICBpZiAoaXNQcmVzc2VkKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnb25Ecm9wJyk7XG4gICAgICB0aGlzLmNoYW5nZURvbmUoKTtcbiAgICB9XG4gIH07XG5cbiAgY2xlYXJNb3Rpb25zID1kZWxheSA9PiBuZXcgUHJvbWlzZSgocikgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5uZXh0UmVuZGVyQ2xlYXJNb3Rpb25zID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe30sIHIpO1xuICAgIH0sIGRlbGF5KTtcbiAgfSlcblxuICBnZXRDb250YWluZXIgPSAocmVmKSA9PiB7XG4gICAgdGhpcy5jb250YWluZXIgPSByZWY7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgbW91c2VZLCBpc1ByZXNzZWQsIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCwgbmV3T3JkZXIsIG9yZGVyID0gW10sIGNoaWxkcmVuLCBuZXdDaGlsZHJlbixcbiAgICB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGNvbnN0IHtcbiAgICAgIGNsZWFyTW90aW9ucywgcHJlc3NlZE1vdGlvbnMsIG5vdFByZXNzZWRNb3Rpb25zLCBjcmVhdGVTdHlsZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHsgbmV4dFJlbmRlckNsZWFyTW90aW9ucyB9ID0gdGhpcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17IGAke3ByZWZpeCgnZHJhZy1jb250YWluZXInKX0gJHtwcmVmaXgoJ21hcC1jb250YWluZXInKX1gIH0gcmVmPXsgdGhpcy5nZXRDb250YWluZXIgfT5cbiAgICAgICAge29yZGVyLm1hcCgoSUQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgbGV0IHkgPSAwO1xuICAgICAgICAgIGNvbnN0IG5ld0luZGV4ID0gbmV3T3JkZXIuaW5kZXhPZihJRCk7XG5cbiAgICAgICAgICBpZiAob3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkID09PSBJRCAmJiAhaXNQcmVzc2VkKSB7XG4gICAgICAgICAgLy8gaWYgKG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCA9PT0gSUQgKSB7XG4gICAgICAgICAgICBsZXQgbm93WSA9IDA7XG4gICAgICAgICAgICBjb25zdCB7IHN0YXJ0SW5kZXgsIGVuZEluZGV4IH0gPSBuZXdJbmRleCAtIGluZGV4ID4gMFxuICAgICAgICAgICAgICA/ICh7IHN0YXJ0SW5kZXg6IGluZGV4LCBlbmRJbmRleDogbmV3SW5kZXggfSlcbiAgICAgICAgICAgICAgOiAoeyBzdGFydEluZGV4OiBuZXdJbmRleCwgZW5kSW5kZXg6IGluZGV4IH0pO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGVuZEluZGV4OyBpKyspIHtcbiAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgIHJlZjogeyBvZmZzZXRIZWlnaHQgfSxcbiAgICAgICAgICAgICAgfSA9IHRoaXMuY2hpbGRyZW5NYXBbKG5ld0luZGV4IC0gaW5kZXggPiAwID8gbmV3T3JkZXIgOiBvcmRlcilbaV1dO1xuICAgICAgICAgICAgICBub3dZICs9IG9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHkgPSBuZXdJbmRleCAtIGluZGV4ID4gMCA/IG5vd1kgOiAtbm93WTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ICE9PSBuZXdJbmRleCkge1xuICAgICAgICAgICAgeSA9IChuZXdJbmRleCAtIGluZGV4ID4gMCA/IDEgOiAtMSlcbiAgICAgICAgICAgICAgICAqIHRoaXMuY2hpbGRyZW5NYXBbb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkXS5yZWYub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHN0eWxlID0gbmV4dFJlbmRlckNsZWFyTW90aW9uc1xuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgIC4uLmNsZWFyTW90aW9ucygpLFxuICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQgPT09IElEICYmIGlzUHJlc3NlZFxuICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAuLi5wcmVzc2VkTW90aW9ucygpLFxuICAgICAgICAgICAgICAgIHk6IHNwcmluZyhtb3VzZVksIHsgc3RpZmZuZXNzOiA1MDAsIGRhbXBpbmc6IDUwIH0pLFxuICAgICAgICAgICAgICAvLyB5OiBtb3VzZVksXG4gICAgICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICAgICAgLi4ubm90UHJlc3NlZE1vdGlvbnMoKSxcbiAgICAgICAgICAgICAgICB5OiBzcHJpbmcoeSwgc3ByaW5nQ29uZmlnKSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE1vdGlvbiBzdHlsZT17IHN0eWxlIH0ga2V5PXsgSUQgfSByZWY9eyByZWYgPT4gdGhpcy5Nb3Rpb25zW0lEXSA9IHJlZiB9PlxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhJRCwgJyAnLCB5KTtcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUudHJhY2UoSUQsICcgJywgeSk7XG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2NhbGUnLCAnICcsIHNjYWxlKTtcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzaGFkb3cnLCAnICcsIHNoYWRvdyk7XG4gICAgICAgICAgICAgICAoc3R5bGVzKSA9PiB7XG4gICAgICAgICAgICAgICAgIGlmICghdGhpcy5jaGlsZHJlbk1hcFtJRF0pIHRoaXMuY2hpbGRyZW5NYXBbSURdID0ge307XG4gICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5NYXBbSURdLnN0eWxlID0geyB5OiBzdHlsZXMueSB9O1xuXG4gICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZURvd249eyAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3VzZURvd24oZXZlbnQsIElELCB5KTtcbiAgICAgICAgICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPXsgKHJlZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuTWFwW0lEXS5yZWYgPSByZWY7XG4gICAgICAgICAgICAgICAgICAgICB9IH1cbiAgICAgICAgICAgICAgICAgICAgIG9uVG91Y2hTdGFydD17IGV2ZW50ID0+IHRoaXMuaGFuZGxlVG91Y2hTdGFydChldmVudCwgSUQsIHkpIH1cbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IGAke3ByZWZpeCgnZ3JvdXAtaXRlbS13cmFwJyl9ICR7b3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkID09PSBJRCAmJiBpc1ByZXNzZWQgPyBwcmVmaXgoJ2dyb3VwLWl0ZW0td3JhcC1wcmVzc2VkJykgOiAnJ31gIH1cbiAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXsge1xuICAgICAgICAgICAgICAgICAgICAgICAuLi5jcmVhdGVTdHlsZSh7IHN0eWxlcywgSUQsIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiBJRCA9PT0gb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkID8gOTkgOiBJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IElEID09PSBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQgPyAncmVsYXRpdmUnIDogJ3Vuc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgIH0gfT5cbiAgICAgICAgICAgICAgICAgICAgIHsgY2hpbGRyZW5bSURdIH1cbiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9Nb3Rpb24+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkRyYWcuZGVmYXVsdFByb3BzID0ge1xuICBjaGFuZ2VEb25lOiAoKSA9PiB7fSxcbiAgY2xlYXJNb3Rpb25zOiAoKSA9PiAoe1xuICAgIHNjYWxlOiAxLFxuICAgIHNoYWRvdzogMCxcbiAgfSksXG4gIHByZXNzZWRNb3Rpb25zOiAoKSA9PiAoe1xuICAgIHNjYWxlOiBzcHJpbmcoMC42LCBzcHJpbmdDb25maWcpLFxuICAgIHNoYWRvdzogc3ByaW5nKDE2LCBzcHJpbmdDb25maWcpLFxuICAgIC8vIHk6IG1vdXNlWSxcbiAgfSksXG4gIG5vdFByZXNzZWRNb3Rpb25zOiAoKSA9PiAoe1xuICAgIHNjYWxlOiBzcHJpbmcoMSwgc3ByaW5nQ29uZmlnKSxcbiAgICBzaGFkb3c6IHNwcmluZygwLCBzcHJpbmdDb25maWcpLFxuICB9KSxcbiAgY3JlYXRlU3R5bGU6ICh7XG4gICAgc3R5bGVzOiB7XG4gICAgICBzY2FsZSxcbiAgICAgIHNoYWRvdyxcbiAgICAgIHksXG4gICAgfSxcbiAgICAvLyBJRCxcbiAgICAvLyBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQsXG4gIH0gPSB7fSkgPT4gKHtcbiAgICBib3hTaGFkb3c6IGByZ2JhKDAsIDAsIDAsIDAuMikgMHB4ICR7c2hhZG93fXB4ICR7MiAqIHNoYWRvd31weCAwcHhgLFxuICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKDAsICR7eX1weCwgMCkgc2NhbGUoJHtzY2FsZX0pYCxcbiAgICBXZWJraXRUcmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgwLCAke3l9cHgsIDApIHNjYWxlKCR7c2NhbGV9KWAsXG4gIH0pLFxufTtcbiJdfQ==