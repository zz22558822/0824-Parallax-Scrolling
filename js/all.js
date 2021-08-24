$(document).ready(function () {
  //順暢移動的方法
  $('.scrollTop').click(function (e) { 
    //取消點擊的效果
    e.preventDefault();
    //宣告變數 target , 為點擊的href值 (ID錨點)
    var target = $(this).attr('href');
    //宣告變數 targetPos , 為變數 target 的位置偏移值由上往下算(offset.top)
    var targetPos = $(target).offset().top;

    //console.log(target,targetPos); //輸出到日誌

    //使用animate
    $('html, body').animate({scrollTop: targetPos},500);
  });
  
  //滾動視差核心 讀取出滾動的當前位置
  //如果視窗滾動時就執行
  $(window).scroll(function(){
    //宣告變數 scrollPos , 為整個視窗(window)的位置偏移值(scrollTop) , 簡單說就是現在螢幕的位置數值
    var scrollPos = $(window).scrollTop();
    
    //console.log(scrollPos); //輸出到日誌
    
    //每次滾動時 , 都把所有內容的值讀取出來 , 方便後面下if判斷的時候使用
    $('.scrollTop').each(function(){
      //宣告變數 target , 為點擊的href值 (ID錨點)
      var target = $(this).attr('href');
      //宣告變數 targetPos , 為變數 target 的位置偏移值由上往下算(offset.top)
      var targetPos = $(target).offset().top;
      //宣告變數 targetHeight , 為變數 target 的位置高度
      var targetHeight = $(target).outerHeight();
      
      //console.log(target,targetPos,targetHeight); //輸出到日誌

      // 如果 錨點位置(-1 是因為誤差值) 小於等於(<=) 當前位置 以及(&&) [錨點位置加上錨點高度] 大於(>) 當前位置時 執行以下程式
      if (targetPos -1 <= scrollPos && (targetPos + targetHeight) > scrollPos) {
        //console.log(target); //輸出到日誌
        //先把.scrollTop內的active 移除
        $('.scrollTop').removeClass('active');
        //在this也就是 (.scrollTop) 內加上Class : active
        $(this).addClass('active');
      } else {
        //移動至範圍外 , 把active 給移除掉
        $(this).removeClass('active');
      }
    });
  });

});


//進度條 單一動畫載入
$(document).ready(function () {


  //宣告變數 showSkill , 為false 來避免重複觸發所使用的開關 (需要在window外層定義,否則會一直觸發)
  var showSkill = false;


  //進度條的判斷
  $(window).scroll(function(){

    //宣告變數 scrollPos , 為整個視窗(window)的位置偏移值(scrollTop) , 簡單說就是現在螢幕的位置數值 (與上方重複只是需要使用到)
    var scrollPos = $(window).scrollTop();


    //宣告變數 windowHeight , 為整個視窗(window)的高度(height) , 簡單說就是現在螢幕的高度數值
    var windowHeight = $(window).height();
    //console.log(windowHeight); //輸出到日誌


    //宣告變數 showSkill , 為false 來避免重複觸發所使用的開關 (需要在window外層定義,否則會一直觸發)
    //var showSkill = false;


    //宣告變數 skillTop , 來取得進度條區域的高度
    var skillTop = $('#skills').position().top;
    //console.log('skillTop',skillTop)//輸出到日誌

    //如果 進度條區域的高度 小於等於(<=) (當前位置 + 螢幕高度 /2)這邊加上螢幕高度/2就是提高觸發半個螢幕的距離 以及(&&) 否定(!)變數showSkill , 則執行以下程式
    if (skillTop <= (scrollPos + windowHeight / 2) && !showSkill) {

      //showSkill 開關為打開 這樣就不會讓上方if判斷到為否定 達成一次性的效果
      showSkill = true

      //把所有在ID skills 內的 progress-bar的值讀出來
      $('#skills .progress-bar').each(function(){

        //宣告變數 thisValue , 為所有progress-bar(因為使用this) 的data-progress的值
        var thisValue = $(this).data('progress');

        //讓所有progress-bar都加上 寬度(width) : 變數thisValue(data-progress的值) + %
        $(this).css('width' , thisValue + '%');
      });
    }
  });

});


//動態載入顯示動畫
$(document).ready(function () {

  //滾動到定位判定
  $(window).scroll(function(){

    //宣告變數 scrollPos , 為整個視窗(window)的位置偏移值(scrollTop) , 簡單說就是現在螢幕的位置數值 (與上方重複只是需要使用到)
    var scrollPos = $(window).scrollTop();

    //宣告變數 windowHeight , 為整個視窗(window)的高度(height) , 簡單說就是現在螢幕的高度數值
    var windowHeight = $(window).height();

    //所有Class : animated 的值
    $('.animated').each(function(){

      //宣告變數 thisPos , 為Class : animated的位置
      var thisPos = $(this).offset().top;
      
      //如果 當前視窗高度(windowHeight) + 當前螢幕位置(scrollPos) 大於等於(>=) 擁有animated的物件位置時 , 則執行以下程式
      if ( (windowHeight + scrollPos) >=  thisPos ) {

        //加入CSS : fadeIn 來顯示物件
        $(this).addClass('fadeIn');
      }

    });

  });

});


//滾動中持續改變物件位置
$(document).ready(function () {

  //滾動到定位判定
  $(window).scroll(function () {

    //宣告變數 scrollPos , 為整個視窗(window)的位置偏移值(scrollTop) , 簡單說就是現在螢幕的位置數值 (與上方重複只是需要使用到)
    var scrollPos = $(window).scrollTop();

    //指定ID : profiles 內的CSS控制 background-position-y 值為 , 變數 scrollPos 括號是為了變成負值 , 串接上單位px 必須使用單引號
    $('#profiles').css('background-position-y' , -(scrollPos /2) + 'px');
    
    //指定ID : header-ele 內的CSS控制使用(transform)效能較好 , transform用法必須使用 :單引號'' 將要帶入的變數隔開並且在頭尾使用 加號+做連接  , 連接前需要注意有無空格 尤其是px前方
    $('#header-ele').css('transform' , 'translateY( ' + (scrollPos /2) + 'px )');

  });

});