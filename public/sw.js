if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,a)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>n(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"f09d7ea3e07f0b31348e26c0ca29da0c"},{url:"/_next/static/chunks/115-eb136643c4992bd0.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/212.a6d77743b0e2dd21.js",revision:"a6d77743b0e2dd21"},{url:"/_next/static/chunks/303-d28078f3e33a6b9e.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/362-3335f5cf0533d7e6.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/487-abefe24ec1c8fd4c.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/679-ece41f1489a4df7a.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/69-2d9645c709672d08.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/901-2144792414819b95.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/aaea2bcf-379433c285a8f7d4.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/app/(following_followers_list)/followers_list/%5Bid%5D/page-9f1393818c40c3a9.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/app/(following_followers_list)/following_list/%5Bid%5D/page-276a2911dbf0328a.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/app/_not-found-968f683a49d27e47.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/app/layout-c516d7ae53dcdd2a.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/app/page-30dac62970ab5fb4.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/app/post_detail/%5Bid%5D/page-b220091c39a1dc53.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/app/profile/%5Bid%5D/page-d702fa438aaa3cb1.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/app/register/page-b0f4562b655378c5.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/app/search/page-4847a64bd07101e6.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/app/signin/page-cd6f08cb4f343305.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/d12af4b9-4991bee645295b7a.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/fd9d1056-12cb1e4e11b8bf9f.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/framework-aec844d2ccbe7592.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/main-app-7d0716c3d0a756e0.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/main-dfac97867ce72ac8.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/pages/_app-75f6107b0260711c.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/pages/_error-9a890acb1e81c3fc.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-9cf3db27b02f7f48.js",revision:"ePvtQVNn1QK9jPPAmZySW"},{url:"/_next/static/css/6e80f35dbdc5e362.css",revision:"6e80f35dbdc5e362"},{url:"/_next/static/ePvtQVNn1QK9jPPAmZySW/_buildManifest.js",revision:"e0a21c7d7f93d89dce16df0231dc76f2"},{url:"/_next/static/ePvtQVNn1QK9jPPAmZySW/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/clear-icon-fromgpt.0dfd26ba.svg",revision:"156e2b094aa6409a045e4a4836a26c66"},{url:"/_next/static/media/clear.54f4c3b4.svg",revision:"5023c5f248db887ef808686a136935fc"},{url:"/_next/static/media/comment.ac0ba41b.svg",revision:"1e4b9c86c17395f7e6d862c45821c0b2"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/_next/static/media/initial_avatar.ad8ce4c6.png",revision:"7f21e117ef740a632f82bd892f44b45e"},{url:"/_next/static/media/like-border.5eec7851.svg",revision:"a417769ac5e1b8af0950669afce0e933"},{url:"/_next/static/media/like-fill.327d2fd9.svg",revision:"40986e1fd1e64081b3138e7618520469"},{url:"/_next/static/media/more-horizontal-fromgpt.b919ec85.svg",revision:"c5e20a844a03e5970b1d44db83a631ab"},{url:"/icon-192x192.png",revision:"4c37486ec4fc1f17cf236bf041e50181"},{url:"/icon-256x256.png",revision:"3e1e518c0a92f9f664524cd2a8f8fa93"},{url:"/icon-384x384.png",revision:"e629e39d3910160fbf75953f744b6aa5"},{url:"/icon-512x512.png",revision:"78c237447ed9ddc021b51121c6ce32b2"},{url:"/initial_avatar.png",revision:"7f21e117ef740a632f82bd892f44b45e"},{url:"/manifest.json",revision:"3207ed0499474a013ab37b290e1a2a42"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/svg/clear-icon-fromgpt.svg",revision:"156e2b094aa6409a045e4a4836a26c66"},{url:"/svg/clear.svg",revision:"5023c5f248db887ef808686a136935fc"},{url:"/svg/comment.svg",revision:"1e4b9c86c17395f7e6d862c45821c0b2"},{url:"/svg/like-border.svg",revision:"a417769ac5e1b8af0950669afce0e933"},{url:"/svg/like-fill.svg",revision:"40986e1fd1e64081b3138e7618520469"},{url:"/svg/more-horizontal-fromgpt.svg",revision:"c5e20a844a03e5970b1d44db83a631ab"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
