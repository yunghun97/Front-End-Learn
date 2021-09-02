// 음악 플레이 목록 추가
let audioItemList = [
  {
    title: '위아래 - exid',
    data: './data/exid.mp3',
    img: './images/exid.jpg',
  },
  {
    title: 'MY TYPE | Prod. by  버벌진트',
    data: './data/MyType.mp3',
    img: './images/MyType.png',
  },
  {
    title: '롤린(Rollin)- 브레이브걸스',
    data: './data/Rollin.mp3',
    img: './images/Rollin.jpg',
  },
  {
    title: 'We Ride(운전만해) - 브레이브걸스',
    data: './data/WeRide.mp3',
    img: './images/WeRide.jpg',
  },
];
// ------------------------------
// 캔버스 관련 추가 파트
// ------------------------------
let canvas;
let ctx;

function init() {
  canvas = document.getElementById('myCanvas');
  ctx = canvas.getContext('2d');
  $(audioItemList).each((index, item) => {
    // console.log(element);
    $('#titleList > ul').append(`<li data-index='${index}'>${item.title}</li>`);
  });
}

// ------------------------------
function setEvent() {
  canvas.onclick = (e) =>
    (audio.currentTime = (e.offsetX / canvas.clientWidth) * audio.duration);

  let audio = $('#myAudio')[0];
  $('#play').click(function () {
    // audio.paused : true(중지된 경우), false(플레이중)
    // 중지된 상태일 경우 플레이 시키기
    if (audio.paused) {
      // 오디오 실행
      audio.play();
    }
    // 플레이 상태일 경우 일시 중지 시킨다.
    else {
      audio.pause();
    }
    $(this).children('span').toggleClass('bi-pause').toggleClass('bi-play');
  });

  // 앞으로 버튼 이벤트 처리
  $('#forward').click(() => (audio.currentTime += 10));

  // 뒤로 버튼 이벤트 처리
  $('#backward').click(() => (audio.currentTime -= 10));

  // 음소거 이벤트 처리
  $('#mute').click(() => {
    audio.muted = !audio.muted;
    $(this)
      .children('span')
      .toggleClass('bi-volume-up')
      .toggleClass('bi-volume-mute');
  });

  // 볼륨 이벤트 처리
  $('#volumeAudio').change(() => (audio.volume = this.value));

  audio.addEventListener('timeupdate', () => {
    let currentTime = parseInt(audio.currentTime);
    let duration = parseInt(audio.duration);

    let time =
      parseInt(currentTime / 60) +
      ':' +
      pad(currentTime % 60) +
      ' / ' +
      parseInt(duration / 60) +
      ':' +
      pad(duration % 60);

    $('#cTime').text(time);

    // 현재 플레이 시간
    let eTime = parseInt(audio.currentTime);
    // 전체 오디오 플레이시간
    let dTime = parseInt(audio.duration);
    // 그림을 그릴 컨텍스트
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);

    ctx.fillStyle = 'rgb(126, 115, 117)';
    let rectWidth = (eTime / dTime) * canvas.clientWidth;
    ctx.fillRect(0, 0, rectWidth, canvas.clientHeight);
  });

  audio.addEventListener('loadedmetadata', function () {
    cTime.innerHTML =
      '0:00 / ' +
      parseInt(audio.duration / 60) +
      ':' +
      pad(parseInt(audio.duration % 60));

    $('#cTime').text(
      '0:00 / ' +
        parseInt(audio.duration / 60) +
        ':' +
        pad(parseInt(audio.duration % 60))
    );
  });

  $('#titleList > ul > li').click(function () {
    // console.log($(this).data("index"));
    let index = $(this).data('index');
    let audioItem = audioItemList[index];
    $('#audioImg').css({
      background: 'url(' + audioItem.img + ') no-repeat center',
      'background-size': 'cover',
    });
    audio.src = audioItem.data;

    $('#play > span').removeClass('bi-play').addClass('bi-pause-circle');
    audio.play();
  });

  $('.audioArea').draggable();
}

function pad(time) {
  return time < 10 ? '0' + time : time;
}
