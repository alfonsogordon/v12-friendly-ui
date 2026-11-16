/** GitHub Pages preview only: establish cross-origin isolation for WASM threads. */
export async function ensureV12PagesIsolation(): Promise<void> {
  if (!import.meta.env.PROD || !import.meta.env.BASE_URL.includes('v12-friendly-ui')) return;
  if (!('serviceWorker' in navigator)) throw new Error('Service workers are unavailable');
  const workerUrl = import.meta.env.BASE_URL + 'v12-coi-serviceworker.js';
  await navigator.serviceWorker.register(workerUrl, { scope: import.meta.env.BASE_URL });
  await navigator.serviceWorker.ready;
  if (!navigator.serviceWorker.controller) {
    // First visit needs one reload to come under service worker control.
    location.reload();
    return;
  }
  if (!crossOriginIsolated) {
    // A previously controlled page can need one reload after worker activation.
    const key = 'v12-coi-reloaded';
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, '1');
      location.reload();
    } else {
      throw new Error('Cross-origin isolation unavailable; SharedArrayBuffer cannot run');
    }
  } else {
    sessionStorage.removeItem('v12-coi-reloaded');
  }
}
