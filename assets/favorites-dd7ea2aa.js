import{s as u,a as m}from"./aos-a11419dc.js";function h(i){const r=document.querySelectorAll(".recipe-item"),s=document.querySelectorAll(".favorites-categoris-item");i.addEventListener("click",c);function c(a){if(a.target.tagName==="LI"){if(s.forEach(t=>{t.classList.remove("favorites-categoris-choosen")}),a.target.classList.add("favorites-categoris-choosen"),a.target.dataset.category=="All categories"){r.forEach(t=>{t.classList.remove("d-none")});return}r.forEach(t=>{t.classList.remove("d-none"),t.dataset.category!==a.target.dataset.category&&t.classList.add("d-none")})}}}const n=document.querySelector(".favorites-categoris-list");function v(){n.innerHTML="";const i=JSON.parse(localStorage.getItem("favorites")).map(r=>r.category).filter((r,s,c)=>c.indexOf(r)===s);n.insertAdjacentHTML("beforeend",i.map(r=>`<li class="favorites-categoris-item" data-category=${r}>${r}</li>`).join("")),n.innerHTML&&n.insertAdjacentHTML("afterbegin",'<li class="favorites-categoris-item" data-category="All categories">All categories</li>')}function y(i){const s=JSON.parse(localStorage.getItem("favorites")).map(({rating:a,title:t,description:d,preview:l,_id:g,category:p})=>`
    <li class="recipe-item recipe-item-favorites" data-title="${t}" data-category="${p}">
        <img class="recipe-img" loading="lazy"
            src="${l}"
            alt="${t}"
            width="335"
            height="335"
            >
        <div class="recipe-wrap">
            <div class="top-wrap">
                <button type="button" aria-label="add to favorite" class="recipe-favorite-btn">
                    <svg class="recipe-favorite-icon" width="22" height="22"><use data-id="${g}" class="added-heart-icon" href="${u}#icon-heart"></use></svg>
                </button>
            </div>
            <div class="bottom-wrap">
                <h2 class="recipe-name">${t}</h2>
                <p class="recipe-description">${d}</p>
                <div class="recipe-rating-wrap">
                    <p class="recipe-rating">${a}<span class="recipe-stars">
                    <svg class="recipe-stars-icon" width="84" height="18" >
                    <use class="stars-icon" href="${u}#icon-${Math.round(a-.1)}-stars">
                    </use></svg>
                    </span></p>
                    <button id="recipe-see-favorites" data-id=${g} class=" recipe-see" type="button" >See recipe</button>
            </div>
            </div>
        </div>
    `).join("");i.insertAdjacentHTML("beforeend",s),i.addEventListener("click",c);function c(a){if(!a.target.classList.contains("added-heart-icon"))return;a.target.closest(".recipe-item").remove();const t=a.target.getAttribute("id"),d=JSON.parse(localStorage.getItem("favorites")).filter(l=>l._id!==t);localStorage.setItem("favorites",JSON.stringify(d)),v()}v()}const f=document.querySelector(".favorites-categoris-list"),S=document.querySelector(".favorites-dishes-conteiner"),e=document.querySelector(".favorites-dishes"),b=document.querySelector(".favorites-heroImg"),L=document.querySelector(".favorites-instead"),A=document.querySelector(".tablet-favorites-svg"),$=document.querySelector(".phone-favorites-svg");function o(i,r){i==null||i.classList.add(r)}function w(){y(e),h(f),e!=null&&e.innerHTML||o(S,"d-none"),!(e!=null&&e.innerHTML)&&window.innerWidth<768&&(o(b,"d-none"),o(A,"d-none"),o(f,"is-hidden")),!(e!=null&&e.innerHTML)&&window.innerWidth>=768&&(o($,"d-none"),o(f,"is-hidden")),e!=null&&e.innerHTML&&o(L,"d-none")}w();e.addEventListener("click",m);
