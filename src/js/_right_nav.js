(function() {
    // 右侧功能栏
    $(window).scroll(function() {
        var top = $(window).scrollTop();
        if (top > 500) {
            $('.totop').css({ "display": "block" });
        } else if (top < 500) {
            $('.totop').css({ "display": "none" });
        }
    });
})();
(function($) {
    // 获取该锚点到浏览器顶部的距离， 然后给body添加动画
    $('.tool_title').click(function() {
        $('html,body').animate({
                scrollTop: 0
            },
            500);
    });
})(jQuery);