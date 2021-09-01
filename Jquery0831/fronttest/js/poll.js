window.onload = function () {
    // 답변 항목 추가.
    document.querySelector('#btn-add').addEventListener('click', function () {
      var listDiv = document.getElementById('poll-answer-list');
  
      var divEl = document.createElement('div'); // <div></div>
      divEl.setAttribute('class', 'poll-answer-item'); // <div class="poll-answer-item"></div>
      var inputEl = document.createElement('input');
      inputEl.setAttribute('type', 'text');
      inputEl.setAttribute('name', 'answer');
      var buttonEl = document.createElement('button');
      buttonEl.setAttribute('type', 'button');
      buttonEl.setAttribute('class', 'button');
      buttonEl.addEventListener('click', function (e) {
        var parent = this.parentNode;
        listDiv.removeChild(parent);
      });
      buttonEl.appendChild(document.createTextNode('삭제'));
  
      divEl.appendChild(inputEl);
      divEl.appendChild(buttonEl);
      listDiv.appendChild(divEl);
    });
  
    // 투표 만들기.
    document.querySelector('#btn-make').addEventListener('click', function () {
      var question = document.querySelector('#question').value;
      if (!question) {
        alert('질문 내용 입력!!!');
        return;
      }
  
      var answers = document.getElementsByName('answer');
      for (var i = 0; i < answers.length; i++) {
        if (!answers[i].value) {
          alert('답변 항목 입력!!!');
          return;
        }
      }
      var answerArr = [];
      for (var i = 0; i < answers.length; i++) {
        answerArr.push(answers[i].value);
      }
  
      // for (a of answerArr) {
      //   console.log(a);
      // }
  
      //   localStorage에 저장.
      localStorage.setItem('question', question);
      localStorage.setItem('answers', JSON.stringify(answerArr));
  
      alert('투표를 생성합니다.');
      opener.location.reload();
      self.close();
    });
  
    //투표하기.
    function poll() {
      var votes = document.getElementsByName('vote-answer');
      var selMenu = '';
  
      for (var i = 0; i < votes.length; i++) {
        if (votes[i].checked == true) {
          selMenu = votes[i].value;
          break;
        }
      }
      alert(selMenu + '를 선택했습니다.');
    }
  };
  