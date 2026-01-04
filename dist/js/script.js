"use strict";

jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  var topBtn = $(".page-top");
  topBtn.hide();

  // ボタンの表示設定
  $(window).scroll(function () {
    if ($(this).scrollTop() > 70) {
      // 指定px以上のスクロールでボタンを表示
      topBtn.fadeIn();
    } else {
      // 画面が指定pxより上ならボタンを非表示
      topBtn.fadeOut();
    }
  });

  // ボタンをクリックしたらスクロールして上に戻る
  topBtn.click(function () {
    $("body,html").animate({
      scrollTop: 0
    }, 300, "swing");
    return false;
  });

  // ヘッダー
  $(window).on("scroll", function () {
    if ($(".slider1").height() < $(this).scrollTop()) {
      $(".header").css("background", "rgba(17,17,17,1)");
    } else {
      $(".header").css("background", "rgba(17,17,17,0.5)");
    }
  });

  //ドロワーメニュー
  $(".navbar_toggle").on("click", function () {
    $(this).toggleClass("open");
    $(".menu").toggleClass("open");
  });

  // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動)
  $(document).on("click", 'a[href*="#"]', function () {
    var time = 400;
    var header = $("header").innerHeight();
    var target = $(this.hash);
    if (!target.length) return;
    var targetY = target.offset().top - header;
    $("html,body").animate({
      scrollTop: targetY
    }, time, "swing");
    return false;
  });
});

/* -------------------------------- */
/////////////////////////////////////
/////*　　ハンバーガーメニュー　　* /////
/////////////////////////////////////
/* -------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  var hamburger = document.getElementById("js-hamburger");

  // btnTriggerをquerySelectorで取得
  var btnTrigger = document.querySelector("#js-hamburger .btn-trigger");

  // 開閉対象のメニュー要素群を取得
  var drower = document.getElementById("js-drower");
  var mask = document.getElementById("js-mask");
  var naviMenu = document.getElementById("js-navi__menu");
  var body = document.getElementById("js-body");
  if (hamburger && btnTrigger) {
    // js-hamburgerがクリックされた時の処理
    hamburger.addEventListener("click", function () {
      // 1. アイコンとメニュー本体のクラスをトグル (開閉)
      btnTrigger.classList.toggle("active");
      this.classList.toggle("active");
      drower === null || drower === void 0 || drower.classList.toggle("active");
      mask === null || mask === void 0 || mask.classList.toggle("active");
      naviMenu === null || naviMenu === void 0 || naviMenu.classList.toggle("active");
      body === null || body === void 0 || body.classList.toggle("active");

      // 2. 💡【追加機能】メニューが閉じるときにアコーディオンも閉じる
      //    btnTriggerにactiveが残っていない場合（＝メニューが閉じた瞬間）
      if (!btnTrigger.classList.contains("active")) {
        // 開いているアコーディオンアイテム (.l-global-menu-hamburger.active) を全て取得し、
        // activeクラスを削除してアコーディオンを閉じる
        document.querySelectorAll(".l-global-menu-hamburger.active").forEach(function (item) {
          item.classList.remove("active");
        });

        // アコーディオンコンテンツ (.l-global-menu-hamburger__aco) を全て非表示にする
        document.querySelectorAll(".l-global-menu-hamburger__aco").forEach(function (content) {
          content.style.display = 'none';
        });
        console.log("ハンバーガーメニューが閉じられたため、開いていたアコーディオンを閉じました。");
      }
    });
  }
});

/* -------------------------------- */
//ハンバーガーメニュー内のアコーディオン
/* -------------------------------- */

/*　↓ ハンバーガーメニュー外がクリックされた時の動きを
closeHamburgerMenu という関数にまとめている  */

