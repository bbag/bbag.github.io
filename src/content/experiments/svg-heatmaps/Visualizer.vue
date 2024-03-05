<script lang="ts" setup>
// ---------------------------------------------------- //
// Vue setup                                            //
// ---------------------------------------------------- //

import { computed, ref, watch } from 'vue'

interface Color {
    r: number
    g: number
    b: number
}

// ---------------------------------------------------- //
// Utils                                                //
// ---------------------------------------------------- //

/**
 * Converts an RGB object to a CSS color value
 * @param rgb An RGB object (values from 0 to 1)
 * @returns A CSS color value, e.g. `rgb(255, 255, 255)`
 */
function calcBgColor(color: { r: number, g: number, b: number }) {
    return `${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}`
}

/**
 * Converts an RGB object to a hex color string
 * @param rgb An RGB object (values from 0 to 1)
 */
function rgbToHex(rgb: { r: number, g: number, b: number }) {
    const newR = Math.round(rgb.r * 255)
    const newG = Math.round(rgb.g * 255)
    const newB = Math.round(rgb.b * 255)
    const hex = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
    return hex
}

/**
 * Converts a hex color string to an RGB object (values from 0 to 1)
 * @param hex A hex color string (e.g. '#000000')
 */
function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
        ? {
            r: Math.round(parseInt(result[1], 16) / 255 * 100) / 100,
            g: Math.round(parseInt(result[2], 16) / 255 * 100) / 100,
            b: Math.round(parseInt(result[3], 16) / 255 * 100) / 100
        }
        : { r: 0, g: 0, b: 0 }
}

/**
 * Updates the color in the colors array when the color input changes
 * @param event
 * @param i The index of the color in the colors array
 */
function handleColorInput(event: Event, i: number) {
    if (event.target instanceof HTMLInputElement) {
        colors.value[i] = hexToRgb(event.target.value)
    }
}

/**
 * Updates the color <input> element when its corresponding RGB values change
 * @param i The index of the color in the colors array
 */
function handleRgbInput(i: number) {
    if (colorInputRefs.value[i]) {
        colorInputRefs.value[i].value = rgbToHex(colors.value[i])
    }
}

// ---------------------------------------------------- //
// Component logic                                      //
// ---------------------------------------------------- //

// Refs to the <input type="color"> elements
const colorInputRefs = ref<HTMLInputElement[]>([])

// Initial values for each color stop
const colors = ref<Color[]>([
    { r: 0.17, g: 0.24, b: 0.36 },
    { r: 0.09, g: 0.35, b: 0.65 },
    { r: 0.19, g: 0.67, b: 0.31 },
    { r: 0.95, g: 0.88, b: 0.13 },
    { r: 0.99, g: 0.03, b: 0.08 }
])

// Output feFunc refs
const feFuncOutputR = ref<HTMLSpanElement>()
const feFuncOutputG = ref<HTMLSpanElement>()
const feFuncOutputB = ref<HTMLSpanElement>()

// Output values for the tableValues attributes of the filter
const feFuncRValues = computed(() => colors.value.map(color => color.r).join(' '))
const feFuncGValues = computed(() => colors.value.map(color => color.g).join(' '))
const feFuncBValues = computed(() => colors.value.map(color => color.b).join(' '))

// Update the filter's displayed code values whenever a color changes
watch(
    () => colors,
    () => {
        if (!feFuncOutputR.value || !feFuncOutputG.value || !feFuncOutputB.value) return
        feFuncOutputR.value.innerText = feFuncRValues.value
        feFuncOutputG.value.innerText = feFuncGValues.value
        feFuncOutputB.value.innerText = feFuncBValues.value
    },
    { deep: true }
)

// Stop management
function moveStopUp(i: number) {
    if (i <= 0) return
    const temp = colors.value[i - 1]
    colors.value[i - 1] = colors.value[i]
    colors.value[i] = temp
}

function moveStopDown(i: number) {
    if (i >= colors.value.length - 1) return
    const temp = colors.value[i]
    colors.value[i] = colors.value[i + 1]
    colors.value[i + 1] = temp
}

function deleteStop(i: number) {
    if (colors.value.length < 3) return
    colors.value.splice(i, 1)
}

function addStop() {
    // Generate random RGB values between 0 and 1, rounded to 2 decimal places
    const r = Math.round(Math.random() * 100) / 100
    const g = Math.round(Math.random() * 100) / 100 
    const b = Math.round(Math.random() * 100) / 100 
    colors.value.push({ r, g, b })
}
</script>

