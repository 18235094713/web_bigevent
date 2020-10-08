$(function() {
    // 获取用户信息
    getUserInfo();

    // 退出登录功能
    $('#btnLogout').on('click', function() {
        // 框架提供的询问框
        layer.confirm('是否退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 清空本地token
            localStorage.removeItem('token');
            // 页面跳转
            location.href = '/login.html';
            // layui自带的关闭询问框代码
            layer.close(index);
        });
    })
});

// 获取用户信息封装函数 写在入口函数外
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || '',
        // },
        success: function(res) {
            // 判断状态码
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            // 请求成功 想染用户头像信息
            renderAvatar(res.data);
        },
        // 无论成功与否 都触发complete方法
        // complete: function(res) {
        //     console.log(res);
        //     // 判断 如果身份认证失败 跳转回登录页面
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         // 删除本地token
        //         localStorage.removeItem('token');
        //         // 页面跳转
        //         location.href = '/login.html';
        //     }
        // }
    })
}

// 封装用户头像渲染函数
function renderAvatar(user) {
    // 用户名 昵称优先 没有的话用username
    var name = user.nickname || user.username;
    $('#welcome').html("欢迎&nbsp;&nbsp;" + name);
    // 用户头像
    if (user.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.user-avatar').hide();
    } else {
        // 没有头像
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase();
        $('.user-avatar').show().html(text);
    }
}