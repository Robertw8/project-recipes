import { getEvents } from './API/api-events.js';

const galleryEl = document.querySelector('.hero-img-wrap');

getEvents().then(data => {
  renderGallery(data.data);
  // return data;
}).catch(error => console.log(error));


function renderGallery(data) {
  // console.log(data);
  const img = data.map(itm => {
    // console.log(itm);
  });
}