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
$(function() {
    $('#form_reg').validate({
        errorClass: 'error',
        rules: {
            username: {
                required: true,
                rangelength: [6, 12],
                remote: {
                    url: 'http://10.31.161.13/konka/lib/php/reg_message.php',
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