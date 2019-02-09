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
            zIndex: ID === originalPosOfLastPressed ? 99 : ID
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EcmFnLmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIk1vdGlvbiIsInNwcmluZyIsInJhZlNjaGQiLCJwcmVmaXgiLCJzbGVlcCIsImlzRXhpc3QiLCJmaW5kQWxsUGFyZW50Tm9kZSIsIm5vZGUiLCJlbHMiLCJ3aW5kb3ciLCJjdXJyTm9kZSIsInVuc2hpZnQiLCJwYXJlbnROb2RlIiwicmVpbnNlcnQiLCJhcnIiLCJmcm9tIiwidG8iLCJfYXJyIiwic2xpY2UiLCJ2YWwiLCJzcGxpY2UiLCJhbmltRHVyYXRpb24iLCJzcHJpbmdDb25maWciLCJzdGlmZm5lc3MiLCJkYW1waW5nIiwicHJlc3NUaW1lciIsIkRyYWciLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiY2xlYXJUaW1lb3V0Iiwic3RhdGUiLCJpc1ByZXNzZWQiLCJzZXRTdGF0ZSIsIm1vdmUiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlVG91Y2hNb3ZlIiwicGFzc2l2ZSIsImhhbmRsZU1vdXNlVXAiLCJoYW5kbGVNb3VzZU1vdmUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZSIsImZ1bmMiLCJyZW1vdmVMaXN0ZW5lciIsImFkZExpc3RlbmVyIiwic2V0VGltZW91dCIsIklEIiwicHJlc3NZIiwicGVyc2lzdCIsImhhbmRsZVN0YXJ0IiwiZXZlbnQiLCJ0b3VjaGVzIiwicGFnZVkiLCJ0b3BEZWx0YVkiLCJtb3VzZVkiLCJvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQiLCJwcmV2ZW50RGVmYXVsdCIsIm5ld09yZGVyIiwiY3VyckluZGV4IiwiaW5kZXhPZiIsInJlYWxSb3ciLCJyZWR1Y2UiLCJyb3ciLCJpbmRleCIsImNoaWxkcmVuTWFwIiwicmVmIiwib2Zmc2V0SGVpZ2h0Iiwib2Zmc2V0VG9wIiwiY3VyclN0eWxlIiwic3R5bGUiLCJ0b3AiLCJ5IiwiYm90dG9tIiwiY3Vyc29yIiwiY3Vyc29yT2Zmc2V0VG9wIiwiY3Vyc29yT2Zmc2V0SGVpZ2h0IiwiY3Vyc29yTWlkZGxlTGluZSIsIm9yaWdpbkluZGV4IiwibmV4dE5ld09yZGVyIiwiciIsInRoZW4iLCJzZXRNb3VzZVkiLCJtb3ZlaW5nIiwiRGF0ZSIsInByZVRpbWUiLCJyZU9yZGVyIiwiY2hhbmdlRG9uZSIsImNsZWFyTW90aW9ucyIsIm9yZGVyIiwidW5kZWZpbmVkIiwiZGVsYXkiLCJuZXh0UmVuZGVyQ2xlYXJNb3Rpb25zIiwiY29udGFpbmVyIiwiY2hpbGRyZW4iLCJNb3Rpb25zIiwibmV3Q2hpbGRyZW4iLCJjb21wb25lbnREaWRNb3VudCIsImZvckVhY2giLCJkb20iLCJvblNjcm9sbCIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJuZXh0Q29udGV4dCIsImxhc3RBY3Rpb25Nb3ZlSUQiLCJsYXN0TW92ZUlEIiwibGVuZ3RoIiwiY29tcG9uZW50RGlkVXBkYXRlIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwic25hcHNob3QiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbmRlciIsInByZXNzZWRNb3Rpb25zIiwibm90UHJlc3NlZE1vdGlvbnMiLCJjcmVhdGVTdHlsZSIsImdldENvbnRhaW5lciIsIm1hcCIsIm5ld0luZGV4Iiwibm93WSIsInN0YXJ0SW5kZXgiLCJlbmRJbmRleCIsImkiLCJzdHlsZXMiLCJoYW5kbGVNb3VzZURvd24iLCJoYW5kbGVUb3VjaFN0YXJ0IiwiekluZGV4IiwiZGVmYXVsdFByb3BzIiwic2NhbGUiLCJzaGFkb3ciLCJib3hTaGFkb3ciLCJ0cmFuc2Zvcm0iLCJXZWJraXRUcmFuc2Zvcm0iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPQSxLQUFQLElBQWdCQyxTQUFoQixRQUFpQyxPQUFqQztBQUNBLFNBQVNDLE1BQVQsRUFBaUJDLE1BQWpCLFFBQStCLGNBQS9CO0FBQ0EsT0FBT0MsT0FBUCxNQUFvQixVQUFwQjtBQUNBLFNBQVNDLE1BQVQsRUFBaUJDLEtBQWpCLEVBQXdCQyxPQUF4QixRQUF1QyxRQUF2QztBQUVBLFNBQVNK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RlcsR0FBUCxDQUZJO0FBTWxCaEIsRUFBQUEsY0FBYyxFQUFFLE9BQU87QUFDckJlLElBQUFBLEtBQUssRUFBRTdILE1BQU0sQ0FBQyxHQUFELEVBQU1xQixZQUFOLENBRFE7QUFFckJ5RyxJQUFBQSxNQUFNLEVBQUU5SCxNQUFNLENBQUMsRUFBRCxFQUFLcUIsWUFBTCxDQUZPLENBR3JCOztBQUhxQixHQUFQLENBTkU7QUFXbEIwRixFQUFBQSxpQkFBaUIsRUFBRSxPQUFPO0FBQ3hCYyxJQUFBQSxLQUFLLEVBQUU3SCxNQUFNLENBQUMsQ0FBRCxFQUFJcUIsWUFBSixDQURXO0FBRXhCeUcsSUFBQUEsTUFBTSxFQUFFOUgsTUFBTSxDQUFDLENBQUQsRUFBSXFCLFlBQUo7QUFGVSxHQUFQLENBWEQ7QUFlbEIyRixFQUFBQSxXQUFXLEVBQUU7QUFBQSxvRkFRVCxFQVJTO0FBQUEsNkJBQ1hRLE1BRFc7QUFBQSxRQUVUSyxLQUZTLGdCQUVUQSxLQUZTO0FBQUEsUUFHVEMsTUFIUyxnQkFHVEEsTUFIUztBQUFBLFFBSVR6RCxDQUpTLGdCQUlUQSxDQUpTOztBQUFBLFdBUUQ7QUFDVjBELE1BQUFBLFNBQVMsRUFBRywwQkFBeUJELE1BQU8sTUFBSyxJQUFJQSxNQUFPLFFBRGxEO0FBRVZFLE1BQUFBLFNBQVMsRUFBRyxrQkFBaUIzRCxDQUFFLGdCQUFld0QsS0FBTSxHQUYxQztBQUdWSSxNQUFBQSxlQUFlLEVBQUcsa0JBQWlCNUQsQ0FBRSxnQkFBZXdELEtBQU07QUFIaEQsS0FSQztBQUFBO0FBZkssQ0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTW90aW9uLCBzcHJpbmcgfSBmcm9tICdyZWFjdC1tb3Rpb24nO1xuaW1wb3J0IHJhZlNjaGQgZnJvbSAncmFmLXNjaGQnO1xuaW1wb3J0IHsgcHJlZml4LCBzbGVlcCwgaXNFeGlzdCB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCB7IHNwcmluZyB9IGZyb20gJ3JlYWN0LW1vdGlvbic7XG5cblxuLy8gdG9kbyBhdXRvIHNjcm9sbFxuXG5mdW5jdGlvbiBmaW5kQWxsUGFyZW50Tm9kZShub2RlKSB7XG4gIGNvbnN0IGVscyA9IFt3aW5kb3ddO1xuICBsZXQgY3Vyck5vZGUgPSBub2RlO1xuICB3aGlsZSAoY3Vyck5vZGUpIHtcbiAgICBlbHMudW5zaGlmdChjdXJyTm9kZSk7XG4gICAgY3Vyck5vZGUgPSBjdXJyTm9kZS5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiBlbHM7XG59XG5cblxuZnVuY3Rpb24gcmVpbnNlcnQoYXJyLCBmcm9tLCB0bykge1xuICBjb25zdCBfYXJyID0gYXJyLnNsaWNlKDApO1xuICBjb25zdCB2YWwgPSBfYXJyW2Zyb21dO1xuICBfYXJyLnNwbGljZShmcm9tLCAxKTtcbiAgX2Fyci5zcGxpY2UodG8sIDAsIHZhbCk7XG4gIHJldHVybiBfYXJyO1xufVxuXG5jb25zdCBhbmltRHVyYXRpb24gPSAzMDA7XG5cbmNvbnN0IHNwcmluZ0NvbmZpZyA9IHsgc3RpZmZuZXNzOiAyMDAsIGRhbXBpbmc6IDIwIH07XG5cbmxldCBwcmVzc1RpbWVyO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYWcgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCB7IG9yZGVyLCBjaGlsZHJlbiB9ID0gcHJvcHM7XG5cbiAgICB0aGlzLk1vdGlvbnMgPSB7fTtcbiAgICB0aGlzLm5leHRSZW5kZXJDbGVhck1vdGlvbnMgPSBmYWxzZTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0b3BEZWx0YVk6IDAsXG4gICAgICBtb3VzZVk6IDAsXG4gICAgICBpc1ByZXNzZWQ6IGZhbHNlLFxuICAgICAgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkOiB1bmRlZmluZWQsXG4gICAgICBvcmRlcjogWy4uLm9yZGVyXSxcbiAgICAgIG5ld09yZGVyOiBbLi4ub3JkZXJdLFxuICAgICAgY2hpbGRyZW4sXG4gICAgICBuZXdDaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgfTtcblxuICAgIHRoaXMuaGFuZGxlTW91c2VNb3ZlID0gcmFmU2NoZCh0aGlzLmhhbmRsZU1vdXNlTW92ZSk7XG4gICAgdGhpcy5jaGlsZHJlbk1hcCA9IHt9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgW3RoaXMuY29udGFpbmVyLCAuLi5maW5kQWxsUGFyZW50Tm9kZSh0aGlzLmNvbnRhaW5lcildLmZvckVhY2goKGRvbSkgPT4ge1xuICAgICAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMub25TY3JvbGwpO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMsIG5leHRDb250ZXh0KSB7XG4gICAgY29uc3QgeyBvcmRlciwgbmV3T3JkZXIgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBsYXN0QWN0aW9uTW92ZUlELCBsYXN0TW92ZUlELCBjaGlsZHJlbiB9ID0gbmV4dFByb3BzO1xuXG4gICAgaWYgKFxuICAgICAgb3JkZXIubGVuZ3RoID09PSBuZXh0UHJvcHMub3JkZXIubGVuZ3RoXG4gICAgICAmJiBKU09OLnN0cmluZ2lmeShvcmRlcikgIT09IEpTT04uc3RyaW5naWZ5KG5leHRQcm9wcy5vcmRlcilcbiAgICAgICYmIGlzRXhpc3QobGFzdEFjdGlvbk1vdmVJRClcbiAgICAgICYmIGlzRXhpc3QobGFzdE1vdmVJRClcbiAgICApIHtcbiAgICAgIGF3YWl0IHRoaXMuY2xlYXJNb3Rpb25zKCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgLy8gbmV3T3JkZXI6IFsuLi5uZXh0UHJvcHMub3JkZXJdLFxuICAgICAgICBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQ6IGxhc3RBY3Rpb25Nb3ZlSUQsXG4gICAgICAgIGlzUHJlc3NlZDogdHJ1ZSxcbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCB0aGlzLnNldE1vdXNlWShcbiAgICAgICAgdGhpcy5jaGlsZHJlbk1hcFtsYXN0TW92ZUlEXS5yZWYub2Zmc2V0VG9wXG4gICAgICAgIC0gdGhpcy5jaGlsZHJlbk1hcFtsYXN0QWN0aW9uTW92ZUlEXS5yZWYub2Zmc2V0VG9wLFxuICAgICAgKTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IG5ld09yZGVyOiBbLi4ubmV4dFByb3BzLm9yZGVyXSB9KTtcblxuICAgICAgYXdhaXQgc2xlZXAoYW5pbUR1cmF0aW9uKTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzUHJlc3NlZDogZmFsc2UgfSk7XG5cbiAgICAgIGF3YWl0IHNsZWVwKDIwMCk7XG5cbiAgICAgIGF3YWl0IHRoaXMuY2xlYXJNb3Rpb25zKCk7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBuZXdPcmRlcjogWy4uLm5leHRQcm9wcy5vcmRlcl0sXG4gICAgICAgIG9yZGVyOiBbLi4ubmV4dFByb3BzLm9yZGVyXSxcbiAgICAgICAgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkOiB1bmRlZmluZWQsXG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jbGVhck1vdGlvbnMoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBjaGlsZHJlbiwgbmV3T3JkZXI6IFsuLi5uZXh0UHJvcHMub3JkZXJdLCBvcmRlcjogWy4uLm5leHRQcm9wcy5vcmRlcl0gfSk7XG4gICAgfSk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUsIHNuYXBzaG90KSB7XG4gICAgdGhpcy5uZXh0UmVuZGVyQ2xlYXJNb3Rpb25zID0gZmFsc2U7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBbdGhpcy5jb250YWluZXIsIC4uLmZpbmRBbGxQYXJlbnROb2RlKHRoaXMuY29udGFpbmVyKV0uZm9yRWFjaCgoZG9tKSA9PiB7XG4gICAgICBkb20ucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbCk7XG4gICAgfSk7XG4gIH1cblxuICBvblNjcm9sbCA9ICgpID0+IHtcbiAgICBjbGVhclRpbWVvdXQocHJlc3NUaW1lcik7XG4gICAgaWYgKHRoaXMuc3RhdGUuaXNQcmVzc2VkKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNQcmVzc2VkOiBmYWxzZSB9KTtcbiAgICB9XG4gIH1cblxuICBhZGRMaXN0ZW5lciA9ICh7IG1vdmUgPSB0cnVlIH0gPSB7fSkgPT4ge1xuICAgIG1vdmUgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlVG91Y2hNb3ZlLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuaGFuZGxlTW91c2VVcCk7XG4gICAgbW92ZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVNb3VzZU1vdmUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVNb3VzZVVwKTtcbiAgfVxuXG4gIHJlbW92ZUxpc3RlbmVyID0gKCkgPT4ge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRvdWNoTW92ZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5oYW5kbGVNb3VzZVVwKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVNb3VzZU1vdmUpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVNb3VzZVVwKTtcbiAgfVxuXG4gIGhhbmRsZVN0YXJ0ID0gKGUsIGZ1bmMgPSAoKSA9PiB7fSkgPT4ge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoKTtcbiAgICB0aGlzLmFkZExpc3RlbmVyKHsgbW92ZTogZmFsc2UgfSk7XG5cbiAgICAvLyBjb25zdCBhID0gK25ldyBEYXRlKCk7XG4gICAgaWYgKCFwcmVzc1RpbWVyKSB7XG4gICAgICBwcmVzc1RpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBwcmVzc1RpbWVyID0gd2luZG93LmNsZWFyVGltZW91dChwcmVzc1RpbWVyKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coK25ldyBEYXRlKCkgLSBhKTtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKCk7XG4gICAgICAgIGZ1bmMoKTtcbiAgICAgIH0sIDcwMCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlVG91Y2hTdGFydCA9IChlLCBJRCwgcHJlc3NZKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZVRvdWNoU3RhcnQnKTtcbiAgICBlLnBlcnNpc3QoKTtcbiAgICAvLyBjb25zdCB7IHRvcCB9ID0gZS5jdXJyZW50VGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgdGhpcy5oYW5kbGVTdGFydChlLCAoKSA9PiB7XG4gICAgICBjb25zdCBldmVudCA9IGUudG91Y2hlc1swXTtcbiAgICAgIGNvbnN0IHsgcGFnZVkgfSA9IGV2ZW50O1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdG9wRGVsdGFZOiBwYWdlWSAtIHByZXNzWSxcbiAgICAgICAgbW91c2VZOiBwcmVzc1ksXG4gICAgICAgIGlzUHJlc3NlZDogdHJ1ZSxcbiAgICAgICAgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkOiBJRCxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZU1vdXNlRG93biA9IChlLCBJRCwgcHJlc3NZKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coJ2hhbmRsZU1vdXNlRG93bicpO1xuICAgIGNvbnN0IHsgcGFnZVkgfSA9IGU7XG5cbiAgICB0aGlzLmhhbmRsZVN0YXJ0KGUsICgpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHBhZ2VZLCBwcmVzc1kpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHRvcERlbHRhWTogcGFnZVkgLSBwcmVzc1ksXG4gICAgICAgIG1vdXNlWTogcHJlc3NZLFxuICAgICAgICBpc1ByZXNzZWQ6IHRydWUsXG4gICAgICAgIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZDogSUQsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVUb3VjaE1vdmUgPSAoZSkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdoYW5kbGVUb3VjaE1vdmUnKTtcbiAgICBjb25zdCB7IGlzUHJlc3NlZCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIC8vIHByZXNzVGltZXIgPSBjbGVhclRpbWVvdXQocHJlc3NUaW1lcik7XG5cbiAgICBpZiAoaXNQcmVzc2VkKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmhhbmRsZU1vdXNlTW92ZShlLnRvdWNoZXNbMF0pO1xuICAgIH1cbiAgfTtcblxuICByZU9yZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCwgbmV3T3JkZXIsXG4gICAgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCBjdXJySW5kZXggPSBuZXdPcmRlci5pbmRleE9mKG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCk7XG4gICAgY29uc3QgcmVhbFJvdyA9IG5ld09yZGVyLnJlZHVjZSgocm93LCBJRCkgPT4ge1xuICAgICAgaWYgKG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCA9PT0gSUQpIHtcbiAgICAgICAgcmV0dXJuIHJvdztcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5kZXggPSBuZXdPcmRlci5pbmRleE9mKElEKTtcbiAgICAgIGNvbnN0IHsgcmVmOiB7IG9mZnNldEhlaWdodCwgb2Zmc2V0VG9wIH0sIHN0eWxlOiBjdXJyU3R5bGUgfSA9IHRoaXMuY2hpbGRyZW5NYXBbSURdO1xuICAgICAgY29uc3QgdG9wID0gb2Zmc2V0VG9wICsgY3VyclN0eWxlLnk7XG4gICAgICBjb25zdCBib3R0b20gPSB0b3AgKyBvZmZzZXRIZWlnaHQ7XG5cbiAgICAgIC8vIGNvbnN0IHsgdG9wLCBib3R0b20gfSA9IHRoaXMuY2hpbGRyZW5NYXBbSURdLnJlZi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IHsgcmVmOiBjdXJzb3IsIHN0eWxlIH0gPSB0aGlzLmNoaWxkcmVuTWFwW29yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZF07XG4gICAgICBjb25zdCB7IG9mZnNldFRvcDogY3Vyc29yT2Zmc2V0VG9wLCBvZmZzZXRIZWlnaHQ6IGN1cnNvck9mZnNldEhlaWdodCB9ID0gY3Vyc29yO1xuXG4gICAgICBjb25zdCBjdXJzb3JNaWRkbGVMaW5lID0gY3Vyc29yT2Zmc2V0VG9wICsgc3R5bGUueSArIChjdXJzb3JPZmZzZXRIZWlnaHQgLyAyKTtcblxuICAgICAgLy8gY29uc29sZS5sb2coY3Vyc29yTWlkZGxlTGluZSwgdG9wICsgKG9mZnNldEhlaWdodCAvIDQpLCBib3R0b20gLSAob2Zmc2V0SGVpZ2h0IC8gNCksIElEKTtcbiAgICAgIGlmIChcbiAgICAgICAgY3Vyc29yTWlkZGxlTGluZSA+IHRvcCArIChvZmZzZXRIZWlnaHQgLyA0KVxuICAgICAgICAmJiBjdXJzb3JNaWRkbGVMaW5lIDwgYm90dG9tIC0gKG9mZnNldEhlaWdodCAvIDQpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJvdztcbiAgICB9LCBjdXJySW5kZXgpO1xuXG4gICAgY29uc3Qgb3JpZ2luSW5kZXggPSBuZXdPcmRlci5pbmRleE9mKG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCk7XG5cbiAgICBpZiAob3JpZ2luSW5kZXggIT09IHJlYWxSb3cpIHtcbiAgICAgIGNvbnN0IG5leHROZXdPcmRlciA9IHJlaW5zZXJ0KG5ld09yZGVyLCBvcmlnaW5JbmRleCwgcmVhbFJvdyk7XG4gICAgICByZXR1cm4gbmV4dE5ld09yZGVyO1xuICAgIH1cbiAgICByZXR1cm4gbmV3T3JkZXI7XG4gIH1cblxuICBzZXRNb3VzZVkgPSBtb3VzZVkgPT4gbmV3IFByb21pc2UoKHIpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgbW91c2VZIH0sICgpID0+IHtcbiAgICAgIHNsZWVwKDMwMCkudGhlbihyKTtcbiAgICB9KTtcbiAgfSlcblxuICBoYW5kbGVNb3VzZU1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZygnaGFuZGxlTW91c2VNb3ZlJyk7XG4gICAgY29uc3QgeyBwYWdlWSB9ID0gZXZlbnQ7XG5cbiAgICBjb25zdCB7XG4gICAgICBpc1ByZXNzZWQsIHRvcERlbHRhWSwgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkLCBuZXdPcmRlcixcbiAgICB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGNvbnN0IG1vdXNlWSA9IHBhZ2VZIC0gdG9wRGVsdGFZO1xuXG4gICAgdGhpcy5zZXRNb3VzZVkobW91c2VZKTtcblxuICAgIGlmIChpc1ByZXNzZWQgJiYgIXRoaXMubW92ZWluZykge1xuICAgICAgaWYgKCtuZXcgRGF0ZSgpIC0gdGhpcy5wcmVUaW1lIDwgYW5pbUR1cmF0aW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5leHROZXdPcmRlciA9IHRoaXMucmVPcmRlcigpO1xuXG4gICAgICBpZiAobmV3T3JkZXIgIT09IG5leHROZXdPcmRlcikge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbmV3T3JkZXI6IFsuLi5uZXh0TmV3T3JkZXJdIH0pO1xuXG4gICAgICAgIHRoaXMucHJlVGltZSA9ICtuZXcgRGF0ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyB9KTtcbiAgfTtcblxuICBjaGFuZ2VEb25lID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgY2hhbmdlRG9uZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIHRoaXMuY2xlYXJNb3Rpb25zKGFuaW1EdXJhdGlvbikudGhlbigoKSA9PiB7XG4gICAgICBjb25zdCB7IG5ld09yZGVyIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IG5ld09yZGVyOiBbLi4ubmV3T3JkZXJdLCBvcmRlcjogWy4uLm5ld09yZGVyXSB9KTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB0b3BEZWx0YVk6IDAsIG1vdXNlWTogMCwgb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkOiB1bmRlZmluZWQgfSk7XG4gICAgICBjaGFuZ2VEb25lKG5ld09yZGVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZU1vdXNlVXAgPSAoZSkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdoYW5kbGVNb3VzZVVwJyk7XG4gICAgY29uc3QgeyBpc1ByZXNzZWQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBwcmVzc1RpbWVyID0gd2luZG93LmNsZWFyVGltZW91dChwcmVzc1RpbWVyKTtcbiAgICB0aGlzLnNldFN0YXRlKHsgaXNQcmVzc2VkOiBmYWxzZSB9KTtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKCk7XG5cbiAgICBpZiAoaXNQcmVzc2VkKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnb25Ecm9wJyk7XG4gICAgICB0aGlzLmNoYW5nZURvbmUoKTtcbiAgICB9XG4gIH07XG5cbiAgY2xlYXJNb3Rpb25zID1kZWxheSA9PiBuZXcgUHJvbWlzZSgocikgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5uZXh0UmVuZGVyQ2xlYXJNb3Rpb25zID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe30sIHIpO1xuICAgIH0sIGRlbGF5KTtcbiAgfSlcblxuICBnZXRDb250YWluZXIgPSAocmVmKSA9PiB7XG4gICAgdGhpcy5jb250YWluZXIgPSByZWY7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgbW91c2VZLCBpc1ByZXNzZWQsIG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCwgbmV3T3JkZXIsIG9yZGVyID0gW10sIGNoaWxkcmVuLCBuZXdDaGlsZHJlbixcbiAgICB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGNvbnN0IHtcbiAgICAgIGNsZWFyTW90aW9ucywgcHJlc3NlZE1vdGlvbnMsIG5vdFByZXNzZWRNb3Rpb25zLCBjcmVhdGVTdHlsZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IG5leHRSZW5kZXJDbGVhck1vdGlvbnMgfSA9IHRoaXM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2RyYWctY29udGFpbmVyJyl9ICR7cHJlZml4KCdtYXAtY29udGFpbmVyJyl9YCB9IHJlZj17IHRoaXMuZ2V0Q29udGFpbmVyIH0+XG4gICAgICAgIHtvcmRlci5tYXAoKElELCBpbmRleCkgPT4ge1xuICAgICAgICAgIGxldCB5ID0gMDtcbiAgICAgICAgICBjb25zdCBuZXdJbmRleCA9IG5ld09yZGVyLmluZGV4T2YoSUQpO1xuXG4gICAgICAgICAgaWYgKG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCA9PT0gSUQgJiYgIWlzUHJlc3NlZCkge1xuICAgICAgICAgIC8vIGlmIChvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQgPT09IElEICkge1xuICAgICAgICAgICAgbGV0IG5vd1kgPSAwO1xuICAgICAgICAgICAgY29uc3QgeyBzdGFydEluZGV4LCBlbmRJbmRleCB9ID0gbmV3SW5kZXggLSBpbmRleCA+IDBcbiAgICAgICAgICAgICAgPyAoeyBzdGFydEluZGV4OiBpbmRleCwgZW5kSW5kZXg6IG5ld0luZGV4IH0pXG4gICAgICAgICAgICAgIDogKHsgc3RhcnRJbmRleDogbmV3SW5kZXgsIGVuZEluZGV4OiBpbmRleCB9KTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0SW5kZXg7IGkgPCBlbmRJbmRleDsgaSsrKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICByZWY6IHsgb2Zmc2V0SGVpZ2h0IH0sXG4gICAgICAgICAgICAgIH0gPSB0aGlzLmNoaWxkcmVuTWFwWyhuZXdJbmRleCAtIGluZGV4ID4gMCA/IG5ld09yZGVyIDogb3JkZXIpW2ldXTtcbiAgICAgICAgICAgICAgbm93WSArPSBvZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB5ID0gbmV3SW5kZXggLSBpbmRleCA+IDAgPyBub3dZIDogLW5vd1k7XG4gICAgICAgICAgfSBlbHNlIGlmIChpbmRleCAhPT0gbmV3SW5kZXgpIHtcbiAgICAgICAgICAgIHkgPSAobmV3SW5kZXggLSBpbmRleCA+IDAgPyAxIDogLTEpXG4gICAgICAgICAgICAgICAgKiB0aGlzLmNoaWxkcmVuTWFwW29yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZF0ucmVmLm9mZnNldEhlaWdodDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBzdHlsZSA9IG5leHRSZW5kZXJDbGVhck1vdGlvbnNcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAuLi5jbGVhck1vdGlvbnMoKSxcbiAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkID09PSBJRCAmJiBpc1ByZXNzZWRcbiAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgLi4ucHJlc3NlZE1vdGlvbnMoKSxcbiAgICAgICAgICAgICAgICB5OiBzcHJpbmcobW91c2VZLCB7IHN0aWZmbmVzczogNTAwLCBkYW1waW5nOiA1MCB9KSxcbiAgICAgICAgICAgICAgLy8geTogbW91c2VZLFxuICAgICAgICAgICAgICB9IDoge1xuICAgICAgICAgICAgICAgIC4uLm5vdFByZXNzZWRNb3Rpb25zKCksXG4gICAgICAgICAgICAgICAgeTogc3ByaW5nKHksIHNwcmluZ0NvbmZpZyksXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxNb3Rpb24gc3R5bGU9eyBzdHlsZSB9IGtleT17IElEIH0gcmVmPXsgcmVmID0+IHRoaXMuTW90aW9uc1tJRF0gPSByZWYgfT5cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSUQsICcgJywgeSk7XG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLnRyYWNlKElELCAnICcsIHkpO1xuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NjYWxlJywgJyAnLCBzY2FsZSk7XG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2hhZG93JywgJyAnLCBzaGFkb3cpO1xuICAgICAgICAgICAgICAgKHN0eWxlcykgPT4ge1xuICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY2hpbGRyZW5NYXBbSURdKSB0aGlzLmNoaWxkcmVuTWFwW0lEXSA9IHt9O1xuICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuTWFwW0lEXS5zdHlsZSA9IHsgeTogc3R5bGVzLnkgfTtcblxuICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VEb3duPXsgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTW91c2VEb3duKGV2ZW50LCBJRCwgeSk7XG4gICAgICAgICAgICAgICAgICAgICB9IH1cbiAgICAgICAgICAgICAgICAgICAgIHJlZj17IChyZWYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbk1hcFtJRF0ucmVmID0gcmVmO1xuICAgICAgICAgICAgICAgICAgICAgfSB9XG4gICAgICAgICAgICAgICAgICAgICBvblRvdWNoU3RhcnQ9eyBldmVudCA9PiB0aGlzLmhhbmRsZVRvdWNoU3RhcnQoZXZlbnQsIElELCB5KSB9XG4gICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBgJHtwcmVmaXgoJ2dyb3VwLWl0ZW0td3JhcCcpfSAke29yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCA9PT0gSUQgJiYgaXNQcmVzc2VkID8gcHJlZml4KCdncm91cC1pdGVtLXdyYXAtcHJlc3NlZCcpIDogJyd9YCB9XG4gICAgICAgICAgICAgICAgICAgICBzdHlsZT17IHtcbiAgICAgICAgICAgICAgICAgICAgICAgLi4uY3JlYXRlU3R5bGUoeyBzdHlsZXMsIElELCBvcmlnaW5hbFBvc09mTGFzdFByZXNzZWQgfSksXG4gICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogSUQgPT09IG9yaWdpbmFsUG9zT2ZMYXN0UHJlc3NlZCA/IDk5IDogSUQsXG4gICAgICAgICAgICAgICAgICAgICB9IH0+XG4gICAgICAgICAgICAgICAgICAgICB7IGNoaWxkcmVuW0lEXSB9XG4gICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvTW90aW9uPlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5EcmFnLmRlZmF1bHRQcm9wcyA9IHtcbiAgY2hhbmdlRG9uZTogKCkgPT4ge30sXG4gIGNsZWFyTW90aW9uczogKCkgPT4gKHtcbiAgICBzY2FsZTogMSxcbiAgICBzaGFkb3c6IDAsXG4gIH0pLFxuICBwcmVzc2VkTW90aW9uczogKCkgPT4gKHtcbiAgICBzY2FsZTogc3ByaW5nKDAuNiwgc3ByaW5nQ29uZmlnKSxcbiAgICBzaGFkb3c6IHNwcmluZygxNiwgc3ByaW5nQ29uZmlnKSxcbiAgICAvLyB5OiBtb3VzZVksXG4gIH0pLFxuICBub3RQcmVzc2VkTW90aW9uczogKCkgPT4gKHtcbiAgICBzY2FsZTogc3ByaW5nKDEsIHNwcmluZ0NvbmZpZyksXG4gICAgc2hhZG93OiBzcHJpbmcoMCwgc3ByaW5nQ29uZmlnKSxcbiAgfSksXG4gIGNyZWF0ZVN0eWxlOiAoe1xuICAgIHN0eWxlczoge1xuICAgICAgc2NhbGUsXG4gICAgICBzaGFkb3csXG4gICAgICB5LFxuICAgIH0sXG4gICAgLy8gSUQsXG4gICAgLy8gb3JpZ2luYWxQb3NPZkxhc3RQcmVzc2VkLFxuICB9ID0ge30pID0+ICh7XG4gICAgYm94U2hhZG93OiBgcmdiYSgwLCAwLCAwLCAwLjIpIDBweCAke3NoYWRvd31weCAkezIgKiBzaGFkb3d9cHggMHB4YCxcbiAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgwLCAke3l9cHgsIDApIHNjYWxlKCR7c2NhbGV9KWAsXG4gICAgV2Via2l0VHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoMCwgJHt5fXB4LCAwKSBzY2FsZSgke3NjYWxlfSlgLFxuICB9KSxcbn07XG4iXX0=