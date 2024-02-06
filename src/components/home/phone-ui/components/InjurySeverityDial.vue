<script lang="ts" setup>
import { computed } from 'vue'

// ---------------------------------------------------- //
// Props                                                //
// ---------------------------------------------------- //

interface Props {
    percent: number
}

const props = defineProps<Props>()

// ---------------------------------------------------- //
// SVG logic                                            //
// ---------------------------------------------------- //

const pct = computed(() => props.percent || 0)

// Size constants
const meterThickness = 10
const dialCenterRadius = 4
const lineLength = 64
const lineThickness = 2
const svgWidth = 100

// SVG size calculations
const svgBottomPadding = Math.max(dialCenterRadius, (meterThickness + 2) / 2)
const svgHeight = svgWidth / 2 + svgBottomPadding

// Fills the meter based on the percentage
const meterProgress = computed(() => {
    const diff = pct.value / 100 * 50
    return `${diff} ${100 - diff}`
})

// Rotates the line based on the percentage
const rotation = computed(() => {
    return `${pct.value / 100 * 180 - (180 / 2)}deg`
})
</script>

<template>
    <svg :viewBox="`0 0 ${svgWidth} ${svgHeight}`" class="injury-severity-dial">
        <circle
            class="dial-bg"
            :cx="svgWidth / 2"
            :cy="svgHeight - svgBottomPadding"
            :r="(svgWidth - meterThickness ) / 2"
            :stroke-width="meterThickness"
            stroke-dasharray="50 50"
            stroke-dashoffset="50"
            pathLength="100"
        />
        <mask id="meter-mask">
            <circle
                class="dial-meter"
                :cx="svgWidth / 2"
                :cy="svgHeight - svgBottomPadding"
                :r="(svgWidth - meterThickness ) / 2"
                :stroke-width="meterThickness / 2"
                :stroke-dasharray="meterProgress"
                stroke-dashoffset="50"
                pathLength="100"
            />
        </mask>
        <line
            class="dial-line"
            x1="50"
            x2="50"
            :y1="(((svgHeight * 2) - lineLength) / 2) - svgBottomPadding"
            :y2="(svgHeight - (lineThickness / 2)) - svgBottomPadding"
            :stroke-width="lineThickness"
            :style="{ '--r': rotation }"
        />
        <foreignObject
            class="foreign-object"
            x="0"
            y="0"
            :width="svgWidth"
            :height="svgWidth"
            mask="url(#meter-mask)"
        >
            <div class="dial-gradient"></div>
        </foreignObject>
        <circle
            :cx="svgWidth / 2"
            :cy="svgHeight - svgBottomPadding"
            :r="dialCenterRadius"
            fill="#41444B"
        />
    </svg>
</template>

<style lang="scss" scoped>
.injury-severity-dial {
    // outline: 1px solid red;
    fill: none;
    height: auto;
    margin: 1rem 0;
    stroke-linecap: round;
    width: 100%;
}

.dial-bg {
    stroke: rgba(0, 10, 20, 0.08);
}

.dial-meter {
    stroke: #FFF;
}

.dial-line {
    stroke: #41444B;
    transform: rotate(var(--r, 0));
    transform-box: stroke-box;
    transform-origin: bottom center;
}

.dial-gradient {
    background: conic-gradient(
        from 270deg at 50% 50%,
        #437BDC 0%,
        #51FF50 16%,
        #F5DF3A 33%,
        #EF2828 50%,
        #EF2828 74%,
        #437BDC 76%
    );
    border-radius: 50%;
    height: 100%;
    width: 100%;
}
</style>