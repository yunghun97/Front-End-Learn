window.onload = function () {
  // 투표 정보 얻기
  var question = localStorage.getItem('question');
  var pollBtnDiv = document.querySelector('.content-left-poll-btn');
  var pollDiv = document.querySelector('.content-left-poll');

  if (question) {
    var answers = localStorage.getItem('answers');
    var answersArr = JSON.parse(answers);
    var len = answersArr.length;
    var poll = `
        <div class="vote-title">[ 당신의 선택 ]</div>
        <div class="vote-question">${question}</div>
        <div class="vote-answer">
          <ul>
      `;
    for (var i = 0; i < len; i++) {
      poll += `
            <li>
              <label><input type="radio" name="vote-answer" value="${answersArr[i]}" /> ${answersArr[i]}</label>
            </li>
        `;
    }
    poll += `
          </ul>
        </div>
        <div class="vote-button">
          <button id="btn-poll" class="button btn-primary">투표하기</button>
          <button class="button">결과보기</button>
        </div>
        <div class="vote-date">투표기간 : 20.09.01 ~ 20.09.30</div>
      `;

    pollDiv.innerHTML = poll;

    pollBtnDiv.style.display = 'none';
    pollDiv.style.display = '';
  } else {
    var poll = `진행중인 투표가 없습니다.`;
    pollDiv.innerHTML = poll;

    pollBtnDiv.style.display = '';
    pollDiv.style.display = '';
  }

  //투표만들기
  //   document.querySelector('#make-poll')onclick = function() {
  //     window.open('pollmake.html', 'poll', 'width=420,height=300,top=300,left=400');
  //   }
  document.getElementById('btn-makepoll').onclick = function () {
    window.open('makepoll.html', 'poll', 'width=420,height=300,top=300,left=400');
  };

  //투표하기.
  document.querySelector('#btn-poll').onclick = function () {
    var votes = document.getElementsByName('vote-answer');
    var selMenu = '';

    for (var i = 0; i < votes.length; i++) {
      if (votes[i].checked) {
        selMenu = votes[i].value;
        break;
      }
    }
    alert(selMenu + '를 선택했습니다.');
  };
};
