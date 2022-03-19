const cacheName = "v1";
const cacheAssets = [
  "index.html",
  "static/js/bundle.js",
  "ws",
  "manifest.json",
  "/",
];

// SERVICE WORKER LIFECYCLE
// REGISTER --> INSTALL --> ACTIVATE

// call the install event
self.addEventListener("install", (e) => {
  console.log("Service Worker : Installed ", e);

  //   telling the browser to wait until this PROMISE is finsihed and it get's rid of this serviceWorker
  e.waitUntil(
    //   using the caches storage API
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("Service Worker : Caching Files ", cache);
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// call the activate event
self.addEventListener("activate", (e) => {
  console.log("Service Worker : Activated", e);

  // remove unwanted cache
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearning Old Cache");
            caches.delete(cache);
          }
        })
      );
    })
  );
});

// call the fetch event
self.addEventListener("fetch", (e) => {
  console.log("Service Worker : Fetching ", e);
  e.respondWith(
    fetch(e.request)
    // .then((res) => {
    //   const resClone = res.clone();
    //   caches.open(cacheName).then((cache) => {
    //     cache.put(e.request, resClone);
    //   });
    //   return res;
    // })
  ).catch((e) => caches.match(e.request).then((res) => res));
});
