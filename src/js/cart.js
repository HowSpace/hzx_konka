(function($) {
    // 从cookie中拿取数据;
    var phpUrl = 'http://10.31.161.13/konka/lib/php/';
    var shop = cookie.get('shop');
    if (shop) {
        shop = JSON.parse(shop);
        console.log(shop);

        // console.log(allprice);
        var idList = shop.map(elm => elm.id).join();
        console.log(idList)
        $.ajax({
            type: "get",
            url: phpUrl + 'cart_getdata.php',
            data: {
                "idList": idList
            },
            dataType: 'json',
            success: function(data) {
                console.log(data);
                var template = "";
                data.forEach(function(elm) {
                    // console.log(elm);
                    var pic = elm.little_img.split(',')[0];
                    // console.log(pic)
                    var arr = shop.filter((val, i) => {
                        return val.id === elm.sid;
                    });
                    template = `
                    <div class="choose_comm">
                        <div class="commodity_check all_check">
                            <input class="alone_check_input little_check_point" type="checkbox" id="p-${elm.sid}" checked="checked" >
                        </div>
                        <div class="commodity_information commodity">
                            <div class="commodity_img">
                                <a href="./details.html">
                                    <img src="${pic}" alt="${elm.title}">
                                </a>
                            </div>
                            <div class="commodity_title ellipsis" >
                                <h5 href="./details.html">
                                    <a href="details.html" alt="${elm.title}">${elm.title}</a></h5>
                                <span>${elm.type}</span>
                                <p>${elm.description}</p>
                            </div>
                        </div>
                        <div class="commodity_alone_price alone_price">
                            <i style="color:red">￥&nbsp;</i>
                            <sapn class="little_alone_price">${elm.new_price}</sapn>
                        </div>
                        <div class="commodity_num num clearfix">
                            <div class="commodity_num_minus">
                                <span class="minus_btn">-</span>
                            </div>
                            <input class="check_num" type="number" value="${arr[0].num}" min="1" max="${elm.num}">
                                <div class="commodity_num_add">
                                    <span class="add_btn">+</span>
                                </div>
                            </div>
                            <div class="commodity_all_price all_price">
                                <i style="color:red">￥&nbsp;</i>
                                <span class="commodity_price">${(arr[0].num*elm.new_price).toFixed(2)}</span>
                            </div>
                            <div class="commodity_del operation">
                                <a>删除</a>
                            </div>
                        </div>
                    `;
                    $('.cart_body').append(template);
                    (function change() {
                        // 设置数量输入框的值为正整数,且不超过库存;
                        var reg = /^[1-9]+[0-9]*$/;
                        $('.check_num').off('blur').blur(function() {
                            console.log($(this).parents('.commodity_num').find('input'));
                            if (!reg.test($(this).parents('.commodity_num').find('input').val())) {
                                var num = $(this).parents('.commodity_num').find('input').val();
                                console.log('error');
                                $(this).parents('.commodity_num').find('input').val($(this).parents('.commodity_num').find('input').attr('max'))
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
                        $('.commodity_num_minus').off('click').on('click', function() {
                            // console.log($(this).parents('.commodity_num').find('input'));
                            var num = $(this).parents('.commodity_num').find('input').val();
                            // console.log($(this).parents('.commodity_num').find('input').val());
                            $(this).parents('.commodity_num').find('input').val(num - 1);
                            if ($(this).parents('.commodity_num').find('input').val() <= 1) {
                                $(this).parents('.commodity_num').find('input').val(1);
                            }
                        });
                        $('.commodity_num_add').off('click').on('click', function() {
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
            error: function() {
                alert('地址有误!')
            }
        }).done(function(data) {
            // 多选和全选;
            console.log($('.all_check_total'));
            // console.log($('.alone_check'));
            $('.all_check_total').on('click', function() {
                if ($(this).prop("checked")) {
                    // console.log('check');
                    $('.little_check_point').attr("checked", "checked");
                } else {
                    // console.log('no_check'[])
                    $('.little_check_point').removeAttr("checked");
                }
            });
            // 计算所选物品的件数,计算总价;
            $('.check_num').each(function(i, val) {
                console.log($(val).val());
            });
            console.log($('.commodity_price'));
        });
    }
})(jQuery);