$(function() {
    // 自定义校验规则
    var form = layui.form;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '请输入1~6个字符';
            }
        }
    });

    // 初始化用户信息
    initUserInfo();
    // 导出layer
    var layer = layui.layer;
    // 封装函数
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 成功后渲染
                form.val('formUserInfo', res.data);
            }
        })
    }

    // 表单重置
    $('#btnReset').on('click', function(e) {
        // 阻止重置
        e.preventDefault();
        // 从新用户渲染
        initUserInfo();
    })

    // 修改用户信息
    $('.layui-form').on('submit', function(e) {
        // 阻止默认提交
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 成功
                layer.msg('修改用户信息成功');
                // 调用父框架的全局方法
                window.parent.getUserInfo();
            }
        })
    })
})