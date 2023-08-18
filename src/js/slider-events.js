import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { getEvents } from './API/api-events.js';

const galleryEl = document.querySelector('.swiper-wrapper');

//swiper created, options
const swiper = new Swiper('.swiper', {
  modules: [Pagination, Navigation, Autoplay],
  allowSlideNext: true,
  pagination: {
    el: '.page',
    clickable: true,
  },
  autoplay: {
    delay: 1500,
  },
  speed: 800,
  loop: true,
});

getEvents().then(data => {
  renderGallery(data);
}).catch(error => console.log(error));


function renderGallery(data) {
  // console.log(data);
  const img = data.map(itm => {
    console.log(itm);
    return `
    <div class='swiper-slide'>
      <div class='swiper-slide-wrp'>
        <div class='cook-card-wrap'>
          <img class='cook-card' src='${itm.cook.imgWebpUrl}' alt=''>
<!--    <div class='cook' style='background-image: url(${itm.cook.imgWebpUrl});'>-->
        </div>
        <div class='dish-card-wrap'>
          <img class='dish-card' src='${itm.topic.previewWebpUrl}' alt=''>
<!--      <div class='preview-deash' style='background-image: url(${itm.topic.previewWebpUrl});'></div>-->
          <div class='dish-text'>
            <p class='dish-name'>${itm.topic.name}</p>
            <p class='dish-area'>${itm.topic.area}</p>
          </div>
        </div>
        <div class='dish-big-wrap'>
          <img class='dish-big' src='${itm.topic.imgWebpUrl}' alt=''>
<!--    <div class='deash' style='background-image: url(${itm.topic.imgWebpUrl});'>-->
<!--    </div>-->
<!--    </div>-->
        </div>
      </div>
    </div>
    `;
  }).join('');
  galleryEl.insertAdjacentHTML('beforeend', img);
}

