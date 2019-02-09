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
    debugger;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EcmFnLmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIk1vdGlvbiIsInNwcmluZyIsInJhZlNjaGQiLCJwcmVmaXgiLCJzbGVlcCIsImlzRXhpc3QiLCJmaW5kQWxsUGFyZW50Tm9kZSIsIm5vZGUiLCJlbHMiLCJ3aW5kb3ciLCJjdXJyTm9kZSIsInVuc2hpZnQiLCJwYXJlbnROb2RlIiwicmVpbnNlcnQiLCJhcnIiLCJmcm9tIiwidG8iLCJfYXJyIiwic2xpY2UiLCJ2YWwiLCJzcGxpY2UiLCJhbmltRHVyYXRpb24iLCJzcHJpbmdDb25maWciLCJzdGlmZm5lc3MiLCJkYW1waW5nIiwicHJlc3NUaW1lciIsIkRyYWciLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiY2xlYXJUaW1lb3V0Iiwic3RhdGUiLCJpc1ByZXNzZWQiLCJzZXRTdGF0ZSIsIm1vdmUiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlVG91Y2hNb3ZlIiwicGFzc2l2ZSIsImhhbmRsZU1vdXNlVXAiLCJoYW5kbGVNb3VzZU1vdmUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZSIsImZ1bmMiLCJyZW1vdmVMaXN0ZW5lciIsImFkZExpc3RlbmVyIiwic2V0VGltZW91dCIsIklEIiwicHJlc3NZIiwicGVyc2lzdCIsImhhbmRsZVN0YXJ0IiwiZXZlbnQiLCJ0b3VjaGVzIiwicGFnZVkiLCJ0b3BEZWx0YVkiLCJtb3VzZVkiLCJvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQiLCJwcmV2ZW50RGVmYXVsdCIsIm5ld09yZGVyIiwiY3VyckluZGV4IiwiaW5kZXhPZiIsInJlYWxSb3ciLCJyZWR1Y2UiLCJyb3ciLCJpbmRleCIsImNoaWxkcmVuTWFwIiwicmVmIiwib2Zmc2V0SGVpZ2h0Iiwib2Zmc2V0VG9wIiwiY3VyclN0eWxlIiwic3R5bGUiLCJ0b3AiLCJ5IiwiYm90dG9tIiwiY3Vyc29yIiwiY3Vyc29yT2Zmc2V0VG9wIiwiY3Vyc29yT2Zmc2V0SGVpZ2h0IiwiY3Vyc29yTWlkZGxlTGluZSIsIm9yaWdpbkluZGV4IiwibmV4dE5ld09yZGVyIiwiciIsInRoZW4iLCJzZXRNb3VzZVkiLCJtb3ZlaW5nIiwiRGF0ZSIsInByZVRpbWUiLCJyZU9yZGVyIiwiY2hhbmdlRG9uZSIsImNsZWFyTW90aW9ucyIsIm9yZGVyIiwidW5kZWZpbmVkIiwiZGVsYXkiLCJuZXh0UmVuZGVyQ2xlYXJNb3Rpb25zIiwiY29udGFpbmVyIiwiY2hpbGRyZW4iLCJNb3Rpb25zIiwibmV3Q2hpbGRyZW4iLCJjb21wb25lbnREaWRNb3VudCIsImZvckVhY2giLCJkb20iLCJvblNjcm9sbCIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJuZXh0Q29udGV4dCIsImxhc3RBY3Rpb25Nb3ZlSUQiLCJsYXN0TW92ZUlEIiwibGVuZ3RoIiwiY29tcG9uZW50RGlkVXBkYXRlIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwic25hcHNob3QiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbmRlciIsInByZXNzZWRNb3Rpb25zIiwibm90UHJlc3NlZE1vdGlvbnMiLCJjcmVhdGVTdHlsZSIsImdldENvbnRhaW5lciIsIm1hcCIsIm5ld0luZGV4Iiwibm93WSIsInN0YXJ0SW5kZXgiLCJlbmRJbmRleCIsImkiLCJzdHlsZXMiLCJoYW5kbGVNb3VzZURvd24iLCJoYW5kbGVUb3VjaFN0YXJ0IiwiekluZGV4IiwicG9zaXRpb24iLCJkZWZhdWx0UHJvcHMiLCJzY2FsZSIsInNoYWRvdyIsImJveFNoYWRvdyIsInRyYW5zZm9ybSIsIldlYmtpdFRyYW5zZm9ybSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsU0FBU0MsTUFBVCxFQUFpQkMsTUFBakIsUUFBK0IsY0FBL0I7QUFDQSxPQUFPQyxPQUFQLE1BQW9CLFVBQXBCO0FBQ0EsU0FBU0MsTUFBVCxFQUFpQkMsS0FBakIsRUFBd0JDLE9BQXhCLFFBQXVDLFFBQXZD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QUFFbEJDLEVBQUFBLFlBQVksRUFBRSxPQUFPO0FBQ25CeUMsSUFBQUEsS0FBSyxFQUFFLENBRFk7QUFFbkJDLElBQUFBLE1BQU0sRUFBRTtBQUZXLEdBQVAsQ0FGSTtBQU1sQmpCLEVBQUFBLGNBQWMsRUFBRSxPQUFPO0FBQ3JCZ0IsSUFBQUEsS0FBSyxFQUFFOUgsTUFBTSxDQUFDLEdBQUQsRUFBTXFCLFlBQU4sQ0FEUTtBQUVyQjBHLElBQUFBLE1BQU0sRUFBRS9ILE1BQU0sQ0FBQyxFQUFELEVBQUtxQixZQUFMLENBRk8sQ0FHckI7O0FBSHFCLEdBQVAsQ0FORTtBQVdsQjBGLEVBQUFBLGlCQUFpQixFQUFFLE9BQU87QUFDeEJlLElBQUFBLEtBQUssRUFBRTlILE1BQU0sQ0FBQyxDQUFELEVBQUlxQixZQUFKLENBRFc7QUFFeEIwRyxJQUFBQSxNQUFNLEVBQUUvSCxNQUFNLENBQUMsQ0FBRCxFQUFJcUIsWUFBSjtBQUZVLEdBQVAsQ0FYRDtBQWVsQjJGLEVBQUFBLFdBQVcsRUFBRTtBQUFBLG9GQVFULEVBUlM7QUFBQSw2QkFDWFEsTUFEVztBQUFBLFFBRVRNLEtBRlMsZ0JBRVRBLEtBRlM7QUFBQSxRQUdUQyxNQUhTLGdCQUdUQSxNQUhTO0FBQUEsUUFJVDFELENBSlMsZ0JBSVRBLENBSlM7O0FBQUEsV0FRRDtBQUNWMkQsTUFBQUEsU0FBUyxFQUFHLDBCQUF5QkQsTUFBTyxNQUFLLElBQUlBLE1BQU8sUUFEbEQ7QUFFVkUsTUFBQUEsU0FBUyxFQUFHLGtCQUFpQjVELENBQUUsZ0JBQWV5RCxLQUFNLEdBRjFDO0FBR1ZJLE1BQUFBLGVBQWUsRUFBRyxrQkFBaUI3RCxDQUFFLGdCQUFleUQsS0FBTTtBQUhoRCxLQVJDO0FBQUE7QUFmSyxDQUFwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBNb3Rpb24sIHNwcmluZyB9IGZyb20gJ3JlYWN0LW1vdGlvbic7XG5pbXBvcnQgcmFmU2NoZCBmcm9tICdyYWYtc2NoZCc7XG5pbXBvcnQgeyBwcmVmaXgsIHNsZWVwLCBpc0V4aXN0IH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IHsgc3ByaW5nIH0gZnJvbSAncmVhY3QtbW90aW9uJztcblxuXG4vLyB0b2RvIGF1dG8gc2Nyb2xsXG5cbmZ1bmN0aW9uIGZpbmRBbGxQYXJlbnROb2RlKG5vZGUpIHtcbiAgY29uc3QgZWxzID0gW3dpbmRvd107XG4gIGxldCBjdXJyTm9kZSA9IG5vZGU7XG4gIHdoaWxlIChjdXJyTm9kZSkge1xuICAgIGVscy51bnNoaWZ0KGN1cnJOb2RlKTtcbiAgICBjdXJyTm9kZSA9IGN1cnJOb2RlLnBhcmVudE5vZGU7XG4gIH1cbiAgcmV0dXJuIGVscztcbn1cblxuXG5mdW5jdGlvbiByZWluc2VydChhcnIsIGZyb20sIHRvKSB7XG4gIGNvbnN0IF9hcnIgPSBhcnIuc2xpY2UoMCk7XG4gIGNvbnN0IHZhbCA9IF9hcnJbZnJvbV07XG4gIF9hcnIuc3BsaWNlKGZyb20sIDEpO1xuICBfYXJyLnNwbGljZSh0bywgMCwgdmFsKTtcbiAgcmV0dXJuIF9hcnI7XG59XG5cbmNvbnN0IGFuaW1EdXJhdGlvbiA9IDMwMDtcblxuY29uc3Qgc3ByaW5nQ29uZmlnID0geyBzdGlmZm5lc3M6IDIwMCwgZGFtcGluZzogMjAgfTtcblxubGV0IHByZXNzVGltZXI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhZyBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIGNvbnN0IHsgb3JkZXIsIGNoaWxkcmVuIH0gPSBwcm9wcztcblxuICAgIHRoaXMuTW90aW9ucyA9IHt9O1xuICAgIHRoaXMubmV4dFJlbmRlckNsZWFyTW90aW9ucyA9IGZhbHNlO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHRvcERlbHRhWTogMCxcbiAgICAgIG1vdXNlWTogMCxcbiAgICAgIGlzUHJlc3NlZDogZmFsc2UsXG4gICAgICBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQ6IHVuZGVmaW5lZCxcbiAgICAgIG9yZGVyOiBbLi4ub3JkZXJdLFxuICAgICAgbmV3T3JkZXI6IFsuLi5vcmRlcl0sXG4gICAgICBjaGlsZHJlbixcbiAgICAgIG5ld0NoaWxkcmVuOiBjaGlsZHJlbixcbiAgICB9O1xuXG4gICAgdGhpcy5oYW5kbGVNb3VzZU1vdmUgPSByYWZTY2hkKHRoaXMuaGFuZGxlTW91c2VNb3ZlKTtcbiAgICB0aGlzLmNoaWxkcmVuTWFwID0ge307XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBbdGhpcy5jb250YWluZXIsIC4uLmZpbmRBbGxQYXJlbnROb2RlKHRoaXMuY29udGFpbmVyKV0uZm9yRWFjaCgoZG9tKSA9PiB7XG4gICAgICBkb20uYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcywgbmV4dENvbnRleHQpIHtcbiAgICBjb25zdCB7IG9yZGVyLCBuZXdPcmRlciB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IGxhc3RBY3Rpb25Nb3ZlSUQsIGxhc3RNb3ZlSUQsIGNoaWxkcmVuIH0gPSBuZXh0UHJvcHM7XG5cbiAgICBpZiAoXG4gICAgICBvcmRlci5sZW5ndGggPT09IG5leHRQcm9wcy5vcmRlci5sZW5ndGhcbiAgICAgICYmIEpTT04uc3RyaW5naWZ5KG9yZGVyKSAhPT0gSlNPTi5zdHJpbmdpZnkobmV4dFByb3BzLm9yZGVyKVxuICAgICAgJiYgaXNFeGlzdChsYXN0QWN0aW9uTW92ZUlEKVxuICAgICAgJiYgaXNFeGlzdChsYXN0TW92ZUlEKVxuICAgICkge1xuICAgICAgYXdhaXQgdGhpcy5jbGVhck1vdGlvbnMoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAvLyBuZXdPcmRlcjogWy4uLm5leHRQcm9wcy5vcmRlcl0sXG4gICAgICAgIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZDogbGFzdEFjdGlvbk1vdmVJRCxcbiAgICAgICAgaXNQcmVzc2VkOiB0cnVlLFxuICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IHRoaXMuc2V0TW91c2VZKFxuICAgICAgICB0aGlzLmNoaWxkcmVuTWFwW2xhc3RNb3ZlSURdLnJlZi5vZmZzZXRUb3BcbiAgICAgICAgLSB0aGlzLmNoaWxkcmVuTWFwW2xhc3RBY3Rpb25Nb3ZlSURdLnJlZi5vZmZzZXRUb3AsXG4gICAgICApO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHsgbmV3T3JkZXI6IFsuLi5uZXh0UHJvcHMub3JkZXJdIH0pO1xuXG4gICAgICBhd2FpdCBzbGVlcChhbmltRHVyYXRpb24pO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNQcmVzc2VkOiBmYWxzZSB9KTtcblxuICAgICAgYXdhaXQgc2xlZXAoMjAwKTtcblxuICAgICAgYXdhaXQgdGhpcy5jbGVhck1vdGlvbnMoKTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG5ld09yZGVyOiBbLi4ubmV4dFByb3BzLm9yZGVyXSxcbiAgICAgICAgb3JkZXI6IFsuLi5uZXh0UHJvcHMub3JkZXJdLFxuICAgICAgICBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgY2hpbGRyZW4sXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNsZWFyTW90aW9ucygpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNoaWxkcmVuLCBuZXdPcmRlcjogWy4uLm5leHRQcm9wcy5vcmRlcl0sIG9yZGVyOiBbLi4ubmV4dFByb3BzLm9yZGVyXSB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSwgc25hcHNob3QpIHtcbiAgICB0aGlzLm5leHRSZW5kZXJDbGVhck1vdGlvbnMgPSBmYWxzZTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIFt0aGlzLmNvbnRhaW5lciwgLi4uZmluZEFsbFBhcmVudE5vZGUodGhpcy5jb250YWluZXIpXS5mb3JFYWNoKChkb20pID0+IHtcbiAgICAgIGRvbS5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uU2Nyb2xsID0gKCkgPT4ge1xuICAgIGNsZWFyVGltZW91dChwcmVzc1RpbWVyKTtcbiAgICBpZiAodGhpcy5zdGF0ZS5pc1ByZXNzZWQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1ByZXNzZWQ6IGZhbHNlIH0pO1xuICAgIH1cbiAgfVxuXG4gIGFkZExpc3RlbmVyID0gKHsgbW92ZSA9IHRydWUgfSA9IHt9KSA9PiB7XG4gICAgbW92ZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUsIHsgcGFzc2l2ZTogZmFsc2UgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5oYW5kbGVNb3VzZVVwKTtcbiAgICBtb3ZlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZU1vdXNlTW92ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXApO1xuICB9XG5cbiAgcmVtb3ZlTGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlVG91Y2hNb3ZlKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmhhbmRsZU1vdXNlVXApO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZU1vdXNlTW92ZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXApO1xuICB9XG5cbiAgaGFuZGxlU3RhcnQgPSAoZSwgZnVuYyA9ICgpID0+IHt9KSA9PiB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcigpO1xuICAgIHRoaXMuYWRkTGlzdGVuZXIoeyBtb3ZlOiBmYWxzZSB9KTtcblxuICAgIC8vIGNvbnN0IGEgPSArbmV3IERhdGUoKTtcbiAgICBpZiAoIXByZXNzVGltZXIpIHtcbiAgICAgIHByZXNzVGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHByZXNzVGltZXIgPSB3aW5kb3cuY2xlYXJUaW1lb3V0KHByZXNzVGltZXIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygrbmV3IERhdGUoKSAtIGEpO1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIoKTtcbiAgICAgICAgZnVuYygpO1xuICAgICAgfSwgNzAwKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVUb3VjaFN0YXJ0ID0gKGUsIElELCBwcmVzc1kpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZygnaGFuZGxlVG91Y2hTdGFydCcpO1xuICAgIGUucGVyc2lzdCgpO1xuICAgIC8vIGNvbnN0IHsgdG9wIH0gPSBlLmN1cnJlbnRUYXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICB0aGlzLmhhbmRsZVN0YXJ0KGUsICgpID0+IHtcbiAgICAgIGNvbnN0IGV2ZW50ID0gZS50b3VjaGVzWzBdO1xuICAgICAgY29uc3QgeyBwYWdlWSB9ID0gZXZlbnQ7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB0b3BEZWx0YVk6IHBhZ2VZIC0gcHJlc3NZLFxuICAgICAgICBtb3VzZVk6IHByZXNzWSxcbiAgICAgICAgaXNQcmVzc2VkOiB0cnVlLFxuICAgICAgICBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQ6IElELFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlTW91c2VEb3duID0gKGUsIElELCBwcmVzc1kpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZygnaGFuZGxlTW91c2VEb3duJyk7XG4gICAgY29uc3QgeyBwYWdlWSB9ID0gZTtcblxuICAgIHRoaXMuaGFuZGxlU3RhcnQoZSwgKCkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2cocGFnZVksIHByZXNzWSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdG9wRGVsdGFZOiBwYWdlWSAtIHByZXNzWSxcbiAgICAgICAgbW91c2VZOiBwcmVzc1ksXG4gICAgICAgIGlzUHJlc3NlZDogdHJ1ZSxcbiAgICAgICAgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkOiBJRCxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZVRvdWNoTW92ZSA9IChlKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZVRvdWNoTW92ZScpO1xuICAgIGNvbnN0IHsgaXNQcmVzc2VkIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgLy8gcHJlc3NUaW1lciA9IGNsZWFyVGltZW91dChwcmVzc1RpbWVyKTtcblxuICAgIGlmIChpc1ByZXNzZWQpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuaGFuZGxlTW91c2VNb3ZlKGUudG91Y2hlc1swXSk7XG4gICAgfVxuICB9O1xuXG4gIHJlT3JkZXIgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkLCBuZXdPcmRlcixcbiAgICB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGNvbnN0IGN1cnJJbmRleCA9IG5ld09yZGVyLmluZGV4T2Yob3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkKTtcbiAgICBjb25zdCByZWFsUm93ID0gbmV3T3JkZXIucmVkdWNlKChyb3csIElEKSA9PiB7XG4gICAgICBpZiAob3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkID09PSBJRCkge1xuICAgICAgICByZXR1cm4gcm93O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpbmRleCA9IG5ld09yZGVyLmluZGV4T2YoSUQpO1xuICAgICAgY29uc3QgeyByZWY6IHsgb2Zmc2V0SGVpZ2h0LCBvZmZzZXRUb3AgfSwgc3R5bGU6IGN1cnJTdHlsZSB9ID0gdGhpcy5jaGlsZHJlbk1hcFtJRF07XG4gICAgICBjb25zdCB0b3AgPSBvZmZzZXRUb3AgKyBjdXJyU3R5bGUueTtcbiAgICAgIGNvbnN0IGJvdHRvbSA9IHRvcCArIG9mZnNldEhlaWdodDtcblxuICAgICAgLy8gY29uc3QgeyB0b3AsIGJvdHRvbSB9ID0gdGhpcy5jaGlsZHJlbk1hcFtJRF0ucmVmLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgeyByZWY6IGN1cnNvciwgc3R5bGUgfSA9IHRoaXMuY2hpbGRyZW5NYXBbb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkXTtcbiAgICAgIGNvbnN0IHsgb2Zmc2V0VG9wOiBjdXJzb3JPZmZzZXRUb3AsIG9mZnNldEhlaWdodDogY3Vyc29yT2Zmc2V0SGVpZ2h0IH0gPSBjdXJzb3I7XG5cbiAgICAgIGNvbnN0IGN1cnNvck1pZGRsZUxpbmUgPSBjdXJzb3JPZmZzZXRUb3AgKyBzdHlsZS55ICsgKGN1cnNvck9mZnNldEhlaWdodCAvIDIpO1xuXG4gICAgICAvLyBjb25zb2xlLmxvZyhjdXJzb3JNaWRkbGVMaW5lLCB0b3AgKyAob2Zmc2V0SGVpZ2h0IC8gNCksIGJvdHRvbSAtIChvZmZzZXRIZWlnaHQgLyA0KSwgSUQpO1xuICAgICAgaWYgKFxuICAgICAgICBjdXJzb3JNaWRkbGVMaW5lID4gdG9wICsgKG9mZnNldEhlaWdodCAvIDQpXG4gICAgICAgICYmIGN1cnNvck1pZGRsZUxpbmUgPCBib3R0b20gLSAob2Zmc2V0SGVpZ2h0IC8gNClcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICB9XG4gICAgICByZXR1cm4gcm93O1xuICAgIH0sIGN1cnJJbmRleCk7XG5cbiAgICBjb25zdCBvcmlnaW5JbmRleCA9IG5ld09yZGVyLmluZGV4T2Yob3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkKTtcblxuICAgIGlmIChvcmlnaW5JbmRleCAhPT0gcmVhbFJvdykge1xuICAgICAgY29uc3QgbmV4dE5ld09yZGVyID0gcmVpbnNlcnQobmV3T3JkZXIsIG9yaWdpbkluZGV4LCByZWFsUm93KTtcbiAgICAgIHJldHVybiBuZXh0TmV3T3JkZXI7XG4gICAgfVxuICAgIHJldHVybiBuZXdPcmRlcjtcbiAgfVxuXG4gIHNldE1vdXNlWSA9IG1vdXNlWSA9PiBuZXcgUHJvbWlzZSgocikgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBtb3VzZVkgfSwgKCkgPT4ge1xuICAgICAgc2xlZXAoMzAwKS50aGVuKHIpO1xuICAgIH0pO1xuICB9KVxuXG4gIGhhbmRsZU1vdXNlTW92ZSA9IChldmVudCkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdoYW5kbGVNb3VzZU1vdmUnKTtcbiAgICBjb25zdCB7IHBhZ2VZIH0gPSBldmVudDtcblxuICAgIGNvbnN0IHtcbiAgICAgIGlzUHJlc3NlZCwgdG9wRGVsdGFZLCBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQsIG5ld09yZGVyLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3QgbW91c2VZID0gcGFnZVkgLSB0b3BEZWx0YVk7XG5cbiAgICB0aGlzLnNldE1vdXNlWShtb3VzZVkpO1xuXG4gICAgaWYgKGlzUHJlc3NlZCAmJiAhdGhpcy5tb3ZlaW5nKSB7XG4gICAgICBpZiAoK25ldyBEYXRlKCkgLSB0aGlzLnByZVRpbWUgPCBhbmltRHVyYXRpb24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgbmV4dE5ld09yZGVyID0gdGhpcy5yZU9yZGVyKCk7XG5cbiAgICAgIGlmIChuZXdPcmRlciAhPT0gbmV4dE5ld09yZGVyKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBuZXdPcmRlcjogWy4uLm5leHROZXdPcmRlcl0gfSk7XG5cbiAgICAgICAgdGhpcy5wcmVUaW1lID0gK25ldyBEYXRlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIH0pO1xuICB9O1xuXG4gIGNoYW5nZURvbmUgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBjaGFuZ2VEb25lIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgdGhpcy5jbGVhck1vdGlvbnMoYW5pbUR1cmF0aW9uKS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IHsgbmV3T3JkZXIgfSA9IHRoaXMuc3RhdGU7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgbmV3T3JkZXI6IFsuLi5uZXdPcmRlcl0sIG9yZGVyOiBbLi4ubmV3T3JkZXJdIH0pO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHRvcERlbHRhWTogMCwgbW91c2VZOiAwLCBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQ6IHVuZGVmaW5lZCB9KTtcbiAgICAgIGNoYW5nZURvbmUobmV3T3JkZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlTW91c2VVcCA9IChlKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZU1vdXNlVXAnKTtcbiAgICBjb25zdCB7IGlzUHJlc3NlZCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHByZXNzVGltZXIgPSB3aW5kb3cuY2xlYXJUaW1lb3V0KHByZXNzVGltZXIpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc1ByZXNzZWQ6IGZhbHNlIH0pO1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoKTtcblxuICAgIGlmIChpc1ByZXNzZWQpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdvbkRyb3AnKTtcbiAgICAgIHRoaXMuY2hhbmdlRG9uZSgpO1xuICAgIH1cbiAgfTtcblxuICBjbGVhck1vdGlvbnMgPWRlbGF5ID0+IG5ldyBQcm9taXNlKChyKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLm5leHRSZW5kZXJDbGVhck1vdGlvbnMgPSB0cnVlO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7fSwgcik7XG4gICAgfSwgZGVsYXkpO1xuICB9KVxuXG4gIGdldENvbnRhaW5lciA9IChyZWYpID0+IHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IHJlZjtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBtb3VzZVksIGlzUHJlc3NlZCwgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkLCBuZXdPcmRlciwgb3JkZXIgPSBbXSwgY2hpbGRyZW4sIG5ld0NoaWxkcmVuLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3Qge1xuICAgICAgY2xlYXJNb3Rpb25zLCBwcmVzc2VkTW90aW9ucywgbm90UHJlc3NlZE1vdGlvbnMsIGNyZWF0ZVN0eWxlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIFxuICAgIGRlYnVnZ2VyXG4gICAgXG4gICAgY29uc3QgeyBuZXh0UmVuZGVyQ2xlYXJNb3Rpb25zIH0gPSB0aGlzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdkcmFnLWNvbnRhaW5lcicpfSAke3ByZWZpeCgnbWFwLWNvbnRhaW5lcicpfWAgfSByZWY9eyB0aGlzLmdldENvbnRhaW5lciB9PlxuICAgICAgICB7b3JkZXIubWFwKChJRCwgaW5kZXgpID0+IHtcbiAgICAgICAgICBsZXQgeSA9IDA7XG4gICAgICAgICAgY29uc3QgbmV3SW5kZXggPSBuZXdPcmRlci5pbmRleE9mKElEKTtcblxuICAgICAgICAgIGlmIChvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQgPT09IElEICYmICFpc1ByZXNzZWQpIHtcbiAgICAgICAgICAvLyBpZiAob3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkID09PSBJRCApIHtcbiAgICAgICAgICAgIGxldCBub3dZID0gMDtcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhcnRJbmRleCwgZW5kSW5kZXggfSA9IG5ld0luZGV4IC0gaW5kZXggPiAwXG4gICAgICAgICAgICAgID8gKHsgc3RhcnRJbmRleDogaW5kZXgsIGVuZEluZGV4OiBuZXdJbmRleCB9KVxuICAgICAgICAgICAgICA6ICh7IHN0YXJ0SW5kZXg6IG5ld0luZGV4LCBlbmRJbmRleDogaW5kZXggfSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDwgZW5kSW5kZXg7IGkrKykge1xuICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgcmVmOiB7IG9mZnNldEhlaWdodCB9LFxuICAgICAgICAgICAgICB9ID0gdGhpcy5jaGlsZHJlbk1hcFsobmV3SW5kZXggLSBpbmRleCA+IDAgPyBuZXdPcmRlciA6IG9yZGVyKVtpXV07XG4gICAgICAgICAgICAgIG5vd1kgKz0gb2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeSA9IG5ld0luZGV4IC0gaW5kZXggPiAwID8gbm93WSA6IC1ub3dZO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggIT09IG5ld0luZGV4KSB7XG4gICAgICAgICAgICB5ID0gKG5ld0luZGV4IC0gaW5kZXggPiAwID8gMSA6IC0xKVxuICAgICAgICAgICAgICAgICogdGhpcy5jaGlsZHJlbk1hcFtvcmlnaW5hbFBvc09mTGFzdFByZXNzZWRdLnJlZi5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgc3R5bGUgPSBuZXh0UmVuZGVyQ2xlYXJNb3Rpb25zXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgLi4uY2xlYXJNb3Rpb25zKCksXG4gICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCA9PT0gSUQgJiYgaXNQcmVzc2VkXG4gICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIC4uLnByZXNzZWRNb3Rpb25zKCksXG4gICAgICAgICAgICAgICAgeTogc3ByaW5nKG1vdXNlWSwgeyBzdGlmZm5lc3M6IDUwMCwgZGFtcGluZzogNTAgfSksXG4gICAgICAgICAgICAgIC8vIHk6IG1vdXNlWSxcbiAgICAgICAgICAgICAgfSA6IHtcbiAgICAgICAgICAgICAgICAuLi5ub3RQcmVzc2VkTW90aW9ucygpLFxuICAgICAgICAgICAgICAgIHk6IHNwcmluZyh5LCBzcHJpbmdDb25maWcpLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TW90aW9uIHN0eWxlPXsgc3R5bGUgfSBrZXk9eyBJRCB9IHJlZj17IHJlZiA9PiB0aGlzLk1vdGlvbnNbSURdID0gcmVmIH0+XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKElELCAnICcsIHkpO1xuICAgICAgICAgICAgICAgLy8gY29uc29sZS50cmFjZShJRCwgJyAnLCB5KTtcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzY2FsZScsICcgJywgc2NhbGUpO1xuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NoYWRvdycsICcgJywgc2hhZG93KTtcbiAgICAgICAgICAgICAgIChzdHlsZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNoaWxkcmVuTWFwW0lEXSkgdGhpcy5jaGlsZHJlbk1hcFtJRF0gPSB7fTtcbiAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbk1hcFtJRF0uc3R5bGUgPSB7IHk6IHN0eWxlcy55IH07XG5cbiAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRG93bj17IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU1vdXNlRG93bihldmVudCwgSUQsIHkpO1xuICAgICAgICAgICAgICAgICAgICAgfSB9XG4gICAgICAgICAgICAgICAgICAgICByZWY9eyAocmVmKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5NYXBbSURdLnJlZiA9IHJlZjtcbiAgICAgICAgICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICAgICAgICAgb25Ub3VjaFN0YXJ0PXsgZXZlbnQgPT4gdGhpcy5oYW5kbGVUb3VjaFN0YXJ0KGV2ZW50LCBJRCwgeSkgfVxuICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgYCR7cHJlZml4KCdncm91cC1pdGVtLXdyYXAnKX0gJHtvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQgPT09IElEICYmIGlzUHJlc3NlZCA/IHByZWZpeCgnZ3JvdXAtaXRlbS13cmFwLXByZXNzZWQnKSA6ICcnfWAgfVxuICAgICAgICAgICAgICAgICAgICAgc3R5bGU9eyB7XG4gICAgICAgICAgICAgICAgICAgICAgIC4uLmNyZWF0ZVN0eWxlKHsgc3R5bGVzLCBJRCwgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IElEID09PSBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQgPyA5OSA6IElELFxuICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogSUQgPT09IG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCA/ICdyZWxhdGl2ZScgOiAndW5zZXQnLFxuICAgICAgICAgICAgICAgICAgICAgfSB9PlxuICAgICAgICAgICAgICAgICAgICAgeyBjaGlsZHJlbltJRF0gfVxuICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L01vdGlvbj5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuRHJhZy5kZWZhdWx0UHJvcHMgPSB7XG4gIGNoYW5nZURvbmU6ICgpID0+IHt9LFxuICBjbGVhck1vdGlvbnM6ICgpID0+ICh7XG4gICAgc2NhbGU6IDEsXG4gICAgc2hhZG93OiAwLFxuICB9KSxcbiAgcHJlc3NlZE1vdGlvbnM6ICgpID0+ICh7XG4gICAgc2NhbGU6IHNwcmluZygwLjYsIHNwcmluZ0NvbmZpZyksXG4gICAgc2hhZG93OiBzcHJpbmcoMTYsIHNwcmluZ0NvbmZpZyksXG4gICAgLy8geTogbW91c2VZLFxuICB9KSxcbiAgbm90UHJlc3NlZE1vdGlvbnM6ICgpID0+ICh7XG4gICAgc2NhbGU6IHNwcmluZygxLCBzcHJpbmdDb25maWcpLFxuICAgIHNoYWRvdzogc3ByaW5nKDAsIHNwcmluZ0NvbmZpZyksXG4gIH0pLFxuICBjcmVhdGVTdHlsZTogKHtcbiAgICBzdHlsZXM6IHtcbiAgICAgIHNjYWxlLFxuICAgICAgc2hhZG93LFxuICAgICAgeSxcbiAgICB9LFxuICAgIC8vIElELFxuICAgIC8vIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCxcbiAgfSA9IHt9KSA9PiAoe1xuICAgIGJveFNoYWRvdzogYHJnYmEoMCwgMCwgMCwgMC4yKSAwcHggJHtzaGFkb3d9cHggJHsyICogc2hhZG93fXB4IDBweGAsXG4gICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoMCwgJHt5fXB4LCAwKSBzY2FsZSgke3NjYWxlfSlgLFxuICAgIFdlYmtpdFRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKDAsICR7eX1weCwgMCkgc2NhbGUoJHtzY2FsZX0pYCxcbiAgfSksXG59O1xuIl19