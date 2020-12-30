function debounce(e, t, i) {
    "use strict";
    var a;
    return function () {
        var r = this
            , n = arguments
            , s = function () {
                a = null, i || e.apply(r, n)
            }
            , o = i && !a;
        clearTimeout(a), a = setTimeout(s, t), o && e.apply(r, n)
    }
}! function () {
    "use strict";
    /**
     * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
     *
     * @codingstandard ftlabs-jsv2
     * @copyright The Financial Times Limited [All Rights Reserved]
     * @license MIT License (see LICENSE.txt)
     */
    function e(t, a) {
        function r(e, t) {
            return function () {
                return e.apply(t, arguments)
            }
        }
        var n;
        if (a = a || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = a.touchBoundary || 10, this.layer = t, this.tapDelay = a.tapDelay || 200, this.tapTimeout = a.tapTimeout || 700, !e.notNeeded(t)) {
            for (var s = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], o = this, l = 0, u = s.length; u > l; l++) o[s[l]] = r(o[s[l]], o);
            i && (t.addEventListener("mouseover", this.onMouse, !0), t.addEventListener("mousedown", this.onMouse, !0), t.addEventListener("mouseup", this.onMouse, !0)), t.addEventListener("click", this.onClick, !0), t.addEventListener("touchstart", this.onTouchStart, !1), t.addEventListener("touchmove", this.onTouchMove, !1), t.addEventListener("touchend", this.onTouchEnd, !1), t.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (t.removeEventListener = function (e, i, a) {
                var r = Node.prototype.removeEventListener;
                "click" === e ? r.call(t, e, i.hijacked || i, a) : r.call(t, e, i, a)
            }, t.addEventListener = function (e, i, a) {
                var r = Node.prototype.addEventListener;
                "click" === e ? r.call(t, e, i.hijacked || (i.hijacked = function (e) {
                    e.propagationStopped || i(e)
                }), a) : r.call(t, e, i, a)
            }), "function" == typeof t.onclick && (n = t.onclick, t.addEventListener("click", function (e) {
                n(e)
            }, !1), t.onclick = null)
        }
    }
    var t = navigator.userAgent.indexOf("Windows Phone") >= 0
        , i = navigator.userAgent.indexOf("Android") > 0 && !t
        , a = /iP(ad|hone|od)/.test(navigator.userAgent) && !t
        , r = a && /OS 4_\d(_\d)?/.test(navigator.userAgent)
        , n = a && /OS [6-7]_\d/.test(navigator.userAgent)
        , s = navigator.userAgent.indexOf("BB10") > 0;
    e.prototype.needsClick = function (e) {
        switch (e.nodeName.toLowerCase()) {
        case "button":
        case "select":
        case "textarea":
            if (e.disabled) return !0;
            break;
        case "input":
            if (a && "file" === e.type || e.disabled) return !0;
            break;
        case "label":
        case "iframe":
        case "video":
            return !0
        }
        return /\bneedsclick\b/.test(e.className)
    }, e.prototype.needsFocus = function (e) {
        switch (e.nodeName.toLowerCase()) {
        case "textarea":
            return !0;
        case "select":
            return !i;
        case "input":
            switch (e.type) {
            case "button":
            case "checkbox":
            case "file":
            case "image":
            case "radio":
            case "submit":
                return !1
            }
            return !e.disabled && !e.readOnly;
        default:
            return /\bneedsfocus\b/.test(e.className)
        }
    }, e.prototype.sendClick = function (e, t) {
        var i, a;
        document.activeElement && document.activeElement !== e && document.activeElement.blur(), a = t.changedTouches[0], i = document.createEvent("MouseEvents"), i.initMouseEvent(this.determineEventType(e), !0, !0, window, 1, a.screenX, a.screenY, a.clientX, a.clientY, !1, !1, !1, !1, 0, null), i.forwardedTouchEvent = !0, e.dispatchEvent(i)
    }, e.prototype.determineEventType = function (e) {
        return i && "select" === e.tagName.toLowerCase() ? "mousedown" : "click"
    }, e.prototype.focus = function (e) {
        var t;
        a && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type && "month" !== e.type ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
    }, e.prototype.updateScrollParent = function (e) {
        var t, i;
        if (t = e.fastClickScrollParent, !t || !t.contains(e)) {
            i = e;
            do {
                if (i.scrollHeight > i.offsetHeight) {
                    t = i, e.fastClickScrollParent = i;
                    break
                }
                i = i.parentElement
            } while (i)
        }
        t && (t.fastClickLastScrollTop = t.scrollTop)
    }, e.prototype.getTargetElementFromEventTarget = function (e) {
        return e.nodeType === Node.TEXT_NODE ? e.parentNode : e
    }, e.prototype.onTouchStart = function (e) {
        var t, i, n;
        if (e.targetTouches.length > 1) return !0;
        if (t = this.getTargetElementFromEventTarget(e.target), i = e.targetTouches[0], a) {
            if (n = window.getSelection(), n.rangeCount && !n.isCollapsed) return !0;
            if (!r) {
                if (i.identifier && i.identifier === this.lastTouchIdentifier) return e.preventDefault(), !1;
                this.lastTouchIdentifier = i.identifier, this.updateScrollParent(t)
            }
        }
        return this.trackingClick = !0, this.trackingClickStart = e.timeStamp, this.targetElement = t, this.touchStartX = i.pageX, this.touchStartY = i.pageY, e.timeStamp - this.lastClickTime < this.tapDelay && e.preventDefault(), !0
    }, e.prototype.touchHasMoved = function (e) {
        var t = e.changedTouches[0]
            , i = this.touchBoundary;
        return Math.abs(t.pageX - this.touchStartX) > i || Math.abs(t.pageY - this.touchStartY) > i ? !0 : !1
    }, e.prototype.onTouchMove = function (e) {
        return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
    }, e.prototype.findControl = function (e) {
        return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }, e.prototype.onTouchEnd = function (e) {
        var t, s, o, l, u, d = this.targetElement;
        if (!this.trackingClick) return !0;
        if (e.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
        if (e.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
        if (this.cancelNextClick = !1, this.lastClickTime = e.timeStamp, s = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, n && (u = e.changedTouches[0], d = document.elementFromPoint(u.pageX - window.pageXOffset, u.pageY - window.pageYOffset) || d, d.fastClickScrollParent = this.targetElement.fastClickScrollParent), o = d.tagName.toLowerCase(), "label" === o) {
            if (t = this.findControl(d)) {
                if (this.focus(d), i) return !1;
                d = t
            }
        }
        else if (this.needsFocus(d)) return e.timeStamp - s > 100 || a && window.top !== window && "input" === o ? (this.targetElement = null, !1) : (this.focus(d), this.sendClick(d, e), a && "select" === o || (this.targetElement = null, e.preventDefault()), !1);
        return a && !r && (l = d.fastClickScrollParent, l && l.fastClickLastScrollTop !== l.scrollTop) ? !0 : (this.needsClick(d) || (e.preventDefault(), this.sendClick(d, e)), !1)
    }, e.prototype.onTouchCancel = function () {
        this.trackingClick = !1, this.targetElement = null
    }, e.prototype.onMouse = function (e) {
        return this.targetElement ? e.forwardedTouchEvent ? !0 : e.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), !1) : !0 : !0
    }, e.prototype.onClick = function (e) {
        var t;
        return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === e.target.type && 0 === e.detail ? !0 : (t = this.onMouse(e), t || (this.targetElement = null), t)
    }, e.prototype.destroy = function () {
        var e = this.layer;
        i && (e.removeEventListener("mouseover", this.onMouse, !0), e.removeEventListener("mousedown", this.onMouse, !0), e.removeEventListener("mouseup", this.onMouse, !0)), e.removeEventListener("click", this.onClick, !0), e.removeEventListener("touchstart", this.onTouchStart, !1), e.removeEventListener("touchmove", this.onTouchMove, !1), e.removeEventListener("touchend", this.onTouchEnd, !1), e.removeEventListener("touchcancel", this.onTouchCancel, !1)
    }, e.notNeeded = function (e) {
        var t, a, r, n;
        if ("undefined" == typeof window.ontouchstart) return !0;
        if (a = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
            if (!i) return !0;
            if (t = document.querySelector("meta[name=viewport]")) {
                if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
                if (a > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
            }
        }
        if (s && (r = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), r[1] >= 10 && r[2] >= 3 && (t = document.querySelector("meta[name=viewport]")))) {
            if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
            if (document.documentElement.scrollWidth <= window.outerWidth) return !0
        }
        return "none" === e.style.msTouchAction || "manipulation" === e.style.touchAction ? !0 : (n = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], n >= 27 && (t = document.querySelector("meta[name=viewport]"), t && (-1 !== t.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === e.style.touchAction || "manipulation" === e.style.touchAction ? !0 : !1)
    }, e.attach = function (t, i) {
        return new e(t, i)
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function () {
        return e
    }) : "undefined" != typeof module && module.exports ? (module.exports = e.attach, module.exports.FastClick = e) : window.FastClick = e
}()
, function (e) {
    function t(e) {
        var t = e.length
            , i = $.type(e);
        return "function" === i || $.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === i || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }
    if (!e.jQuery) {
        var $ = function (e, t) {
            return new $.fn.init(e, t)
        };
        $.isWindow = function (e) {
            return null != e && e == e.window
        }, $.type = function (e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? a[n.call(e)] || "object" : typeof e
        }, $.isArray = Array.isArray || function (e) {
            return "array" === $.type(e)
        }, $.isPlainObject = function (e) {
            var t;
            if (!e || "object" !== $.type(e) || e.nodeType || $.isWindow(e)) return !1;
            try {
                if (e.constructor && !r.call(e, "constructor") && !r.call(e.constructor.prototype, "isPrototypeOf")) return !1
            }
            catch (i) {
                return !1
            }
            for (t in e);
            return void 0 === t || r.call(e, t)
        }, $.each = function (e, i, a) {
            var r, n = 0
                , s = e.length
                , o = t(e);
            if (a) {
                if (o)
                    for (; s > n && (r = i.apply(e[n], a), r !== !1); n++);
                else
                    for (n in e)
                        if (r = i.apply(e[n], a), r === !1) break
            }
            else if (o)
                for (; s > n && (r = i.call(e[n], n, e[n]), r !== !1); n++);
            else
                for (n in e)
                    if (r = i.call(e[n], n, e[n]), r === !1) break; return e
        }, $.data = function (e, t, a) {
            if (void 0 === a) {
                var r = e[$.expando]
                    , n = r && i[r];
                if (void 0 === t) return n;
                if (n && t in n) return n[t]
            }
            else if (void 0 !== t) {
                var r = e[$.expando] || (e[$.expando] = ++$.uuid);
                return i[r] = i[r] || {}, i[r][t] = a, a
            }
        }, $.removeData = function (e, t) {
            var a = e[$.expando]
                , r = a && i[a];
            r && $.each(t, function (e, t) {
                delete r[t]
            })
        }, $.extend = function () {
            var e, t, i, a, r, n, s = arguments[0] || {}
                , o = 1
                , l = arguments.length
                , u = !1;
            for ("boolean" == typeof s && (u = s, s = arguments[o] || {}, o++), "object" != typeof s && "function" !== $.type(s) && (s = {}), o === l && (s = this, o--); l > o; o++)
                if (null != (r = arguments[o]))
                    for (a in r) e = s[a], i = r[a], s !== i && (u && i && ($.isPlainObject(i) || (t = $.isArray(i))) ? (t ? (t = !1, n = e && $.isArray(e) ? e : []) : n = e && $.isPlainObject(e) ? e : {}, s[a] = $.extend(u, n, i)) : void 0 !== i && (s[a] = i));
            return s
        }, $.queue = function (e, i, a) {
            function r(e, i) {
                var a = i || [];
                return null != e && (t(Object(e)) ? ! function (e, t) {
                    for (var i = +t.length, a = 0, r = e.length; i > a;) e[r++] = t[a++];
                    if (i !== i)
                        for (; void 0 !== t[a];) e[r++] = t[a++];
                    return e.length = r, e
                }(a, "string" == typeof e ? [e] : e) : [].push.call(a, e)), a
            }
            if (e) {
                i = (i || "fx") + "queue";
                var n = $.data(e, i);
                return a ? (!n || $.isArray(a) ? n = $.data(e, i, r(a)) : n.push(a), n) : n || []
            }
        }, $.dequeue = function (e, t) {
            $.each(e.nodeType ? [e] : e, function (e, i) {
                t = t || "fx";
                var a = $.queue(i, t)
                    , r = a.shift();
                "inprogress" === r && (r = a.shift()), r && ("fx" === t && a.unshift("inprogress"), r.call(i, function () {
                    $.dequeue(i, t)
                }))
            })
        }, $.fn = $.prototype = {
            init: function (e) {
                if (e.nodeType) return this[0] = e, this;
                throw new Error("Not a DOM node.")
            }
            , offset: function () {
                var t = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
                    top: 0
                    , left: 0
                };
                return {
                    top: t.top + (e.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0)
                    , left: t.left + (e.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
                }
            }
            , position: function () {
                function e() {
                    for (var e = this.offsetParent || document; e && "html" === !e.nodeType.toLowerCase && "static" === e.style.position;) e = e.offsetParent;
                    return e || document
                }
                var t = this[0]
                    , e = e.apply(t)
                    , i = this.offset()
                    , a = /^(?:body|html)$/i.test(e.nodeName) ? {
                        top: 0
                        , left: 0
                    } : $(e).offset();
                return i.top -= parseFloat(t.style.marginTop) || 0, i.left -= parseFloat(t.style.marginLeft) || 0, e.style && (a.top += parseFloat(e.style.borderTopWidth) || 0, a.left += parseFloat(e.style.borderLeftWidth) || 0), {
                    top: i.top - a.top
                    , left: i.left - a.left
                }
            }
        };
        var i = {};
        $.expando = "velocity" + (new Date).getTime(), $.uuid = 0;
        for (var a = {}, r = a.hasOwnProperty, n = a.toString, s = "Boolean Number String Function Array Date RegExp Object Error".split(" "), o = 0; o < s.length; o++) a["[object " + s[o] + "]"] = s[o].toLowerCase();
        $.fn.init.prototype = $.fn, e.Velocity = {
            Utilities: $
        }
    }
}(window)
, function (e) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : e()
}(function () {
    return function (e, t, i, a) {
        function r(e) {
            for (var t = -1, i = e ? e.length : 0, a = []; ++t < i;) {
                var r = e[t];
                r && a.push(r)
            }
            return a
        }

        function n(e) {
            return h.isWrapped(e) ? e = [].slice.call(e) : h.isNode(e) && (e = [e]), e
        }

        function s(e) {
            var t = $.data(e, "velocity");
            return null === t ? a : t
        }

        function o(e) {
            return function (t) {
                return Math.round(t * e) * (1 / e)
            }
        }

        function l(e, i, a, r) {
            function n(e, t) {
                return 1 - 3 * t + 3 * e
            }

            function s(e, t) {
                return 3 * t - 6 * e
            }

            function o(e) {
                return 3 * e
            }

            function l(e, t, i) {
                return ((n(t, i) * e + s(t, i)) * e + o(t)) * e
            }

            function u(e, t, i) {
                return 3 * n(t, i) * e * e + 2 * s(t, i) * e + o(t)
            }

            function d(t, i) {
                for (var r = 0; m > r; ++r) {
                    var n = u(i, e, a);
                    if (0 === n) return i;
                    var s = l(i, e, a) - t;
                    i -= s / n
                }
                return i
            }

            function c() {
                for (var t = 0; w > t; ++t) _[t] = l(t * b, e, a)
            }

            function p(t, i, r) {
                var n, s, o = 0;
                do s = i + (r - i) / 2, n = l(s, e, a) - t, n > 0 ? r = s : i = s; while (Math.abs(n) > v && ++o < y);
                return s
            }

            function f(t) {
                for (var i = 0, r = 1, n = w - 1; r != n && _[r] <= t; ++r) i += b;
                --r;
                var s = (t - _[r]) / (_[r + 1] - _[r])
                    , o = i + s * b
                    , l = u(o, e, a);
                return l >= g ? d(t, o) : 0 == l ? o : p(t, i, i + b)
            }

            function h() {
                S = !0, (e != i || a != r) && c()
            }
            var m = 4
                , g = .001
                , v = 1e-7
                , y = 10
                , w = 11
                , b = 1 / (w - 1)
                , x = "Float32Array" in t;
            if (4 !== arguments.length) return !1;
            for (var C = 0; 4 > C; ++C)
                if ("number" != typeof arguments[C] || isNaN(arguments[C]) || !isFinite(arguments[C])) return !1;
            e = Math.min(e, 1), a = Math.min(a, 1), e = Math.max(e, 0), a = Math.max(a, 0);
            var _ = x ? new Float32Array(w) : new Array(w)
                , S = !1
                , T = function (t) {
                    return S || h(), e === i && a === r ? t : 0 === t ? 0 : 1 === t ? 1 : l(f(t), i, r)
                };
            T.getControlPoints = function () {
                return [{
                    x: e
                    , y: i
                }, {
                    x: a
                    , y: r
                }]
            };
            var k = "generateBezier(" + [e, i, a, r] + ")";
            return T.toString = function () {
                return k
            }, T
        }

        function u(e, t) {
            var i = e;
            return h.isString(e) ? y.Easings[e] || (i = !1) : i = h.isArray(e) && 1 === e.length ? o.apply(null, e) : h.isArray(e) && 2 === e.length ? w.apply(null, e.concat([t])) : h.isArray(e) && 4 === e.length ? l.apply(null, e) : !1, i === !1 && (i = y.Easings[y.defaults.easing] ? y.defaults.easing : v), i
        }

        function d(e) {
            if (e) {
                var t = (new Date).getTime()
                    , i = y.State.calls.length;
                i > 1e4 && (y.State.calls = r(y.State.calls));
                for (var n = 0; i > n; n++)
                    if (y.State.calls[n]) {
                        var o = y.State.calls[n]
                            , l = o[0]
                            , u = o[2]
                            , p = o[3]
                            , f = !!p
                            , m = null;
                        p || (p = y.State.calls[n][3] = t - 16);
                        for (var g = Math.min((t - p) / u.duration, 1), v = 0, w = l.length; w > v; v++) {
                            var x = l[v]
                                , _ = x.element;
                            if (s(_)) {
                                var S = !1;
                                if (u.display !== a && null !== u.display && "none" !== u.display) {
                                    if ("flex" === u.display) {
                                        var T = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                                        $.each(T, function (e, t) {
                                            b.setPropertyValue(_, "display", t)
                                        })
                                    }
                                    b.setPropertyValue(_, "display", u.display)
                                }
                                u.visibility !== a && "hidden" !== u.visibility && b.setPropertyValue(_, "visibility", u.visibility);
                                for (var k in x)
                                    if ("element" !== k) {
                                        var P = x[k]
                                            , E, A = h.isString(P.easing) ? y.Easings[P.easing] : P.easing;
                                        if (1 === g) E = P.endValue;
                                        else {
                                            var F = P.endValue - P.startValue;
                                            if (E = P.startValue + F * A(g, u, F), !f && E === P.currentValue) continue
                                        }
                                        if (P.currentValue = E, "tween" === k) m = E;
                                        else {
                                            if (b.Hooks.registered[k]) {
                                                var O = b.Hooks.getRoot(k)
                                                    , I = s(_).rootPropertyValueCache[O];
                                                I && (P.rootPropertyValue = I)
                                            }
                                            var M = b.setPropertyValue(_, k, P.currentValue + (0 === parseFloat(E) ? "" : P.unitType), P.rootPropertyValue, P.scrollData);
                                            b.Hooks.registered[k] && (b.Normalizations.registered[O] ? s(_).rootPropertyValueCache[O] = b.Normalizations.registered[O]("extract", null, M[1]) : s(_).rootPropertyValueCache[O] = M[1]), "transform" === M[0] && (S = !0)
                                        }
                                    }
                                u.mobileHA && s(_).transformCache.translate3d === a && (s(_).transformCache.translate3d = "(0px, 0px, 0px)", S = !0), S && b.flushTransformCache(_)
                            }
                        }
                        u.display !== a && "none" !== u.display && (y.State.calls[n][2].display = !1), u.visibility !== a && "hidden" !== u.visibility && (y.State.calls[n][2].visibility = !1), u.progress && u.progress.call(o[1], o[1], g, Math.max(0, p + u.duration - t), p, m), 1 === g && c(n)
                    }
            }
            y.State.isTicking && C(d)
        }

        function c(e, t) {
            if (!y.State.calls[e]) return !1;
            for (var i = y.State.calls[e][0], r = y.State.calls[e][1], n = y.State.calls[e][2], o = y.State.calls[e][4], l = !1, u = 0, d = i.length; d > u; u++) {
                var c = i[u].element;
                if (t || n.loop || ("none" === n.display && b.setPropertyValue(c, "display", n.display), "hidden" === n.visibility && b.setPropertyValue(c, "visibility", n.visibility)), n.loop !== !0 && ($.queue(c)[1] === a || !/\.velocityQueueEntryFlag/i.test($.queue(c)[1])) && s(c)) {
                    s(c).isAnimating = !1, s(c).rootPropertyValueCache = {};
                    var p = !1;
                    $.each(b.Lists.transforms3D, function (e, t) {
                        var i = /^scale/.test(t) ? 1 : 0
                            , r = s(c).transformCache[t];
                        s(c).transformCache[t] !== a && new RegExp("^\\(" + i + "[^.]").test(r) && (p = !0, delete s(c).transformCache[t])
                    }), n.mobileHA && (p = !0, delete s(c).transformCache.translate3d), p && b.flushTransformCache(c), b.Values.removeClass(c, "velocity-animating")
                }
                if (!t && n.complete && !n.loop && u === d - 1) try {
                    n.complete.call(r, r)
                }
                catch (f) {
                    setTimeout(function () {
                        throw f
                    }, 1)
                }
                o && n.loop !== !0 && o(r), s(c) && n.loop === !0 && !t && ($.each(s(c).tweensContainer, function (e, t) {
                    /^rotate/.test(e) && 360 === parseFloat(t.endValue) && (t.endValue = 0, t.startValue = 360), /^backgroundPosition/.test(e) && 100 === parseFloat(t.endValue) && "%" === t.unitType && (t.endValue = 0, t.startValue = 100)
                }), y(c, "reverse", {
                    loop: !0
                    , delay: n.delay
                })), n.queue !== !1 && $.dequeue(c, n.queue)
            }
            y.State.calls[e] = !1;
            for (var h = 0, m = y.State.calls.length; m > h; h++)
                if (y.State.calls[h] !== !1) {
                    l = !0;
                    break
                }
            l === !1 && (y.State.isTicking = !1, delete y.State.calls, y.State.calls = [])
        }
        var p = function () {
                if (i.documentMode) return i.documentMode;
                for (var e = 7; e > 4; e--) {
                    var t = i.createElement("div");
                    if (t.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->", t.getElementsByTagName("span").length) return t = null, e
                }
                return a
            }()
            , f = function () {
                var e = 0;
                return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function (t) {
                    var i = (new Date).getTime()
                        , a;
                    return a = Math.max(0, 16 - (i - e)), e = i + a, setTimeout(function () {
                        t(i + a)
                    }, a)
                }
            }()
            , h = {
                isString: function (e) {
                    return "string" == typeof e
                }
                , isArray: Array.isArray || function (e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                }
                , isFunction: function (e) {
                    return "[object Function]" === Object.prototype.toString.call(e)
                }
                , isNode: function (e) {
                    return e && e.nodeType
                }
                , isNodeList: function (e) {
                    return "object" == typeof e && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e)) && e.length !== a && (0 === e.length || "object" == typeof e[0] && e[0].nodeType > 0)
                }
                , isWrapped: function (e) {
                    return e && (e.jquery || t.Zepto && t.Zepto.zepto.isZ(e))
                }
                , isSVG: function (e) {
                    return t.SVGElement && e instanceof t.SVGElement
                }
                , isEmptyObject: function (e) {
                    for (var t in e) return !1;
                    return !0
                }
            }
            , $, m = !1;
        if (e.fn && e.fn.jquery ? ($ = e, m = !0) : $ = t.Velocity.Utilities, 8 >= p && !m) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
        if (7 >= p) return void(jQuery.fn.velocity = jQuery.fn.animate);
        var g = 400
            , v = "swing"
            , y = {
                State: {
                    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
                    , isAndroid: /Android/i.test(navigator.userAgent)
                    , isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent)
                    , isChrome: t.chrome
                    , isFirefox: /Firefox/i.test(navigator.userAgent)
                    , prefixElement: i.createElement("div")
                    , prefixMatches: {}
                    , scrollAnchor: null
                    , scrollPropertyLeft: null
                    , scrollPropertyTop: null
                    , isTicking: !1
                    , calls: []
                }
                , CSS: {}
                , Utilities: $
                , Redirects: {}
                , Easings: {}
                , Promise: t.Promise
                , defaults: {
                    queue: ""
                    , duration: g
                    , easing: v
                    , begin: a
                    , complete: a
                    , progress: a
                    , display: a
                    , visibility: a
                    , loop: !1
                    , delay: !1
                    , mobileHA: !0
                    , _cacheValues: !0
                }
                , init: function (e) {
                    $.data(e, "velocity", {
                        isSVG: h.isSVG(e)
                        , isAnimating: !1
                        , computedStyle: null
                        , tweensContainer: null
                        , rootPropertyValueCache: {}
                        , transformCache: {}
                    })
                }
                , hook: null
                , mock: !1
                , version: {
                    major: 1
                    , minor: 2
                    , patch: 2
                }
                , debug: !1
            };
        t.pageYOffset !== a ? (y.State.scrollAnchor = t, y.State.scrollPropertyLeft = "pageXOffset", y.State.scrollPropertyTop = "pageYOffset") : (y.State.scrollAnchor = i.documentElement || i.body.parentNode || i.body, y.State.scrollPropertyLeft = "scrollLeft", y.State.scrollPropertyTop = "scrollTop");
        var w = function () {
            function e(e) {
                return -e.tension * e.x - e.friction * e.v
            }

            function t(t, i, a) {
                var r = {
                    x: t.x + a.dx * i
                    , v: t.v + a.dv * i
                    , tension: t.tension
                    , friction: t.friction
                };
                return {
                    dx: r.v
                    , dv: e(r)
                }
            }

            function i(i, a) {
                var r = {
                        dx: i.v
                        , dv: e(i)
                    }
                    , n = t(i, .5 * a, r)
                    , s = t(i, .5 * a, n)
                    , o = t(i, a, s)
                    , l = 1 / 6 * (r.dx + 2 * (n.dx + s.dx) + o.dx)
                    , u = 1 / 6 * (r.dv + 2 * (n.dv + s.dv) + o.dv);
                return i.x = i.x + l * a, i.v = i.v + u * a, i
            }
            return function a(e, t, r) {
                var n = {
                        x: -1
                        , v: 0
                        , tension: null
                        , friction: null
                    }
                    , s = [0]
                    , o = 0
                    , l = 1e-4
                    , u = .016
                    , d, c, p;
                for (e = parseFloat(e) || 500, t = parseFloat(t) || 20, r = r || null, n.tension = e, n.friction = t, d = null !== r, d ? (o = a(e, t), c = o / r * u) : c = u;;)
                    if (p = i(p || n, c), s.push(1 + p.x), o += 16, !(Math.abs(p.x) > l && Math.abs(p.v) > l)) break;
                return d ? function (e) {
                    return s[e * (s.length - 1) | 0]
                } : o
            }
        }();
        y.Easings = {
            linear: function (e) {
                return e
            }
            , swing: function (e) {
                return .5 - Math.cos(e * Math.PI) / 2
            }
            , spring: function (e) {
                return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e)
            }
        }, $.each([["ease", [.25, .1, .25, 1]], ["ease-in", [.42, 0, 1, 1]], ["ease-out", [0, 0, .58, 1]], ["ease-in-out", [.42, 0, .58, 1]], ["easeInSine", [.47, 0, .745, .715]], ["easeOutSine", [.39, .575, .565, 1]], ["easeInOutSine", [.445, .05, .55, .95]], ["easeInQuad", [.55, .085, .68, .53]], ["easeOutQuad", [.25, .46, .45, .94]], ["easeInOutQuad", [.455, .03, .515, .955]], ["easeInCubic", [.55, .055, .675, .19]], ["easeOutCubic", [.215, .61, .355, 1]], ["easeInOutCubic", [.645, .045, .355, 1]], ["easeInQuart", [.895, .03, .685, .22]], ["easeOutQuart", [.165, .84, .44, 1]], ["easeInOutQuart", [.77, 0, .175, 1]], ["easeInQuint", [.755, .05, .855, .06]], ["easeOutQuint", [.23, 1, .32, 1]], ["easeInOutQuint", [.86, 0, .07, 1]], ["easeInExpo", [.95, .05, .795, .035]], ["easeOutExpo", [.19, 1, .22, 1]], ["easeInOutExpo", [1, 0, 0, 1]], ["easeInCirc", [.6, .04, .98, .335]], ["easeOutCirc", [.075, .82, .165, 1]], ["easeInOutCirc", [.785, .135, .15, .86]]], function (e, t) {
            y.Easings[t[0]] = l.apply(null, t[1])
        });
        var b = y.CSS = {
            RegEx: {
                isHex: /^#([A-f\d]{3}){1,2}$/i
                , valueUnwrap: /^[A-z]+\((.*)\)$/i
                , wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/
                , valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
            }
            , Lists: {
                colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"]
                , transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"]
                , transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
            }
            , Hooks: {
                templates: {
                    textShadow: ["Color X Y Blur", "black 0px 0px 0px"]
                    , boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"]
                    , clip: ["Top Right Bottom Left", "0px 0px 0px 0px"]
                    , backgroundPosition: ["X Y", "0% 0%"]
                    , transformOrigin: ["X Y Z", "50% 50% 0px"]
                    , perspectiveOrigin: ["X Y", "50% 50%"]
                }
                , registered: {}
                , register: function () {
                    for (var e = 0; e < b.Lists.colors.length; e++) {
                        var t = "color" === b.Lists.colors[e] ? "0 0 0 1" : "255 255 255 1";
                        b.Hooks.templates[b.Lists.colors[e]] = ["Red Green Blue Alpha", t]
                    }
                    var i, a, r;
                    if (p)
                        for (i in b.Hooks.templates) {
                            a = b.Hooks.templates[i], r = a[0].split(" ");
                            var n = a[1].match(b.RegEx.valueSplit);
                            "Color" === r[0] && (r.push(r.shift()), n.push(n.shift()), b.Hooks.templates[i] = [r.join(" "), n.join(" ")])
                        }
                    for (i in b.Hooks.templates) {
                        a = b.Hooks.templates[i], r = a[0].split(" ");
                        for (var e in r) {
                            var s = i + r[e]
                                , o = e;
                            b.Hooks.registered[s] = [i, o]
                        }
                    }
                }
                , getRoot: function (e) {
                    var t = b.Hooks.registered[e];
                    return t ? t[0] : e
                }
                , cleanRootPropertyValue: function (e, t) {
                    return b.RegEx.valueUnwrap.test(t) && (t = t.match(b.RegEx.valueUnwrap)[1]), b.Values.isCSSNullValue(t) && (t = b.Hooks.templates[e][1]), t
                }
                , extractValue: function (e, t) {
                    var i = b.Hooks.registered[e];
                    if (i) {
                        var a = i[0]
                            , r = i[1];
                        return t = b.Hooks.cleanRootPropertyValue(a, t), t.toString().match(b.RegEx.valueSplit)[r]
                    }
                    return t
                }
                , injectValue: function (e, t, i) {
                    var a = b.Hooks.registered[e];
                    if (a) {
                        var r = a[0]
                            , n = a[1]
                            , s, o;
                        return i = b.Hooks.cleanRootPropertyValue(r, i), s = i.toString().match(b.RegEx.valueSplit), s[n] = t, o = s.join(" ")
                    }
                    return i
                }
            }
            , Normalizations: {
                registered: {
                    clip: function (e, t, i) {
                        switch (e) {
                        case "name":
                            return "clip";
                        case "extract":
                            var a;
                            return b.RegEx.wrappedValueAlreadyExtracted.test(i) ? a = i : (a = i.toString().match(b.RegEx.valueUnwrap), a = a ? a[1].replace(/,(\s+)?/g, " ") : i), a;
                        case "inject":
                            return "rect(" + i + ")"
                        }
                    }
                    , blur: function (e, t, i) {
                        switch (e) {
                        case "name":
                            return y.State.isFirefox ? "filter" : "-webkit-filter";
                        case "extract":
                            var a = parseFloat(i);
                            if (!a && 0 !== a) {
                                var r = i.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                                a = r ? r[1] : 0
                            }
                            return a;
                        case "inject":
                            return parseFloat(i) ? "blur(" + i + ")" : "none"
                        }
                    }
                    , opacity: function (e, t, i) {
                        if (8 >= p) switch (e) {
                        case "name":
                            return "filter";
                        case "extract":
                            var a = i.toString().match(/alpha\(opacity=(.*)\)/i);
                            return i = a ? a[1] / 100 : 1;
                        case "inject":
                            return t.style.zoom = 1, parseFloat(i) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(i), 10) + ")"
                        }
                        else switch (e) {
                        case "name":
                            return "opacity";
                        case "extract":
                            return i;
                        case "inject":
                            return i
                        }
                    }
                }
                , register: function () {
                    9 >= p || y.State.isGingerbread || (b.Lists.transformsBase = b.Lists.transformsBase.concat(b.Lists.transforms3D));
                    for (var e = 0; e < b.Lists.transformsBase.length; e++) ! function () {
                        var t = b.Lists.transformsBase[e];
                        b.Normalizations.registered[t] = function (e, i, r) {
                            switch (e) {
                            case "name":
                                return "transform";
                            case "extract":
                                return s(i) === a || s(i).transformCache[t] === a ? /^scale/i.test(t) ? 1 : 0 : s(i).transformCache[t].replace(/[()]/g, "");
                            case "inject":
                                var n = !1;
                                switch (t.substr(0, t.length - 1)) {
                                case "translate":
                                    n = !/(%|px|em|rem|vw|vh|\d)$/i.test(r);
                                    break;
                                case "scal":
                                case "scale":
                                    y.State.isAndroid && s(i).transformCache[t] === a && 1 > r && (r = 1), n = !/(\d)$/i.test(r);
                                    break;
                                case "skew":
                                    n = !/(deg|\d)$/i.test(r);
                                    break;
                                case "rotate":
                                    n = !/(deg|\d)$/i.test(r)
                                }
                                return n || (s(i).transformCache[t] = "(" + r + ")"), s(i).transformCache[t]
                            }
                        }
                    }();
                    for (var e = 0; e < b.Lists.colors.length; e++) ! function () {
                        var t = b.Lists.colors[e];
                        b.Normalizations.registered[t] = function (e, i, r) {
                            switch (e) {
                            case "name":
                                return t;
                            case "extract":
                                var n;
                                if (b.RegEx.wrappedValueAlreadyExtracted.test(r)) n = r;
                                else {
                                    var s, o = {
                                        black: "rgb(0, 0, 0)"
                                        , blue: "rgb(0, 0, 255)"
                                        , gray: "rgb(128, 128, 128)"
                                        , green: "rgb(0, 128, 0)"
                                        , red: "rgb(255, 0, 0)"
                                        , white: "rgb(255, 255, 255)"
                                    };
                                    /^[A-z]+$/i.test(r) ? s = o[r] !== a ? o[r] : o.black : b.RegEx.isHex.test(r) ? s = "rgb(" + b.Values.hexToRgb(r).join(" ") + ")" : /^rgba?\(/i.test(r) || (s = o.black), n = (s || r).toString().match(b.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                }
                                return 8 >= p || 3 !== n.split(" ").length || (n += " 1"), n;
                            case "inject":
                                return 8 >= p ? 4 === r.split(" ").length && (r = r.split(/\s+/).slice(0, 3).join(" ")) : 3 === r.split(" ").length && (r += " 1"), (8 >= p ? "rgb" : "rgba") + "(" + r.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
                            }
                        }
                    }()
                }
            }
            , Names: {
                camelCase: function (e) {
                    return e.replace(/-(\w)/g, function (e, t) {
                        return t.toUpperCase()
                    })
                }
                , SVGAttribute: function (e) {
                    var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                    return (p || y.State.isAndroid && !y.State.isChrome) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(e)
                }
                , prefixCheck: function (e) {
                    if (y.State.prefixMatches[e]) return [y.State.prefixMatches[e], !0];
                    for (var t = ["", "Webkit", "Moz", "ms", "O"], i = 0, a = t.length; a > i; i++) {
                        var r;
                        if (r = 0 === i ? e : t[i] + e.replace(/^\w/, function (e) {
                                return e.toUpperCase()
                            }), h.isString(y.State.prefixElement.style[r])) return y.State.prefixMatches[e] = r, [r, !0]
                    }
                    return [e, !1]
                }
            }
            , Values: {
                hexToRgb: function (e) {
                    var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
                        , i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
                        , a;
                    return e = e.replace(t, function (e, t, i, a) {
                        return t + t + i + i + a + a
                    }), a = i.exec(e), a ? [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)] : [0, 0, 0]
                }
                , isCSSNullValue: function (e) {
                    return 0 == e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)
                }
                , getUnitType: function (e) {
                    return /^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px"
                }
                , getDisplayType: function (e) {
                    var t = e && e.tagName.toString().toLowerCase();
                    return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : /^(table)$/i.test(t) ? "table" : /^(tbody)$/i.test(t) ? "table-row-group" : "block"
                }
                , addClass: function (e, t) {
                    e.classList ? e.classList.add(t) : e.className += (e.className.length ? " " : "") + t
                }
                , removeClass: function (e, t) {
                    e.classList ? e.classList.remove(t) : e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " ")
                }
            }
            , getPropertyValue: function (e, i, r, n) {
                function o(e, i) {
                    function r() {
                        u && b.setPropertyValue(e, "display", "none")
                    }
                    var l = 0;
                    if (8 >= p) l = $.css(e, i);
                    else {
                        var u = !1;
                        if (/^(width|height)$/.test(i) && 0 === b.getPropertyValue(e, "display") && (u = !0, b.setPropertyValue(e, "display", b.Values.getDisplayType(e))), !n) {
                            if ("height" === i && "border-box" !== b.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                var d = e.offsetHeight - (parseFloat(b.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(b.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(b.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(b.getPropertyValue(e, "paddingBottom")) || 0);
                                return r(), d
                            }
                            if ("width" === i && "border-box" !== b.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                var c = e.offsetWidth - (parseFloat(b.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(b.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(b.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(b.getPropertyValue(e, "paddingRight")) || 0);
                                return r(), c
                            }
                        }
                        var f;
                        f = s(e) === a ? t.getComputedStyle(e, null) : s(e).computedStyle ? s(e).computedStyle : s(e).computedStyle = t.getComputedStyle(e, null), "borderColor" === i && (i = "borderTopColor"), l = 9 === p && "filter" === i ? f.getPropertyValue(i) : f[i], ("" === l || null === l) && (l = e.style[i]), r()
                    }
                    if ("auto" === l && /^(top|right|bottom|left)$/i.test(i)) {
                        var h = o(e, "position");
                        ("fixed" === h || "absolute" === h && /top|left/i.test(i)) && (l = $(e).position()[i] + "px")
                    }
                    return l
                }
                var l;
                if (b.Hooks.registered[i]) {
                    var u = i
                        , d = b.Hooks.getRoot(u);
                    r === a && (r = b.getPropertyValue(e, b.Names.prefixCheck(d)[0])), b.Normalizations.registered[d] && (r = b.Normalizations.registered[d]("extract", e, r)), l = b.Hooks.extractValue(u, r)
                }
                else if (b.Normalizations.registered[i]) {
                    var c, f;
                    c = b.Normalizations.registered[i]("name", e), "transform" !== c && (f = o(e, b.Names.prefixCheck(c)[0]), b.Values.isCSSNullValue(f) && b.Hooks.templates[i] && (f = b.Hooks.templates[i][1])), l = b.Normalizations.registered[i]("extract", e, f)
                }
                if (!/^[\d-]/.test(l))
                    if (s(e) && s(e).isSVG && b.Names.SVGAttribute(i))
                        if (/^(height|width)$/i.test(i)) try {
                            l = e.getBBox()[i]
                        }
                        catch (h) {
                            l = 0
                        }
                        else l = e.getAttribute(i);
                else l = o(e, b.Names.prefixCheck(i)[0]);
                return b.Values.isCSSNullValue(l) && (l = 0), y.debug >= 2 && console.log("Get " + i + ": " + l), l
            }
            , setPropertyValue: function (e, i, a, r, n) {
                var o = i;
                if ("scroll" === i) n.container ? n.container["scroll" + n.direction] = a : "Left" === n.direction ? t.scrollTo(a, n.alternateValue) : t.scrollTo(n.alternateValue, a);
                else if (b.Normalizations.registered[i] && "transform" === b.Normalizations.registered[i]("name", e)) b.Normalizations.registered[i]("inject", e, a), o = "transform", a = s(e).transformCache[i];
                else {
                    if (b.Hooks.registered[i]) {
                        var l = i
                            , u = b.Hooks.getRoot(i);
                        r = r || b.getPropertyValue(e, u), a = b.Hooks.injectValue(l, a, r), i = u
                    }
                    if (b.Normalizations.registered[i] && (a = b.Normalizations.registered[i]("inject", e, a), i = b.Normalizations.registered[i]("name", e)), o = b.Names.prefixCheck(i)[0], 8 >= p) try {
                        e.style[o] = a
                    }
                    catch (d) {
                        y.debug && console.log("Browser does not support [" + a + "] for [" + o + "]")
                    }
                    else s(e) && s(e).isSVG && b.Names.SVGAttribute(i) ? e.setAttribute(i, a) : e.style[o] = a;
                    y.debug >= 2 && console.log("Set " + i + " (" + o + "): " + a)
                }
                return [o, a]
            }
            , flushTransformCache: function (e) {
                function t(t) {
                    return parseFloat(b.getPropertyValue(e, t))
                }
                var i = "";
                if ((p || y.State.isAndroid && !y.State.isChrome) && s(e).isSVG) {
                    var a = {
                        translate: [t("translateX"), t("translateY")]
                        , skewX: [t("skewX")]
                        , skewY: [t("skewY")]
                        , scale: 1 !== t("scale") ? [t("scale"), t("scale")] : [t("scaleX"), t("scaleY")]
                        , rotate: [t("rotateZ"), 0, 0]
                    };
                    $.each(s(e).transformCache, function (e) {
                        /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"), a[e] && (i += e + "(" + a[e].join(" ") + ") ", delete a[e])
                    })
                }
                else {
                    var r, n;
                    $.each(s(e).transformCache, function (t) {
                        return r = s(e).transformCache[t], "transformPerspective" === t ? (n = r, !0) : (9 === p && "rotateZ" === t && (t = "rotate"), void(i += t + r + " "))
                    }), n && (i = "perspective" + n + " " + i)
                }
                b.setPropertyValue(e, "transform", i)
            }
        };
        b.Hooks.register(), b.Normalizations.register(), y.hook = function (e, t, i) {
            var r = a;
            return e = n(e), $.each(e, function (e, n) {
                if (s(n) === a && y.init(n), i === a) r === a && (r = y.CSS.getPropertyValue(n, t));
                else {
                    var o = y.CSS.setPropertyValue(n, t, i);
                    "transform" === o[0] && y.CSS.flushTransformCache(n), r = o
                }
            }), r
        };
        var x = function () {
            function e() {
                return l ? k.promise || null : p
            }

            function r() {
                function e(e) {
                    function c(e, t) {
                        var i = a
                            , s = a
                            , o = a;
                        return h.isArray(e) ? (i = e[0], !h.isArray(e[1]) && /^[\d-]/.test(e[1]) || h.isFunction(e[1]) || b.RegEx.isHex.test(e[1]) ? o = e[1] : (h.isString(e[1]) && !b.RegEx.isHex.test(e[1]) || h.isArray(e[1])) && (s = t ? e[1] : u(e[1], n.duration), e[2] !== a && (o = e[2]))) : i = e, t || (s = s || n.easing), h.isFunction(i) && (i = i.call(r, _, C)), h.isFunction(o) && (o = o.call(r, _, C)), [i || 0, s, o]
                    }

                    function p(e, t) {
                        var i, a;
                        return a = (t || "0").toString().toLowerCase().replace(/[%A-z]+$/, function (e) {
                            return i = e, ""
                        }), i || (i = b.Values.getUnitType(e)), [a, i]
                    }

                    function f() {
                        var e = {
                                myParent: r.parentNode || i.body
                                , position: b.getPropertyValue(r, "position")
                                , fontSize: b.getPropertyValue(r, "fontSize")
                            }
                            , a = e.position === M.lastPosition && e.myParent === M.lastParent
                            , n = e.fontSize === M.lastFontSize;
                        M.lastParent = e.myParent, M.lastPosition = e.position
                            , M.lastFontSize = e.fontSize;
                        var o = 100
                            , l = {};
                        if (n && a) l.emToPx = M.lastEmToPx, l.percentToPxWidth = M.lastPercentToPxWidth, l.percentToPxHeight = M.lastPercentToPxHeight;
                        else {
                            var u = s(r).isSVG ? i.createElementNS("http://www.w3.org/2000/svg", "rect") : i.createElement("div");
                            y.init(u), e.myParent.appendChild(u), $.each(["overflow", "overflowX", "overflowY"], function (e, t) {
                                y.CSS.setPropertyValue(u, t, "hidden")
                            }), y.CSS.setPropertyValue(u, "position", e.position), y.CSS.setPropertyValue(u, "fontSize", e.fontSize), y.CSS.setPropertyValue(u, "boxSizing", "content-box"), $.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function (e, t) {
                                y.CSS.setPropertyValue(u, t, o + "%")
                            }), y.CSS.setPropertyValue(u, "paddingLeft", o + "em"), l.percentToPxWidth = M.lastPercentToPxWidth = (parseFloat(b.getPropertyValue(u, "width", null, !0)) || 1) / o, l.percentToPxHeight = M.lastPercentToPxHeight = (parseFloat(b.getPropertyValue(u, "height", null, !0)) || 1) / o, l.emToPx = M.lastEmToPx = (parseFloat(b.getPropertyValue(u, "paddingLeft")) || 1) / o, e.myParent.removeChild(u)
                        }
                        return null === M.remToPx && (M.remToPx = parseFloat(b.getPropertyValue(i.body, "fontSize")) || 16), null === M.vwToPx && (M.vwToPx = parseFloat(t.innerWidth) / 100, M.vhToPx = parseFloat(t.innerHeight) / 100), l.remToPx = M.remToPx, l.vwToPx = M.vwToPx, l.vhToPx = M.vhToPx, y.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(l), r), l
                    }
                    if (n.begin && 0 === _) try {
                        n.begin.call(m, m)
                    }
                    catch (g) {
                        setTimeout(function () {
                            throw g
                        }, 1)
                    }
                    if ("scroll" === P) {
                        var x = /^x$/i.test(n.axis) ? "Left" : "Top"
                            , S = parseFloat(n.offset) || 0
                            , T, E, A;
                        n.container ? h.isWrapped(n.container) || h.isNode(n.container) ? (n.container = n.container[0] || n.container, T = n.container["scroll" + x], A = T + $(r).position()[x.toLowerCase()] + S) : n.container = null : (T = y.State.scrollAnchor[y.State["scrollProperty" + x]], E = y.State.scrollAnchor[y.State["scrollProperty" + ("Left" === x ? "Top" : "Left")]], A = $(r).offset()[x.toLowerCase()] + S), o = {
                            scroll: {
                                rootPropertyValue: !1
                                , startValue: T
                                , currentValue: T
                                , endValue: A
                                , unitType: ""
                                , easing: n.easing
                                , scrollData: {
                                    container: n.container
                                    , direction: x
                                    , alternateValue: E
                                }
                            }
                            , element: r
                        }, y.debug && console.log("tweensContainer (scroll): ", o.scroll, r)
                    }
                    else if ("reverse" === P) {
                        if (!s(r).tweensContainer) return void $.dequeue(r, n.queue);
                        "none" === s(r).opts.display && (s(r).opts.display = "auto"), "hidden" === s(r).opts.visibility && (s(r).opts.visibility = "visible"), s(r).opts.loop = !1, s(r).opts.begin = null, s(r).opts.complete = null, w.easing || delete n.easing, w.duration || delete n.duration, n = $.extend({}, s(r).opts, n);
                        var F = $.extend(!0, {}, s(r).tweensContainer);
                        for (var O in F)
                            if ("element" !== O) {
                                var I = F[O].startValue;
                                F[O].startValue = F[O].currentValue = F[O].endValue, F[O].endValue = I, h.isEmptyObject(w) || (F[O].easing = n.easing), y.debug && console.log("reverse tweensContainer (" + O + "): " + JSON.stringify(F[O]), r)
                            }
                        o = F
                    }
                    else if ("start" === P) {
                        var F;
                        s(r).tweensContainer && s(r).isAnimating === !0 && (F = s(r).tweensContainer), $.each(v, function (e, t) {
                            if (RegExp("^" + b.Lists.colors.join("$|^") + "$").test(e)) {
                                var i = c(t, !0)
                                    , r = i[0]
                                    , n = i[1]
                                    , s = i[2];
                                if (b.RegEx.isHex.test(r)) {
                                    for (var o = ["Red", "Green", "Blue"], l = b.Values.hexToRgb(r), u = s ? b.Values.hexToRgb(s) : a, d = 0; d < o.length; d++) {
                                        var p = [l[d]];
                                        n && p.push(n), u !== a && p.push(u[d]), v[e + o[d]] = p
                                    }
                                    delete v[e]
                                }
                            }
                        });
                        for (var V in v) {
                            var D = c(v[V])
                                , j = D[0]
                                , N = D[1]
                                , L = D[2];
                            V = b.Names.camelCase(V);
                            var Y = b.Hooks.getRoot(V)
                                , R = !1;
                            if (s(r).isSVG || "tween" === Y || b.Names.prefixCheck(Y)[1] !== !1 || b.Normalizations.registered[Y] !== a) {
                                (n.display !== a && null !== n.display && "none" !== n.display || n.visibility !== a && "hidden" !== n.visibility) && /opacity|filter/.test(V) && !L && 0 !== j && (L = 0), n._cacheValues && F && F[V] ? (L === a && (L = F[V].endValue + F[V].unitType), R = s(r).rootPropertyValueCache[Y]) : b.Hooks.registered[V] ? L === a ? (R = b.getPropertyValue(r, Y), L = b.getPropertyValue(r, V, R)) : R = b.Hooks.templates[Y][1] : L === a && (L = b.getPropertyValue(r, V));
                                var X, B, G, q = !1;
                                if (X = p(V, L), L = X[0], G = X[1], X = p(V, j), j = X[0].replace(/^([+-\/*])=/, function (e, t) {
                                        return q = t, ""
                                    }), B = X[1], L = parseFloat(L) || 0, j = parseFloat(j) || 0, "%" === B && (/^(fontSize|lineHeight)$/.test(V) ? (j /= 100, B = "em") : /^scale/.test(V) ? (j /= 100, B = "") : /(Red|Green|Blue)$/i.test(V) && (j = j / 100 * 255, B = "")), /[\/*]/.test(q)) B = G;
                                else if (G !== B && 0 !== L)
                                    if (0 === j) B = G;
                                    else {
                                        l = l || f();
                                        var H = /margin|padding|left|right|width|text|word|letter/i.test(V) || /X$/.test(V) || "x" === V ? "x" : "y";
                                        switch (G) {
                                        case "%":
                                            L *= "x" === H ? l.percentToPxWidth : l.percentToPxHeight;
                                            break;
                                        case "px":
                                            break;
                                        default:
                                            L *= l[G + "ToPx"]
                                        }
                                        switch (B) {
                                        case "%":
                                            L *= 1 / ("x" === H ? l.percentToPxWidth : l.percentToPxHeight);
                                            break;
                                        case "px":
                                            break;
                                        default:
                                            L *= 1 / l[B + "ToPx"]
                                        }
                                    }
                                switch (q) {
                                case "+":
                                    j = L + j;
                                    break;
                                case "-":
                                    j = L - j;
                                    break;
                                case "*":
                                    j = L * j;
                                    break;
                                case "/":
                                    j = L / j
                                }
                                o[V] = {
                                    rootPropertyValue: R
                                    , startValue: L
                                    , currentValue: L
                                    , endValue: j
                                    , unitType: B
                                    , easing: N
                                }, y.debug && console.log("tweensContainer (" + V + "): " + JSON.stringify(o[V]), r)
                            }
                            else y.debug && console.log("Skipping [" + Y + "] due to a lack of browser support.")
                        }
                        o.element = r
                    }
                    o.element && (b.Values.addClass(r, "velocity-animating"), z.push(o), "" === n.queue && (s(r).tweensContainer = o, s(r).opts = n), s(r).isAnimating = !0, _ === C - 1 ? (y.State.calls.push([z, m, n, null, k.resolver]), y.State.isTicking === !1 && (y.State.isTicking = !0, d())) : _++)
                }
                var r = this
                    , n = $.extend({}, y.defaults, w)
                    , o = {}
                    , l;
                switch (s(r) === a && y.init(r), parseFloat(n.delay) && n.queue !== !1 && $.queue(r, n.queue, function (e) {
                    y.velocityQueueEntryFlag = !0, s(r).delayTimer = {
                        setTimeout: setTimeout(e, parseFloat(n.delay))
                        , next: e
                    }
                }), n.duration.toString().toLowerCase()) {
                case "fast":
                    n.duration = 200;
                    break;
                case "normal":
                    n.duration = g;
                    break;
                case "slow":
                    n.duration = 600;
                    break;
                default:
                    n.duration = parseFloat(n.duration) || 1
                }
                y.mock !== !1 && (y.mock === !0 ? n.duration = n.delay = 1 : (n.duration *= parseFloat(y.mock) || 1, n.delay *= parseFloat(y.mock) || 1)), n.easing = u(n.easing, n.duration), n.begin && !h.isFunction(n.begin) && (n.begin = null), n.progress && !h.isFunction(n.progress) && (n.progress = null), n.complete && !h.isFunction(n.complete) && (n.complete = null), n.display !== a && null !== n.display && (n.display = n.display.toString().toLowerCase(), "auto" === n.display && (n.display = y.CSS.Values.getDisplayType(r))), n.visibility !== a && null !== n.visibility && (n.visibility = n.visibility.toString().toLowerCase()), n.mobileHA = n.mobileHA && y.State.isMobile && !y.State.isGingerbread, n.queue === !1 ? n.delay ? setTimeout(e, n.delay) : e() : $.queue(r, n.queue, function (t, i) {
                    return i === !0 ? (k.promise && k.resolver(m), !0) : (y.velocityQueueEntryFlag = !0, void e(t))
                }), "" !== n.queue && "fx" !== n.queue || "inprogress" === $.queue(r)[0] || $.dequeue(r)
            }
            var o = arguments[0] && (arguments[0].p || $.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || h.isString(arguments[0].properties))
                , l, p, f, m, v, w;
            if (h.isWrapped(this) ? (l = !1, f = 0, m = this, p = this) : (l = !0, f = 1, m = o ? arguments[0].elements || arguments[0].e : arguments[0]), m = n(m)) {
                o ? (v = arguments[0].properties || arguments[0].p, w = arguments[0].options || arguments[0].o) : (v = arguments[f], w = arguments[f + 1]);
                var C = m.length
                    , _ = 0;
                if (!/^(stop|finish)$/i.test(v) && !$.isPlainObject(w)) {
                    var S = f + 1;
                    w = {};
                    for (var T = S; T < arguments.length; T++) h.isArray(arguments[T]) || !/^(fast|normal|slow)$/i.test(arguments[T]) && !/^\d/.test(arguments[T]) ? h.isString(arguments[T]) || h.isArray(arguments[T]) ? w.easing = arguments[T] : h.isFunction(arguments[T]) && (w.complete = arguments[T]) : w.duration = arguments[T]
                }
                var k = {
                    promise: null
                    , resolver: null
                    , rejecter: null
                };
                l && y.Promise && (k.promise = new y.Promise(function (e, t) {
                    k.resolver = e, k.rejecter = t
                }));
                var P;
                switch (v) {
                case "scroll":
                    P = "scroll";
                    break;
                case "reverse":
                    P = "reverse";
                    break;
                case "finish":
                case "stop":
                    $.each(m, function (e, t) {
                        s(t) && s(t).delayTimer && (clearTimeout(s(t).delayTimer.setTimeout), s(t).delayTimer.next && s(t).delayTimer.next(), delete s(t).delayTimer)
                    });
                    var E = [];
                    return $.each(y.State.calls, function (e, t) {
                        t && $.each(t[1], function (i, r) {
                            var n = w === a ? "" : w;
                            return n === !0 || t[2].queue === n || w === a && t[2].queue === !1 ? void $.each(m, function (i, a) {
                                a === r && ((w === !0 || h.isString(w)) && ($.each($.queue(a, h.isString(w) ? w : ""), function (e, t) {
                                    h.isFunction(t) && t(null, !0)
                                }), $.queue(a, h.isString(w) ? w : "", [])), "stop" === v ? (s(a) && s(a).tweensContainer && n !== !1 && $.each(s(a).tweensContainer, function (e, t) {
                                    t.endValue = t.currentValue
                                }), E.push(e)) : "finish" === v && (t[2].duration = 1))
                            }) : !0
                        })
                    }), "stop" === v && ($.each(E, function (e, t) {
                        c(t, !0)
                    }), k.promise && k.resolver(m)), e();
                default:
                    if (!$.isPlainObject(v) || h.isEmptyObject(v)) {
                        if (h.isString(v) && y.Redirects[v]) {
                            var A = $.extend({}, w)
                                , F = A.duration
                                , O = A.delay || 0;
                            return A.backwards === !0 && (m = $.extend(!0, [], m).reverse()), $.each(m, function (e, t) {
                                parseFloat(A.stagger) ? A.delay = O + parseFloat(A.stagger) * e : h.isFunction(A.stagger) && (A.delay = O + A.stagger.call(t, e, C)), A.drag && (A.duration = parseFloat(F) || (/^(callout|transition)/.test(v) ? 1e3 : g), A.duration = Math.max(A.duration * (A.backwards ? 1 - e / C : (e + 1) / C), .75 * A.duration, 200)), y.Redirects[v].call(t, t, A || {}, e, C, m, k.promise ? k : a)
                            }), e()
                        }
                        var I = "Velocity: First argument (" + v + ") was not a property map, a known action, or a registered redirect. Aborting.";
                        return k.promise ? k.rejecter(new Error(I)) : console.log(I), e()
                    }
                    P = "start"
                }
                var M = {
                        lastParent: null
                        , lastPosition: null
                        , lastFontSize: null
                        , lastPercentToPxWidth: null
                        , lastPercentToPxHeight: null
                        , lastEmToPx: null
                        , remToPx: null
                        , vwToPx: null
                        , vhToPx: null
                    }
                    , z = [];
                $.each(m, function (e, t) {
                    h.isNode(t) && r.call(t)
                });
                var A = $.extend({}, y.defaults, w)
                    , V;
                if (A.loop = parseInt(A.loop), V = 2 * A.loop - 1, A.loop)
                    for (var D = 0; V > D; D++) {
                        var j = {
                            delay: A.delay
                            , progress: A.progress
                        };
                        D === V - 1 && (j.display = A.display, j.visibility = A.visibility, j.complete = A.complete), x(m, "reverse", j)
                    }
                return e()
            }
        };
        y = $.extend(x, y), y.animate = x;
        var C = t.requestAnimationFrame || f;
        return y.State.isMobile || i.hidden === a || i.addEventListener("visibilitychange", function () {
            i.hidden ? (C = function (e) {
                return setTimeout(function () {
                    e(!0)
                }, 16)
            }, d()) : C = t.requestAnimationFrame || f
        }), e.Velocity = y, e !== t && (e.fn.velocity = x, e.fn.velocity.defaults = y.defaults), $.each(["Down", "Up"], function (e, t) {
            y.Redirects["slide" + t] = function (e, i, r, n, s, o) {
                var l = $.extend({}, i)
                    , u = l.begin
                    , d = l.complete
                    , c = {
                        height: ""
                        , marginTop: ""
                        , marginBottom: ""
                        , paddingTop: ""
                        , paddingBottom: ""
                    }
                    , p = {};
                l.display === a && (l.display = "Down" === t ? "inline" === y.CSS.Values.getDisplayType(e) ? "inline-block" : "block" : "none"), l.begin = function () {
                    u && u.call(s, s);
                    for (var i in c) {
                        p[i] = e.style[i];
                        var a = y.CSS.getPropertyValue(e, i);
                        c[i] = "Down" === t ? [a, 0] : [0, a]
                    }
                    p.overflow = e.style.overflow, e.style.overflow = "hidden"
                }, l.complete = function () {
                    for (var t in p) e.style[t] = p[t];
                    d && d.call(s, s), o && o.resolver(s)
                }, y(e, c, l)
            }
        }), $.each(["In", "Out"], function (e, t) {
            y.Redirects["fade" + t] = function (e, i, r, n, s, o) {
                var l = $.extend({}, i)
                    , u = {
                        opacity: "In" === t ? 1 : 0
                    }
                    , d = l.complete;
                r !== n - 1 ? l.complete = l.begin = null : l.complete = function () {
                    d && d.call(s, s), o && o.resolver(s)
                }, l.display === a && (l.display = "In" === t ? "auto" : "none"), y(this, u, l)
            }
        }), y
    }(window.jQuery || window.Zepto || window, window, document)
})
, function (e) {
    "function" == typeof require && "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define(["velocity"], e) : e()
}(function () {
    return function (e, t, i, a) {
        function r(e, t) {
            var i = [];
            return e && t ? ($.each([e, t], function (e, t) {
                var a = [];
                $.each(t, function (e, t) {
                    for (; t.toString().length < 5;) t = "0" + t;
                    a.push(t)
                }), i.push(a.join(""))
            }), parseFloat(i[0]) > parseFloat(i[1])) : !1
        }
        if (!e.Velocity || !e.Velocity.Utilities) return void(t.console && console.log("Velocity UI Pack: Velocity must be loaded first. Aborting."));
        var n = e.Velocity
            , $ = n.Utilities
            , s = n.version
            , o = {
                major: 1
                , minor: 1
                , patch: 0
            };
        if (r(o, s)) {
            var l = "Velocity UI Pack: You need to update Velocity (jquery.velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity.";
            throw alert(l), new Error(l)
        }
        n.RegisterEffect = n.RegisterUI = function (e, t) {
            function i(e, t, i, a) {
                var r = 0
                    , s;
                $.each(e.nodeType ? [e] : e, function (e, t) {
                    a && (i += e * a), s = t.parentNode, $.each(["height", "paddingTop", "paddingBottom", "marginTop", "marginBottom"], function (e, i) {
                        r += parseFloat(n.CSS.getPropertyValue(t, i))
                    })
                }), n.animate(s, {
                    height: ("In" === t ? "+" : "-") + "=" + r
                }, {
                    queue: !1
                    , easing: "ease-in-out"
                    , duration: i * ("In" === t ? .6 : 1)
                })
            }
            return n.Redirects[e] = function (r, s, o, l, u, d) {
                function c() {
                    s.display !== a && "none" !== s.display || !/Out$/.test(e) || $.each(u.nodeType ? [u] : u, function (e, t) {
                        n.CSS.setPropertyValue(t, "display", "none")
                    }), s.complete && s.complete.call(u, u), d && d.resolver(u || r)
                }
                var p = o === l - 1;
                "function" == typeof t.defaultDuration ? t.defaultDuration = t.defaultDuration.call(u, u) : t.defaultDuration = parseFloat(t.defaultDuration);
                for (var f = 0; f < t.calls.length; f++) {
                    var h = t.calls[f]
                        , m = h[0]
                        , g = s.duration || t.defaultDuration || 1e3
                        , v = h[1]
                        , y = h[2] || {}
                        , w = {};
                    if (w.duration = g * (v || 1), w.queue = s.queue || "", w.easing = y.easing || "ease", w.delay = parseFloat(y.delay) || 0, w._cacheValues = y._cacheValues || !0, 0 === f) {
                        if (w.delay += parseFloat(s.delay) || 0, 0 === o && (w.begin = function () {
                                s.begin && s.begin.call(u, u);
                                var t = e.match(/(In|Out)$/);
                                t && "In" === t[0] && m.opacity !== a && $.each(u.nodeType ? [u] : u, function (e, t) {
                                    n.CSS.setPropertyValue(t, "opacity", 0)
                                }), s.animateParentHeight && t && i(u, t[0], g + w.delay, s.stagger)
                            }), null !== s.display)
                            if (s.display !== a && "none" !== s.display) w.display = s.display;
                            else if (/In$/.test(e)) {
                            var b = n.CSS.Values.getDisplayType(r);
                            w.display = "inline" === b ? "inline-block" : b
                        }
                        s.visibility && "hidden" !== s.visibility && (w.visibility = s.visibility)
                    }
                    f === t.calls.length - 1 && (w.complete = function () {
                        if (t.reset) {
                            for (var e in t.reset) {
                                var i = t.reset[e];
                                n.CSS.Hooks.registered[e] !== a || "string" != typeof i && "number" != typeof i || (t.reset[e] = [t.reset[e], t.reset[e]])
                            }
                            var s = {
                                duration: 0
                                , queue: !1
                            };
                            p && (s.complete = c), n.animate(r, t.reset, s)
                        }
                        else p && c()
                    }, "hidden" === s.visibility && (w.visibility = s.visibility)), n.animate(r, m, w)
                }
            }, n
        }, n.RegisterEffect.packagedEffects = {
            "callout.bounce": {
                defaultDuration: 550
                , calls: [[{
                    translateY: -30
                }, .25], [{
                    translateY: 0
                }, .125], [{
                    translateY: -15
                }, .125], [{
                    translateY: 0
                }, .25]]
            }
            , "callout.shake": {
                defaultDuration: 800
                , calls: [[{
                    translateX: -11
                }, .125], [{
                    translateX: 11
                }, .125], [{
                    translateX: -11
                }, .125], [{
                    translateX: 11
                }, .125], [{
                    translateX: -11
                }, .125], [{
                    translateX: 11
                }, .125], [{
                    translateX: -11
                }, .125], [{
                    translateX: 0
                }, .125]]
            }
            , "callout.flash": {
                defaultDuration: 1100
                , calls: [[{
                    opacity: [0, "easeInOutQuad", 1]
                }, .25], [{
                    opacity: [1, "easeInOutQuad"]
                }, .25], [{
                    opacity: [0, "easeInOutQuad"]
                }, .25], [{
                    opacity: [1, "easeInOutQuad"]
                }, .25]]
            }
            , "callout.pulse": {
                defaultDuration: 825
                , calls: [[{
                    scaleX: 1.1
                    , scaleY: 1.1
                }, .5, {
                    easing: "easeInExpo"
                }], [{
                    scaleX: 1
                    , scaleY: 1
                }, .5]]
            }
            , "callout.swing": {
                defaultDuration: 950
                , calls: [[{
                    rotateZ: 15
                }, .2], [{
                    rotateZ: -10
                }, .2], [{
                    rotateZ: 5
                }, .2], [{
                    rotateZ: -5
                }, .2], [{
                    rotateZ: 0
                }, .2]]
            }
            , "callout.tada": {
                defaultDuration: 1e3
                , calls: [[{
                    scaleX: .9
                    , scaleY: .9
                    , rotateZ: -3
                }, .1], [{
                    scaleX: 1.1
                    , scaleY: 1.1
                    , rotateZ: 3
                }, .1], [{
                    scaleX: 1.1
                    , scaleY: 1.1
                    , rotateZ: -3
                }, .1], ["reverse", .125], ["reverse", .125], ["reverse", .125], ["reverse", .125], ["reverse", .125], [{
                    scaleX: 1
                    , scaleY: 1
                    , rotateZ: 0
                }, .2]]
            }
            , "transition.fadeIn": {
                defaultDuration: 500
                , calls: [[{
                    opacity: [1, 0]
                }]]
            }
            , "transition.fadeOut": {
                defaultDuration: 500
                , calls: [[{
                    opacity: [0, 1]
                }]]
            }
            , "transition.flipXIn": {
                defaultDuration: 700
                , calls: [[{
                    opacity: [1, 0]
                    , transformPerspective: [800, 800]
                    , rotateY: [0, -55]
                }]]
                , reset: {
                    transformPerspective: 0
                }
            }
            , "transition.flipXOut": {
                defaultDuration: 700
                , calls: [[{
                    opacity: [0, 1]
                    , transformPerspective: [800, 800]
                    , rotateY: 55
                }]]
                , reset: {
                    transformPerspective: 0
                    , rotateY: 0
                }
            }
            , "transition.flipYIn": {
                defaultDuration: 800
                , calls: [[{
                    opacity: [1, 0]
                    , transformPerspective: [800, 800]
                    , rotateX: [0, -45]
                }]]
                , reset: {
                    transformPerspective: 0
                }
            }
            , "transition.flipYOut": {
                defaultDuration: 800
                , calls: [[{
                    opacity: [0, 1]
                    , transformPerspective: [800, 800]
                    , rotateX: 25
                }]]
                , reset: {
                    transformPerspective: 0
                    , rotateX: 0
                }
            }
            , "transition.flipBounceXIn": {
                defaultDuration: 900
                , calls: [[{
                    opacity: [.725, 0]
                    , transformPerspective: [400, 400]
                    , rotateY: [-10, 90]
                }, .5], [{
                    opacity: .8
                    , rotateY: 10
                }, .25], [{
                    opacity: 1
                    , rotateY: 0
                }, .25]]
                , reset: {
                    transformPerspective: 0
                }
            }
            , "transition.flipBounceXOut": {
                defaultDuration: 800
                , calls: [[{
                    opacity: [.9, 1]
                    , transformPerspective: [400, 400]
                    , rotateY: -10
                }, .5], [{
                    opacity: 0
                    , rotateY: 90
                }, .5]]
                , reset: {
                    transformPerspective: 0
                    , rotateY: 0
                }
            }
            , "transition.flipBounceYIn": {
                defaultDuration: 850
                , calls: [[{
                    opacity: [.725, 0]
                    , transformPerspective: [400, 400]
                    , rotateX: [-10, 90]
                }, .5], [{
                    opacity: .8
                    , rotateX: 10
                }, .25], [{
                    opacity: 1
                    , rotateX: 0
                }, .25]]
                , reset: {
                    transformPerspective: 0
                }
            }
            , "transition.flipBounceYOut": {
                defaultDuration: 800
                , calls: [[{
                    opacity: [.9, 1]
                    , transformPerspective: [400, 400]
                    , rotateX: -15
                }, .5], [{
                    opacity: 0
                    , rotateX: 90
                }, .5]]
                , reset: {
                    transformPerspective: 0
                    , rotateX: 0
                }
            }
            , "transition.swoopIn": {
                defaultDuration: 850
                , calls: [[{
                    opacity: [1, 0]
                    , transformOriginX: ["100%", "50%"]
                    , transformOriginY: ["100%", "100%"]
                    , scaleX: [1, 0]
                    , scaleY: [1, 0]
                    , translateX: [0, -700]
                    , translateZ: 0
                }]]
                , reset: {
                    transformOriginX: "50%"
                    , transformOriginY: "50%"
                }
            }
            , "transition.swoopOut": {
                defaultDuration: 850
                , calls: [[{
                    opacity: [0, 1]
                    , transformOriginX: ["50%", "100%"]
                    , transformOriginY: ["100%", "100%"]
                    , scaleX: 0
                    , scaleY: 0
                    , translateX: -700
                    , translateZ: 0
                }]]
                , reset: {
                    transformOriginX: "50%"
                    , transformOriginY: "50%"
                    , scaleX: 1
                    , scaleY: 1
                    , translateX: 0
                }
            }
            , "transition.whirlIn": {
                defaultDuration: 850
                , calls: [[{
                    opacity: [1, 0]
                    , transformOriginX: ["50%", "50%"]
                    , transformOriginY: ["50%", "50%"]
                    , scaleX: [1, 0]
                    , scaleY: [1, 0]
                    , rotateY: [0, 160]
                }, 1, {
                    easing: "easeInOutSine"
                }]]
            }
            , "transition.whirlOut": {
                defaultDuration: 750
                , calls: [[{
                    opacity: [0, "easeInOutQuint", 1]
                    , transformOriginX: ["50%", "50%"]
                    , transformOriginY: ["50%", "50%"]
                    , scaleX: 0
                    , scaleY: 0
                    , rotateY: 160
                }, 1, {
                    easing: "swing"
                }]]
                , reset: {
                    scaleX: 1
                    , scaleY: 1
                    , rotateY: 0
                }
            }
            , "transition.shrinkIn": {
                defaultDuration: 750
                , calls: [[{
                    opacity: [1, 0]
                    , transformOriginX: ["50%", "50%"]
                    , transformOriginY: ["50%", "50%"]
                    , scaleX: [1, 1.5]
                    , scaleY: [1, 1.5]
                    , translateZ: 0
                }]]
            }
            , "transition.shrinkOut": {
                defaultDuration: 600
                , calls: [[{
                    opacity: [0, 1]
                    , transformOriginX: ["50%", "50%"]
                    , transformOriginY: ["50%", "50%"]
                    , scaleX: 1.3
                    , scaleY: 1.3
                    , translateZ: 0
                }]]
                , reset: {
                    scaleX: 1
                    , scaleY: 1
                }
            }
            , "transition.expandIn": {
                defaultDuration: 700
                , calls: [[{
                    opacity: [1, 0]
                    , transformOriginX: ["50%", "50%"]
                    , transformOriginY: ["50%", "50%"]
                    , scaleX: [1, .625]
                    , scaleY: [1, .625]
                    , translateZ: 0
                }]]
            }
            , "transition.expandOut": {
                defaultDuration: 700
                , calls: [[{
                    opacity: [0, 1]
                    , transformOriginX: ["50%", "50%"]
                    , transformOriginY: ["50%", "50%"]
                    , scaleX: .5
                    , scaleY: .5
                    , translateZ: 0
                }]]
                , reset: {
                    scaleX: 1
                    , scaleY: 1
                }
            }
            , "transition.bounceIn": {
                defaultDuration: 800
                , calls: [[{
                    opacity: [1, 0]
                    , scaleX: [1.05, .3]
                    , scaleY: [1.05, .3]
                }, .4], [{
                    scaleX: .9
                    , scaleY: .9
                    , translateZ: 0
                }, .2], [{
                    scaleX: 1
                    , scaleY: 1
                }, .5]]
            }
            , "transition.bounceOut": {
                defaultDuration: 800
                , calls: [[{
                    scaleX: .95
                    , scaleY: .95
                }, .35], [{
                    scaleX: 1.1
                    , scaleY: 1.1
                    , translateZ: 0
                }, .35], [{
                    opacity: [0, 1]
                    , scaleX: .3
                    , scaleY: .3
                }, .3]]
                , reset: {
                    scaleX: 1
                    , scaleY: 1
                }
            }
            , "transition.bounceUpIn": {
                defaultDuration: 800
                , calls: [[{
                    opacity: [1, 0]
                    , translateY: [-30, 1e3]
                }, .6, {
                    easing: "easeOutCirc"
                }], [{
                    translateY: 10
                }, .2], [{
                    translateY: 0
                }, .2]]
            }
            , "transition.bounceUpOut": {
                defaultDuration: 1e3
                , calls: [[{
                    translateY: 20
                }, .2], [{
                    opacity: [0, "easeInCirc", 1]
                    , translateY: -1e3
                }, .8]]
                , reset: {
                    translateY: 0
                }
            }
            , "transition.bounceDownIn": {
                defaultDuration: 800
                , calls: [[{
                    opacity: [1, 0]
                    , translateY: [30, -1e3]
                }, .6, {
                    easing: "easeOutCirc"
                }], [{
                    translateY: -10
                }, .2], [{
                    translateY: 0
                }, .2]]
            }
            , "transition.bounceDownOut": {
                defaultDuration: 1e3
                , calls: [[{
                    translateY: -20
                }, .2], [{
                    opacity: [0, "easeInCirc", 1]
                    , translateY: 1e3
                }, .8]]
                , reset: {
                    translateY: 0
                }
            }
            , "transition.bounceLeftIn": {
                defaultDuration: 750
                , calls: [[{
                    opacity: [1, 0]
                    , translateX: [30, -1250]
                }, .6, {
                    easing: "easeOutCirc"
                }], [{
                    translateX: -10
                }, .2], [{
                    translateX: 0
                }, .2]]
            }
            , "transition.bounceLeftOut": {
                defaultDuration: 750
                , calls: [[{
                    translateX: 30
                }, .2], [{
                    opacity: [0, "easeInCirc", 1]
                    , translateX: -1250
                }, .8]]
                , reset: {
                    translateX: 0
                }
            }
            , "transition.bounceRightIn": {
                defaultDuration: 750
                , calls: [[{
                    opacity: [1, 0]
                    , translateX: [-30, 1250]
                }, .6, {
                    easing: "easeOutCirc"
                }], [{
                    translateX: 10
                }, .2], [{
                    translateX: 0
                }, .2]]
            }
            , "transition.bounceRightOut": {
                defaultDuration: 750
                , calls: [[{
                    translateX: -30
                }, .2], [{
                    opacity: [0, "easeInCirc", 1]
                    , translateX: 1250
                }, .8]]
                , reset: {
                    translateX: 0
                }
            }
            , "transition.slideUpIn": {
                defaultDuration: 900
                , calls: [[{
                    opacity: [1, 0]
                    , translateY: [0, 20]
                    , translateZ: 0
                }]]
            }
            , "transition.slideUpOut": {
                defaultDuration: 900
                , calls: [[{
                    opacity: [0, 1]
                    , translateY: -20
                    , translateZ: 0
                }]]
                , reset: {
                    translateY: 0
                }
            }
            , "transition.slideDownIn": {
                defaultDuration: 900
                , calls: [[{
                    opacity: [1, 0]
                    , translateY: [0, -20]
                    , translateZ: 0
                }]]
            }
            , "transition.slideDownOut": {
                defaultDuration: 900
                , calls: [[{
                    opacity: [0, 1]
                    , translateY: 20
                    , translateZ: 0
                }]]
                , reset: {
                    translateY: 0
                }
            }
            , "transition.slideLeftIn": {
                defaultDuration: 1e3
                , calls: [[{
                    opacity: [1, 0]
                    , translateX: [0, -20]
                    , translateZ: 0
                }]]
            }
            , "transition.slideLeftOut": {
                defaultDuration: 1050
                , calls: [[{
                    opacity: [0, 1]
                    , translateX: -20
                    , translateZ: 0
                }]]
                , reset: {
                    translateX: 0
                }
            }
            , "transition.slideRightIn": {
                defaultDuration: 1e3
                , calls: [[{
                    opacity: [1, 0]
                    , translateX: [0, 20]
                    , translateZ: 0
                }]]
            }
            , "transition.slideRightOut": {
                defaultDuration: 1050
                , calls: [[{
                    opacity: [0, 1]
                    , translateX: 20
                    , translateZ: 0
                }]]
                , reset: {
                    translateX: 0
                }
            }
            , "transition.slideUpBigIn": {
                defaultDuration: 850
                , calls: [[{
                    opacity: [1, 0]
                    , translateY: [0, 75]
                    , translateZ: 0
                }]]
            }
            , "transition.slideUpBigOut": {
                defaultDuration: 800
                , calls: [[{
                    opacity: [0, 1]
                    , translateY: -75
                    , translateZ: 0
                }]]
                , reset: {
                    translateY: 0
                }
            }
            , "transition.slideDownBigIn": {
                defaultDuration: 850
                , calls: [[{
                    opacity: [1, 0]
                    , translateY: [0, -75]
                    , translateZ: 0
                }]]
            }
            , "transition.slideDownBigOut": {
                defaultDuration: 800
                , calls: [[{
                    opacity: [0, 1]
                    , translateY: 75
                    , translateZ: 0
                }]]
                , reset: {
                    translateY: 0
                }
            }
            , "transition.slideLeftBigIn": {
                defaultDuration: 800
                , calls: [[{
                    opacity: [1, 0]
                    , translateX: [0, -75]
                    , translateZ: 0
                }]]
            }
            , "transition.slideLeftBigOut": {
                defaultDuration: 750
                , calls: [[{
                    opacity: [0, 1]
                    , translateX: -75
                    , translateZ: 0
                }]]
                , reset: {
                    translateX: 0
                }
            }
            , "transition.slideRightBigIn": {
                defaultDuration: 800
                , calls: [[{
                    opacity: [1, 0]
                    , translateX: [0, 75]
                    , translateZ: 0
                }]]
            }
            , "transition.slideRightBigOut": {
                defaultDuration: 750
                , calls: [[{
                    opacity: [0, 1]
                    , translateX: 75
                    , translateZ: 0
                }]]
                , reset: {
                    translateX: 0
                }
            }
            , "transition.perspectiveUpIn": {
                defaultDuration: 800
                , calls: [[{
                    opacity: [1, 0]
                    , transformPerspective: [800, 800]
                    , transformOriginX: [0, 0]
                    , transformOriginY: ["100%", "100%"]
                    , rotateX: [0, -180]
                }]]
                , reset: {
                    transformPerspective: 0
                    , transformOriginX: "50%"
                    , transformOriginY: "50%"
                }
            }
            , "transition.perspectiveUpOut": {
                defaultDuration: 850
                , calls: [[{
                    opacity: [0, 1]
                    , transformPerspective: [800, 800]
                    , transformOriginX: [0, 0]
                    , transformOriginY: ["100%", "100%"]
                    , rotateX: -180
                }]]
                , reset: {
                    transformPerspective: 0
                    , transformOriginX: "50%"
                    , transformOriginY: "50%"
                    , rotateX: 0
                }
            }
            , "transition.perspectiveDownIn": {
                defaultDuration: 800
                , calls: [[{
                    opacity: [1, 0]
                    , transformPerspective: [800, 800]
                    , transformOriginX: [0, 0]
                    , transformOriginY: [0, 0]
                    , rotateX: [0, 180]
                }]]
                , reset: {
                    transformPerspective: 0
                    , transformOriginX: "50%"
                    , transformOriginY: "50%"
                }
            }
            , "transition.perspectiveDownOut": {
                defaultDuration: 850
                , calls: [[{
                    opacity: [0, 1]
                    , transformPerspective: [800, 800]
                    , transformOriginX: [0, 0]
                    , transformOriginY: [0, 0]
                    , rotateX: 180
                }]]
                , reset: {
                    transformPerspective: 0
                    , transformOriginX: "50%"
                    , transformOriginY: "50%"
                    , rotateX: 0
                }
            }
            , "transition.perspectiveLeftIn": {
                defaultDuration: 950
                , calls: [[{
                    opacity: [1, 0]
                    , transformPerspective: [2e3, 2e3]
                    , transformOriginX: [0, 0]
                    , transformOriginY: [0, 0]
                    , rotateY: [0, -180]
                }]]
                , reset: {
                    transformPerspective: 0
                    , transformOriginX: "50%"
                    , transformOriginY: "50%"
                }
            }
            , "transition.perspectiveLeftOut": {
                defaultDuration: 950
                , calls: [[{
                    opacity: [0, 1]
                    , transformPerspective: [2e3, 2e3]
                    , transformOriginX: [0, 0]
                    , transformOriginY: [0, 0]
                    , rotateY: -180
                }]]
                , reset: {
                    transformPerspective: 0
                    , transformOriginX: "50%"
                    , transformOriginY: "50%"
                    , rotateY: 0
                }
            }
            , "transition.perspectiveRightIn": {
                defaultDuration: 950
                , calls: [[{
                    opacity: [1, 0]
                    , transformPerspective: [2e3, 2e3]
                    , transformOriginX: ["100%", "100%"]
                    , transformOriginY: [0, 0]
                    , rotateY: [0, 180]
                }]]
                , reset: {
                    transformPerspective: 0
                    , transformOriginX: "50%"
                    , transformOriginY: "50%"
                }
            }
            , "transition.perspectiveRightOut": {
                defaultDuration: 950
                , calls: [[{
                    opacity: [0, 1]
                    , transformPerspective: [2e3, 2e3]
                    , transformOriginX: ["100%", "100%"]
                    , transformOriginY: [0, 0]
                    , rotateY: 180
                }]]
                , reset: {
                    transformPerspective: 0
                    , transformOriginX: "50%"
                    , transformOriginY: "50%"
                    , rotateY: 0
                }
            }
        };
        for (var u in n.RegisterEffect.packagedEffects) n.RegisterEffect(u, n.RegisterEffect.packagedEffects[u]);
        n.RunSequence = function (e) {
            var t = $.extend(!0, [], e);
            t.length > 1 && ($.each(t.reverse(), function (e, i) {
                var a = t[e + 1];
                if (a) {
                    var r = i.o || i.options
                        , s = a.o || a.options
                        , o = r && r.sequenceQueue === !1 ? "begin" : "complete"
                        , l = s && s[o]
                        , u = {};
                    u[o] = function () {
                        var e = a.e || a.elements
                            , t = e.nodeType ? [e] : e;
                        l && l.call(t, t), n(i)
                    }, a.o ? a.o = $.extend({}, s, u) : a.options = $.extend({}, s, u)
                }
            }), t.reverse()), n(t[0])
        }
    }(window.jQuery || window.Zepto || window, window, document)
})
, function () {
    for (var e, t = function () {}, i = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeline", "timelineEnd", "timeStamp", "trace", "warn"], a = i.length, r = window.console = window.console || {}; a--;) e = i[a], r[e] || (r[e] = t)
}()
, function () {
    "use strict";

    function e(e) {
        e.fn.swiper = function (i) {
            var a;
            return e(this).each(function () {
                var e = new t(this, i);
                a || (a = e)
            }), a
        }
    }
    var t = function (e, i) {
        function a() {
            return "horizontal" === m.params.direction
        }

        function r() {
            m.autoplayTimeoutId = setTimeout(function () {
                m.params.loop ? (m.fixLoop(), m._slideNext()) : m.isEnd ? i.autoplayStopOnLast ? m.stopAutoplay() : m._slideTo(0) : m._slideNext()
            }, m.params.autoplay)
        }

        function n(e, t) {
            var i = $(e.target);
            if (!i.is(t))
                if ("string" == typeof t) i = i.parents(t);
                else if (t.nodeType) {
                var a;
                return i.parents().each(function (e, i) {
                    i === t && (a = t)
                }), a ? t : void 0
            }
            return 0 === i.length ? void 0 : i[0]
        }

        function s(e, t) {
            t = t || {};
            var i = window.MutationObserver || window.WebkitMutationObserver
                , a = new i(function (e) {
                    e.forEach(function (e) {
                        m.onResize(!0), m.emit("onObserverUpdate", m, e)
                    })
                });
            a.observe(e, {
                attributes: "undefined" == typeof t.attributes ? !0 : t.attributes
                , childList: "undefined" == typeof t.childList ? !0 : t.childList
                , characterData: "undefined" == typeof t.characterData ? !0 : t.characterData
            }), m.observers.push(a)
        }

        function o(e) {
            e.originalEvent && (e = e.originalEvent);
            var t = e.keyCode || e.charCode;
            if (!m.params.allowSwipeToNext && (a() && 39 === t || !a() && 40 === t)) return !1;
            if (!m.params.allowSwipeToPrev && (a() && 37 === t || !a() && 38 === t)) return !1;
            if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === t || 39 === t || 38 === t || 40 === t) {
                    var i = !1;
                    if (m.container.parents(".swiper-slide").length > 0 && 0 === m.container.parents(".swiper-slide-active").length) return;
                    var r = {
                            left: window.pageXOffset
                            , top: window.pageYOffset
                        }
                        , n = window.innerWidth
                        , s = window.innerHeight
                        , o = m.container.offset();
                    m.rtl && (o.left = o.left - m.container[0].scrollLeft);
                    for (var l = [[o.left, o.top], [o.left + m.width, o.top], [o.left, o.top + m.height], [o.left + m.width, o.top + m.height]], u = 0; u < l.length; u++) {
                        var d = l[u];
                        d[0] >= r.left && d[0] <= r.left + n && d[1] >= r.top && d[1] <= r.top + s && (i = !0)
                    }
                    if (!i) return
                }
                a() ? ((37 === t || 39 === t) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === t && !m.rtl || 37 === t && m.rtl) && m.slideNext(), (37 === t && !m.rtl || 39 === t && m.rtl) && m.slidePrev()) : ((38 === t || 40 === t) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === t && m.slideNext(), 38 === t && m.slidePrev())
            }
        }

        function l(e) {
            e.originalEvent && (e = e.originalEvent);
            var t = m.mousewheel.event
                , i = 0;
            if (e.detail) i = -e.detail;
            else if ("mousewheel" === t)
                if (m.params.mousewheelForceToAxis)
                    if (a()) {
                        if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;
                        i = e.wheelDeltaX
                    }
                    else {
                        if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) return;
                        i = e.wheelDeltaY
                    }
            else i = e.wheelDelta;
            else if ("DOMMouseScroll" === t) i = -e.detail;
            else if ("wheel" === t)
                if (m.params.mousewheelForceToAxis)
                    if (a()) {
                        if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;
                        i = -e.deltaX
                    }
                    else {
                        if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;
                        i = -e.deltaY
                    }
            else i = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX : -e.deltaY;
            if (m.params.mousewheelInvert && (i = -i), m.params.freeMode) {
                var r = m.getWrapperTranslate() + i;
                if (r > 0 && (r = 0), r < m.maxTranslate() && (r = m.maxTranslate()), m.setWrapperTransition(0), m.setWrapperTranslate(r), m.updateProgress(), m.updateActiveIndex(), m.params.freeModeSticky && (clearTimeout(m.mousewheel.timeout), m.mousewheel.timeout = setTimeout(function () {
                        m.slideReset()
                    }, 300)), 0 === r || r === m.maxTranslate()) return
            }
            else {
                if ((new window.Date).getTime() - m.mousewheel.lastScrollTime > 60)
                    if (0 > i)
                        if (m.isEnd) {
                            if (m.params.mousewheelReleaseOnEdges) return !0
                        }
                        else m.slideNext();
                else if (m.isBeginning) {
                    if (m.params.mousewheelReleaseOnEdges) return !0
                }
                else m.slidePrev();
                m.mousewheel.lastScrollTime = (new window.Date).getTime()
            }
            return m.params.autoplay && m.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
        }

        function u(e, t) {
            e = $(e);
            var i, r, n;
            i = e.attr("data-swiper-parallax") || "0", r = e.attr("data-swiper-parallax-x"), n = e.attr("data-swiper-parallax-y"), r || n ? (r = r || "0", n = n || "0") : a() ? (r = i, n = "0") : (n = i, r = "0"), r = r.indexOf("%") >= 0 ? parseInt(r, 10) * t + "%" : r * t + "px", n = n.indexOf("%") >= 0 ? parseInt(n, 10) * t + "%" : n * t + "px", e.transform("translate3d(" + r + ", " + n + ",0px)")
        }

        function d(e) {
            return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
        }
        if (!(this instanceof t)) return new t(e, i);
        var c = {
                direction: "horizontal"
                , touchEventsTarget: "container"
                , initialSlide: 0
                , speed: 300
                , autoplay: !1
                , autoplayDisableOnInteraction: !0
                , freeMode: !1
                , freeModeMomentum: !0
                , freeModeMomentumRatio: 1
                , freeModeMomentumBounce: !0
                , freeModeMomentumBounceRatio: 1
                , freeModeSticky: !1
                , setWrapperSize: !1
                , virtualTranslate: !1
                , effect: "slide"
                , coverflow: {
                    rotate: 50
                    , stretch: 0
                    , depth: 100
                    , modifier: 1
                    , slideShadows: !0
                }
                , cube: {
                    slideShadows: !0
                    , shadow: !0
                    , shadowOffset: 20
                    , shadowScale: .94
                }
                , fade: {
                    crossFade: !1
                }
                , parallax: !1
                , scrollbar: null
                , scrollbarHide: !0
                , keyboardControl: !1
                , mousewheelControl: !1
                , mousewheelReleaseOnEdges: !1
                , mousewheelInvert: !1
                , mousewheelForceToAxis: !1
                , hashnav: !1
                , spaceBetween: 0
                , slidesPerView: 1
                , slidesPerColumn: 1
                , slidesPerColumnFill: "column"
                , slidesPerGroup: 1
                , centeredSlides: !1
                , touchRatio: 1
                , touchAngle: 45
                , simulateTouch: !0
                , shortSwipes: !0
                , longSwipes: !0
                , longSwipesRatio: .5
                , longSwipesMs: 300
                , followFinger: !0
                , onlyExternal: !1
                , threshold: 0
                , touchMoveStopPropagation: !0
                , pagination: null
                , paginationClickable: !1
                , paginationHide: !1
                , paginationBulletRender: null
                , resistance: !0
                , resistanceRatio: .85
                , nextButton: null
                , prevButton: null
                , watchSlidesProgress: !1
                , watchSlidesVisibility: !1
                , grabCursor: !1
                , preventClicks: !0
                , preventClicksPropagation: !0
                , slideToClickedSlide: !1
                , lazyLoading: !1
                , lazyLoadingInPrevNext: !1
                , lazyLoadingOnTransitionStart: !1
                , preloadImages: !0
                , updateOnImagesReady: !0
                , loop: !1
                , loopAdditionalSlides: 0
                , loopedSlides: null
                , control: void 0
                , controlInverse: !1
                , allowSwipeToPrev: !0
                , allowSwipeToNext: !0
                , swipeHandler: null
                , noSwiping: !0
                , noSwipingClass: "swiper-no-swiping"
                , slideClass: "swiper-slide"
                , slideActiveClass: "swiper-slide-active"
                , slideVisibleClass: "swiper-slide-visible"
                , slideDuplicateClass: "swiper-slide-duplicate"
                , slideNextClass: "swiper-slide-next"
                , slidePrevClass: "swiper-slide-prev"
                , wrapperClass: "swiper-wrapper"
                , bulletClass: "swiper-pagination-bullet"
                , bulletActiveClass: "swiper-pagination-bullet-active"
                , buttonDisabledClass: "swiper-button-disabled"
                , paginationHiddenClass: "swiper-pagination-hidden"
                , observer: !1
                , observeParents: !1
                , a11y: !1
                , prevSlideMessage: "Previous slide"
                , nextSlideMessage: "Next slide"
                , firstSlideMessage: "This is the first slide"
                , lastSlideMessage: "This is the last slide"
                , runCallbacksOnInit: !0
            }
            , p = i && i.virtualTranslate;
        i = i || {};
        for (var f in c)
            if ("undefined" == typeof i[f]) i[f] = c[f];
            else if ("object" == typeof i[f])
            for (var h in c[f]) "undefined" == typeof i[f][h] && (i[f][h] = c[f][h]);
        var m = this;
        m.version = "3.0.8", m.params = i, m.classNames = [];
        var $;
        if ($ = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7, $ && (m.$ = $, m.container = $(e), 0 !== m.container.length)) {
            if (m.container.length > 1) return void m.container.each(function () {
                new t(this, i)
            });
            m.container[0].swiper = m, m.container.data("swiper", m), m.classNames.push("swiper-container-" + m.params.direction), m.params.freeMode && m.classNames.push("swiper-container-free-mode"), m.support.flexbox || (m.classNames.push("swiper-container-no-flexbox"), m.params.slidesPerColumn = 1), (m.params.parallax || m.params.watchSlidesVisibility) && (m.params.watchSlidesProgress = !0), ["cube", "coverflow"].indexOf(m.params.effect) >= 0 && (m.support.transforms3d ? (m.params.watchSlidesProgress = !0, m.classNames.push("swiper-container-3d")) : m.params.effect = "slide"), "slide" !== m.params.effect && m.classNames.push("swiper-container-" + m.params.effect), "cube" === m.params.effect && (m.params.resistanceRatio = 0, m.params.slidesPerView = 1, m.params.slidesPerColumn = 1, m.params.slidesPerGroup = 1, m.params.centeredSlides = !1, m.params.spaceBetween = 0, m.params.virtualTranslate = !0, m.params.setWrapperSize = !1), "fade" === m.params.effect && (m.params.slidesPerView = 1, m.params.slidesPerColumn = 1, m.params.slidesPerGroup = 1, m.params.watchSlidesProgress = !0, m.params.spaceBetween = 0, "undefined" == typeof p && (m.params.virtualTranslate = !0)), m.params.grabCursor && m.support.touch && (m.params.grabCursor = !1), m.wrapper = m.container.children("." + m.params.wrapperClass), m.params.pagination && (m.paginationContainer = $(m.params.pagination), m.params.paginationClickable && m.paginationContainer.addClass("swiper-pagination-clickable"))
                , m.rtl = a() && ("rtl" === m.container[0].dir.toLowerCase() || "rtl" === m.container.css("direction")), m.rtl && m.classNames.push("swiper-container-rtl"), m.rtl && (m.wrongRTL = "-webkit-box" === m.wrapper.css("display")), m.params.slidesPerColumn > 1 && m.classNames.push("swiper-container-multirow"), m.device.android && m.classNames.push("swiper-container-android"), m.container.addClass(m.classNames.join(" ")), m.translate = 0, m.progress = 0, m.velocity = 0, m.lockSwipeToNext = function () {
                    m.params.allowSwipeToNext = !1
                }, m.lockSwipeToPrev = function () {
                    m.params.allowSwipeToPrev = !1
                }, m.lockSwipes = function () {
                    m.params.allowSwipeToNext = m.params.allowSwipeToPrev = !1
                }, m.unlockSwipeToNext = function () {
                    m.params.allowSwipeToNext = !0
                }, m.unlockSwipeToPrev = function () {
                    m.params.allowSwipeToPrev = !0
                }, m.unlockSwipes = function () {
                    m.params.allowSwipeToNext = m.params.allowSwipeToPrev = !0
                }, m.params.grabCursor && (m.container[0].style.cursor = "move", m.container[0].style.cursor = "-webkit-grab", m.container[0].style.cursor = "-moz-grab", m.container[0].style.cursor = "grab"), m.imagesToLoad = [], m.imagesLoaded = 0, m.loadImage = function (e, t, i, a) {
                    function r() {
                        a && a()
                    }
                    var n;
                    e.complete && i ? r() : t ? (n = new window.Image, n.onload = r, n.onerror = r, n.src = t) : r()
                }, m.preloadImages = function () {
                    function e() {
                        "undefined" != typeof m && null !== m && (void 0 !== m.imagesLoaded && m.imagesLoaded++, m.imagesLoaded === m.imagesToLoad.length && (m.params.updateOnImagesReady && m.update(), m.emit("onImagesReady", m)))
                    }
                    m.imagesToLoad = m.container.find("img");
                    for (var t = 0; t < m.imagesToLoad.length; t++) m.loadImage(m.imagesToLoad[t], m.imagesToLoad[t].currentSrc || m.imagesToLoad[t].getAttribute("src"), !0, e)
                }, m.autoplayTimeoutId = void 0, m.autoplaying = !1, m.autoplayPaused = !1, m.startAutoplay = function () {
                    return "undefined" != typeof m.autoplayTimeoutId ? !1 : m.params.autoplay ? m.autoplaying ? !1 : (m.autoplaying = !0, m.emit("onAutoplayStart", m), void r()) : !1
                }, m.stopAutoplay = function (e) {
                    m.autoplayTimeoutId && (m.autoplayTimeoutId && clearTimeout(m.autoplayTimeoutId), m.autoplaying = !1, m.autoplayTimeoutId = void 0, m.emit("onAutoplayStop", m))
                }, m.pauseAutoplay = function (e) {
                    m.autoplayPaused || (m.autoplayTimeoutId && clearTimeout(m.autoplayTimeoutId), m.autoplayPaused = !0, 0 === e ? (m.autoplayPaused = !1, r()) : m.wrapper.transitionEnd(function () {
                        m && (m.autoplayPaused = !1, m.autoplaying ? r() : m.stopAutoplay())
                    }))
                }, m.minTranslate = function () {
                    return -m.snapGrid[0]
                }, m.maxTranslate = function () {
                    return -m.snapGrid[m.snapGrid.length - 1]
                }, m.updateContainerSize = function () {
                    var e, t;
                    e = "undefined" != typeof m.params.width ? m.params.width : m.container[0].clientWidth, t = "undefined" != typeof m.params.height ? m.params.height : m.container[0].clientHeight, 0 === e && a() || 0 === t && !a() || (m.width = e, m.height = t, m.size = a() ? m.width : m.height)
                }, m.updateSlidesSize = function () {
                    m.slides = m.wrapper.children("." + m.params.slideClass), m.snapGrid = [], m.slidesGrid = [], m.slidesSizesGrid = [];
                    var e = m.params.spaceBetween
                        , t = 0
                        , i, r = 0
                        , n = 0;
                    "string" == typeof e && e.indexOf("%") >= 0 && (e = parseFloat(e.replace("%", "")) / 100 * m.size), m.virtualSize = -e, m.rtl ? m.slides.css({
                        marginLeft: ""
                        , marginTop: ""
                    }) : m.slides.css({
                        marginRight: ""
                        , marginBottom: ""
                    });
                    var s;
                    m.params.slidesPerColumn > 1 && (s = Math.floor(m.slides.length / m.params.slidesPerColumn) === m.slides.length / m.params.slidesPerColumn ? m.slides.length : Math.ceil(m.slides.length / m.params.slidesPerColumn) * m.params.slidesPerColumn);
                    var o, l = m.params.slidesPerColumn
                        , u = s / l
                        , d = u - (m.params.slidesPerColumn * u - m.slides.length);
                    for (i = 0; i < m.slides.length; i++) {
                        o = 0;
                        var c = m.slides.eq(i);
                        if (m.params.slidesPerColumn > 1) {
                            var p, f, h;
                            "column" === m.params.slidesPerColumnFill ? (f = Math.floor(i / l), h = i - f * l, (f > d || f === d && h === l - 1) && ++h >= l && (h = 0, f++), p = f + h * s / l, c.css({
                                "-webkit-box-ordinal-group": p
                                , "-moz-box-ordinal-group": p
                                , "-ms-flex-order": p
                                , "-webkit-order": p
                                , order: p
                            })) : (h = Math.floor(i / u), f = i - h * u), c.css({
                                "margin-top": 0 !== h && m.params.spaceBetween && m.params.spaceBetween + "px"
                            }).attr("data-swiper-column", f).attr("data-swiper-row", h)
                        }
                        "none" !== c.css("display") && ("auto" === m.params.slidesPerView ? o = a() ? c.outerWidth(!0) : c.outerHeight(!0) : (o = (m.size - (m.params.slidesPerView - 1) * e) / m.params.slidesPerView, a() ? m.slides[i].style.width = o + "px" : m.slides[i].style.height = o + "px"), m.slides[i].swiperSlideSize = o, m.slidesSizesGrid.push(o), m.params.centeredSlides ? (t = t + o / 2 + r / 2 + e, 0 === i && (t = t - m.size / 2 - e), Math.abs(t) < .001 && (t = 0), n % m.params.slidesPerGroup === 0 && m.snapGrid.push(t), m.slidesGrid.push(t)) : (n % m.params.slidesPerGroup === 0 && m.snapGrid.push(t), m.slidesGrid.push(t), t = t + o + e), m.virtualSize += o + e, r = o, n++)
                    }
                    m.virtualSize = Math.max(m.virtualSize, m.size);
                    var g;
                    if (m.rtl && m.wrongRTL && ("slide" === m.params.effect || "coverflow" === m.params.effect) && m.wrapper.css({
                            width: m.virtualSize + m.params.spaceBetween + "px"
                        }), (!m.support.flexbox || m.params.setWrapperSize) && (a() ? m.wrapper.css({
                            width: m.virtualSize + m.params.spaceBetween + "px"
                        }) : m.wrapper.css({
                            height: m.virtualSize + m.params.spaceBetween + "px"
                        })), m.params.slidesPerColumn > 1 && (m.virtualSize = (o + m.params.spaceBetween) * s, m.virtualSize = Math.ceil(m.virtualSize / m.params.slidesPerColumn) - m.params.spaceBetween, m.wrapper.css({
                            width: m.virtualSize + m.params.spaceBetween + "px"
                        }), m.params.centeredSlides)) {
                        for (g = [], i = 0; i < m.snapGrid.length; i++) m.snapGrid[i] < m.virtualSize + m.snapGrid[0] && g.push(m.snapGrid[i]);
                        m.snapGrid = g
                    }
                    if (!m.params.centeredSlides) {
                        for (g = [], i = 0; i < m.snapGrid.length; i++) m.snapGrid[i] <= m.virtualSize - m.size && g.push(m.snapGrid[i]);
                        m.snapGrid = g, Math.floor(m.virtualSize - m.size) > Math.floor(m.snapGrid[m.snapGrid.length - 1]) && m.snapGrid.push(m.virtualSize - m.size)
                    }
                    0 === m.snapGrid.length && (m.snapGrid = [0]), 0 !== m.params.spaceBetween && (a() ? m.rtl ? m.slides.css({
                        marginLeft: e + "px"
                    }) : m.slides.css({
                        marginRight: e + "px"
                    }) : m.slides.css({
                        marginBottom: e + "px"
                    })), m.params.watchSlidesProgress && m.updateSlidesOffset()
                }, m.updateSlidesOffset = function () {
                    for (var e = 0; e < m.slides.length; e++) m.slides[e].swiperSlideOffset = a() ? m.slides[e].offsetLeft : m.slides[e].offsetTop
                }, m.updateSlidesProgress = function (e) {
                    if ("undefined" == typeof e && (e = m.translate || 0), 0 !== m.slides.length) {
                        "undefined" == typeof m.slides[0].swiperSlideOffset && m.updateSlidesOffset();
                        var t = m.params.centeredSlides ? -e + m.size / 2 : -e;
                        m.rtl && (t = m.params.centeredSlides ? e - m.size / 2 : e);
                        var i = m.container[0].getBoundingClientRect()
                            , r = a() ? "left" : "top"
                            , n = a() ? "right" : "bottom";
                        m.slides.removeClass(m.params.slideVisibleClass);
                        for (var s = 0; s < m.slides.length; s++) {
                            var o = m.slides[s]
                                , l = m.params.centeredSlides === !0 ? o.swiperSlideSize / 2 : 0
                                , u = (t - o.swiperSlideOffset - l) / (o.swiperSlideSize + m.params.spaceBetween);
                            if (m.params.watchSlidesVisibility) {
                                var d = -(t - o.swiperSlideOffset - l)
                                    , c = d + m.slidesSizesGrid[s]
                                    , p = d >= 0 && d < m.size || c > 0 && c <= m.size || 0 >= d && c >= m.size;
                                p && m.slides.eq(s).addClass(m.params.slideVisibleClass)
                            }
                            o.progress = m.rtl ? -u : u
                        }
                    }
                }, m.updateProgress = function (e) {
                    "undefined" == typeof e && (e = m.translate || 0);
                    var t = m.maxTranslate() - m.minTranslate();
                    0 === t ? (m.progress = 0, m.isBeginning = m.isEnd = !0) : (m.progress = (e - m.minTranslate()) / t, m.isBeginning = m.progress <= 0, m.isEnd = m.progress >= 1), m.isBeginning && m.emit("onReachBeginning", m), m.isEnd && m.emit("onReachEnd", m), m.params.watchSlidesProgress && m.updateSlidesProgress(e), m.emit("onProgress", m, m.progress)
                }, m.updateActiveIndex = function () {
                    var e = m.rtl ? m.translate : -m.translate
                        , t, i, a;
                    for (i = 0; i < m.slidesGrid.length; i++) "undefined" != typeof m.slidesGrid[i + 1] ? e >= m.slidesGrid[i] && e < m.slidesGrid[i + 1] - (m.slidesGrid[i + 1] - m.slidesGrid[i]) / 2 ? t = i : e >= m.slidesGrid[i] && e < m.slidesGrid[i + 1] && (t = i + 1) : e >= m.slidesGrid[i] && (t = i);
                    (0 > t || "undefined" == typeof t) && (t = 0), a = Math.floor(t / m.params.slidesPerGroup), a >= m.snapGrid.length && (a = m.snapGrid.length - 1), t !== m.activeIndex && (m.snapIndex = a, m.previousIndex = m.activeIndex, m.activeIndex = t, m.updateClasses())
                }, m.updateClasses = function () {
                    m.slides.removeClass(m.params.slideActiveClass + " " + m.params.slideNextClass + " " + m.params.slidePrevClass);
                    var e = m.slides.eq(m.activeIndex);
                    if (e.addClass(m.params.slideActiveClass), e.next("." + m.params.slideClass).addClass(m.params.slideNextClass), e.prev("." + m.params.slideClass).addClass(m.params.slidePrevClass), m.bullets && m.bullets.length > 0) {
                        m.bullets.removeClass(m.params.bulletActiveClass);
                        var t;
                        m.params.loop ? (t = Math.ceil(m.activeIndex - m.loopedSlides) / m.params.slidesPerGroup, t > m.slides.length - 1 - 2 * m.loopedSlides && (t -= m.slides.length - 2 * m.loopedSlides), t > m.bullets.length - 1 && (t -= m.bullets.length)) : t = "undefined" != typeof m.snapIndex ? m.snapIndex : m.activeIndex || 0, m.paginationContainer.length > 1 ? m.bullets.each(function () {
                            $(this).index() === t && $(this).addClass(m.params.bulletActiveClass)
                        }) : m.bullets.eq(t).addClass(m.params.bulletActiveClass)
                    }
                    m.params.loop || (m.params.prevButton && (m.isBeginning ? ($(m.params.prevButton).addClass(m.params.buttonDisabledClass), m.params.a11y && m.a11y && m.a11y.disable($(m.params.prevButton))) : ($(m.params.prevButton).removeClass(m.params.buttonDisabledClass), m.params.a11y && m.a11y && m.a11y.enable($(m.params.prevButton)))), m.params.nextButton && (m.isEnd ? ($(m.params.nextButton).addClass(m.params.buttonDisabledClass), m.params.a11y && m.a11y && m.a11y.disable($(m.params.nextButton))) : ($(m.params.nextButton).removeClass(m.params.buttonDisabledClass), m.params.a11y && m.a11y && m.a11y.enable($(m.params.nextButton)))))
                }, m.updatePagination = function () {
                    if (m.params.pagination && m.paginationContainer && m.paginationContainer.length > 0) {
                        for (var e = "", t = m.params.loop ? Math.ceil((m.slides.length - 2 * m.loopedSlides) / m.params.slidesPerGroup) : m.snapGrid.length, i = 0; t > i; i++) e += m.params.paginationBulletRender ? m.params.paginationBulletRender(i, m.params.bulletClass) : '<span class="' + m.params.bulletClass + '"></span>';
                        m.paginationContainer.html(e), m.bullets = m.paginationContainer.find("." + m.params.bulletClass)
                    }
                }, m.update = function (e) {
                    function t() {
                        a = Math.min(Math.max(m.translate, m.maxTranslate()), m.minTranslate()), m.setWrapperTranslate(a), m.updateActiveIndex(), m.updateClasses()
                    }
                    if (m.updateContainerSize(), m.updateSlidesSize(), m.updateProgress(), m.updatePagination(), m.updateClasses(), m.params.scrollbar && m.scrollbar && m.scrollbar.set(), e) {
                        var i, a;
                        m.params.freeMode ? t() : (i = "auto" === m.params.slidesPerView && m.isEnd && !m.params.centeredSlides ? m.slideTo(m.slides.length - 1, 0, !1, !0) : m.slideTo(m.activeIndex, 0, !1, !0), i || t())
                    }
                }, m.onResize = function (e) {
                    if (m.updateContainerSize(), m.updateSlidesSize(), m.updateProgress(), ("auto" === m.params.slidesPerView || m.params.freeMode || e) && m.updatePagination(), m.params.scrollbar && m.scrollbar && m.scrollbar.set(), m.params.freeMode) {
                        var t = Math.min(Math.max(m.translate, m.maxTranslate()), m.minTranslate());
                        m.setWrapperTranslate(t), m.updateActiveIndex(), m.updateClasses()
                    }
                    else m.updateClasses(), "auto" === m.params.slidesPerView && m.isEnd && !m.params.centeredSlides ? m.slideTo(m.slides.length - 1, 0, !1, !0) : m.slideTo(m.activeIndex, 0, !1, !0)
                };
            var g = ["mousedown", "mousemove", "mouseup"];
            window.navigator.pointerEnabled ? g = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (g = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), m.touchEvents = {
                start: m.support.touch || !m.params.simulateTouch ? "touchstart" : g[0]
                , move: m.support.touch || !m.params.simulateTouch ? "touchmove" : g[1]
                , end: m.support.touch || !m.params.simulateTouch ? "touchend" : g[2]
            }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === m.params.touchEventsTarget ? m.container : m.wrapper).addClass("swiper-wp8-" + m.params.direction), m.initEvents = function (e) {
                var t = e ? "off" : "on"
                    , a = e ? "removeEventListener" : "addEventListener"
                    , r = "container" === m.params.touchEventsTarget ? m.container[0] : m.wrapper[0]
                    , n = m.support.touch ? r : document
                    , s = m.params.nested ? !0 : !1;
                m.browser.ie ? (r[a](m.touchEvents.start, m.onTouchStart, !1), n[a](m.touchEvents.move, m.onTouchMove, s), n[a](m.touchEvents.end, m.onTouchEnd, !1)) : (m.support.touch && (r[a](m.touchEvents.start, m.onTouchStart, !1), r[a](m.touchEvents.move, m.onTouchMove, s), r[a](m.touchEvents.end, m.onTouchEnd, !1)), !i.simulateTouch || m.device.ios || m.device.android || (r[a]("mousedown", m.onTouchStart, !1), document[a]("mousemove", m.onTouchMove, s), document[a]("mouseup", m.onTouchEnd, !1))), window[a]("resize", m.onResize), m.params.nextButton && ($(m.params.nextButton)[t]("click", m.onClickNext), m.params.a11y && m.a11y && $(m.params.nextButton)[t]("keydown", m.a11y.onEnterKey)), m.params.prevButton && ($(m.params.prevButton)[t]("click", m.onClickPrev), m.params.a11y && m.a11y && $(m.params.prevButton)[t]("keydown", m.a11y.onEnterKey)), m.params.pagination && m.params.paginationClickable && $(m.paginationContainer)[t]("click", "." + m.params.bulletClass, m.onClickIndex), (m.params.preventClicks || m.params.preventClicksPropagation) && r[a]("click", m.preventClicks, !0)
            }, m.attachEvents = function (e) {
                m.initEvents()
            }, m.detachEvents = function () {
                m.initEvents(!0)
            }, m.allowClick = !0, m.preventClicks = function (e) {
                m.allowClick || (m.params.preventClicks && e.preventDefault(), m.params.preventClicksPropagation && m.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
            }, m.onClickNext = function (e) {
                e.preventDefault(), m.slideNext()
            }, m.onClickPrev = function (e) {
                e.preventDefault(), m.slidePrev()
            }, m.onClickIndex = function (e) {
                e.preventDefault();
                var t = $(this).index() * m.params.slidesPerGroup;
                m.params.loop && (t += m.loopedSlides), m.slideTo(t)
            }, m.updateClickedSlide = function (e) {
                var t = n(e, "." + m.params.slideClass)
                    , i = !1;
                if (t)
                    for (var a = 0; a < m.slides.length; a++) m.slides[a] === t && (i = !0);
                if (!t || !i) return m.clickedSlide = void 0, void(m.clickedIndex = void 0);
                if (m.clickedSlide = t, m.clickedIndex = $(t).index(), m.params.slideToClickedSlide && void 0 !== m.clickedIndex && m.clickedIndex !== m.activeIndex) {
                    var r = m.clickedIndex
                        , s;
                    if (m.params.loop)
                        if (s = $(m.clickedSlide).attr("data-swiper-slide-index"), r > m.slides.length - m.params.slidesPerView) m.fixLoop(), r = m.wrapper.children("." + m.params.slideClass + '[data-swiper-slide-index="' + s + '"]').eq(0).index(), setTimeout(function () {
                            m.slideTo(r)
                        }, 0);
                        else if (r < m.params.slidesPerView - 1) {
                        m.fixLoop();
                        var o = m.wrapper.children("." + m.params.slideClass + '[data-swiper-slide-index="' + s + '"]');
                        r = o.eq(o.length - 1).index(), setTimeout(function () {
                            m.slideTo(r)
                        }, 0)
                    }
                    else m.slideTo(r);
                    else m.slideTo(r)
                }
            };
            var v, y, w, b, x, C, _, S = "input, select, textarea, button"
                , T = Date.now()
                , k, P = []
                , E;
            m.animating = !1, m.touches = {
                startX: 0
                , startY: 0
                , currentX: 0
                , currentY: 0
                , diff: 0
            };
            var A, F;
            if (m.onTouchStart = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), A = "touchstart" === e.type, A || !("which" in e) || 3 !== e.which) {
                        if (m.params.noSwiping && n(e, "." + m.params.noSwipingClass)) return void(m.allowClick = !0);
                        if (!m.params.swipeHandler || n(e, m.params.swipeHandler)) {
                            if (v = !0, y = !1, b = void 0, F = void 0, m.touches.startX = m.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, m.touches.startY = m.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY, w = Date.now(), m.allowClick = !0, m.updateContainerSize(), m.swipeDirection = void 0, m.params.threshold > 0 && (_ = !1), "touchstart" !== e.type) {
                                var t = !0;
                                $(e.target).is(S) && (t = !1), document.activeElement && $(document.activeElement).is(S) && document.activeElement.blur(), t && e.preventDefault()
                            }
                            m.emit("onTouchStart", m, e)
                        }
                    }
                }, m.onTouchMove = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), !(A && "mousemove" === e.type || e.preventedByNestedSwiper)) {
                        if (m.params.onlyExternal) return y = !0, void(m.allowClick = !1);
                        if (A && document.activeElement && e.target === document.activeElement && $(e.target).is(S)) return y = !0, void(m.allowClick = !1);
                        if (m.emit("onTouchMove", m, e), !(e.targetTouches && e.targetTouches.length > 1)) {
                            if (m.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, m.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof b) {
                                var t = 180 * Math.atan2(Math.abs(m.touches.currentY - m.touches.startY), Math.abs(m.touches.currentX - m.touches.startX)) / Math.PI;
                                b = a() ? t > m.params.touchAngle : 90 - t > m.params.touchAngle
                            }
                            if (b && m.emit("onTouchMoveOpposite", m, e), "undefined" == typeof F && m.browser.ieTouch && (m.touches.currentX !== m.touches.startX || m.touches.currentY !== m.touches.startY) && (F = !0), v) {
                                if (b) return void(v = !1);
                                if (F || !m.browser.ieTouch) {
                                    m.allowClick = !1, m.emit("onSliderMove", m, e), e.preventDefault(), m.params.touchMoveStopPropagation && !m.params.nested && e.stopPropagation(), y || (i.loop && m.fixLoop(), C = m.getWrapperTranslate(), m.setWrapperTransition(0), m.animating && m.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), m.params.autoplay && m.autoplaying && (m.params.autoplayDisableOnInteraction ? m.stopAutoplay() : m.pauseAutoplay()), E = !1, m.params.grabCursor && (m.container[0].style.cursor = "move", m.container[0].style.cursor = "-webkit-grabbing", m.container[0].style.cursor = "-moz-grabbin", m.container[0].style.cursor = "grabbing")), y = !0;
                                    var r = m.touches.diff = a() ? m.touches.currentX - m.touches.startX : m.touches.currentY - m.touches.startY;
                                    r *= m.params.touchRatio, m.rtl && (r = -r), m.swipeDirection = r > 0 ? "prev" : "next", x = r + C;
                                    var n = !0;
                                    if (r > 0 && x > m.minTranslate() ? (n = !1, m.params.resistance && (x = m.minTranslate() - 1 + Math.pow(-m.minTranslate() + C + r, m.params.resistanceRatio))) : 0 > r && x < m.maxTranslate() && (n = !1, m.params.resistance && (x = m.maxTranslate() + 1 - Math.pow(m.maxTranslate() - C - r, m.params.resistanceRatio))), n && (e.preventedByNestedSwiper = !0), !m.params.allowSwipeToNext && "next" === m.swipeDirection && C > x && (x = C), !m.params.allowSwipeToPrev && "prev" === m.swipeDirection && x > C && (x = C), m.params.followFinger) {
                                        if (m.params.threshold > 0) {
                                            if (!(Math.abs(r) > m.params.threshold || _)) return void(x = C);
                                            if (!_) return _ = !0, m.touches.startX = m.touches.currentX, m.touches.startY = m.touches.currentY, x = C, void(m.touches.diff = a() ? m.touches.currentX - m.touches.startX : m.touches.currentY - m.touches.startY)
                                        }(m.params.freeMode || m.params.watchSlidesProgress) && m.updateActiveIndex(), m.params.freeMode && (0 === P.length && P.push({
                                            position: m.touches[a() ? "startX" : "startY"]
                                            , time: w
                                        }), P.push({
                                            position: m.touches[a() ? "currentX" : "currentY"]
                                            , time: (new window.Date).getTime()
                                        })), m.updateProgress(x), m.setWrapperTranslate(x)
                                    }
                                }
                            }
                        }
                    }
                }, m.onTouchEnd = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), m.emit("onTouchEnd", m, e), v) {
                        m.params.grabCursor && y && v && (m.container[0].style.cursor = "move", m.container[0].style.cursor = "-webkit-grab", m.container[0].style.cursor = "-moz-grab", m.container[0].style.cursor = "grab");
                        var t = Date.now()
                            , i = t - w;
                        if (m.allowClick && (m.updateClickedSlide(e), m.emit("onTap", m, e), 300 > i && t - T > 300 && (k && clearTimeout(k), k = setTimeout(function () {
                                m && (m.params.paginationHide && m.paginationContainer.length > 0 && !$(e.target).hasClass(m.params.bulletClass) && m.paginationContainer.toggleClass(m.params.paginationHiddenClass), m.emit("onClick", m, e))
                            }, 300)), 300 > i && 300 > t - T && (k && clearTimeout(k), m.emit("onDoubleTap", m, e))), T = Date.now(), setTimeout(function () {
                                m && (m.allowClick = !0)
                            }, 0), !v || !y || !m.swipeDirection || 0 === m.touches.diff || x === C) return void(v = y = !1);
                        v = y = !1;
                        var a;
                        if (a = m.params.followFinger ? m.rtl ? m.translate : -m.translate : -x, m.params.freeMode) {
                            if (a < -m.minTranslate()) return void m.slideTo(m.activeIndex);
                            if (a > -m.maxTranslate()) return void(m.slides.length < m.snapGrid.length ? m.slideTo(m.snapGrid.length - 1) : m.slideTo(m.slides.length - 1));
                            if (m.params.freeModeMomentum) {
                                if (P.length > 1) {
                                    var r = P.pop()
                                        , n = P.pop()
                                        , s = r.position - n.position
                                        , o = r.time - n.time;
                                    m.velocity = s / o, m.velocity = m.velocity / 2, Math.abs(m.velocity) < .02 && (m.velocity = 0), (o > 150 || (new window.Date).getTime() - r.time > 300) && (m.velocity = 0)
                                }
                                else m.velocity = 0;
                                P.length = 0;
                                var l = 1e3 * m.params.freeModeMomentumRatio
                                    , u = m.velocity * l
                                    , d = m.translate + u;
                                m.rtl && (d = -d);
                                var c = !1
                                    , p, f = 20 * Math.abs(m.velocity) * m.params.freeModeMomentumBounceRatio;
                                if (d < m.maxTranslate()) m.params.freeModeMomentumBounce ? (d + m.maxTranslate() < -f && (d = m.maxTranslate() - f), p = m.maxTranslate(), c = !0, E = !0) : d = m.maxTranslate();
                                else if (d > m.minTranslate()) m.params.freeModeMomentumBounce ? (d - m.minTranslate() > f && (d = m.minTranslate() + f), p = m.minTranslate(), c = !0, E = !0) : d = m.minTranslate();
                                else if (m.params.freeModeSticky) {
                                    var h = 0
                                        , g;
                                    for (h = 0; h < m.snapGrid.length; h += 1)
                                        if (m.snapGrid[h] > -d) {
                                            g = h;
                                            break
                                        }
                                    d = Math.abs(m.snapGrid[g] - d) < Math.abs(m.snapGrid[g - 1] - d) || "next" === m.swipeDirection ? m.snapGrid[g] : m.snapGrid[g - 1], m.rtl || (d = -d)
                                }
                                if (0 !== m.velocity) l = m.rtl ? Math.abs((-d - m.translate) / m.velocity) : Math.abs((d - m.translate) / m.velocity);
                                else if (m.params.freeModeSticky) return void m.slideReset();
                                m.params.freeModeMomentumBounce && c ? (m.updateProgress(p), m.setWrapperTransition(l), m.setWrapperTranslate(d), m.onTransitionStart(), m.animating = !0, m.wrapper.transitionEnd(function () {
                                    m && E && (m.emit("onMomentumBounce", m), m.setWrapperTransition(m.params.speed), m.setWrapperTranslate(p), m.wrapper.transitionEnd(function () {
                                        m && m.onTransitionEnd()
                                    }))
                                })) : m.velocity ? (m.updateProgress(d), m.setWrapperTransition(l), m.setWrapperTranslate(d), m.onTransitionStart(), m.animating || (m.animating = !0, m.wrapper.transitionEnd(function () {
                                    m && m.onTransitionEnd()
                                }))) : m.updateProgress(d), m.updateActiveIndex()
                            }
                            return void((!m.params.freeModeMomentum || i >= m.params.longSwipesMs) && (m.updateProgress(), m.updateActiveIndex()))
                        }
                        var b, _ = 0
                            , S = m.slidesSizesGrid[0];
                        for (b = 0; b < m.slidesGrid.length; b += m.params.slidesPerGroup) "undefined" != typeof m.slidesGrid[b + m.params.slidesPerGroup] ? a >= m.slidesGrid[b] && a < m.slidesGrid[b + m.params.slidesPerGroup] && (_ = b, S = m.slidesGrid[b + m.params.slidesPerGroup] - m.slidesGrid[b]) : a >= m.slidesGrid[b] && (_ = b, S = m.slidesGrid[m.slidesGrid.length - 1] - m.slidesGrid[m.slidesGrid.length - 2]);
                        var A = (a - m.slidesGrid[_]) / S;
                        if (i > m.params.longSwipesMs) {
                            if (!m.params.longSwipes) return void m.slideTo(m.activeIndex);
                            "next" === m.swipeDirection && (A >= m.params.longSwipesRatio ? m.slideTo(_ + m.params.slidesPerGroup) : m.slideTo(_)), "prev" === m.swipeDirection && (A > 1 - m.params.longSwipesRatio ? m.slideTo(_ + m.params.slidesPerGroup) : m.slideTo(_))
                        }
                        else {
                            if (!m.params.shortSwipes) return void m.slideTo(m.activeIndex);
                            "next" === m.swipeDirection && m.slideTo(_ + m.params.slidesPerGroup), "prev" === m.swipeDirection && m.slideTo(_)
                        }
                    }
                }, m._slideTo = function (e, t) {
                    return m.slideTo(e, t, !0, !0)
                }, m.slideTo = function (e, t, i, r) {
                    "undefined" == typeof i && (i = !0), "undefined" == typeof e && (e = 0), 0 > e && (e = 0), m.snapIndex = Math.floor(e / m.params.slidesPerGroup), m.snapIndex >= m.snapGrid.length && (m.snapIndex = m.snapGrid.length - 1);
                    var n = -m.snapGrid[m.snapIndex];
                    if (!m.params.allowSwipeToNext && n < m.translate && n < m.minTranslate()) return !1;
                    if (!m.params.allowSwipeToPrev && n > m.translate && n > m.maxTranslate()) return !1;
                    m.params.autoplay && m.autoplaying && (r || !m.params.autoplayDisableOnInteraction ? m.pauseAutoplay(t) : m.stopAutoplay()), m.updateProgress(n);
                    for (var s = 0; s < m.slidesGrid.length; s++) - n >= m.slidesGrid[s] && (e = s);
                    if ("undefined" == typeof t && (t = m.params.speed), m.previousIndex = m.activeIndex || 0, m.activeIndex = e, n === m.translate) return m.updateClasses(), !1;
                    m.updateClasses(), m.onTransitionStart(i);
                    var o = a() ? n : 0
                        , l = a() ? 0 : n;
                    return 0 === t ? (m.setWrapperTransition(0), m.setWrapperTranslate(n), m.onTransitionEnd(i)) : (m.setWrapperTransition(t), m.setWrapperTranslate(n), m.animating || (m.animating = !0, m.wrapper.transitionEnd(function () {
                        m && m.onTransitionEnd(i)
                    }))), !0
                }, m.onTransitionStart = function (e) {
                    "undefined" == typeof e && (e = !0), m.lazy && m.lazy.onTransitionStart(), e && (m.emit("onTransitionStart", m), m.activeIndex !== m.previousIndex && m.emit("onSlideChangeStart", m))
                }, m.onTransitionEnd = function (e) {
                    m.animating = !1, m.setWrapperTransition(0), "undefined" == typeof e && (e = !0), m.lazy && m.lazy.onTransitionEnd(), e && (m.emit("onTransitionEnd", m), m.activeIndex !== m.previousIndex && m.emit("onSlideChangeEnd", m)), m.params.hashnav && m.hashnav && m.hashnav.setHash()
                }, m.slideNext = function (e, t, i) {
                    if (m.params.loop) {
                        if (m.animating) return !1;
                        m.fixLoop();
                        var a = m.container[0].clientLeft;
                        return m.slideTo(m.activeIndex + m.params.slidesPerGroup, t, e, i)
                    }
                    return m.slideTo(m.activeIndex + m.params.slidesPerGroup, t, e, i)
                }, m._slideNext = function (e) {
                    return m.slideNext(!0, e, !0)
                }, m.slidePrev = function (e, t, i) {
                    if (m.params.loop) {
                        if (m.animating) return !1;
                        m.fixLoop();
                        var a = m.container[0].clientLeft;
                        return m.slideTo(m.activeIndex - 1, t, e, i)
                    }
                    return m.slideTo(m.activeIndex - 1, t, e, i)
                }, m._slidePrev = function (e) {
                    return m.slidePrev(!0, e, !0)
                }, m.slideReset = function (e, t, i) {
                    return m.slideTo(m.activeIndex, t, e)
                }, m.setWrapperTransition = function (e, t) {
                    m.wrapper.transition(e), "slide" !== m.params.effect && m.effects[m.params.effect] && m.effects[m.params.effect].setTransition(e), m.params.parallax && m.parallax && m.parallax.setTransition(e), m.params.scrollbar && m.scrollbar && m.scrollbar.setTransition(e), m.params.control && m.controller && m.controller.setTransition(e, t), m.emit("onSetTransition", m, e)
                }, m.setWrapperTranslate = function (e, t, i) {
                    var r = 0
                        , n = 0
                        , s = 0;
                    a() ? r = m.rtl ? -e : e : n = e, m.params.virtualTranslate || (m.support.transforms3d ? m.wrapper.transform("translate3d(" + r + "px, " + n + "px, " + s + "px)") : m.wrapper.transform("translate(" + r + "px, " + n + "px)")), m.translate = a() ? r : n, t && m.updateActiveIndex(), "slide" !== m.params.effect && m.effects[m.params.effect] && m.effects[m.params.effect].setTranslate(m.translate), m.params.parallax && m.parallax && m.parallax.setTranslate(m.translate), m.params.scrollbar && m.scrollbar && m.scrollbar.setTranslate(m.translate), m.params.control && m.controller && m.controller.setTranslate(m.translate, i), m.emit("onSetTranslate", m, m.translate)
                }, m.getTranslate = function (e, t) {
                    var i, a, r, n;
                    return "undefined" == typeof t && (t = "x"), m.params.virtualTranslate ? m.rtl ? -m.translate : m.translate : (r = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? n = new window.WebKitCSSMatrix("none" === r.webkitTransform ? "" : r.webkitTransform) : (n = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), i = n.toString().split(",")), "x" === t && (a = window.WebKitCSSMatrix ? n.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === t && (a = window.WebKitCSSMatrix ? n.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), m.rtl && a && (a = -a), a || 0)
                }, m.getWrapperTranslate = function (e) {
                    return "undefined" == typeof e && (e = a() ? "x" : "y"), m.getTranslate(m.wrapper[0], e)
                }, m.observers = [], m.initObservers = function () {
                    if (m.params.observeParents)
                        for (var e = m.container.parents(), t = 0; t < e.length; t++) s(e[t]);
                    s(m.container[0], {
                        childList: !1
                    }), s(m.wrapper[0], {
                        attributes: !1
                    })
                }, m.disconnectObservers = function () {
                    for (var e = 0; e < m.observers.length; e++) m.observers[e].disconnect();
                    m.observers = []
                }, m.createLoop = function () {
                    m.wrapper.children("." + m.params.slideClass + "." + m.params.slideDuplicateClass).remove();
                    var e = m.wrapper.children("." + m.params.slideClass);
                    m.loopedSlides = parseInt(m.params.loopedSlides || m.params.slidesPerView, 10), m.loopedSlides = m.loopedSlides + m.params.loopAdditionalSlides, m.loopedSlides > e.length && (m.loopedSlides = e.length);
                    var t = []
                        , i = []
                        , a;
                    for (e.each(function (a, r) {
                            var n = $(this);
                            a < m.loopedSlides && i.push(r), a < e.length && a >= e.length - m.loopedSlides && t.push(r), n.attr("data-swiper-slide-index", a)
                        }), a = 0; a < i.length; a++) m.wrapper.append($(i[a].cloneNode(!0)).addClass(m.params.slideDuplicateClass));
                    for (a = t.length - 1; a >= 0; a--) m.wrapper.prepend($(t[a].cloneNode(!0)).addClass(m.params.slideDuplicateClass))
                }, m.destroyLoop = function () {
                    m.wrapper.children("." + m.params.slideClass + "." + m.params.slideDuplicateClass).remove(), m.slides.removeAttr("data-swiper-slide-index")
                }, m.fixLoop = function () {
                    var e;
                    m.activeIndex < m.loopedSlides ? (e = m.slides.length - 3 * m.loopedSlides + m.activeIndex, e += m.loopedSlides, m.slideTo(e, 0, !1, !0)) : ("auto" === m.params.slidesPerView && m.activeIndex >= 2 * m.loopedSlides || m.activeIndex > m.slides.length - 2 * m.params.slidesPerView) && (e = -m.slides.length + m.activeIndex + m.loopedSlides, e += m.loopedSlides, m.slideTo(e, 0, !1, !0))
                }, m.appendSlide = function (e) {
                    if (m.params.loop && m.destroyLoop(), "object" == typeof e && e.length)
                        for (var t = 0; t < e.length; t++) e[t] && m.wrapper.append(e[t]);
                    else m.wrapper.append(e);
                    m.params.loop && m.createLoop(), m.params.observer && m.support.observer || m.update(!0)
                }, m.prependSlide = function (e) {
                    m.params.loop && m.destroyLoop();
                    var t = m.activeIndex + 1;
                    if ("object" == typeof e && e.length) {
                        for (var i = 0; i < e.length; i++) e[i] && m.wrapper.prepend(e[i]);
                        t = m.activeIndex + e.length
                    }
                    else m.wrapper.prepend(e);
                    m.params.loop && m.createLoop(), m.params.observer && m.support.observer || m.update(!0), m.slideTo(t, 0, !1)
                }, m.removeSlide = function (e) {
                    m.params.loop && (m.destroyLoop(), m.slides = m.wrapper.children("." + m.params.slideClass));
                    var t = m.activeIndex
                        , i;
                    if ("object" == typeof e && e.length) {
                        for (var a = 0; a < e.length; a++) i = e[a], m.slides[i] && m.slides.eq(i).remove(), t > i && t--;
                        t = Math.max(t, 0)
                    }
                    else i = e, m.slides[i] && m.slides.eq(i).remove(), t > i && t--, t = Math.max(t, 0);
                    m.params.loop && m.createLoop(), m.params.observer && m.support.observer || m.update(!0), m.params.loop ? m.slideTo(t + m.loopedSlides, 0, !1) : m.slideTo(t, 0, !1)
                }, m.removeAllSlides = function () {
                    for (var e = [], t = 0; t < m.slides.length; t++) e.push(t);
                    m.removeSlide(e)
                }, m.effects = {
                    fade: {
                        setTranslate: function () {
                            for (var e = 0; e < m.slides.length; e++) {
                                var t = m.slides.eq(e)
                                    , i = t[0].swiperSlideOffset
                                    , r = -i;
                                m.params.virtualTranslate || (r -= m.translate);
                                var n = 0;
                                a() || (n = r, r = 0);
                                var s = m.params.fade.crossFade ? Math.max(1 - Math.abs(t[0].progress), 0) : 1 + Math.min(Math.max(t[0].progress, -1), 0);
                                t.css({
                                    opacity: s
                                }).transform("translate3d(" + r + "px, " + n + "px, 0px)")
                            }
                        }
                        , setTransition: function (e) {
                            if (m.slides.transition(e), m.params.virtualTranslate && 0 !== e) {
                                var t = !1;
                                m.slides.transitionEnd(function () {
                                    if (!t && m) {
                                        t = !0, m.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], i = 0; i < e.length; i++) m.wrapper.trigger(e[i])
                                    }
                                })
                            }
                        }
                    }
                    , cube: {
                        setTranslate: function () {
                            var e = 0
                                , t;
                            m.params.cube.shadow && (a() ? (t = m.wrapper.find(".swiper-cube-shadow"), 0 === t.length && (t = $('<div class="swiper-cube-shadow"></div>'), m.wrapper.append(t)), t.css({
                                height: m.width + "px"
                            })) : (t = m.container.find(".swiper-cube-shadow"), 0 === t.length && (t = $('<div class="swiper-cube-shadow"></div>'), m.container.append(t))));
                            for (var i = 0; i < m.slides.length; i++) {
                                var r = m.slides.eq(i)
                                    , n = 90 * i
                                    , s = Math.floor(n / 360);
                                m.rtl && (n = -n, s = Math.floor(-n / 360));
                                var o = Math.max(Math.min(r[0].progress, 1), -1)
                                    , l = 0
                                    , u = 0
                                    , d = 0;
                                i % 4 === 0 ? (l = 4 * -s * m.size, d = 0) : (i - 1) % 4 === 0 ? (l = 0, d = 4 * -s * m.size) : (i - 2) % 4 === 0 ? (l = m.size + 4 * s * m.size, d = m.size) : (i - 3) % 4 === 0 && (l = -m.size, d = 3 * m.size + 4 * m.size * s), m.rtl && (l = -l), a() || (u = l, l = 0);
                                var c = "rotateX(" + (a() ? 0 : -n) + "deg) rotateY(" + (a() ? n : 0) + "deg) translate3d(" + l + "px, " + u + "px, " + d + "px)";
                                if (1 >= o && o > -1 && (e = 90 * i + 90 * o, m.rtl && (e = 90 * -i - 90 * o)), r.transform(c), m.params.cube.slideShadows) {
                                    var p = a() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top")
                                        , f = a() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom");
                                    0 === p.length && (p = $('<div class="swiper-slide-shadow-' + (a() ? "left" : "top") + '"></div>'), r.append(p)), 0 === f.length && (f = $('<div class="swiper-slide-shadow-' + (a() ? "right" : "bottom") + '"></div>'), r.append(f));
                                    var h = r[0].progress;
                                    p.length && (p[0].style.opacity = -r[0].progress), f.length && (f[0].style.opacity = r[0].progress)
                                }
                            }
                            if (m.wrapper.css({
                                    "-webkit-transform-origin": "50% 50% -" + m.size / 2 + "px"
                                    , "-moz-transform-origin": "50% 50% -" + m.size / 2 + "px"
                                    , "-ms-transform-origin": "50% 50% -" + m.size / 2 + "px"
                                    , "transform-origin": "50% 50% -" + m.size / 2 + "px"
                                }), m.params.cube.shadow)
                                if (a()) t.transform("translate3d(0px, " + (m.width / 2 + m.params.cube.shadowOffset) + "px, " + -m.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + m.params.cube.shadowScale + ")");
                                else {
                                    var g = Math.abs(e) - 90 * Math.floor(Math.abs(e) / 90)
                                        , v = 1.5 - (Math.sin(2 * g * Math.PI / 360) / 2 + Math.cos(2 * g * Math.PI / 360) / 2)
                                        , y = m.params.cube.shadowScale
                                        , w = m.params.cube.shadowScale / v
                                        , b = m.params.cube.shadowOffset;
                                    t.transform("scale3d(" + y + ", 1, " + w + ") translate3d(0px, " + (m.height / 2 + b) + "px, " + -m.height / 2 / w + "px) rotateX(-90deg)")
                                }
                            var x = m.isSafari || m.isUiWebView ? -m.size / 2 : 0;
                            m.wrapper.transform("translate3d(0px,0," + x + "px) rotateX(" + (a() ? 0 : e) + "deg) rotateY(" + (a() ? -e : 0) + "deg)")
                        }
                        , setTransition: function (e) {
                            m.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), m.params.cube.shadow && !a() && m.container.find(".swiper-cube-shadow").transition(e)
                        }
                    }
                    , coverflow: {
                        setTranslate: function () {
                            for (var e = m.translate, t = a() ? -e + m.width / 2 : -e + m.height / 2, i = a() ? m.params.coverflow.rotate : -m.params.coverflow.rotate, r = m.params.coverflow.depth, n = 0, s = m.slides.length; s > n; n++) {
                                var o = m.slides.eq(n)
                                    , l = m.slidesSizesGrid[n]
                                    , u = o[0].swiperSlideOffset
                                    , d = (t - u - l / 2) / l * m.params.coverflow.modifier
                                    , c = a() ? i * d : 0
                                    , p = a() ? 0 : i * d
                                    , f = -r * Math.abs(d)
                                    , h = a() ? 0 : m.params.coverflow.stretch * d
                                    , g = a() ? m.params.coverflow.stretch * d : 0;
                                Math.abs(g) < .001 && (g = 0), Math.abs(h) < .001 && (h = 0), Math.abs(f) < .001 && (f = 0), Math.abs(c) < .001 && (c = 0), Math.abs(p) < .001 && (p = 0);
                                var v = "translate3d(" + g + "px," + h + "px," + f + "px)  rotateX(" + p + "deg) rotateY(" + c + "deg)";
                                if (o.transform(v), o[0].style.zIndex = -Math.abs(Math.round(d)) + 1, m.params.coverflow.slideShadows) {
                                    var y = a() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top")
                                        , w = a() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");
                                    0 === y.length && (y = $('<div class="swiper-slide-shadow-' + (a() ? "left" : "top") + '"></div>'), o.append(y)), 0 === w.length && (w = $('<div class="swiper-slide-shadow-' + (a() ? "right" : "bottom") + '"></div>'), o.append(w)), y.length && (y[0].style.opacity = d > 0 ? d : 0), w.length && (w[0].style.opacity = -d > 0 ? -d : 0)
                                }
                            }
                            if (m.browser.ie) {
                                var b = m.wrapper[0].style;
                                b.perspectiveOrigin = t + "px 50%"
                            }
                        }
                        , setTransition: function (e) {
                            m.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
                        }
                    }
                }, m.lazy = {
                    initialImageLoaded: !1
                    , loadImageInSlide: function (e, t) {
                        if ("undefined" != typeof e && ("undefined" == typeof t && (t = !0), 0 !== m.slides.length)) {
                            var i = m.slides.eq(e)
                                , a = i.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");
                            !i.hasClass("swiper-lazy") || i.hasClass("swiper-lazy-loaded") || i.hasClass("swiper-lazy-loading") || a.add(i[0]), 0 !== a.length && a.each(function () {
                                var e = $(this);
                                e.addClass("swiper-lazy-loading");
                                var a = e.attr("data-background")
                                    , r = e.attr("data-src");
                                m.loadImage(e[0], r || a, !1, function () {
                                    if (a ? (e.css("background-image", "url(" + a + ")"), e.removeAttr("data-background")) : (e.attr("src", r), e.removeAttr("data-src")), e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), i.find(".swiper-lazy-preloader, .preloader").remove(), m.params.loop && t) {
                                        var n = i.attr("data-swiper-slide-index");
                                        if (i.hasClass(m.params.slideDuplicateClass)) {
                                            var s = m.wrapper.children('[data-swiper-slide-index="' + n + '"]:not(.' + m.params.slideDuplicateClass + ")");
                                            m.lazy.loadImageInSlide(s.index(), !1)
                                        }
                                        else {
                                            var o = m.wrapper.children("." + m.params.slideDuplicateClass + '[data-swiper-slide-index="' + n + '"]');
                                            m.lazy.loadImageInSlide(o.index(), !1)
                                        }
                                    }
                                    m.emit("onLazyImageReady", m, i[0], e[0])
                                }), m.emit("onLazyImageLoad", m, i[0], e[0])
                            })
                        }
                    }
                    , load: function () {
                        var e;
                        if (m.params.watchSlidesVisibility) m.wrapper.children("." + m.params.slideVisibleClass).each(function () {
                            m.lazy.loadImageInSlide($(this).index())
                        });
                        else if (m.params.slidesPerView > 1)
                            for (e = m.activeIndex; e < m.activeIndex + m.params.slidesPerView; e++) m.slides[e] && m.lazy.loadImageInSlide(e);
                        else m.lazy.loadImageInSlide(m.activeIndex);
                        if (m.params.lazyLoadingInPrevNext)
                            if (m.params.slidesPerView > 1) {
                                for (e = m.activeIndex + m.params.slidesPerView; e < m.activeIndex + m.params.slidesPerView + m.params.slidesPerView; e++) m.slides[e] && m.lazy.loadImageInSlide(e);
                                for (e = m.activeIndex - m.params.slidesPerView; e < m.activeIndex; e++) m.slides[e] && m.lazy.loadImageInSlide(e)
                            }
                            else {
                                var t = m.wrapper.children("." + m.params.slideNextClass);
                                t.length > 0 && m.lazy.loadImageInSlide(t.index());
                                var i = m.wrapper.children("." + m.params.slidePrevClass);
                                i.length > 0 && m.lazy.loadImageInSlide(i.index())
                            }
                    }
                    , onTransitionStart: function () {
                        m.params.lazyLoading && (m.params.lazyLoadingOnTransitionStart || !m.params.lazyLoadingOnTransitionStart && !m.lazy.initialImageLoaded) && m.lazy.load()
                    }
                    , onTransitionEnd: function () {
                        m.params.lazyLoading && !m.params.lazyLoadingOnTransitionStart && m.lazy.load()
                    }
                }, m.scrollbar = {
                    set: function () {
                        if (m.params.scrollbar) {
                            var e = m.scrollbar;
                            e.track = $(m.params.scrollbar), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = $('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = a() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = m.size / m.virtualSize, e.moveDivider = e.divider * (e.trackSize / m.size), e.dragSize = e.trackSize * e.divider, a() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.divider >= 1 ? e.track[0].style.display = "none" : e.track[0].style.display = "", m.params.scrollbarHide && (e.track[0].style.opacity = 0)
                        }
                    }
                    , setTranslate: function () {
                        if (m.params.scrollbar) {
                            var e, t = m.scrollbar
                                , i = m.translate || 0
                                , r, n = t.dragSize;
                            r = (t.trackSize - t.dragSize) * m.progress, m.rtl && a() ? (r = -r, r > 0 ? (n = t.dragSize - r, r = 0) : -r + t.dragSize > t.trackSize && (n = t.trackSize + r)) : 0 > r ? (n = t.dragSize + r, r = 0) : r + t.dragSize > t.trackSize && (n = t.trackSize - r), a() ? (m.support.transforms3d ? t.drag.transform("translate3d(" + r + "px, 0, 0)") : t.drag.transform("translateX(" + r + "px)"), t.drag[0].style.width = n + "px") : (m.support.transforms3d ? t.drag.transform("translate3d(0px, " + r + "px, 0)") : t.drag.transform("translateY(" + r + "px)"), t.drag[0].style.height = n + "px"), m.params.scrollbarHide && (clearTimeout(t.timeout), t.track[0].style.opacity = 1, t.timeout = setTimeout(function () {
                                t.track[0].style.opacity = 0, t.track.transition(400)
                            }, 1e3))
                        }
                    }
                    , setTransition: function (e) {
                        m.params.scrollbar && m.scrollbar.drag.transition(e)
                    }
                }, m.controller = {
                    setTranslate: function (e, i) {
                        function a(t) {
                            e = t.rtl && "horizontal" === t.params.direction ? -m.translate : m.translate, n = (t.maxTranslate() - t.minTranslate()) / (m.maxTranslate() - m.minTranslate()), s = (e - m.minTranslate()) * n + t.minTranslate(), m.params.controlInverse && (s = t.maxTranslate() - s), t.updateProgress(s), t.setWrapperTranslate(s, !1, m), t.updateActiveIndex()
                        }
                        var r = m.params.control
                            , n, s;
                        if (m.isArray(r))
                            for (var o = 0; o < r.length; o++) r[o] !== i && r[o] instanceof t && a(r[o]);
                        else r instanceof t && i !== r && a(r)
                    }
                    , setTransition: function (e, i) {
                        function a(t) {
                            t.setWrapperTransition(e, m), 0 !== e && (t.onTransitionStart(), t.wrapper.transitionEnd(function () {
                                r && t.onTransitionEnd()
                            }))
                        }
                        var r = m.params.control
                            , n;
                        if (m.isArray(r))
                            for (n = 0; n < r.length; n++) r[n] !== i && r[n] instanceof t && a(r[n]);
                        else r instanceof t && i !== r && a(r)
                    }
                }, m.hashnav = {
                    init: function () {
                        if (m.params.hashnav) {
                            m.hashnav.initialized = !0;
                            var e = document.location.hash.replace("#", "");
                            if (e)
                                for (var t = 0, i = 0, a = m.slides.length; a > i; i++) {
                                    var r = m.slides.eq(i)
                                        , n = r.attr("data-hash");
                                    if (n === e && !r.hasClass(m.params.slideDuplicateClass)) {
                                        var s = r.index();
                                        m.slideTo(s, t, m.params.runCallbacksOnInit, !0)
                                    }
                                }
                        }
                    }
                    , setHash: function () {
                        m.hashnav.initialized && m.params.hashnav && (document.location.hash = m.slides.eq(m.activeIndex).attr("data-hash") || "")
                    }
                }, m.disableKeyboardControl = function () {
                    $(document).off("keydown", o)
                }, m.enableKeyboardControl = function () {
                    $(document).on("keydown", o)
                }, m.mousewheel = {
                    event: !1
                    , lastScrollTime: (new window.Date).getTime()
                }, m.params.mousewheelControl) {
                if (void 0 !== document.onmousewheel && (m.mousewheel.event = "mousewheel"), !m.mousewheel.event) try {
                    new window.WheelEvent("wheel"), m.mousewheel.event = "wheel"
                }
                catch (O) {}
                m.mousewheel.event || (m.mousewheel.event = "DOMMouseScroll")
            }
            m.disableMousewheelControl = function () {
                return m.mousewheel.event ? (m.container.off(m.mousewheel.event, l), !0) : !1
            }, m.enableMousewheelControl = function () {
                return m.mousewheel.event ? (m.container.on(m.mousewheel.event, l), !0) : !1
            }, m.parallax = {
                setTranslate: function () {
                    m.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                        u(this, m.progress)
                    }), m.slides.each(function () {
                        var e = $(this);
                        e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                            var t = Math.min(Math.max(e[0].progress, -1), 1);
                            u(this, t)
                        })
                    })
                }
                , setTransition: function (e) {
                    "undefined" == typeof e && (e = m.params.speed), m.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                        var t = $(this)
                            , i = parseInt(t.attr("data-swiper-parallax-duration"), 10) || e;
                        0 === e && (i = 0), t.transition(i)
                    })
                }
            }, m._plugins = [];
            for (var I in m.plugins) {
                var M = m.plugins[I](m, m.params[I]);
                M && m._plugins.push(M)
            }
            return m.callPlugins = function (e) {
                for (var t = 0; t < m._plugins.length; t++) e in m._plugins[t] && m._plugins[t][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, m.emitterEventListeners = {}, m.emit = function (e) {
                m.params[e] && m.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                var t;
                if (m.emitterEventListeners[e])
                    for (t = 0; t < m.emitterEventListeners[e].length; t++) m.emitterEventListeners[e][t](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                m.callPlugins && m.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, m.on = function (e, t) {
                return e = d(e), m.emitterEventListeners[e] || (m.emitterEventListeners[e] = []), m.emitterEventListeners[e].push(t), m
            }, m.off = function (e, t) {
                var i;
                if (e = d(e), "undefined" == typeof t) return m.emitterEventListeners[e] = [], m;
                if (m.emitterEventListeners[e] && 0 !== m.emitterEventListeners[e].length) {
                    for (i = 0; i < m.emitterEventListeners[e].length; i++) m.emitterEventListeners[e][i] === t && m.emitterEventListeners[e].splice(i, 1);
                    return m
                }
            }, m.once = function (e, t) {
                e = d(e);
                var i = function () {
                    t(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), m.off(e, i)
                };
                return m.on(e, i), m
            }, m.a11y = {
                makeFocusable: function (e) {
                    return e[0].tabIndex = "0", e
                }
                , addRole: function (e, t) {
                    return e.attr("role", t), e
                }
                , addLabel: function (e, t) {
                    return e.attr("aria-label", t), e
                }
                , disable: function (e) {
                    return e.attr("aria-disabled", !0), e
                }
                , enable: function (e) {
                    return e.attr("aria-disabled", !1), e
                }
                , onEnterKey: function (e) {
                    13 === e.keyCode && ($(e.target).is(m.params.nextButton) ? (m.onClickNext(e), m.isEnd ? m.a11y.notify(m.params.lastSlideMsg) : m.a11y.notify(m.params.nextSlideMsg)) : $(e.target).is(m.params.prevButton) && (m.onClickPrev(e), m.isBeginning ? m.a11y.notify(m.params.firstSlideMsg) : m.a11y.notify(m.params.prevSlideMsg)))
                }
                , liveRegion: $('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>')
                , notify: function (e) {
                    var t = m.a11y.liveRegion;
                    0 !== t.length && (t.html(""), t.html(e))
                }
                , init: function () {
                    if (m.params.nextButton) {
                        var e = $(m.params.nextButton);
                        m.a11y.makeFocusable(e), m.a11y.addRole(e, "button"), m.a11y.addLabel(e, m.params.nextSlideMsg)
                    }
                    if (m.params.prevButton) {
                        var t = $(m.params.prevButton);
                        m.a11y.makeFocusable(t), m.a11y.addRole(t, "button"), m.a11y.addLabel(t, m.params.prevSlideMsg)
                    }
                    $(m.container).append(m.a11y.liveRegion)
                }
                , destroy: function () {
                    m.a11y.liveRegion && m.a11y.liveRegion.length > 0 && m.a11y.liveRegion.remove()
                }
            }, m.init = function () {
                m.params.loop && m.createLoop(), m.updateContainerSize(), m.updateSlidesSize(), m.updatePagination(), m.params.scrollbar && m.scrollbar && m.scrollbar.set(), "slide" !== m.params.effect && m.effects[m.params.effect] && (m.params.loop || m.updateProgress(), m.effects[m.params.effect].setTranslate()), m.params.loop ? m.slideTo(m.params.initialSlide + m.loopedSlides, 0, m.params.runCallbacksOnInit) : (m.slideTo(m.params.initialSlide, 0, m.params.runCallbacksOnInit), 0 === m.params.initialSlide && (m.parallax && m.params.parallax && m.parallax.setTranslate(), m.lazy && m.params.lazyLoading && (m.lazy.load(), m.lazy.initialImageLoaded = !0))), m.attachEvents(), m.params.observer && m.support.observer && m.initObservers(), m.params.preloadImages && !m.params.lazyLoading && m.preloadImages(), m.params.autoplay && m.startAutoplay(), m.params.keyboardControl && m.enableKeyboardControl && m.enableKeyboardControl(), m.params.mousewheelControl && m.enableMousewheelControl && m.enableMousewheelControl(), m.params.hashnav && m.hashnav && m.hashnav.init(), m.params.a11y && m.a11y && m.a11y.init(), m.emit("onInit", m)
            }, m.cleanupStyles = function () {
                m.container.removeClass(m.classNames.join(" ")).removeAttr("style"), m.wrapper.removeAttr("style"), m.slides && m.slides.length && m.slides.removeClass([m.params.slideVisibleClass, m.params.slideActiveClass, m.params.slideNextClass, m.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), m.paginationContainer && m.paginationContainer.length && m.paginationContainer.removeClass(m.params.paginationHiddenClass), m.bullets && m.bullets.length && m.bullets.removeClass(m.params.bulletActiveClass), m.params.prevButton && $(m.params.prevButton).removeClass(m.params.buttonDisabledClass), m.params.nextButton && $(m.params.nextButton).removeClass(m.params.buttonDisabledClass), m.params.scrollbar && m.scrollbar && (m.scrollbar.track && m.scrollbar.track.length && m.scrollbar.track.removeAttr("style"), m.scrollbar.drag && m.scrollbar.drag.length && m.scrollbar.drag.removeAttr("style"))
            }, m.destroy = function (e, t) {
                m.detachEvents(), m.stopAutoplay(), m.params.loop && m.destroyLoop(), t && m.cleanupStyles(), m.disconnectObservers(), m.params.keyboardControl && m.disableKeyboardControl && m.disableKeyboardControl(), m.params.mousewheelControl && m.disableMousewheelControl && m.disableMousewheelControl(), m.params.a11y && m.a11y && m.a11y.destroy(), m.emit("onDestroy"), e !== !1 && (m = null)
            }, m.init(), m
        }
    };
    t.prototype = {
        isSafari: function () {
            var e = navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
        }()
        , isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent)
        , isArray: function (e) {
            return "[object Array]" === Object.prototype.toString.apply(e)
        }
        , browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled
            , ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1
        }
        , device: function () {
            var e = navigator.userAgent
                , t = e.match(/(Android);?[\s\/]+([\d.]+)?/)
                , i = e.match(/(iPad).*OS\s([\d_]+)/)
                , a = e.match(/(iPod)(.*OS\s([\d_]+))?/)
                , r = !i && e.match(/(iPhone\sOS)\s([\d_]+)/);
            return {
                ios: i || r || i
                , android: t
            }
        }()
        , support: {
            touch: window.Modernizr && Modernizr.touch === !0 || function () {
                return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
            }()
            , transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function () {
                var e = document.createElement("div").style;
                return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
            }()
            , flexbox: function () {
                for (var e = document.createElement("div").style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0; i < t.length; i++)
                    if (t[i] in e) return !0
            }()
            , observer: function () {
                return "MutationObserver" in window || "WebkitMutationObserver" in window
            }()
        }
        , plugins: {}
    };
    for (var i = ["jQuery", "Zepto", "Dom7"], a = 0; a < i.length; a++) window[i[a]] && e(window[i[a]]);
    var r;
    r = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7, r && ("transitionEnd" in r.fn || (r.fn.transitionEnd = function (e) {
        function t(r) {
            if (r.target === this)
                for (e.call(this, r), a = 0; a < i.length; a++) n.off(i[a], t)
        }
        var i = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"]
            , a, r, n = this;
        if (e)
            for (a = 0; a < i.length; a++) n.on(i[a], t);
        return this
    }), "transform" in r.fn || (r.fn.transform = function (e) {
        for (var t = 0; t < this.length; t++) {
            var i = this[t].style;
            i.webkitTransform = i.MsTransform = i.msTransform = i.MozTransform = i.OTransform = i.transform = e
        }
        return this
    }), "transition" in r.fn || (r.fn.transition = function (e) {
        "string" != typeof e && (e += "ms");
        for (var t = 0; t < this.length; t++) {
            var i = this[t].style;
            i.webkitTransitionDuration = i.MsTransitionDuration = i.msTransitionDuration = i.MozTransitionDuration = i.OTransitionDuration = i.transitionDuration = e
        }
        return this
    })), window.Swiper = t
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function () {
        "use strict";
        return window.Swiper
    })
    , function (e, t) {
        "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t(require, exports, module) : e.scrollReveal = t()
    }(this, function (e, t, i) {
        return window.scrollReveal = function (e) {
            "use strict";

            function t(i) {
                return this instanceof t ? (n = this, n.elems = {}, n.serial = 1, n.blocked = !1, n.config = a(n.defaults, i), n.isMobile() && !n.config.mobile || !n.isSupported() ? void n.destroy() : (n.config.viewport === e.document.documentElement ? (e.addEventListener("scroll", r, !1), e.addEventListener("resize", r, !1)) : n.config.viewport.addEventListener("scroll", r, !1), void n.init(!0))) : new t(i)
            }
            var i, a, r, n;
            return t.prototype = {
                defaults: {
                    enter: "bottom"
                    , move: "8px"
                    , over: "0.6s"
                    , wait: "0s"
                    , easing: "ease"
                    , scale: {
                        direction: "up"
                        , power: "5%"
                    }
                    , rotate: {
                        x: 0
                        , y: 0
                        , z: 0
                    }
                    , opacity: 0
                    , mobile: !1
                    , reset: !1
                    , viewport: e.document.documentElement
                    , delay: "once"
                    , vFactor: .6
                    , complete: function (e) {}
                }
                , init: function (e) {
                    var t, i, a;
                    a = Array.prototype.slice.call(n.config.viewport.querySelectorAll("[data-sr]")), a.forEach(function (e) {
                        t = n.serial++, i = n.elems[t] = {
                            domEl: e
                        }, i.config = n.configFactory(i), i.styles = n.styleFactory(i), i.seen = !1, e.removeAttribute("data-sr"), e.setAttribute("style", i.styles.inline + i.styles.initial)
                    }), n.scrolled = n.scrollY(), n.animate(e)
                }
                , animate: function (e) {
                    function t(e) {
                        var t = n.elems[e];
                        setTimeout(function () {
                            t.domEl.setAttribute("style", t.styles.inline), t.config.complete(t.domEl), delete n.elems[e]
                        }, t.styles.duration)
                    }
                    var i, a, r;
                    for (i in n.elems) n.elems.hasOwnProperty(i) && (a = n.elems[i], r = n.isElemInViewport(a), r ? ("always" === n.config.delay || "onload" === n.config.delay && e || "once" === n.config.delay && !a.seen ? a.domEl.setAttribute("style", a.styles.inline + a.styles.target + a.styles.transition) : a.domEl.setAttribute("style", a.styles.inline + a.styles.target + a.styles.reset), a.seen = !0, a.config.reset || a.animating || (a.animating = !0, t(i))) : !r && a.config.reset && a.domEl.setAttribute("style", a.styles.inline + a.styles.initial + a.styles.reset));
                    n.blocked = !1
                }
                , configFactory: function (e) {
                    var t = {}
                        , i = {}
                        , r = e.domEl.getAttribute("data-sr").split(/[, ]+/);
                    return r.forEach(function (e, i) {
                        switch (e) {
                        case "enter":
                            t.enter = r[i + 1];
                            break;
                        case "wait":
                            t.wait = r[i + 1];
                            break;
                        case "move":
                            t.move = r[i + 1];
                            break;
                        case "ease":
                            t.move = r[i + 1], t.ease = "ease";
                            break;
                        case "ease-in":
                            if ("up" == r[i + 1] || "down" == r[i + 1]) {
                                t.scale.direction = r[i + 1], t.scale.power = r[i + 2], t.easing = "ease-in";
                                break
                            }
                            t.move = r[i + 1], t.easing = "ease-in";
                            break;
                        case "ease-in-out":
                            if ("up" == r[i + 1] || "down" == r[i + 1]) {
                                t.scale.direction = r[i + 1], t.scale.power = r[i + 2], t.easing = "ease-in-out";
                                break
                            }
                            t.move = r[i + 1], t.easing = "ease-in-out";
                            break;
                        case "ease-out":
                            if ("up" == r[i + 1] || "down" == r[i + 1]) {
                                t.scale.direction = r[i + 1], t.scale.power = r[i + 2], t.easing = "ease-out";
                                break
                            }
                            t.move = r[i + 1], t.easing = "ease-out";
                            break;
                        case "hustle":
                            if ("up" == r[i + 1] || "down" == r[i + 1]) {
                                t.scale.direction = r[i + 1], t.scale.power = r[i + 2], t.easing = "cubic-bezier( 0.6, 0.2, 0.1, 1 )";
                                break
                            }
                            t.move = r[i + 1], t.easing = "cubic-bezier( 0.6, 0.2, 0.1, 1 )";
                            break;
                        case "over":
                            t.over = r[i + 1];
                            break;
                        case "flip":
                        case "pitch":
                            t.rotate = t.rotate || {}, t.rotate.x = r[i + 1];
                            break;
                        case "spin":
                        case "yaw":
                            t.rotate = t.rotate || {}, t.rotate.y = r[i + 1];
                            break;
                        case "roll":
                            t.rotate = t.rotate || {}, t.rotate.z = r[i + 1];
                            break;
                        case "reset":
                            "no" == r[i - 1] ? t.reset = !1 : t.reset = !0;
                            break;
                        case "scale":
                            if (t.scale = {}, "up" == r[i + 1] || "down" == r[i + 1]) {
                                t.scale.direction = r[i + 1], t.scale.power = r[i + 2];
                                break
                            }
                            t.scale.power = r[i + 1];
                            break;
                        case "vFactor":
                        case "vF":
                            t.vFactor = r[i + 1];
                            break;
                        case "opacity":
                            t.opacity = r[i + 1];
                            break;
                        default:
                            return
                        }
                    }), i = a(i, n.config), i = a(i, t), "top" === i.enter || "bottom" === i.enter ? i.axis = "Y" : ("left" === i.enter || "right" === i.enter) && (i.axis = "X"), ("top" === i.enter || "left" === i.enter) && (i.move = "-" + i.move), i
                }
                , styleFactory: function (e) {
                    function t() {
                        0 !== parseInt(o.move) && (a += " translate" + o.axis + "(" + o.move + ")", n += " translate" + o.axis + "(0)"), 0 !== parseInt(o.scale.power) && ("up" === o.scale.direction ? o.scale.value = 1 - .01 * parseFloat(o.scale.power) : "down" === o.scale.direction && (o.scale.value = 1 + .01 * parseFloat(o.scale.power)), a += " scale(" + o.scale.value + ")", n += " scale(1)"), o.rotate.x && (a += " rotateX(" + o.rotate.x + ")", n += " rotateX(0)"), o.rotate.y && (a += " rotateY(" + o.rotate.y + ")", n += " rotateY(0)"), o.rotate.z && (a += " rotateZ(" + o.rotate.z + ")", n += " rotateZ(0)"), a += "; opacity: " + o.opacity + "; ", n += "; opacity: 1; "
                    }
                    var i, a, r, n, s, o = e.config
                        , l = 1e3 * (parseFloat(o.over) + parseFloat(o.wait));
                    return i = e.domEl.getAttribute("style") ? e.domEl.getAttribute("style") + "; visibility: visible; " : "visibility: visible; ", s = "-webkit-transition: -webkit-transform " + o.over + " " + o.easing + " " + o.wait + ", opacity " + o.over + " " + o.easing + " " + o.wait + "; transition: transform " + o.over + " " + o.easing + " " + o.wait + ", opacity " + o.over + " " + o.easing + " " + o.wait + "; -webkit-perspective: 1000;-webkit-backface-visibility: hidden;", r = "-webkit-transition: -webkit-transform " + o.over + " " + o.easing + " 0s, opacity " + o.over + " " + o.easing + " 0s; transition: transform " + o.over + " " + o.easing + " 0s, opacity " + o.over + " " + o.easing + " 0s; -webkit-perspective: 1000; -webkit-backface-visibility: hidden; ", a = "transform:", n = "transform:", t(), a += "-webkit-transform:", n += "-webkit-transform:", t(), {
                        transition: s
                        , initial: a
                        , target: n
                        , reset: r
                        , inline: i
                        , duration: l
                    }
                }
                , getViewportH: function () {
                    var t = n.config.viewport.clientHeight
                        , i = e.innerHeight;
                    return n.config.viewport === e.document.documentElement && i > t ? i : t
                }
                , scrollY: function () {
                    return n.config.viewport === e.document.documentElement ? e.pageYOffset : n.config.viewport.scrollTop + n.config.viewport.offsetTop
                }
                , getOffset: function (e) {
                    var t = 0
                        , i = 0;
                    do isNaN(e.offsetTop) || (t += e.offsetTop), isNaN(e.offsetLeft) || (i += e.offsetLeft); while (e = e.offsetParent);
                    return {
                        top: t
                        , left: i
                    }
                }
                , isElemInViewport: function (t) {
                    function i() {
                        var e = s + r * l
                            , t = o - r * l
                            , i = n.scrolled + n.getViewportH()
                            , a = n.scrolled;
                        return i > e && t > a
                    }

                    function a() {
                        var i = t.domEl
                            , a = i.currentStyle || e.getComputedStyle(i, null);
                        return "fixed" === a.position
                    }
                    var r = t.domEl.offsetHeight
                        , s = n.getOffset(t.domEl).top
                        , o = s + r
                        , l = t.config.vFactor || 0;
                    return i() || a()
                }
                , isMobile: function () {
                    var t = navigator.userAgent || navigator.vendor || e.opera;
                    return /(ipad|playbook|silk|android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4)) ? !0 : !1
                }
                , isSupported: function () {
                    for (var e = document.createElement("sensor"), t = "Webkit,Moz,O,".split(","), i = ("transition " + t.join("transition,")).split(","), a = 0; a < i.length; a++)
                        if ("" === !e.style[i[a]]) return !1;
                    return !0
                }
                , destroy: function () {
                    var e = n.config.viewport
                        , t = Array.prototype.slice.call(e.querySelectorAll("[data-sr]"));
                    t.forEach(function (e) {
                        e.removeAttribute("data-sr")
                    })
                }
            }, r = function (e) {
                n.blocked || (n.blocked = !0, n.scrolled = n.scrollY(), i(function () {
                    n.animate()
                }))
            }, a = function (e, t) {
                for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                return e
            }, i = function () {
                return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || function (t) {
                    e.setTimeout(t, 1e3 / 60)
                }
            }(), t
        }(window), scrollReveal
    }), ! function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function ($) {
        function e(e, t) {
            return e.parsleyAdaptedCallback || (e.parsleyAdaptedCallback = function () {
                var i = Array.prototype.slice.call(arguments, 0);
                i.unshift(this), e.apply(t || m, i)
            }), e.parsleyAdaptedCallback
        }

        function t(e) {
            return 0 === e.lastIndexOf(v, 0) ? e.substr(v.length) : e
        }
        "undefined" == typeof $ && "undefined" != typeof window.jQuery && ($ = window.jQuery);
        var i = 1
            , a = {}
            , r = {
                attr: function (e, t, i) {
                    var a, r, n = new RegExp("^" + t, "i");
                    if ("undefined" == typeof i) i = {};
                    else
                        for (var s in i) i.hasOwnProperty(s) && delete i[s];
                    if ("undefined" == typeof e || "undefined" == typeof e[0]) return i;
                    r = e[0].attributes;
                    for (var s = r.length; s--;) a = r[s], a && a.specified && n.test(a.name) && (i[this.camelize(a.name.slice(t.length))] = this.deserializeValue(a.value));
                    return i
                }
                , checkAttr: function (e, t, i) {
                    return e.is("[" + t + i + "]")
                }
                , setAttr: function (e, t, i, a) {
                    e[0].setAttribute(this.dasherize(t + i), String(a))
                }
                , generateID: function () {
                    return "" + i++
                }
                , deserializeValue: function (e) {
                    var t;
                    try {
                        return e ? "true" == e || ("false" == e ? !1 : "null" == e ? null : isNaN(t = Number(e)) ? /^[\[\{]/.test(e) ? $.parseJSON(e) : e : t) : e
                    }
                    catch (i) {
                        return e
                    }
                }
                , camelize: function (e) {
                    return e.replace(/-+(.)?/g, function (e, t) {
                        return t ? t.toUpperCase() : ""
                    })
                }
                , dasherize: function (e) {
                    return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
                }
                , warn: function () {
                    window.console && "function" == typeof window.console.warn && window.console.warn.apply(window.console, arguments)
                }
                , warnOnce: function (e) {
                    a[e] || (a[e] = !0, this.warn.apply(this, arguments))
                }
                , _resetWarnings: function () {
                    a = {}
                }
                , objectCreate: Object.create || function () {
                    var e = function () {};
                    return function (t) {
                        if (arguments.length > 1) throw Error("Second argument not supported");
                        if ("object" != typeof t) throw TypeError("Argument must be an object");
                        e.prototype = t;
                        var i = new e;
                        return e.prototype = null, i
                    }
                }()
            }
            , n = {
                namespace: "data-parsley-"
                , inputs: "input, textarea, select"
                , excluded: "input[type=button], input[type=submit], input[type=reset], input[type=hidden]"
                , priorityEnabled: !0
                , multiple: null
                , group: null
                , uiEnabled: !0
                , validationThreshold: 3
                , focus: "first"
                , trigger: !1
                , errorClass: "parsley-error"
                , successClass: "parsley-success"
                , classHandler: function (e) {}
                , errorsContainer: function (e) {}
                , errorsWrapper: '<ul class="parsley-errors-list"></ul>'
                , errorTemplate: "<li></li>"
            }
            , s = function () {};
        s.prototype = {
            asyncSupport: !1
            , actualizeOptions: function () {
                return r.attr(this.$element, this.options.namespace, this.domOptions), this.parent && this.parent.actualizeOptions && this.parent.actualizeOptions(), this
            }
            , _resetOptions: function (e) {
                this.domOptions = r.objectCreate(this.parent.options), this.options = r.objectCreate(this.domOptions);
                for (var t in e) e.hasOwnProperty(t) && (this.options[t] = e[t]);
                this.actualizeOptions()
            }
            , validateThroughValidator: function (e, t, i) {
                return window.ParsleyValidator.validate(e, t, i)
            }
            , _listeners: null
            , on: function (e, t) {
                this._listeners = this._listeners || {};
                var i = this._listeners[e] = this._listeners[e] || [];
                return i.push(t), this
            }
            , subscribe: function (e, t) {
                $.listenTo(this, e.toLowerCase(), t)
            }
            , off: function (e, t) {
                var i = this._listeners && this._listeners[e];
                if (i)
                    if (t)
                        for (var a = i.length; a--;) i[a] === t && i.splice(a, 1);
                    else delete this._listeners[e];
                return this
            }
            , unsubscribe: function (e, t) {
                $.unsubscribeTo(this, e.toLowerCase())
            }
            , trigger: function (e, t) {
                t = t || this;
                var i = this._listeners && this._listeners[e]
                    , a, r;
                if (i)
                    for (var n = i.length; n--;)
                        if (a = i[n].call(t, t), a === !1) return a;
                return this.parent ? this.parent.trigger(e, t) : !0
            }
            , reset: function () {
                if ("ParsleyForm" !== this.__class__) return this._trigger("reset");
                for (var e = 0; e < this.fields.length; e++) this.fields[e]._trigger("reset");
                this._trigger("reset")
            }
            , destroy: function () {
                if ("ParsleyForm" !== this.__class__) return this.$element.removeData("Parsley"), this.$element.removeData("ParsleyFieldMultiple"), void this._trigger("destroy");
                for (var e = 0; e < this.fields.length; e++) this.fields[e].destroy();
                this.$element.removeData("Parsley"), this._trigger("destroy")
            }
            , _findRelatedMultiple: function () {
                return this.parent.$element.find("[" + this.options.namespace + 'multiple="' + this.options.multiple + '"]')
            }
        };
        var o = function () {
            var e = {}
                , t = function (e) {
                    this.__class__ = "Validator", this.__version__ = "1.0.1", this.options = e || {}, this.bindingKey = this.options.bindingKey || "_validatorjsConstraint"
                };
            t.prototype = {
                constructor: t
                , validate: function (e, t, i) {
                    if ("string" != typeof e && "object" != typeof e) throw new Error("You must validate an object or a string");
                    return "string" == typeof e || s(e) ? this._validateString(e, t, i) : this.isBinded(e) ? this._validateBindedObject(e, t) : this._validateObject(e, t, i)
                }
                , bind: function (e, t) {
                    if ("object" != typeof e) throw new Error("Must bind a Constraint to an object");
                    return e[this.bindingKey] = new i(t), this
                }
                , unbind: function (e) {
                    return "undefined" == typeof e._validatorjsConstraint ? this : (delete e[this.bindingKey], this)
                }
                , isBinded: function (e) {
                    return "undefined" != typeof e[this.bindingKey]
                }
                , getBinded: function (e) {
                    return this.isBinded(e) ? e[this.bindingKey] : null
                }
                , _validateString: function (e, t, i) {
                    var n, o = [];
                    s(t) || (t = [t]);
                    for (var l = 0; l < t.length; l++) {
                        if (!(t[l] instanceof r)) throw new Error("You must give an Assert or an Asserts array to validate a string");
                        n = t[l].check(e, i), n instanceof a && o.push(n)
                    }
                    return o.length ? o : !0
                }
                , _validateObject: function (e, t, a) {
                    if ("object" != typeof t) throw new Error("You must give a constraint to validate an object");
                    return t instanceof i ? t.check(e, a) : new i(t).check(e, a)
                }
                , _validateBindedObject: function (e, t) {
                    return e[this.bindingKey].check(e, t)
                }
            }, t.errorCode = {
                must_be_a_string: "must_be_a_string"
                , must_be_an_array: "must_be_an_array"
                , must_be_a_number: "must_be_a_number"
                , must_be_a_string_or_array: "must_be_a_string_or_array"
            };
            var i = function (e, t) {
                if (this.__class__ = "Constraint", this.options = t || {}, this.nodes = {}, e) try {
                    this._bootstrap(e)
                }
                catch (i) {
                    throw new Error("Should give a valid mapping object to Constraint", i, e)
                }
            };
            i.prototype = {
                constructor: i
                , check: function (e, t) {
                    var i, a = {};
                    for (var o in this.nodes) {
                        for (var l = !1, u = this.get(o), d = s(u) ? u : [u], c = d.length - 1; c >= 0; c--) "Required" !== d[c].__class__ || (l = d[c].requiresValidation(t));
                        if (this.has(o, e) || this.options.strict || l) try {
                            this.has(o, this.options.strict || l ? e : void 0) || (new r).HaveProperty(o).validate(e), i = this._check(o, e[o], t), (s(i) && i.length > 0 || !s(i) && !n(i)) && (a[o] = i)
                        }
                        catch (p) {
                            a[o] = p
                        }
                    }
                    return n(a) ? !0 : a
                }
                , add: function (e, t) {
                    if (t instanceof r || s(t) && t[0] instanceof r) return this.nodes[e] = t, this;
                    if ("object" == typeof t && !s(t)) return this.nodes[e] = t instanceof i ? t : new i(t), this;
                    throw new Error("Should give an Assert, an Asserts array, a Constraint", t)
                }
                , has: function (e, t) {
                    return t = "undefined" != typeof t ? t : this.nodes, "undefined" != typeof t[e]
                }
                , get: function (e, t) {
                    return this.has(e) ? this.nodes[e] : t || null
                }
                , remove: function (e) {
                    var t = [];
                    for (var i in this.nodes) i !== e && (t[i] = this.nodes[i]);
                    return this.nodes = t, this
                }
                , _bootstrap: function (e) {
                    if (e instanceof i) return this.nodes = e.nodes;
                    for (var t in e) this.add(t, e[t])
                }
                , _check: function (e, t, a) {
                    if (this.nodes[e] instanceof r) return this._checkAsserts(t, [this.nodes[e]], a);
                    if (s(this.nodes[e])) return this._checkAsserts(t, this.nodes[e], a);
                    if (this.nodes[e] instanceof i) return this.nodes[e].check(t, a);
                    throw new Error("Invalid node", this.nodes[e])
                }
                , _checkAsserts: function (e, t, i) {
                    for (var a, r = [], n = 0; n < t.length; n++) a = t[n].check(e, i), "undefined" != typeof a && !0 !== a && r.push(a);
                    return r
                }
            };
            var a = function (e, t, i) {
                if (this.__class__ = "Violation", !(e instanceof r)) throw new Error("Should give an assertion implementing the Assert interface");
                this.assert = e, this.value = t, "undefined" != typeof i && (this.violation = i)
            };
            a.prototype = {
                show: function () {
                    var e = {
                        assert: this.assert.__class__
                        , value: this.value
                    };
                    return this.violation && (e.violation = this.violation), e
                }
                , __toString: function () {
                    return "undefined" != typeof this.violation && (this.violation = '", ' + this.getViolation().constraint + " expected was " + this.getViolation().expected), this.assert.__class__ + ' assert failed for "' + this.value + this.violation || ""
                }
                , getViolation: function () {
                    var e, t;
                    for (e in this.violation) t = this.violation[e];
                    return {
                        constraint: e
                        , expected: t
                    }
                }
            };
            var r = function (e) {
                this.__class__ = "Assert", this.__parentClass__ = this.__class__, this.groups = [], "undefined" != typeof e && this.addGroup(e)
            };
            r.prototype = {
                construct: r
                , requiresValidation: function (e) {
                    return e && !this.hasGroup(e) ? !1 : !e && this.hasGroups() ? !1 : !0
                }
                , check: function (e, t) {
                    if (this.requiresValidation(t)) try {
                        return this.validate(e, t)
                    }
                    catch (i) {
                        return i
                    }
                }
                , hasGroup: function (e) {
                    return s(e) ? this.hasOneOf(e) : "Any" === e ? !0 : this.hasGroups() ? -1 !== this.groups.indexOf(e) : "Default" === e
                }
                , hasOneOf: function (e) {
                    for (var t = 0; t < e.length; t++)
                        if (this.hasGroup(e[t])) return !0;
                    return !1
                }
                , hasGroups: function () {
                    return this.groups.length > 0
                }
                , addGroup: function (e) {
                    return s(e) ? this.addGroups(e) : (this.hasGroup(e) || this.groups.push(e), this)
                }
                , removeGroup: function (e) {
                    for (var t = [], i = 0; i < this.groups.length; i++) e !== this.groups[i] && t.push(this.groups[i]);
                    return this.groups = t, this
                }
                , addGroups: function (e) {
                    for (var t = 0; t < e.length; t++) this.addGroup(e[t]);
                    return this
                }
                , HaveProperty: function (e) {
                    return this.__class__ = "HaveProperty", this.node = e, this.validate = function (e) {
                        if ("undefined" == typeof e[this.node]) throw new a(this, e, {
                            value: this.node
                        });
                        return !0
                    }, this
                }
                , Blank: function () {
                    return this.__class__ = "Blank", this.validate = function (e) {
                        if ("string" != typeof e) throw new a(this, e, {
                            value: t.errorCode.must_be_a_string
                        });
                        if ("" !== e.replace(/^\s+/g, "").replace(/\s+$/g, "")) throw new a(this, e);
                        return !0
                    }, this
                }
                , Callback: function (e) {
                    if (this.__class__ = "Callback", this.arguments = Array.prototype.slice.call(arguments), 1 === this.arguments.length ? this.arguments = [] : this.arguments.splice(0, 1), "function" != typeof e) throw new Error("Callback must be instanciated with a function");
                    return this.fn = e, this.validate = function (e) {
                        var t = this.fn.apply(this, [e].concat(this.arguments));
                        if (!0 !== t) throw new a(this, e, {
                            result: t
                        });
                        return !0
                    }, this
                }
                , Choice: function (e) {
                    if (this.__class__ = "Choice", !s(e) && "function" != typeof e) throw new Error("Choice must be instanciated with an array or a function");
                    return this.list = e, this.validate = function (e) {
                        for (var t = "function" == typeof this.list ? this.list() : this.list, i = 0; i < t.length; i++)
                            if (e === t[i]) return !0;
                        throw new a(this, e, {
                            choices: t
                        })
                    }, this
                }
                , Collection: function (e) {
                    return this.__class__ = "Collection", this.constraint = "undefined" != typeof e ? e instanceof r ? e : new i(e) : !1, this.validate = function (e, i) {
                        var r, o = new t
                            , l = 0
                            , u = {}
                            , d = this.groups.length ? this.groups : i;
                        if (!s(e)) throw new a(this, e, {
                            value: t.errorCode.must_be_an_array
                        });
                        for (var c = 0; c < e.length; c++) r = this.constraint ? o.validate(e[c], this.constraint, d) : o.validate(e[c], d), n(r) || (u[l] = r), l++;
                        return n(u) ? !0 : u
                    }, this
                }
                , Count: function (e) {
                    return this.__class__ = "Count", this.count = e, this.validate = function (e) {
                        if (!s(e)) throw new a(this, e, {
                            value: t.errorCode.must_be_an_array
                        });
                        var i = "function" == typeof this.count ? this.count(e) : this.count;
                        if (isNaN(Number(i))) throw new Error("Count must be a valid interger", i);
                        if (i !== e.length) throw new a(this, e, {
                            count: i
                        });
                        return !0
                    }, this
                }
                , Email: function () {
                    return this.__class__ = "Email", this.validate = function (e) {
                        var i = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
                        if ("string" != typeof e) throw new a(this, e, {
                            value: t.errorCode.must_be_a_string
                        });
                        if (!i.test(e)) throw new a(this, e);
                        return !0
                    }, this
                }
                , EqualTo: function (e) {
                    if (this.__class__ = "EqualTo", "undefined" == typeof e) throw new Error("EqualTo must be instanciated with a value or a function");
                    return this.reference = e, this.validate = function (e) {
                        var t = "function" == typeof this.reference ? this.reference(e) : this.reference;
                        if (t !== e) throw new a(this, e, {
                            value: t
                        });
                        return !0
                    }, this
                }
                , GreaterThan: function (e) {
                    if (this.__class__ = "GreaterThan", "undefined" == typeof e) throw new Error("Should give a threshold value");
                    return this.threshold = e, this.validate = function (e) {
                        if ("" === e || isNaN(Number(e))) throw new a(this, e, {
                            value: t.errorCode.must_be_a_number
                        });
                        if (this.threshold >= e) throw new a(this, e, {
                            threshold: this.threshold
                        });
                        return !0
                    }, this
                }
                , GreaterThanOrEqual: function (e) {
                    if (this.__class__ = "GreaterThanOrEqual", "undefined" == typeof e) throw new Error("Should give a threshold value");
                    return this.threshold = e, this.validate = function (e) {
                        if ("" === e || isNaN(Number(e))) throw new a(this, e, {
                            value: t.errorCode.must_be_a_number
                        });
                        if (this.threshold > e) throw new a(this, e, {
                            threshold: this.threshold
                        });
                        return !0
                    }, this
                }
                , InstanceOf: function (e) {
                    if (this.__class__ = "InstanceOf", "undefined" == typeof e) throw new Error("InstanceOf must be instanciated with a value");
                    return this.classRef = e, this.validate = function (e) {
                        if (!0 != e instanceof this.classRef) throw new a(this, e, {
                            classRef: this.classRef
                        });
                        return !0
                    }, this
                }
                , Length: function (e) {
                    if (this.__class__ = "Length", !e.min && !e.max) throw new Error("Lenth assert must be instanciated with a { min: x, max: y } object");
                    return this.min = e.min, this.max = e.max, this.validate = function (e) {
                        if ("string" != typeof e && !s(e)) throw new a(this, e, {
                            value: t.errorCode.must_be_a_string_or_array
                        });
                        if ("undefined" != typeof this.min && this.min === this.max && e.length !== this.min) throw new a(this, e, {
                            min: this.min
                            , max: this.max
                        });
                        if ("undefined" != typeof this.max && e.length > this.max) throw new a(this, e, {
                            max: this.max
                        });
                        if ("undefined" != typeof this.min && e.length < this.min) throw new a(this, e, {
                            min: this.min
                        });
                        return !0
                    }, this
                }
                , LessThan: function (e) {
                    if (this.__class__ = "LessThan", "undefined" == typeof e) throw new Error("Should give a threshold value");
                    return this.threshold = e, this.validate = function (e) {
                        if ("" === e || isNaN(Number(e))) throw new a(this, e, {
                            value: t.errorCode.must_be_a_number
                        });
                        if (this.threshold <= e) throw new a(this, e, {
                            threshold: this.threshold
                        });
                        return !0
                    }, this
                }
                , LessThanOrEqual: function (e) {
                    if (this.__class__ = "LessThanOrEqual", "undefined" == typeof e) throw new Error("Should give a threshold value");
                    return this.threshold = e, this.validate = function (e) {
                        if ("" === e || isNaN(Number(e))) throw new a(this, e, {
                            value: t.errorCode.must_be_a_number
                        });
                        if (this.threshold < e) throw new a(this, e, {
                            threshold: this.threshold
                        });
                        return !0
                    }, this
                }
                , NotNull: function () {
                    return this.__class__ = "NotNull", this.validate = function (e) {
                        if (null === e || "undefined" == typeof e) throw new a(this, e);
                        return !0
                    }, this
                }
                , NotBlank: function () {
                    return this.__class__ = "NotBlank", this.validate = function (e) {
                        if ("string" != typeof e) throw new a(this, e, {
                            value: t.errorCode.must_be_a_string
                        });
                        if ("" === e.replace(/^\s+/g, "").replace(/\s+$/g, "")) throw new a(this, e);
                        return !0
                    }, this
                }
                , Null: function () {
                    return this.__class__ = "Null", this.validate = function (e) {
                        if (null !== e) throw new a(this, e);
                        return !0
                    }, this
                }
                , Range: function (e, t) {
                    if (this.__class__ = "Range", "undefined" == typeof e || "undefined" == typeof t) throw new Error("Range assert expects min and max values");
                    return this.min = e, this.max = t, this.validate = function (e) {
                        try {
                            return "string" == typeof e && isNaN(Number(e)) || s(e) ? (new r).Length({
                                min: this.min
                                , max: this.max
                            }).validate(e) : (new r).GreaterThanOrEqual(this.min).validate(e) && (new r).LessThanOrEqual(this.max).validate(e), !0
                        }
                        catch (t) {
                            throw new a(this, e, t.violation)
                        }
                        return !0
                    }, this
                }
                , Regexp: function (e, i) {
                    if (this.__class__ = "Regexp", "undefined" == typeof e) throw new Error("You must give a regexp");
                    return this.regexp = e, this.flag = i || "", this.validate = function (e) {
                        if ("string" != typeof e) throw new a(this, e, {
                            value: t.errorCode.must_be_a_string
                        });
                        if (!new RegExp(this.regexp, this.flag).test(e)) throw new a(this, e, {
                            regexp: this.regexp
                            , flag: this.flag
                        });
                        return !0
                    }, this
                }
                , Required: function () {
                    return this.__class__ = "Required", this.validate = function (e) {
                        if ("undefined" == typeof e) throw new a(this, e);
                        try {
                            "string" == typeof e ? (new r).NotNull().validate(e) && (new r).NotBlank().validate(e) : !0 === s(e) && (new r).Length({
                                min: 1
                            }).validate(e)
                        }
                        catch (t) {
                            throw new a(this, e)
                        }
                        return !0
                    }, this
                }
                , Unique: function (e) {
                    return this.__class__ = "Unique", "object" == typeof e && (this.key = e.key), this.validate = function (e) {
                        var i, r = [];
                        if (!s(e)) throw new a(this, e, {
                            value: t.errorCode.must_be_an_array
                        });
                        for (var n = 0; n < e.length; n++)
                            if (i = "object" == typeof e[n] ? e[n][this.key] : e[n], "undefined" != typeof i) {
                                if (-1 !== r.indexOf(i)) throw new a(this, e, {
                                    value: i
                                });
                                r.push(i)
                            }
                        return !0
                    }, this
                }
            }, e.Assert = r, e.Validator = t, e.Violation = a, e.Constraint = i, Array.prototype.indexOf || (Array.prototype.indexOf = function (e) {
                "use strict";
                if (null === this) throw new TypeError;
                var t = Object(this)
                    , i = t.length >>> 0;
                if (0 === i) return -1;
                var a = 0;
                if (arguments.length > 1 && (a = Number(arguments[1]), a != a ? a = 0 : 0 !== a && a != 1 / 0 && a != -(1 / 0) && (a = (a > 0 || -1) * Math.floor(Math.abs(a)))), a >= i) return -1;
                for (var r = a >= 0 ? a : Math.max(i - Math.abs(a), 0); i > r; r++)
                    if (r in t && t[r] === e) return r;
                return -1
            });
            var n = function (e) {
                    for (var t in e) return !1;
                    return !0
                }
                , s = function (e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                };
            return "function" == typeof define && define.amd ? define("vendors/validator.js/dist/validator", [], function () {
                return e
            }) : "undefined" != typeof module && module.exports ? module.exports = e : window["undefined" != typeof validatorjs_ns ? validatorjs_ns : "Validator"] = e, e
        }();
        o = "undefined" != typeof o ? o : "undefined" != typeof module ? module.exports : null;
        var l = function (e, t) {
            this.__class__ = "ParsleyValidator", this.Validator = o, this.locale = "en", this.init(e || {}, t || {})
        };
        l.prototype = {
            init: function (e, t) {
                this.catalog = t, this.validators = $.extend({}, this.validators);
                for (var i in e) this.addValidator(i, e[i].fn, e[i].priority, e[i].requirementsTransformer);
                window.Parsley.trigger("parsley:validator:init")
            }
            , setLocale: function (e) {
                if ("undefined" == typeof this.catalog[e]) throw new Error(e + " is not available in the catalog");
                return this.locale = e, this
            }
            , addCatalog: function (e, t, i) {
                return "object" == typeof t && (this.catalog[e] = t), !0 === i ? this.setLocale(e) : this
            }
            , addMessage: function (e, t, i) {
                return "undefined" == typeof this.catalog[e] && (this.catalog[e] = {}), this.catalog[e][t.toLowerCase()] = i, this
            }
            , validate: function (e, t, i) {
                return (new this.Validator.Validator).validate.apply(new o.Validator, arguments)
            }
            , addValidator: function (e, t, i, a) {
                if (this.validators[e]) r.warn('Validator "' + e + '" is already defined.');
                else if (n.hasOwnProperty(e)) return void r.warn('"' + e + '" is a restricted keyword and is not a valid validator name.');
                return this._setValidator(e, t, i, a)
            }
            , updateValidator: function (e, t, i, a) {
                return this.validators[e] ? this._setValidator(e, t, i, a) : (r.warn('Validator "' + e + '" is not already defined.'), this.addValidator(e, t, i, a))
            }
            , removeValidator: function (e) {
                return this.validators[e] || r.warn('Validator "' + e + '" is not defined.'), delete this.validators[e], this
            }
            , _setValidator: function (e, t, i, a) {
                return this.validators[e] = function (e) {
                    return $.extend((new o.Assert).Callback(t, e), {
                        priority: i
                        , requirementsTransformer: a
                    })
                }, this
            }
            , getErrorMessage: function (e) {
                var t;
                if ("type" === e.name) {
                    var i = this.catalog[this.locale][e.name] || {};
                    t = i[e.requirements]
                }
                else t = this.formatMessage(this.catalog[this.locale][e.name], e.requirements);
                return t || this.catalog[this.locale].defaultMessage || this.catalog.en.defaultMessage
            }
            , formatMessage: function (e, t) {
                if ("object" == typeof t) {
                    for (var i in t) e = this.formatMessage(e, t[i]);
                    return e
                }
                return "string" == typeof e ? e.replace(new RegExp("%s", "i"), t) : ""
            }
            , validators: {
                notblank: function () {
                    return $.extend((new o.Assert).NotBlank(), {
                        priority: 2
                    })
                }
                , required: function () {
                    return $.extend((new o.Assert).Required(), {
                        priority: 512
                    })
                }
                , type: function (e) {
                    var t;
                    switch (e) {
                    case "email":
                        t = (new o.Assert).Email();
                        break;
                    case "range":
                    case "number":
                        t = (new o.Assert).Regexp("^-?(?:\\d+|\\d{1,3}(?:,\\d{3})+)?(?:\\.\\d+)?$");
                        break;
                    case "integer":
                        t = (new o.Assert).Regexp("^-?\\d+$");
                        break;
                    case "digits":
                        t = (new o.Assert).Regexp("^\\d+$");
                        break;
                    case "alphanum":
                        t = (new o.Assert).Regexp("^\\w+$", "i");
                        break;
                    case "url":
                        t = (new o.Assert).Regexp("^(?:(?:https?|ftp)://)?(?:\\S+(?::\\S*)?@)?(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$", "i");
                        break;
                    default:
                        throw new Error("validator type `" + e + "` is not supported")
                    }
                    return $.extend(t, {
                        priority: 256
                    })
                }
                , pattern: function (e) {
                    var t = "";
                    return /^\/.*\/(?:[gimy]*)$/.test(e) && (t = e.replace(/.*\/([gimy]*)$/, "$1"), e = e.replace(new RegExp("^/(.*?)/" + t + "$"), "$1")), $.extend((new o.Assert).Regexp(e, t), {
                        priority: 64
                    })
                }
                , minlength: function (e) {
                    return $.extend((new o.Assert).Length({
                        min: e
                    }), {
                        priority: 30
                        , requirementsTransformer: function () {
                            return "string" != typeof e || isNaN(e) ? e : parseInt(e, 10)
                        }
                    })
                }
                , maxlength: function (e) {
                    return $.extend((new o.Assert).Length({
                        max: e
                    }), {
                        priority: 30
                        , requirementsTransformer: function () {
                            return "string" != typeof e || isNaN(e) ? e : parseInt(e, 10)
                        }
                    })
                }
                , length: function (e) {
                    return $.extend((new o.Assert).Length({
                        min: e[0]
                        , max: e[1]
                    }), {
                        priority: 32
                    })
                }
                , mincheck: function (e) {
                    return this.minlength(e)
                }
                , maxcheck: function (e) {
                    return this.maxlength(e)
                }
                , check: function (e) {
                    return this.length(e)
                }
                , min: function (e) {
                    return $.extend((new o.Assert).GreaterThanOrEqual(e), {
                        priority: 30
                        , requirementsTransformer: function () {
                            return "string" != typeof e || isNaN(e) ? e : parseInt(e, 10)
                        }
                    })
                }
                , max: function (e) {
                    return $.extend((new o.Assert).LessThanOrEqual(e), {
                        priority: 30
                        , requirementsTransformer: function () {
                            return "string" != typeof e || isNaN(e) ? e : parseInt(e, 10)
                        }
                    })
                }
                , range: function (e) {
                    return $.extend((new o.Assert).Range(e[0], e[1]), {
                        priority: 32
                        , requirementsTransformer: function () {
                            for (var t = 0; t < e.length; t++) e[t] = "string" != typeof e[t] || isNaN(e[t]) ? e[t] : parseInt(e[t], 10);
                            return e
                        }
                    })
                }
                , equalto: function (e) {
                    return $.extend((new o.Assert).EqualTo(e), {
                        priority: 256
                        , requirementsTransformer: function () {
                            return $(e).length ? $(e).val() : e
                        }
                    })
                }
            }
        };
        var u = function (e) {
            this.__class__ = "ParsleyUI"
        };
        u.prototype = {
            listen: function () {
                var e = this;
                return window.Parsley.on("form:init", function () {
                    e.setupForm(this)
                }).on("field:init", function () {
                    e.setupField(this)
                }).on("field:validated", function () {
                    e.reflow(this)
                }).on("form:validated", function () {
                    e.focus(this)
                }).on("field:reset", function () {
                    e.reset(this)
                }).on("form:destroy", function () {
                    e.destroy(this)
                }).on("field:destroy", function () {
                    e.destroy(this)
                }), this
            }
            , reflow: function (e) {
                if ("undefined" != typeof e._ui && !1 !== e._ui.active) {
                    var t = this._diff(e.validationResult, e._ui.lastValidationResult);
                    e._ui.lastValidationResult = e.validationResult, e._ui.validatedOnce = !0, this.manageStatusClass(e), this.manageErrorsMessages(e, t), this.actualizeTriggers(e), (t.kept.length || t.added.length) && !0 !== e._ui.failedOnce && this.manageFailingFieldTrigger(e)
                }
            }
            , getErrorsMessages: function (e) {
                if (!0 === e.validationResult) return [];
                for (var t = [], i = 0; i < e.validationResult.length; i++) t.push(this._getErrorMessage(e, e.validationResult[i].assert));
                return t
            }
            , manageStatusClass: function (e) {
                e.hasConstraints() && e.needsValidation() && !0 === e.validationResult ? this._successClass(e) : e.validationResult.length > 0 ? this._errorClass(e) : this._resetClass(e)
            }
            , manageErrorsMessages: function (e, t) {
                if ("undefined" == typeof e.options.errorsMessagesDisabled) {
                    if ("undefined" != typeof e.options.errorMessage) return t.added.length || t.kept.length ? (this._insertErrorWrapper(e), 0 === e._ui.$errorsWrapper.find(".parsley-custom-error-message").length && e._ui.$errorsWrapper.append($(e.options.errorTemplate).addClass("parsley-custom-error-message")), e._ui.$errorsWrapper.addClass("filled").find(".parsley-custom-error-message").html(e.options.errorMessage)) : e._ui.$errorsWrapper.removeClass("filled").find(".parsley-custom-error-message").remove();
                    for (var i = 0; i < t.removed.length; i++) this.removeError(e, t.removed[i].assert.name, !0);
                    for (i = 0; i < t.added.length; i++) this.addError(e, t.added[i].assert.name, void 0, t.added[i].assert, !0);
                    for (i = 0; i < t.kept.length; i++) this.updateError(e, t.kept[i].assert.name, void 0, t.kept[i].assert, !0)
                }
            }
            , addError: function (e, t, i, a, r) {
                this._insertErrorWrapper(e), e._ui.$errorsWrapper.addClass("filled").append($(e.options.errorTemplate).addClass("parsley-" + t).html(i || this._getErrorMessage(e, a))), !0 !== r && this._errorClass(e)
            }
            , updateError: function (e, t, i, a, r) {
                e._ui.$errorsWrapper.addClass("filled").find(".parsley-" + t).html(i || this._getErrorMessage(e, a)), !0 !== r && this._errorClass(e)
            }
            , removeError: function (e, t, i) {
                e._ui.$errorsWrapper.removeClass("filled").find(".parsley-" + t).remove(), !0 !== i && this.manageStatusClass(e)
            }
            , focus: function (e) {
                if (e._focusedField = null, !0 === e.validationResult || "none" === e.options.focus) return null;
                for (var t = 0; t < e.fields.length; t++) {
                    var i = e.fields[t];
                    if (!0 !== i.validationResult && i.validationResult.length > 0 && "undefined" == typeof i.options.noFocus && (e._focusedField = i.$element, "first" === e.options.focus)) break
                }
                return null === e._focusedField ? null : e._focusedField.focus()
            }
            , _getErrorMessage: function (e, t) {
                var i = t.name + "Message";
                return "undefined" != typeof e.options[i] ? window.ParsleyValidator.formatMessage(e.options[i], t.requirements) : window.ParsleyValidator.getErrorMessage(t)
            }
            , _diff: function (e, t, i) {
                for (var a = [], r = [], n = 0; n < e.length; n++) {
                    for (var s = !1, o = 0; o < t.length; o++)
                        if (e[n].assert.name === t[o].assert.name) {
                            s = !0;
                            break
                        }
                    s ? r.push(e[n]) : a.push(e[n])
                }
                return {
                    kept: r
                    , added: a
                    , removed: i ? [] : this._diff(t, e, !0).added
                }
            }
            , setupForm: function (e) {
                e.$element.on("submit.Parsley", !1, $.proxy(e.onSubmitValidate, e)), !1 !== e.options.uiEnabled && e.$element.attr("novalidate", "")
            }
            , setupField: function (e) {
                var t = {
                    active: !1
                };
                !1 !== e.options.uiEnabled && (t.active = !0, e.$element.attr(e.options.namespace + "id", e.__id__), t.$errorClassHandler = this._manageClassHandler(e), t.errorsWrapperId = "parsley-id-" + (e.options.multiple ? "multiple-" + e.options.multiple : e.__id__), t.$errorsWrapper = $(e.options.errorsWrapper).attr("id", t.errorsWrapperId), t.lastValidationResult = [], t.validatedOnce = !1, t.validationInformationVisible = !1, e._ui = t, this.actualizeTriggers(e))
            }
            , _manageClassHandler: function (e) {
                if ("string" == typeof e.options.classHandler && $(e.options.classHandler).length) return $(e.options.classHandler);
                var t = e.options.classHandler(e);
                return "undefined" != typeof t && t.length ? t : !e.options.multiple || e.$element.is("select") ? e.$element : e.$element.parent()
            }
            , _insertErrorWrapper: function (e) {
                var t;
                if (0 !== e._ui.$errorsWrapper.parent().length) return e._ui.$errorsWrapper.parent();
                if ("string" == typeof e.options.errorsContainer) {
                    if ($(e.options.errorsContainer).length) return $(e.options.errorsContainer).append(e._ui.$errorsWrapper);
                    r.warn("The errors container `" + e.options.errorsContainer + "` does not exist in DOM")
                }
                else "function" == typeof e.options.errorsContainer && (t = e.options.errorsContainer(e));
                if ("undefined" != typeof t && t.length) return t.append(e._ui.$errorsWrapper);
                var i = e.$element;
                return e.options.multiple && (i = i.parent()), i.after(e._ui.$errorsWrapper)
            }
            , actualizeTriggers: function (e) {
                var t = e.$element;
                if (e.options.multiple && (t = $("[" + e.options.namespace + 'multiple="' + e.options.multiple + '"]')), t.off(".Parsley"), !1 !== e.options.trigger) {
                    var i = e.options.trigger.replace(/^\s+/g, "").replace(/\s+$/g, "");
                    "" !== i && t.on(i.split(" ").join(".Parsley ") + ".Parsley", $.proxy("function" == typeof e.eventValidate ? e.eventValidate : this.eventValidate, e))
                }
            }
            , eventValidate: function (e) {
                new RegExp("key").test(e.type) && !this._ui.validationInformationVisible && this.getValue().length <= this.options.validationThreshold || (this._ui.validatedOnce = !0, this.validate())
            }
            , manageFailingFieldTrigger: function (e) {
                return e._ui.failedOnce = !0, e.options.multiple && $("[" + e.options.namespace + 'multiple="' + e.options.multiple + '"]').each(function () {
                    return new RegExp("change", "i").test($(this).parsley().options.trigger || "") ? void 0 : $(this).on("change.ParsleyFailedOnce", !1, $.proxy(e.validate, e))
                }), e.$element.is("select") && !new RegExp("change", "i").test(e.options.trigger || "") ? e.$element.on("change.ParsleyFailedOnce", !1, $.proxy(e.validate, e)) : new RegExp("keyup", "i").test(e.options.trigger || "") ? void 0 : e.$element.on("keyup.ParsleyFailedOnce", !1, $.proxy(e.validate, e))
            }
            , reset: function (e) {
                this.actualizeTriggers(e), e.$element.off(".ParsleyFailedOnce"), "undefined" != typeof e._ui && "ParsleyForm" !== e.__class__ && (e._ui.$errorsWrapper.removeClass("filled").children().remove(), this._resetClass(e), e._ui.validatedOnce = !1, e._ui.lastValidationResult = [], e._ui.validationInformationVisible = !1, e._ui.failedOnce = !1)
            }
            , destroy: function (e) {
                this.reset(e), "ParsleyForm" !== e.__class__ && ("undefined" != typeof e._ui && e._ui.$errorsWrapper.remove(), delete e._ui)
            }
            , _successClass: function (e) {
                e._ui.validationInformationVisible = !0, e._ui.$errorClassHandler.removeClass(e.options.errorClass).addClass(e.options.successClass)
            }
            , _errorClass: function (e) {
                e._ui.validationInformationVisible = !0, e._ui.$errorClassHandler.removeClass(e.options.successClass).addClass(e.options.errorClass)
            }
            , _resetClass: function (e) {
                e._ui.$errorClassHandler.removeClass(e.options.successClass).removeClass(e.options.errorClass)
            }
        };
        var d = function (e, t, i) {
            this.__class__ = "ParsleyForm", this.__id__ = r.generateID(), this.$element = $(e), this.domOptions = t, this.options = i, this.parent = window.Parsley, this.fields = [], this.validationResult = null
        };
        d.prototype = {
            onSubmitValidate: function (e) {
                return this.validate(void 0, void 0, e), (!1 === this.validationResult || !this._trigger("submit")) && e instanceof $.Event && (e.stopImmediatePropagation(), e.preventDefault()), this
            }
            , validate: function (e, t, i) {
                this.submitEvent = i, this.validationResult = !0;
                var a = [];
                return this._trigger("validate"), this._refreshFields(), this._withoutReactualizingFormOptions(function () {
                    for (var i = 0; i < this.fields.length; i++)(!e || this._isFieldInGroup(this.fields[i], e)) && (a = this.fields[i].validate(t), !0 !== a && a.length > 0 && this.validationResult && (this.validationResult = !1))
                }), this._trigger(this.validationResult ? "success" : "error"), this._trigger("validated"), this.validationResult
            }
            , isValid: function (e, t) {
                return this._refreshFields(), this._withoutReactualizingFormOptions(function () {
                    for (var i = 0; i < this.fields.length; i++)
                        if ((!e || this._isFieldInGroup(this.fields[i], e)) && !1 === this.fields[i].isValid(t)) return !1;
                    return !0
                })
            }
            , _isFieldInGroup: function (e, t) {
                return $.isArray(e.options.group) ? -1 !== $.inArray(t, e.options.group) : e.options.group === t
            }
            , _refreshFields: function () {
                return this.actualizeOptions()._bindFields()
            }
            , _bindFields: function () {
                var e = this
                    , t = this.fields;
                return this.fields = [], this.fieldsMappedById = {}, this._withoutReactualizingFormOptions(function () {
                    this.$element.find(this.options.inputs).not(this.options.excluded).each(function () {
                        var t = new y.Factory(this, {}, e);
                        "ParsleyField" !== t.__class__ && "ParsleyFieldMultiple" !== t.__class__ || !0 === t.options.excluded || "undefined" == typeof e.fieldsMappedById[t.__class__ + "-" + t.__id__] && (e.fieldsMappedById[t.__class__ + "-" + t.__id__] = t, e.fields.push(t))
                    }), $(t).not(e.fields).each(function () {
                        this._trigger("reset")
                    })
                }), this
            }
            , _withoutReactualizingFormOptions: function (e) {
                var t = this.actualizeOptions;
                this.actualizeOptions = function () {
                    return this
                };
                var i = e.call(this);
                return this.actualizeOptions = t, i
            }
            , _trigger: function (e) {
                return e = "form:" + e, this.trigger.apply(this, arguments)
            }
        };
        var c = function (e, t, i, a, n) {
                var s = {};
                if (!new RegExp("ParsleyField").test(e.__class__)) throw new Error("ParsleyField or ParsleyFieldMultiple instance expected");
                if ("function" == typeof window.ParsleyValidator.validators[t] && (s = window.ParsleyValidator.validators[t](i)), "Assert" !== s.__parentClass__) throw new Error("Valid validator expected");
                var o = function () {
                    return "undefined" != typeof e.options[t + "Priority"] ? e.options[t + "Priority"] : s.priority || 2
                };
                return a = a || o(), "function" == typeof s.requirementsTransformer && (i = s.requirementsTransformer(), s = window.ParsleyValidator.validators[t](i)), $.extend(s, {
                    name: t
                    , requirements: i
                    , priority: a
                    , groups: [a]
                    , isDomConstraint: n || r.checkAttr(e.$element, e.options.namespace, t)
                })
            }
            , p = function (e, t, i, a) {
                this.__class__ = "ParsleyField", this.__id__ = r.generateID(), this.$element = $(e), "undefined" != typeof a && (this.parent = a), this.options = i, this.domOptions = t, this.constraints = [], this.constraintsByName = {}, this.validationResult = [], this._bindConstraints()
            };
        p.prototype = {
            validate: function (e) {
                return this.value = this.getValue(), this._trigger("validate"), this._trigger(this.isValid(e, this.value) ? "success" : "error"), this._trigger("validated"), this.validationResult
            }
            , hasConstraints: function () {
                return 0 !== this.constraints.length
            }
            , needsValidation: function (e) {
                return "undefined" == typeof e && (e = this.getValue()), e.length || this._isRequired() || "undefined" != typeof this.options.validateIfEmpty ? !0 : !1
            }
            , isValid: function (e, t) {
                if (this.refreshConstraints(), this.validationResult = !0, !this.hasConstraints()) return !0;
                if (("undefined" == typeof t || null === t) && (t = this.getValue()), !this.needsValidation(t) && !0 !== e) return !0;
                var i = ["Any"];
                !1 !== this.options.priorityEnabled && (i = this._getConstraintsSortedPriorities());
                for (var a = 0; a < i.length; a++)
                    if (!0 !== (this.validationResult = this.validateThroughValidator(t, this.constraints, i[a]))) return !1;
                return !0
            }
            , getValue: function () {
                var e;
                return e = "function" == typeof this.options.value ? this.options.value(this) : "undefined" != typeof this.options.value ? this.options.value : this.$element.val(), "undefined" == typeof e || null === e ? "" : this._handleWhitespace(e)
            }
            , refreshConstraints: function () {
                return this.actualizeOptions()._bindConstraints()
            }
            , addConstraint: function (e, t, i, a) {
                if ("function" == typeof window.ParsleyValidator.validators[e]) {
                    var r = new c(this, e, t, i, a);
                    "undefined" !== this.constraintsByName[r.name] && this.removeConstraint(r.name), this.constraints.push(r), this.constraintsByName[r.name] = r
                }
                return this
            }
            , removeConstraint: function (e) {
                for (var t = 0; t < this.constraints.length; t++)
                    if (e === this.constraints[t].name) {
                        this.constraints.splice(t, 1);
                        break
                    }
                return delete this.constraintsByName[e], this
            }
            , updateConstraint: function (e, t, i) {
                return this.removeConstraint(e).addConstraint(e, t, i)
            }
            , _bindConstraints: function () {
                for (var e = [], t = {}, i = 0; i < this.constraints.length; i++) !1 === this.constraints[i].isDomConstraint && (e.push(this.constraints[i]), t[this.constraints[i].name] = this.constraints[i]);
                this.constraints = e, this.constraintsByName = t;
                for (var a in this.options) this.addConstraint(a, this.options[a]);
                return this._bindHtml5Constraints()
            }
            , _bindHtml5Constraints: function () {
                (this.$element.hasClass("required") || this.$element.attr("required")) && this.addConstraint("required", !0, void 0, !0), "string" == typeof this.$element.attr("pattern") && this.addConstraint("pattern", this.$element.attr("pattern"), void 0, !0), "undefined" != typeof this.$element.attr("min") && "undefined" != typeof this.$element.attr("max") ? this.addConstraint("range", [this.$element.attr("min"), this.$element.attr("max")], void 0, !0) : "undefined" != typeof this.$element.attr("min") ? this.addConstraint("min", this.$element.attr("min"), void 0, !0) : "undefined" != typeof this.$element.attr("max") && this.addConstraint("max", this.$element.attr("max"), void 0, !0), "undefined" != typeof this.$element.attr("minlength") && "undefined" != typeof this.$element.attr("maxlength") ? this.addConstraint("length", [this.$element.attr("minlength"), this.$element.attr("maxlength")], void 0, !0) : "undefined" != typeof this.$element.attr("minlength") ? this.addConstraint("minlength", this.$element.attr("minlength"), void 0, !0) : "undefined" != typeof this.$element.attr("maxlength") && this.addConstraint("maxlength", this.$element.attr("maxlength"), void 0, !0);
                var e = this.$element.attr("type");
                return "undefined" == typeof e ? this : "number" === e ? "undefined" == typeof this.$element.attr("step") || 0 === parseFloat(this.$element.attr("step")) % 1 ? this.addConstraint("type", "integer", void 0, !0) : this.addConstraint("type", "number", void 0, !0) : /^(email|url|range)$/i.test(e) ? this.addConstraint("type", e, void 0, !0) : this
            }
            , _isRequired: function () {
                return "undefined" == typeof this.constraintsByName.required ? !1 : !1 !== this.constraintsByName.required.requirements
            }
            , _trigger: function (e) {
                return e = "field:" + e, this.trigger.apply(this, arguments)
            }
            , _handleWhitespace: function (e) {
                return !0 === this.options.trimValue && r.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"'), "squish" === this.options.whitespace && (e = e.replace(/\s{2,}/g, " ")), ("trim" === this.options.whitespace || "squish" === this.options.whitespace || !0 === this.options.trimValue) && (e = e.replace(/^\s+|\s+$/g, "")), e
            }
            , _getConstraintsSortedPriorities: function () {
                for (var e = [], t = 0; t < this.constraints.length; t++) - 1 === e.indexOf(this.constraints[t].priority) && e.push(this.constraints[t].priority);
                return e.sort(function (e, t) {
                    return t - e
                }), e
            }
        };
        var f = function () {
            this.__class__ = "ParsleyFieldMultiple"
        };
        f.prototype = {
            addElement: function (e) {
                return this.$elements.push(e), this
            }
            , refreshConstraints: function () {
                var e;
                if (this.constraints = [], this.$element.is("select")) return this.actualizeOptions()._bindConstraints(), this;
                for (var t = 0; t < this.$elements.length; t++)
                    if ($("html").has(this.$elements[t]).length) {
                        e = this.$elements[t].data("ParsleyFieldMultiple").refreshConstraints().constraints;
                        for (var i = 0; i < e.length; i++) this.addConstraint(e[i].name, e[i].requirements, e[i].priority, e[i].isDomConstraint)
                    }
                    else this.$elements.splice(t, 1);
                return this
            }
            , getValue: function () {
                if ("undefined" != typeof this.options.value) return this.options.value;
                if (this.$element.is("input[type=radio]")) return this._findRelatedMultiple().filter(":checked").val() || "";
                if (this.$element.is("input[type=checkbox]")) {
                    var e = [];
                    return this._findRelatedMultiple().filter(":checked").each(function () {
                        e.push($(this).val())
                    }), e
                }
                return this.$element.is("select") && null === this.$element.val() ? [] : this.$element.val()
            }
            , _init: function () {
                return this.$elements = [this.$element], this
            }
        };
        var h = function (e, t, i) {
            this.$element = $(e);
            var a = this.$element.data("Parsley");
            if (a) return "undefined" != typeof i && a.parent === window.Parsley && (a.parent = i, a._resetOptions(a.options)), a;
            if (!this.$element.length) throw new Error("You must bind Parsley on an existing element.");
            if ("undefined" != typeof i && "ParsleyForm" !== i.__class__) throw new Error("Parent instance must be a ParsleyForm instance");
            return this.parent = i || window.Parsley, this.init(t)
        };
        h.prototype = {
            init: function (e) {
                return this.__class__ = "Parsley", this.__version__ = "2.1.3", this.__id__ = r.generateID(), this._resetOptions(e), this.$element.is("form") || r.checkAttr(this.$element, this.options.namespace, "validate") && !this.$element.is(this.options.inputs) ? this.bind("parsleyForm") : this.isMultiple() ? this.handleMultiple() : this.bind("parsleyField")
            }
            , isMultiple: function () {
                return this.$element.is("input[type=radio], input[type=checkbox]") || this.$element.is("select") && "undefined" != typeof this.$element.attr("multiple")
            }
            , handleMultiple: function () {
                var e = this
                    , t, i, a;
                if (this.options.multiple || ("undefined" != typeof this.$element.attr("name") && this.$element.attr("name").length ? this.options.multiple = t = this.$element.attr("name") : "undefined" != typeof this.$element.attr("id") && this.$element.attr("id").length && (this.options.multiple = this.$element.attr("id"))), this.$element.is("select") && "undefined" != typeof this.$element.attr("multiple")) return this.options.multiple = this.options.multiple || this.__id__, this.bind("parsleyFieldMultiple");
                if (!this.options.multiple) return r.warn("To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.", this.$element), this;
                this.options.multiple = this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g, ""), "undefined" != typeof t && $('input[name="' + t + '"]').each(function () {
                    $(this).is("input[type=radio], input[type=checkbox]") && $(this).attr(e.options.namespace + "multiple", e.options.multiple)
                });
                for (var n = this._findRelatedMultiple(), s = 0; s < n.length; s++)
                    if (a = $(n.get(s)).data("Parsley"), "undefined" != typeof a) {
                        this.$element.data("ParsleyFieldMultiple") || a.addElement(this.$element);
                        break
                    }
                return this.bind("parsleyField", !0), a || this.bind("parsleyFieldMultiple")
            }
            , bind: function (e, t) {
                var i;
                switch (e) {
                case "parsleyForm":
                    i = $.extend(new d(this.$element, this.domOptions, this.options), window.ParsleyExtend)._bindFields();
                    break;
                case "parsleyField":
                    i = $.extend(new p(this.$element, this.domOptions, this.options, this.parent), window.ParsleyExtend);
                    break;
                case "parsleyFieldMultiple":
                    i = $.extend(new p(this.$element, this.domOptions, this.options, this.parent), new f, window.ParsleyExtend)._init();
                    break;
                default:
                    throw new Error(e + "is not a supported Parsley type")
                }
                return this.options.multiple && r.setAttr(this.$element, this.options.namespace, "multiple", this.options.multiple), "undefined" != typeof t ? (this.$element.data("ParsleyFieldMultiple", i), i) : (this.$element.data("Parsley", i), i._trigger("init"), i)
            }
        };
        var m = $({})
            , g = function () {
                r.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley")
            }
            , v = "parsley:";
        $.listen = function (i, a) {
            var r;
            if (g(), "object" == typeof arguments[1] && "function" == typeof arguments[2] && (r = arguments[1], a = arguments[2]), "function" != typeof arguments[1]) throw new Error("Wrong parameters");
            window.Parsley.on(t(i), e(a, r))
        }, $.listenTo = function (i, a, r) {
            if (g(), !(i instanceof p || i instanceof d)) throw new Error("Must give Parsley instance");
            if ("string" != typeof a || "function" != typeof r) throw new Error("Wrong parameters");
            i.on(t(a), e(r));
        }, $.unsubscribe = function (e, i) {
            if (g(), "string" != typeof e || "function" != typeof i) throw new Error("Wrong arguments");
            window.Parsley.off(t(e), i.parsleyAdaptedCallback)
        }, $.unsubscribeTo = function (e, i) {
            if (g(), !(e instanceof p || e instanceof d)) throw new Error("Must give Parsley instance");
            e.off(t(i))
        }, $.unsubscribeAll = function (e) {
            g(), window.Parsley.off(t(e)), $("form,input,textarea,select").each(function () {
                var i = $(this).data("Parsley");
                i && i.off(t(e))
            })
        }, $.emit = function (e, i) {
            g();
            var a = i instanceof p || i instanceof d
                , r = Array.prototype.slice.call(arguments, a ? 2 : 1);
            r.unshift(t(e)), a || (i = window.Parsley), i.trigger.apply(i, r)
        }, window.ParsleyConfig = window.ParsleyConfig || {}, window.ParsleyConfig.i18n = window.ParsleyConfig.i18n || {}, window.ParsleyConfig.i18n.en = jQuery.extend(window.ParsleyConfig.i18n.en || {}, {
            defaultMessage: "This value seems to be invalid."
            , type: {
                email: "This value should be a valid email."
                , url: "This value should be a valid url."
                , number: "This value should be a valid number."
                , integer: "This value should be a valid integer."
                , digits: "This value should be digits."
                , alphanum: "This value should be alphanumeric."
            }
            , notblank: "This value should not be blank."
            , required: "This value is required."
            , pattern: "This value seems to be invalid."
            , min: "This value should be greater than or equal to %s."
            , max: "This value should be lower than or equal to %s."
            , range: "This value should be between %s and %s."
            , minlength: "This value is too short. It should have %s characters or more."
            , maxlength: "This value is too long. It should have %s characters or fewer."
            , length: "This value length is invalid. It should be between %s and %s characters long."
            , mincheck: "You must select at least %s choices."
            , maxcheck: "You must select %s choices or fewer."
            , check: "You must select between %s and %s choices."
            , equalto: "This value should be the same."
        }), "undefined" != typeof window.ParsleyValidator && window.ParsleyValidator.addCatalog("en", window.ParsleyConfig.i18n.en, !0);
        var y = $.extend(new s, {
            $element: $(document)
            , actualizeOptions: null
            , _resetOptions: null
            , Factory: h
            , version: "2.1.3"
        });
        return $.extend(p.prototype, s.prototype), $.extend(d.prototype, s.prototype), $.extend(h.prototype, s.prototype), $.fn.parsley = $.fn.psly = function (e) {
            if (this.length > 1) {
                var t = [];
                return this.each(function () {
                    t.push($(this).parsley(e))
                }), t
            }
            return $(this).length ? new h(this, e) : void r.warn("You must bind Parsley on an existing element.")
        }, "undefined" == typeof window.ParsleyExtend && (window.ParsleyExtend = {}), y.options = $.extend(r.objectCreate(n), window.ParsleyConfig), window.ParsleyConfig = y.options, window.Parsley = window.psly = y, window.ParsleyUtils = r, window.ParsleyValidator = new l(window.ParsleyConfig.validators, window.ParsleyConfig.i18n), window.ParsleyUI = "function" == typeof window.ParsleyConfig.ParsleyUI ? (new window.ParsleyConfig.ParsleyUI).listen() : (new u).listen(), !1 !== window.ParsleyConfig.autoBind && $(function () {
            $("[data-parsley-validate]").length && $("[data-parsley-validate]").parsley()
        }), window.Parsley
    });
var draqenApp = draqenApp || {};
draqenApp.siteOverlay = {
    $el: $(".site-overlay")
    , enable: function () {
        this.$el.addClass("is--active")
    }
    , disable: function () {
        this.$el.removeClass("is--active")
    }
    , registerEvents: function () {
        var e = this;
        e.$el.click(function (t) {
            e.$el.hasClass("is--active") && draqenApp.closeMobileNavigation()
        })
    }
}, draqenApp.langSwitcher = {
    $el: $('button[data-action="open-language-switcher"]')
    , $list: $(".lang-switcher__list")
    , initialize: function () {
        var e = this;
        e.$list.velocity({
            rotateX: "-90deg"
            , opacity: 0
        }, {
            duration: 5
            , complete: function () {
                e.$list.addClass("is--set")
            }
        }), e.$el.click(function () {
            var t = e.$list.hasClass("is--active")
                , i = t ? "-90deg" : 0
                , a = t ? 0 : 1;
            e.$list.toggleClass("is--active"), e.$list.velocity({
                rotateX: i
                , opacity: a
            }, {
                easing: [400, 25]
            })
        })
    }
}, draqenApp.emergingCircle = {
    $circleDots: $(".emerging-element--desktop .dot")
    , angleIncrement: null
    , placeDotsOnCircle: function () {
        var e = this
            , t = e.$circleDots.length
            , i = 0;
        e.angleIncrement = 360 / t;
        var a = function (t) {
            $(t).find("img").velocity({
                rotateZ: -1 * i * e.angleIncrement + "deg"
            }, 500)
        };
        for (i = 0; t > i; i++) e.$circleDots.eq(i).velocity({
            rotateZ: (i - 1) * e.angleIncrement + "deg"
            , opacity: 0
        }, 5), e.$circleDots.eq(i).find("img").velocity({
            rotateZ: -1 * i * e.angleIncrement + "deg"
        }, 500);
        for (i = 0; t > i; i++) e.$circleDots.eq(i).velocity({
            opacity: 1
            , rotateZ: i * e.angleIncrement + "deg"
        }, {
            duration: 800
            , easing: [200, 35]
            , delay: 150 * i
        })
    }
}, draqenApp.enableBodyScroll = function () {
    $("body").css({
        overflow: ""
    })
}, draqenApp.disableBodyScroll = function () {
    $("body").css({
        overflow: "hidden"
    })
}, draqenApp.openMobileNavigation = function () {
    draqenApp.$mobileNavigation.addClass("is--active"), draqenApp.disableBodyScroll(), draqenApp.siteOverlay.enable(), draqenApp.$mobileNavigation.css({
        visibility: "visible"
    }).velocity({
        scale: 1
        , opacity: 1
    }, {
        easing: [400, 30]
    })
}, draqenApp.closeMobileNavigation = function () {
    draqenApp.$mobileNavigation.removeClass("is--active"), draqenApp.enableBodyScroll(), draqenApp.siteOverlay.disable(), draqenApp.$mobileNavigation.css({
        visibility: ""
    }).velocity({
        scale: 0
        , opacity: 0
    }, {
        easing: [400, 40]
    })
}, jQuery(function ($) {
    "use strict";
    draqenApp._initialScrollHeight = $(document).scrollTop(), $.Velocity.defaults.easing = [.25, .21, .015, .995], new FastClick(document.body);
    var e = $("body")
        , t = $(".btn--dropdown");
    draqenApp.isIE9 && e.addClass("is--ie9"), draqenApp.isIE9 || ($("[data-sr]").css({
        visibility: "hidden"
    }), window.sr = new scrollReveal({
        reset: !0
        , vFactor: .45
        , mobile: false
    })), draqenApp.siteOverlay.registerEvents(), $("input").on("change", function () {
        var e = $(this)
            , t = "" !== e.val();
        e.toggleClass("has--content", t)
    }), $("textarea").on("change", function () {
        var e = $(this)
            , t = "" !== e.val();
        e.toggleClass("has--content", t)
    }), draqenApp.langSwitcher.initialize(), draqenApp.$btnOpenHeaderSearch = $('button[data-action="open-header-search"]'), draqenApp.$headerSearch = $(".site-header__search-form"), draqenApp.$headerSearch.velocity({
        rotateX: "-90deg"
        , opacity: 0
    }, {
        duration: 5
        , complete: function () {
            draqenApp.$headerSearch.addClass("is--set")
        }
    }), draqenApp.$btnOpenHeaderSearch.click(function () {
        var e = draqenApp.$headerSearch.hasClass("is--active")
            , t = e ? "-90deg" : 0
            , i = e ? 0 : 1;
        draqenApp.$headerSearch.toggleClass("is--active"), draqenApp.$headerSearch.velocity({
            rotateX: t
            , opacity: i
        }, {
            easing: [400, 25]
        })
    }), draqenApp.$utilityBar = $(".utility-bar"), draqenApp.$utilityBar.find("button").click(function () {
        var e = $(this)
            , t = e.closest(".utility-bar__item")
            , i = e.closest(".utility-bar")
            , a = t.hasClass("is--active")
            , r = i.find("[data-item]")
            , n = i.find('[data-item="' + e.data("action") + '"]')
            , s = i.find(".utility-bar__item.is--active");
        s.removeClass("is--active"), r.removeClass("is--active"), a || (t.addClass("is--active"), n.addClass("is--active"))
    }), t.find(".btn__dropdown").velocity("slideUp", {
        duration: 0
        , complete: function (e) {
            $(e).addClass("is--set")
        }
    }), t.click(function () {
        var e = $(this)
            , t = e.find(".btn__dropdown")
            , i = e.hasClass("is--active")
            , a = e.data("button-group")
            , r = "undefined" != typeof a
            , n = $('.btn--dropdown.is--active[data-button-group="' + a + '"]')
            , s = r && n.length > 0 ? 200 : 0;
        n.removeClass("is--active"), n.find(".btn__dropdown").velocity("slideUp", s), i || (t.velocity("slideDown", {
            delay: s
            , display: "block"
        }), e.addClass("is--active"))
    }), draqenApp.productSingleSwiper = {
        $el: $(".product--single__swiper")
        , swiper: null
        , initialize: function () {
            var e = this;
            e.swiper = new Swiper(".product--single__swiper .swiper-container", {
                preloadImages: !1
                , lazyLoading: !0
                , lazyLoadingInPrevNext: !0
                , pagination: ".product--single__swiper .bullets"
                , paginationClickable: !0
                , roundLengths: !0
            })
        }
    }, draqenApp.productSingleSwiper.initialize(), draqenApp.heroArrow = {
        $el: $(".hero-banner__arrow")
        , initialize: function () {
            var e = this;
            e.$el.velocity({
                translateY: "100%"
                , opacity: 0
            }, 5), setTimeout(function () {
                e.$el.velocity({
                    translateY: 0
                    , opacity: 1
                }, {
                    easing: [400, 25]
                    , duration: 800
                }), window.addEventListener("scroll", e.debounceArrowVisibility)
            }, 3e3)
        }
        , checkHeroArrow: function () {
            var e = this;
            $(document).scrollTop() > 200 && (e.$el.velocity({
                translateY: "100%"
                , opacity: 0
            }, {
                easing: [400, 25]
                , duration: 1200
            }), window.removeEventListener("scroll", e.debounceArrowVisibility))
        }
        , debounceArrowVisibility: debounce(function () {
            draqenApp.heroArrow.checkHeroArrow()
        }, 250)
    }, draqenApp.heroArrow.initialize(), draqenApp.parallax = {
        enabled: !1
        , pageHeight: $("body").outerHeight()
        , maxScrollTop: $("body").outerHeight() - $(window).outerHeight()
        , getScrollHeight: function () {
            return $(window).scrollTop()
        }
        , debounceWatchScroll: debounce(function () {
            var e = draqenApp.parallax.getScrollHeight();
            $(".parallax-element").each(function () {
                var t = $(this)
                    , i = t.data("overflow-pixels")
                    , a = e / draqenApp.parallax.maxScrollTop * i * 2 - i
                    , r = -1 * a;
                t.velocity({
                    translateY: r
                }, 2)
            })
        }, 15)
        , debounceWatchResize: debounce(function () {
            draqenApp.parallax.pageHeight = $("body").outerHeight(), draqenApp.parallax.maxScrollTop = $("body").outerHeight() - $(window).outerHeight()
        }, 100)
    }, draqenApp.parallax.enabled && (window.addEventListener("scroll", draqenApp.parallax.debounceWatchScroll), window.addEventListener("resize", draqenApp.parallax.debounceWatchResize)), draqenApp.emergingCircle.placeDotsOnCircle(), draqenApp.$btnOpenMobileNavigation = $('[data-action="open-mobile-navigation"]'), draqenApp.$btnCloseMobileNavigation = $('[data-action="close-mobile-navigation"]'), draqenApp.$btnOpenMobileNavSubmenu = $('[data-action="open-mobile-navigation-submenu"]'), draqenApp.$btnCloseMobileNavSubmenu = $('[data-action="close-mobile-navigation-submenu"]'), draqenApp.$mobileNavigation = $("#mobile-navigation"), draqenApp.$mobileNavigationOverlay = $(".site-navigation--mobile__level-1-overlay"), draqenApp.$mobileNavigation.velocity({
        scale: 0
        , opacity: 0
    }, 5), draqenApp.$btnOpenMobileNavigation.click(function (e) {
        draqenApp.openMobileNavigation()
    }), draqenApp.$btnCloseMobileNavigation.click(function () {
        draqenApp.closeMobileNavigation()
    }), draqenApp.closeMobileNavSubmenu = function () {
        var e = draqenApp.$mobileNavigation.find(".level-2-container.is--active");
        draqenApp.$mobileNavigationOverlay.removeClass("is--active"), e.velocity({
            translateX: 0
        }, {
            easing: [400, 30]
            , complete: function () {
                e.removeClass("is--active")
            }
        })
    }, draqenApp.$btnOpenMobileNavSubmenu.click(function () {
        var e = $(this)
            , t = e.siblings(".level-2-container");
        return t.addClass("is--active"), t.velocity({
            translateX: "-=260"
        }, {
            easing: [400, 30]
        }), draqenApp.$mobileNavigationOverlay.addClass("is--active"), !1
    }), draqenApp.$btnCloseMobileNavSubmenu.click(function () {
        draqenApp.closeMobileNavSubmenu()
    }), draqenApp.$mobileNavigationOverlay.click(function () {
        draqenApp.closeMobileNavSubmenu()
    }), $(".hero-banner__arrow").click(function () {
        var e = $(this)
            , t = e.closest("section");
        t.next("section").velocity("scroll", {
            offset: -50
        })
    }), draqenApp._isNavFixed = !1, draqenApp.$siteHeaderDesktop = $(".site-header--desktop"), draqenApp.$siteHeaderMobile = $(".site-header--mobile"), draqenApp.checkFixedNavigation = function () {
        $(document).scrollTop() > 200 && !draqenApp._isNavFixed && (window.matchMedia("(min-width: 1240px)").matches ? (draqenApp.$siteHeaderDesktop.velocity("stop").velocity({
            translateY: "-100%"
            , opacity: 0
        }, {
            complete: function () {
                e.addClass("is--nav-fixed"), draqenApp.$siteHeaderDesktop.velocity({
                    translateY: 0
                    , opacity: 1
                })
            }
        }), draqenApp._isNavFixed = !0) : (e.addClass("is--nav-fixed"), draqenApp._isNavFixed = !0)), $(document).scrollTop() <= 200 && draqenApp._isNavFixed && (window.matchMedia("(min-width: 1240px)").matches ? (draqenApp.$siteHeaderDesktop.velocity("stop").velocity({
            translateY: "-100%"
            , opacity: 0
        }, {
            complete: function () {
                e.removeClass("is--nav-fixed"), draqenApp.$siteHeaderDesktop.velocity({
                    translateY: 0
                    , opacity: 1
                })
            }
        }), draqenApp._isNavFixed = !1) : (e.removeClass("is--nav-fixed"), draqenApp._isNavFixed = !1))
    };
    var i = debounce(function () {
        draqenApp.checkFixedNavigation()
    }, 50);
    window.addEventListener("scroll", i), window.addEventListener("resize", i), $("html").hasClass("touchevents") && $("html").hasClass("no-pointerevents") && $(".dash__footer__grid .block--hoverable").click(function () {
        $(this).toggleClass("is--hover")
    }), $("html").hasClass("pointerevents") && $(".dash__footer__grid .block--hoverable").on("pointerdown", function () {
        $(this).toggleClass("is--hover")
    }), $(window).scroll(), $(window).resize()
});
var draqenApp = draqenApp || {};
! function ($, e) {
    "use strict";
    $.Velocity.defaults.easing = [.25, .21, .015, .995], e.dashExpander = {
        isAnimating: !1
        , $activeTarget: null
        , $el: $(".dash__block__expanders")
        , getMaxHeight: function () {
            var e = 0
                , t = this;
            return t.$el.find(".target").each(function () {
                var t = $(this)
                    , i = t.outerHeight();
                i > e && (e = i)
            }), e
        }
        , refreshTargetContainerHeight: function () {
            var t = e.dashExpander.getMaxHeight()
                , i = this;
            i.$el.find(".target-height-container").css({
                height: t
            })
        }
        , showTarget: function (e) {}
        , registerButtonClicks: function () {
            var e = this;
            e.$el.find("button").click(function (t) {
                if (e.isAnimating) return t.preventDefault(), !1;
                e.isAnimating = !0;
                var i = $(this)
                    , a = e.$el.find('.target[data-slug="' + i.data("target") + '"]')
                    , r = null !== e.$activeTarget
                    , n = e.$activeTarget
                    , s = r ? 300 : 0;
                return e.$el.find("button").removeClass("is--active"), r && n.find("a").velocity("transition.slideUpOut", {
                    duration: 200
                    , stagger: 50
                    , display: "inline-block"
                    , complete: function () {
                        n.velocity("slideUp", 200)
                    }
                }), a.is(e.$activeTarget) ? (e.$activeTarget = null, e.isAnimating = !1) : (setTimeout(function () {
                    a.velocity("slideDown", 200), a.find("a").velocity("transition.slideDownIn", {
                        stagger: 80
                        , drag: !0
                        , delay: 200
                        , duration: 150
                    })
                }, s), e.isAnimating = !1, e.$activeTarget = a, i.addClass("is--active")), !1
            })
        }
    }, $(document).ready(function () {
        e.dashExpander.refreshTargetContainerHeight(), e.dashExpander.$el.find(".target").velocity("slideUp", 50), e.dashExpander.registerButtonClicks();
        var t = debounce(function () {
            e.dashExpander.refreshTargetContainerHeight()
        }, 250);
        window.addEventListener("resize", t)
    })
}(jQuery, draqenApp);
var draqenApp = draqenApp || {};
! function ($, e) {
    "use strict";
    $.Velocity.defaults.easing = [.25, .21, .015, .995], e.solutionGrid = {
        $el: $(".solution-grid")
        , $lists: $(".solution-grid .solution-grid__list")
        , $items: $(".solution-grid .solution-grid__item")
        , isAnimating: !1
        , registerClicks: function () {
            var t = this;
            this.$items.click(function (t) {
                var i = $(this)
                    , a = i.find(".solution-grid__list").eq(0)
                    , r = $(t.target)
                    , n = i.hasClass("condensed")
                    , s = 0
                    , o = i.children("button")
                    , l = a.hasClass("is--active");
                if (console.log("$eventTarget", r), console.log("e", t), e.solutionGrid.isAnimating && n) return t.preventDefault(), !1;
                if (r === a || a.has(r).length > 0) return !0;
                if (e.solutionGrid.isAnimating = !0, n) {
                    var u = e.solutionGrid.$el.find(".solution-grid__list.is--active");
                    u.length > 0 && (u.removeClass("is--active").velocity("slideUp", {
                        duration: 200
                        , complete: function () {
                            l && (e.solutionGrid.isAnimating = !1)
                        }
                    }), u.siblings(".btn--toggle-solution-grid-list").toggleClass("is--active"), s = 250)
                }
                l && !n && (a.removeClass("is--active").velocity("slideUp", {
                    complete: function () {
                        e.solutionGrid.isAnimating = !1
                    }
                }), o.toggleClass("is--active")), l || (a.addClass("is--active").velocity("slideDown", {
                    delay: s
                    , complete: function () {
                        e.solutionGrid.isAnimating = !1
                    }
                }), o.toggleClass("is--active"))
            }), this.$el.find(".btn--open-next-list-level").click(function () {
                var e = $(this)
                    , t = e.hasClass("is--active")
                    , i = e.closest(".solution-grid__list").find(".btn--open-next-list-level.is--active")
                    , a = i.length > 0
                    , r = e.siblings("ul").eq(0)
                    , n = a ? 200 : 0;
                i.removeClass("is--active").siblings("ul").velocity("slideUp", n), t || (e.addClass("is--active"), r.velocity("slideDown", {
                    delay: n
                }))
            })
        }
        , initialize: function () {
            var e = this;
            e.$lists.velocity("slideUp", 0), e.$el.find(".level-1").children("ul").velocity("slideUp", 0)
        }
    }, $(document).ready(function () {
        if (e.solutionGrid.initialize(), e.solutionGrid.registerClicks(), e.solutionGrid.$items.velocity("transition.slideDownBigIn", {
                stagger: 100
                , delay: 500
                , duration: 400
                , display: "block"
                , complete: function (e) {
                    var t = $(e);
                    t.attr("style", "").addClass("is--set")
                }
            }), e.$openHashContainers = $('[data-action="open-hash"]'), e.$openHashContainers.length > 0 && window.location.hash) {
            var t = $(window.location.hash);
            t.click(), t.velocity("scroll", {
                duration: 1500
                , offset: -100
            })
        }
    })
}(jQuery, draqenApp);
var draqenApp = draqenApp || {};
! function ($, e) {
    "use strict";
    $.Velocity.defaults.easing = [.25, .21, .015, .995], e.servicesGrid = {
        $el: $(".services-grid")
        , $items: $(".services-grid__item")
        , initialize: function () {
            var e = this;
            e.$items.velocity("transition.slideDownBigIn", {
                stagger: 100
                , delay: 500
                , duration: 400
                , display: "block"
                , complete: function (e) {
                    var t = $(e);
                    t.attr("style", "").addClass("is--set")
                }
            })
        }
        , registerEvents: function () {
            var e = this;
            $("html").hasClass("touchevents") && $("html").hasClass("no-pointerevents") && e.$items.click(function () {
                $(this).toggleClass("is--hover")
            }), $("html").hasClass("pointerevents") && e.$items.on("pointerdown", function () {
                $(this).toggleClass("is--hover")
            })
        }
    }, $(document).ready(function () {
        e.servicesGrid.initialize(), e.servicesGrid.registerEvents()
    })
}(jQuery, draqenApp);
var draqenApp = draqenApp || {};
! function ($, e) {
    "use strict";
    $.Velocity.defaults.easing = [.25, .21, .015, .995], e.productGrid = {
        $el: $(".product-grid")
        , $items: $(".product-grid__item")
    }, $(document).ready(function () {
        e.productGrid.$items.velocity("transition.slideDownBigIn", {
            stagger: 100
            , delay: 500
            , duration: 400
            , display: "block"
            , complete: function (e) {
                var t = $(e);
                t.attr("style", "").addClass("is--set")
            }
        })
    })
}(jQuery, draqenApp);
var draqenApp = draqenApp || {};
! function ($, e) {
    "use strict";
    $.Velocity.defaults.easing = [.25, .21, .015, .995], e.footerContactForm = {
        $el: $(".footer__contact-block")
        , $indicatorContainer: $(".footer__contact-block .phase-indicator")
        , $letterIcon: $(".contact-us__icon--sent")
        , $letterIconLines: $(".contact-us__icon--sent .line")
        , currentPhase: 0
        , isIndicatorVisible: !1
        , setHeight: function (e) {
            var t = this
                , i = e.outerHeight();
            this.$el.velocity({
                height: i
            })
        }
        , refreshFormHeight: function () {
            var e = this
                , t = this.$el.find('[data-phase-order="' + this.currentPhase + '"]')
                , i = t.outerHeight();
            this.$el.velocity({
                height: i
            })
        }
        , nextPhase: function () {
            var e = this
                , t = this.$el.find('[data-phase-order="' + this.currentPhase + '"]')
                , i = this.$el.find('[data-phase-order="' + (this.currentPhase + 1) + '"]');
            e.setHeight(i), t.removeClass("is--active").velocity("transition.slideLeftBigOut", {
                duration: 100
            }), i.addClass("is--active").velocity("transition.slideRightBigIn", {
                delay: 100
                , duration: 100
                , complete: function () {
                    e.focusOnFirstFormItem(i)
                }
            }), e.currentPhase++, e.updateIndicators(), e.isIndicatorVisible || (e.$indicatorContainer.velocity("transition.slideUpIn", 200), e.isIndicatorVisible = !0)
        }
        , prevPhase: function () {
            var e = this
                , t = this.$el.find('[data-phase-order="' + this.currentPhase + '"]')
                , i = this.$el.find('[data-phase-order="' + (this.currentPhase - 1) + '"]');
            e.setHeight(i), t.removeClass("is--active").velocity("transition.slideRightBigOut", {
                duration: 100
            }), i.addClass("is--active").velocity("transition.slideLeftBigIn", {
                delay: 100
                , duration: 100
                , complete: function () {
                    e.focusOnFirstFormItem(i)
                }
            }), e.currentPhase--, e.updateIndicators()
        }
        , focusOnFirstFormItem: function (e) {
            e.find("input, textarea").eq(0).focus()
        }
        , initializeIndicators: function () {
            for (var e = this, t = e.$el.find("form .contact-us__phase").length, i = 0; t > i; i++) e.$indicatorContainer.append($('<span class="indicator" data-index="' + (i + 1) + '"></span>'));
            e.$indicatorContainer.velocity("transition.slideUpOut", 5)
        }
        , updateIndicators: function () {
            var e = this
                , t = e.$indicatorContainer.find(".indicator")
                , i = e.$el.find(".contact-us__phase.is--active")
                , a = i.data("phase-order");
            t.removeClass("is--active"), t.filter('[data-index="' + a + '"]').addClass("is--active")
        }
        , registerEvents: function () {
            var e = this;
            e.validator = $(".form--contact-block").parsley(), e.$el.find('[data-action="open-next-phase"]').click(function () {
                var t = $(this)
                    , i = "undefined" != typeof t.data("validate-group")
                    , a = t.data("validate-group")
                    , r = $(".contact-us__robot");
                r.length > 0 && r.velocity("fadeOut"), i ? (e.validator.validate(a), e.validator.isValid(a) && (e.nextPhase(), t.hasClass("btn--send") && e.animateSuccess())) : (e.nextPhase(), t.hasClass("btn--send") && e.animateSuccess())
            }), e.$el.find('[data-action="open-prev-phase"]').click(function () {
                e.prevPhase()
            })
        }
        , animateSuccess: function () {
            var e = this;
            e.$letterIconLines.each(function (e) {
                $(this).velocity({
                    translateX: ["-100%", [400, 10], "-300%"]
                    , scaleX: [3, 1]
                    , opacity: [0, "linear", 1]
                }, {
                    delay: 100 * e
                    , duration: 400
                })
            }), e.$letterIcon.velocity({
                translateX: [0, [700, 30], "-300%"]
                , opacity: [1, 0]
                , skewX: [0, [700, 30], "30deg"]
            }, {
                duration: 1200
            }), $(".contact-us__sent-message").eq(0).addClass("is--shown")
        }
        , resetLetter: function () {
            this.$letterIcon.find(".line").css(""), this.$letterIcon.css("")
        }
    }, $(document).ready(function () {
        if (e.footerContactForm.$el.length > 0) {
            e.footerContactForm.$el.find(".contact-us__phase").not(".initial-phase").velocity("transition.slideUpOut", 5), e.footerContactForm.initializeIndicators(), e.footerContactForm.registerEvents();
            var t = debounce(function () {
                e.footerContactForm.refreshFormHeight()
            }, 250);
            window.addEventListener("resize", t)
        }
    })
}(jQuery, draqenApp);
var draqenApp = draqenApp || {};
! function ($, e) {
    "use strict";
    $.Velocity.defaults.easing = [.25, .21, .015, .995], e.dashProductsSwiper = {
        progressBarInterval: 8e3
        , progressTimer: null
        , $el: $(".dash__products")
        , $progressContainer: $(".dash__products__progress")
        , $progressEl: $(".dash__products__progress .progress-bar")
        , swiper: null
        , runProgressOnce: function () {
            var e = this;
            e.$progressEl.velocity({
                translateX: [0, "-100%"]
            }, {
                duration: e.progressBarInterval
                , easing: "linear"
                , complete: function () {
                    e.swiper.isEnd ? e.swiper.slideTo(0) : e.swiper.slideNext()
                }
            })
        }
        , initialize: function () {
            var t = this;
            t.swiper = new Swiper(".dash__products .swiper-container", {
                preloadImages: !1
                , lazyLoading: !0
                , lazyLoadingInPrevNext: !0
                , pagination: ".dash__products__pagination .bullets"
                , paginationClickable: !0
                , roundLengths: !0
                , onSliderMove: function () {
                    e.dashProductsSwiper.stopTimer(), e.dashProductsSwiper.removeProgressBar()
                }
            }), $(".dash__products .bullets").on("click", "span", function () {
                t.stopTimer(), t.removeProgressBar()
            }), t.runProgressOnce(), t.progressTimer = setInterval(function () {
                t.runProgressOnce()
            }, t.progressBarInterval)
        }
        , stopTimer: function () {
            var e = this;
            clearInterval(e.progressTimer)
        }
        , removeProgressBar: function () {
            var e = this;
            e.$progressEl.velocity("stop"), e.$progressContainer.velocity({
                translateY: "101%"
                , opacity: 0
            }, {
                complete: function () {
                    e.$progressContainer.remove()
                }
            })
        }
    }, $(document).ready(function () {
        e.dashProductsSwiper.initialize()
    })
}(jQuery, draqenApp);
//# sourceMappingURL=./main.min.js.map