function closeHamburgerMenu() {
  console.log("メニュー外クリックまたはクローズ処理が実行されました。");

  // 1. ドロワー/マスク系のクラスを外す (画面全体の閉鎖)
  $(".l-drower").removeClass("active");
  $(".l-hamburger").removeClass("active");
  $(".btn-trigger").removeClass("active");

  // 2. 開いているアコーディオンを閉じる
  $(".l-global-menu-hamburger.active").removeClass("active");
  // 全てのアコーディオンコンテンツulをslideUpで閉じる
  $(".l-global-menu-hamburger__aco").slideUp(300);
}
$(document).ready(function () {
  //===============================================
  // 1. アコーディオン開閉の処理 (slideToggle)
  // 
  $(".accordion-toggle").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var $this = $(this); // クリックされた a タグ
    var $parentLi = $this.closest(".l-global-menu-hamburger");
    var $accordionContent = $this.next(".l-global-menu-hamburger__aco");

    // activeクラスをトグル付与 (スタイル変更用)
    $parentLi.toggleClass("active");

    // slideToggle() でコンテンツをスムーズに開閉
    if ($accordionContent.length) {
      $accordionContent.slideToggle(300);
    }
  });

  // ============================================
  // 2. ハンバーガーメニュー外の範囲クリックによる閉鎖ロジック

  // 💡 .l-drower (メニューの背景/ラッパー要素) にイベントを設定
  // この要素が active クラスで開いている状態だと仮定します。
  $(".l-drower").on("click", function (e) {
    if ($(e.target).hasClass('l-drower') && $(this).hasClass('active')) {
      // 閉鎖関数を実行
      closeHamburgerMenu();
    }
  });
});

// 追従ヘッダーのカラー変更
document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector(".l-header-back");
  var navs = document.querySelectorAll(".l-global-menu-items, .l-hamburger__bar");
  var beforeElementParent = document.querySelector(".l-global-menu-drop__txt"); // 親要素を選択
  var target = document.querySelector(".target");
  var changePoint = target.offsetTop;
  window.addEventListener("scroll", function () {
    if (window.scrollY >= changePoint) {
      header.classList.add("scrolled");
      navs.forEach(function (nav) {
        nav.classList.add("scrolled");
      });
      if (beforeElementParent) {
        beforeElementParent.classList.add("scrolled"); // 親要素にscrolledクラスを付与
      }
    } else {
      header.classList.remove("scrolled");
      navs.forEach(function (nav) {
        nav.classList.remove("scrolled");
      });
      if (beforeElementParent) {
        beforeElementParent.classList.remove("scrolled"); // 親要素からscrolledクラスを削除
      }
    }
  });
});
"use strict";
(function (d, w, $) {
  'use strict';

  // ---------------------------------------------
  // お知らせ もっと見るボタン
  // ---------------------------------------------
  $(function () {
    // PC, SP 共通の初期表示件数と追加件数
    var initialNum = 5;
    var moreNum = 10;

    // 初期表示の設定
    $('.p-information__item').slice(initialNum).addClass('p-information-is-hidden');

    // 「もっと見る」ボタンのクリックイベント
    $('.p-information__top__btn').on('click', function () {
      $('.p-information__item.p-information-is-hidden').slice(0, moreNum).removeClass('p-information-is-hidden');

      // 残りがない場合はボタンを非表示
      if ($('.p-information__item.p-information-is-hidden').length === 0) {
        $('.p-information__top__btn').fadeOut();
      }
    });

    // 初期状態でリストがすべて表示されている場合はボタンを非表示
    var totalList = $('.p-information__item').length;
    if (totalList <= initialNum) {
      $('.p-information__top__btn').addClass('p-information-is-hidden');
    }
  });

  //TOPページFVのスライドアニメ
  document.addEventListener('DOMContentLoaded', function () {
    var slides = document.querySelectorAll('.slide');

    // ★ここが修正点: .slide要素が存在する場合にのみ、以下の処理を実行する
    if (slides.length > 0) {
      var showSlide = function showSlide(index) {
        slides.forEach(function (slide) {
          return slide.classList.remove('active');
        });
        slides[index].classList.add('active'); // ここでエラーが出ていました
      }; // 初期表示
      var currentSlide = 0;
      showSlide(currentSlide);

      // 自動でスライドを切り替える（4.5秒ごと）
      setInterval(function () {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      }, 4500);
    }
    // else {
    //     console.log("`.slide` クラスの要素が見つかりませんでした。スライドショーは実行されません。");
    // }

    // ★問い合わせフォームバリデーションのコードは、このif文の外に記述   
    //  !!!!!!お問い合わせフォーム必須項目チェック　↓
    var form = document.getElementById('contactForm');
    var submitBtn = document.getElementById('submitBtn');
    var requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    function checkFormAndToggleButton() {
      var allFilled = true;
      requiredInputs.forEach(function (input) {
        if (input.tagName === 'SELECT') {
          if (input.value === '') {
            allFilled = false;
          }
        } else {
          if (input.value.trim() === '') {
            allFilled = false;
          }
        }
      });
      if (allFilled) {
        submitBtn.removeAttribute('disabled');
      } else {
        submitBtn.setAttribute('disabled', 'true');
      }
    }
    requiredInputs.forEach(function (input) {
      input.addEventListener('input', checkFormAndToggleButton);
      if (input.tagName === 'SELECT') {
        input.addEventListener('change', checkFormAndToggleButton);
      }
    });
    checkFormAndToggleButton();
    form.addEventListener('submit', function (event) {
      var isFormValid = form.reportValidity();
      if (!isFormValid) {
        event.preventDefault();
        console.log("未入力の必須項目があります");
        alert("※未入力の必須項目があります");
      }
    });
  });
})(document, window, jQuery);

