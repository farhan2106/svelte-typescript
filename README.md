# Svelte + Typescript + Storybook + (Webpack / Rollup)

This is a __Svelte + Typescript + Storybook + (Webpack / Rollup)__ boiletplate project.

* Can I import typescript file in .svelte file? - **Yes**
* Can I write typescript in .svelte file? - **Yes**

## How to do typescript with svelte?

1. Write typescript in svelte component

```
<h1>
  My App
  <WelcomePage name={name}></WelcomePage>
</h1>

<style>
h1 {
  color: purple;
}
</style>

<script>
import WelcomePage from './components/WelcomePage/WelcomePage.svelte'

WelcomePage
export const name: string = ''
</script>
```

2. Import ts file in svelte component

```
<h1>
  My App
  <WelcomePage name={name}></WelcomePage>
</h1>

<style>
h1 {
  color: purple;
}
</style>

<script src="App.ts"></script>
```