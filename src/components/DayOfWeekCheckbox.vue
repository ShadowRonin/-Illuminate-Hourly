<template>
  <label class="checkbox">
    <input class="cursor-pointer" type="checkbox" v-model="isChecked" @change="onChange()">
    <span class="checkbox-span cursor-pointer">
      <DayOfWeek :selected="isChecked" :label="day"/>
    </span>
    {{label}}
  </label>
</template>

<script>
import DayOfWeek from "@/components/DayOfWeek.vue";
export default {
  components: { DayOfWeek },
  props: {
    value: Boolean,
    label: String,
    day: String
  },
  watch: {
    value(newValue, oldValue) {
      this.isChecked = newValue;
    }
  },
  data: function() {
    return {
      isChecked: this.value
    };
  },
  methods: {
    onChange: function() {
      this.$emit("input", this.isChecked);
      this.$emit("change", this.isChecked);
    }
  }
};
</script>

<style scoped>
.checkbox input {
  position: absolute;
  opacity: 0;
}
</style>
