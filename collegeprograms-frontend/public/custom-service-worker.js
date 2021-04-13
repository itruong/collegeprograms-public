/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
     http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  'index.html',
  './', // Alias for index.html
  'styles.css',
  '../../styles/main.css',
  'demo.js'
];

importScripts("https://www.gstatic.com/firebasejs/6.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.6.1/firebase-auth.js");

var firebaseConfig = {
  apiKey: "AIzaSyCBYynTL6bR_7IYPkdgQWXUjk-dy99p-T4",
  authDomain: "connectapp-4a09a.firebaseapp.com",
  databaseURL: "https://connectapp-4a09a.firebaseio.com",
  projectId: "connectapp-4a09a",
  storageBucket: "connectapp-4a09a.appspot.com",
  messagingSenderId: "97256735080",
  appId: "1:97256735080:web:64ee8b35a17393d7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

/*
// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});
*/
/**
 * Returns a promise that resolves with an ID token if available.
 * @return {!Promise<?string>} The promise that resolves with an ID token if
 *     available. Otherwise, the promise resolves with null.
 */
const getIdToken = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      if (user) {
        user.getIdToken().then((idToken) => {
          resolve(idToken);
        }, (error) => {
          resolve(null);
        });
      } else {
        resolve(null);
      }
    });
  });
};

const getOriginFromUrl = (url) => {
  // https://stackoverflow.com/questions/1420881/how-to-extract-base-url-from-a-string-in-javascript
  const pathArray = url.split('/');
  const protocol = pathArray[0];
  const host = pathArray[2];
  return protocol + '//' + host;
};

self.addEventListener('fetch', (event) => {
  const requestProcessor = async (idToken) => {
    let req = event.request;
    // For same origin https requests, append idToken to header.
    if (idToken) {
      // Clone headers as request headers are immutable.
      const headers = new Headers();
      for (let entry of req.headers.entries()) {
        headers.append(entry[0], entry[1]);
      }
      // Add ID token to header.
      headers.append('Authorization', 'Bearer ' + idToken);
      try {
        req = new Request(req.url, {
          method: req.method,
          headers: headers,
          mode: 'cors',//'same-origin',
          credentials: req.credentials,
          cache: req.cache,
          redirect: req.redirect,
          referrer: req.referrer,
          body: req.method === "GET" ? req.body : await req.text(),
          bodyUsed: req.bodyUsed,
          context: req.context
        });
      } catch (e) {
        // This will fail for CORS requests. We just continue with the
        // fetch caching logic below and do not pass the ID token.
      }
    }
    return fetch(req);
  };

  if (
    (
      // self.location.origin === getOriginFromUrl(event.request.url) || 
      getOriginFromUrl(event.request.url) === 'http://localhost:8000'
    ) &&
    (
      self.location.protocol === 'https:' ||
      self.location.hostname === 'localhost'
    )
  ) {
    // Fetch the resource after checking for the ID token.
    // This can also be integrated with existing logic to serve cached files
    // in offline mode.
    event.respondWith(getIdToken().then(requestProcessor, requestProcessor));
  }
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});