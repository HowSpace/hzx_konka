(function($) {
    // 登录注册页的顶部导航固定效果
    $(window).scroll(function() {
        var top = $(window).scrollTop();
        if (top > 40) {
            $('.s_nav').css({ "position": "fixed", "top": "0", "margin-left": "-570px", "left": "50%" });
        } else if (top < 40) {
            $('.s_nav').css({ "position": "absolute", "top": "60px" });
        }
    });
})(jQuery);