(function($) {
    // 轮播图的turn_left & turn_right 的显示;
    $('.nav_banner>.second_nav_list,.nav_banner>.banner').on('mouseover', function() {
        $('.turn_left_limg>i').animate({
            right: 1500
        }, 500);
    });
})(jQuery);
(function($) {
    // 楼梯导航
    $('.left_fixed_nav>ul>li>a').on('click', function(e) {
        e.preventDefault();
        var top = $("#" + $(this).attr('title')).offset().top;
        $('html,body').animate({
            scrollTop: top
        }, 500);
    });
})(jQuery);
(function($) {
    // 明星产品左右切换
    var turnleft = $('.top_title_left');
    var turnright = $('.top_title_right');
    turnleft.click(function() {
        $('.product_message').animate({ "left": "0px" }, 1000);
    });
    turnright.click(function() {
        $('.product_message').animate({ "left": "-1140px" }, 1000);
    });
})(jQuery);
(function($) {
    // 首页导航到明星列表的跳转;
    $('.head>.s_nav>.row>.hover>.to_tvlist,li>.to_tvlist').on('click', function(ev) {
        ev.preventDefault();
        var top = $("#" + $(this).attr('title')).offset().top;
        $('html,body').animate({
            scrollTop: top
        }, 500);
    });
})(jQuery);