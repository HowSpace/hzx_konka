(function($) {
    // 商品详情导航
    $(window).scroll(function() {
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
    var phpUrl = 'http://10.31.161.13/konka/lib/php/';
    $.ajax({
        type: 'get',
        url: phpUrl + 'details_getdata.php',
        data: {
            id: sid
        },
        dataType: 'json',
        success: function(data) {
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
            var template = `
            <div class="product_introduction_nav" style="display: none">
                <div class="content clearfix">
                    <div class="product_title ellipsis">
                        ${value.title}
                    </div>
                    <div class="product_catalog clearfix">
                    <ul class="catalog clearfix">
                        <li class="catalog_introdsuce active">
                            <a href="#">详情介绍</a>
                        </li>
                        <li class="catalog_parameter">
                            <a href="#">规格参数</a>
                        </li>
                        <li class="catalog_evaluate">
                            <a href="#">晒单评价</a>
                        </li>
                        <li class="catalog_sale">
                            <a href="#">售后服务</a>
                        </li>
                        <li class="catalog_consult">
                            <a href="#">咨询服务</a>
                        </li>
                    </ul>
                    <div class="buy_btn">
                        <a href="./cart.html">立即购买</a>
                    </div>
                </div>
            </div>
        </div>
            <div class="content clearfix">
            <div class="commodity_message clearfix">
                <div class="commodity_little_title">
                    <a href="#">电视</a>&nbsp;>&nbsp;
                    <a href="#">${value.type}</a>&nbsp;>&nbsp;
                    <span>${value.title}</span>
                </div>
                <div class="commodity_show">
                    <div class="big_show">
                        <img src=${littlearr[0]}>
                        <span class="big_show_span"></span>
                    </div>
                    <div class="magnifying_glass clearfix">
                        <i class="iconfont totop_list">&#xf01a3;
                            </i>
                        <ul class="commodity_list">
                            <li class="now_img">
                                <img src=${littlearr[0]}>
                            </li>
                            <li>
                                <img src=${littlearr[1]}>
                            </li>
                            <li>
                                <img src=${littlearr[2]}>
                            </li>
                            <li>
                                <img src=${littlearr[3]}>
                            </li>

                        </ul>
                        <i class="iconfont todown_list">&#xf01a6;</i>
                    </div>
                    <div class="the">
                        <img src=${showarr[0]}>
                    </div>
                </div>
                <div class="join_cart">
                    <h3>${value.title}</h3>
                    <div class="title">${value.description}</div>
                    <div class="price">
                        <span class="new_price">￥${value.new_price}</span>
                        <del class="old_price">￥${value.del_price}</del>
                        <span class="phone_pay"><i class="iconfont">&#xe646;手机购买</i>
                            <img src="https://www.konka.com/openapi/qrcode/encode/size/5/margin/5?txt=https%3A%2F%2Fwww.konka.com%2Fm%2Fitem-595.html" alt="">
                        </span>
                    </div>
                    <div class="num clearfix">
                        <span>数量</span>
                        <a class="minus">-</a>
                        <input type="number" id="count" value="1" min="1" max="${value.num}">
                        <a class="add">+</a>
                    </div>
                    <div class="btn_list clearfix">
                        <div class="buy_btn">立即购买</div>
                        <div class="join_cart_btn">加入购物车</div>
                    </div>
                </div>
                </div>
                <div class="commodity_img_message">
                    <div class="commodity_img_title ">
                        <ul class="clearfix">
                            <li class="introduce active">
                                <a href="#">详情介绍</a>
                            </li>
                            <li class="parameter">
                                <a href="#">规格参数</a>
                            </li>
                            <li class="evaluate">
                                <a href="#">晒单评价</a>
                            </li>
                            <li class="sale">
                                <a href="#">售后服务</a>
                            </li>
                            <li class="consult">
                                <a href="#">咨询服务</a>
                            </li>
                        </ul>
                    </div>
                    <div class="commodity_img_list">
                        <img src=${introarr[0]}>
                        <img src=${introarr[1]}>
                        <img src=${introarr[2]}>
                        <img src=${introarr[3]}>
                        <img src=${introarr[4]}>
                        <img src=${introarr[5]}>
                        <img src=${introarr[6]}>
                        <img src=${introarr[7]}>
                    </div>
                </div>
            `;
            $('.delails_show_box').append(template).find('.join_cart_btn').on('click', function() {
                addShopCar(value.sid, value.new_price, $('#count').val());
            });
            // 放大镜效果;
            $(function() {
                var ione = $(".big_show"),
                    ithe = $(".the"),
                    itwo = $(".commodity_list li"),
                    tthe = $(".the img");
                var arr = getCookie('littlearr').split(',');
                var oarr = getCookie('showimg').split(',');
                console.log(arr);
                console.log(oarr);

                itwo.each(function(i) {
                    $(this).click(function() {
                        $(".big_show img").attr("src", arr[i])
                        tthe.attr("src", oarr[i])
                        itwo.removeClass("now_img")
                        $(this).addClass("now_img")
                    })

                    ione.mousemove(function(a) {
                        var evt = a || window.event
                        ithe.css('display', 'block')
                        var ot = evt.clientY - ($(".commodity_list").offset().top - $(document).scrollTop()) - 87;
                        var ol = evt.clientX - ($(".commodity_list").offset().left - $(document).scrollLeft()) - 87;
                        if (ol <= 0) {
                            ol = 0;
                        }
                        if (ot <= 0) {
                            ot = 0;
                        }
                        if (ol >= 175) {
                            ol = 175
                        }
                        if (ot >= 175) {
                            ot = 175
                        }
                        $(".big_show_span").css({ 'left': ol, 'top': ot })
                        var ott = ot / 350 * 800
                        var oll = ol / 350 * 800
                        tthe.css({ 'left': -oll, 'top': -ott })
                    })
                    ione.mouseout(function() {
                        ithe.css('display', 'none')
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
                    if (shop.some(elm => elm.id == id)) {
                        shop.forEach(function(elm, i) {
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
        error: function() {
            alert('error');
        }
    }).done(function() {
        // 设置数量输入框的值为正整数,且不超过库存;
        var reg = /^[1-9]+[0-9]*$/;
        $('#count').off('blur').blur(function() {
            console.log($(this).parents('.num').find('input'));
            if (!reg.test($(this).parents('.num').find('input').val())) {
                var num = $(this).parents('.num').find('input').val();
                console.log('error');
                $(this).parents('.num').find('input').val($(this).parents('.um').find('input').attr('max'))
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
        $('.minus').off('click').on('click', function() {
            var num = $(this).parents('.num').find('input').val();
            $(this).parents('.num').find('input').val(num - 1);
            if ($(this).parents('.num').find('input').val() <= 1) {
                $(this).parents('.num').find('input').val(1);
            }
        });
        $('.add').off('click').on('click', function() {
            var num = Number($(this).parents('.num').find('input').val());
            $(this).parents('.num').find('input').val(num + 1);
            if ($(this).parents('.num').find('input').val() >= $(this).parents('.num').find('input').attr('max')) {
                $(this).parents('.num').find('input').val($(this).parents('.num').find('input').attr('max'));
            }
        });
    })
})(jQuery);