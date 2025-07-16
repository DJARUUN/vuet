import { onMounted, useHead, useState, watch } from "#imports";

declare global {
	var theme: string;
}

const defaultTheme = "dark";

export default function useTheme() {
	useHead({
		script: [{
			children: `
				globalThis.theme = localStorage.getItem("theme") ?? "${defaultTheme}";
				document.documentElement.classList.add(globalThis.theme);
			`,
		}],
	});

	const theme = useState("theme", () => globalThis.theme ?? defaultTheme);
	const hasMounted = useState("hasMounted", () => false);

	onMounted(() => {
		if (!hasMounted.value || !theme.value) {
			theme.value = globalThis.theme ?? defaultTheme;

			if (!hasMounted.value) hasMounted.value = true;
		}
	});

	watch(theme, (newTheme, oldTheme) => {
		localStorage.setItem("theme", newTheme ?? defaultTheme);

		const html = document.documentElement;
		if (oldTheme !== newTheme) html.classList.remove(oldTheme);
		html.classList.add(newTheme);
	});

	return theme;
}
