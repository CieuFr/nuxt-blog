<template>
    <div class="flex flex-col justify-evenly">
        <h1 id="titre" class="h-[100px]"/>
        <div>
            <h2>Les articles</h2>
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

import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types';

const query: QueryBuilderParams = {
    path: '/',
    sort: [{date: -1}],
    where: [ { _path: { $ne: '/' } }],
};

</script>
