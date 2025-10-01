<template>
    <div class="computer">
        <div class="monitor" :data-on="monitorOn">
            <div class="screen">
                <div class="content">
                    <span v-html="text"></span>
                    <span class="cursor"></span>
                </div>
            </div>
            <button @click="handleClick"></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSound } from "@vueuse/sound";

const monitorOn = ref(false);
const text = ref("");
const linkText = "Secure your spot";
const textToWrite = `CODE IN THE DARK -> ${linkText}`;

const { play: playKeyboardSound, stop: stopKeyboardSound } = useSound(
    "../assets/audio/keyboard.mp3",
);

const {
    play: playStaticSound,
    stop: stopStaticSound,
    isPlaying: isStaticSoundPlaying,
} = useSound("../assets/audio/static.mp3");

watch([monitorOn, isStaticSoundPlaying], () => {
    if (monitorOn.value && !isStaticSoundPlaying.value) {
        playStaticSound();
    } else if (!monitorOn.value) {
        stopStaticSound();
    }
});

const replaceTextWithLink = () => {
    text.value = textToWrite.replace(
        linkText,
        `<a href="https://mpyadigital.confetti.events/codeinthedark-2025-malmo">${linkText}</a>`,
    );
};

let cursorPosition = 0;
let timeoutId: number | null = null;
const writeText = () => {
    if (cursorPosition >= textToWrite.length) {
        stopKeyboardSound();
        replaceTextWithLink();
        return;
    }

    text.value += textToWrite[cursorPosition];
    cursorPosition++;
    timeoutId = setTimeout(writeText, Math.random() * 100 + 50);
};

const handleClick = () => {
    monitorOn.value = !monitorOn.value;
    if (monitorOn.value) {
        timeoutId = setTimeout(() => {
            playKeyboardSound();
            writeText();
        }, 2000);
    } else {
        stopKeyboardSound();
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
    }
};
</script>
<style scoped>
.computer {
    --plastic-bg: linear-gradient(#acbbbb 0, #929d9d 100%);
    --button-color: transparent;

    height: 60vh;
    max-width: 90vw;
    aspect-ratio: 1;
    display: grid;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        inset: 0;
        background-image: url("../assets/images/c64.png");
        background-size: cover;
        filter: brightness(0.7);
    }
}

.monitor {
    button {
        position: absolute;
        bottom: 4.15rem;
        right: 4.5rem;
        width: 1.5rem;
        aspect-ratio: 1;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        box-shadow:
            inset 10px 10px 20px rgba(0, 0, 0, 0.5),
            0 4px 0 rgba(0, 0, 0, 0.3);
        display: grid;
        justify-content: center;
        padding: 0;
        grid-template-areas: "stack";
        background: #ba9e76;
        transform: rotateX(50deg);

        &::before,
        &::after {
            content: "";
            width: 4px;
            height: 30%;
            background: var(--button-color);
            align-self: center;
            grid-area: stack;
            z-index: 999;
        }

        &::after {
            filter: blur(4px);
        }
    }
}

.screen {
    position: absolute;
    inset: 15% 22% 48%;

    background-color: #3b463d;
    border-radius: 0.5rem;
    display: grid;
    overflow: clip;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 1);
    /* Base below overlay */

    &::after {
        content: "";
        position: absolute;
        inset: 0;
        background:
            repeating-linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0.02) 0px,
                rgba(255, 255, 255, 0.02) 1px,
                rgba(0, 0, 0, 0.1) 2px,
                rgba(0, 0, 0, 0.1) 3px
            ),
            linear-gradient(
                -45deg,
                rgba(255, 255, 255, 0.05),
                rgba(255, 255, 255, 0.15)
            );
        opacity: 0;
        transition: opacity 2s ease-in-out;
        box-shadow:
            inset 0 0 20px rgba(0, 0, 0, 0.2),
            0 0 100px rgba(255, 255, 255, 0.2);
    }

    .content {
        place-self: start;
        padding: 1em;
        font-size: var(--font-size-4);
        font-family: var(--font-monospace-slab-serif);
        font-weight: 700;
        color: limegreen;
        max-width: 80%;
        text-align: left;
        opacity: 0;
        transition: opacity 1s ease-in-out;
        transition-delay: 0s;
        text-shadow:
            0 0 5px hsl(120, 61%, 50%, 0.75),
            0 0 10px hsl(120, 61%, 50%, 0.3);

        .cursor {
            display: inline-block;
            height: 0.7lh;
            width: 0.5em;
            background-color: currentColor;
            animation: blink 1s infinite;
            translate: 0 0.125em;
            text-shadow:
                0 0 5px hsl(120, 61%, 50%, 0.75),
                0 0 10px hsl(120, 61%, 50%, 0.3);
        }
    }
}

@keyframes blink {
    0%,
    49%,
    100% {
        opacity: 1;
    }
    50%,
    99% {
        opacity: 0;
    }
}

.monitor[data-on="true"] {
    --button-color: limegreen;

    .screen::after {
        opacity: 1;
        z-index: 20;
    }
    .content {
        opacity: 1;
        transition-delay: 2s;
        z-index: 21;
    }
}
</style>
