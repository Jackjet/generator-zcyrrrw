'use strict';

const event = (function(){
  let  namespaceCache = {},
      listenerFnList = {},
      currentNamesapce = "default",
      setNamespace,
      on,
      off,
      trigger;

  function _getCurrentNamespace(){
    return namespaceCache[currentNamesapce] || (namespaceCache[currentNamesapce] = {});
  }

  function _resetNamespace(){
    currentNamesapce = 'default';
  }


  //设置命名空间
  setNamespace = function(namespace){
    currentNamesapce = namespace;
    return this;
  };

  //注册事件
  on = function(key, fn){
    listenerFnList = _getCurrentNamespace();

    if(!listenerFnList[key]){
      listenerFnList[key] = [];
    }

    listenerFnList[key].push(fn);
  };

  //解绑事件
  off = function(key, fn){
    listenerFnList = _getCurrentNamespace();

    let fns = listenerFnList[key];
    if(!fns || fns.length == 0){
      return false;
    }

    if(!fn){
      fns && (fns.length = 0);
    }

    for(let i = 0; i < fns.length; i++){
      if(fns[i] === fn){
        fns.splice(i,1);
      }
    }
  };

  //触发事件
  trigger = function(){
    listenerFnList = _getCurrentNamespace();

    let key = Array.prototype.shift.call(arguments),
        triggerFn = listenerFnList[key];

    if(!triggerFn || triggerFn.length == 0){
      return false;
    }

    for(let i = 0; i < triggerFn.length; i++){
      triggerFn[i].apply(this, arguments);
    }

    _resetNamespace();
  };


  return {
    setNamespace,
    on,
    off,
    trigger
  };

})();

export default event;
