// You can change the number on the end of the site to refresh the cache
const CACHE_NAME = 'my-site-v1';

// add all your files in the CACHE_URLS
const CACHE_URLS = ['/',
  'cssdemo.css',
  'cssdemo.html',
  'demos.html',
  'holding.html',
  'index.html',
  'qualifications.html',
  'interest.html',
  'styles.css',
  'manifest.json',
  '404.html',
  // image files
  'images/Profile_picture-mobile.avif',
  'images/Profile_picture-desktop.jpg',
  'images/network-image.avif',
  'images/cisco.svg',
  'images/cisco.png',
  'images/css.banner.webp',
  'images/CSS.demo.png',
  'images/CSS.SVG',
  'images/cyber.jpeg',
  'images/DESKTOP_AVIF_CSS.avif',
  'images/DESKTOP_AVIF_Javascript.avif',
  'images/DESKTOP_JPEG_CSS.jpg',
  'images/DESKTOP_JPEG_Javascript.jpg',
  'images/DESKTOP_WEBP_CSS.webp',
  'images/DESKTOP_WEBP_Javascript.webp',
  'images/MOBILE_AVIF_CSS.avif',
  'images/MOBILE_AVIF_Javascript.avif',
  'images/MOBILE_JPEG_CSS.jpg',
  'images/MOBILE_JPEG_Javascript.jpg',
  'images/MOBILE_WEBP_CSS.webp',
  'images/MOBILE_WEBP_Javascript.webp',
  'images/network-image.jpg',
  'images/network-image.webp',
  'images/Profile_picture_mobile.jpg',
  'images/Profile_picture-mobile.webp',
  'images/Profile_picture.avif',
  'images/Profile_picture.webp',
//Icon files 
  'icons/android-chrome-192x192.png',
  'icons/android-chrome-512x512.png',
  'icons/favicon.ico',
  'icons/screenshot-desktop.png',
  'icons/favicon-32x32.png',
  'icons/favicon-16x16.png',
  'icons/maskable_icon.png',
  'icons/apple-touch-icon.png',
  'icons/mstile-150x150.png',
  'icons/screenshot-mobile.png',
  'icons/safari-pinned-tab.svg'

// add all your images in here, in the correct folders. No need to add this file
];
//DO NOT change any of the code below

self.addEventListener("install", function (event) {
  console.log("Service worker installed");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) { 
        console.log("Cache opened");
        return cache.addAll(CACHE_URLS);
      })
  );
});


self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName.startsWith('my-site-') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        console.log(`Return ${event.request.url} from cache`);
        return response;
      }
      console.log(`Fetch ${event.request.url} from network`);
      return fetch(event.request);
    })
  );
});
