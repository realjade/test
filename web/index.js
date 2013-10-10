G.def("./home/indexPage",
function() {
    return {
        login: function() {},
        unlogin: function() {},
        all: function() {
            var a = function(a, e) {
                var d = $(a).find("ul"),
                f = d.length,
                c = 0;
                e.click(function() {
                    var a = d.eq(c),
                    b;
                    c++;
                    c %= f;
                    b = d.eq(c);
                    a.hide();
                    b.show()
                })
            };
            $("#refreshNuts").doOnce(function() {
                a("#hotNuts", $(this))
            });
            $("#refreshTags").doOnce(function() {
                a("#hotTags", $(this))
            });
            $("#refreshGroups").doOnce(function() {
                a("#hotGroups", $(this))
            })
        }
    }
});
if ("undefined" !== typeof g_page_name) {
    "undefined" === typeof ukey && (ukey = "");
    var moduleName = g_page_name.replace(/home/g, ""),
    moduleName = moduleName.slice(0, 1).toLowerCase() + moduleName.slice(1);
    G.req("./home/" + moduleName,
    function(a) {
        if (null != a) {
            var b = ukey ? "login": "unlogin";
            if (a[b]) a[b](ukey);
            a.all && a.all()
        }
    })
};