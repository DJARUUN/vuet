<script setup lang="ts">
import {
	ArrowRightIcon,
} from '@heroicons/vue/24/outline'
import VButton from '~/vuet/VButton.vue'
import AnimatedBackground from '~/components/AnimatedBackground.vue'
import { defineRouteRules } from '#imports';
import { ref, onMounted } from "vue";

defineRouteRules({
	prerender: true,
});

const reachedTransitionPoint1 = ref(false);
const reachedTransitionPoint2 = ref(false);
const reachedTransitionPoint3 = ref(false);

onMounted(() => {
	reachedTransitionPoint1.value = true;
	setTimeout(() => {
		reachedTransitionPoint2.value = true;
		setTimeout(() => {
			reachedTransitionPoint3.value = true;
		}, 100);
	}, 750);
});
</script>

<template>
	<div class="relative isolate grid grid-rows-[1fr_auto] h-full">
		<AnimatedBackground />

		<div class="container mx-auto px-6 grid place-content-center">
			<div class="text-center flex flex-col gap-6">
				<h1
					:class="`text-[2.6rem] max-w-[90%] leading-none lg:text-6xl font-bold tracking-tight lg:max-w-3xl mx-auto transition-[translate,opacity,filter] ease-smooth duration-1500 dark:bg-linear-[in_oklab_160deg,var(--color-fg)_50%,color-mix(in_oklab,var(--color-muted-fg)_90%,white)] bg-linear-[in_oklab_160deg,color-mix(in_oklab,var(--color-muted-fg)_99%,white),var(--color-fg)_30%] ${reachedTransitionPoint1 ? 'translate-y-0 opacity-100 blur-none' : 'translate-y-8 opacity-0 blur-xs'}`"
					style="
						background-clip: border-box;
						background-clip: text;
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					">
					<span class="font-display">
						Beautiful Vue components for the
					</span>
					<span class="italic font-special font-semibold tracking-normal -mr-0.5 text-[2.675rem] lg:text-[3.825rem]"
						style="
							background: linear-gradient(in oklab 120deg, color-mix(in oklab, var(--color-primary) 97.5%, white) 25%, color-mix(in oklab, var(--color-primary) 90%, white));
							background-clip: border-box;
							background-clip: text;
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
							-webkit-text-fill-color: transparent;
							text-shadow: 0 0 20px color-mix(in oklab, var(--color-primary), transparent 85%), 0 0 35px color-mix(in oklab, var(--color-primary), transparent 90%);
						">
						modern
					</span>
					<span class="font-display">
						web
					</span>
				</h1>

				<p
					:class="`text-[0.95rem] lg:text-lg leading-6 lg:leading-7.5 text-body/85 max-w-2xl mx-auto transition-[translate,opacity,filter] ease-smooth duration-1250 ${reachedTransitionPoint2 ? 'translate-y-0 opacity-100 blur-none' : 'translate-y-4 opacity-0 blur-xs'}`">
					A collection of fully customizable Vue 3 components. Built with TypeScript, Tailwind CSS, and modern design
					principles.
				</p>

				<div
					:class="`flex items-center justify-center gap-x-4 transition-[translate,opacity,filter] ease-smooth duration-1250 ${reachedTransitionPoint3 ? 'translate-y-0 opacity-100 blur-none' : 'translate-y-4 opacity-0 blur-[2px]'}`">
					<VButton variant="primary" class="group" to="/getting-started/introduction" style="
							box-shadow: 0 0 40px color-mix(in oklab, var(--color-primary), transparent 85%), 0 0 15px color-mix(in oklab, var(--color-primary), transparent 90%);
						">
						Get Started
						<ArrowRightIcon class="size-4.5 group-hover:translate-x-1 transition-[translate] ease-smooth" />
					</VButton>
					<VButton variant="outline" to="https://github.com/DJARUUN/vuet">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="size-4.5">
							<path fill="currentColor"
								d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
						</svg>
						View on GitHub
					</VButton>
				</div>
			</div>
		</div>

		<footer class="w-full pb-4 text-center text-xs text-muted-fg flex flex-col gap-4">
			<div
				class="h-px bg-gradient-to-r from-transparent dark:via-[color-mix(in_oklab,var(--color-secondary)_90%,white)] via-[color-mix(in_oklab,var(--color-secondary)_95%,black)] to-transparent" />
			<div class="relative z-10">
				© {{ new Date().getFullYear() }} <span class="font-semibold">DJARUUN</span>&nbsp;&nbsp;•&nbsp;&nbsp;<a
					href="https://github.com/DJARUUN/vuet/blob/master/LICENSE" target="_blank" class="underline">MIT License</a>
			</div>
		</footer>
	</div>
</template>
