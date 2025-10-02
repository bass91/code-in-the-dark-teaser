<template>
    <div class="computer">
        <div class="monitor" :data-on="monitorOn" :data-shutdown="isShutdown">
            <div class="screen">
                <div class="content">
                    <span v-html="text" />
                    <span v-show="text !== textToWrite" class="cursor" />
                    <a
                        class="button"
                        :data-show="showLink"
                        href="https://mpyadigital.confetti.events/codeinthedark-2025-malmo"
                        >{{ linkText
                        }}<span
                            v-show="text === textToWrite && !showLink"
                            class="cursor"
                    /></a>
                    <span v-show="showLink" class="cursor" />
                </div>
            </div>

            <button
                @mouseover="buttonHovered = true"
                @mouseleave="buttonHovered = false"
                tabindex="-1"
                @click="handleClick"
            ></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSound } from "@vueuse/sound";

const emit = defineEmits<{
    (e: "buttonClicked"): void;
}>();

const buttonHovered = defineModel<boolean>("buttonHovered");

const monitorOn = ref(false);
const textToWrite = `CODE IN THE DARK @ Mpya Digital 12/11`;
const linkTextToWrite = "Secure your spot >";
const text = ref("");
const linkText = ref("");

const { play: playKeyboardSound, stop: stopKeyboardSound } = useSound(
    "../assets/audio/keyboard.mp3",
);

const {
    play: playStaticSound,
    stop: stopStaticSound,
    isPlaying: isStaticSoundPlaying,
} = useSound("../assets/audio/static.mp3", {
    volume: 0.2,
});

const { play: playGlitchSound } = useSound("../assets/audio/glitch.mp3");

watch([monitorOn, isStaticSoundPlaying], () => {
    if (monitorOn.value && !isStaticSoundPlaying.value && !isShutdown.value) {
        playStaticSound();
    } else if (!monitorOn.value) {
        stopStaticSound();
    }
});

const showLink = ref(false);
const isShutdown = ref(false);

const writeTextRecursive = (
    source: string,
    ref: Ref<string>,
    callback?: () => void,
    cursorPosition = 0,
) => {
    if (cursorPosition >= source.length) {
        callback?.();
        return;
    }

    ref.value += source[cursorPosition];
    cursorPosition++;
    setTimeout(
        () => writeTextRecursive(source, ref, callback, cursorPosition),
        Math.random() * 100 + 50,
    );
};

let timeoutId: number | null = null;
const handleClick = () => {
    if (monitorOn.value || isShutdown.value) {
        return;
    }

    monitorOn.value = true;

    emit("buttonClicked");
    text.value = "";
    linkText.value = "";
    timeoutId = setTimeout(() => {
        playKeyboardSound();
        writeTextRecursive(textToWrite, text, () => {
            writeTextRecursive(linkTextToWrite, linkText, () => {
                stopKeyboardSound();
                showLink.value = true;

                setTimeout(() => {
                    stopStaticSound();
                    playGlitchSound();
                    isShutdown.value = true;
                }, 15000);
            });
        });
    }, 2000);
};
</script>
<style scoped>
.computer {
    --plastic-bg: linear-gradient(#acbbbb 0, #929d9d 100%);
    --button-color: transparent;

    height: 60vh;
    aspect-ratio: 1;
    display: grid;
    position: relative;

    @media screen and (max-width: 768px) {
        height: 55vh;
    }

    &::after {
        content: "";
        position: absolute;
        inset: 0;
        background-image: url("../assets/images/c64.webp");
        background-size: cover;
        filter: brightness(0.7);
    }
}

.monitor {
    button {
        position: absolute;
        bottom: 3.25rem;
        right: 3.8rem;
        width: 3rem;
        aspect-ratio: 1;
        border-radius: 25%;
        box-shadow: none;
        border: none;
        cursor: pointer;
        display: grid;
        justify-content: center;
        padding: 0;
        grid-template-areas: "stack";
        background: transparent;
        padding: 1.5rem;
        z-index: 2;

        @media screen and (max-width: 768px) {
            bottom: 4.15rem;
            right: 4.5rem;
        }
    }
}

.screen {
    position: absolute;
    inset: 15% 24% 49%;
    background-color: #3b463d;
    border-radius: 9% / 13%;
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
        padding: 0.75rem;
        font-size: var(--font-size-3);
        font-family: var(--font-monospace-slab-serif);
        font-weight: 700;
        color: limegreen;
        text-align: left;
        opacity: 0;
        transition: opacity 1s ease-in-out;
        transition-delay: 0s;
        text-shadow:
            0 0 5px hsl(120, 61%, 50%, 0.75),
            0 0 10px hsl(120, 61%, 50%, 0.3);

        @media screen and (max-width: 768px) {
            font-size: var(--font-size-1);
        }

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

@keyframes shutdown {
    0% {
        filter: brightness(1000%);
        transform: scale3d(1, 1, 1);
    }
    20% {
        transform: scale3d(1, 1.6, 1);
    }
    50% {
        transform: scale3d(1, 0.005, 1);
    }
    100% {
        transform: scale3d(0, 0, 1);
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

.monitor[data-shutdown="true"] {
    .screen::after,
    .screen .content {
        animation: shutdown 1s forwards;
    }
}
</style>
