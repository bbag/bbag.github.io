<script lang="ts" setup>
import { ref } from 'vue'

import {
    // type Injuries,
    // type Severity,
    injuryNameMap,
    injurySvgHeatmapPaths,
    injurySvgPartPaths
} from './heatmapPathData'

import { patients } from './utils/patientData'

const currentPatient = ref(0)

function calculateInjuryOpacity(pathName: string) {
    const patientInjury = patients[currentPatient.value].injuries.find(injury => injury.part === pathName)
    if (patientInjury) {
        return patientInjury.severity / 100 || 0
    }
    else {
        return 0
    }
}

function incrementCurrentPatient() {
    currentPatient.value === patients.length - 1 ? currentPatient.value = 0 : currentPatient.value = currentPatient.value + 1
}

function decrementCurrentPatient() {
    currentPatient.value === 0 ? currentPatient.value = patients.length - 1 : currentPatient.value = currentPatient.value - 1
}

// ---------------------------------------------------------- //
// Height scale                                               //
// ---------------------------------------------------------- //

const heightScaleFootSegments = 6
const heightScaleTotalFeet = 7

function calcHeightScaleY(n: number) {
    let patientHeight = patients[currentPatient.value].stats.find(stat => stat.label === 'Height')?.value as number

    // If no height is found, default to 6 feet (just making TypeScript happy here...)
    if (!patientHeight) {
        patientHeight = 6
    }

    return (n - 1) * patientHeight / heightScaleFootSegments * 0.865
}

function calcHeightReadout(n: number) {
    return (n - 1) % heightScaleFootSegments === 0 ? `${(n - 1) / heightScaleFootSegments}’` : '&nbsp;'
}

// ---------------------------------------------------------- //
// Patient stats                                              //
// ---------------------------------------------------------- //

const isPatientStatsOpen = ref(false)

</script>

