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
          $(panels).eq(lastIndex).hide()
          $(panels).eq(curIndex).show()
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
    // 放大图片
    function maxPic() {
      $(".pro-pic").on("click", function () {
        $(this).next(".max-pic").show(function () {
          $(this).on("click", function () {
            $(this).hide()
          })
        })
      })
    }
    // 产品详情 选择对应图片呢
    let togPic = () => {
      var curIndex = null
      var lastIdex = 0
      $(".small-pic-b").children(".small-item").on("click", function () {
        curIndex = $(this).index()
        var that = $(this)
        if (curIndex != lastIdex) {
          $('.small-item').removeClass("select")
          $('.small-item').eq(curIndex).addClass("select")
          // 取图片地址 
          var picUrl = "url(" + that.find('.samll-pic').attr('data-url') + ")"
          // var picUrl = that.find('.samll-pic').attr('data-url')
          // 赋给展示图片
          $(".main-pro-pic .pro-pic").css("backgroundImage", picUrl)
          console.log(picUrl)
          lastIdex = curIndex
        } else {
          return false
        }
      })
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
    // 产品系列切换
    let switchTag = () => {
      $(".tag-switch .tag-item").each(function () {
        $(this).on("click", function () {
          $(".tag-switch .tag-text").removeClass('select')
          $(this).children(".tag-text").toggleClass("select")
          var cid = $(this).attr('data-id')
          var changeLock = true
          root.ProCentTrigger(cid, changeLock)
          console.log(cid)
        })
      })
    }
    root.switchTag = switchTag
    root.togPic = togPic
    root.maxPic = maxPic
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
  (function ($, root) {
    // 产品中心动效
    function animationCenterPro() {
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
    }
    root.animationCenterPro = animationCenterPro
    // 产品中心渲染
    function renderProCent(dataObj) {
      var productCate = dataObj.productCate
      var productList = dataObj.productList
      console.log('jinru渲染 产品中心', productList)
      var htmlProList = ''
      productList.data.forEach(item => {
        var cid = item.cid
        var id = item.id
        var img = imgRoot + item.img
        var name = item.name
        // http://www.ahqlzysw.com/upload
        htmlProList += `
          <li class="pro-item">
            <div class="img-b">
                <a href="/portal/detpro?id=${id}" class="pro-link">
                    <div class="img-det" style="background-image:url(${img});"></div>
                    <div class="mark-down" style="top: -300px;"></div>
                    <div class="link-text">
                        <p class="link-more">了解详情</p>
                    </div>
                </a>
            </div>
            <div class="pro-des">
                <div class="des-text two-ellipsis">${name}</div>
            </div>
           </li>
          `
      });
      $('.procent_list_p').empty().append(htmlProList)
      // 模块动效
      root.animationCenterPro()
    }
    root.renderProCent = renderProCent
  }(window.$, window.dyweb || (window.dyweb = {})));
  /****************************************************************************** */
  /**
   * 初始化
   * init.js
   */
  (function ($, root) {
    // 初始化产品列表
    let ProCentTrigger = (cid, changeLock) => {
      // ajax获取信息
      var dataSent = {
        cid: cid,
        page: 1
      }
      if (!changeLock) {
        // 首次不渲染
        root.getModule(cate_change, dataSent)
      } else {
        // 首次渲染
        root.getModuleThird(cate_change, dataSent)
      }
    }
    root.ProCentTrigger = ProCentTrigger
    // 首页视频
    function initIndexVideo(videourl) {
      // data = $.parseJSON(videourl);
      // 实例化播放器
      var player = new Aliplayer({
        "id": "player-con",
        "source": videourl,
        "width": "400px",
        "height": "300px",
        "autoplay": false,
        "isLive": false,
        // "cover": coverurl,
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
      }, function (player) {});
    }
    // 关于我们视频
    function initAboutVideo(videourl) {
      // data = $.parseJSON(videourl);
      var player = new Aliplayer({
        "id": "player-con",
        "source": videourl,
        "width": "1200px",
        "height": "670px",
        "autoplay": false,
        "isLive": false,
        // "cover": ,
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
      }, function (player) {});
    }
    root.initAboutVideo = initAboutVideo
    root.initIndexVideo = initIndexVideo
  }(window.$, window.dyweb || (window.dyweb = {})));
  /****************************************************************************** */
  /**
   * 获取
   * getData.js
   */
  (function ($, root) {
    // get请求
    function getModule(url, data) {
      var url = url
      // console.log(url)
      $.ajax({
        url: url,
        type: 'GET',
        data: data,
        success: function (result) {
          console.log(result)
          if (document.getElementById('centerPro')) {
            // 产品分类介绍
            var productCate = result.data.productcate
            var productList = result.data.product
            // console.log(productCate, productList)
            // 分页切换
            var count = productList.total
            var limit = productList.per_page
            layui.use('laypage', function () {
              var laypage = layui.laypage;
              //执行一个laypage实例
              laypage.render({
                elem: 'pageWrap',
                theme: '#ffedea', //主题颜色
                limit: limit, //每页显示数量
                count: count, //数据总数，从服务端得到
                jump: function (obj, first) { //回调函数
                  if (!first) {
                    // 非首次加载
                    var currPage = this.curr
                    var dataSent = {
                      cid: 1,
                      page: currPage
                    }
                    getModuleSec(url, dataSent)
                  }
                }
              });
            });
          }
        },
        error: getError
      })
    }

    function getModuleSec(url, data) {
      var url = url
      // console.log(url)
      $.ajax({
        url: url,
        type: 'GET',
        data: data,
        success: function (result) {
          if (document.getElementById('centerPro')) {
            // 产品分类介绍
            var productCate = result.data.productcate
            // 产品分类列表
            var productList = result.data.product
            // console.log(productCate, productList)
            // 分页切换
            var count = productList.total
            var limit = productList.per_page
            root.renderProCent({
              productCate: productCate,
              productList: productList
            })
          }
        },
        error: getError
      })
    }
    root.getModuleSec = getModuleSec

    function getModuleThird(url, data) {
      var url = url
      // console.log(url)
      $.ajax({
        url: url,
        type: 'GET',
        data: data,
        success: function (result) {

          if (document.getElementById('centerPro')) {
            console.log('产品中心')
            // 产品分类介绍
            var productCate = result.data.productcate
            // 产品列表
            var productList = result.data.product

            var topImg = 'url(' + imgRoot + productCate.img + ')'
            var topCateId = productCate.id
            var topCateName = productCate.name
            var topCateEgName = productCate.name_eng
            var topCateTitle = productCate.title
            $('.top_cate .bg-img').css('backgroundImage', topImg)
            $('.top_cate h3').text(topCateName)
            $('.top_cate .des-pro .text-item ').text(topCateEgName)
            $('.top_cate .text-con').text(topCateTitle)
            console.log(9999999)
            console.log(productList)
            // 产品分类列表
            // console.log(productCate, productList)
            // 分页切换
            var count = productList.total
            var limit = productList.per_page
            var dataid = $('.tag-switch .select').parent('.tag-item').data('id')
            layui.use('laypage', function () {
              var laypage = layui.laypage;
              //执行一个laypage实例
              laypage.render({
                elem: 'pageWrap',
                theme: '#ffedea', //主题颜色
                limit: limit, //每页显示数量
                count: count, //数据总数，从服务端得到
                jump: function (obj, first) { //回调函数
                  console.log(obj)
                  if (!first) {
                    // 非首次加载
                    var currPage = this.curr
                    var dataSent = {
                      cid: dataid,
                      page: currPage
                    }
                    getModuleSec(url, dataSent)
                  } else {
                    var dataSent = {
                      cid: dataid,
                      page: 1
                    }
                    getModuleSec(url, dataSent)
                  }
                }
              });
            });
          }
        },
        error: getError
      })
    }
    root.getModuleThird = getModuleThird
    // post请求
    function postModule(url) {
      var url = url
      // console.log(url)
      $.ajax({
        url: url,
        type: 'POST',
        success: function (result) {
          // console.log(result)
        },
        error: getError
      })
    }
    // 请求失败
    function getError() {
      console.log("链接失败")
    }
    root.postModule = postModule
    root.getModule = getModule
  }(window.$, window.dyweb || (window.dyweb = {})));
  /****************************************************************************** */
  /**
   * 入口
   * index.js
   */
  (function ($, root) {
    if (document.getElementById('dyIndex')) {
      // 首页
      root.initIndexVideo(videoSrc)
      // 实例化轮播
      var mySwiper = new Swiper('#swiper1', {
        pagination: {
          el: '.swiper-pagination',
        },
        autoplay: true, //可选选项，自动滑动
      })
    } else if (document.getElementById('centerNews')) {
      // 新闻中心s
      // 分类切换
      // root.TagToggle(".fenlei-list-b .list-item", ".item-text")
      // 分页切换
      root.swithPage()
    } else if (document.getElementById('aboutUs')) {
      // 关于我们
      root.initAboutVideo(videoSrc)
      // 实例化轮播
      var swiper = new Swiper('#swiper1', {
        slidesPerView: 2,
        spaceBetween: 10,
        slidesPerGroup: 2,
        loop: true,
        autoplay: true,
        loopFillGroupWithBlank: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
      // 实例化轮播
      var honorSwiper = new Swiper('#swiperHornor', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        initialSlide: 1,
        loop: true,
        autoplay: true,
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
    } else if (document.getElementById('centerPro')) {
      // 产品中心
      // 模块动效
      root.animationCenterPro()
      // 实例化轮播
      var mySwiper = new Swiper('#swiper1', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        initialSlide: 1,
        loop: true,
        autoplay: true,
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
      // 分类切换 
      root.switchTag()
      // 产品中心初始请求
      var cid = $('.tag-item').eq(0).data('id')
      var changeLock = false
      root.ProCentTrigger(cid, changeLock)
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
    } else if (document.getElementById('detPro')) {
      // 产品详情
      // 产品图片最大化
      root.maxPic()
      // 产品图片切换
      root.togPic()
      // 产品介绍切换
      root.TagToggle(".tags-item", ".item-text", ".pro-show-b")
    } else if (document.getElementById('detNew')) {
      // 新闻详情
    }
  }(window.$, window.dyweb || (window.dyweb = {})));
}())