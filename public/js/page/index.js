define(["jquery"], function ($) {

    $("#logout").on("click", function () {
        console.log(1)
        $.ajax({
            type: 'post',
            data: "",
            url: '/logout',
            success: function (data) {
                if (data.code === 0) {
                    alert("登出成功");
                    window.location.href = "/";
                } else {
                    console.log("code:" + data.code + " error:" + data.text);
                    alert(data.text);
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    });

    $(".J_delArticle").on("click", function () {
        var articleId = $(this).data("id");
        var data = {
            _id: articleId
        };
        $.ajax({
            type: 'post',
            data: data,
            url: '/removeArticle',
            success: function (data) {
                if (data.code === 0) {
                    alert(data.text);
                    window.location.href = "/";
                } else {
                    console.log("code:" + data.code + " error:" + data.text);
                    console.log(data);
                    alert(data.text);
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    });

    var pageCount = 0;
    $("#loadMore").on("click", function () {
        var $this = $(this);
        if ($this.hasClass("pure-button-disabled")) return;

        $this.addClass("pure-button-disabled");
        pageCount++;
        var limit = 2;
        var start = pageCount * limit;
        var data = {
            limit: limit,
            start: start
        };

        $.ajax({
            type: 'post',
            data: data,
            url: '/article',
            success: function (data) {
                console.log(data);
                if (data.code === 0) {
                    console.log(data.body);
                    var articles = data.body;
                    var html = "";
                    var username = $("#user").data("username");
                    $.each(articles, function (i, v) {
                        /**
                         * TODO 通过用户ID判断
                         */
                        var userClass = username == v.username ? 'mine' : 'other';
                        html += "<li class='animated fadeIn'>" +
                            "<h4><a href='/article/" + v._id + "' target='_blank'>" + v.title + "</a></h4>" +
                            "<h5>" +
                            "<em>By</em>" +
                            "<span class='" + userClass + "'>" + v.username + "</span>" +
                            "<em>Under</em>" +
                            "<span class='type'>" + v.type + "</span>" +
                            "<em>On</em>" +
                            "<span class='time'>" + v.time.minute + "</span>" +
                            "</h5>" +
                            "<p>" + v.info + "</p></li>"
                    });
                    $(".article-list").append(html);
                    $this.removeClass("pure-button-disabled");
                } else {
                    console.log(data.message)
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    })
});