<template>
    <div class="screen">
        <div class="screen-header">
            <h2 class="screen-title">Health Tracker</h2>
            <div class="screen-nav">
                <button class="screen-nav-button" @click="decrementCurrentPatient">
                    <svg class="line-icon" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M5 12l14 0" />
                        <path d="M5 12l4 4" />
                        <path d="M5 12l4 -4" />
                    </svg>
                </button>
                <span>Patient #{{ currentPatient + 1 }}</span>
                <button class="screen-nav-button" @click="incrementCurrentPatient">
                    <svg class="line-icon" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M5 12l14 0" />
                        <path d="M15 16l4 -4" />
                        <path d="M15 8l4 4" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="heatmap-container">
            <ul class="height-scale">
                <li
                    v-for="n in (heightScaleFootSegments * heightScaleTotalFeet)"
                    :key="n"
                    :class="(n - 1) % heightScaleFootSegments === 0 ? 'height-scale-label' : 'height-scale-segment'"
                    :style="{ transform: `translateY(-${calcHeightScaleY(n)}rem)` }"
                    v-html="calcHeightReadout(n)"
                ></li>
            </ul>
            <svg class="heatmap-svg" viewBox="34 -238.6 211.9 620.6">
                <filter id="heatmap-filter" color-interpolation-filters="sRGB">
                    <!-- Crank up the exposure just a tad -->
                    <feComponentTransfer>
                        <feFuncR type="table" tableValues="0 0.3 0.6 0.9 1" />
                        <feFuncG type="table" tableValues="0 0.3 0.6 0.9 1" />
                        <feFuncB type="table" tableValues="0 0.3 0.6 0.9 1" />
                    </feComponentTransfer>
                        <!-- Turn black-white gradient into blue-green-yellow-red gradient -->
                    <feComponentTransfer>
                        <feFuncR type="table" tableValues="0.165 0.094 0.192 0.949 0.984" />
                        <feFuncG type="table" tableValues="0.239 0.353 0.667 0.882 0.027" />
                        <feFuncB type="table" tableValues="0.361 0.647 0.31  0.129 0.078" />
                        <!-- <feFuncR type="table" tableValues="0.043 0.094 0.192 0.949 0.984" />
                        <feFuncG type="table" tableValues="0.047 0.353 0.667 0.882 0.027" />
                        <feFuncB type="table" tableValues="0.055 0.647 0.31  0.129 0.078" /> -->
                    </feComponentTransfer>
                </filter>
                <mask id="heatmap-mask">
                    <path fill="#FFF" d="M180 376.5c0 1.8.6 3.4 3.8 3.4s3.6-1.5 3.6-3.4c0-.9-.3-1.8-.9-2.4l.1.1-12.8-16.3c-2-2.5-3-5.6-3.1-8.7l-.3-13c0-1.1.1-2.2.3-3.3l13.9-69.9c1-4.9 1.1-9.8.2-14.7l-3.4-19.7c-.4-2.3-.3-4.7.4-6.9l1.8-5.9c.4-1.3.6-2.6.6-3.9l.6-21.6c.1-1.7.4-3.3 1-4.9l5.1-13.6c3-8 4.7-16.4 5-24.9l3.1-78c.4-9.1-1.1-18.2-4.2-26.8l-4.3-11.9c-.7-1.9-.8-4-.3-6l1.7-6.5c.4-1.6.4-3.3 0-4.9l-1.7-7c-.4-1.4-.4-2.9-.1-4.4l8.2-39.5 5.1 14.7c.6 1.7.7 3.5.4 5.2l-1.4 7a40.6 40.6 0 0 0 2.2 22.6l22.7 56.7c.5 1.3.3 2.9-.6 4l-4.6 5.8c-.7.8-1.2 1.8-1.6 2.9l-8.8 25.1a3 3 0 0 0 5.3 2.7l11-15.1c.7-1.3 2.4-1.8 3.7-1.1 1 .5 1.6 1.5 1.6 2.6l-.4 16.1c-.1 1-.4 1.9-.9 2.7l-3.1 4.5c-.5.6-1 1.1-1.6 1.5l-9 5.4a2.2 2.2 0 0 0 1.8 4l11.7-3.8c.8-.2 1.5-.7 2.1-1.3l5.6-6c.6-.6 1-1.3 1.2-2.1l3.6-13.3c.2-.6.2-1.1.2-1.7l-1.9-27.8c1.1-3.5 1-7 0-10.5L239.4 10c-.7-11.9-3-23.7-6.8-35.1l-1.5-4.4c-.3-1-.5-2-.5-3l-.6-37.9c-.1-1 .1-1.9.3-2.8l2.5-9.4c1-3.4.7-7-.8-10.2l-6.3-13.7c-1.4-3.1-3.8-5.6-6.8-7.1l-53.5-27.7c-3.1-1.6-5.2-4.8-5.4-8.3l-.8-12.9c2.3-3.7 4-8 5.3-12.2 1.7 2 4.7 1.2 8.4-11.2 3.4-11.4-1.2-15.7-4.1-12.2 2.1-21.7-6.6-39-28.9-39-22.3 0-31 17.3-28.9 39-2.9-3.5-7.5.8-4 12.3 3.7 12.4 6.7 13.2 8.4 11.2 1.3 4.1 2.9 8.3 5.2 11.9l-.7 13c-.2 3.5-2.3 6.7-5.4 8.3L61-113.7c-3 1.5-5.4 4-6.8 7.1L47.9-93c-1.5 3.2-1.8 6.8-.8 10.2l2.5 9.4c.2.9.4 1.8.3 2.8l-.5 37.9c0 1-.2 2-.5 3l-1.5 4.4c-3.8 11.4-6.1 23.2-6.8 35.1l-3.2 52.7c-1 3.5-1.1 7 0 10.5l-1.9 27.8c0 .6 0 1.1.2 1.7l3.6 13.3c.2.8.6 1.5 1.2 2.1l5.6 6c.6.6 1.3 1.1 2.1 1.3l11.7 3.8c1.4.5 2.9-.6 2.9-2.1 0-.8-.4-1.5-1.1-1.9l-9-5.4c-.6-.4-1.1-.9-1.6-1.5l-3.1-4.5c-.5-.8-.8-1.7-.9-2.7l-.4-16.1c0-1.1.6-2.1 1.6-2.6 1.3-.7 3-.2 3.7 1.1l10.7 15.3a3 3 0 0 0 5.3-2.7l-8.8-25.1c-.4-1.1-.9-2.1-1.6-2.9L53 72.1c-.9-1.1-1.1-2.7-.6-4l22.9-56.8c2.9-7.2 3.6-15 2.2-22.6l-1.4-7c-.3-1.7-.2-3.5.4-5.2l5.1-14.6 8.2 39.5c.3 1.5.3 3-.1 4.4l-1.7 7c-.4 1.6-.4 3.3 0 4.9l1.7 6.5c.5 2 .4 4.1-.3 6l-4.3 11.9c-3.1 8.6-4.6 17.7-4.2 26.8l3.1 78c.3 8.5 2 16.9 5 24.9l5.1 13.6c.6 1.6.9 3.2 1 4.9l.6 21.6c0 1.3.2 2.6.6 3.9l1.8 5.9c.7 2.2.8 4.6.4 6.9l-3.4 19.7c-.9 4.9-.8 9.8.2 14.7l13.9 69.9c.2 1.1.3 2.2.3 3.3l-.3 13c-.1 3.1-1.1 6.2-3.1 8.7l-12.8 16.3.1-.1c-.6.6-.9 1.5-.9 2.4 0 1.9.4 3.4 3.6 3.4 3.3 0 3.8-1.6 3.8-3.4v-.4c0 2.1.4 3.8 3.8 3.8 2.8 0 3.6-1.2 3.7-2.7.2 1.7 1 2.9 4 2.9 2.3 0 3.3-.8 3.7-1.9l.1-.3c.4 1.4 1.4 2.4 4.1 2.4 2.5 0 3.6-.9 4-2.1l.1-.3c.7 1.5 2.3 2.6 5.2 2.6h3c1.8 0 3.5-1.1 4.3-2.7l.8-1.6c.7-1.3 1-2.8.9-4.3l-.8-12.4c0-1.9-.3-3.7-.8-5.5l-2.9-10.6a8.1 8.1 0 0 1-.3-3.8c.2-1.8-.1-3.5-.8-5.3-.5-1.2-.8-2.5-.8-3.9l.6-32.3c0-1.9.3-3.8.9-5.6l2.9-9.3c.9-2.9 1.1-6 .7-9l-5.2-33.4c-.6-3.9 0-7.9 1.6-11.5l2.4-5.1c1.2-2.6 1.9-5.5 1.9-8.4v-31.6l-1.4-19.7 4.4-87.2 4.4 87.2-1.4 19.7v31.6c0 2.9.6 5.8 1.9 8.4l2.4 5.1c1.7 3.6 2.2 7.6 1.6 11.5l-5.2 33.4c-.5 3-.2 6.1.7 9l2.9 9.3c.6 1.8.9 3.7.9 5.6l.6 32.3c0 1.3-.3 2.6-.8 3.9-.8 1.8-1.1 3.5-.8 5.3.2 1.3 0 2.6-.3 3.8l-3.1 10.6c-.5 1.8-.8 3.7-.8 5.5l-.8 12.4c-.1 1.5.2 2.9.9 4.3l.8 1.6a5.1 5.1 0 0 0 4.3 2.7h3c3 0 4.6-1 5.3-2.6l.1.3c.4 1.2 1.5 2.1 4 2.1 2.8 0 3.8-1 4.1-2.4l.1.3c.4 1.1 1.4 1.9 3.7 1.9 3 0 3.8-1.2 4-2.9.2 1.6.9 2.7 3.7 2.7 3.4 0 3.8-1.7 3.8-3.8v.4z" />
                </mask>
                <g class="heatmap">
                    <path class="background" d="M180 376.5c0 1.8.6 3.4 3.8 3.4s3.6-1.5 3.6-3.4c0-.9-.3-1.8-.9-2.4l.1.1-12.8-16.3c-2-2.5-3-5.6-3.1-8.7l-.3-13c0-1.1.1-2.2.3-3.3l13.9-69.9c1-4.9 1.1-9.8.2-14.7l-3.4-19.7c-.4-2.3-.3-4.7.4-6.9l1.8-5.9c.4-1.3.6-2.6.6-3.9l.6-21.6c.1-1.7.4-3.3 1-4.9l5.1-13.6c3-8 4.7-16.4 5-24.9l3.1-78c.4-9.1-1.1-18.2-4.2-26.8l-4.3-11.9c-.7-1.9-.8-4-.3-6l1.7-6.5c.4-1.6.4-3.3 0-4.9l-1.7-7c-.4-1.4-.4-2.9-.1-4.4l8.2-39.5 5.1 14.7c.6 1.7.7 3.5.4 5.2l-1.4 7a40.6 40.6 0 0 0 2.2 22.6l22.7 56.7c.5 1.3.3 2.9-.6 4l-4.6 5.8c-.7.8-1.2 1.8-1.6 2.9l-8.8 25.1a3 3 0 0 0 5.3 2.7l11-15.1c.7-1.3 2.4-1.8 3.7-1.1 1 .5 1.6 1.5 1.6 2.6l-.4 16.1c-.1 1-.4 1.9-.9 2.7l-3.1 4.5c-.5.6-1 1.1-1.6 1.5l-9 5.4a2.2 2.2 0 0 0 1.8 4l11.7-3.8c.8-.2 1.5-.7 2.1-1.3l5.6-6c.6-.6 1-1.3 1.2-2.1l3.6-13.3c.2-.6.2-1.1.2-1.7l-1.9-27.8c1.1-3.5 1-7 0-10.5L239.4 10c-.7-11.9-3-23.7-6.8-35.1l-1.5-4.4c-.3-1-.5-2-.5-3l-.6-37.9c-.1-1 .1-1.9.3-2.8l2.5-9.4c1-3.4.7-7-.8-10.2l-6.3-13.7c-1.4-3.1-3.8-5.6-6.8-7.1l-53.5-27.7c-3.1-1.6-5.2-4.8-5.4-8.3l-.8-12.9c2.3-3.7 4-8 5.3-12.2 1.7 2 4.7 1.2 8.4-11.2 3.4-11.4-1.2-15.7-4.1-12.2 2.1-21.7-6.6-39-28.9-39-22.3 0-31 17.3-28.9 39-2.9-3.5-7.5.8-4 12.3 3.7 12.4 6.7 13.2 8.4 11.2 1.3 4.1 2.9 8.3 5.2 11.9l-.7 13c-.2 3.5-2.3 6.7-5.4 8.3L61-113.7c-3 1.5-5.4 4-6.8 7.1L47.9-93c-1.5 3.2-1.8 6.8-.8 10.2l2.5 9.4c.2.9.4 1.8.3 2.8l-.5 37.9c0 1-.2 2-.5 3l-1.5 4.4c-3.8 11.4-6.1 23.2-6.8 35.1l-3.2 52.7c-1 3.5-1.1 7 0 10.5l-1.9 27.8c0 .6 0 1.1.2 1.7l3.6 13.3c.2.8.6 1.5 1.2 2.1l5.6 6c.6.6 1.3 1.1 2.1 1.3l11.7 3.8c1.4.5 2.9-.6 2.9-2.1 0-.8-.4-1.5-1.1-1.9l-9-5.4c-.6-.4-1.1-.9-1.6-1.5l-3.1-4.5c-.5-.8-.8-1.7-.9-2.7l-.4-16.1c0-1.1.6-2.1 1.6-2.6 1.3-.7 3-.2 3.7 1.1l10.7 15.3a3 3 0 0 0 5.3-2.7l-8.8-25.1c-.4-1.1-.9-2.1-1.6-2.9L53 72.1c-.9-1.1-1.1-2.7-.6-4l22.9-56.8c2.9-7.2 3.6-15 2.2-22.6l-1.4-7c-.3-1.7-.2-3.5.4-5.2l5.1-14.6 8.2 39.5c.3 1.5.3 3-.1 4.4l-1.7 7c-.4 1.6-.4 3.3 0 4.9l1.7 6.5c.5 2 .4 4.1-.3 6l-4.3 11.9c-3.1 8.6-4.6 17.7-4.2 26.8l3.1 78c.3 8.5 2 16.9 5 24.9l5.1 13.6c.6 1.6.9 3.2 1 4.9l.6 21.6c0 1.3.2 2.6.6 3.9l1.8 5.9c.7 2.2.8 4.6.4 6.9l-3.4 19.7c-.9 4.9-.8 9.8.2 14.7l13.9 69.9c.2 1.1.3 2.2.3 3.3l-.3 13c-.1 3.1-1.1 6.2-3.1 8.7l-12.8 16.3.1-.1c-.6.6-.9 1.5-.9 2.4 0 1.9.4 3.4 3.6 3.4 3.3 0 3.8-1.6 3.8-3.4v-.4c0 2.1.4 3.8 3.8 3.8 2.8 0 3.6-1.2 3.7-2.7.2 1.7 1 2.9 4 2.9 2.3 0 3.3-.8 3.7-1.9l.1-.3c.4 1.4 1.4 2.4 4.1 2.4 2.5 0 3.6-.9 4-2.1l.1-.3c.7 1.5 2.3 2.6 5.2 2.6h3c1.8 0 3.5-1.1 4.3-2.7l.8-1.6c.7-1.3 1-2.8.9-4.3l-.8-12.4c0-1.9-.3-3.7-.8-5.5l-2.9-10.6a8.1 8.1 0 0 1-.3-3.8c.2-1.8-.1-3.5-.8-5.3-.5-1.2-.8-2.5-.8-3.9l.6-32.3c0-1.9.3-3.8.9-5.6l2.9-9.3c.9-2.9 1.1-6 .7-9l-5.2-33.4c-.6-3.9 0-7.9 1.6-11.5l2.4-5.1c1.2-2.6 1.9-5.5 1.9-8.4v-31.6l-1.4-19.7 4.4-87.2 4.4 87.2-1.4 19.7v31.6c0 2.9.6 5.8 1.9 8.4l2.4 5.1c1.7 3.6 2.2 7.6 1.6 11.5l-5.2 33.4c-.5 3-.2 6.1.7 9l2.9 9.3c.6 1.8.9 3.7.9 5.6l.6 32.3c0 1.3-.3 2.6-.8 3.9-.8 1.8-1.1 3.5-.8 5.3.2 1.3 0 2.6-.3 3.8l-3.1 10.6c-.5 1.8-.8 3.7-.8 5.5l-.8 12.4c-.1 1.5.2 2.9.9 4.3l.8 1.6a5.1 5.1 0 0 0 4.3 2.7h3c3 0 4.6-1 5.3-2.6l.1.3c.4 1.2 1.5 2.1 4 2.1 2.8 0 3.8-1 4.1-2.4l.1.3c.4 1.1 1.4 1.9 3.7 1.9 3 0 3.8-1.2 4-2.9.2 1.6.9 2.7 3.7 2.7 3.4 0 3.8-1.7 3.8-3.8v.4z" />
                    <path
                        v-for="(path, i) in injurySvgHeatmapPaths"
                        :key="i"
                        :data-part="path.name"
                        :d="path.d"
                        :style="`--b: ${path.blur * 1.75}rem; --o: ${calculateInjuryOpacity(path.name)};`"
                    ></path>
                </g>
                <g class="outline">
                    <path d="m159.2-162.4.8 12.8c.2 3.5 2.3 6.7 5.4 8.3l53.5 27.7c3 1.5 5.4 4 6.8 7.1l6.3 13.7c1.5 3.2 1.8 6.8.8 10.2l-2.5 9.4c-.2.9-.4 1.8-.3 2.8l.6 37.9c0 1 .2 2 .5 3l1.5 4.4c3.8 11.4 6.1 23.2 6.8 35.1l3.2 52.7c1 3.5 1.1 7 0 10.5l1.9 27.8c0 .6 0 1.1-.2 1.7l-3.6 13.3c-.2.8-.6 1.5-1.2 2.1l-5.6 6c-.6.6-1.3 1.1-2.1 1.3l-11.7 3.8c-1.4.5-2.9-.6-2.9-2.1h0c0-.8.4-1.5 1.1-1.9l9-5.4c.6-.4 1.1-.9 1.6-1.5l3.1-4.5c.5-.8.8-1.7.9-2.7l.4-16.1c0-1.1-.6-2.1-1.6-2.6h0c-1.3-.7-3-.2-3.7 1.1l-11 15.1a3 3 0 0 1-4 .9h0a3 3 0 0 1-1.3-3.6l8.8-25.1c.4-1.1.9-2.1 1.6-2.9l4.6-5.8c.9-1.1 1.1-2.7.6-4l-22.7-56.7c-2.9-7.2-3.6-15-2.2-22.6l1.4-7c.3-1.7.2-3.5-.4-5.2L198.3-38c-.8-2.2-1.1-4.5-1.1-6.8l.3-25.3" />
                    <path d="m206.8-80.6-12.3 13.7c-3.6 4-9.1 5.8-14.4 4.6l-30.6-6.8M164.7 374.4c.2.5.3 1.1.3 1.7 0 .8-.1 1.5-.2 2.1.4 1.1 1.4 1.9 3.7 1.9 3.6 0 4-1.8 4-4 0-1.2-.4-2.3-1.2-3.1" />
                    <path d="M179.1 373.4c.6.7.9 1.6.9 2.7 0 2.1-.4 3.8-3.8 3.8s-3.8-1.7-3.8-3.8" />
                    <path d="m198.3-38.1-8.2 39.5c-.3 1.5-.3 3 .1 4.4l1.7 7c.4 1.6.4 3.3 0 4.9l-1.7 6.5c-.5 2-.4 4.1.3 6l4.3 11.9c3.1 8.6 4.6 17.7 4.2 26.8l-3.1 78c-.3 8.5-2 16.9-5 24.9l-5.1 13.6c-.6 1.6-.9 3.2-1 4.9l-.6 21.6c0 1.3-.2 2.6-.6 3.9l-1.8 5.9c-.7 2.2-.8 4.6-.4 6.9l3.4 19.7c.9 4.9.8 9.8-.2 14.7l-13.9 69.9c-.2 1.1-.3 2.2-.3 3.3l.3 13c.1 3.1 1.1 6.2 3.1 8.7l12.8 16.3-.1-.1c.6.6.9 1.5.9 2.4 0 1.9-.4 3.4-3.6 3.4s-3.8-1.6-3.8-3.4M156.7 374c.2.5.2 1.1.2 1.7 0 .9-.1 1.8-.3 2.5.4 1.2 1.5 2.1 4 2.1 3.9 0 4.3-1.9 4.3-4.3 0-1.3-.4-2.5-1.3-3.3M153.4 219.8c3.5 6.1 12.8 6.3 17.5 1.4M140-151.1c-14.2 0-21-11.8-24.6-23.5-1.7 2-4.7 1.2-8.4-11.2-3.5-11.5 1.1-15.8 4-12.3h0c-2.1-21.7 6.6-39 28.9-39 22.3 0 31 17.3 28.9 39h0c2.9-3.5 7.5.8 4.1 12.2-3.7 12.4-6.7 13.2-8.4 11.2-3.5 11.8-10.4 23.6-24.5 23.6z" />
                    <path d="m120.7-162.4-.7 12.8c-.2 3.5-2.3 6.7-5.4 8.3l-53.5 27.7c-3 1.5-5.4 4-6.8 7.1L48-92.9c-1.5 3.2-1.8 6.8-.8 10.2l2.5 9.4c.2.9.4 1.8.3 2.8l-.5 37.9c0 1-.2 2-.5 3l-1.5 4.4C43.7-13.8 41.4-2 40.7 9.9l-3.2 52.7c-1 3.5-1.1 7 0 10.5l-1.9 27.8c0 .6 0 1.1.2 1.7l3.6 13.3c.2.8.6 1.5 1.2 2.1l5.6 6c.6.6 1.3 1.1 2.1 1.3l11.7 3.8c1.4.5 2.9-.6 2.9-2.1h0c0-.8-.4-1.5-1.1-1.9l-9-5.4c-.6-.4-1.1-.9-1.6-1.5l-3.1-4.5c-.5-.8-.8-1.7-.9-2.7l-.4-16.1c0-1.1.6-2.1 1.6-2.6h0c1.3-.7 3-.2 3.7 1.1l10.7 15.3a3 3 0 0 0 4 .9h0a3 3 0 0 0 1.3-3.6l-8.8-25.1c-.4-1.1-.9-2.1-1.6-2.9l-4.6-5.8c-.9-1.1-1.1-2.7-.6-4l22.9-56.8c2.9-7.2 3.6-15 2.2-22.6l-1.4-7c-.3-1.7-.2-3.5.4-5.2L81.7-38c.8-2.2 1.1-4.5 1.1-6.8l-.3-25.3" />
                    <path d="m73.1-80.6 12.3 13.7c3.6 4 9.1 5.8 14.4 4.6l30.6-6.8M115.2 374.4c-.2.5-.3 1.1-.3 1.7 0 .8.1 1.5.2 2.1-.4 1.1-1.4 1.9-3.7 1.9-3.6 0-4-1.8-4-4 0-1.2.4-2.3 1.2-3.1" />
                    <path d="M100.8 373.4a4 4 0 0 0-.9 2.7c0 2.1.4 3.8 3.8 3.8s3.8-1.7 3.8-3.8" />
                    <path d="m81.6-38.1 8.2 39.5c.3 1.5.3 3-.1 4.4l-1.7 7c-.4 1.6-.4 3.3 0 4.9l1.7 6.5c.5 2 .4 4.1-.3 6l-4.3 11.9c-3.1 8.6-4.6 17.7-4.2 26.8l3.1 78c.3 8.5 2 16.9 5 24.9l5.1 13.6c.6 1.6.9 3.2 1 4.9l.6 21.6c0 1.3.2 2.6.6 3.9l1.8 5.9c.7 2.2.8 4.6.4 6.9l-3.4 19.7c-.9 4.9-.8 9.8.2 14.7l13.9 69.9c.2 1.1.3 2.2.3 3.3l-.3 13c-.1 3.1-1.1 6.2-3.1 8.7l-12.8 16.3.1-.1c-.6.6-.9 1.5-.9 2.4 0 1.9.4 3.4 3.6 3.4 3.3 0 3.8-1.6 3.8-3.4M123.2 374c-.2.5-.2 1.1-.2 1.7 0 .9.1 1.8.3 2.5-.4 1.2-1.5 2.1-4 2.1-3.9 0-4.3-1.9-4.3-4.3 0-1.3.4-2.5 1.3-3.3" />
                    <path d="M124.2 372.2c-.9.9-1.3 2.1-1.3 3.5 0 2.6 1.5 4.8 5.7 4.8h3c1.8 0 3.5-1.1 4.3-2.7l.8-1.6c.7-1.3 1-2.8.9-4.3l-.8-12.4c0-1.9-.3-3.7-.8-5.5l-2.9-10.6a8.1 8.1 0 0 1-.3-3.8c.2-1.8-.1-3.5-.8-5.3-.5-1.2-.8-2.5-.8-3.9l.6-32.3c0-1.9.3-3.8.9-5.6l2.9-9.3c.9-2.9 1.1-6 .7-9l-5.2-33.4c-.6-3.9 0-7.9 1.6-11.5l2.4-5.1c1.2-2.6 1.9-5.5 1.9-8.4v-31.6l-1.4-19.7 4.4-87.2 4.4 87.2-1.4 19.7v31.6c0 2.9.6 5.8 1.9 8.4l2.4 5.1c1.7 3.6 2.2 7.6 1.6 11.5l-5.2 33.4c-.5 3-.2 6.1.7 9l2.9 9.3c.6 1.8.9 3.7.9 5.6l.6 32.3c0 1.3-.3 2.6-.8 3.9-.8 1.8-1.1 3.5-.8 5.3.2 1.3 0 2.6-.3 3.8l-3.1 10.6c-.5 1.8-.8 3.7-.8 5.5l-.8 12.4c-.1 1.5.2 2.9.9 4.3l.8 1.6a5.1 5.1 0 0 0 4.3 2.7h3c4.3 0 5.8-2.1 5.7-4.8 0-1.4-.4-2.6-1.3-3.5M126.5 219.8c-3.5 6.1-12.8 6.3-17.5 1.4" />
                    <path d="m111 66.3 23.2 9.7c3.7 1.6 7.9 1.6 11.6 0l23.2-9.7" />
                </g>
                <g class="part-buttons">
                    <path fill="transparent" d="M180 376.5c0 1.8.6 3.4 3.8 3.4s3.6-1.5 3.6-3.4c0-.9-.3-1.8-.9-2.4l.1.1-12.8-16.3c-2-2.5-3-5.6-3.1-8.7l-.3-13c0-1.1.1-2.2.3-3.3l13.9-69.9c1-4.9 1.1-9.8.2-14.7l-3.4-19.7c-.4-2.3-.3-4.7.4-6.9l1.8-5.9c.4-1.3.6-2.6.6-3.9l.6-21.6c.1-1.7.4-3.3 1-4.9l5.1-13.6c3-8 4.7-16.4 5-24.9l3.1-78c.4-9.1-1.1-18.2-4.2-26.8l-4.3-11.9c-.7-1.9-.8-4-.3-6l1.7-6.5c.4-1.6.4-3.3 0-4.9l-1.7-7c-.4-1.4-.4-2.9-.1-4.4l8.2-39.5 5.1 14.7c.6 1.7.7 3.5.4 5.2l-1.4 7a40.6 40.6 0 0 0 2.2 22.6l22.7 56.7c.5 1.3.3 2.9-.6 4l-4.6 5.8c-.7.8-1.2 1.8-1.6 2.9l-8.8 25.1a3 3 0 0 0 5.3 2.7l11-15.1c.7-1.3 2.4-1.8 3.7-1.1 1 .5 1.6 1.5 1.6 2.6l-.4 16.1c-.1 1-.4 1.9-.9 2.7l-3.1 4.5c-.5.6-1 1.1-1.6 1.5l-9 5.4a2.2 2.2 0 0 0 1.8 4l11.7-3.8c.8-.2 1.5-.7 2.1-1.3l5.6-6c.6-.6 1-1.3 1.2-2.1l3.6-13.3c.2-.6.2-1.1.2-1.7l-1.9-27.8c1.1-3.5 1-7 0-10.5L239.4 10c-.7-11.9-3-23.7-6.8-35.1l-1.5-4.4c-.3-1-.5-2-.5-3l-.6-37.9c-.1-1 .1-1.9.3-2.8l2.5-9.4c1-3.4.7-7-.8-10.2l-6.3-13.7c-1.4-3.1-3.8-5.6-6.8-7.1l-53.5-27.7c-3.1-1.6-5.2-4.8-5.4-8.3l-.8-12.9c2.3-3.7 4-8 5.3-12.2 1.7 2 4.7 1.2 8.4-11.2 3.4-11.4-1.2-15.7-4.1-12.2 2.1-21.7-6.6-39-28.9-39-22.3 0-31 17.3-28.9 39-2.9-3.5-7.5.8-4 12.3 3.7 12.4 6.7 13.2 8.4 11.2 1.3 4.1 2.9 8.3 5.2 11.9l-.7 13c-.2 3.5-2.3 6.7-5.4 8.3L61-113.7c-3 1.5-5.4 4-6.8 7.1L47.9-93c-1.5 3.2-1.8 6.8-.8 10.2l2.5 9.4c.2.9.4 1.8.3 2.8l-.5 37.9c0 1-.2 2-.5 3l-1.5 4.4c-3.8 11.4-6.1 23.2-6.8 35.1l-3.2 52.7c-1 3.5-1.1 7 0 10.5l-1.9 27.8c0 .6 0 1.1.2 1.7l3.6 13.3c.2.8.6 1.5 1.2 2.1l5.6 6c.6.6 1.3 1.1 2.1 1.3l11.7 3.8c1.4.5 2.9-.6 2.9-2.1 0-.8-.4-1.5-1.1-1.9l-9-5.4c-.6-.4-1.1-.9-1.6-1.5l-3.1-4.5c-.5-.8-.8-1.7-.9-2.7l-.4-16.1c0-1.1.6-2.1 1.6-2.6 1.3-.7 3-.2 3.7 1.1l10.7 15.3a3 3 0 0 0 5.3-2.7l-8.8-25.1c-.4-1.1-.9-2.1-1.6-2.9L53 72.1c-.9-1.1-1.1-2.7-.6-4l22.9-56.8c2.9-7.2 3.6-15 2.2-22.6l-1.4-7c-.3-1.7-.2-3.5.4-5.2l5.1-14.6 8.2 39.5c.3 1.5.3 3-.1 4.4l-1.7 7c-.4 1.6-.4 3.3 0 4.9l1.7 6.5c.5 2 .4 4.1-.3 6l-4.3 11.9c-3.1 8.6-4.6 17.7-4.2 26.8l3.1 78c.3 8.5 2 16.9 5 24.9l5.1 13.6c.6 1.6.9 3.2 1 4.9l.6 21.6c0 1.3.2 2.6.6 3.9l1.8 5.9c.7 2.2.8 4.6.4 6.9l-3.4 19.7c-.9 4.9-.8 9.8.2 14.7l13.9 69.9c.2 1.1.3 2.2.3 3.3l-.3 13c-.1 3.1-1.1 6.2-3.1 8.7l-12.8 16.3.1-.1c-.6.6-.9 1.5-.9 2.4 0 1.9.4 3.4 3.6 3.4 3.3 0 3.8-1.6 3.8-3.4v-.4c0 2.1.4 3.8 3.8 3.8 2.8 0 3.6-1.2 3.7-2.7.2 1.7 1 2.9 4 2.9 2.3 0 3.3-.8 3.7-1.9l.1-.3c.4 1.4 1.4 2.4 4.1 2.4 2.5 0 3.6-.9 4-2.1l.1-.3c.7 1.5 2.3 2.6 5.2 2.6h3c1.8 0 3.5-1.1 4.3-2.7l.8-1.6c.7-1.3 1-2.8.9-4.3l-.8-12.4c0-1.9-.3-3.7-.8-5.5l-2.9-10.6a8.1 8.1 0 0 1-.3-3.8c.2-1.8-.1-3.5-.8-5.3-.5-1.2-.8-2.5-.8-3.9l.6-32.3c0-1.9.3-3.8.9-5.6l2.9-9.3c.9-2.9 1.1-6 .7-9l-5.2-33.4c-.6-3.9 0-7.9 1.6-11.5l2.4-5.1c1.2-2.6 1.9-5.5 1.9-8.4v-31.6l-1.4-19.7 4.4-87.2 4.4 87.2-1.4 19.7v31.6c0 2.9.6 5.8 1.9 8.4l2.4 5.1c1.7 3.6 2.2 7.6 1.6 11.5l-5.2 33.4c-.5 3-.2 6.1.7 9l2.9 9.3c.6 1.8.9 3.7.9 5.6l.6 32.3c0 1.3-.3 2.6-.8 3.9-.8 1.8-1.1 3.5-.8 5.3.2 1.3 0 2.6-.3 3.8l-3.1 10.6c-.5 1.8-.8 3.7-.8 5.5l-.8 12.4c-.1 1.5.2 2.9.9 4.3l.8 1.6a5.1 5.1 0 0 0 4.3 2.7h3c3 0 4.6-1 5.3-2.6l.1.3c.4 1.2 1.5 2.1 4 2.1 2.8 0 3.8-1 4.1-2.4l.1.3c.4 1.1 1.4 1.9 3.7 1.9 3 0 3.8-1.2 4-2.9.2 1.6.9 2.7 3.7 2.7 3.4 0 3.8-1.7 3.8-3.8v.4z" />
                    <path
                        v-for="(path, i) in injurySvgPartPaths"
                        :key="i"
                        :data-part="path.name"
                        :d="path.d"
                    >
                        <!-- <title>{{ injuryNameMap[path.name] }}</title> -->
                    </path>
                </g>
            </svg>
            <div
                class="patient-stats"
                :data-patient-stats-visible="isPatientStatsOpen"
            >
                <button class="patient-stats-close"  @click="isPatientStatsOpen = false">
                    <svg class="line-icon" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M17 7l-10 10" />
                        <path d="M7 7l10 10" />
                    </svg>
                </button>
                <h3 class="patient-stats-heading">Patient Stats</h3>
                <div class="patient-stats-content">
                    <div
                        class="patient-stats-item"
                        v-for="(stat, i) in patients[currentPatient].stats"
                    >
                        <h4 class="patient-stats-item-label">{{ stat.label }}</h4>
                        <p class="patient-stats-item-value">{{ stat.value }}</p>
                    </div>
                </div>
            </div>
            <!-- <ol class="injury-list">
                <li
                    v-for="(part, i) in injuryNameMap"
                    :key="i"
                >
                    {{ part }}
                </li>
            </ol> -->
        </div>
        <div class="screen-bottom">
            <button class="ui-button" @click="isPatientStatsOpen = true">View Patient Stats</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$screen-padding: 2rem;
