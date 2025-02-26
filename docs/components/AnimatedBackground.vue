<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isVisible = ref(true)

onMounted(() => {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d', { alpha: false })
  if (!ctx) return

  const setSize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const displayWidth = window.innerWidth
    const displayHeight = window.innerHeight

    canvas.width = displayWidth * dpr
    canvas.height = displayHeight * dpr
    canvas.style.width = `${displayWidth}px`
    canvas.style.height = `${displayHeight}px`

    ctx.scale(dpr, dpr)
  }

  setSize()

  let resizeTimeout: number | null = null
  const handleResize = () => {
    if (resizeTimeout) {
      window.clearTimeout(resizeTimeout)
    }
    resizeTimeout = window.setTimeout(() => {
      setSize()
      stars = []
      createStars()
    }, 200) as unknown as number
  }

  window.addEventListener('resize', handleResize, { passive: true })

  document.addEventListener('visibilitychange', () => {
    isVisible.value = document.visibilityState === 'visible'
    if (isVisible.value && !animationFrame) {
      lastTime = performance.now()
      animationFrame = requestAnimationFrame(animate)
    }
  })

  let stars: {
    x: number
    y: number
    size: number
    speed: number
    opacity: number
    pulse: number
  }[] = []

  function createStars() {
    const displayWidth = window.innerWidth
    const displayHeight = window.innerHeight

    const sizeFactor = Math.min(displayWidth, displayHeight) / 100
    const density = Math.max(20000, 15000 + 5000 * sizeFactor)
    const numberOfStars = Math.floor((displayWidth * displayHeight) / density) * 3

    stars = []
    for (let i = 0; i < numberOfStars; i++) {
      stars.push({
        x: Math.random() * displayWidth,
        y: Math.random() * displayHeight,
        size: Math.random() * 1.5 + 2,
        speed: Math.random() * 0.04 + 0.02,
        opacity: Math.random() * 0.4 + 0.3,
        pulse: Math.random() * 0.02
      })
    }
  }

  createStars()

  let lastTime = performance.now()
  let animationFrame: number | null = null
  const frameInterval = 1000 / 60

  const colorCache: { [key: string]: string } = {}
  for (let i = 0; i <= 10; i++) {
    const opacity = 0.3 + (i / 10) * 0.5
    colorCache[opacity.toFixed(1)] = `oklch(0.6 0.05 240 / ${opacity.toFixed(1)})`
  }

  const animate = (timestamp: number) => {
    if (!isVisible.value) {
      animationFrame = null
      return
    }

    const deltaTime = timestamp - lastTime

    if (deltaTime < frameInterval) {
      animationFrame = requestAnimationFrame(animate)
      return
    }

    lastTime = timestamp

    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const len = stars.length
    for (let i = 0; i < len; i++) {
      const star = stars[i]

      star.y -= star.speed * deltaTime * 0.1
      if (star.y < -10) {
        star.y = canvas.height + 10
        star.x = Math.random() * canvas.width
      }

      if (i % 5 === 0) {
        star.opacity += star.pulse
        if (star.opacity > 0.8 || star.opacity < 0.3) {
          star.pulse = -star.pulse
        }
      }

      const opacityKey = star.opacity.toFixed(1)
      ctx.fillStyle = colorCache[opacityKey] || `oklch(0.6 0.05 240 / ${star.opacity})`

      if (star.size <= 1) {
        ctx.fillRect(star.x, star.y, star.size, star.size)
      } else {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    animationFrame = requestAnimationFrame(animate)
  }

  lastTime = performance.now()
  animationFrame = requestAnimationFrame(animate)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    document.removeEventListener('visibilitychange', () => { })
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
    }
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }
  })
})
</script>

<template>
  <div class="fixed inset-0 -z-10">
    <canvas ref="canvasRef" class="absolute inset-0" />

    <div class="absolute inset-0 opacity-90"
      style="background: radial-gradient(circle at center, transparent, var(--bg))" />

    <div
      class="absolute lg:-left-[25%] -left-[175%] -top-[15%] transform-gpu will-change-transform overflow-hidden blur-3xl"
      aria-hidden="true">
      <div class="relative aspect-[1155/678] w-[75rem] rotate-[30deg] opacity-25" style="
          background: linear-gradient(to right, var(--primary), var(--secondary));
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
        " />
    </div>

    <div
      class="absolute lg:-right-[20%] -right-[125%] top-[60%] transform-gpu will-change-transform overflow-hidden blur-3xl"
      aria-hidden="true">
      <div class="relative aspect-[800/600] w-[60rem] translate-x-[20%] rotate-[15deg] opacity-10" style="
          background: linear-gradient(to right, var(--secondary), var(--primary));
          border-radius: 60% 40% 30% 70% / 50% 40% 60% 50%;
        " />
    </div>
  </div>
</template>
