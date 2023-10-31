class PostService {
  static async getData(userId, searchBy, page) {
    if (searchBy === 'user' && userId !=='') {
      const request = await fetch(`http://localhost:3001/diary?user_id=${userId}`);
      return request.json();
    } else {
      const request = await fetch(`http://localhost:3001/diary?_start=0&_end=${page}`);
      return request.json();
    }
  }
}



export default PostService;