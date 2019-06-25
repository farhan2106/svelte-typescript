# Svelte + Typescript + Storybook + Webpack

This is a __Svelte + Typescript + Storybook + Webpack__ boiletplate project.
If you are intrested in Next / Nuxt SSR version, it is [here](https://github.com/farhan2106/svelte-typescript-ssr).

It uses gulp to combine `.ts`, `.scss` & `.svelte` together into one `.svelte` file and put into the `build` folder.

Then webpack, using `svelte-loader` will read the `build` files, and output into the `public` folder.

## How to do typescript with svelte?

1. Create a new folder inside the `components` folder.
2. Create a `.ts`, `.scss` & `.svelte` file in that folder. I must have the same filename.
3. `npm run dev`
4. Profit

