const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const galleryRef = document.querySelector("ul.js-gallery");
const lightboxRef = document.querySelector("div.lightbox");
const lightboxImgRef = document.querySelector("img.lightbox__image");
const lightboxBtnRef = document.querySelector(
  "button[data-action='close-lightbox']"
);
const overlayRef = document.querySelector("div.lightbox__overlay");

let currentImg;

let listOfImagesText = "";
galleryItems.forEach(
  ({ preview, original, description }) =>
    (listOfImagesText += `
  <li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>
  `)
);
galleryRef.insertAdjacentHTML("afterbegin", listOfImagesText);

//Open original image
galleryRef.addEventListener("click", (e) => {
  if (e.target.nodeName === "IMG") {
    currentImg = e.target;
    e.preventDefault();
    lightboxImgRef.setAttribute("src", e.target.dataset.source);
    lightboxRef.classList.toggle("is-open");
  }
});

function closeOriginalImg() {
  lightboxImgRef.setAttribute("src", "");
  lightboxRef.classList.toggle("is-open");
}

//Close original image on x-button click
lightboxBtnRef.addEventListener("click", (e) => closeOriginalImg());

//Close original image on overlay click
overlayRef.addEventListener("click", (e) => closeOriginalImg());

//Close original image on Escape keydown
//Change image on Left-Right keydown
window.addEventListener("keydown", (e) => {
  if (!lightboxRef.classList.contains("is-open")) return;

  if (e.key === "Escape") closeOriginalImg();

  let prevLi = currentImg.parentNode.parentNode.previousElementSibling;
  if (e.key === "ArrowLeft" && prevLi) {
    currentImg = prevLi.querySelector("img.gallery__image");
    lightboxImgRef.setAttribute("src", currentImg.dataset.source);
  }

  let nextLi = currentImg.parentNode.parentNode.nextElementSibling;
  if (e.key === "ArrowRight" && nextLi) {
    currentImg = nextLi.querySelector("img.gallery__image");
    lightboxImgRef.setAttribute("src", currentImg.dataset.source);
  }
});


