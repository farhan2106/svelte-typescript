import './assets/main.css'
import App from './App.svelte';

type AppWindow<T extends {}> = T & Window

const app = new App({
  target: document.body,
  data: {
    name: 'User'
  }
});

(window as AppWindow<{ app: any }>).app = app;

export default app;
