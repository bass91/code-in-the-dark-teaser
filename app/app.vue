<template>
    <main @click="handleClick">
        <Computer />
    </main>
    <Overlay :lit="lit" />
</template>

<script setup>
const lit = ref(true);
const handleClick = (event) => {
    if (event.target.nodeName !== "BUTTON") {
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
}
</style>
