let lottoArr = [],
  num,
  loc,
  ballColor = ['#645356', '#5491ce', '#6ce089', '#e06cce', '#aa5b66'];

function imgChange() {
  let ind = Math.floor(Math.random() * lottoArr.length);
  let lottoSpan = document.querySelector(`#lottoSpan${loc}`);
  lottoSpan.innerHTML = `${lottoArr[ind]}`;
  lottoSpan.style.background = `${ballColor[parseInt(lottoArr[ind] / 10)]}`;

  if (num !== 0) {
    num--;
    setTimeout(imgChange, 100);
    return;
  }

  lottoArr.splice(ind, 1);

  num = 30;
  loc++;
  if (loc < 7) {
    setTimeout(imgChange, 100);
  }
}

document.getElementById('lottoBtn').onclick = () => {
  // 추첨번호를 눌렀을 때의 초기화
  lottoArr.splice(0, lottoArr.length);
  loc = 1;
  var spanArr = document.querySelectorAll("span[id^='lottoSpan']");
  for (let sEle of spanArr) sEle.innerHTML = '';

  // 초기 번호 설정
  for (var i = 0; i < 45; i++) lottoArr[i] = i + 1;

  num = 30;
  imgChange();
};
