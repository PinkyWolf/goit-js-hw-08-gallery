"use strict";
import images from "./gallery-items.js";


const gallery = document.querySelector(".js-gallery");
const img = document.createElement("img");
const lightbox = document.querySelector(".lightbox");
const btn = document.querySelector('[data-action="close-lightbox"]');
const modal = document.querySelector(".lightbox__content");
const lightbox__image = document.querySelector(".lightbox__image");


const createGalleryItem = ({ preview, original, description }) =>
  `<li class="gallery__item">
<a
  class="gallery__link"
  href=${original}
>
  <img class="gallery__image"
    src=${preview}
    data-source=${original}
    alt=${description}
  />
</a>
</li>`;
const galleryMarkup = images.reduce(
  (acc, item) => acc + createGalleryItem(item),
  "");

gallery.insertAdjacentHTML("afterbegin", galleryMarkup);
img.classList.add("gallery__image");

gallery.addEventListener("click", onGalleryClick);
btn.addEventListener("click", onClickHandlerClose);
modal.addEventListener("click", closeLightbox);

function onGalleryClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  if (e.target.nodeName === "IMG") {
    lightbox.classList.add("is-open");
    lightbox__image.src = e.target.getAttribute("data-source");
    lightbox__image.alt = e.target.alt;
  }
  window.addEventListener("keyup", clickKey);
}

function onClickHandlerClose(e) {
  e.preventDefault(); 
  lightbox.classList.remove("is-open");
  lightbox__image.src = '';
  lightbox__image.alt = '';
  window.removeEventListener("keyup", clickKey);
}

function closeLightbox(event) {
  if (event.target === event.currentTarget) {
    onClickHandlerClose();
  }
}

function clickKey(event) {
  if (event.code === "Escape") {
    onClickHandlerClose();
  }
}