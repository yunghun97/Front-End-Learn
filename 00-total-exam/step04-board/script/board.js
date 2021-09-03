function getUser() {
  $.getJSON({
    url: 'https://jsonplaceholder.typicode.com/users',
    success: (res) => {
      console.dir(res);
      let dataHtml = `
        <thead>
            <tr>
                <th>아이디</th>
                <th>이름</th>
                <th>전화번호</th>
                <th>회사명</th>
            </tr>
        </thead>
        </tbody>
      `;
      $(res).each((index, item) => {
        dataHtml += `
          
            <tr>
                <td>${item.id}</td>
                <td><a onclick="getUserPost('${item.id}')">${item.name}</a></td>
                <td>${item.phone}</td>
                <td>${item.company.name}</td>
            </tr>
        `;
      });
      $('#boardTbl').html(dataHtml);
    },
  });
}
function getUserPost(userId) {
  $.getJSON({
    url: `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
    success: (res) => {
      console.dir(res);
      let dataHtml = `
      <thead>
        <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자아이디</th>
        </tr>
      </thead>
      `;
      $(res).each((index, item) => {
        dataHtml += `
            <tr>
                <td>${item.id}</td>
                <td><a href='#1' onclick='getPostComment(${item.id})'>${item.title}</a></td>
                <td>${item.userId}</td>
            </tr>
            `;
      });
      dataHtml += `
            <tr>
                <td colspan='3' class='text-end'><button class='btn btn-secondary' onclick='getUser()'>사용자 목록</button></td>
            </tr>
      `;
      $('#boardTbl').html(dataHtml);
    },
  });
}

function getPostComment(postId) {
  $.getJSON({
    url: `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    success: (res) => {
      console.dir(res);
      let dataHtml = '';
      $(res).each((index, item) => {
        dataHtml += `
            <div class='border border-primary mb-2'>
                <p>${item.body}</p>
                <div><span>${item.id}</span><span>${item.name}</span></div>
            </div>
            `;
      });
      $('#commentsBody').html(dataHtml);
      $('#comments').modal('show');
    },
  });
}
