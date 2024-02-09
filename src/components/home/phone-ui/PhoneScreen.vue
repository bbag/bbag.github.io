<script lang="ts" setup>
import { computed, ref } from 'vue'

import {
    // type Injuries,
    // type Severity,
    injuryNameMap,
    injurySvgHeatmapPaths,
    injurySvgPartPaths
} from './utils/heatmapPathData'

import InjurySeverityDial from './components/InjurySeverityDial.vue'
import PatientHeatmap from './components/PatientHeatmap.vue'

import { patients } from './utils/patientData'

const currentPatient = ref(0)

function incrementCurrentPatient() {
    currentPatient.value === patients.length - 1 ? currentPatient.value = 0 : currentPatient.value = currentPatient.value + 1
}

function decrementCurrentPatient() {
    currentPatient.value === 0 ? currentPatient.value = patients.length - 1 : currentPatient.value = currentPatient.value - 1
}

// ---------------------------------------------------------- //
// Patient stats                                              //
// ---------------------------------------------------------- //

const isPatientStatsOpen = ref(false)

// Format patient height and weight for display, but leave other stats as is
function outputStatValue(stat: { label: string; value: string | number }) {
    switch (stat.label) {
        case 'Height':
            // Convert decimal feet to feet and inches
            const feet = Math.floor(stat.value as number)
            const inches = Math.round((stat.value as number - feet) * 12)
            return `${feet}’ ${inches}”`
        case 'Weight':
            return `${stat.value} lbs.`
        default:
            return stat.value
    }
}

// ---------------------------------------------------------- //
// Injury modal                                               //
// ---------------------------------------------------------- //

const isInjuryModalOpen = ref(false)
// const currentInjury = ref(null)
const selectedInjury = ref({ part: 'head', severity: 20 })

function handlePartClick(part: string) {
    if (isPatientStatsOpen.value) {
        isPatientStatsOpen.value = false
    }
    const severity = patients[currentPatient.value].injuries.find(injury => injury.part === part)?.severity || 0
    isInjuryModalOpen.value = !isInjuryModalOpen.value
    selectedInjury.value = { part, severity }
}

const selectedInjuryTitle = computed(() => {
    //@ts-ignore
    return injuryNameMap[selectedInjury.value.part]
})

</script>

<template>
    <div class="screen">
        <div class="screen-header">
            <h2 class="screen-title">Medical Monitor</h2>
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
        <PatientHeatmap :currentPatient="currentPatient" @partClick="handlePartClick($event)" />
        <div
            class="patient-stats"
            :data-patient-stats-visible="isPatientStatsOpen"
        >
            <button class="close-button"  @click="isPatientStatsOpen = false">
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
                    <p class="patient-stats-item-value">{{ outputStatValue(stat) }}</p>
                </div>
            </div>
            <div class="patient-stats-description">
                <h4 class="patient-stats-item-label">Description</h4>
                <p
                    class="patient-stats-item-value"
                    v-for="(paragraph, i) in patients[currentPatient].description"
                    :key="i"
                >
                    {{ paragraph }}
                </p>
            </div>
        </div>
        <div class="screen-bottom">
            <button class="ui-button" @click="isPatientStatsOpen = true">View Patient Stats</button>
        </div>
        <div
            class="injury-modal"
            :data-injury-modal-open="isInjuryModalOpen"
        >
            <div class="injury-modal-content">
                <button class="close-button"  @click="isInjuryModalOpen = false">
                    <svg class="line-icon" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M17 7l-10 10" />
                        <path d="M7 7l10 10" />
                    </svg>
                </button>
                <h3 class="injury-modal-heading">{{ selectedInjuryTitle || 'Injury' }}</h3>
                <InjurySeverityDial :percent="selectedInjury.severity" />
                <div>
                    <p><strong>Severity score: </strong> {{ selectedInjury.severity }}</p>
                </div>
            </div>
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
/* Injury modal                              */
/* ----------------------------------------- */

.injury-modal {
    align-items: center;
    background: rgba(0, 0, 0, 0.33);
    backdrop-filter: blur(0.5rem);
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    opacity: 0;
    position: fixed;
    top: 0;
    transition: all 350ms cubic-bezier(0.25, 1, 0.5, 1);
    visibility: hidden;
    width: 100%;
    z-index: 2;

    &[data-injury-modal-open="true"] {
        opacity: 1;
        visibility: visible;
    }
}

.injury-modal-content {
    background: #FFF;
    border-radius: 1rem;
    box-shadow: 0 0.125rem 0.0625rem rgba(0, 0, 0, 0.15),
        0 0.375rem 0.75rem rgba(0, 0, 0, 0.15);
    color: #000;
    padding: 2rem;
    position: relative;
    transform: scale(0.9);
    transition: transform 350ms cubic-bezier(0.25, 1, 0.5, 1);
    width: 20rem;
    z-index: 3;

    [data-injury-modal-open="true"] & {
        transform: scale(1);
    }
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

.close-button {
    background: rgba(0, 10, 20, 0.08);
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
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    font-weight: normal;
    font-size: 1.375rem;
    padding: 0.25rem 0.5rem 1.5rem;
}

.patient-stats-description,
.patient-stats-content {
    padding: 0.5rem;
}

.patient-stats-description {
    margin-top: 1.5rem;

    & p {
        line-height: 1.5;
        margin: 0.5rem 0 0;
    }
}

.patient-stats-content {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    
    &,
    & p {
        line-height: 1.1;
        margin: 0.25rem 0 0;
    }
}

// .patient-stats-item {
//     margin: 0 0 1.5rem;
// }

.patient-stats-item-label,
.patient-stats-item-value {
    margin: 0;
}
</style>