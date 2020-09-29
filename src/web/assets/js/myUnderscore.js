(function () {
  var root =
    (typeof self == 'object' && self.self === self && self) ||
    (typeof global == 'object' && global.global === global && global) ||
    this ||
    {};

  //  基于可插拔的结构去写
  var _ = function (obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj; // 此时this指向_ 等价于_.wrapped = obj;
  };

  _.each = function (array, fn) {
    for (let i = 0; i < array.length; i++) {
      fn(array[i], i);
    }

    return array;
  };

  // 节流函数
  // 第一次触发立即执行
  // 间隔一段时间再执行
  // 如果在间隔内触发，会在间隔末尾再执行一次
  _.throttle = function (callback, timer) {
    var isFirst = true;
    var exeDate = +new Date();
    var timeId = null;

    return function () {
      if (isFirst) {
        callback();
        exeDate = +new Date();
        isFirst = false;
      } else {
        if (+new Date() - exeDate > timer) {
          callback();
          exeDate = +new Date();
        } else {
          if (timeId) {
            clearTimeout(timeId);
          }
          var waitDate = exeDate + timer - +new Date();
          timeId = setTimeout(() => {
            callback();
            exeDate = +new Date();
          }, waitDate);
        }
      }
    };
  };

  _.isFunction = function (obj) {
    return typeof obj == 'function' || false;
  };

  _.functions = _.methods = function (obj) {
    var names = [];

    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  _.mixin = function (obj) {
    _.each(_.functions(obj), function (name) {
      var func = (_[name] = obj[name]);
      _.prototype[name] = function () {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return chainResult(this, func.apply(_, args));
      };
    });
    return _;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  root._ = _;
})();
