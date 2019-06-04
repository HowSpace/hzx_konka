(function() {
    // 用户登录;
    function addCookie(key, value, day) {

        var date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = key + '=' + encodeURI(value) + ';expires=' + date;
    }
    $('#btn').on('click', function() {
        var $username = $('#username').val();
        var $password = $('#password').val();
        var $email = $('#email').val();
        var phpUrl = 'http://10.31.161.13/konka/lib/php/';
        $.ajax({
            type: 'post',
            url: phpUrl + 'login_message.php',
            data: {
                name: $username,
                pass: $password,
                email: $email
            },
            success: function(data) {
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
        $('.exit').on('click', function() {
            var con = confirm('您确定要退出吗?');
            if (con == true) {
                delCookie('UserName', getCookie('UserName'));
                location.href = '_index.html';
            }
        });
    }
})();