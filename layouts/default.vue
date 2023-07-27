<template>
    <div class="container mx-auto">
        <header>
        </header>
        <main class="max-w-[768px] mx-auto">
            <slot/>
        </main>
        <footer class="flex flex-row justify-around">
            <a href="https://github.com/CieuFr">
                <NuxtImg src="images/github.png" height="100" width="100" alt="Github" />
            </a>
            <a href="https://www.linkedin.com/in/victor-leiglat-34752a220/">
                <NuxtImg src="images/linkedIn.png" height="100" width="100" alt="LinkedIn" />
            </a>
        </footer>
    </div>
</template>