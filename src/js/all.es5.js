'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function ($) {
    // tab切换;
    var oLi = $('.left_nav_list>li');
    var oCont = $('#tabs_container>div');
    oLi.on('click', function () {
        var i = $(this).index();
        oCont.eq(i - 1).addClass('active').siblings().removeClass('active');
    });
})(jQuery);
(function ($) {
    $.fn.extend({
        banner: function banner(options) {
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
            init = function init() {
                elems._index = 1;
                elems.slideeDiv = $('.banner_img');
                elems.btn = $('.turn_span>span');
                click();
                that.hover(function () {
                    stop();
                }, function () {
                    timer = setInterval(start.bind(null, 1), options.delay + options.speed);
                });
            };
            start = function start(direction) {
                var t = '-=1920px';
                if (!direction) {
                    t = '+=1920px';
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

                }, options.speed, function () {
                    if (direction) elems._index++;else elems._index--;
                    if (elems._index === 5) {
                        $('.hint_title li').eq(0).addClass('active').siblings().removeClass('active');
                        elems._index = 1;
                        elems.slideeDiv.css('left', 0);
                    }
                });
            };

            click = function click() {
                elems.btn.on('click', function () {
                    if (elems.btn.index($(this))) {
                        next();
                    } else {
                        prev();
                    }
                });
            };
            cirmove = function cirmove() {
                $('.hint_title li').eq(elems._index).addClass('active').siblings().removeClass('active');
                if (elems._index === 4) {
                    $('.hint_title li').eq(0).addClass('active').siblings().removeClass('active');
                }
            };
            prevmove = function prevmove() {
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
            };
            prev = function prev() {
                // prevmove();
                stop();
                start(0);
                prevmove();
            };
            next = function next() {
                cirmove();
                stop();
                start(1);
            };
            stop = function stop() {
                $('.banner_img').stop(true, true);
                clearInterval(timer);
            };
            main = function main() {
                init();
                timer = setInterval(start.bind(null, 1), options.delay + options.speed);
            };
            main();
        }
    });
})(jQuery);
(function ($) {
    // 从cookie中拿取数据;
    var phpUrl = 'http://10.31.161.13/konka_1-master/konka_1-master/lib/php/';
    var shop = cookie.get('shop');
    if (shop) {
        shop = JSON.parse(shop);
        console.log(shop);

        // console.log(allprice);
        var idList = shop.map(function (elm) {
            return elm.id;
        }).join();
        console.log(idList);
        $.ajax({
            type: "get",
            url: phpUrl + 'cart_getdata.php',
            data: {
                "idList": idList
            },
            dataType: 'json',
            success: function success(data) {
                console.log(data);
                var template = "";
                data.forEach(function (elm) {
                    // console.log(elm);
                    var pic = elm.little_img.split(',')[0];
                    // console.log(pic)
                    var arr = shop.filter(function (val, i) {
                        return val.id === elm.sid;
                    });
                    template = '\n                    <div class="choose_comm">\n                        <div class="commodity_check all_check">\n                            <input class="alone_check_input little_check_point" type="checkbox" id="p-' + elm.sid + '" checked="checked" >\n                        </div>\n                        <div class="commodity_information commodity">\n                            <div class="commodity_img">\n                                <a href="./details.html">\n                                    <img src="' + pic + '" alt="' + elm.title + '">\n                                </a>\n                            </div>\n                            <div class="commodity_title ellipsis" >\n                                <h5 href="./details.html">\n                                    <a href="details.html" alt="' + elm.title + '">' + elm.title + '</a></h5>\n                                <span>' + elm.type + '</span>\n                                <p>' + elm.description + '</p>\n                            </div>\n                        </div>\n                        <div class="commodity_alone_price alone_price">\n                            <i style="color:red">\uFFE5&nbsp;</i>\n                            <sapn class="little_alone_price">' + elm.new_price + '</sapn>\n                        </div>\n                        <div class="commodity_num num clearfix">\n                            <div class="commodity_num_minus">\n                                <span class="minus_btn">-</span>\n                            </div>\n                            <input class="check_num" type="number" value="' + arr[0].num + '" min="1" max="' + elm.num + '">\n                                <div class="commodity_num_add">\n                                    <span class="add_btn">+</span>\n                                </div>\n                            </div>\n                            <div class="commodity_all_price all_price">\n                                <i style="color:red">\uFFE5&nbsp;</i>\n                                <span class="commodity_price">' + (arr[0].num * elm.new_price).toFixed(2) + '</span>\n                            </div>\n                            <div class="commodity_del operation">\n                                <a>\u5220\u9664</a>\n                            </div>\n                        </div>\n                    ';
                    $('.cart_body').append(template);
                    (function change() {
                        // 设置数量输入框的值为正整数,且不超过库存;
                        var reg = /^[1-9]+[0-9]*$/;
                        $('.check_num').off('blur').blur(function () {
                            console.log($(this).parents('.commodity_num').find('input'));
                            if (!reg.test($(this).parents('.commodity_num').find('input').val())) {
                                var num = $(this).parents('.commodity_num').find('input').val();
                                console.log('error');
                                $(this).parents('.commodity_num').find('input').val($(this).parents('.commodity_num').find('input').attr('max'));
                            } else if ($(this).parents('.commodity_num').find('input').val()) {
                                console.log('true');
                                var input_num_now = $(this).parents('.commodity_num').find('input').val();
                                // console.log(input_num_now)
                                if (Number(input_num_now) >= $(this).parents('.commodity_num').find('input').attr('max')) {
                                    $(this).parents('.commodity_num').find('input').val($(this).parents('.commodity_num').find('input').attr('max'));
                                }
                            }
                        });
                        // 按钮增减数量;
                        $('.commodity_num_minus').off('click').on('click', function () {
                            // console.log($(this).parents('.commodity_num').find('input'));
                            var num = $(this).parents('.commodity_num').find('input').val();
                            // console.log($(this).parents('.commodity_num').find('input').val());
                            $(this).parents('.commodity_num').find('input').val(num - 1);
                            if ($(this).parents('.commodity_num').find('input').val() <= 1) {
                                $(this).parents('.commodity_num').find('input').val(1);
                            }
                        });
                        $('.commodity_num_add').off('click').on('click', function () {
                            var num = Number($(this).parents('.commodity_num').find('input').val());
                            // console.log($(this).parents('.commodity_num').find('input').val());
                            $(this).parents('.commodity_num').find('input').val(num + 1);
                            if ($(this).parents('.commodity_num').find('input').val() >= $(this).parents('.commodity_num').find('input').attr('max')) {
                                $(this).parents('.commodity_num').find('input').val($(this).parents('.commodity_num').find('input').attr('max'));
                            }
                            // console.log($(this).parents('.commodity_num').find('input').attr('max'));
                        });
                    })();
                    // $('.account_price').html('￥' + allprice.toFixed(2));
                });
            },
            error: function error() {
                alert('地址有误!');
            }
        }).done(function (data) {
            // 多选和全选;
            console.log($('.all_check_total'));
            // console.log($('.alone_check'));
            $('.all_check_total').on('click', function () {
                if ($(this).prop("checked")) {
                    // console.log('check');
                    $('.little_check_point').attr("checked", "checked");
                } else {
                    // console.log('no_check'[])
                    $('.little_check_point').removeAttr("checked");
                }
            });
            // 计算所选物品的件数,计算总价;
            $('.check_num').each(function (i, val) {
                console.log($(val).val());
            });
            console.log($('.commodity_price'));
        });
    }
})(jQuery);
(function ($) {
    // 商品详情导航
    $(window).scroll(function () {
        var top = $(window).scrollTop();
        if (top > 40 && 700 > top) {
            $('.s_nav').css({ "display": "block", "position": "fixed", "top": "0", "margin-left": "-570px", "left": "50%" });
        } else if (40 < top < 700) {
            $('.s_nav').css({ "display": "block", "position": "relative" });
        } else if (top > 700) {
            $('.s_nav').css({ "display": "none" });
        }
        // 商品规格导航

        var top = $(window).scrollTop();
        if (top > 700) {
            $('.product_introduction_nav').css({ "display": "block", "position": "fixed", "top": "0", "margin-left": "-570px", "left": "50%" });
        } else if (top < 700) {
            $('.product_introduction_nav').css({ "display": "none" });
        }
    });
    // 渲染数据并存入cookie;
    var sid = location.search.split('=')[1];
    var phpUrl = 'http://10.31.161.13/konka_1-master/konka_1-master/lib/php/';
    $.ajax({
        type: 'get',
        url: phpUrl + 'details_getdata.php',
        data: {
            id: sid
        },
        dataType: 'json',
        success: function success(data) {
            var value = data[sid - 1];
            console.log(value);

            var littleimgarr = value.little_img;
            var showimgarr = value.show_img;
            var introimgarr = value.introduce;
            // console.log(littleimgarr);
            // console.log(showimgarr);
            // console.log(introimg);
            var littlearr = littleimgarr.split(',');
            var showarr = showimgarr.split(',');
            var introarr = introimgarr.split(',');
            // console.log(showarr)
            addCookie('littlearr', littlearr, 1);
            addCookie('showimg', showimgarr, 1);
            var template = '\n            <div class="product_introduction_nav" style="display: none">\n                <div class="content clearfix">\n                    <div class="product_title ellipsis">\n                        ' + value.title + '\n                    </div>\n                    <div class="product_catalog clearfix">\n                    <ul class="catalog clearfix">\n                        <li class="catalog_introdsuce active">\n                            <a href="#">\u8BE6\u60C5\u4ECB\u7ECD</a>\n                        </li>\n                        <li class="catalog_parameter">\n                            <a href="#">\u89C4\u683C\u53C2\u6570</a>\n                        </li>\n                        <li class="catalog_evaluate">\n                            <a href="#">\u6652\u5355\u8BC4\u4EF7</a>\n                        </li>\n                        <li class="catalog_sale">\n                            <a href="#">\u552E\u540E\u670D\u52A1</a>\n                        </li>\n                        <li class="catalog_consult">\n                            <a href="#">\u54A8\u8BE2\u670D\u52A1</a>\n                        </li>\n                    </ul>\n                    <div class="buy_btn">\n                        <a href="./cart.html">\u7ACB\u5373\u8D2D\u4E70</a>\n                    </div>\n                </div>\n            </div>\n        </div>\n            <div class="content clearfix">\n            <div class="commodity_message clearfix">\n                <div class="commodity_little_title">\n                    <a href="#">\u7535\u89C6</a>&nbsp;>&nbsp;\n                    <a href="#">' + value.type + '</a>&nbsp;>&nbsp;\n                    <span>' + value.title + '</span>\n                </div>\n                <div class="commodity_show">\n                    <div class="big_show">\n                        <img src=' + littlearr[0] + '>\n                        <span class="big_show_span"></span>\n                    </div>\n                    <div class="magnifying_glass clearfix">\n                        <i class="iconfont totop_list">&#xf01a3;\n                            </i>\n                        <ul class="commodity_list">\n                            <li class="now_img">\n                                <img src=' + littlearr[0] + '>\n                            </li>\n                            <li>\n                                <img src=' + littlearr[1] + '>\n                            </li>\n                            <li>\n                                <img src=' + littlearr[2] + '>\n                            </li>\n                            <li>\n                                <img src=' + littlearr[3] + '>\n                            </li>\n\n                        </ul>\n                        <i class="iconfont todown_list">&#xf01a6;</i>\n                    </div>\n                    <div class="the">\n                        <img src=' + showarr[0] + '>\n                    </div>\n                </div>\n                <div class="join_cart">\n                    <h3>' + value.title + '</h3>\n                    <div class="title">' + value.description + '</div>\n                    <div class="price">\n                        <span class="new_price">\uFFE5' + value.new_price + '</span>\n                        <del class="old_price">\uFFE5' + value.del_price + '</del>\n                        <span class="phone_pay"><i class="iconfont">&#xe646;\u624B\u673A\u8D2D\u4E70</i>\n                            <img src="https://www.konka.com/openapi/qrcode/encode/size/5/margin/5?txt=https%3A%2F%2Fwww.konka.com%2Fm%2Fitem-595.html" alt="">\n                        </span>\n                    </div>\n                    <div class="num clearfix">\n                        <span>\u6570\u91CF</span>\n                        <a class="minus">-</a>\n                        <input type="number" id="count" value="1" min="1" max="' + value.num + '">\n                        <a class="add">+</a>\n                    </div>\n                    <div class="btn_list clearfix">\n                        <div class="buy_btn">\u7ACB\u5373\u8D2D\u4E70</div>\n                        <div class="join_cart_btn">\u52A0\u5165\u8D2D\u7269\u8F66</div>\n                    </div>\n                </div>\n                </div>\n                <div class="commodity_img_message">\n                    <div class="commodity_img_title ">\n                        <ul class="clearfix">\n                            <li class="introduce active">\n                                <a href="#">\u8BE6\u60C5\u4ECB\u7ECD</a>\n                            </li>\n                            <li class="parameter">\n                                <a href="#">\u89C4\u683C\u53C2\u6570</a>\n                            </li>\n                            <li class="evaluate">\n                                <a href="#">\u6652\u5355\u8BC4\u4EF7</a>\n                            </li>\n                            <li class="sale">\n                                <a href="#">\u552E\u540E\u670D\u52A1</a>\n                            </li>\n                            <li class="consult">\n                                <a href="#">\u54A8\u8BE2\u670D\u52A1</a>\n                            </li>\n                        </ul>\n                    </div>\n                    <div class="commodity_img_list">\n                        <img src=' + introarr[0] + '>\n                        <img src=' + introarr[1] + '>\n                        <img src=' + introarr[2] + '>\n                        <img src=' + introarr[3] + '>\n                        <img src=' + introarr[4] + '>\n                        <img src=' + introarr[5] + '>\n                        <img src=' + introarr[6] + '>\n                        <img src=' + introarr[7] + '>\n                    </div>\n                </div>\n            ';
            $('.delails_show_box').append(template).find('.join_cart_btn').on('click', function () {
                addShopCar(value.sid, value.new_price, $('#count').val());
            });
            // 放大镜效果;
            $(function () {
                var ione = $(".big_show"),
                    ithe = $(".the"),
                    itwo = $(".commodity_list li"),
                    tthe = $(".the img");
                var arr = getCookie('littlearr').split(',');
                var oarr = getCookie('showimg').split(',');
                console.log(arr);
                console.log(oarr);

                itwo.each(function (i) {
                    $(this).click(function () {
                        $(".big_show img").attr("src", arr[i]);
                        tthe.attr("src", oarr[i]);
                        itwo.removeClass("now_img");
                        $(this).addClass("now_img");
                    });

                    ione.mousemove(function (a) {
                        var evt = a || window.event;
                        ithe.css('display', 'block');
                        var ot = evt.clientY - ($(".commodity_list").offset().top - $(document).scrollTop()) - 87;
                        var ol = evt.clientX - ($(".commodity_list").offset().left - $(document).scrollLeft()) - 87;
                        if (ol <= 0) {
                            ol = 0;
                        }
                        if (ot <= 0) {
                            ot = 0;
                        }
                        if (ol >= 175) {
                            ol = 175;
                        }
                        if (ot >= 175) {
                            ot = 175;
                        }
                        $(".big_show_span").css({ 'left': ol, 'top': ot });
                        var ott = ot / 350 * 800;
                        var oll = ol / 350 * 800;
                        tthe.css({ 'left': -oll, 'top': -ott });
                    });
                    ione.mouseout(function () {
                        ithe.css('display', 'none');
                    });
                });
            });
            // 加入购物车;
            function addShopCar(id, price, num) {
                var shop = cookie.get('shop');
                var product = {
                    "id": id,
                    "price": price,
                    "num": num
                };
                if (shop) {
                    shop = JSON.parse(shop);
                    if (shop.some(function (elm) {
                        return elm.id == id;
                    })) {
                        shop.forEach(function (elm, i) {
                            elm.id == id ? elm.num = num : null;
                        });
                    } else {
                        shop.push(product);
                    }
                    cookie.set('shop', JSON.stringify(shop), 1);
                } else {
                    shop = [];
                    shop.push(product);
                    cookie.set('shop', JSON.stringify(shop), 1);
                }
            }
        },
        error: function error() {
            alert('error');
        }
    }).done(function () {
        // 设置数量输入框的值为正整数,且不超过库存;
        var reg = /^[1-9]+[0-9]*$/;
        $('#count').off('blur').blur(function () {
            console.log($(this).parents('.num').find('input'));
            if (!reg.test($(this).parents('.num').find('input').val())) {
                var num = $(this).parents('.num').find('input').val();
                console.log('error');
                $(this).parents('.num').find('input').val($(this).parents('.um').find('input').attr('max'));
            } else if ($(this).parents('.num').find('input').val()) {
                console.log('true');
                var input_num_now = $(this).parents('.num').find('input').val();
                // console.log(input_num_now)
                if (Number(input_num_now) >= $(this).parents('.num').find('input').attr('max')) {
                    $(this).parents('.num').find('input').val($(this).parents('.num').find('input').attr('max'));
                }
            }
        });
        // 按钮增减数量;
        $('.minus').off('click').on('click', function () {
            var num = $(this).parents('.num').find('input').val();
            $(this).parents('.num').find('input').val(num - 1);
            if ($(this).parents('.num').find('input').val() <= 1) {
                $(this).parents('.num').find('input').val(1);
            }
        });
        $('.add').off('click').on('click', function () {
            var num = Number($(this).parents('.num').find('input').val());
            $(this).parents('.num').find('input').val(num + 1);
            if ($(this).parents('.num').find('input').val() >= $(this).parents('.num').find('input').attr('max')) {
                $(this).parents('.num').find('input').val($(this).parents('.num').find('input').attr('max'));
            }
        });
    });
})(jQuery);
(function ($) {
    // 登录注册页的顶部导航固定效果
    $(window).scroll(function () {
        var top = $(window).scrollTop();
        if (top > 40) {
            $('.s_nav').css({ "position": "fixed", "top": "0", "margin-left": "-570px", "left": "50%" });
        } else if (top < 40) {
            $('.s_nav').css({ "position": "absolute", "top": "60px" });
        }
    });
})(jQuery);
$.extend($.validator.messages, {
    required: "这是必填字段",
    remote: "请修正此字段",
    email: "请输入有效的电子邮件地址",
    url: "请输入有效的网址",
    date: "请输入有效的日期",
    dateISO: "请输入有效的日期 (YYYY-MM-DD)",
    number: "请输入有效的数字",
    digits: "只能输入数字",
    creditcard: "请输入有效的信用卡号码",
    equalTo: "你的输入不相同",
    extension: "请输入有效的后缀",
    maxlength: $.validator.format("最多可以输入 {0} 个字符"),
    minlength: $.validator.format("最少要输入 {0} 个字符"),
    rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
    range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
    max: $.validator.format("请输入不大于 {0} 的数值"),
    min: $.validator.format("请输入不小于 {0} 的数值")
});
$(function () {
    $('#form_reg').validate({
        errorClass: 'error',
        rules: {
            username: {
                required: true,
                rangelength: [6, 12],
                remote: {
                    url: 'http://10.31.161.13/konka_1-master/konka_1-master/lib/php/reg_message.php',
                    type: 'post'
                }
            },
            email: {
                required: true,
                email: true
            },
            uword: {
                required: true,
                rangelength: [6, 12]
            },
            sure: {
                required: true,
                equalTo: "#uword"
            }
        }
    });
});
(function () {
    // 用户登录;
    function addCookie(key, value, day) {

        var date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = key + '=' + encodeURI(value) + ';expires=' + date;
    }
    $('#btn').on('click', function () {
        var $username = $('#username').val();
        var $password = $('#password').val();
        var $email = $('#email').val();
        var phpUrl = 'http://10.31.161.13/konka_1-master/konka_1-master/lib/php/';
        $.ajax({
            type: 'post',
            url: phpUrl + 'login_message.php',
            data: {
                name: $username,
                pass: $password,
                email: $email
            },
            success: function success(data) {
                if (data == 1) {
                    addCookie('UserName', $username, 7);
                    location.href = '_index.html';
                } else {
                    $('#error').html('>>用户名,邮箱或密码错误<<');
                    $('#password').val();
                }
            }
        });
    });
    // 用户的登录、注册与注销操作;
    var user = getCookie('UserName');
    if (!user) {
        $('.head>.top_nav>.log_reg').css('display', 'block');
        $('.head>.top_nav>#user').css('display', 'none');
    } else {
        $('.head>.top_nav>.log_reg').css('display', 'none');
        $('.head>.top_nav>#user').css('display', 'block');
        $('#user>.username>a').html(user);
        // console.log(getCookie('UserName'));
        $('.exit').on('click', function () {
            var con = confirm('您确定要退出吗?');
            if (con == true) {
                delCookie('UserName', getCookie('UserName'));
                location.href = '_index.html';
            }
        });
    }
})();
(function ($) {
    // 顶部导航固定效果
    $(window).scroll(function () {
        var top = $(window).scrollTop();
        if (top > 40) {
            $('.s_nav').css({ "position": "fixed", "top": "0", "margin-left": "-570px", "left": "50%" });
        } else if (top < 40) {
            $('.s_nav').css({ "position": "relative" });
        }
    });
})(jQuery);
(function () {
    var phpUrl = 'http://10.31.161.13/konka_1-master/konka_1-master/lib/php/';
    $.ajax({
        url: phpUrl + '/_index.tvlist.php',
        dataType: 'json',
        success: function success() {
            $(function () {
                $("img.lazy").lazyload({
                    effect: "fadeIn"
                });
            });
        }
    }).done(function (data) {
        var $html = '<ul class="product_information clearfix">';
        $.each(data, function (index, value) {
            $html += '<li>\n            <div class="little_top_title" >\n                <span style="background-color:red">' + value.span_title + '</span>\n            </div>\n            <div class="product_img">\n                <a href="./details.html?id=' + value.sid + '" target"_blank">\n                    <img class="lazy" data-original="' + value.list_img + '" alt="' + value.description + '">\n                </a>\n            </div>\n            <h4 class="ellipsis">' + value.description + '</h4>\n            <div class="configuration_title ellipsis">' + value.information + '</div>\n            <p>\n                \uFFE5' + value.new_price + '\n                <del>&nbsp; \uFFE5' + value.del_price + '</del>\n            </p>\n            <div class="product_description" style="display:' + value.b_or_n + '">\n                <p class="ellipsis">' + value.evaluate + '</p>\n                <div class="product_star " style="' + value.start_level + '"></div>\n            </div>\n        </li>';
        });
        $html += '</ul>';
        $('.tvlist').html($html);
    });
})();
(function ($) {
    // 轮播图的turn_left & turn_right 的显示;
    $('.nav_banner>.second_nav_list,.nav_banner>.banner').on('mouseover', function () {
        $('.turn_left_limg>i').animate({
            right: 1500
        }, 500);
    });
})(jQuery);
(function ($) {
    // 楼梯导航
    $('.left_fixed_nav>ul>li>a').on('click', function (e) {
        e.preventDefault();
        var top = $("#" + $(this).attr('title')).offset().top;
        $('html,body').animate({
            scrollTop: top
        }, 500);
    });
})(jQuery);
(function ($) {
    // 明星产品左右切换
    var turnleft = $('.top_title_left');
    var turnright = $('.top_title_right');
    turnleft.click(function () {
        $('.product_message').animate({ "left": "0px" }, 1000);
    });
    turnright.click(function () {
        $('.product_message').animate({ "left": "-1140px" }, 1000);
    });
})(jQuery);
(function ($) {
    // 首页导航到明星列表的跳转;
    $('.head>.s_nav>.row>.hover>.to_tvlist,li>.to_tvlist').on('click', function (ev) {
        ev.preventDefault();
        var top = $("#" + $(this).attr('title')).offset().top;
        $('html,body').animate({
            scrollTop: top
        }, 500);
    });
})(jQuery);
(function () {
    // 右侧功能栏
    $(window).scroll(function () {
        var top = $(window).scrollTop();
        if (top > 500) {
            $('.totop').css({ "display": "block" });
        } else if (top < 500) {
            $('.totop').css({ "display": "none" });
        }
    });
})();
(function ($) {
    // 获取该锚点到浏览器顶部的距离， 然后给body添加动画
    $('.tool_title').click(function () {
        $('html,body').animate({
            scrollTop: 0
        }, 500);
    });
})(jQuery);
function objTotring(obj) {
    var arr = [];
    for (var i in obj) {
        arr.push(i + '=' + obj[i]);
    }
    return arr.join('&');
}

