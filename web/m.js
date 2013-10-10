/*! Copyright 2012 Baidu Inc. All Rights Reserved. */
var ___shortName = "ShortNamespace"; 
(function() {
    var n = ___shortName;
    var j = window,
    i = 0,
    k = false,
    h = false;
    while ((j != window.top || j != j.parent) && i < 10) {
        k = true;
        try {
            j.parent.location.toString()
        } catch(l) {
            h = true;
            break
        }
        i++;
        j = j.parent
    }
    if (i >= 10) {
        h = true
    }
    if (!h && (top.location.href.indexOf("union.baidu.com") > 0 || top.location.href.indexOf("unionqa.baidu.com") > 0)) {
        h = true
    }
    var m = function(c, a, b) {
        c.baseName = n;
        c.isInIframe = a;
        c.isCrossDomain = b;
        c.needInitTop = a && !b;
        c.buildInObject = {
            "[object Function]": 1,
            "[object RegExp]": 1,
            "[object Date]": 1,
            "[object Error]": 1,
            "[object Window]": 1
        };
        c.clone = function(g) {
            var e = g,
            d, f;
            if (!g || g instanceof Number || g instanceof String || g instanceof Boolean) {
                return e
            } else {
                if (g instanceof Array) {
                    e = [];
                    var p = 0;
                    for (d = 0, f = g.length; d < f; d++) {
                        e[p++] = this.clone(g[d])
                    }
                } else {
                    if ("object" === typeof g) {
                        if (this.buildInObject[Object.prototype.toString.call(g)]) {
                            return e
                        }
                        e = {};
                        for (d in g) {
                            if (g.hasOwnProperty(d)) {
                                e[d] = this.clone(g[d])
                            }
                        }
                    }
                }
            }
            return e
        };
        c.create = function(d, g) {
            var e = Array.prototype.slice.call(arguments, 0);
            e.shift();
            var r = function(o) {
                this.initialize = this.initialize ||
                function() {};
                this.initializeDOM = this.initializeDOM ||
                function() {};
                this.initializeEvent = this.initializeEvent ||
                function() {};
                this.initialize.apply(this, o);
                this.initializeDOM.apply(this, o);
                this.initializeEvent.apply(this, o)
            };
            r.prototype = d;
            var f = new r(e);
            for (var q in d) {
                if (f[q] && typeof f[q] === "object" && f[q].modifier && f[q].modifier.indexOf("dynamic") > -1) {
                    f[q] = this.clone(f[q])
                }
            }
            f.instances = null;
            d.instances = d.instances || [];
            d.instances.push(f);
            return f
        };
        c.registerMethod = function(g, w) {
            var f = {};
            var v = {};
            var x, e, d;
            for (e in w) {
                x = w[e];
                if (!e || !x) {
                    continue
                }
                if (typeof x === "object" && x.modifier && x.modifier === "dynamic") {
                    this.registerMethod(g[e], x)
                } else {
                    if (typeof x === "function") {
                        f[e] = x
                    } else {
                        v[e] = x
                    }
                }
            }
            for (e in f) {
                x = f[e];
                if (e && x) {
                    g[e] = x
                }
            }
            if (g.instances && g.instances.length && g.instances.length > 0) {
                for (var u = 0,
                t = g.instances.length; u < t; u++) {
                    d = g.instances[u];
                    this.registerMethod(d, w)
                }
            }
        };
        c.registerObj = function(d, g) {
            var e = Array.prototype.slice.call(arguments, 0);
            e.shift();
            var p = function(o) {
                this.register = this.register ||
                function() {};
                this.register.apply(this, o)
            };
            p.prototype = d;
            p.prototype.instances = null;
            var f = new p(e);
            return f
        };
        c.registerNamespaceByWin = function(v, g) {
            var g = v.win = g || window;
            var w = v.fullName.replace("$baseName", this.baseName);
            var z = w.split(".");
            var f = z.length;
            var y = g;
            var d;
            for (var u = 0; u < f - 1; u++) {
                var x = z[u];
                if (y == g) {
                    y[x] = g[x] = g[x] || {};
                    d = x;
                    v.baseName = d
                } else {
                    y[x] = y[x] || {}
                }
                y = y[x]
            }
            var e = y[z[f - 1]] || {};
            if (e.fullName && e.version) {
                this.registerMethod(e, v)
            } else {
                e = this.registerObj(v);
                e.instances = null;
                y[z[f - 1]] = e
            }
        };
        c.registerNamespace = function(d) {
            if (!d || !d.fullName || !d.version) {
                return
            }
            this.registerNamespaceByWin(d, window);
            if (this.needInitTop) {
                this.registerNamespaceByWin(d, window.top)
            }
        };
        c.registerClass = c.registerNamespace;
        c.using = function(d, g) {
            var f;
            if (!g && this.isInIframe && !this.isCrossDomain && top && typeof top === "object" && top.document && "setInterval" in top) {
                g = top
            } else {
                g = g || window
            }
            d = d.replace("$baseName", this.baseName);
            var e = d.split(".");
            f = g[e[0]];
            for (var r = 1,
            q = e.length; r < q; r++) {
                if (f && f[e[r]]) {
                    f = f[e[r]]
                } else {
                    f = null
                }
            }
            return f
        }
    };
    window[n] = window[n] || {};
    m(window[n], k, h);
    if (k && !h) {
        window.top[n] = window.top[n] || {};
        m(window.top[n], k, h)
    }
})(); (function(c) {
    var d = {
        fullName: "$baseName.Utility",
        version: "1.0.0",
        register: function() {
            this.browser = this.browser || {};
            if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
                this.browser.ie = document.documentMode || +RegExp["\x241"]
            }
            if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) {
                this.browser.opera = +RegExp["\x241"]
            }
            if (/firefox\/(\d+\.\d)/i.test(navigator.userAgent)) {
                this.browser.firefox = +RegExp["\x241"]
            }
            if (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent)) {
                this.browser.safari = +(RegExp["\x241"] || RegExp["\x242"])
            }
            if (/chrome\/(\d+\.\d)/i.test(navigator.userAgent)) {
                this.browser.chrome = +RegExp["\x241"]
            }
            try {
                if (/(\d+\.\d)/.test(window.external.max_version)) {
                    this.browser.maxthon = +RegExp["\x241"]
                }
            } catch(a) {}
            this.browser.isWebkit = /webkit/i.test(navigator.userAgent);
            this.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
            this.browser.isStrict = document.compatMode == "CSS1Compat"
        },
        browser: {},
        isWindow: function(a) {
            var f = false;
            try {
                if (a && typeof a === "object" && a.document && "setInterval" in a) {
                    f = true
                }
            } catch(b) {
                f = false
            }
            return f
        },
        isInIframe: function(a) {
            a = a || window;
            return a != window.top && a != a.parent
        },
        isInCrossDomainIframe: function(a, i) {
            var j = false;
            a = a || window;
            i = i || window.top;
            var b = 0;
            if (!this.isWindow(i) || !this.isWindow(i.parent)) {
                j = true
            } else {
                while ((a != i) && b < 10) {
                    b++;
                    if (this.isWindow(a) && this.isWindow(a.parent)) {
                        try {
                            a.parent.location.toString()
                        } catch(h) {
                            j = true;
                            break
                        }
                    } else {
                        j = true;
                        break
                    }
                    a = a.parent
                }
            }
            if (b >= 10) {
                j = true
            }
            return j
        },
        g: function(a, b) {
            b = b || window;
            if ("string" === typeof a || a instanceof String) {
                return b.document.getElementById(a)
            } else {
                if (a && a.nodeName && (a.nodeType == 1 || a.nodeType == 9)) {
                    return a
                }
            }
            return a
        },
        sendRequestViaImage: function(g, a) {
            var h = new Image();
            var b = "cpro_log_" + Math.floor(Math.random() * 2147483648).toString(36);
            a = a || window;
            a[b] = h;
            h.onload = h.onerror = h.onabort = function() {
                h.onload = h.onerror = h.onabort = null;
                a[b] = null;
                h = null
            };
            h.src = g
        },
        proxy: function(h, i, j) {
            var a = h;
            var b = i;
            return function() {
                if (j && j.length) {
                    return a.apply(b || {},
                    j)
                } else {
                    return a.apply(b || {},
                    arguments)
                }
            }
        },
        getClientWidth: function(a) {
            try {
                a = a || window;
                if (a.document.compatMode === "BackCompat") {
                    return a.document.body.clientWidth
                } else {
                    return a.document.documentElement.clientWidth
                }
            } catch(b) {
                return 0
            }
        },
        getClientHeight: function(a) {
            try {
                a = a || window;
                if (a.document.compatMode === "BackCompat") {
                    return a.document.body.clientHeight
                } else {
                    return a.document.documentElement.clientHeight
                }
            } catch(b) {
                return 0
            }
        },
        escapeToEncode: function(a) {
            var b = a || "";
            if (b) {
                b = b.replace(/%u[\d|\w]{4}/g,
                function(f) {
                    return encodeURIComponent(unescape(f))
                })
            }
            return b
        },
        noop: function() {}
    };
    c.registerNamespace(d)
})(window[___shortName]); (function(d) {
    var c = {
        fullName: "$baseName.BusinessLogic",
        version: "1.0.0",
        register: function() {
            this.G = d.using("$baseName", this.win);
            this.U = d.using("$baseName.Utility", this.win)
        },
        randomArray: [],
        clientTree: {},
        displayCounter: 1,
        displayTypeCounter: {},
        adsArray: [],
        adsWrapStore: {},
        winFocused: true,
        cproServiceUrl: "http://cpro.baidu.com/cpro/ui/uijs.php",
        iframeIdPrefix: "cproIframe",
        isAsyn: false,
        currentWindowOnUnloadHandler: null,
        noop: function() {}
    };
    d.registerNamespace(c)
})(window[___shortName]); (function(c) {
    var d = {
        fullName: "$baseName.BusinessLogic.Distribute",
        version: "1.0.0",
        register: function() {
            this.G = c.using("$baseName", this.win);
            this.U = c.using("$baseName.Utility", this.win)
        },
        status: {},
        viewtime: 100,
        viewtimeIE: 100,
        eclickExp: 4,
        eclickNew: 50,
        floatLu: {
            percent: 10,
            displayType: "float",
            displayWidth: "120",
            displayHeight: "270"
        },
        floatLuShow: {
            percent: 50,
            displayType: "float",
            displayWidth: "120",
            displayHeight: "270"
        },
        dispatch: function(a, j) {
            if (this.U.isInCrossDomainIframe()) {
                return false
            }
            if (this.status[a + "Dispatched"]) {
                return this.status[a]
            }
            this.status[a] = false;
            this.status[a + "Dispatched"] = true;
            var h = 0;
            if ((typeof this[a]).toLowerCase() === "object") {
                var i = this[a];
                h = i.percent;
                if (i.displayType) {
                    if (!j.displayType || i.displayType !== j.displayType) {
                        return false
                    }
                }
                if (i.displayWidth) {
                    if (!j.displayWidth || i.displayWidth !== j.displayWidth) {
                        return false
                    }
                }
                if (i.displayHeight) {
                    if (!j.displayHeight || i.displayHeight !== j.displayHeight) {
                        return false
                    }
                }
            } else {
                if ((typeof this[a]).toLowerCase() === "number") {
                    h = this[a]
                }
            }
            var b = parseInt(Math.random() * 100);
            if (h && b < h) {
                this.status[a] = true
            }
            return this.status[a]
        }
    };
    c.registerClass(d)
})(window[___shortName]); (function(c) {
    var d = {
        fullName: "$baseName.BusinessLogic.Param",
        version: "1.0.0",
        register: function() {
            this.G = c.using("$baseName", this.win);
            this.U = c.using("$baseName.Utility", this.win);
            this.BL = c.using("$baseName.BusinessLogic", this.win)
        },
        initialize: function(a) {
            this.currentWindow = a.currentWindow;
            this.doc = this.win.document;
            this.nav = this.win.navigator;
            this.scr = this.win.screen;
            this.displayType = a.displayType || "inlay";
            this.startTime = (new Date());
            this.BL.pnTypeArray = this.BL.pnTypeArray || [];
            this.BL.pnTypeArray[this.displayType] = this.BL.pnTypeArray[this.displayType] || [];
            this.timeStamp = a.timeStamp || (new Date()).getTime()
        },
        getSlot2UIMapping: function(a) {
            var b = {};
            var f;
            for (f in a) {
                if (f && a[f] && a[f].slotParamName) {
                    b[a[f].slotParamName] = f
                }
            }
            return b
        },
        getCust2UIMapping: function(a) {
            var b = {};
            var f;
            for (f in a) {
                if (f && a[f] && a[f].custParamName) {
                    b[a[f].custParamName] = f
                }
            }
            return b
        },
        mergeSlot2UI: function(b, h, i) {
            if (!b || !h || !i) {
                return null
            }
            var j, a;
            for (a in h) {
                if (a && h[a] && h.hasOwnProperty(a)) {
                    j = i[a];
                    b.set(j, h[a])
                }
            }
            return b
        },
        serialize: function(b) {
            var j = [];
            var k, l;
            for (k in b) {
                if (k && b[k] && (typeof b[k] === "object") && b[k].isUIParam && b[k].isUIParam[b.displayType]) {
                    if (k === "pn" && !b.get(k)) {
                        continue
                    }
                    l = b.get(k);
                    if (l == null) {
                        continue
                    }
                    if (b.displayType == "ui" && l == "baiduCADS") {
                        continue
                    }
                    if (b[k].encode || b.displayType == "ui") {
                        l = encodeURIComponent(l)
                    }
                    if (b[k].limit) {
                        l = l.substr(0, b[k].limit)
                    }
                    j.push(k + "=" + l)
                }
            }
            if (b.get("tn") === "baiduTlinkInlay") {
                var i = this.BL.getLinkUnitMaxCount(b);
                if (b.get("adn") > i.VerticalCount * i.HorizontalCount) {
                    j.push("hn=" + i.HorizontalCount);
                    j.push("wn=" + i.VerticalCount)
                } else {
                    if (parseInt(b.get("adn")) <= i.VerticalCount) {
                        j.push("hn=" + 1);
                        j.push("wn=" + parseInt(b.get("adn")))
                    } else {
                        var a = Math.ceil(parseInt(b.get("adn")) / i.VerticalCount);
                        j.push("hn=" + a);
                        j.push("wn=" + i.VerticalCount)
                    }
                }
            }
            return j.join("&")
        },
        snap: function(a) {
            var b = {};
            var g, h;
            for (g in a) {
                if (g && a[g] && (typeof a[g] === "object") && a[g].defaultValue) {
                    h = a.get(g);
                    if (h == null) {
                        continue
                    }
                    if (a[g].encode || a.displayType == "ui") {
                        h = encodeURIComponent(h)
                    }
                    b[g] = h
                }
            }
            return b
        },
        get: function(a) {
            var f;
            if (!this[a]) {
                return f
            }
            if (this[a].get && this[a].get !== "default") {
                var b = Array.prototype.slice.call(arguments, 0);
                b.shift();
                if (!this[a]._init) {
                    this[a]._value = this[a].defaultValue[this.displayType]
                }
                f = this.U.proxy(this[a].get, this, b)()
            } else {
                if (!this[a]._init) {
                    f = this[a].defaultValue[this.displayType]
                } else {
                    f = this[a]._value
                }
            }
            return f
        },
        set: function(b, a) {
            var h = false;
            if (this[b].set && this[b].set !== "default") {
                var g = Array.prototype.slice.call(arguments, 0);
                g.shift();
                h = this.U.proxy(this[b].set, this, g)()
            } else {
                this[b]._value = a;
                this[b]._init = true;
                h = true
            }
            return h
        },
        k: {
            slotParamName: "k",
            custParamName: "k",
            modifier: "dynamic",
            defaultValue: {
                inlay: "",
                "float": "",
                custInlay: ""
            },
            encode: false,
            isUIParam: {
                inlay: false,
                "float": false,
                ui: true,
                post: false,
                custInlay: false,
                captcha: false
            },
            get: "default",
            set: "default"
        },
        cf: {
            slotParamName: "cf",
            custParamName: "cf",
            modifier: "dynamic",
            defaultValue: {
                inlay: "",
                "float": "",
                custInlay: ""
            },
            encode: false,
            isUIParam: {
                inlay: false,
                "float": false,
                ui: true,
                post: false,
                custInlay: false,
                captcha: false
            },
            get: "default",
            set: "default"
        },
        tp2jk: {
            slotParamName: "tp2jk",
            custParamName: "tp2jk",
            modifier: "dynamic",
            defaultValue: {
                inlay: "",
                "float": "",
                custInlay: ""
            },
            encode: false,
            isUIParam: {
                inlay: false,
                "float": false,
                ui: true,
                post: false,
                custInlay: false,
                captcha: false
            },
            get: "default",
            set: "default"
        },
        rs: {
            slotParamName: "cpro_rs",
            custParamName: "rs",
            modifier: "dynamic",
            defaultValue: {
                inlay: 0,
                "float": 0,
                ui: 0,
                post: 0,
                custInlay: 0,
                captcha: 0
            },
            encode: false,
            isUIParam: {
                inlay: true,
                "float": true,
                ui: true,
                post: false,
                custInlay: false,
                captcha: false
            },
            get: "default",
            set: "default"
        },
        fv: {
            slotParamName: "",
            custParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "0",
                "float": "0",
                ui: "",
                post: "",
                custInlay: "0",
                captcha: "0",
                pad: "0"
            },
            encode: true,
            isUIParam: {
                inlay: true,
                "float": true,
                ui: true,
                post: true,
                custInlay: true,
                captcha: true,
                pad: true
            },
            get: function() {
                var j = "ShockwaveFlash.ShockwaveFlash",
                b = this.nav,
                i, a;
                if (this.nav.plugins && b.mimeTypes.length) {
                    i = b.plugins["Shockwave Flash"];
                    if (i && i.description) {
                        return i.description.replace(/[^\d\.]/g, "").split(".")[0]
                    }
                } else {
                    if (this.U.browser.ie) {
                        a = ActiveXObject;
                        try {
                            i = new a(j + ".7")
                        } catch(e) {
                            try {
                                i = new a(j + ".6");
                                i.AllowScriptAccess = "always";
                                return 6
                            } catch(e) {}
                            try {
                                i = new a(j)
                            } catch(e) {}
                        }
                        if (i != null) {
                            try {
                                return i.GetVariable("$version").split(" ")[1].split(",")[0]
                            } catch(e) {}
                        }
                    }
                }
                return 0
            },
            set: "default"
        },
        cn: {
            slotParamName: "",
            custParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "",
                "float": "",
                ui: "",
                post: "",
                custInlay: "",
                captcha: "",
                pad: ""
            },
            encode: false,
            isUIParam: {
                inlay: true,
                "float": true,
                ui: true,
                post: true,
                custInlay: true,
                captcha: true,
                pad: true
            },
            get: function() {
                if (!this["n"] || !this["n"].get) {
                    return 1
                }
                var f = 0;
                var b = this.get("n");
                var a = this.get("ch") || "0";
                if (b) {
                    this.BL.clientTree = this.BL.clientTree || {};
                    if (!this.BL.clientTree[b]) {
                        f += 1;
                        if (a && a !== "0") {
                            f += 2
                        }
                        return f
                    }
                    if (a && a !== "0" && this.BL.clientTree[b] && (!this.BL.clientTree[b][a])) {
                        f += 2
                    }
                }
                return f
            },
            set: function() {
                var b = this.get("n");
                var a = this.get("ch") || "0";
                if (b) {
                    this.BL.clientTree = this.BL.clientTree || {};
                    if (!this.BL.clientTree[b]) {
                        this.BL.clientTree[b] = {}
                    }
                    if (a && a !== "0" && (!this.BL.clientTree[b][a])) {
                        this.BL.clientTree[b][a] = true
                    }
                }
                return true
            }
        },
        "if": {
            slotParamName: "",
            custParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "0",
                "float": "0",
                ui: "0",
                post: "0",
                custInlay: "0",
                captcha: "0",
                pad: "0"
            },
            encode: false,
            isUIParam: {
                inlay: true,
                "float": true,
                ui: true,
                post: true,
                custInlay: true,
                captcha: true,
                pad: true
            },
            get: function() {
                var k = 0;
                var b = this.currentWindow;
                if (this.U.isInIframe(b)) {
                    k += 1
                }
                if (this.U.isInCrossDomainIframe(b, b.top)) {
                    k += 2
                }
                if (!this["rsi0"] || !this["rsi0"].get || !this["rsi1"] || !this["rsi1"].get) {
                    return k
                }
                var l = this.get("rsi0");
                var i = this.get("rsi1");
                var j = this.U.getClientWidth(this.currentWindow);
                var a = this.U.getClientHeight(this.currentWindow);
                if (j < 40 || a < 10) {
                    k += 4
                } else {
                    if (j < l || a < i) {
                        k += 8
                    }
                }
                if ((j >= 2 * l) || (a >= 2 * i)) {
                    k += 16
                }
                return k
            },
            set: "default"
        },
        padword: {
            slotParamName: "",
            custParamName: "",
            modifier: "dynamic",
            limit: 700,
            defaultValue: {
                inlay: "",
                "float": "",
                ui: "",
                post: "",
                custInlay: "",
                captcha: "",
                pad: null
            },
            encode: true,
            isUIParam: {
                inlay: false,
                "float": false,
                ui: false,
                post: false,
                custInlay: false,
                captcha: false,
                pad: true
            },
            get: function() {
                var t = this.currentWindow;
                var a, r = 10,
                z = 0;
                var v, q;
                try {
                    v = this.get("rsi0") || 0;
                    q = this.get("rsi1") || 0
                } catch(s) {
                    v = 200,
                    q = 60
                }
                a = t.document.location.href;
                if (this.U.isInIframe(t)) {
                    var y, w, x;
                    for (z = 0; z < r; z++) {
                        if (!this.U.isInCrossDomainIframe(t, t.parent)) {
                            y = this.U.getClientWidth(t);
                            w = this.U.getClientHeight(t);
                            x = t.document.location.href;
                            t = t.parent;
                            if (v > 0 && q > 0 && y > 2 * v && w > 2 * q) {
                                a = x;
                                break
                            }
                            if (!this.U.isInIframe(t, t.parent)) {
                                a = t.location.href;
                                break
                            }
                        } else {
                            a = t.document.referrer || t.document.location.href;
                            break
                        }
                    }
                    if (z >= 10) {
                        a = t.document.referrer || t.document.location.href
                    }
                }
                if (a.search(/cpro.baidu.com/i) != -1 && a.search(/t=tpclicked/i) != -1) {
                    var b = a.indexOf("?");
                    var a = a.substring(b + 1);
                    var i = a.split("&");
                    for (var u = 0; u < i.length; u++) {
                        if (i[u].search(/^u=/i) != -1) {
                            a = i[u].replace(/^u=/i, "");
                            break
                        }
                    }
                }
                if (!this.get("pc")) {
                    a = ""
                }
                return a
            },
            set: "default"
        },
        word: {
            slotParamName: "",
            custParamName: "",
            modifier: "dynamic",
            limit: 700,
            defaultValue: {
                inlay: "",
                "float": "",
                ui: "",
                post: "",
                custInlay: "",
                captcha: "",
                pad: ""
            },
            encode: true,
            isUIParam: {
                inlay: true,
                "float": true,
                ui: true,
                post: true,
                custInlay: true,
                captcha: true,
                pad: true
            },
            get: function() {
                var t = this.currentWindow;
                var a, r = 10,
                z = 0;
                var v, q;
                try {
                    v = this.get("rsi0") || 0;
                    q = this.get("rsi1") || 0
                } catch(s) {
                    v = 200,
                    q = 60
                }
                a = t.document.location.href;
                if (this.U.isInIframe(t)) {
                    var y, w, x;
                    for (z = 0; z < r; z++) {
                        if (!this.U.isInCrossDomainIframe(t, t.parent)) {
                            y = this.U.getClientWidth(t);
                            w = this.U.getClientHeight(t);
                            x = t.document.location.href;
                            t = t.parent;
                            if (v > 0 && q > 0 && y > 2 * v && w > 2 * q) {
                                a = x;
                                break
                            }
                            if (!this.U.isInIframe(t, t.parent)) {
                                a = t.location.href;
                                break
                            }
                        } else {
                            a = t.document.referrer || t.document.location.href;
                            break
                        }
                    }
                    if (z >= 10) {
                        a = t.document.referrer || t.document.location.href
                    }
                }
                if (a.search(/cpro.baidu.com/i) != -1 && a.search(/t=tpclicked/i) != -1) {
                    var b = a.indexOf("?");
                    var a = a.substring(b + 1);
                    var i = a.split("&");
                    for (var u = 0; u < i.length; u++) {
                        if (i[u].search(/^u=/i) != -1) {
                            a = i[u].replace(/^u=/i, "");
                            break
                        }
                    }
                }
                if (this.get("n") == "92068003_tp_cpr") {
                    a = "baidutest.imanhua.com"
                } else {
                    if (this.get("n") == "76013016_tp_cpr") {
                        a = "baidutest.52tian.net"
                    }
                }
                return a
            },
            set: "default"
        },
        refer: {
            slotParamName: "",
            custParamName: "",
            modifier: "dynamic",
            limit: 700,
            defaultValue: {
                inlay: "",
                "float": "",
                ui: "",
                post: "",
                custInlay: "",
                captcha: "",
                pad: ""
            },
            encode: true,
            isUIParam: {
                inlay: true,
                "float": true,
                ui: true,
                post: true,
                custInlay: true,
                captcha: true,
                pad: true
            },
            get: function() {
                var b;
                try {
                    b = this.win.opener ? this.win.opener.document.location.href: this.doc.referrer
                } catch(a) {
                    b = this.doc.referrer
                }
                return this.U.escapeToEncode(b)
            },
            set: "default"
        },
        ready: {
            slotParamName: "",
            custParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "",
                "float": "",
                ui: "",
                post: "",
                custInlay: "",
                captcha: ""
            },
            encode: true,
            isUIParam: {
                inlay: true,
                "float": true,
                ui: true,
                post: true,
                custInlay: true,
                captcha: true
            },
            get: function() {
                var a = {
                    uninitialized: 0,
                    loading: 1,
                    loaded: 2,
                    interactive: 3,
                    complete: 4
                };
                try {
                    return a[this.doc.readyState]
                } catch(b) {
                    return 5
                }
            },
            set: "default"
        },
        jn: {
            slotParamName: "",
            custParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "3",
                "float": "3",
                ui: "3",
                post: "3",
                custInlay: "3",
                captcha: "3",
                pad: "3"
            },
            encode: false,
            isUIParam: {
                inlay: true,
                "float": true,
                ui: true,
                post: true,
                custInlay: true,
                captcha: true,
                pad: true
            },
            get: function() {
                return 3
            },
            set: "default"
        },
        js: {
            slotParamName: "",
            custParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "c",
                "float": "f",
                ui: "ui",
                post: "post",
                custInlay: "custInlay",
                captcha: "y"
            },
            encode: false,
            isUIParam: {
                inlay: false,
                "float": false,
                ui: true,
                post: true,
                custInlay: true,
                captcha: true
            },
            get: "default",
            set: "default"
        },
        lmt: {
            slotParamName: "",
            custParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "",
                "float": "",
                ui: "",
                post: "",
                custInlay: "",
                captcha: "",
                pad: ""
            },
            encode: false,
            isUIParam: {
                inlay: true,
                "float": true,
                ui: true,
                post: true,
                custInlay: true,
                captcha: true,
                pad: true
            },
            get: function() {
                return Date.parse(this.doc.lastModified) / 1000
            },
            set: "default"
        },
        csp: {
            slotParamName: "",
            custParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "",
                "float": "",
                ui: "",
                post: "",
                custInlay: "",
                captcha: "",
                pad: ""
            },
            encode: false,
            isUIParam: {
                inlay: true,
                "float": true,
                ui: true,
                post: true,
                custInlay: true,
                captcha: true,
                pad: true
            },
            get: function() {
                return this.scr.width + "," + this.scr.height
            },
            set: "default"
        },
        csn: {
            slotParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "",
                "float": "",
                custInlay: "",
                captcha: ""
            },
            encode: false,
            isUIParam: {
                inlay: true,
                "float": true,
                custInlay: true,
                captcha: true
            },
            get: function() {
                return this.scr.availWidth + "," + this.scr.availHeight
            },
            set: "default"
        },
        ccd: {
            slotParamName: "",
            custParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "",
                "float": "",
                ui: "",
                post: "",
                custInlay: "",
                captcha: "",
                pad: ""
            },
            encode: false,
            isUIParam: {
                inlay: true,
                "float": true,
                ui: true,
                post: true,
                custInlay: true,
                captcha: true,
                pad: true
            },
            get: function() {
                return this.scr.colorDepth || 0
            },
            set: "default"
        },
        chi: {
            slotParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "",
                "float": "",
                custInlay: "",
                captcha: "",
                pad: ""
            },
            encode: false,
            isUIParam: {
                inlay: true,
                "float": true,
                custInlay: true,
                captcha: true,
                pad: true
            },
            get: function() {
                return this.win.history.length || 0
            },
            set: "default"
        },
        cja: {
            slotParamName: "",
            custParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "",
                "float": "",
                ui: "",
                post: "",
                custInlay: "",
                captcha: "",
                pad: ""
            },
            encode: false,
            isUIParam: {
                inlay: true,
                "float": true,
                ui: true,
                post: true,
                custInlay: true,
                captcha: true,
                pad: true
            },
            get: function() {
                return this.nav.javaEnabled().toString()
            },
            set: "default"
        },
        cpl: {
            slotParamName: "",
            custParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "",
                "float": "",
                ui: "",
                post: "",
                custInlay: "",
                captcha: "",
                pad: ""
            },
            encode: false,
            isUIParam: {
                inlay: true,
                "float": true,
                ui: true,
                post: true,
                custInlay: true,
                captcha: true,
                pad: true
            },
            get: function() {
                return this.nav.plugins.length || 0
            },
            set: "default"
        },
        cmi: {
            slotParamName: "",
            custParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "",
                "float": "",
                ui: "",
                post: "",
                custInlay: "",
                captcha: "",
                pad: ""
            },
            encode: false,
            isUIParam: {
                inlay: true,
                "float": true,
                ui: true,
                post: true,
                custInlay: true,
                captcha: true,
                pad: true
            },
            get: function() {
                return this.nav.mimeTypes.length || 0
            },
            set: "default"
        },
        cce: {
            slotParamName: "",
            custParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "",
                "float": "",
                ui: "",
                post: "",
                custInlay: "",
                captcha: "",
                pad: ""
            },
            encode: false,
            isUIParam: {
                inlay: true,
                "float": true,
                ui: true,
                post: true,
                custInlay: true,
                captcha: true,
                pad: true
            },
            get: function() {
                return this.nav.cookieEnabled || 0
            },
            set: "default"
        },
        csl: {
            uuserApiName: "",
            custParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "",
                "float": "",
                ui: "",
                post: "",
                custInlay: "",
                captcha: "",
                pad: ""
            },
            encode: false,
            isUIParam: {
                inlay: true,
                "float": true,
                ui: true,
                post: true,
                custInlay: true,
                captcha: true,
                pad: true
            },
            get: function() {
                return encodeURIComponent(this.nav.language || this.nav.browserLanguage || this.nav.systemLanguage).replace(/[^a-zA-Z0-9\-]/g, "")
            },
            set: "default"
        },
        did: {
            uuserApiName: "",
            custParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "1",
                "float": "1",
                ui: "1",
                post: "1",
                custInlay: "1",
                captcha: "1",
                pad: "1"
            },
            encode: false,
            isUIParam: {
                inlay: true,
                "float": true,
                ui: true,
                post: true,
                custInlay: true,
                captcha: true,
                pad: true
            },
            get: function() {
                this.win.__bdcpro__displayTypeCounter = this.win.__bdcpro__displayTypeCounter || {};
                return this.win.__bdcpro__displayTypeCounter.total || 1
            },
            set: function() {
                this.win.__bdcpro__displayTypeCounter.total = this.win.__bdcpro__displayTypeCounter.total || 1;
                this.win.__bdcpro__displayTypeCounter.total++;
                return true
            }
        },
        rt: {
            slotParamName: "",
            custParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "",
                "float": "",
                ui: "",
                post: "",
                custInlay: "",
                captcha: "",
                pad: ""
            },
            encode: false,
            isUIParam: {
                inlay: true,
                "float": true,
                ui: true,
                post: true,
                custInlay: true,
                captcha: true,
                pad: true
            },
            get: function() {
                var a = 0;
                if (this.startTime) {
                    a = (new Date()).getTime() - this.startTime.getTime()
                }
                return a
            },
            set: "default"
        },
        dt: {
            slotParamName: "",
            custParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "",
                "float": "",
                ui: "",
                post: "",
                custInlay: "",
                captcha: "",
                pad: ""
            },
            encode: false,
            isUIParam: {
                inlay: true,
                "float": true,
                ui: true,
                post: true,
                custInlay: true,
                captcha: true,
                pad: true
            },
            get: function() {
                return Math.round((new Date).getTime() / 1000)
            },
            set: "default"
        },
        pn: {
            slotParamName: "",
            custParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "",
                "float": "",
                ui: "",
                custInlay: "",
                captcha: ""
            },
            encode: false,
            isUIParam: {
                inlay: true,
                "float": true,
                ui: true,
                custInlay: true,
                captcha: true
            },
            get: function() {
                var p = "";
                var m, b, i, a = [],
                o = [],
                l = [];
                var n = this.BL.pnTypeArray[this.displayType] = this.BL.pnTypeArray[this.displayType] || [];
                if (n && n.length > 0) {
                    for (m = 0, b = n.length; m < b; m++) {
                        i = n[m];
                        if (!i || !i.name || !i.num || !i.at) {
                            continue
                        }
                        a.push(i.name);
                        o.push(i.num);
                        l.push(i.at)
                    }
                    p = o.join(":") + "|" + a.join(":") + "|" + l.join(":")
                }
                return p
            },
            set: function(g, a, b) {
                var h = true;
                if (!g || !a || !b) {
                    g = this.get("tn");
                    if (this.displayType == "ui") {
                        a = this.get("hn") * this.get("wn") || 0
                    } else {
                        a = this.get("adn") || 0
                    }
                    b = this.get("at") || 103
                }
                if (!g || !a || !b) {
                    h = false
                } else {
                    if (this.displayType != "ui" && this.BL.pnTypeArray[this.displayType].length == 2) {
                        h = false
                    } else {
                        if (this.displayType == "ui" && this.BL.pnTypeArray[this.displayType].length == 3) {
                            h = false
                        } else {
                            this.BL.pnTypeArray[this.displayType] = this.BL.pnTypeArray[this.displayType] || [];
                            this.BL.pnTypeArray[this.displayType].push({
                                name: g,
                                num: a,
                                at: b
                            })
                        }
                    }
                }
                return h
            }
        },
        c01: {
            slotParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "0",
                "float": "0",
                captcha: ""
            },
            encode: false,
            isUIParam: {
                inlay: true,
                "float": true,
                captcha: true
            },
            get: "default",
            set: "default"
        },
        prt: {
            slotParamName: "",
            custParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "0",
                "float": "0",
                ui: "0",
                post: "0",
                custInlay: "0",
                captcha: "0"
            },
            encode: false,
            isUIParam: {
                inlay: true,
                "float": true,
                ui: true,
                post: true,
                custInlay: true,
                captcha: true
            },
            get: function() {
                if (!this.BL.pageFirstRequestTime) {
                    this.BL.pageFirstRequestTime = (new Date()).getTime()
                }
                return this.BL.pageFirstRequestTime || ""
            },
            set: "default"
        },
        noop: {
            custParamName: "",
            modifier: "dynamic",
            defaultValue: {
                ui: null,
                post: null
            },
            encode: false,
            isUIParam: {
                ui: false,
                post: false
            },
            get: "default",
            set: "default"
        }
    };
    c.registerClass(d)
})(window[___shortName]); (function() {
    function q(a) {
        var b = f[a];
        f[a] = void 0;
        return b
    }
    function J(a) {
        return (a = RegExp("(^| )" + a + "=([^;]*)(;|$)").exec(g.cookie)) && a[2] ? decodeURIComponent(a[2]) : ""
    }
    function K(a) {
        a = a || g.domain;
        0 === a.indexOf("www.") && (a = a.substr(4));
        "." === a.charAt(a.length - 1) && (a = a.substring(0, a.length - 1));
        var b = a.match(RegExp("([a-z0-9][a-z0-9\\-]*?\\.(?:com|cn|net|org|gov|info|la|cc|co|jp|us|hk|tv|me|biz|in|be|io|tk|cm|li|ru|ws|hn|fm)(?:\\.(?:cn|jp|tw|ru))?)$", "i"));
        return b ? b[0] : a
    }
    function Z() {
        if (n.plugins && n.mimeTypes.length) {
            var a = n.plugins["Shockwave Flash"];
            if (a && a.description) return a.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0"
        } else if (f.ActiveXObject && !f.opera) for (a = 10; 2 <= a; a--) try {
            var b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + a);
            if (b) return b.GetVariable("$version").replace(/WIN/g, "").replace(/,/g, ".")
        } catch(c) {}
        return ""
    }
    function L() {
        var a = g.referrer,
        b = a.replace(/^https?:\/\//, ""),
        b = b.split("/")[0],
        b = b.split(":")[0],
        b = K(b),
        c = K(),
        d = J("BAIDU_CLB_REFER");
        return d && c === b ? encodeURIComponent(d) : c !== b ? (g.cookie = "BAIDU_CLB_REFER=" + encodeURIComponent(a) + (c ? ";domain=" + encodeURIComponent(c) : ""), encodeURIComponent(a)) : ""
    }
    function M(a) {
        return "number" === typeof a ? Math.floor(a) : /^\d+$/.test(a) ? +a: -1
    }
    function s(a, b, c) {
        a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent("on" + b, c, !1)
    }
    function t(a) {
        var b = {},
        c = f.location.search;
        0 === c.indexOf("?") && (c = c.substring(1));
        for (var c = c.split("&"), d = 0; d < c.length; d++) {
            var e = c[d].split("=");
            0 == e[0].indexOf("baidu_clb_") && (b[e[0]] = e[1])
        }
        t = function(a) {
            return b[a]
        };
        return b[a]
    }
    function $(a) {
        var b = {
            '"': "&quot;",
            ">": "&gt;",
            "<": "&lt;",
            "&": "&amp;"
        };
        return a.replace(/[\"<>\&]/g,
        function(a) {
            return b[a]
        })
    }
    function D(a, b) {
        var c, d;
        0 === arguments.length ? (c = N, d = {}) : 1 === arguments.length ? "string" === typeof a ? (c = a, d = {}) : (c = N, d = a) : (c = a, d = b);
        var e = new Image,
        h = "log" + new Date,
        j = ["_=" + +new Date],
        g;
        for (g in d) w.call(d, g) && j.push(encodeURIComponent(g) + "=" + encodeURIComponent(d[g]));
        f[h] = e;
        e.onload = e.onerror = e.onabort = function() {
            e.onload = e.onerror = e.onabort = null;
            try {
                delete f[h]
            } catch(a) {
                f[h] = void 0
            }
        };
        e.src = c + (0 <= c.indexOf("?") ? "&": "?") + j.join("&")
    }
    function x(a, b) {
        var c = b || null,
        d = g.createElement("script");
        d.charset = "utf-8";
        d.async = !0;
        d.src = a;
        if (c) {
            var e = !1;
            d.onload = d.onreadystatechange = function() {
                if (!e && (!this.readyState || "loaded" === this.readyState || "complete" === this.readyState)) e = !0,
                c()
            }
        }
        for (var h = g.getElementsByTagName("script"), j = 10 > h.length ? h.length: 10, f = !1, i = 0; i < j; i++) {
            var k = h[i];
            if (k.parentNode) {
                k.parentNode.insertBefore(d, k);
                f = !0;
                break
            }
        }
        f || (h = g.getElementsByTagName("head")[0] || g.body, h.insertBefore(d, h.firstChild))
    }
    function k(a, b) {
        return f[a] ? f[a] : f[a] = b
    }
    function m(a) {
        return "baidu_clb_slot_" + a
    }
    function O(a) {
        if (a) {
            var b = o(a),
            c = g.getElementById(b.target);
            c && (i[a]._filled = !0, f.BAIDU_CLB_adRendered = void 0, !b.data && !b.novaQuery && !b.holdPlace ? (i[a]._done = !0, l(a, !1)) : 2 === b.multimediaType && !b.novaQuery ? P(b, c) : 3 === b.multimediaType ? Q(b) : (c.innerHTML = '<div id="' + m(a) + '">' + u(b) + "</div>", l(a, !0)))
        }
    }
    function P(a, b) {
        var c = a.id,
        d = m(c),
        e = R(a.data);
        b && (b.innerHTML = '<div id="' + d + '"></div>');
        e ? E("BAIDU_CLB_CPROFSLOT", aa, [c, F(c)]) : E("BAIDU_CLB_CPROASYNCSLOT", ba, [{
            id: c,
            data: F(c)._html,
            domid: d
        }]);
        i[c]._done = !0;
        l(c, !0)
    }
    function ca(a) {
        var b = a.id;
        if (a.novaQuery) a = '<div id="' + m(b) + '">' + u(a) + "</div>",
        g.write(a);
        else {
            var c = R(a.data),
            d = f[c ? "BAIDU_CLB_CPROFSLOT": "BAIDU_CLB_CPROCSLOT"];
            d ? d(b, F(b)) : (c || g.write('<div id="' + m(b) + '"></div>'), P(a, null))
        }
        i[b]._done = !0;
        l(b, !0)
    }
    function Q(a) {
        var b = a.id;
        if (a.data) {
            var c = m(b),
            d = '<div style="display:none" id="' + c + '"></div>';
            if (a = a.target) if (a = g.getElementById(a)) a.innerHTML = d;
            else return;
            else g.write(d);
            E("BAIDU_DAN_showAd", da, [b, c]);
            i[b]._done = !0;
            l(b, !0)
        } else l(b, !1)
    }
    function ea(a) {
        if (!a.data && !a.holdPlace) i[a.id]._done = !0,
        l(a.id, !1);
        else {
            if (a.multimediaType) {
                var b = "string" === typeof a.data ? a.data: a.data.content;
                if (b) {
                    i[a.id]._done = !0;
                    g.write(b);
                    l(a.id, !0);
                    return
                }
            }
            b = '<div id="' + m(a.id) + '">' + u(a) + "</div>";
            g.write(b);
            l(a.id, !0)
        }
    }
    function S(a) {
        if (a.data) if (g.body) {
            var b = g.createElement("div"),
            c = b.style;
            b.id = m(a.id);
            c.width = a.width + "px";
            c.height = a.height + 17 + "px";
            c.overflow = "hidden";
            c.zIndex = 2147483647;
            a.scroll ? T() ? (c.position = "fixed", c[a.alignLeft ? "left": "right"] = a.horizontalSpace + "px", c[a.alignTop ? "top": "bottom"] = a.verticalSpace + "px") : (c.position = "absolute", G(a, b), s(f, "scroll",
            function() {
                G(a)
            }), s(f, "resize",
            function() {
                G(a)
            })) : (c.position = "absolute", c[a.alignLeft ? "left": "right"] = a.horizontalSpace + "px", c[a.alignTop ? "top": "bottom"] = a.verticalSpace + "px");
            g.body.insertBefore(b, g.body.firstChild);
            c = u(a);
            c += '<div style="height:15px;border:1px solid #e1e1e1;background:#f0f0f0;margin:0;padding:0;overflow:hidden;"><span style="float:right;clear:right;margin:2px 5px 0 0;width:39px;height:13px;cursor:pointer;background:url(' + fa + ') no-repeat scroll 0 0;" onmouseover="this.style.backgroundPosition=\'0 -20px\';" onmouseout="this.style.backgroundPosition=\'0 0\';" onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);"></span></div>';
            b.innerHTML = c;
            l(a.id, !0)
        } else s(f, "load",
        function() {
            S(a)
        });
        else i[a.id]._done = !0,
        l(a.id, !1)
    }
    function ga(a) {
        i[a.id]._done = !0;
        l(a.id, !!a.data);
        if (a.data) {
            var b = ["height=" + a.height, "width=" + a.width, "top=" + (a.alignTop ? a.verticalSpace: p.availHeight - a.verticalSpace - a.height), "left=" + (a.alignLeft ? a.horizontalSpace: p.availWidth - a.horizontalSpace - a.width), "toolbar=no", "menubar=no", "scrollbars=no", "resizble=no", "location=no", "status=no"],
            b = b.join(","),
            c = H(a.data, a);
            0 > c.indexOf("<body>") && (c = "<!DOCTYPE html><body>" + c);
            if (a.openOnLoad || f.addEventListener) {
                var d = f.open(y(), "clb" + +new Date, b),
                e = +new Date + 3E4,
                h = function() {
                    try {
                        if (d.document) {
                            var b = d.document;
                            b.open("text/html", "replace");
                            b.write(c);
                            b.close();
                            d.focus();
                            0 < a.stayTime && setTimeout(function() {
                                d && d.close()
                            },
                            1E3 * a.stayTime)
                        }
                    } catch(g) {
                        new Date < e ? setTimeout(h, 200) : i[a.id]._done = "PermissionDenied"
                    }
                };
                d && setTimeout(h, 0)
            } else f.attachEvent("onunload",
            function() {
                var a = f.event;
                if (0 > a.clientY && !a.ctrlKey || a.altKey) if (a = "about:blank", z() && (a = 'javascript:void(function(){var d=document;d.open();d.domain="' + document.domain + '";d.write("");d.close();}())'), a = f.open(a, "clb" + +new Date, b)) try {
                    var d = a.document;
                    d.open("text/html", "replace");
                    d.write(c);
                    d.close();
                    a.focus()
                } catch(e) {}
            })
        }
    }
    function o(a) {
        var b = i[a];
        return ! b ? null: {
            id: a,
            slotType: b._stype,
            data: b._html,
            holdPlace: b._fxp,
            multimediaType: b._isMlt,
            width: b._w,
            height: b._h,
            alignLeft: b._left,
            alignTop: b._top,
            horizontalSpace: b._vs,
            verticalSpace: b._hs,
            stayTime: b._st,
            scroll: b._sf,
            openOnLoad: b._bf,
            done: b._done,
            filled: b._filled,
            flagRendered: !1 !== b._fr,
            target: b._target,
            novaQuery: b._qn,
            requestStatus: b._rs
        }
    }
    function F(a) {
        var a = o(a),
        b = {
            _html: a.data
        };
        a.requestStatus && (b._html += "|cpro_rs=" + a.requestStatus);
        return b
    }
    function R(a) {
        for (var a = a.split("|"), b = a.length, c = 0; c < b; c++) {
            var d = a[c].split("=");
            if ("cpro_template" === d[0]) return a = d[1].split("_"),
            !!(a[1] && 0 === a[1].indexOf("xuanfu"))
        }
        return ! 1
    }
    function G(a, b) {
        if (b = b || g.getElementById(m(a.id))) {
            var c = b.style,
            d = ha ? g.body: g.documentElement,
            e = d.clientWidth,
            h = d.clientHeight,
            j = f.pageXOffset || d.scrollLeft,
            d = f.pageYOffset || d.scrollTop;
            c.top = a.alignTop ? d + a.verticalSpace + "px": d + h - a.verticalSpace - a.height - 17 + "px";
            c.left = a.alignLeft ? j + a.horizontalSpace + "px": j + e - a.horizontalSpace - a.width + "px"
        }
    }
    function y() {
        return z() ? r.domainPolicyFileUrl || "/domain-policy.htm": "about:blank"
    }
    function u(a) {
        var b = a.frameId || "baidu_clb_slot_iframe_" + a.id;
        a.novaQuery && (a.frameSrc = ia + "?" + a.novaQuery);
        var c = a.frameSrc || y();
        return '<iframe id="' + b + '" src="' + c + '" ' + (a.frameSrc ? "": "onload=\"BAIDU_CLB_renderFrame('" + a.id + "')\"") + 'width="' + a.width + '" height="' + a.height + '" vspace="0" hspace="0" allowTransparency="true" scrolling="no" marginHeight="0" marginWidth="0"frameborder="0" style="border: 0; vertical-align: bottom; margin: 0; display: block;"></iframe>'
    }
    function l(a, b) {
        o(a).flagRendered && (f.BAIDU_CLB_adRendered = b)
    }
    function U(a, b) {
        if (a && ja.test(a) && b) {
            for (var b = "[object Array]" == Object.prototype.toString.call(b) ? b: Array.prototype.slice.call(arguments, 1), c = v[a] || [], d = b.length, e = 0; e < d; e++) {
                var h = b[e];
                "string" === typeof h && ka.test(h) && (c[c.length] = h)
            }
            if (c.length) {
                for (var d = v,
                e = {},
                h = [], j = c.length, g = 0; g < j; g++) {
                    var f = c[g];
                    e[f] || (h[h.length] = f, e[f] = !0)
                }
                d[a] = h
            }
        }
    }
    function la(a) {
        var a = 0 > a ? 0 : a,
        b = [],
        c;
        for (c in v) if (w.call(v, c)) {
            var d = c + "=" + v[c].join(",");
            b[b.length] = d
        }
        b.sort(function(a, b) {
            return a.length - b.length
        });
        c = "";
        for (var d = b.length,
        e = 0; e < d && !(c.length + b[e].length >= a); e++) c += "&" + b[e];
        return c
    }
    function I() {}
    function A(a, b) {
        var c = ["di=" + (a instanceof Array ? a.join(",") : a), "fn=" + b, "tpl=BAIDU_CLB_SETJSONADSLOT", "asp_refer=" + L(), "asp_url=" + encodeURIComponent(g.URL), "new=1"],
        d = V();
        d && a == d.sid && (c.push("mid=" + d.mid), c.push("sid=" + d.vc));
        for (var e = function() {
            try {
                var a = window[___shortName],
                b = a.using("$baseName.BusinessLogic"),
                c = a.create(b.Param, {
                    displayType: "inlay",
                    currentWindow: window,
                    timeStamp: (new Date).getTime()
                }),
                d = b.Param.snap && b.Param.snap(c);
                r.ups = d;
                return b.Param.serialize(c)
            } catch(e) {
                return ""
            }
        } (), e = function(a) {
            for (var b = [["fv", parseInt(Z(), 10)], ["cn", 1], ["if", 0], ["word", encodeURIComponent(g.URL)], ["refer", L()], ["ready", 1], ["jn", 3], ["lmt", Math.round( + new Date(g.lastModified) / 1E3)], ["csp", p.width + "," + p.height], ["csn", p.availWidth + "," + p.availHeight], ["ccd", p.colorDepth], ["chi", ""], ["cja", n.javaEnabled().toString()], ["cpl", ""], ["cmi", ""], ["cce", n.cookieEnabled || 0], ["csl", encodeURIComponent(n.language || n.browserLanguage).replace(/[^a-zA-Z0-9\-]/g, "")], ["did", ""], ["rt", ""], ["dt", Math.round( + new Date / 1E3)], ["c01", 0], ["prt", ""]], c = [], d = 0; d < b.length; d++) {
                var e = b[d][0],
                h = RegExp(e + "=([^&]*)"),
                h = h.exec(a) && h.exec(a)[1] ? h.exec(a)[1] : b[d][1];
                c[d] = e + "=" + h
            }
            return c
        } (e), d = {},
        c = c.concat(e), e = ["asp_refer", "asp_url", "word", "refer"], h = RegExp("^(" + e.join("|") + ")=(.*)"), j = 0, f = c.length; j < f; j++) {
            var i = c[j].match(h);
            i && (d[i[1]] = i[2], d[i[1] + "Num"] = j)
        }
        for (; 1 < e.length;) {
            h = e.pop();
            j = 0;
            for (f = e.length; j < f; j++) if (d[h] && d[h] === d[e[j]]) {
                c[d[h + "Num"]] = h + "=" + e[j];
                break
            }
        }
        e = ma + "?" + c.join("&") + "&baidu_id=" + J("BAIDUID");
        2073 < e.length && (j = d.asp_refer ? "$1asp_refer$2": "$1$2", e = e.replace(/(&refer=).*?(&)/, j), 2073 < e.length && (j = "$1$2", d.asp_url && (j = "asp_url=asp_refer" === c[d.asp_urlNum] ? "$1asp_refer$2": "$1asp_url$2"), e = e.replace(/(&word=).*?(&)/, j)));
        return e + la(2073 - e.length)
    }
    function W(a) {
        var b = X(a);
        if (i[b]._target) O(b);
        else if (a = o(b)) {
            i[b]._filled = !0;
            f.BAIDU_CLB_adRendered = void 0;
            if (2 === a.multimediaType) b = ca;
            else if (3 === a.multimediaType) b = Q;
            else switch (a.slotType) {
            case 0:
            case 3:
                b = ea;
                break;
            case 1:
                b = S;
                break;
            default:
                b = ga
            }
            b(a)
        }
    }
    function X(a) {
        for (var b in a) if (w.call(a, b)) {
            a = a[b];
            if ("string" === typeof i[b]) {
                var c = i[b];
                i[b] = a;
                i[b]._target = c
            } else "object" !== typeof i[b] && (i[b] = a);
            a = a._html;
            if ("object" === typeof a) if ("slide" === a.type) {
                a = a.materials;
                for (c = 0; c < a.length; c++) {
                    var d = a[c];
                    d.monitorUrl && D(d.monitorUrl)
                }
            } else a.monitorUrl && D(a.monitorUrl);
            return b
        }
        return ""
    }
    function B(a) {
        if (a) {
            var b = i[a];
            if (! (!0 === b || "string" === typeof b)) if ("object" === typeof b) {
                if (!b._filled) {
                    b._filled = !0;
                    var c = {};
                    c[a] = b;
                    W(c)
                }
            } else i[a] = !0,
            a = A(a, "BAIDU_CLB_SETJSONADSLOT"),
            g.write('<script charset="utf-8" src="' + a + '"><\/script>')
        }
    }
    function V() {
        var a = t("baidu_clb_preview_sid"),
        b = t("baidu_clb_preview_mid"),
        c = t("baidu_clb_preview_vc"),
        d = +t("baidu_clb_preview_ts");
        return 3E4 >= +new Date - d ? {
            sid: a,
            mid: b,
            vc: c
        }: null
    }
    function Y(a, b, c) {
        b = M(b);
        c = M(c);
        if (0 > b || 0 > c) B(a);
        else {
            f.BAIDU_CLB_adRendered = void 0;
            var d = o(a);
            d ? B(a) : (i[a] = {
                _w: b,
                _h: c,
                _filled: !0,
                _done: !0
            },
            d = o(a), d.frameId = "baidu_clb_slot_proxy_" + a, b = A(a, "BAIDU_CLB_SETJSONADSLOT"), d.frameSrc = na + "#" + encodeURIComponent(b), d = u(d), g.write(d), l(a, !0))
        }
    }
    var f = window,
    p = f.screen,
    n = f.navigator,
    g = f.document,
    ha = "CSS1Compat" !== g.compatMode,
    i = k("BAIDU_CLB_SLOTS_MAP", {}),
    w = Object.prototype.hasOwnProperty,
    ma = "http://cb.baidu.com/ecom",
    da = "http://cbjs.baidu.com/js/dn.js",
    na = "http://cbjs.baidu.com/js/proxy.htm",
    fa = "http://drmcmm.baidu.com/js/img/close.gif",
    N = "http://cbjslog.baidu.com/log",
    ba = "http://cpro.baidustatic.com/cpro/ui/cc.js",
    aa = "http://cpro.baidustatic.com/cpro/ui/cf.js",
    ia = "http://cpro.baidu.com/cpro/ui/uijs.php",
    T = function() {
        var a = g.createElement("div"),
        b = g.createElement("div"),
        c = !1;
        a.style.position = "absolute";
        a.style.top = "200px";
        b.style.position = "fixed";
        b.style.top = "100px";
        a.appendChild(b);
        g.body.insertBefore(a, g.body.firstChild);
        b.getBoundingClientRect && b.getBoundingClientRect().top !== a.getBoundingClientRect().top && (c = !0);
        g.body.removeChild(a);
        T = function() {
            return c
        };
        return c
    },
    z = function() {
        var a = g.createElement("iframe"),
        b = !1;
        a.src = "about:blank";
        g.body.insertBefore(a, g.body.firstChild);
        try {
            b = !a.contentWindow.document
        } catch(c) {
            b = !0
        }
        g.body.removeChild(a);
        z = function() {
            return b
        };
        return b
    };
    k("BAIDU_CLB_sendLog", D);
    var E = function() {
        var a = k("BAIDU_CLB_taskQueues", {});
        return function(b, c, d) {
            if (f[b]) f[b].apply(f, d);
            else {
                var e = b + "@" + c,
                h = a[e];
                h || (h = a[e] = [], x(c,
                function() {
                    for (; h.length;) {
                        var c = h.shift();
                        f[b].apply(f, c)
                    }
                    delete a[e]
                }));
                h.push(d)
            }
        }
    } (),
    r = k("BAIDU_CLB_globalConfig", {});
    k("BAIDU_CLB_setConfig",
    function(a, b) {
        r[a] = b
    }); (function(a, b) {
        var c = q(b);
        c && (r[a] = c)
    })("domainPolicyFileUrl", "BAIDU_CLB_domainPolicyFileUrl");
    r.version = "20121220";
    var H = function() {
        function a(a, d, e) {
            if ("string" === typeof a) return a;
            if (!a.type) return "";
            var h = b[a.type];
            return h ? (a = "string" === typeof h ? C(h, a) : h(a, d), e ? a: "<!DOCTYPE html><body>" + a) : ""
        }
        var b = {
            text: function(a) {
                var b = '<span style="word-wrap:break-word;"><a href="{clickUrl:string}" target="{target:string}" style="font-size:{size:number}{unit:string};color:{defaultColor:string};font-weight:{defaultBold:string};font-style:{defaultItalic:string};text-decoration:{defaultUnderline:string};"{events}>{text:string}</a></span>',
                e = /\{events\}/;
                if (1 === a.version) b = b.replace(e, "");
                else if (2 === a.version) for (var b = b.replace(e, " onmouseover=\"this.style.color = '{hoverColor:string}';this.style.fontWeight = '{hoverBold:string}';this.style.fontStyle = '{hoverItalic:string}';this.style.textDecoration = '{hoverUnderline:string}';\" onmouseout=\"this.style.color = '{defaultColor:string}';this.style.fontWeight = '{defaultBold:string}';this.style.fontStyle = '{defaultItalic:string}';this.style.textDecoration = '{defaultUnderline:string}';\""), e = ["default", "hover"], h = 0; h < e.length; h++) {
                    var f = e[h],
                    g = f + "Color",
                    i = f + "Bold",
                    k = f + "Italic",
                    f = f + "Underline";
                    a[g] = "#" + a[g];
                    a[i] = a[i] ? "bold": "normal";
                    a[k] = a[k] ? "italic": "normal";
                    a[f] = a[f] ? "underline": "none"
                }
                return C(b, a)
            },
            image: '<a href="{clickUrl:string}" target="{target:string}"><img src="{src:string}" title="{title:html}" alt="{title:html}" border="0" height="{height:number}" width="{width:number}" /></a>',
            flash: function(a) {
                a.file = a.hasLink ? "cflash": "flash";
                a.imageClickUrl = a.clickUrl;
                a.hasLink || (a.clickUrl = "");
                return C('<script>var BD = BD || {};BD.MC = BD.MC || {};BD.MC.ADFlash = BD.MC.ADFlash || {};BD.MC.ADImg = BD.MC.ADImg || {};BD.MC.ADFlash.w = {width:number};BD.MC.ADFlash.h = {height:number};BD.MC.ADFlash.mu = "{src:string}";BD.MC.ADFlash.cu = "{clickUrl:string}";BD.MC.ADFlash.wm = {wmode:number};BD.MC.ADFlash.ct = "{clickTag:string}";BD.MC.ADImg.w = {imageWidth:number};BD.MC.ADImg.h = {imageHeight:number};BD.MC.ADImg.mu = "{imageSrc:string}";BD.MC.ADImg.cu = "{imageClickUrl:string}";BD.MC.ADImg.tw = "{target:string}";BD.MC.ADImg.flag = {backupImage:number};<\/script><script src ="http://cbjs.baidu.com/js/{file:string}.js"><\/script>', a)
            },
            rich: function(a) {
                return a.content
            },
            slide: function(b, d) {
                for (var e = [], h = b.materials, f = 0; f < h.length; f++) {
                    var g = h[f];
                    "string" !== typeof g && (g = a(g, d, !0));
                    e.push(g)
                }
                b.html = "<div>" + e.join("</div><div>") + "</div>";
                b.width = d.width;
                b.height = d.height;
                return C('<div id="bd_ec_clb_asp" style="width: {width:number}px; height: {height:number}px; overflow: hidden;">{html:string}</div><script>(function(){var d = document;function G(id) { return d.getElementById(id); };var container = G("bd_ec_clb_asp");var pages = container.childNodes;var pl = 0;for (var i = 0; i < container.childNodes.length; i++) {if (container.childNodes[i].nodeType === 1) {pl++;}}var cp = 0;function showPage(pn) { pages[pn].style.display = ""; };function hidePages() {for (var i = 0; i < pl; i++) {pages[i].style.display = "none";}};function roll() {hidePages();showPage(cp);cp == (pages.length - 1) ? cp = 0 : cp++;};var autoRoll;function setRoll() { autoRoll = window.setInterval(function() { roll(); }, {interval:number});};roll();setRoll();container.onmouseover = function() { window.clearInterval(autoRoll); };container.onmouseout = function() {setRoll(); } })();<\/script>', b)
            }
        };
        return a
    } ();
    k("BAIDU_CLB_formatMaterial", H);
    var C = function() {
        var a = /\{(\w+)\:(\w+)\}/g;
        return function(b, c) {
            return b.replace(a,
            function(a, b, f) {
                a = c[b];
                switch (f) {
                case "number":
                    a = +a || 0;
                    break;
                case "boolean":
                    a = !!a;
                    break;
                case "html":
                    a = $(a)
                }
                return a
            })
        }
    } ();
    k("BAIDU_CLB_renderFrame",
    function(a) {
        var b = document.getElementById("baidu_clb_slot_iframe_" + a),
        c = o(a);
        if (z() && b.getAttribute("src", 2) !== y()) b.src = y();
        else if (c && !c.done) try {
            i[a]._done = !0;
            var d = H(c.data, c);
            0 > d.indexOf("<body>") && (d = "<!DOCTYPE html><body>" + d);
            var e = b.contentWindow.document;
            e.open("text/html", "replace");
            e.write(d);
            e.close();
            e.body && (e.body.style.backgroundColor = "transparent");
            1 === c.slotType && 0 < c.stayTime && setTimeout(function() {
                var b = document.getElementById(m(a));
                b && b.parentNode.removeChild(b)
            },
            1E3 * c.stayTime)
        } catch(f) {
            i[a]._done = "PermissionDenied"
        }
    });
    k("BAIDU_CLB_prepareMoveSlot",
    function(a) {
        void 0 === a || void 0 === i[a] || (i[a]._done = !1)
    });
    var v = k("BAIDU_CLB_orientations", {}),
    ja = /^[0-9a-zA-Z]+$/,
    ka = /^[0-9a-zA-Z_]+$/;
    k("BAIDU_CLB_addOrientation", U); (function() {
        var a = q("BAIDU_CLB_ORIENTATIONS");
        if (a) for (var b in a) w.call(a, b) && U(b, a[b])
    })();
    k("BAIDU_CLB_addSlot", I);
    k("BAIDU_CLB_enableAllSlots", I);
    k("BAIDU_CLB_SETHTMLSLOT", I);
    k("BAIDU_CLB_SETJSONADSLOT", W);
    k("BAIDU_CLB_ADDAD", X);
    k("BAIDU_CLB_fillSlot", B);
    k("BAIDU_CLB_singleFillSlot", B);
    k("BAIDU_CLB_fillSlotAsync",
    function(a, b) {
        if (a && b && !("string" != typeof b && b.constructor != String)) {
            var c = i[a];
            if (! (!0 === c || "string" === typeof c)) {
                if ("object" === typeof c) return i[a]._target = b,
                O(a);
                i[a] = b;
                x(A(a, "BAIDU_CLB_SETJSONADSLOT"))
            }
        }
    });
    k("BAIDU_CLB_preloadSlots",
    function(a) {
        function b(a) {
            a = A(a, "BAIDU_CLB_ADDAD");
            g.write('<script charset="utf-8" src="' + a + '"><\/script>')
        }
        for (var c = [], d = V(), e = arguments.length, f = 0; f < e; f++) {
            var j = arguments[f];
            if (! (d && j == d.sid) && (i[j] || (c[c.length] = j, i[j] = !0), 16 <= c.length)) b(c),
            c = []
        }
        c.length && b(c)
    });
    k("BAIDU_CLB_fillSlotWithSize", Y); (function() {
        var a = q("BAIDU_CLB_SLOT_ID"),
        b = q("BAIDU_CLB_SLOT_WIDTH"),
        c = q("BAIDU_CLB_SLOT_HEIGHT");
        Y(a, b, c)
    })(); (function() {
        var a = q("BAIDU_CLB_JSONP_URL");
        a && g.write('<script charset="utf-8" src="' + a + '"><\/script>')
    })(); (function() {
        f.BAIDU_CLB_logOK || (f.BAIDU_CLB_logOK = !0, s(f, "load",
        function() {
            x("http://cbjs.baidu.com/js/log.js")
        }), 0.1 >= Math.random() && s(f, "load",
        function() {
            x("http://cbjs.baidu.com/js/logAdvanced.js",
            function() {
                try {
                    var a = window.LogAdvancedNamespace.using("$baseName.BusinessLogic"),
                    b;
                    for (b in i) a.adsArray && a.adsArray.push({
                        id: b,
                        domId: m(b),
                        uiParamSnap: r.ups,
                        win: window,
                        js: "cc"
                    });
                    a.ViewWatch && a.ViewWatch.getInstance()
                } catch(c) {}
            })
        }))
    })()
})();