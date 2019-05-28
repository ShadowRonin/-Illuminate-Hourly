<template>
  <div id="app">
    <header class="header flex flex-wrap items-center pl-3 pb-2">
      <div class="logo text-2xl">
        <i class="fas fa-eye"></i>
        <div class="upward-triangle"></div>
      </div>
      <h1 class="flex-grow title text-2xl font-bold">
        <router-link to="/">Illuminati Wanted</router-link>
      </h1>
      <div>
        <i class="fas fa-tint self-start mr-1"></i>
        <select
          class="theme-selection self-start text-right cursor-pointer bg-primary text-primary-text font-semibold mr-1"
          title="Sort By"
          v-model="theme"
          @change="updateTheme()"
        >
          <option value="system">System</option>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: window.localStorage.getItem("theme") || "system",
      mediaTheme: "no-preference"
    };
  },
  methods: {
    updateTheme() {
      let useDarkTheme = true;
      if (this.theme === "system") {
        window.localStorage.removeItem("theme");
        useDarkTheme = this.mediaTheme !== "light";
      } else {
        window.localStorage.setItem("theme", this.theme);
        useDarkTheme = this.theme !== "light";
      }

      document.getElementsByTagName("html")[0].className = useDarkTheme
        ? "theme-dark"
        : "theme-light";
    }
  },
  mounted() {
    const dark = window.matchMedia("(prefers-color-scheme: dark)");
    dark.addListener(({ matches }) => {
      if (matches) {
        this.mediaTheme = "dark";
        this.updateTheme();
      }
    });
    const light = window.matchMedia("(prefers-color-scheme: light)");
    light.addListener(({ matches }) => {
      if (matches) {
        this.mediaTheme = "light";
        this.updateTheme();
      }
    });
    const noPreference = window.matchMedia(
      "(prefers-color-scheme: no-preference)"
    );
    noPreference.addListener(({ matches }) => {
      if (matches) {
        this.mediaTheme = "no-preference";
        this.updateTheme();
      }
    });

    this.mediaTheme = light.matches
      ? "light"
      : dark.matches
      ? "dark"
      : "no-preference";
    this.updateTheme();
  }
};
</script>


<style>
/* .theme-selection {
  text-align-last: right;
}
.theme-selection option {
  direction: rtl;
} */
.header {
  width: 100%;
  height: 60px;
  background: var(--color-primary);
  color: var(--color-primary-text);
}

.logo {
  display: inline-block;
  height: 30px;
  width: 60px;
  overflow: visible;
  position: relative;
}
.logo i {
  color: var(--color-secondary-text);
  position: absolute;
  left: 50%;
  top: 65%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.upward-triangle {
  width: 0;
  height: 0;
  border-left: 26px solid;
  border-right: 26px solid;
  border-top: 30px solid;
  border-bottom: 30px solid;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: transparent;
  border-bottom-color: var(--color-secondary);

  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
