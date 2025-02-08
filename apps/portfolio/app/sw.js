import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";

function removeDuplicateUrls( data ) {
  const seenUrls = new Set();
  return data.filter( item => {
    if ( seenUrls.has( item.url ) ) {
      return false;
    }
    seenUrls.add( item.url );
    return true;
  } );
}

// Clean any old caches
cleanupOutdatedCaches();

// Precache static assets

const precacheList = removeDuplicateUrls( self.__WB_MANIFEST )


precacheAndRoute( precacheList );

self.addEventListener( "activate", ( event ) => {
  console.log( "Service Worker Acctivated" )
  event.waitUntil( clients.claim() )

} )



self.addEventListener( "fetch", ( event ) => {
  console.log( "Fetch Event Triggered for ===>", event.request.url )
  const url = new URL( event.request.url );

  if ( url.pathname === "/api/sse" ) {
    console.log( "Ignore /api/sse" )
    return;
  }
  event.respondWith(
    ( async () => {
      try {
        return await fetch( event.request );
      } catch ( error ) {
        const cache = await caches.open( "network-first-cache" );
        return await cache.match( "/" ) || Response.error();
      }
    } )()
  );
} )
