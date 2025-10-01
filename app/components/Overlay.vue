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
const transformX = computed(() => x.value - width.value / 2);
const transformY = computed(() => y.value - height.value / 2);

watch([x, y], () => {
    console.log(
        "x:",
        x.value,
        "y:",
        y.value,
        "height:",
        height.value,
        "width:",
        width.value,
    );
});
</script>

<style scoped>
.overlay {
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
    translate: var(--x) calc(var(--y) - 40px);

    &::after {
        content: "";
        position: absolute;
        width: 100vw;
        height: 100svh;
        background-color: rgba(0, 0, 0, 0.5);
    }
}

.overlay.lit {
    background-image: radial-gradient(
        circle,
        rgba(0, 0, 0, 0.4) 2%,
        rgba(0, 0, 0, 0.98) 5%
    );
}
</style>
