(function($) {
    // tab切换;
    var oLi = $('.left_nav_list>li');
    var oCont = $('#tabs_container>div');
    oLi.on('click', function() {
        var i = $(this).index();
        oCont.eq(i - 1).addClass('active').siblings().removeClass('active');
    });
})(jQuery);