function fn_ajax(option) {
    var ajax = new XMLHttpRequest();

    //传送的方式(默认为'get');
    option.type = option.type || 'get';

    //如果接口错误，抛出错误;
    if (!option.url) {
        throw new Error('请输入正确的接口');
    }

    //是否异步;
    if (option.async == false || option.async == 'false') {
        option.async = false;
    } else {
        option.async = true;
    }

    // 判断数据类型(对象或字符串);
    if (option.data && _typeof(option.data) === 'object' && !Array.isArray(option.data)) {
        option.data = objTotring(option.data);
    } else if (option.data && typeof option.data === 'string') {
        option.data = option.data;
    }

    // 使用'get'传入数据;
    if (option.data && option.type == 'get') {
        option.url += '?' + option.data;
    }

    ajax.open(option.type, option.url, option.async);

    // 使用'post'传入数据;
    if (option.data && option.type == 'post') {
        ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        ajax.send(option.data);
    } else {
        ajax.send();
    }

    if (!option.async) {
        console.log(ajax.responseText);
    } else {
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4) {
                if (ajax.status === 200) {
                    option.success && option.success(ajax.responseText);
                } else {
                    option.error && option.error('接口地址有误:' + ajax.status);
                }
            }
        };
    }
}
(function () {
    var cookie = {
        get: function get(key) {
            if (document.cookie) {
                //判断是否存在cookie
                var str = document.cookie;
                var arr = str.split('; ');
                for (var i = 0; i < arr.length; i++) {
                    var item = arr[i].split('=');
                    if (item[0] === key) {
                        return item[1];
                    }
                }
                return '';
            }
        },
        set: function set(key, val, day) {
            if (day) {
                var d = new Date();
                d.setDate(d.getDate() + day);
                document.cookie = key + "=" + val + ";expires=" + d + ";path=/";
            } else {
                document.cookie = key + "=" + val + ";path=/";
            }
        },
        remove: function remove(key) {
            this.set(key, "", -1);
        }
    };
    window.cookie = cookie;
})();
/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.3
 *
 */

