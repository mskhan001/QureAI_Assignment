const cacheName = "v1";

// SERVICE WORKER LIFECYCLE
// REGISTER --> INSTALL --> ACTIVATE

// call the install event
self.addEventListener("install", (e) => {});

// call the activate event
self.addEventListener("activate", (e) => {
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
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // clone of response
        const resClone = res.clone();
        caches.open(cacheName).then((cache) => {
          cache.put(e.request, resClone);
        });
        console.log("FETCHING ", e.request);
        return res;
      })
      .catch((err) => {
        console.log("FROM CACHE : ", err, e.request);
        return caches.match(e.request).then((res) => res);
      })
  );
});
