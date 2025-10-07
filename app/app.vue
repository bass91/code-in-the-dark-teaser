<template>
    <main ref="containerRef" @click="handleClick">
        <Table />
        <Computer
            v-model:buttonHovered="buttonHovered"
            @buttonClicked="buttonClicked = true"
        />
        <Overlay :lit="lit" :increaseLight="buttonHovered" />
    </main>
    <p class="instructions" :data-hide="buttonClicked">Click the button</p>
    <Analytics />
</template>

<script setup lang="ts">
import { Analytics } from "@vercel/analytics/nuxt";

const lit = ref(true);
const buttonClicked = ref(false);
const buttonHovered = ref(false);
</script>

<style scoped>
main {
    display: grid;
    max-width: 75ch;
    margin-inline: auto;
    padding: 1rem;
    height: 100svh;
    place-content: center;
    grid-template-areas: "stack";
    place-content: center;
    position: relative;
    transform-style: preserve-3d;
    perspective: 1000px;

    & > * {
        grid-area: stack;
    }
}

.instructions {
    position: fixed;
    left: 50%;
    translate: -50%;
    margin-inline: auto;
    color: white;
    font-size: var(--font-size-1);
    font-family: var(--font-system-ui);
    letter-spacing: 0.25em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    top: -5rem;
    animation: slide-down 2s linear forwards;
    transition: opacity 1s linear;

    &[data-hide="true"] {
        opacity: 0 !important;
    }
}

@keyframes slide-down {
    from {
        top: -2rem;
        opacity: 0;
    }
    to {
        top: 2rem;
        opacity: 1;
    }
}
</style>
