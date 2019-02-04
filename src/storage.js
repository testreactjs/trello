export function saveData(item, key) {
  localStorage.setItem(key, JSON.stringify(item));
}

export function getData(key) {
  return JSON.parse(localStorage.getItem(key));
}
