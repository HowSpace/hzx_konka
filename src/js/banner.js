(function($) {
    $.fn.extend({
        banner: function(options) {
            var main = null,
                that = this,
                init = null,
                stop = null,
                start = null,
                next = null,
                prev = null,
                timer = null,
                cirmove = null,
                prevmove = null,
                click = null,
                elems = {},
                defaults = {
                    speed: 1000,
                    delay: 3000
                };
            options = $.extend(defaults, options);
            // 初始化;
            init = function() {
                elems._index = 1;
                elems.slideeDiv = $('.banner_img');
                elems.btn = $('.turn_span>span');
                click()
                that.hover(function() {
                    stop();
                }, function() {
                    timer = setInterval(start.bind(null, 1), options.delay + options.speed);
                });
            }
            start = function(direction) {
                var t = '-=1920px';
                if (!direction) {
                    t = '+=1920px'
                    if (elems._index <= 1) {
                        var divLeft = that.offset().left,
                            itemLeft = elems.slideeDiv.children('.item').last().offset().left;
                        elems._index = 5;
                        elems.slideeDiv.css('left', '-' + (itemLeft - divLeft) + 'px');
                    }

                }
                $('.hint_title li').eq(elems._index).addClass('active').siblings().removeClass('active');
                $('.banner_img').animate({
                    left: t

                }, options.speed, function() {
                    if (direction)
                        elems._index++;
                    else
                        elems._index--;
                    if (elems._index === 5) {
                        $('.hint_title li').eq(0).addClass('active').siblings().removeClass('active');
                        elems._index = 1;
                        elems.slideeDiv.css('left', 0);
                    }
                });
            }

            click = function() {
                elems.btn.on('click', function() {
                    if (elems.btn.index($(this))) {
                        next();
                    } else {
                        prev();
                    }
                });
            }
            cirmove = function() {
                $('.hint_title li').eq(elems._index).addClass('active').siblings().removeClass('active');
                if (elems._index === 4) {
                    $('.hint_title li').eq(0).addClass('active').siblings().removeClass('active');
                }
            }
            prevmove = function() {
                // console.log(elems._index);
                if (elems._index === 5) {
                    $('.hint_title li').eq(3).addClass('active').siblings().removeClass('active');
                }
                if (elems._index === 4) {
                    $('.hint_title li').eq(2).addClass('active').siblings().removeClass('active');
                }
                if (elems._index === 3) {
                    $('.hint_title li').eq(1).addClass('active').siblings().removeClass('active');
                }
                if (elems._index === 2) {
                    $('.hint_title li').eq(0).addClass('active').siblings().removeClass('active');
                }
            }
            prev = function() {
                // prevmove();
                stop();
                start(0);
                prevmove();
            }
            next = function() {
                cirmove();
                stop();
                start(1);
            }
            stop = function() {
                $('.banner_img').stop(true, true);
                clearInterval(timer);
            }
            main = function() {
                init();
                timer = setInterval(start.bind(null, 1), options.delay + options.speed);
            }
            main();

        }
    });
})(jQuery);