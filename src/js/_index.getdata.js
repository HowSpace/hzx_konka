(function() {
    $.ajax({
        url: 'http://10.31.161.13/konka/lib/php/_index.tvlist.php',
        dataType: 'json',
        success: function() {
            $(function() {
                $("img.lazy").lazyload({
                    effect: "fadeIn"
                });
            });
        }
    }).done(function(data) {
        var $html = '<ul class="product_information clearfix">';
        $.each(data, function(index, value) {
            $html +=
                `<li>
            <div class="little_top_title" >
                <span style="background-color:red">${value.span_title}</span>
            </div>
            <div class="product_img">
                <a href="./details.html?id=${value.sid}" target"_blank">
                    <img class="lazy" data-original="${value.list_img}" alt="${value.description}">
                </a>
            </div>
            <h4 class="ellipsis">${value.description}</h4>
            <div class="configuration_title ellipsis">${value.information}</div>
            <p>
                ￥${value.new_price}
                <del>&nbsp; ￥${value.del_price}</del>
            </p>
            <div class="product_description" style="display:${value.b_or_n}">
                <p class="ellipsis">${value.evaluate}</p>
                <div class="product_star " style="${value.start_level}"></div>
            </div>
        </li>`;
        });
        $html += '</ul>';
        $('.tvlist').html($html);
    });
})();