;
(function() {

    var F = Function,
        UD = void(0),
        N = null;

    var Utils = window['jus'] || (window['jus'] = {});


    var isFn = function(f) { return f instanceof F },
        isS = function(s) { return (typeof s == 'string') || (s instanceof String); },
        isU = function(v) { return (typeof v == 'undefined') || v === UD; },
        isN = function(v) { return !isNaN(v) && (String(v * 1) == v); },
        isB = function(v) { return (typeof v == 'boolean'); },
        isA = function(a) { return a instanceof Array; },
        isArrLike = function(a) {
            return a && (isA(a) || (!isST(a) && ('length' in a)));
        },
        isEmpty = function(v) {
            return isNull(v) || isU(v) || !!!v || (isA(v) && !v.length);
        },
        isNull = function(v) { return (v === null); },
        isST = function(o) {
            return isS(o) || isU(o) || isN(o) || isB(o) || isNull(o);
        };

    var sliceFn = function(o, i, l) {
            return (Array.prototype.slice || (Array.prototype.slice = function(startidx, len) {
                var r = [],
                    len = Math.min(Math.max(len || 0, 0), (this.length - startidx));
                for (var i = 0; i < len; i++) {
                    r.push(this[startidx + i])
                }
                return r;
            })).call(o, i, l);
        },
        extendFn = Object.assign ? function() {
            return Object.assign.apply(Object, arguments);
        } : function(t) {
            var r = t || {};
            var args = arguments;
            if (args.length > 1) {
                args = sliceFn(args, 1)
                var arg;
                for (var i = 1, il = args.length; i < il; i++) {
                    arg = args[i];
                    if (isST(arg) || !arg) {
                        continue;
                    }
                    for (var k in arg) {
                        r[k] = arg[k];
                    }
                }
            }
            return r;
        },
        extendsCls = function(originCls, extCls) {
            var fn1 = function() {}
            fn1.prototype = originCls.prototype;
            return createCls(new fn1(), extCls);
        },
        createCls = function(proto) {
            proto = extendFn.apply(arguments);
            var fn = function() {
                if (isFn(this.__init)) {
                    this.__init.apply(this, arguments);
                }
            }
            fn.prototype = proto;

            fn.extend = function(proto1) {
                extendsCls(fn, proto1);
            }

            return fn;
        };

    var toArr = function(o) {
        if (o) {
            if (o.length) {
                try {
                    return arrSliceFn(o, 0, o.length);
                } catch (e) {
                    return [o];
                }
            } else {
                return o;
            }
        } else {
            return [o];
        }
    };

    extendFn(Utils, {
        toArr: toArr,
        isStr: isS,
        isArr: isA,
        empty: isEmpty,
        isNum: isN,
        isBoolean: isB,
        slice: sliceFn,
        createCls: createCls,
        isUndefined: isU,
        isSimple: isST,
        isArrLike: isArrLike
    });

})();