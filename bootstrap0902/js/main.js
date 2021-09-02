$(document).ready(function () {
  var stroragePoll = localStorage.getItem('poll');
  var pollContent;

  if (stroragePoll) {
    var vote = JSON.parse(stroragePoll);
    var sdate = vote.start_date;
    var edate = vote.end_date;
    var question = vote.question;
    var answers = vote.answers;
    pollContent = `
        <div class="text-center text-secondary mb-3"><h4>[ 당신의 선택 ]</h4></div>
        <div class="font-weight-bold text-info bg-light"><h3>${question}</h3></div>
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
    pollContent = `<h3>진행중인 투표가 없습니다.</h3>`;
    $('#vote-area').html(pollContent);
    $('#vote-btn-area').css('display', '');
    $('#vote-area').css('display', '');
  }

  $(document).on('click', '#btn-poll', function () {
    var selItem = $('input[name="vote-answer"]:checked').val();
    if (selItem) alert(selItem + '을 선택했습니다.');
    else alert('지역을 선택해 주세요.');
  });

  $('#btn-add').click(function () {
    var div = $('<div class="form-inline mb-1 poll-answer-item">')
      .append('   <input type="text" class="form-control col-lg-10 mr-3" name="answer">')
      .append(
        '   <button type="button" class="btn btn-outline-danger btn-sm btn-remove">삭제</button>'
      );
    $('#poll-answer-list').append(div);
  });

  $(document).on('click', '.btn-remove', function () {
    $(this).parent('.poll-answer-item').remove();
  });

  $('#btn-make').click(function () {
    var sdate = $('#start-date').val();
    var edate = $('#end-date').val();
    if (!sdate || !edate) {
      alert('설문 기간 입력!!!');
      return;
    }

    var question = $('#question').val();
    if (!question) {
      alert('질문 내용 입력!!');
      return;
    }

    // var answers = $('input[name="answer"]');
    // for(var i = 0;i<answers.length;i++) {
    //     if(!answers[i].value) {
    //         alert("답변 항목 입력!!");
    //         return;
    //     }
    // }
    var isValid = true;
    $('input[name="answer"]').each(function () {
      if (!$(this).val()) {
        alert('답변 항목 입력!!');
        isValid = false;
        return false; //break;
        // return true; // continue;
      }
    });

    if (!isValid) {
      return;
    }

    var answers = [];
    $('input[name="answer"]').each(function () {
      answers.push($(this).val());
    });

    var poll = {
      start_date: sdate,
      end_date: edate,
      question: question,
      answers: answers,
    };

    localStorage.setItem('poll', JSON.stringify(poll));

    alert('투표 생성합니다!!!');
    location.reload();
    $('#voteModal').modal('hide');
  });
});
