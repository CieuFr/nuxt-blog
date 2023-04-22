<template>
    <div class="flex flex-col justify-evenly">
        <h1 id="titre"/>
        <div class="mb-10">
            <ContentDoc>
                <template #empty/>
            </ContentDoc>
        </div>
        <div>
            <h2>Les derniers articles</h2>
            <ContentList :query="query" v-slot="{ list }">
                <template v-for="blog in list" :key="blog._id">
                    <BlogCard
                        :title="blog.title"
                        :description="blog.description"
                        :date="blog.date"
                        :path="blog._path"
                        :tags="blog.tags"/>
                </template>
            </ContentList>
        </div>
    </div>
</template>

<script setup lang="ts">
import Typed from 'typed.js';
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types';

const query: QueryBuilderParams = {
    path: '/blog',
    sort: [{date: -1}],
    where: [ { _path: { $ne: '/blog' } }],
};

onMounted(() => {
     new Typed('#titre', {
        strings: ['Je suis Marc-Alexis Azaïs', "Je suis passionné", "Je suis développeur"],
        typeSpeed: 100,
        backSpeed: 25,
        loop: false,
        showCursor: false,
    });
});
</script>