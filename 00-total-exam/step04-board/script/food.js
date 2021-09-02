// 편의성을 위해 객체 배열 선언
var foods = [
  { ename: 'cake', kname: '케이크' },
  { ename: 'burger', kname: '햄버거' },
  { ename: 'steak', kname: '스테이크' },
  { ename: 'sandwich', kname: '샌드위치' },
];

// 인덱스 위치의 이미지를 선택 모양을 만들고 화면 중앙 이미지로 설정
function choiceImg(index) {
  $('#foodName').text(foods[index].kname);
  $('.img-view > img').attr('src', `./images/${foods[index].ename}.jpg`);
  $('.img-thumb > img').removeClass('choice').eq(index).addClass('choice');
}
