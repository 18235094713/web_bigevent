$(function() {
    // 1.显示隐藏切换
    // 点击去注册账号的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击去登录的链接
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 2.自定义校验规则
    // 从layui 中获取form 对象
    var form = layui.form;
    // 通过form.verify() 函数自定义校验规则
    form.verify({
        // 自定义一个叫做pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        // 确认密码规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败 则return一个提示消息即可
            // '.reg-box input[name=password]'
            // 选择器选择的是后代中name属性值为password的那个标签
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致!';
            }
        }
    })

    // 3.注册功能
    var layer = layui.layer;
    $('#form_reg').on('submit', function(e) {
        // 阻止表单提交
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: function(res) {
                // 返回状态判断
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // 提交成功后处理代码
                layer.msg('注册成功,请登录');
                // 手动切换到登录表单
                $('#link_login').click();
            }
        })
    });

    // 登录功能 给form标签绑定事件 button按钮触发提交事件
    $('#form_login').submit(function(e) {
        // 阻止表单提交
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                // 返回状态判断
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // 提示信息 保存token 跳转页面
                layer.msg('登录成功!');
                // 保存token 未来的接口要使用token
                localStorage.setItem('token', res.token);
                // 跳转
                location.href = '/index.html';
            }
        })
    });

})