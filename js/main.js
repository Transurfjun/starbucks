
// 우측 뱃지
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

/* 에니메이션 처리 전 */
/* window.addEventListener('scroll', _.throttle(function() {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    // 배지 숨기기, scrollY를 통해 배지의 위치를 숫자로 파악할 수 있다
    badgeEl.style.display = 'none';  --> css의 스타일 속성을 사용
  } else{
    // 배지 보이기
    badgeEl.style.display = 'block';
  }
}, 300)); */

// _.throttle : lodash.js를 통해 추가되는 기능(함수 제어) ,300ms(밀리세컨즈)=0.3s, .3초 단위로 부하를 줘서 함수가 우르르 실행되는 것을 방지
// _.throtle(함수, 시간)

// 에니메이션 처리
window.addEventListener('scroll', _.throttle(function() {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    // 배지 숨기기
    // gsap.to(요소, 지속시간(초), {객체데이터-속성:옵션});  --> to: 속성, 메소드/ gsap은 자주 사용하는 에니메이션 효과
    gsap.to(badgeEl, .6, {
      opacity: 0, 
      display: 'none', /* 속성 자체가 안보일 뿐만 아니라 요소 자체가 제거되도록 */
    });
    // 버튼(top) 보이기
    gsap.to(toTopEl, .2, {
      x: 0
    });
  } else{
    // 배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    // 버튼 숨기기
    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
}, 300));

// 탑버튼 scroll to

toTopEl.addEventListener('click', function () {
  gsap.to(window, .7, {
    scrollTo: 0
  });
});


// opacity처럼 값이 숫자인 속성은 중간값이 있기에 자연스런 전환 효과 적용이 가능하지만, 
// display처럼 값이 숫자가 아닌 속성은 중간값이 없으므로 자연스런 전환 효과 적용이 불가능.


// 메인배너 fade-in
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7,  /* 0.7, 1.4, 2.1, 2.7 -- index부터 시작하면 0이 되므로 딜레이가 없다 */
    opacity: 1
  });
});
// 자바스크립트에서는 반복적인 작용을 처리하는 경우가 많다

// Notice slide
/* new : 생성자(자바스크립의 클래스 개념), swiper(인수, 옵션) */
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true, 
  loop: true
});  

// Promotion slide
new Swiper('.promotion .swiper-container', {
  /* direction: 'horizental', --호리젠탈이 기본값 */ 
  slidesPerView: 3, /*  한번에 보이는 슬라이드 개수 */
  spaceBetween: 10, /* 슬라이드 사이여백 */
  centeredSlides: true, /* 1번 슬라이드 가운데 위치 */
  loop: true,
  autoplay: {
    delay: 5000 /* (5초) */
  },
  pagination: {
    /* el 페이지 번호 요소 선택자 */
    el: '.promotion .swiper-pagination',
    clickable: true /* 페이지 번호 요소 제어 가능 여부, 클릭이 가능한가 */
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next',
  }
});

/* awards slide 부분 추가 */
new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next',
  }
});

const promotionEl = document.querySelector('.promotion');
const pomotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
pomotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion      /* ! :반대가 되게 만들어주세요 */
  if (isHidePromotion) {
    // 숨김 처리!
    promotionEl.classList.add('hide');
  } else {
    // 보임 처리!
    promotionEl.classList.remove('hide');
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

// ANIMATION
function floatingObject(selector, delay, size) {
  gsap.to(
    selector, /* 선택자 */
    random(1.5, 2.5), /* 애니 동작 시간 */ 
      { /* 옵션 */
        y: size, /* y축 */
        repeat: -1, /* 무한반복 */
        yoyo: true, /* 재생된 에니를 다시 뒤로 재생함 */
        ease: Power1.easeinOut,
        delay: random(0, delay)
      }
  );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', 5, 15);
floatingObject('.floating3', 1.5, 20);

// 스크롤 매직 
/* const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  // scene : 스크롤시 제어하려는 섹션이 화면이 보이는지 라이브러리의 도움으로 감시할 때 필요한 옵션들을 추가하는 메소드
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, 보여짐 여부를 감시할 요소를 지정 
      triggerHook: .8
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller()); 실제 동작할 수 있도록 하는 구조
}); */

const spyEls = document.querySelectorAll('section.scroll-spy')
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl,
      triggerHook: .8
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});

