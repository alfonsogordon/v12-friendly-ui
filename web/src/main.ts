import App from './App.svelte';
import { mount } from 'svelte';
import { ensureV12PagesIsolation } from './v12-pages-coi';

ensureV12PagesIsolation()
  .then(() => {
    if (!import.meta.env.PROD || !import.meta.env.BASE_URL.includes('v12-friendly-ui') || crossOriginIsolated) {
      mount(App, { target: document.getElementById('app')! });
    }
  })
  .catch((error) => {
    document.getElementById('app')!.textContent =
      'V12 simulator cannot start: ' + (error instanceof Error ? error.message : String(error));
  });
