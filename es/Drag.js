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
      children
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
      await sleep(springConfig.stiffness);
      await this.clearMotions();
      this.setState({
        newOrder: [...nextProps.order],
        order: [...nextProps.order],
        originalPosOfLastPressed: undefined,
        children
      });
      return;
    }

    this.setState({
      children,
      newOrder: [...nextProps.order],
      order: [...nextProps.order]
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
          children = _this$state4.children;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EcmFnLmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIk1vdGlvbiIsInNwcmluZyIsInJhZlNjaGQiLCJwcmVmaXgiLCJzbGVlcCIsImlzRXhpc3QiLCJmaW5kQWxsUGFyZW50Tm9kZSIsIm5vZGUiLCJlbHMiLCJ3aW5kb3ciLCJjdXJyTm9kZSIsInVuc2hpZnQiLCJwYXJlbnROb2RlIiwicmVpbnNlcnQiLCJhcnIiLCJmcm9tIiwidG8iLCJfYXJyIiwic2xpY2UiLCJ2YWwiLCJzcGxpY2UiLCJhbmltRHVyYXRpb24iLCJzcHJpbmdDb25maWciLCJzdGlmZm5lc3MiLCJkYW1waW5nIiwicHJlc3NUaW1lciIsIkRyYWciLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiY2xlYXJUaW1lb3V0Iiwic3RhdGUiLCJpc1ByZXNzZWQiLCJzZXRTdGF0ZSIsIm1vdmUiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlVG91Y2hNb3ZlIiwicGFzc2l2ZSIsImhhbmRsZU1vdXNlVXAiLCJoYW5kbGVNb3VzZU1vdmUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZSIsImZ1bmMiLCJyZW1vdmVMaXN0ZW5lciIsImFkZExpc3RlbmVyIiwic2V0VGltZW91dCIsIklEIiwicHJlc3NZIiwicGVyc2lzdCIsImhhbmRsZVN0YXJ0IiwiZXZlbnQiLCJ0b3VjaGVzIiwicGFnZVkiLCJ0b3BEZWx0YVkiLCJtb3VzZVkiLCJvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQiLCJwcmV2ZW50RGVmYXVsdCIsIm5ld09yZGVyIiwiY3VyckluZGV4IiwiaW5kZXhPZiIsInJlYWxSb3ciLCJyZWR1Y2UiLCJyb3ciLCJpbmRleCIsImNoaWxkcmVuTWFwIiwicmVmIiwib2Zmc2V0SGVpZ2h0Iiwib2Zmc2V0VG9wIiwiY3VyclN0eWxlIiwic3R5bGUiLCJ0b3AiLCJ5IiwiYm90dG9tIiwiY3Vyc29yIiwiY3Vyc29yT2Zmc2V0VG9wIiwiY3Vyc29yT2Zmc2V0SGVpZ2h0IiwiY3Vyc29yTWlkZGxlTGluZSIsIm9yaWdpbkluZGV4IiwibmV4dE5ld09yZGVyIiwiciIsInRoZW4iLCJzZXRNb3VzZVkiLCJtb3ZlaW5nIiwiRGF0ZSIsInByZVRpbWUiLCJyZU9yZGVyIiwiY2hhbmdlRG9uZSIsImNsZWFyTW90aW9ucyIsIm9yZGVyIiwidW5kZWZpbmVkIiwiZGVsYXkiLCJuZXh0UmVuZGVyQ2xlYXJNb3Rpb25zIiwiY29udGFpbmVyIiwiY2hpbGRyZW4iLCJNb3Rpb25zIiwiY29tcG9uZW50RGlkTW91bnQiLCJmb3JFYWNoIiwiZG9tIiwib25TY3JvbGwiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwibmV4dENvbnRleHQiLCJsYXN0QWN0aW9uTW92ZUlEIiwibGFzdE1vdmVJRCIsImxlbmd0aCIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsInNuYXBzaG90IiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW5kZXIiLCJwcmVzc2VkTW90aW9ucyIsIm5vdFByZXNzZWRNb3Rpb25zIiwiY3JlYXRlU3R5bGUiLCJnZXRDb250YWluZXIiLCJtYXAiLCJuZXdJbmRleCIsIm5vd1kiLCJzdGFydEluZGV4IiwiZW5kSW5kZXgiLCJpIiwic3R5bGVzIiwiaGFuZGxlTW91c2VEb3duIiwiaGFuZGxlVG91Y2hTdGFydCIsInpJbmRleCIsInBvc2l0aW9uIiwiZGVmYXVsdFByb3BzIiwic2NhbGUiLCJzaGFkb3ciLCJib3hTaGFkb3ciLCJ0cmFuc2Zvcm0iLCJXZWJraXRUcmFuc2Zvcm0iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPQSxLQUFQLElBQWdCQyxTQUFoQixRQUFpQyxPQUFqQztBQUNBLFNBQVNDLE1BQVQsRUFBaUJDLE1BQWpCLFFBQStCLGNBQS9CO0FBQ0EsT0FBT0MsT0FBUCxNQUFvQixVQUFwQjtBQUNBLFNBQVNDLE1BQVQsRUFBaUJDLEtBQWpCLEVBQXdCQyxPQUF4QixRQUF1QyxRQUF2QztBQUVBLFNBQVNKLE1B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RSxPQUFPO0FBQ3JCZ0IsSUFBQUEsS0FBSyxFQUFFN0gsTUFBTSxDQUFDLEdBQUQsRUFBTXFCLFlBQU4sQ0FEUTtBQUVyQnlHLElBQUFBLE1BQU0sRUFBRTlILE1BQU0sQ0FBQyxFQUFELEVBQUtxQixZQUFMLENBRk8sQ0FHckI7O0FBSHFCLEdBQVAsQ0FORTtBQVdsQnlGLEVBQUFBLGlCQUFpQixFQUFFLE9BQU87QUFDeEJlLElBQUFBLEtBQUssRUFBRTdILE1BQU0sQ0FBQyxDQUFELEVBQUlxQixZQUFKLENBRFc7QUFFeEJ5RyxJQUFBQSxNQUFNLEVBQUU5SCxNQUFNLENBQUMsQ0FBRCxFQUFJcUIsWUFBSjtBQUZVLEdBQVAsQ0FYRDtBQWVsQjBGLEVBQUFBLFdBQVcsRUFBRTtBQUFBLG9GQVFULEVBUlM7QUFBQSw2QkFDWFEsTUFEVztBQUFBLFFBRVRNLEtBRlMsZ0JBRVRBLEtBRlM7QUFBQSxRQUdUQyxNQUhTLGdCQUdUQSxNQUhTO0FBQUEsUUFJVHpELENBSlMsZ0JBSVRBLENBSlM7O0FBQUEsV0FRRDtBQUNWMEQsTUFBQUEsU0FBUyxFQUFHLDBCQUF5QkQsTUFBTyxNQUFLLElBQUlBLE1BQU8sUUFEbEQ7QUFFVkUsTUFBQUEsU0FBUyxFQUFHLGtCQUFpQjNELENBQUUsZ0JBQWV3RCxLQUFNLEdBRjFDO0FBR1ZJLE1BQUFBLGVBQWUsRUFBRyxrQkFBaUI1RCxDQUFFLGdCQUFld0QsS0FBTTtBQUhoRCxLQVJDO0FBQUE7QUFmSyxDQUFwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBNb3Rpb24sIHNwcmluZyB9IGZyb20gJ3JlYWN0LW1vdGlvbic7XG5pbXBvcnQgcmFmU2NoZCBmcm9tICdyYWYtc2NoZCc7XG5pbXBvcnQgeyBwcmVmaXgsIHNsZWVwLCBpc0V4aXN0IH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IHsgc3ByaW5nIH0gZnJvbSAncmVhY3QtbW90aW9uJztcblxuXG4vLyB0b2RvIGF1dG8gc2Nyb2xsXG5cbmZ1bmN0aW9uIGZpbmRBbGxQYXJlbnROb2RlKG5vZGUpIHtcbiAgY29uc3QgZWxzID0gW3dpbmRvd107XG4gIGxldCBjdXJyTm9kZSA9IG5vZGU7XG4gIHdoaWxlIChjdXJyTm9kZSkge1xuICAgIGVscy51bnNoaWZ0KGN1cnJOb2RlKTtcbiAgICBjdXJyTm9kZSA9IGN1cnJOb2RlLnBhcmVudE5vZGU7XG4gIH1cbiAgcmV0dXJuIGVscztcbn1cblxuXG5mdW5jdGlvbiByZWluc2VydChhcnIsIGZyb20sIHRvKSB7XG4gIGNvbnN0IF9hcnIgPSBhcnIuc2xpY2UoMCk7XG4gIGNvbnN0IHZhbCA9IF9hcnJbZnJvbV07XG4gIF9hcnIuc3BsaWNlKGZyb20sIDEpO1xuICBfYXJyLnNwbGljZSh0bywgMCwgdmFsKTtcbiAgcmV0dXJuIF9hcnI7XG59XG5cbmNvbnN0IGFuaW1EdXJhdGlvbiA9IDMwMDtcblxuY29uc3Qgc3ByaW5nQ29uZmlnID0geyBzdGlmZm5lc3M6IDIwMCwgZGFtcGluZzogMjAgfTtcblxubGV0IHByZXNzVGltZXI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhZyBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIGNvbnN0IHsgb3JkZXIsIGNoaWxkcmVuIH0gPSBwcm9wcztcblxuICAgIHRoaXMuTW90aW9ucyA9IHt9O1xuICAgIHRoaXMubmV4dFJlbmRlckNsZWFyTW90aW9ucyA9IGZhbHNlO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHRvcERlbHRhWTogMCxcbiAgICAgIG1vdXNlWTogMCxcbiAgICAgIGlzUHJlc3NlZDogZmFsc2UsXG4gICAgICBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQ6IHVuZGVmaW5lZCxcbiAgICAgIG9yZGVyOiBbLi4ub3JkZXJdLFxuICAgICAgbmV3T3JkZXI6IFsuLi5vcmRlcl0sXG4gICAgICBjaGlsZHJlbixcbiAgICB9O1xuXG4gICAgdGhpcy5oYW5kbGVNb3VzZU1vdmUgPSByYWZTY2hkKHRoaXMuaGFuZGxlTW91c2VNb3ZlKTtcbiAgICB0aGlzLmNoaWxkcmVuTWFwID0ge307XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBbdGhpcy5jb250YWluZXIsIC4uLmZpbmRBbGxQYXJlbnROb2RlKHRoaXMuY29udGFpbmVyKV0uZm9yRWFjaCgoZG9tKSA9PiB7XG4gICAgICBkb20uYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcywgbmV4dENvbnRleHQpIHtcbiAgICBjb25zdCB7IG9yZGVyLCBuZXdPcmRlciB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IGxhc3RBY3Rpb25Nb3ZlSUQsIGxhc3RNb3ZlSUQsIGNoaWxkcmVuIH0gPSBuZXh0UHJvcHM7XG5cbiAgICBpZiAoXG4gICAgICBvcmRlci5sZW5ndGggPT09IG5leHRQcm9wcy5vcmRlci5sZW5ndGhcbiAgICAgICYmIEpTT04uc3RyaW5naWZ5KG9yZGVyKSAhPT0gSlNPTi5zdHJpbmdpZnkobmV4dFByb3BzLm9yZGVyKVxuICAgICAgJiYgaXNFeGlzdChsYXN0QWN0aW9uTW92ZUlEKVxuICAgICAgJiYgaXNFeGlzdChsYXN0TW92ZUlEKVxuICAgICkge1xuICAgICAgYXdhaXQgdGhpcy5jbGVhck1vdGlvbnMoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAvLyBuZXdPcmRlcjogWy4uLm5leHRQcm9wcy5vcmRlcl0sXG4gICAgICAgIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZDogbGFzdEFjdGlvbk1vdmVJRCxcbiAgICAgICAgaXNQcmVzc2VkOiB0cnVlLFxuICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IHRoaXMuc2V0TW91c2VZKFxuICAgICAgICB0aGlzLmNoaWxkcmVuTWFwW2xhc3RNb3ZlSURdLnJlZi5vZmZzZXRUb3BcbiAgICAgICAgLSB0aGlzLmNoaWxkcmVuTWFwW2xhc3RBY3Rpb25Nb3ZlSURdLnJlZi5vZmZzZXRUb3AsXG4gICAgICApO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHsgbmV3T3JkZXI6IFsuLi5uZXh0UHJvcHMub3JkZXJdIH0pO1xuXG4gICAgICBhd2FpdCBzbGVlcChhbmltRHVyYXRpb24pO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNQcmVzc2VkOiBmYWxzZSB9KTtcblxuICAgICAgYXdhaXQgc2xlZXAoc3ByaW5nQ29uZmlnLnN0aWZmbmVzcyk7XG5cbiAgICAgIGF3YWl0IHRoaXMuY2xlYXJNb3Rpb25zKCk7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBuZXdPcmRlcjogWy4uLm5leHRQcm9wcy5vcmRlcl0sXG4gICAgICAgIG9yZGVyOiBbLi4ubmV4dFByb3BzLm9yZGVyXSxcbiAgICAgICAgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkOiB1bmRlZmluZWQsXG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHsgY2hpbGRyZW4sIG5ld09yZGVyOiBbLi4ubmV4dFByb3BzLm9yZGVyXSwgb3JkZXI6IFsuLi5uZXh0UHJvcHMub3JkZXJdIH0pO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlLCBzbmFwc2hvdCkge1xuICAgIHRoaXMubmV4dFJlbmRlckNsZWFyTW90aW9ucyA9IGZhbHNlO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgW3RoaXMuY29udGFpbmVyLCAuLi5maW5kQWxsUGFyZW50Tm9kZSh0aGlzLmNvbnRhaW5lcildLmZvckVhY2goKGRvbSkgPT4ge1xuICAgICAgZG9tLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMub25TY3JvbGwpO1xuICAgIH0pO1xuICB9XG5cbiAgb25TY3JvbGwgPSAoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHByZXNzVGltZXIpO1xuICAgIGlmICh0aGlzLnN0YXRlLmlzUHJlc3NlZCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzUHJlc3NlZDogZmFsc2UgfSk7XG4gICAgfVxuICB9XG5cbiAgYWRkTGlzdGVuZXIgPSAoeyBtb3ZlID0gdHJ1ZSB9ID0ge30pID0+IHtcbiAgICBtb3ZlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRvdWNoTW92ZSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmhhbmRsZU1vdXNlVXApO1xuICAgIG1vdmUgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlTW91c2VNb3ZlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlTW91c2VVcCk7XG4gIH1cblxuICByZW1vdmVMaXN0ZW5lciA9ICgpID0+IHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVUb3VjaE1vdmUpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuaGFuZGxlTW91c2VVcCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlTW91c2VNb3ZlKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlTW91c2VVcCk7XG4gIH1cblxuICBoYW5kbGVTdGFydCA9IChlLCBmdW5jID0gKCkgPT4ge30pID0+IHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKCk7XG4gICAgdGhpcy5hZGRMaXN0ZW5lcih7IG1vdmU6IGZhbHNlIH0pO1xuXG4gICAgLy8gY29uc3QgYSA9ICtuZXcgRGF0ZSgpO1xuICAgIGlmICghcHJlc3NUaW1lcikge1xuICAgICAgcHJlc3NUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcHJlc3NUaW1lciA9IHdpbmRvdy5jbGVhclRpbWVvdXQocHJlc3NUaW1lcik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCtuZXcgRGF0ZSgpIC0gYSk7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcigpO1xuICAgICAgICBmdW5jKCk7XG4gICAgICB9LCA3MDApO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVRvdWNoU3RhcnQgPSAoZSwgSUQsIHByZXNzWSkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdoYW5kbGVUb3VjaFN0YXJ0Jyk7XG4gICAgZS5wZXJzaXN0KCk7XG4gICAgLy8gY29uc3QgeyB0b3AgfSA9IGUuY3VycmVudFRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIHRoaXMuaGFuZGxlU3RhcnQoZSwgKCkgPT4ge1xuICAgICAgY29uc3QgZXZlbnQgPSBlLnRvdWNoZXNbMF07XG4gICAgICBjb25zdCB7IHBhZ2VZIH0gPSBldmVudDtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHRvcERlbHRhWTogcGFnZVkgLSBwcmVzc1ksXG4gICAgICAgIG1vdXNlWTogcHJlc3NZLFxuICAgICAgICBpc1ByZXNzZWQ6IHRydWUsXG4gICAgICAgIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZDogSUQsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVNb3VzZURvd24gPSAoZSwgSUQsIHByZXNzWSkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdoYW5kbGVNb3VzZURvd24nKTtcbiAgICBjb25zdCB7IHBhZ2VZIH0gPSBlO1xuXG4gICAgdGhpcy5oYW5kbGVTdGFydChlLCAoKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhwYWdlWSwgcHJlc3NZKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB0b3BEZWx0YVk6IHBhZ2VZIC0gcHJlc3NZLFxuICAgICAgICBtb3VzZVk6IHByZXNzWSxcbiAgICAgICAgaXNQcmVzc2VkOiB0cnVlLFxuICAgICAgICBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQ6IElELFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlVG91Y2hNb3ZlID0gKGUpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZygnaGFuZGxlVG91Y2hNb3ZlJyk7XG4gICAgY29uc3QgeyBpc1ByZXNzZWQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAvLyBwcmVzc1RpbWVyID0gY2xlYXJUaW1lb3V0KHByZXNzVGltZXIpO1xuXG4gICAgaWYgKGlzUHJlc3NlZCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5oYW5kbGVNb3VzZU1vdmUoZS50b3VjaGVzWzBdKTtcbiAgICB9XG4gIH07XG5cbiAgcmVPcmRlciA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQsIG5ld09yZGVyLFxuICAgIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3QgY3VyckluZGV4ID0gbmV3T3JkZXIuaW5kZXhPZihvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQpO1xuICAgIGNvbnN0IHJlYWxSb3cgPSBuZXdPcmRlci5yZWR1Y2UoKHJvdywgSUQpID0+IHtcbiAgICAgIGlmIChvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQgPT09IElEKSB7XG4gICAgICAgIHJldHVybiByb3c7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGluZGV4ID0gbmV3T3JkZXIuaW5kZXhPZihJRCk7XG4gICAgICBjb25zdCB7IHJlZjogeyBvZmZzZXRIZWlnaHQsIG9mZnNldFRvcCB9LCBzdHlsZTogY3VyclN0eWxlIH0gPSB0aGlzLmNoaWxkcmVuTWFwW0lEXTtcbiAgICAgIGNvbnN0IHRvcCA9IG9mZnNldFRvcCArIGN1cnJTdHlsZS55O1xuICAgICAgY29uc3QgYm90dG9tID0gdG9wICsgb2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAvLyBjb25zdCB7IHRvcCwgYm90dG9tIH0gPSB0aGlzLmNoaWxkcmVuTWFwW0lEXS5yZWYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjb25zdCB7IHJlZjogY3Vyc29yLCBzdHlsZSB9ID0gdGhpcy5jaGlsZHJlbk1hcFtvcmlnaW5hbFBvc09mTGFzdFByZXNzZWRdO1xuICAgICAgY29uc3QgeyBvZmZzZXRUb3A6IGN1cnNvck9mZnNldFRvcCwgb2Zmc2V0SGVpZ2h0OiBjdXJzb3JPZmZzZXRIZWlnaHQgfSA9IGN1cnNvcjtcblxuICAgICAgY29uc3QgY3Vyc29yTWlkZGxlTGluZSA9IGN1cnNvck9mZnNldFRvcCArIHN0eWxlLnkgKyAoY3Vyc29yT2Zmc2V0SGVpZ2h0IC8gMik7XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKGN1cnNvck1pZGRsZUxpbmUsIHRvcCArIChvZmZzZXRIZWlnaHQgLyA0KSwgYm90dG9tIC0gKG9mZnNldEhlaWdodCAvIDQpLCBJRCk7XG4gICAgICBpZiAoXG4gICAgICAgIGN1cnNvck1pZGRsZUxpbmUgPiB0b3AgKyAob2Zmc2V0SGVpZ2h0IC8gNClcbiAgICAgICAgJiYgY3Vyc29yTWlkZGxlTGluZSA8IGJvdHRvbSAtIChvZmZzZXRIZWlnaHQgLyA0KVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgIH1cbiAgICAgIHJldHVybiByb3c7XG4gICAgfSwgY3VyckluZGV4KTtcblxuICAgIGNvbnN0IG9yaWdpbkluZGV4ID0gbmV3T3JkZXIuaW5kZXhPZihvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQpO1xuXG4gICAgaWYgKG9yaWdpbkluZGV4ICE9PSByZWFsUm93KSB7XG4gICAgICBjb25zdCBuZXh0TmV3T3JkZXIgPSByZWluc2VydChuZXdPcmRlciwgb3JpZ2luSW5kZXgsIHJlYWxSb3cpO1xuICAgICAgcmV0dXJuIG5leHROZXdPcmRlcjtcbiAgICB9XG4gICAgcmV0dXJuIG5ld09yZGVyO1xuICB9XG5cbiAgc2V0TW91c2VZID0gbW91c2VZID0+IG5ldyBQcm9taXNlKChyKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IG1vdXNlWSB9LCAoKSA9PiB7XG4gICAgICBzbGVlcCgzMDApLnRoZW4ocik7XG4gICAgfSk7XG4gIH0pXG5cbiAgaGFuZGxlTW91c2VNb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZU1vdXNlTW92ZScpO1xuICAgIGNvbnN0IHsgcGFnZVkgfSA9IGV2ZW50O1xuXG4gICAgY29uc3Qge1xuICAgICAgaXNQcmVzc2VkLCB0b3BEZWx0YVksIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCwgbmV3T3JkZXIsXG4gICAgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCBtb3VzZVkgPSBwYWdlWSAtIHRvcERlbHRhWTtcblxuICAgIHRoaXMuc2V0TW91c2VZKG1vdXNlWSk7XG5cbiAgICBpZiAoaXNQcmVzc2VkICYmICF0aGlzLm1vdmVpbmcpIHtcbiAgICAgIGlmICgrbmV3IERhdGUoKSAtIHRoaXMucHJlVGltZSA8IGFuaW1EdXJhdGlvbikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBuZXh0TmV3T3JkZXIgPSB0aGlzLnJlT3JkZXIoKTtcblxuICAgICAgaWYgKG5ld09yZGVyICE9PSBuZXh0TmV3T3JkZXIpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG5ld09yZGVyOiBbLi4ubmV4dE5ld09yZGVyXSB9KTtcblxuICAgICAgICB0aGlzLnByZVRpbWUgPSArbmV3IERhdGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gfSk7XG4gIH07XG5cbiAgY2hhbmdlRG9uZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IGNoYW5nZURvbmUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICB0aGlzLmNsZWFyTW90aW9ucyhhbmltRHVyYXRpb24pLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgeyBuZXdPcmRlciB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBuZXdPcmRlcjogWy4uLm5ld09yZGVyXSwgb3JkZXI6IFsuLi5uZXdPcmRlcl0gfSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgdG9wRGVsdGFZOiAwLCBtb3VzZVk6IDAsIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZDogdW5kZWZpbmVkIH0pO1xuICAgICAgY2hhbmdlRG9uZShuZXdPcmRlcik7XG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVNb3VzZVVwID0gKGUpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZygnaGFuZGxlTW91c2VVcCcpO1xuICAgIGNvbnN0IHsgaXNQcmVzc2VkIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgcHJlc3NUaW1lciA9IHdpbmRvdy5jbGVhclRpbWVvdXQocHJlc3NUaW1lcik7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzUHJlc3NlZDogZmFsc2UgfSk7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcigpO1xuXG4gICAgaWYgKGlzUHJlc3NlZCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ29uRHJvcCcpO1xuICAgICAgdGhpcy5jaGFuZ2VEb25lKCk7XG4gICAgfVxuICB9O1xuXG4gIGNsZWFyTW90aW9ucyA9ZGVsYXkgPT4gbmV3IFByb21pc2UoKHIpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMubmV4dFJlbmRlckNsZWFyTW90aW9ucyA9IHRydWU7XG4gICAgICB0aGlzLnNldFN0YXRlKHt9LCByKTtcbiAgICB9LCBkZWxheSk7XG4gIH0pXG5cbiAgZ2V0Q29udGFpbmVyID0gKHJlZikgPT4ge1xuICAgIHRoaXMuY29udGFpbmVyID0gcmVmO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG1vdXNlWSwgaXNQcmVzc2VkLCBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQsIG5ld09yZGVyLCBvcmRlciA9IFtdLCBjaGlsZHJlbixcbiAgICB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGNvbnN0IHtcbiAgICAgIGNsZWFyTW90aW9ucywgcHJlc3NlZE1vdGlvbnMsIG5vdFByZXNzZWRNb3Rpb25zLCBjcmVhdGVTdHlsZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHsgbmV4dFJlbmRlckNsZWFyTW90aW9ucyB9ID0gdGhpcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17IGAke3ByZWZpeCgnZHJhZy1jb250YWluZXInKX0gJHtwcmVmaXgoJ21hcC1jb250YWluZXInKX1gIH0gcmVmPXsgdGhpcy5nZXRDb250YWluZXIgfT5cbiAgICAgICAge29yZGVyLm1hcCgoSUQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgbGV0IHkgPSAwO1xuICAgICAgICAgIGNvbnN0IG5ld0luZGV4ID0gbmV3T3JkZXIuaW5kZXhPZihJRCk7XG5cbiAgICAgICAgICBpZiAob3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkID09PSBJRCAmJiAhaXNQcmVzc2VkKSB7XG4gICAgICAgICAgLy8gaWYgKG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCA9PT0gSUQgKSB7XG4gICAgICAgICAgICBsZXQgbm93WSA9IDA7XG4gICAgICAgICAgICBjb25zdCB7IHN0YXJ0SW5kZXgsIGVuZEluZGV4IH0gPSBuZXdJbmRleCAtIGluZGV4ID4gMFxuICAgICAgICAgICAgICA/ICh7IHN0YXJ0SW5kZXg6IGluZGV4LCBlbmRJbmRleDogbmV3SW5kZXggfSlcbiAgICAgICAgICAgICAgOiAoeyBzdGFydEluZGV4OiBuZXdJbmRleCwgZW5kSW5kZXg6IGluZGV4IH0pO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IGVuZEluZGV4OyBpKyspIHtcbiAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgIHJlZjogeyBvZmZzZXRIZWlnaHQgfSxcbiAgICAgICAgICAgICAgfSA9IHRoaXMuY2hpbGRyZW5NYXBbKG5ld0luZGV4IC0gaW5kZXggPiAwID8gbmV3T3JkZXIgOiBvcmRlcilbaV1dO1xuICAgICAgICAgICAgICBub3dZICs9IG9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHkgPSBuZXdJbmRleCAtIGluZGV4ID4gMCA/IG5vd1kgOiAtbm93WTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ICE9PSBuZXdJbmRleCkge1xuICAgICAgICAgICAgeSA9IChuZXdJbmRleCAtIGluZGV4ID4gMCA/IDEgOiAtMSlcbiAgICAgICAgICAgICAgICAqIHRoaXMuY2hpbGRyZW5NYXBbb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkXS5yZWYub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHN0eWxlID0gbmV4dFJlbmRlckNsZWFyTW90aW9uc1xuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgIC4uLmNsZWFyTW90aW9ucygpLFxuICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQgPT09IElEICYmIGlzUHJlc3NlZFxuICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAuLi5wcmVzc2VkTW90aW9ucygpLFxuICAgICAgICAgICAgICAgIHk6IHNwcmluZyhtb3VzZVksIHsgc3RpZmZuZXNzOiA1MDAsIGRhbXBpbmc6IDUwIH0pLFxuICAgICAgICAgICAgICAvLyB5OiBtb3VzZVksXG4gICAgICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICAgICAgLi4ubm90UHJlc3NlZE1vdGlvbnMoKSxcbiAgICAgICAgICAgICAgICB5OiBzcHJpbmcoeSwgc3ByaW5nQ29uZmlnKSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE1vdGlvbiBzdHlsZT17IHN0eWxlIH0ga2V5PXsgSUQgfSByZWY9eyByZWYgPT4gdGhpcy5Nb3Rpb25zW0lEXSA9IHJlZiB9PlxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhJRCwgJyAnLCB5KTtcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUudHJhY2UoSUQsICcgJywgeSk7XG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2NhbGUnLCAnICcsIHNjYWxlKTtcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzaGFkb3cnLCAnICcsIHNoYWRvdyk7XG4gICAgICAgICAgICAgICAoc3R5bGVzKSA9PiB7XG4gICAgICAgICAgICAgICAgIGlmICghdGhpcy5jaGlsZHJlbk1hcFtJRF0pIHRoaXMuY2hpbGRyZW5NYXBbSURdID0ge307XG4gICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5NYXBbSURdLnN0eWxlID0geyB5OiBzdHlsZXMueSB9O1xuXG4gICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZURvd249eyAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3VzZURvd24oZXZlbnQsIElELCB5KTtcbiAgICAgICAgICAgICAgICAgICAgIH0gfVxuICAgICAgICAgICAgICAgICAgICAgcmVmPXsgKHJlZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuTWFwW0lEXS5yZWYgPSByZWY7XG4gICAgICAgICAgICAgICAgICAgICB9IH1cbiAgICAgICAgICAgICAgICAgICAgIG9uVG91Y2hTdGFydD17IGV2ZW50ID0+IHRoaXMuaGFuZGxlVG91Y2hTdGFydChldmVudCwgSUQsIHkpIH1cbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IGAke3ByZWZpeCgnZ3JvdXAtaXRlbS13cmFwJyl9ICR7b3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkID09PSBJRCAmJiBpc1ByZXNzZWQgPyBwcmVmaXgoJ2dyb3VwLWl0ZW0td3JhcC1wcmVzc2VkJykgOiAnJ31gIH1cbiAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXsge1xuICAgICAgICAgICAgICAgICAgICAgICAuLi5jcmVhdGVTdHlsZSh7IHN0eWxlcywgSUQsIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiBJRCA9PT0gb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkID8gOTkgOiBJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IElEID09PSBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQgPyAncmVsYXRpdmUnIDogJ3Vuc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgIH0gfT5cbiAgICAgICAgICAgICAgICAgICAgIHsgY2hpbGRyZW5bSURdIH1cbiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9Nb3Rpb24+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkRyYWcuZGVmYXVsdFByb3BzID0ge1xuICBjaGFuZ2VEb25lOiAoKSA9PiB7fSxcbiAgY2xlYXJNb3Rpb25zOiAoKSA9PiAoe1xuICAgIHNjYWxlOiAxLFxuICAgIHNoYWRvdzogMCxcbiAgfSksXG4gIHByZXNzZWRNb3Rpb25zOiAoKSA9PiAoe1xuICAgIHNjYWxlOiBzcHJpbmcoMC42LCBzcHJpbmdDb25maWcpLFxuICAgIHNoYWRvdzogc3ByaW5nKDE2LCBzcHJpbmdDb25maWcpLFxuICAgIC8vIHk6IG1vdXNlWSxcbiAgfSksXG4gIG5vdFByZXNzZWRNb3Rpb25zOiAoKSA9PiAoe1xuICAgIHNjYWxlOiBzcHJpbmcoMSwgc3ByaW5nQ29uZmlnKSxcbiAgICBzaGFkb3c6IHNwcmluZygwLCBzcHJpbmdDb25maWcpLFxuICB9KSxcbiAgY3JlYXRlU3R5bGU6ICh7XG4gICAgc3R5bGVzOiB7XG4gICAgICBzY2FsZSxcbiAgICAgIHNoYWRvdyxcbiAgICAgIHksXG4gICAgfSxcbiAgICAvLyBJRCxcbiAgICAvLyBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQsXG4gIH0gPSB7fSkgPT4gKHtcbiAgICBib3hTaGFkb3c6IGByZ2JhKDAsIDAsIDAsIDAuMikgMHB4ICR7c2hhZG93fXB4ICR7MiAqIHNoYWRvd31weCAwcHhgLFxuICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKDAsICR7eX1weCwgMCkgc2NhbGUoJHtzY2FsZX0pYCxcbiAgICBXZWJraXRUcmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgwLCAke3l9cHgsIDApIHNjYWxlKCR7c2NhbGV9KWAsXG4gIH0pLFxufTtcbiJdfQ==