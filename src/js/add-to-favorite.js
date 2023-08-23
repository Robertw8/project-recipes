let favoriteArr = [];
let valueToRemove = '';

export function onListClick(e) {
const elClass = e.target.classList.value;
if (!e.target.classList.contains("js-added")) {
   return;
  }
if (e.target.classList.contains("added-heart-icon")) {
  e.target.classList.remove("added-heart-icon");
  e.target.classList.add("heart-icon");
  let valueToRemove = e.target.id;
  let index = favoriteArr.indexOf(valueToRemove);

if (index !== -1) {
  favoriteArr.splice(index, 1);
  console.log(favoriteArr)
  localStorage.setItem("favoriteList", JSON.stringify(favoriteArr));
}
} else {
  e.target.classList.remove("heart-icon");
  e.target.classList.add("added-heart-icon");
  favoriteArr.push(e.target.id);
  console.log(favoriteArr)
  localStorage.setItem("favoriteList", JSON.stringify(favoriteArr));
}
}