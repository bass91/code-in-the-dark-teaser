<template>
    <div class="table"></div>
</template>

<style scoped>
.table {
    height: 120vh;
    width: 110rem;
    background-color: #f5f5f5;
    background-image:
        linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.25)),
        url("/assets/images/walnut.png");
    background-repeat: repeat;
    border-radius: 20px;
    box-shadow: inset 0px 0px 20px #000;
    grid-area: stack;
    position: absolute;
    place-self: center;
    bottom: -10rem;
    transform: rotateX(50deg) translateZ(-50vw);
    /* Ensure overlay covers it */
    z-index: 1;
}
</style>
