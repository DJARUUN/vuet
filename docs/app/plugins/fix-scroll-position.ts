import { defineNuxtPlugin, useNuxtApp } from "#imports";

export default defineNuxtPlugin(() => {
  useNuxtApp().hook("page:transition:finish", () => {
    const main = document.querySelector("main");
    if (!main) return;

    main.style.scrollBehavior = "auto";
    main?.scrollTo(0, 0);
    main.style.scrollBehavior = "smooth";
  });
});