(function ($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function (options) {
        var elements = this;
        var $container;
        var settings = {
            threshold: 0,
            failure_limit: 0,
            event: "scroll",
            effect: "show",
            container: window,
            data_attribute: "original",
            skip_invisible: true,
            appear: null,
            load: null,
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;

            elements.each(function () {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) || $.leftofbegin(this, settings)) {
                    /* Nothing. */
                } else if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) {
                    $this.trigger("appear");
                    /* if we found an image we'll load, reset the counter */
                    counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });
        }

        if (options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = settings.container === undefined || settings.container === window ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function () {
                return update();
            });
        }

        this.each(function () {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function () {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />").bind("load", function () {

                        var original = $self.attr("data-" + settings.data_attribute);
                        $self.hide();
                        if ($self.is("img")) {
                            $self.attr("src", original);
                        } else {
                            $self.css("background-image", "url('" + original + "')");
                        }
                        $self[settings.effect](settings.effect_speed);

                        self.loaded = true;

                        /* Remove image from array so it is not looped next time. */
                        var temp = $.grep(elements, function (element) {
                            return !element.loaded;
                        });
                        elements = $(temp);

                        if (settings.load) {
                            var elements_left = elements.length;
                            settings.load.call(self, elements_left, settings);
                        }
                    }).attr("src", $self.attr("data-" + settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function () {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function () {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if (/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)) {
            $window.bind("pageshow", function (event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function () {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function () {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function (element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function (element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function (element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold + $(element).height();
    };

    $.leftofbegin = function (element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function (element, settings) {
        return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold": function belowTheFold(a) {
            return $.belowthefold(a, { threshold: 0 });
        },
        "above-the-top": function aboveTheTop(a) {
            return !$.belowthefold(a, { threshold: 0 });
        },
        "right-of-screen": function rightOfScreen(a) {
            return $.rightoffold(a, { threshold: 0 });
        },
        "left-of-screen": function leftOfScreen(a) {
            return !$.rightoffold(a, { threshold: 0 });
        },
        "in-viewport": function inViewport(a) {
            return $.inviewport(a, { threshold: 0 });
        },
        /* Maintain BC for couple of versions. */
        "above-the-fold": function aboveTheFold(a) {
            return !$.belowthefold(a, { threshold: 0 });
        },
        "right-of-fold": function rightOfFold(a) {
            return $.rightoffold(a, { threshold: 0 });
        },
        "left-of-fold": function leftOfFold(a) {
            return !$.rightoffold(a, { threshold: 0 });
        }
    });
})(jQuery, window, document);

//添加cookie的函数
function addCookie(key, value, day) {
    var date = new Date(); //创建日期对象
    date.setDate(date.getDate() + day); //过期时间：获取当前的日期+天数，设置给date
    document.cookie = key + '=' + encodeURI(value) + ';expires=' + date; //添加cookie，设置过期时间
}
//得到cookie
function getCookie(key) {
    var str = decodeURI(document.cookie);
    var arr = str.split('; ');
    for (var i = 0; i < arr.length; i++) {
        var arr1 = arr[i].split('=');
        if (arr1[0] == key) {
            return arr1[1];
        }
    }
}
//删除cookie
function delCookie(key, value) {
    addCookie(key, value, -1); //添加的函数,将时间设置为过去时间
}
