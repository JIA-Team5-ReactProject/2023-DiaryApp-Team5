/**
 * get diary
 * @param {string} id
 * @returns single obj
 */
//일기 페이지 보여주는 함수
export async function getDiary(id) {
  const res = await fetch(`http://localhost:3001/diary/${id}`);
  const diary = await res.json();

  return diary;
}
