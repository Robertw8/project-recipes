import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/scss';
// import 'swiper/css/navigation';
import 'swiper/scss/pagination';
import { getRequestsService } from './API/api-service.js';

const galleryEl = document.querySelector('.swiper-wrapper');

//swiper created, options
function swiper() {
  const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination, Autoplay],
    allowSlideNext: true,
    pagination: {
      el: '.pagination',
      clickable: true,
    },
    autoplay: {
      delay: 1500,
    },
    speed: 800,
    loop: true,
  });
}

getRequestsService('events').then(data => {
  renderGallery(data);
  swiper();
}).catch(error => console.log(error));


function renderGallery(data) {
  const img = data.map(itm => {
    // console.log(itm);
    return `
    <div class='swiper-slide'>
      <div class='swiper-slide-wrp'>
        <div class='cook-card-wrap'>
          <img class='cook-card' src='${itm.cook.imgWebpUrl}' alt='cook name'>
        </div>
        <div class='dish-card-wrap'>
          <img class='dish-card' src='${itm.topic.previewWebpUrl}' alt='dish previe'>
            <p class='dish-name'>${itm.topic.name}</p>
            <p class='dish-area'>${itm.topic.area}</p>
        </div>
        <div class='dish-big-wrap'>
          <img class='dish-big' src='${itm.topic.imgWebpUrl}' alt='dish'>
        </div>
      </div>
    </div>
    `;
  }).join('');
  galleryEl.insertAdjacentHTML('beforeend', img);
}
