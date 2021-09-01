$(document).ready(function () {
  var poll = localStorage.getItem('poll');
  var pollContent;

  if (poll) {
    console.log('>>>>' + poll);
    var vote = JSON.parse(poll);
    var sdate = vote.start_date;
    var edate = vote.end_date;
    var question = vote.question;
    var answers = vote.answers;

    pollContent = `
      <div class="text-center text-secondary mb-3"><h4>[ 당신의 선택 ]</h4></div>
      <div class="font-weight-bold">${question}</div>
      <div class="text-left p-3">
        <ul class="nav flex-column">
    `;
    for (var i = 0; i < answers.length; i++) {
      pollContent += `
          <li class="nav-item">
            <label><input type="radio" name="vote-answer" value="${answers[i]}" /> ${answers[i]}</label>
          </li>
      `;
    }
    pollContent += `
        </ul>
      </div>
      <div class="text-right">
        <button class="btn btn-outline-primary btn-sm" id="btn-poll">투표하기</button>
        <button class="btn btn-outline-danger btn-sm">결과보기</button>
      </div>
      <div class="text-right text-secondary mt-1">투표기간 : ${sdate} ~ ${edate}</div>
    `;

    $('#vote-area').html(pollContent);
    $('#vote-btn-area').css('display', 'none');
    $('#vote-area').css('display', '');
  } else {
    pollContent = `진행중인 투표가 없습니다.`;
    $('#vote-area').html(pollContent);

    $('#vote-btn-area').css('display', '');
    $('#vote-area').css('display', '');
  }

  // 투표하기
  $(document).on('click', '#btn-poll', function () {
    var sel_menu = $("input[name='vote-answer']:checked").val();
    alert(sel_menu + '를 선택했습니다.');
  });

  // 투표 답변 항목 추가 버튼
  $('#btn-add').click(function () {
    var div = $('<div class="poll-answer-item form-inline mb-1">')
      .append('<input type="text" name="answer" class="form-control col-lg-10 mr-3">')
      .append(
        '<button type="button" class="btn btn-outline-danger btn-sm btn-remove">삭제</button>'
      );
    $('#poll-answer-list').append(div);
  });

  // 투표 답변 삭제 버튼
  $(document).on('click', '.btn.btn-remove', function () {
    $(this).parent('.poll-answer-item').remove();
  });

  // 투표 생성
  $('#btn-make').click(function () {
    var sdate = $('#start-date').val(); // 시작일.
    var edate = $('#end-date').val(); // 종료일.
    // console.log(sdate, edate);
    if (!sdate || !edate) {
      // 시작, 종료일 유효성검사.
      alert('설문 기간 입력!!!');
      return;
    }

    var quest = $('#question').val(); // 질문.
    if (!quest) {
      // 질문 유효성검사.
      alert('질문 내용 입력!!!');
      return;
    }

    var answerInput = $('input[name="answer"]'); // 답변 항목.
    var isValid = true;
    $.each(answerInput, function () {
      // 답변항목 유효성검사.
      if (!$(this).val()) {
        alert('답변 항목 입력!!!');
        isValid = false;
        return false; // break 효과
      }
    });

    // $('input[name="answer"]').each(function () {
    //   // 답변항목 유효성검사.
    //   if (!$(this).val()) {
    //     alert('답변 항목 입력!!!');
    //     isValid = false;
    //     return false;
    //   }
    // });

    if (!isValid) {
      return;
    }

    // for (var i = 0; i < answerInput.length; i++) {
    //   // 답변항목 유효성검사.
    //   if (!answerInput[i].value) {
    //     alert('답변 항목 입력!!!');
    //     return;
    //   }
    // }

    var answers = [];
    // for (var i = 0; i < answerInput.length; i++) {
    //   answers.push(answerInput[i].value); // 답변 배열에 입력 data 넣기.
    // }

    $('input[name="answer"]').each(function () {
      answers.push($(this).val());
    });

    // 입력 data를 이용하여 JSON객체 생성.
    var poll = {
      start_date: sdate,
      end_date: edate,
      question: quest,
      answers: answers,
    };

    var poll_json = JSON.stringify(poll); // JSON객체를 문자열 변환.

    localStorage.setItem('poll', poll_json); // localStorage에 넣기.

    alert('투표를 생성합니다.');

    location.reload(); // 부모창 새로고침.
    $('#voteModal').modal('hide'); // 모달창 닫기.
  });
});
