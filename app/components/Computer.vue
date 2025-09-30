<template>
    <div class="computer">
        <div class="monitor" :data-on="monitorOn">
            <div class="screen">
                <div class="content">
                    {{ text }}
                    <span class="cursor"></span>
                </div>
            </div>
            <button @click="handleClick"></button>
        </div>
        <div class="leg"></div>
        <div class="foot"></div>
    </div>
</template>

<script setup lang="ts">
import { useSound } from "@vueuse/sound";

const monitorOn = ref(false);
const text = ref("");
const textToWrite = `CODE IN THE DARK`;

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

let cursorPosition = 0;
let timeoutId: NodeJS.Timeout | null = null;
const writeText = () => {
    if (cursorPosition >= textToWrite.length) {
        stopKeyboardSound();
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
        clearTimeout(timeoutId);
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
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.5);
    background-image: url("../assets/images/c64.png");
    background-size: cover;
}

/*
.monitor {
    height: 40vh;
    max-width: 90vw;
    aspect-ratio: 4 / 3;
    position: relative;
    background-image: var(--plastic-bg);
    border-radius: 10% / 15%;
    box-shadow:
        inset 0px 0 10px rgba(0, 0, 0, 0.75),
        inset 0px 0 40px rgba(0, 0, 0, 0.5),
        0px 10px 10px rgba(0, 0, 0, 0.5);

    button {
        position: absolute;
        bottom: 1rem;
        right: 5rem;
        width: 2rem;
        aspect-ratio: 1;
        border-radius: 50%;
        background-image: var(--plastic-bg);
        border: none;
        cursor: pointer;
        box-shadow: inset 10px 10px 20px rgba(0, 0, 0, 0.5);
        display: grid;
        justify-content: center;
        padding: 0;
        grid-template-areas: "stack";

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
    inset: 3rem;
    bottom: 4rem;
    border-radius: 20% / 25%;
    background-color: #0b2030;
    display: grid;
    overflow: clip;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 1);

    &::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 10% / 15%;
        background:
            repeating-linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0.02) 0px,
                rgba(255, 255, 255, 0.02) 1px,
                rgba(0, 0, 0, 0.1) 2px,
                rgba(0, 0, 0, 0.1) 3px
            ),
            linear-gradient(-45deg, #0000, rgba(255, 255, 255, 0.1));
        z-index: 3;
        opacity: 0;
        transition: opacity 2s ease-in-out;
        box-shadow:
            inset 0 0 20px rgba(0, 0, 0, 0.2),
            0 0 100px rgba(255, 255, 255, 0.2);
    }

    .content {
        place-self: center;
        z-index: 2;
        font-size: var(--font-size-fluid-2);
        font-family: var(--font-monospace-slab-serif);
        font-weight: 700;
        color: limegreen;
        max-width: 80%;
        text-align: center;
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
    }
    .content {
        opacity: 1;
        transition-delay: 2s;
    }
}

.leg {
    height: 50px;
    width: 50%;
    background-color: #0f2b3c;
    margin-inline: auto;
}

.foot {
    height: 50px;
    width: 80%;
    background-image: var(--plastic-bg);
    margin-inline: auto;
    border-radius: 0.5rem;
}
*/
</style>
