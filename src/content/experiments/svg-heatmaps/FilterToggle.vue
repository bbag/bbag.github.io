<script lang="ts" setup>
import { ref } from 'vue'

const opacity = ref(0.70)

const handleOpacityChange = (event) => {
    opacity.value = event.target.value
}
</script>

<template>
    <div style="display: grid; gap: 2rem; grid-template-columns: 1fr 1fr; margin-bottom: 1rem;">
        <div>
            <svg viewBox="0 0 100 100" style="width: 100%;">
                <g style="filter: url(#heatmap-filter);">
                    <rect fill="black" x="0" y="0" width="100" height="100" />
                    <circle fill="white" cx="50" cy="50" r="20" :style="`filter: blur(8px); opacity: ${opacity};`" />
                    <title>SVG with the filter applied</title>
                </g>
            </svg>
            <p class="opacity-display">
                <span>Opacity:</span>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    v-model="opacity"
                    @input="handleOpacityChange($event)"
                >
                <span style="width: 2.625em;">{{ Math.round(opacity * 100) + '%' }}</span>
            </p>
        </div>
        <div>
            <svg viewBox="0 0 100 100" style="width: 100%;">
                <g>
                    <rect fill="black" x="0" y="0" width="100" height="100" />
                    <circle fill="white" cx="50" cy="50" r="20" :style="`filter: blur(8px); opacity: ${opacity};`" />
                    <title>The same SVG with no filter applied</title>
                </g>
            </svg>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.opacity-display {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin: 1rem auto 0;
}

input[type="range"] {
    width: 8rem;
}
</style>