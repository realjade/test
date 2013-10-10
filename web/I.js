/* author: carl, date: Mon Jan 21 2013 23:03:35 GMT+0800 (CST) */
(function(f, h) {
    var j, o, p, x, q;
    function y(a) {
        a = a.replace(/([^:\/])\/+/g, "$1/");
        if ( - 1 === a.indexOf(".")) return a;
        for (var c = a.split("/"), b = [], d = 0, e, g = c.length; d < g; d++) e = c[d],
        ".." === e ? (0 === b.length && G.log("Invalid module path:" + a), b.pop()) : "." !== e && b.push(e);
        return b.join("/")
    }
    function k(a, c) {
        var b;
        E.test(a) ? a = c ? c.replace(F, "$1") + a: j + a: (b = H.exec(a)) ? "/" === b[0] && (a = p + a) : a = o + a;
        a = y(a);
        I.test(a) || (a += J);
        return a
    }
    function m(a, c) {
        c.call(h, a);
        if (a in l) {
            for (var b = l[a], d = 0, e = b.length; d < e; d++) b[d].call(h, a);
            delete l[a]
        }
        delete i[a];
        delete s[a]
    }
    function z(a, c) {
        var b = i[a];
        if (b.deps) {
            for (var d = !1,
            e = function() {
                if (!d) {
                    var e = A(b.deps);
                    e && (g[a] = b.wrap.apply(h, e), m(a, c), d = !0)
                }
            },
            r = 0, f = b.deps.length; r < f; r++) t(b.deps[r], e);
            e = null
        } else g[a] = b.wrap.apply(),
        m(a, c)
    }
    function A(a) {
        for (var c = [], b = 0, d = a.length; b < d; b++) {
            var e = a[b],
            f = g[e];
            if (e in g) c.push(f);
            else return ! 1
        }
        return c
    }
    function t(a, c) {
        a in g ? c.call(h, a) : a in s ? (l[a] = l[a] || [], l[a].push(c)) : (s[a] = !0, a in i ? z(a, c) : G.loadScript(k(a),
        function() {
            a in g ? m(a, c) : a in i ? z(a, c) : (G.log("Module: " + a + " is not defined!"), g[a] = h, m(a, c))
        }))
    }
    function u(a) {
        a = k(a);
        if (a in g) return g[a];
        var c = i[a];
        if (c) {
            var b = c.deps,
            d = [];
            if (b) for (var e = 0,
            f = b.length; e < f; e++) d.push(u(b[e]));
            g[a] = c.wrap.apply(h, d);
            delete i[a];
            return g[a]
        }
        G.log("Module " + a + " is not loaded!")
    }
    function K(a, c) {
        if (1 === a.length) t(k(a[0]),
        function(a) {
            c.call && c.call(h, g[a])
        });
        else {
            for (var b = 0,
            d = a.length,
            e = !1,
            f = function() {
                if (!e) {
                    var b = A(a);
                    b && (c.apply && c.apply(h, b), e = !0)
                }
            }; b < d; b++) a[b] = k(a[b]);
            for (b = 0; b < d; b++) t(a[b], f)
        }
    }
    function v(a, c) {
        a = "[object Array]" === B.call(a) ? a: [a];
        if (!c) {
            if (1 === a.length) return u(a[0]);
            for (var b = 0,
            d = a.length,
            e = []; b < d; b++) e.push(u(a[b]));
            return e
        }
        K(a, c)
    }
    if ("undefined" === typeof G) {
        f.G = {};
        var C = f.document,
        s = {},
        l = {},
        i = {},
        g = {};
        x = f.GJS_VERSION ? "?v" + f.GJS_VERSION: "";
        q = f.GJS_PRELOAD || [];
        j = void 0;
        o = void 0;
        p = void 0;
        var w = !1,
        D = !1,
        n = [],
        L = {
            complete: 1,
            loaded: 1,
            undefined: 1
        },
        B = Object.prototype.toString,
        H = /^(?:\/|https?:\/\/|file:\/\/\/?)/,
        E = /^\.{1,2}?\//,
        F = /(\/)[^\/]*$/,
        I = /\.js(?:(?:\?|#)[\w\W]*)?$/,
        J = ".js" + x;
        G.loadScript = function(a, c) {
            var b = C.createElement("script"),
            d = C.getElementsByTagName("head")[0];
            b.onload = b.onerror = b.onreadystatechange = function() {
                if (L[b.readyState]) {
                    c && c();
                    b.onload = b.onerror = b.onreadystatechange = null;
                    try {
                        if (b.clearAttributes) b.clearAttributes();
                        else for (var a in b) delete b[a]
                    } catch(f) {}
                    d.removeChild(b);
                    b = null
                }
            };
            b.async = !0;
            b.src = a;
            b.type = "text/javascript";
            d.insertBefore(b, d.firstChild)
        };
        G.def = function(a, c, b) {
            if (! (a in g || a in i)) {
                var d = b ? c: h,
                e,
                b = b || c,
                c = d,
                a = k(a);
                if ("[object Function]" !== B.call(b)) g[a] = b;
                else {
                    if (c) for (d = 0, e = c.length; d < e; d++) c[d] = k(c[d], a);
                    i[a] = {
                        name: a,
                        deps: c,
                        wrap: b
                    }
                }
            }
        };
        G.req = function(a, c) {
            if (D || !q.length) return v(a, c);
            n.push(function() {
                v(a, c)
            });
            w || (w = !0, v(q,
            function() {
                D = !0;
                w = !1;
                for (var a = 0,
                c = n.length; a < c; a++) n[a]();
                n = null
            }))
        };
        G.log = "undefined" !== typeof console && "undefined" !== typeof console.log ? console.log.apply ?
        function() {
            console.log.apply(console, arguments)
        }: console.log: function() {}; 
        (function() {
            if (f.GJS_URL) {
                var a = y(f.GJS_URL + "/");
                j = "/" === a.charAt(0) && "/" !== a.charAt(1) ? location.protocol + "//" + location.host + a: a
            } else a = document.getElementsByTagName("script"),
            a = a[a.length - 1],
            a = a.hasAttribute ? a.src: a.getAttribute("src", 4),
            j = a = a.replace(/\/[^\/]*$/, "") + "/";
            o = j + (f.GJS_LIB_URL || "lib/");
            var a = /^(file:\/\/.*)\/.*$/,
            c; (c = /^(https?:\/\/[^\/]*)\/?.*$/.exec(j)) || (c = a.exec(j)) ? p = c[1] : G.log("Can't get hostUrl!")
        })()
    }
})(window);