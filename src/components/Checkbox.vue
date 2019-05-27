<template>
  <label class="checkbox">
    <input class="cursor-pointer" type="checkbox" v-model="isChecked" @change="onChange()">
    <span class="checkbox-span cursor-pointer bg-secondary text-secondary-text rounded p-px">
      <i class="fas fa-check"></i>
    </span>
    {{label}}
  </label>
</template>

<script>
export default {
  props: {
    value: Boolean,
    label: String
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
.checkbox-span i {
  opacity: 0;
}
.checkbox input:checked ~ span i {
  opacity: 1;
}
</style>
