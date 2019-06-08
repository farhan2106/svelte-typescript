import './assets/main.css'
import App from './App.svelte';

type AppWindow<T extends {}> = T & Window

let componentName = 'MyComponent';
if (document.currentScript && 
  document.currentScript.getAttribute('component-name') !== null && 
  document.currentScript.getAttribute('component-name') !== '') {
  componentName = document.currentScript.getAttribute('component-name') as string
}

(window as AppWindow<{ [key: string]: any }>)[componentName] = App;
export default App
