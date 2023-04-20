<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view />
    </keep-alive>
    <router-view v-else />
  </div>
</template>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}
</style>