//TOPページ　事業内容フェードイン
$(document).ready(function () {
  $(window).scroll(function () {
    $('.p-top__business--item').each(function () {
      var elemPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      var triggerPoint = windowHeight * 0.8; // 画面の縦80%の地点でフェードイン開始

      if (scroll > elemPos - triggerPoint) {
        $(this).addClass('scrollin');
      }
    });
  });
});

//TOPページ　会社概要 フェードイン
$(document).ready(function () {
  $(window).scroll(function () {
    $('.p-top__about--img').each(function () {
      var elemPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      var triggerPoint = windowHeight * 0.7; // 画面の縦70%の地点でフェードイン開始

      if (scroll > elemPos - triggerPoint) {
        $(this).addClass('scrollin');
      }
    });
  });
});

//TOPページ　特徴01 フェードイン
$(document).ready(function () {
  $(window).scroll(function () {
    $('.p-top__feature-01').each(function () {
      var elemPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      var triggerPoint = windowHeight * 0.7; // 画面の縦70%の地点でフェードイン開始

      if (scroll > elemPos - triggerPoint) {
        $(this).addClass('scrollin');
      }
    });
  });
});
//TOPページ　特徴02 フェードイン
$(document).ready(function () {
  $(window).scroll(function () {
    $('.p-top__feature-02').each(function () {
      var elemPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      var triggerPoint = windowHeight * 0.7; // 画面の縦70%の地点でフェードイン開始

      if (scroll > elemPos - triggerPoint) {
        $(this).addClass('scrollin');
      }
    });
  });
});
//TOPページ　採用情報 フェードイン
$(document).ready(function () {
  $(window).scroll(function () {
    $('.p-top__recruit--img').each(function () {
      var elemPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      var triggerPoint = windowHeight * 0.7; // 画面の縦70%の地点でフェードイン開始

      if (scroll > elemPos - triggerPoint) {
        $(this).addClass('scrollin');
      }
    });
  });
});
$(document).ready(function () {
  $(window).scroll(function () {
    $('.p-top__recruit--heading').each(function () {
      var elemPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      var triggerPoint = windowHeight * 0.7; // 画面の縦70%の地点でフェードイン開始

      if (scroll > elemPos - triggerPoint) {
        $(this).addClass('scrollin');
      }
    });
  });
});

/* TOPページ　position:absoluteのコンテンツの高さを検知し、
親要素の高さを自動調整  */

var targetSection = document.querySelector('.p-top__feature');
var absoluteChildrenInSection = targetSection.querySelectorAll('.p-top__feature-01, ' // p-top__feature-01自体がabsoluteなら含める
+ '.p-top__feature-02, ' // p-top__feature-02自体がabsoluteなら含める
+ '.c-overlap-textbox__left, ' + '.c-overlap-textbox__blue-bg-left, ' + '.c-overlap-textbox__right, ' + '.c-overlap-textbox__blue-bg-right');
function setSectionHeight() {
  var maxHeight = 0;
  absoluteChildrenInSection.forEach(function (child) {
    var childRect = child.getBoundingClientRect();
    var sectionRect = targetSection.getBoundingClientRect();
    var childBottom = childRect.top + childRect.height;
    maxHeight = Math.max(maxHeight, childBottom - sectionRect.top);
  });

  // 親要素の padding や border も考慮に入れる場合は調整
  targetSection.style.minHeight = "".concat(maxHeight, "px"); // min-heightで設定
}
setSectionHeight();
window.addEventListener('resize', setSectionHeight);