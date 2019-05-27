<template>
  <div id="app">
    <header class="header flex items-center pl-3 pb-2">
      <div class="logo text-2xl">
        <i class="fas fa-eye"></i>
        <div class="upward-triangle"></div>
      </div>
      <h1 class="title text-2xl font-bold">
        <router-link to="/">Illuminate Hourly</router-link>
      </h1>
    </header>
    <router-view/>
  </div>
</template>

<style>
.header {
  width: 100%;
  height: 60px;
  background: var(--color-primary);
  color: var(--color-primary-text);
}
.header :hover {
  cursor: pointer;
}

.logo {
  display: inline-block;
  height: 30px;
  width: 60px;
  overflow: visible;
  position: relative;
}
.logo i {
  color: white;
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.upward-triangle {
  width: 0;
  height: 0;
  border: 30px solid;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: transparent;
  border-bottom-color: black;

  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
