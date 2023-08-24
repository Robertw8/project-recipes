import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/pagination';
import { getRequestsService } from './API/api-service.js';
import { Toast } from './utilities/sweetalert.js';

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

getRequestsService('events')
  .then(data => {
    renderGallery(data);
    swiper();
  })
  .catch(error => {
    Toast.fire({
      icon: 'error',
      title: 'Something went wrong. Reload the page and try again',
    });
  });

function renderGallery(data) {
  const img = data
    .map(itm => {
      return `
    <div class='swiper-slide'>
      <div class='swiper-slide-wrp'>
        <div class='cook-card-wrap'>
          <img class='cook-card' src='${itm.cook.imgWebpUrl}' alt='cook name' loading='lazy'>
        </div>
        <div class='dish-card-wrap'>
          <img class='dish-card' src='${itm.topic.previewWebpUrl}' alt='dish previe' loading='lazy'>
            <p class='dish-name'>${itm.topic.name}</p>
            <p class='dish-area'>${itm.topic.area}</p>
        </div>
        <div class='dish-big-wrap'>
          <img class='dish-big' src='${itm.topic.imgWebpUrl}' alt='dish' loading='lazy'>
        </div>
      </div>
    </div>
    `;
    })
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', img);
}
