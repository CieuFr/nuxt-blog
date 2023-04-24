<template>
    <div class="container mx-auto">
        <header>
            <nav class="flex flex-row justify-evenly py-5 border-b border-b-blue mb-10">
                <NuxtLink class="text-2xl text-blue hover:text-white hover:underline" to="/">Accueil</NuxtLink>
            </nav>
        </header>
        <main class="max-w-[768px] mx-auto">
            <slot/>
        </main>
        <footer class="flex flex-row justify-around">
            <a href="https://github.com/azaismarc">
                <NuxtImg src="images/github.png" height="100" width="100" alt="Github" />
            </a>
            <a href="https://www.linkedin.com/in/marc-alexis-azais-b38a51179/">
                <NuxtImg src="images/linkedIn.png" height="100" width="100" alt="LinkedIn" />
            </a>
        </footer>
    </div>
</template>