// $screen-bg-bottom: #e2ebf7;
// $screen-bg-top: #fafcff;

// $header-bg-bottom: #e9eff8;
// $header-bg-top: #f7fafd;

$screen-bg-bottom: #2a3749;
$screen-bg-top: #192433;

$header-bg-bottom: #e9eff8;
$header-bg-top: #f7fafd;

// $body-outline: #26282A;
$body-outline: #90b7d4;
$body-outline-width: 2;

$heatmap-transition-duration: 500ms;

.screen {
  background: linear-gradient(0deg, $screen-bg-bottom 0%, $screen-bg-top 100%);
  height: 100%;
  max-height: 100%;
}

.screen-header {
    color: #E1F0FF;
    padding: ($screen-padding + 2rem) 0 0;
}

.screen-title {
    font-weight: normal;
    margin: 0 0 1rem;
    text-align: center;
}

.screen-nav {
    align-items: center;
    display: flex;
    gap: 1.5rem;
    justify-content: center;
}

.screen-nav-button {
    align-items: center;
    background: rgba(147, 203, 255, 0.15);
    border: 0;
    border-radius: 0.75rem;
    box-shadow: 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.15),
        0 0.25rem 0.75rem rgba(0, 0, 0, 0.15);
    color: #E1F0FF;
    cursor: pointer;
    display: flex;
    font-size: 1.5rem;
    justify-content: center;
    padding: 0.5rem;
    text-shadow: 0 0.125rem 0.125rem rgba(0, 0, 0, 0.25);
    transition: all 200ms ease-in-out;

    &:hover {
        background: rgba(147, 203, 255, 0.25);
    }

    &:active {
        transform: scale(0.92);
        transition: all 16ms ease-in-out;
    }

    &:focus {
        outline: none;
    }

    &:focus-visible {
        outline: 0.125rem solid #1783FF;
        outline-offset: 0.25rem;
    }
}

