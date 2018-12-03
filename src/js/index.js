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

    // 缓冲运动
    function startMove(dom, obj) {
      clearInterval(dom.timer)
      var target = obj.target
      // 判断方向
      dom.timer = setInterval(() => {
        iSpeed = (target - dom.offsetTop) / 4
        //..
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)
        if (dom.offsetTop == target) {
          clearInterval(dom.timer)
        } else {
          dom.style.top = dom.offsetTop + iSpeed + "px"
        }
      }, 20);


    }

    // 表单提交
    let subFeedback = () => {
      $(".form-item").submit(function () {
        var data = $(".form-item").serializeArray()
        for (var i = 0; i < data.length; i++) {
          var item = data[i].value
          if (item == '') {
            layer.msg('请完善反馈信息~~')
            return false
          }
        }
        return true
      })
    }

    // 分页切换
    let swithPage = () => {
      $(".page_num").on("click", function () {
        $(".page_num").removeClass("select")
        $(this).addClass("select")
        var index = $(this).index()
      })
    }

    root.swithPage = swithPage
    root.subFeedback = subFeedback
    root.startMove = startMove
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
  (function ($, root) {
    // get请求

    
    // post请求

    
  }(window.$, window.dyweb || (window.dyweb = {})));
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
        "preload": false,
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
      // 分类切换
      root.TagToggle(".fenlei-list-b .list-item", ".item-text")
      // 分页切换
      root.swithPage()
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
      // 实例化轮播
      var swiper = new Swiper('.swiper-container', {
        slidesPerView: 2,
        spaceBetween: 10,
        slidesPerGroup: 2,
        loop: true,
        loopFillGroupWithBlank: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });

    } else if (document.getElementById('centerPro')) {
      // 产品中心
      // 模块动效
      var oDom = document.getElementsByClassName('mark-down')
      $(".pro-item").each(function () {
        var i = $(this).index()
        var dom = oDom[i]
        $(this).find(".img-b").hover(function () {
          if (dom.offsetTop >= "-300") {
            root.startMove(dom, {
              target: 0,
            })
          }
        }, function (i) {
          if (dom.offsetTop <= "0") {
            root.startMove(dom, {
              target: -300,
            })
          }
        })
      })

      // 实例化轮播
      var mySwiper = new Swiper('#swiper1', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        initialSlide: 1,
        loop: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 81,
          modifier: 3,
          slideShadows: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

      })

      // 分页切换
      root.swithPage()

    } else if (document.getElementById('jionUs')) {
      // 招商加盟

    } else if (document.getElementById('contactUs')) {
      // 联系我们
      /* 地图组件 */
      var map = new BMap.Map("container");
      // 创建地图实例  
      var point = new BMap.Point(117.34897, 31.980139);
      // 创建点坐标  
      map.centerAndZoom(point, 15);
      var marker = new BMap.Marker(point); // 创建标注    
      map.addOverlay(marker); // 将标注添加到地图中

      // 提交反馈
      root.subFeedback()
    }
  }(window.$, window.dyweb || (window.dyweb = {})));

}())