// 통합검색창
const searchEL = document.querySelector('.search');
const searchInputEl = searchEL.querySelector('input');

searchEL.addEventListener('click', function () {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {
  searchEL.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색'); 
  // attribute(html 속성)를 지정해준다
});

  // blur 포커스 해제
searchInputEl.addEventListener('blur', function () {
  searchEL.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', ''); 
});

// footer
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();