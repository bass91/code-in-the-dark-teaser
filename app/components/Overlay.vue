<template>
    <div
        :class="{
            overlay: true,
            lit: props.lit,
        }"
        :style="'--x:' + transformX + 'px' + '; --y:' + transformY + 'px'"
    ></div>
</template>

<script setup lang="ts">
const props = defineProps<{
    lit: boolean;
}>();

const { width, height } = useWindowSize();
const { x, y } = useMouse();
console.log("x:", x.value, "y:", y.value);
const transformX = computed(() => x.value - width.value / 2);
const transformY = computed(() => y.value - height.value / 2);
</script>

<style scoped>
.overlay {
    position: absolute;

    width: 200vw;
    height: 200vh;
    left: -50%;
    top: -50%;

    background-image: radial-gradient(circle, rgba(0, 0, 0, 0.98) 15%);
    display: flex;
    justify-content: center;
    align-items: center;

    pointer-events: none;
    translate: var(--x) calc(var(--y) - 80px);
}

.overlay.lit {
    background-image: radial-gradient(
        circle,
        rgba(0, 0, 0, 0.6) 5%,
        rgba(0, 0, 0, 0.98) 10%
    );
}
</style>
