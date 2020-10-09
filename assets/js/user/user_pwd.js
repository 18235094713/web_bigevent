$(function() {
    // 定义校验规则
    var form = layui.form;
    form.verify({
        // 密码
        pwd: [/^[\S]{6,12}$/, '密码必须6~12位,且不能有空格'],
        // 新旧不重复
        samePwd: function(value) {
            var v2 = $('[name=oldPwd]').val();
            if (value == v2) {
                return '新旧密码不能相同';
            }
        },
        // 两次新密码必须相同
        rePwd: function(value) {
            var v3 = $('[name=newPwd]').val();
            if (value !== v3) {
                return '两次新密码输入不一致';
            }
        },
    })

    // 表单提交
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('修改密码成功');
                $('.layui-form')[0].reset();
            }
        })
    })
})