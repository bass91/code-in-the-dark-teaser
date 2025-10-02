<template>
    <div
        :class="{
            overlay: true,
            lit,
        }"
        :data-increase-light="increaseLight"
        :style="'--x:' + transformX + 'px' + '; --y:' + transformY + 'px'"
    ></div>
</template>

<script setup lang="ts">
const props = defineProps<{
    lit: boolean;
    increaseLight: boolean;
}>();

const { width, height } = useWindowSize();
const { x, y } = useMouse();
const transformX = computed(() => x.value - width.value / 2);
const transformY = computed(() => y.value - height.value / 2);
</script>

<style scoped>
@property --inner-percentage {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 2%;
}

@property --outer-percentage {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 4%;
}

@property --lit-alpha {
    syntax: "<number>";
    inherits: false;
    initial-value: 0.7;
}

.overlay {
    --lit-alpha: 0.7;
    position: absolute;

    width: 300vw;
    height: 300vh;
    /*left: -50%;
    top: -50%;*/

    background-image: radial-gradient(circle, rgba(0, 0, 0, 0.95) 15%);
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    place-self: center;
    translate: var(--x) calc(var(--y));
    transition: radial-gradient 0.5s;
}

.overlay.lit {
    background-image: radial-gradient(
        circle,
        rgba(0, 0, 0, var(--lit-alpha)) var(--inner-percentage),
        rgba(0, 0, 0, 0.95) var(--outer-percentage)
    );
    animation: decrease-light 0.5s forwards;
}

.overlay[data-increase-light="true"] {
    animation: increase-light 0.5s forwards;
}

@keyframes increase-light {
    from {
        --inner-percentage: 2%;
        --outer-percentage: 4%;
        --lit-alpha: 0.7;
    }
    to {
        --inner-percentage: 4%;
        --outer-percentage: 10%;
        --lit-alpha: 0.5;
    }
}

@keyframes decrease-light {
    from {
        --inner-percentage: 4%;
        --outer-percentage: 8%;
        --lit-alpha: 0.5;
    }
    to {
        --inner-percentage: 2%;
        --outer-percentage: 4%;
        --lit-alpha: 0.7;
    }
}
</style>
