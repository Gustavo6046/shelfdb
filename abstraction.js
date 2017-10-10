// Generated by CoffeeScript 1.12.6
var AbstractClassError, AbstractFunction, AbstractStaticFunction, AbstractionError, BadInheritanceError, abstractClass, isImplementation,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

AbstractFunction = (function() {
  var check, constructor;

  function AbstractFunction() {}

  constructor = function(name) {
    this.name = name;
  };

  check = function(cls) {
    return cls.prototype[AbstractFunction.name] != null;
  };

  return AbstractFunction;

})();

AbstractStaticFunction = (function(superClass) {
  var check;

  extend(AbstractStaticFunction, superClass);

  function AbstractStaticFunction() {
    return AbstractStaticFunction.__super__.constructor.apply(this, arguments);
  }

  check = function(cls) {
    return cls[AbstractStaticFunction.name] != null;
  };

  return AbstractStaticFunction;

})(AbstractFunction);

AbstractionError = (function(superClass) {
  extend(AbstractionError, superClass);

  function AbstractionError() {
    return AbstractionError.__super__.constructor.apply(this, arguments);
  }

  return AbstractionError;

})(Error);

AbstractClassError = (function(superClass) {
  extend(AbstractClassError, superClass);

  function AbstractClassError() {
    return AbstractClassError.__super__.constructor.apply(this, arguments);
  }

  return AbstractClassError;

})(AbstractionError);

BadInheritanceError = (function(superClass) {
  extend(BadInheritanceError, superClass);

  function BadInheritanceError() {
    return BadInheritanceError.__super__.constructor.apply(this, arguments);
  }

  return BadInheritanceError;

})(AbstractionError);

abstractClass = function(cls, onApply) {
  var AbstractedClass, k, v;
  AbstractedClass = (function() {
    function AbstractedClass() {
      throw new AbstractClassError('Can\'t instantiate abstract classes!');
    }

    AbstractedClass.apply = function(otherClass) {
      var k, missingFuncs, v;
      missingFuncs = [];
      for (k in cls) {
        v = cls[k];
        if (v instanceof AbstractFunction && (!v.check(otherClass))) {
          missingFuncs.push(k);
        } else if (v instanceof AbstractStaticFunction) {
          otherClass[k] = v;
        } else if (v instanceof AbstractFunction) {
          otherClass.prototype[k] = v;
        } else if (v != null) {
          otherClass[k] = v;
        }
      }
      if (missingFuncs.length > 0) {
        throw new BadInheritanceError("Following functions missing in the class definition for " + otherClass.name + ", which inherits " + cls.name + ": " + (issingFuncs.join(' ')));
      }
      if (onApply != null) {
        onApply(otherClass);
      }
      return otherClass;
    };

    return AbstractedClass;

  })();
  for (k in AbstractedClass) {
    v = AbstractedClass[k];
    if (v == null) {
      AbstractedClass['@abs'][k] = v;
      if (k.startsWith('F_') && k.length > 2) {
        AbstractedClass[k.slice(2)] = new AbstractFunction(k.slice(2));
        delete AbstractedClass[k];
      } else if (k.startsWith('S_') && k.length > 2) {
        AbstractedClass[k.slice(2)] = new AbstractStaticFunction(k.slice(2));
        delete AbstractedClass[k];
      }
    }
  }
  if (cls.__absInheritance__ != null) {
    AbstractedClass.__absInheritance__ = cls.__absInheritance__;
    AbstractedClass.__absInheritance__.push(cls);
  } else {
    AbstractedClass.__absInheritance__ = [cls];
  }
  AbstractedClass.name = cls.name + "_Abstracted";
  return AbstractedClass;
};

isImplementation = function(ins, cls) {
  return (ins.constructor.__absInheritance__ != null) && indexOf.call(ins.constructor.__absInheritance__, cls) >= 0;
};

module.exports = {
  abstractClass: abstractClass,
  isImplementation: isImplementation,
  AbstractFunction: AbstractFunction,
  AbstractClassError: AbstractClassError,
  BadInheritanceError: BadInheritanceError
};