<template>
    <!-- <pre>{{ colorsHex }}</pre> -->
    <!-- <pre>{{ colors }}</pre> -->
    <div class="rgb-table-wrapper">
        <div class="rgb-table">
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th><code>feFuncR</code></th>
                        <th><code>feFuncG</code></th>
                        <th><code>feFuncB</code></th>
                        <th></th>
                    </tr>
                    <tr
                        v-for="(color, i) in colors"
                        :key="i"
                    >
                        <td>
                            <span class="color-picker">
                                <input
                                    ref="colorInputRefs"
                                    type="color"
                                    :value="rgbToHex(color)"
                                    @input="handleColorInput($event, i)"
                                />
                                <svg class="line-icon line-icon--sm" width="16" height="16" viewBox="0 0 24 24">
                                    <path d="M11 7l6 6M4 16l11.7 -11.7a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-11.7 11.7h-4v-4z" stroke="rgba(0, 0, 0, 0.5)" stroke-width="4.75" />
                                    <path d="M11 7l6 6M4 16l11.7 -11.7a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-11.7 11.7h-4v-4z" stroke="#FFF" />
                                </svg>
                            </span>
                        </td>
                        <td
                            v-for="c in ['r', 'g', 'b'] as Array<keyof Color>"
                            :key="c"
                        >
                            <input
                                type="number"
                                v-model="color[c]"
                                min="0"
                                max="1"
                                step="0.01"
                                @input="handleRgbInput(i)"
                            />
                        </td>
                        <td class="rgb-table-actions">
                            <button
                                class="kbd-button"
                                data-is-icon
                                @click="moveStopUp(i)"
                                :disabled="i < 1"
                            >
                                <svg class="line-icon line-icon--sm" width="16" height="16" viewBox="0 0 24 24">
                                    <path d="M12 5l0 14" />
                                    <path d="M18 11l-6 -6" />
                                    <path d="M6 11l6 -6" />
                                </svg>
                            </button>
                            <button
                                class="kbd-button"
                                data-is-icon
                                @click="moveStopDown(i)"
                                :disabled="i >= colors.length - 1"
                            >
                                <svg class="line-icon line-icon--sm" width="16" height="16" viewBox="0 0 24 24">
                                    <path d="M12 5l0 14" />
                                    <path d="M18 13l-6 6" />
                                    <path d="M6 13l6 6" />
                                </svg>
                            </button>
                            <button
                                class="kbd-button"
                                data-is-icon
                                @click="deleteStop(i)"
                                :disabled="colors.length < 3"
                            >
                                <svg class="line-icon line-icon--sm" width="16" height="16" viewBox="0 0 24 24">
                                    <path d="M18 6l-12 12" />
                                    <path d="M6 6l12 12" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="rgb-table-buttons">
                <button
                    class="kbd-button"
                    @click="addStop()"
                    :disabled="colors.length >= 10"
                    data-size="lg"
                >
                    Add New Color Stop
                </button>
            </div>
        </div>
    </div>
    <div class="gradient-preview">
        <div class="color-stops">
            <span
                v-for="(color, i) in colors"
                :key="i"
                class="color-stop"
                :data-stop-pin="i"
                :style="{'--bg': `rgb(${calcBgColor(color)})`}"
            ></span>
        </div>
        <svg viewBox="0 0 200 25" class="heatmap-gradient-preview">
            <filter id="heatmap-filter" color-interpolation-filters="sRGB">
                <feComponentTransfer>
                    <feFuncR type="table" :tableValues="feFuncRValues" />
                    <feFuncG type="table" :tableValues="feFuncGValues" />
                    <feFuncB type="table" :tableValues="feFuncBValues" />
                </feComponentTransfer>
            </filter>
            <use href="#svgRect" filter="url(#heatmap-filter)" />
            <use href="#svgRect" y="15" />
        </svg>
    </div>
    <div id="fefunc-output"><pre class="astro-code material-theme-palenight" style="background-color:#292D3E;color:#babed8; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color:#89DDFF">&lt;</span><span style="color:#F07178">feFuncR</span><span style="color:#C792EA"> type</span><span style="color:#89DDFF">=</span><span style="color:#89DDFF">"</span><span style="color:#C3E88D">table</span><span style="color:#89DDFF">"</span><span style="color:#C792EA"> tableValues</span><span style="color:#89DDFF">=</span><span style="color:#89DDFF">"</span><span style="color:#C3E88D" ref="feFuncOutputR">0.17 0.09 0.19 0.95 0.99</span><span style="color:#89DDFF">"</span><span style="color:#89DDFF"> /&gt;</span></span>
