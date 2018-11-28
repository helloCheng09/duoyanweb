(function () {
  /**
   * 全局数据
   * data.js
   */
  // 定义变量
  let root = window.dyweb;

  /****************************************************************************** */
  /**
   * 点击
   * click.js
   */
  (function ($, root) {
    // 标签切换
    let TagToggle = (btn, styleEle, panels) => {
      let curIndex
      let lastIndex = 0
      let dataid
      $(btn).unbind()
      $(btn).on("click", function (event) {
        curIndex = $(this).index()
        if (curIndex === lastIndex) {
          // 不变
          return false;
        } else {
          dataid = $(this).attr("data-id")
          $(this).find(styleEle).toggleClass("select")
          $(btn).eq(lastIndex).find(styleEle).removeClass("select")
          // 展示
          // $(panels).eq(lastIndex).hide()
          // $(panels).eq(curIndex).show()
          lastIndex = curIndex;
        }
      })
    }

    root.TagToggle = TagToggle
  }(window.$, window.dyweb || (window.dyweb = {})));

  /****************************************************************************** */
  /**
   * 渲染
   * render.js
   */
  (function ($, root) {}(window.$, window.dyweb || (window.dyweb = {})));

  /****************************************************************************** */
  /**
   * 初始化
   * init.js
   */
  (function ($, root) {}(window.$, window.dyweb || (window.dyweb = {})));


  /****************************************************************************** */
  /**
   * 获取
   * getData.js
   */
  (function ($, root) {}(window.$, window.dyweb || (window.dyweb = {})));
  /****************************************************************************** */
  /**
   * 入口
   * index.js
   */
  (function ($, root) {

    if (document.getElementById('dyIndex')) {
      // 首页
      // 实例化轮播
      var mySwiper = new Swiper('#swiper1', {
        pagination: {
          el: '.swiper-pagination',
        },
        autoplay: true, //可选选项，自动滑动
      })

      // 实例化播放器
      var player = new Aliplayer({
        "id": "player-con",
        "source": "//player.alicdn.com/video/aliyunmedia.mp4",
        "width": "400px",
        "height": "300px",
        "autoplay": false,
        "isLive": false,
        "cover": "http://www.wangjiao.com/data/upload/2018/1121/17/5bf52adbcfd74_266_170.jpg",
        "rePlay": false,
        "playsinline": true,
        "preload": true,
        "controlBarVisibility": "hover",
        "useH5Prism": true,
        "skinLayout": [{
            "name": "bigPlayButton",
            "align": "blabs",
            "x": 30,
            "y": 80
          },
          {
            "name": "H5Loading",
            "align": "cc"
          },
          {
            "name": "errorDisplay",
            "align": "tlabs",
            "x": 0,
            "y": 0
          },
          {
            "name": "infoDisplay"
          },
          {
            "name": "tooltip",
            "align": "blabs",
            "x": 0,
            "y": 56
          },
          {
            "name": "thumbnail"
          },
          {
            "name": "controlBar",
            "align": "blabs",
            "x": 0,
            "y": 0,
            "children": [{
                "name": "progress",
                "align": "blabs",
                "x": 0,
                "y": 44
              },
              {
                "name": "playButton",
                "align": "tl",
                "x": 15,
                "y": 12
              },
              {
                "name": "timeDisplay",
                "align": "tl",
                "x": 10,
                "y": 7
              },
              {
                "name": "fullScreenButton",
                "align": "tr",
                "x": 10,
                "y": 12
              },
              {
                "name": "volume",
                "align": "tr",
                "x": 5,
                "y": 10
              }
            ]
          }
        ]
      }, function (player) {
        console.log("播放器创建了。");
      });


    } else if (document.getElementById('centerNews')) {
      // 新闻中心
      root.TagToggle(".fenlei-list-b .list-item", ".item-text")
    } else if (document.getElementById('aboutUs')) {
      // 关于我们
      var player = new Aliplayer({
        "id": "player-con",
        "source": "//player.alicdn.com/video/aliyunmedia.mp4",
        "width": "1200px",
        "height": "670px",
        "autoplay": false,
        "isLive": false,
        "cover": "http://www.xinhuanet.com/politics/leaders/2018-11/27/1123776081_15433528499741n.jpg",
        "rePlay": false,
        "playsinline": true,
        "preload": false,
        "controlBarVisibility": "hover",
        "useH5Prism": true,
        "skinLayout": [
          {
            "name": "bigPlayButton",
            "align": "blabs",
            "x": 30,
            "y": 80
          },
          {
            "name": "H5Loading",
            "align": "cc"
          },
          {
            "name": "errorDisplay",
            "align": "tlabs",
            "x": 0,
            "y": 0
          },
          {
            "name": "infoDisplay"
          },
          {
            "name": "tooltip",
            "align": "blabs",
            "x": 0,
            "y": 56
          },
          {
            "name": "thumbnail"
          },
          {
            "name": "controlBar",
            "align": "blabs",
            "x": 0,
            "y": 0,
            "children": [
              {
                "name": "progress",
                "align": "blabs",
                "x": 0,
                "y": 44
              },
              {
                "name": "playButton",
                "align": "tl",
                "x": 15,
                "y": 12
              },
              {
                "name": "timeDisplay",
                "align": "tl",
                "x": 10,
                "y": 7
              },
              {
                "name": "fullScreenButton",
                "align": "tr",
                "x": 10,
                "y": 12
              },
              {
                "name": "volume",
                "align": "tr",
                "x": 5,
                "y": 10
              }
            ]
          }
        ]
      }, function (player) {
          console.log("播放器创建了。");
        }
      );
    }
  }(window.$, window.dyweb || (window.dyweb = {})));

}())