<template>
    <div v-if="map.has(tag)" class="inline-block m-1 p-1 border rounded-md">
        <div class="flex flex-row">
            <NuxtImg class="mx-1" :src="`images/tags/${ map.get(tag)?.src }`" height="20" :alt="map.get(tag)?.label" />
            <div class="flex flex-col justify-center">
                <span class="text-blue text-xs">{{ map.get(tag)?.label }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    tag: string;
}

defineProps<Props>();

const map = new Map<string, {src: string, label: string}>([
    ['pwa', {src: 'pwa.jpg', label: 'Progressive Web App'}],
    ['ts', {src: 'ts.png', label: 'TypeScript'}],
    ['vue', {src: 'vue.png', label: 'Vue'}],
    ['strapi', {src: 'strapi.png', label: 'Strapi'}],
    ['nuxt', {src: 'nuxt.png', label: 'Nuxt'}],
]);
</script>