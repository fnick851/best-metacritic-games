if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,i,r)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const a={uri:location.origin+s.slice(1)};return Promise.all(i.map((s=>{switch(s){case"exports":return n;case"module":return a;default:return e(s)}}))).then((e=>{const s=r(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Ym0cBHeuvqzGWEDbjiwC0/_buildManifest.js",revision:"Ym0cBHeuvqzGWEDbjiwC0"},{url:"/_next/static/Ym0cBHeuvqzGWEDbjiwC0/_ssgManifest.js",revision:"Ym0cBHeuvqzGWEDbjiwC0"},{url:"/_next/static/chunks/276-4c0ff55e4fbb92a9cf9b.js",revision:"Ym0cBHeuvqzGWEDbjiwC0"},{url:"/_next/static/chunks/framework-92300432a1172ef1338b.js",revision:"Ym0cBHeuvqzGWEDbjiwC0"},{url:"/_next/static/chunks/main-8c8cd71c826a9652a935.js",revision:"Ym0cBHeuvqzGWEDbjiwC0"},{url:"/_next/static/chunks/pages/_app-3bbadadefbf877e32064.js",revision:"Ym0cBHeuvqzGWEDbjiwC0"},{url:"/_next/static/chunks/pages/_error-94ed2348718d59e1af9b.js",revision:"Ym0cBHeuvqzGWEDbjiwC0"},{url:"/_next/static/chunks/pages/index-a73e1cab4b83efa1e7f8.js",revision:"Ym0cBHeuvqzGWEDbjiwC0"},{url:"/_next/static/chunks/polyfills-a54b4f32bdc1ef890ddd.js",revision:"Ym0cBHeuvqzGWEDbjiwC0"},{url:"/_next/static/chunks/webpack-61095c13c5984b221292.js",revision:"Ym0cBHeuvqzGWEDbjiwC0"},{url:"/_next/static/css/7daada6ba35cb4eadfd8.css",revision:"Ym0cBHeuvqzGWEDbjiwC0"},{url:"/icons/android-chrome-192x192.png",revision:"19ba9c2c5e282c4934d02dad486a63f3"},{url:"/icons/android-chrome-512x512.png",revision:"291e7e00e9a23bfc547af43b611304c1"},{url:"/icons/apple-touch-icon.png",revision:"eca8bbc85dbba1cd4cd227de3f511c53"},{url:"/icons/favicon-16x16.png",revision:"19fe60ef72000303434f454979f4048f"},{url:"/icons/favicon-32x32.png",revision:"d33cf12fc18ea8c4f6774a0c598f2128"},{url:"/icons/favicon.ico",revision:"af64ebfe5fbf50f7898b5ab6a8857ff6"},{url:"/manifest.json",revision:"6f88465ff5d5f613f0fd829ed7cdba63"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));