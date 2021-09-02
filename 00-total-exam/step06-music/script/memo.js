// 메모 전체 생성(create)
function create() {
  const $note = $(
    `<div class="memo-note">
	      <div class="memo-bar">
	        <span class="bi bi-chevron-up" aria-hidden="true"></span>
	        <span class="bi bi-pin-angle-fill" aria-hidden="true"></span>
	        <span class="bi bi-trash" aria-hidden="true"></span>
	      </div>
	      <div class="memo-edit">
	        <textarea class="memo-edit-area"></textarea>
	      </div>
	    </div>`
  );
  $note.appendTo('.memo-area');

  // 1. 메모 드래그 하기
  $note.draggable();

  // 2. 삭제 기능 구현
  $note.find('.bi-trash').click(() => $note.remove());

  // 3. 메모 보이기
  $note.find('.bi-chevron-up').click((e) => {
    const $this = $(e.target);
    $this.parent().parent().toggleClass('fold');
    setTimeout(() => $this.toggleClass('bi-chevron-up bi-chevron-down'), 400);
  });

  // 4. 메모 고정시키기
  $note.find('.bi-pin-angle-fill').click((e) => {
    let status = 'enable';
    if ($(e.target).toggleClass('choice').hasClass('choice')) {
      status = 'disable';
    }
    $(e.target).parent().parent().draggable(status);
  });
}
