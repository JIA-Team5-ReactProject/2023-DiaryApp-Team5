export function infiniteScroll(setData) {
  const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight) {
    console.log('asdf');
  }
}
