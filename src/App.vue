<template>
    <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
            <component :is="slotProps.Component"></component>
        </transition>
    </router-view>
</template>

<style scoped>

@keyframes slide-scale {
  0% {
    transform: translateX(0) scale(1);
  }

  70% {
    transform: translateX(-120px) scale(1.1);
  }

  100% {
    transform: translateX(-150px) scale(1);
  }
}


.route-enter-from,
.route-enter-active {
    animation: slide-scale 0.4s ease-out;
}

.route-enter-to {
    
}

.router-leave-active {
    animation: slide-scale 0.4s ease-in;
}
</style>