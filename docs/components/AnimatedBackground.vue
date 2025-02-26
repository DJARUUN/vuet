<script setup lang="ts">
import { onMounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const setSize = () => {
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
    ctx.scale(dpr, dpr)
  }
  setSize()
  window.addEventListener('resize', setSize)

  const stars: {
    x: number
    y: number
    size: number
    speed: number
    opacity: number
    pulse: number
  }[] = []

  const createStars = () => {
    const numberOfStars = Math.floor((canvas.width * canvas.height) / 15000)
    for (let i = 0; i < numberOfStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.05 + 0.05,
        opacity: Math.random() * 0.5 + 0.3,
        pulse: Math.random() * 0.05
      })
    }
  }
  createStars()

  let animationFrame: number
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    stars.forEach(star => {
      star.y -= star.speed
      if (star.y < -10) star.y = canvas.height + 10

      star.opacity += star.pulse
      if (star.opacity > 0.8 || star.opacity < 0.3) {
        star.pulse = -star.pulse
      }

      ctx.beginPath()
      ctx.fillStyle = `oklch(0.6 0.05 240 / ${star.opacity})`
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
      ctx.fill()
    })

    animationFrame = requestAnimationFrame(animate)
  }
  animate()

  return () => {
    window.removeEventListener('resize', setSize)
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<template>
  <div class="fixed inset-0 -z-10">
    <canvas ref="canvasRef" class="absolute inset-0" />

    <!-- Gradient overlay -->
    <div class="absolute inset-0 opacity-90"
      style="background: radial-gradient(circle at center, transparent, var(--bg))" />

    <!-- Primary gradient blob - large and dramatic -->
    <div
      class="absolute lg:-left-[25%] -left-[175%] -top-[15%] transform-gpu overflow-hidden blur-3xl animate-float-main"
      aria-hidden="true">
      <div class="relative aspect-[1155/678] w-[75rem] rotate-[30deg] opacity-25" style="
          background: linear-gradient(to right, var(--primary), var(--secondary));
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
        " />
    </div>

    <!-- Secondary gradient blob - larger but more subtle -->
    <div
      class="absolute lg:-right-[20%] -right-[125%] top-[60%] transform-gpu overflow-hidden blur-3xl animate-float-secondary"
      aria-hidden="true">
      <div class="relative aspect-[800/600] w-[60rem] translate-x-[20%] rotate-[15deg] opacity-10" style="
          background: linear-gradient(to right, var(--secondary), var(--primary));
          border-radius: 60% 40% 30% 70% / 50% 40% 60% 50%;
        " />
    </div>
  </div>
</template>

<style>
@keyframes float-main {

  0%,
  100% {
    transform: translateY(0) scale(1) rotate(0deg);
  }

  50% {
    transform: translateY(-40px) scale(1.1) rotate(-8deg);
  }
}

@keyframes float-secondary {

  0%,
  100% {
    transform: translateY(0) scale(0.95) rotate(0deg);
  }

  50% {
    transform: translateY(30px) scale(1.05) rotate(8deg);
  }
}

.animate-float-main {
  animation: float-main 25s ease-smooth infinite;
}

.animate-float-secondary {
  animation: float-secondary 30s ease-smooth infinite;
}
</style>
