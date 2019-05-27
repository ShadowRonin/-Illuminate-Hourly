<template>
  <div class="dayOfWeek" :class="{'dayOfWeekFilled': selected}">{{label}}</div>
</template>

<script>
export default {
  props: {
    label: String,
    selected: Boolean
  }
};
</script>

<style scoped>
.dayOfWeek {
  @apply mx-px text-center leading-tight rounded-full border-2 border-primary-text h-6 w-6;
  user-select: none;
  display: inline-block;
}
.dayOfWeekFilled {
  @apply bg-secondary text-secondary-text;
}
</style>