<span class="line"><span style="color:#89DDFF">&lt;</span><span style="color:#F07178">feFuncG</span><span style="color:#C792EA"> type</span><span style="color:#89DDFF">=</span><span style="color:#89DDFF">"</span><span style="color:#C3E88D">table</span><span style="color:#89DDFF">"</span><span style="color:#C792EA"> tableValues</span><span style="color:#89DDFF">=</span><span style="color:#89DDFF">"</span><span style="color:#C3E88D" ref="feFuncOutputG">0.24 0.35 0.67 0.88 0.03</span><span style="color:#89DDFF">"</span><span style="color:#89DDFF"> /&gt;</span></span>
<span class="line"><span style="color:#89DDFF">&lt;</span><span style="color:#F07178">feFuncB</span><span style="color:#C792EA"> type</span><span style="color:#89DDFF">=</span><span style="color:#89DDFF">"</span><span style="color:#C3E88D">table</span><span style="color:#89DDFF">"</span><span style="color:#C792EA"> tableValues</span><span style="color:#89DDFF">=</span><span style="color:#89DDFF">"</span><span style="color:#C3E88D" ref="feFuncOutputB">0.36 0.65 0.31 0.13 0.08</span><span style="color:#89DDFF">"</span><span style="color:#89DDFF"> /&gt;</span></span></code></pre></div>
</template>

<style lang="scss" scoped>
@import '@/styles/_Variables.scss';

.heatmap-gradient-preview {
    margin-bottom: 2rem;
}

.gradient-preview {
    padding: 0 0.625rem;
}

.color-stops {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
}

.color-stop {
    position: relative;

    &,
    &::after {
        height: 1.25rem;
    }

    &::after {
        background-color: var(--bg, #FFF);
        border-radius: 1rem 1rem 0 1rem;
        border: 2px solid #FFF;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1), 0 0.125rem 0.375rem rgba(0, 20, 40, 0.25);
        content: '';
        display: block;
        left: 0;
        position: absolute;
        top: 0;
        transform: translateX(-50%) rotate(45deg);
        width: 1.25rem;
    }
}

.rgb-table-wrapper {
    display: flex;
    justify-content: center;
    overflow: hidden;
    max-width: 100%;
    width: 100%;
}

.rgb-table {
    background: #FFF;
    border: 1px solid #DFE3E9;
    border-collapse: collapse;
    box-shadow: 0 1px 2px rgba(0,10,20,0.08);
    border-radius: 0.5rem;
    margin: 0 auto 1rem;
    max-width: 100%;
    padding: 1rem;
    width: auto;

    & th,
    & td {
        padding: 0.25rem;
    }

    & th {
        font-size: 0.875rem;
    }

    & input[type="number"] {
        border: 1px solid #A9AEB6;
        border-radius: 0.25rem;
        height: 2em;
        padding: 0.25rem 0.375rem;
        width: 4.75em;
    }

    & input[type="color"] {
        border: none;
        border-radius: 50%;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        height: 2em;
        padding: 0;
        width: 2em;

        &::-webkit-color-swatch-wrapper {
            padding: 0; 
        }

        &::-webkit-color-swatch {
            border: none;
            border-radius: 50%;
            box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
        }
    }
}

.color-picker {
    align-items: center;
    border-radius: 2em;
    display: grid;
    height: 2em;
    overflow: hidden;
    place-items: center;
    width: 2em;

    & > * {
        grid-area: 1 / 1;
    }

    & svg {
        opacity: 0;
        pointer-events: none;
        transition: opacity 150ms ease;

        tr:hover &,
        tr:focus-within & {
            opacity: 1;
        }
    }
}

.rgb-table-actions {
    align-items: center;
    display: flex;
    flex-wrap: nowrap;
    gap: 0.5rem;

    & .kbd-button {
        height: 2em;
    }
}

.rgb-table-buttons {
    justify-content: center;
    display: flex;
    margin: 1rem 0 0;
}

@media (min-width: $breakpoint-sm) {
    .rgb-table {
        padding: 2rem;

        & th {
            font-size: 1rem;
        }
    }
}
</style>