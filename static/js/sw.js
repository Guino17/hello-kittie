self.addEventListener("install", e => {
    e.waitUntil(
      caches.open("kitty-cache").then(cache => {
        return cache.addAll([
          "/",
          "/static/css/style.css",
          "/static/js/game.js",
          "/static/imagenes/hello-kitty.png",
          "/static/imagenes/heart.png",
          "/static/sounds/click.mp3",
          "/static/sounds/win.mp3",
          "/static/sounds/lose.mp3"
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", e => {
    e.respondWith(
      caches.match(e.request).then(response => {
        return response || fetch(e.request);
      })
    );
  });
  