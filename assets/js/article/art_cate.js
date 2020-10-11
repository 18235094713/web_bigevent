$(function() {
    initArtCateList();
    // 封装函数
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function(res) {
                var str = template('tpl-art-cate', res);
                $('tbody').html(str);
            }
        })
    }

    // 显示添加文章分类列表
    var layer = layui.layer;
    $('#btnAdd').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '260px'],
            content: $('#dialog-add').html(),
        });
    })

    var indexAdd = null;
    // 通过代理的形式 为添加表单绑定submit
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 添加成功 重新渲染页面中的数据
                initArtCateList();
                layer.msg('文章添加成功,请查看');
                layer.close(indexAdd);
            }
        })
    })

    // 通过代理的形式 为修改表单绑定click
    var indexEdit = null;
    var form = layui.form;
    $('tbody').on('click', '.btn-edit', function() {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '260px'],
            content: $('#dialog-edit').html(),
        });

        var Id = $(this).attr('data-id');
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function(res) {
                form.val('form-edit', res.data);
            }
        })
    })

    // 修改 提交
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                initArtCateList();
                layer.msg('文章更新成功');
                layer.close(indexEdit);
            }
        })
    })

    // 删除
    $('tbody').on('click', '.btn-delete', function() {
        // 先获取Id 进入到函数中this指向就改变了
        var Id = $(this).attr('data-id');
        // 显示对话框
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' },
            function(index) {
                $.ajax({
                    method: 'GET',
                    url: '/my/article/deletecate/' + Id,
                    success: function(res) {
                        if (res.status !== 0) {
                            return layer.msg(res.message);
                        }
                        // 更新成功 重新渲染页面中的数据
                        initArtCateList();
                        layer.msg('文章删除成功');
                        layer.close(index);
                    }
                })
            });
    })

})