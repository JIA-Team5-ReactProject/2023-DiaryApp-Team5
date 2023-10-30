async function getData(keyWord, searchBy) {
  if (searchBy === 'user') {
    const request = await fetch(`http://localhost:3001/diary?user_id=${keyWord}`);
    return request.json();
  } else {
    const request = await fetch(`http://localhost:3001/diary`);
    return request.json();
  }
}

export default getData;