<template>
  <div class="bg-primary text-primary-text my-2 p-1 rounded">
    <div class="flex justify-between">
      <div class="flex-grow">
        <h2 title="name">{{name}}</h2>
        <div class="experience">Experience: {{experience}}</div>
      </div>

      <div class="text-left">
        <h1 title="Position">{{position}}</h1>
        <span title="Applied On">{{applied}}</span>
      </div>
      <button
        v-on:click="toggleBookmark()"
        class="bookmark"
        :title="bookmarked? 'Remove Bookmark': 'Bookmark'"
      >
        <i :class="{'fas fa-bookmark': bookmarked, 'far fa-bookmark': !bookmarked}"></i>
      </button>
    </div>
    <div class="flex">
      <DayOfWeek :selected="availability.Su > 0" label="S" title="Availability Sunday"/>
      <DayOfWeek :selected="availability.M > 0" label="M" title="Availability Monday"/>
      <DayOfWeek :selected="availability.T > 0" label="T" title="Availability Tuesday"/>
      <DayOfWeek :selected="availability.W > 0" label="W" title="Availability Wednesday"/>
      <DayOfWeek :selected="availability.Th > 0" label="T" title="Availability Thursday"/>
      <DayOfWeek :selected="availability.F > 0" label="F" title="Availability Friday"/>
      <DayOfWeek :selected="availability.S > 0" label="S" title="Availability Saturday"/>
    </div>
    <div class="w-full flex justify-center -mt-4">
      <button title="Show Details" v-on:click="expand()">
        <i class="fas fa-angle-double-down text-l"></i>
      </button>
    </div>
  </div>
</template>

<script>
import JobApplicationData from "../data";
import DayOfWeek from "@/components/DayOfWeek.vue";

export default {
  components: { DayOfWeek },
  props: {
    applicationId: Number
  },
  data: function() {
    return JobApplicationData.get().find(
      application => application.id === this.$props.applicationId
    );
  },
  methods: {
    toggleBookmark: function() {
      this.bookmarked = !this.bookmarked;
      JobApplicationData.bookmark(this.id, this.bookmarked);
    }
  }
};
</script>

<style scoped>
.bookmark {
  @apply self-start mx-1;
}
button:focus {
  outline: 0 !important;
}
</style>

