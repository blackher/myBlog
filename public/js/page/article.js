
define(["jquery","notie"], function ($,notie) {
    var page = {
        init: function() {
            this.render();
            this.bindEvents();
        },
        render: function(){
            this.initUserInfo()
        },
        bindEvents: function () {
            this.onDelArticle();
            this.onComment();
            this.onDelComment();
            this.onHideComment();
            this.onReplay();

        },

        initUserInfo: function () {
            var nickname = localStorage.getItem('commentNickname');
            var blog = localStorage.getItem('commentBlog');
            if(nickname || blog){
                $(".nickname").val(nickname);
                $(".blogAddress").val(blog);
            }
        },
        onDelArticle: function () {
            $(".J_delArticle").on("click", function () {
                var title = $(".title");
                var articleId = title.attr("data-articleId");
                var authorId = title.attr("data-authorId");
                var data = {
                    articleId: articleId,
                    authorId: authorId
                };
                $.ajax({
                    type: 'post',
                    data: data,
                    url: '/removeArticle',
                    success: function (data) {
                        if (data.code === 0) {
                            alert(data.message);
                            window.location.href = "/";
                        } else {
                            console.log(data);
                            alert(data.message);
                        }
                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            });
        },

        onComment: function () {
            $(".J_comment").on("click", function () {
                var _this = $(this);
                var articleId = $(".title").attr("data-articleId");
                var nickname = $(".nickname").val();
                var blog = $(".blogAddress").val() || "";
                var content = $(".commentValue").val();
                var data = {
                    articleId: articleId,
                    nickname: nickname.trim(),
                    blog: blog.trim(),
                    content: content.trim()
                };

                if(!localStorage.getItem('commentNickname') || (!localStorage.getItem('commentBlog') && blog) ){
                    localStorage.setItem('commentNickname', nickname);
                    localStorage.setItem('commentBlog', blog);
                }
                $.ajax({
                    type: 'post',
                    data: data,
                    url: '/pubComment',
                    success: function (data) {
                        if (data.code === 0) {
                            alert(data.message);

                        } else {
                            console.log(data);
                            alert(data.message);
                        }
                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            });
        },
        onDelComment: function () {
            $(".J_delComment").on("click", function () {
                var target = $(this).parents("li");
                var commentId = target.attr("data-commentId");
                var articleAuthorId = $(".title").attr("data-authorId");
                var data = {
                    commentId: commentId,
                    articleAuthorId: articleAuthorId
                };
                $.ajax({
                    type: 'post',
                    data: data,
                    url: '/delComment',
                    success: function (data) {
                        if (data.code === 0) {
                            alert(data.message);
                        } else {
                            console.log(data);
                            alert(data.message);
                        }
                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            });
        },
        onHideComment: function () {
            $(".J_hideComment").on("click", function () {
                var target = $(this).parents("li");
                var commentId = target.attr("data-commentId");
                var articleAuthorId = $(".title").attr("data-authorId");
                var data = {
                    commentId: commentId,
                    articleAuthorId: articleAuthorId
                };
                $.ajax({
                    type: 'post',
                    data: data,
                    url: '/hideComment',
                    success: function (data) {
                        if (data.code === 0) {
                            alert(data.message);
                        } else {
                            console.log(data);
                            alert(data.message);
                        }
                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            });
        },

        onReplay: function () {
            var html = $(".pub-comment").html();
            $(".J_replay").on("click", function () {
                var _this = $(this);
                var oLi = _this.parents('li.comment-item');
                var target = oLi.find('.nickname');
                if(oLi.find('.pub-replay').length == 0){
                    oLi.append('<div class="pub-replay">' + html + '</div>');
                    _this.text('取消回复');
                }else{
                    oLi.find('.pub-replay').remove();
                    _this.text('回复');
                }
            });
        }
    };
    page.init();


});