class SearchService {
 
  static async getDataAll() {
      const request = await fetch(
        `http://localhost:3300/diary`);
      return request.json();
  }

 /**
   * 
   * @param {int} userId user's id field
   * @returns {array} json array
   */
  static async getDataByUser(userId) {
    const request = await fetch(
      `http://localhost:3300/diary?user_id=${userId}`);
    return request.json();
  }
 /**
   * 
   * @param {array} data array data
   * @param {String} keyWord search Keyword 
   * @returns {array} json array
   */
  static filterByTitle(data, keyWord) {
    const arr = [];
    const lowerCaseKeyWord = keyWord.toLowerCase();
    data.forEach((element) => {
      const trimmedString = element.title.replace(/\s+/g, ''); // //사이에 정규표현식, \s+ 하나 이상의 공백을 ''로 대체
      if (trimmedString.includes(lowerCaseKeyWord)) arr.push(element);
    });
    return arr;
  }
}

export default SearchService;
