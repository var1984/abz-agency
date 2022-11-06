<template>
  <div class="lds-dual-ring"></div>
</template>

<style lang="scss" scoped>
.lds-dual-ring {
  width: 48px;
  height: 48px;
  border: 6px solid #00bdd3;
  border-color: #00bdd3 #00bdd3 #00bdd3 transparent;
  border-radius: 50%;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
