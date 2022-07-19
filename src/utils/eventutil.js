const EventUtil = {
  addEventListener: function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  removeEventListener: function (element, type, handler) {
    if (element.addEventListener) {
      element.removeEventListener(type, handler);
    } else if (element.attachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  },
  getEvent: function (e) {
    return e || window.event;
  },
  getTarget: function (e) {
    return e.target || e.srcElement;
  },
};
