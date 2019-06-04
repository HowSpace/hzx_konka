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
    if (option.data && typeof option.data === 'object' && !Array.isArray(option.data)) {
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
        ajax.onreadystatechange = function() {
            if (ajax.readyState === 4) {
                if (ajax.status === 200) {
                    option.success && option.success(ajax.responseText);
                } else {
                    option.error && option.error('接口地址有误:' + ajax.status);
                }
            }
        }
    }
}