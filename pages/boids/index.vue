<template>
    <div>
        <article>
            <ContentDoc />
        </article>
        <canvas class="w-full" ref="canvas"/>
        <div class="flex md:flex-row flex-col md:flex-nowrap flex-wrap content-center justify-between">
            <div class="mt-5 flex flex-col">
                <label for="cohesion">Cohésion</label>
                <input v-model="param.cohesion" min="0" max="0.03" step="0.001" type="range" id="cohesion"/>
            </div>
            <div class="mt-5 flex flex-col">
                <label for="separation">Séparation</label>
                <input v-model="param.separation" min="0" max="10" step="1" type="range" id="separation"/>
            </div>
            <div class="mt-5 flex flex-col">
                <label for="alignment">Alignement</label>
                <input v-model="param.alignment" min="0" max="1" step="0.1" type="range" id="alignment"/>
            </div>
            <div class="mt-5 flex flex-col">
                <label for="speed">Vitesse</label>
                <input v-model="param.speed" min="1" max="20" step="1" type="range" id="speed"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Param } from './app/type';
import Flock from './app/Flock';

const canvas = ref<HTMLCanvasElement>();

const param: Param = {
  cohesion: 0.015,
  separation: 5,
  alignment: 0.5,
  speed: 10,
};

const app = () => {

    if (!canvas.value) return;
    const ctx = canvas.value.getContext('2d');
    if (!ctx) return;

    const background_color = 'black';

    const width = 1300;
    const height = 600;
    canvas.value.width = width;
    canvas.value.height = height;
  

    const flock = new Flock(100, {
        width: canvas.value.width,
        height: canvas.value.height,
    });
    
    const draw = () => {
        if (!canvas.value) return;
        ctx.fillStyle = background_color;
        ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);
        flock.draw(ctx);
    };

    const update = () => {
        if (!canvas.value) return;
        draw();
        flock.move({width: canvas.value.width, height: canvas.value.height}, param);
        requestAnimationFrame(update);
    };

    update();
};

onMounted(app);
</script>