<template>
    <div class="border-b border-b-blue my-10 pb-2">
        <div class="mb-2">
            <NuxtLink :to="path">
                <h3>
                    <span class="hover:text-white hover:underline">{{ title }}</span>
                </h3>
            </NuxtLink>
            <span class="italic text-blue">Publié le {{ date }}</span>
        </div>
        <div class="mb-2">
            <template v-for="tag of tags">
                <BlogTag :tag="tag" />
            </template>
        </div>
        <p class="text-left">{{ description }}</p>
    </div>
</template>

<script setup lang="ts">
interface Props {
    title?: string;
    description?: string;
    date?: string;
    path?: string;
    tags?: string[];
}

defineProps<Props>();
</script>