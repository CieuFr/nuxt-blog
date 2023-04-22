<template>
    <div>
        <ContentDoc />
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
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types';

const query: QueryBuilderParams = {
    path: '/blog',
    sort: [{date: -1}],
    where: [ { _path: { $ne: '/blog' } }]
};
</script>