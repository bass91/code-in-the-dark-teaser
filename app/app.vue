<template>
    <main ref="containerRef" @click="handleClick">
        <Table />
        <Computer />
        <Overlay :lit="lit" />
    </main>
</template>

<script setup lang="ts">
const lit = ref(true);

const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (target && target.nodeName !== "BUTTON") {
        lit.value = !lit.value;
    }
};
</script>

<style scoped>
main {
    display: grid;
    max-width: 75ch;
    margin-inline: auto;
    padding: 1rem;
    height: 100svh;
    place-content: center;
    cursor: url("assets/images/flashlight.png"), auto;
    grid-template-areas: "stack";
    place-content: center;
    position: relative;
    transform-style: preserve-3d;
    perspective: 1000px;

    & > * {
        grid-area: stack;
    }
}
</style>
