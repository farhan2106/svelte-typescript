# Svelte + Typescript + Storybook + Webpack

This is a __Svelte + Typescript + Storybook + Webpack__ boiletplate project.

It uses gulp to combine `.ts`, `.scss` & `.svelte` together into one `.svelte` file and put into the `build` folder.

Then webpack, using `svelte-loader` will read the `build` files, and output into the `public` folder.

## How to do typescript with svelte?

Create a `.svelte` file and a corresponding `.ts` file for the svelte component. During build time, the `.ts` will be combined with the `.svelte` file to become a svelte component. `.svelte` & `.ts` must have the same filename.

