 // 2. This code loads the IFrame Player API code asynchronously.
 var tag = document.createElement('script');

 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.

//  함수 이름 on~Ready는 바꾸면 안됨
 function onYouTubeIframeAPIReady() {
  // <div id="player"></div>
   new YT.Player('player', {
     videoId: 'An6LvWQuj_8',
    //  영상을 재생하기 위한 여러가지 옵션들
     playerVars: {
      autoplay: true,
      loop: true,
      playlist: 'An6LvWQuj_8' /* loop가 true일 경우 다시 재상할 영상 값 추가 */
     },
     events: {
       onReady: function (event) {
        event.target.mute()  /* 음소거 */
       }
     }
   });
 }