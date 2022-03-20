const serviceWorkerRegistration = () => {
  // check if serviceWorker is supported in the browser

  if ("serviceWorker" in navigator) {
    // wait till the window loads

    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register(`${process.env.PUBLIC_URL}/serviceWorker.js`)
        .then((reg) => console.log("Service Worker Registered ", reg))
        .catch((e) => console.log("Unable to Register Service Worker", e));
    });
  }
};

export default serviceWorkerRegistration;