.screen-nav-button .line-icon {
    stroke-width: 2;
}

/* ----------------------------------------- */
/* Injury list                               */
/* ----------------------------------------- */

.injury-list {
    color: #FFF;
    font-size: 0.75rem;
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 36rem;
    overflow-x: hidden;
    overflow-y: auto;
}

/* ----------------------------------------- */
/* Height scale                              */
/* ----------------------------------------- */

.height-scale {
    bottom: 7.875rem;
    color: #FFF;
    font-size: 0.875rem;
    height: 34.5rem;
    left: 0;
    list-style: none;
    margin: 0;
    // outline: 1px solid red;
    mask: linear-gradient(0deg, #000 0%, #000 92%, transparent 100%);
    padding: 0;
    position: absolute;
    width: 100%;
}

.height-scale-label,
.height-scale-segment {
    bottom: 0;
    left: 2rem;
    position: absolute;
    transition: all $heatmap-transition-duration ease-in-out;
    width: calc(100% - 7rem);

    &::before {
        background: rgba(255, 255, 255, 0.08);
        content: '';
        height: 1px;
        left: 1.5rem;
        position: absolute;
        top: 0.625rem;
        width: 100%;
    }
}

.height-scale-label::before {
    background: rgba(255, 255, 255, 0.2);
        height: 2px;
}

/* ----------------------------------------- */
/* Heatmap SVG                               */
/* ----------------------------------------- */

.heatmap-container {
    display: grid;
    // gap: 1rem;
    // grid-template-columns: minmax(0, 1fr) 10rem;
    max-height: 100%;
    padding: 0;
}

/* SVG */
.heatmap-svg {
    height: auto;
    margin: 3rem auto 0;
    position: relative;
    width: 10.75rem;
    z-index: 1;
}

.outline,
.part-buttons {
    fill: none;
}

.heatmap {
    filter: url(#heatmap-filter);
    mask: url(#heatmap-mask);
}

.parts-blur {
    fill: #FFF;
}

.outline {
    fill: none;
    stroke: $body-outline;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: $body-outline-width;
}

.background {
    fill: #000;
}

.heatmap [data-part] {
    fill: #FFF;
    filter: blur(var(--b, 0.5rem));
    filter: blur(var(--b, 0));
    opacity: var(--o, 0.7);
    // transition: all 500ms cubic-bezier(0.65, 0, 0.35, 1);
    transition: all $heatmap-transition-duration ease-in-out;
}

.part-buttons [data-part] {
    cursor: pointer;
    fill: rgba(184, 212, 255, 0);
    stroke: rgba(196, 199, 204, 0.33);
    transition: all 200ms ease-in-out;
}

.part-buttons [data-part]:hover {
    fill: rgba(216, 232, 255, 0.2);
}

.part-buttons:hover [data-part] {
    stroke: rgba(196, 199, 204, 1);
}

/* ----------------------------------------- */
/* Screen bottom                             */
/* ----------------------------------------- */

.screen-bottom {
    align-items: center;
    bottom: 2rem;
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
}

.ui-button {
    background: radial-gradient(80% 100% at center 120%, #004a9e, #1783ff);
    border: 0;
    border-radius: 0.75rem;
    box-shadow:
        inset 0 -0.125rem 0 0.0625rem rgba(0, 0, 0, 0.1),
        inset 0 0.125rem 0 0.0625rem rgba(137, 202, 255, 0.25),
        0 0.125rem 0.25rem rgba(0, 0, 0, 0.2),
        0 0.375rem 0.875rem rgba(0, 0, 0, 0.1);
    color: #f0f7ff;
    font-size: 0.875rem;
    letter-spacing: 0.0625em;
    padding: 1rem 2rem;
    text-shadow: 0 0.0625rem 0.0625rem rgba(0, 0, 0, 0.25);
    text-transform: uppercase;
    transition: all 200ms ease-in-out;

    &:active {
        transform: scale(0.98);
        transition: all 16ms ease-in-out;
    }

    &:focus {
        outline: none;
    }

    &:focus-visible {
        outline: 0.125rem solid #1783FF;
        outline-offset: 0.25rem;
    }
}

/* ----------------------------------------- */
/* Screen bottom                             */
/* ----------------------------------------- */

.patient-stats {
    background: #FFF;
    border-radius: 2rem 2rem 0 0;
    bottom: 0;
    box-shadow: 0 -0.125rem 1rem rgba(0, 0, 0, 0.25);
    height: 32rem;
    padding: 1.75rem;
    position: absolute;
    transform: translateY(100%);
    transition: all 450ms cubic-bezier(0.5, 0, 0.2, 1);
    width: 100%;
    z-index: 2;

    &[data-patient-stats-visible="true"] {
        transform: translateY(0);
    }
}

.patient-stats-close {
    background: rgba(0, 10, 20, 0.1);
    border: 0;
    border-radius: 0.75rem;
    color: #343638;
    display: flex;
    padding: 0.5rem;
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    transition: all 200ms ease-in-out;

    &:active {
        transform: scale(0.92);
        transition: all 16ms ease-in-out;
    }

    &:focus {
        outline: none;
    }

    &:focus-visible {
        outline: 0.125rem solid #1783FF;
        outline-offset: 0.25rem;
    }
}

.patient-stats-heading {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-weight: normal;
    font-size: 1.375rem;
    padding: 0.25rem 0.5rem 1.5rem;
}

.patient-stats-content {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: 0.5rem;
    
    &,
    & p {
        line-height: 1.1;
    }
}

.patient-stats-item {
    // margin: 0 0 1.5rem;
}

.patient-stats-item-label,
.patient-stats-item-value {
    margin: 0;
}
</style>