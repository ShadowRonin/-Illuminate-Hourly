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
      <div
        class="dayOfWeek"
        :class="{'dayOfWeekFilled': availability.Su}"
        title="Availability Sunday"
      >S</div>
      <div
        class="dayOfWeek"
        :class="{'dayOfWeekFilled': availability.M}"
        title="Availability Monday"
      >M</div>
      <div
        class="dayOfWeek"
        :class="{'dayOfWeekFilled': availability.T}"
        title="Availability Tuesday"
      >T</div>
      <div
        class="dayOfWeek"
        :class="{'dayOfWeekFilled': availability.W}"
        title="Availability Wednesday"
      >W</div>
      <div
        class="dayOfWeek"
        :class="{'dayOfWeekFilled': availability.Th}"
        title="Availability Thursday"
      >T</div>
      <div
        class="dayOfWeek"
        :class="{'dayOfWeekFilled': availability.F}"
        title="Availability Friday"
      >F</div>
      <div
        class="dayOfWeek"
        :class="{'dayOfWeekFilled': availability.S}"
        title="Availability Saturday"
      >S</div>
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
export default {
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
.dayOfWeek {
  @apply mx-px text-center leading-tight rounded-full border-2 border-primary-text h-6 w-6;
}
.dayOfWeekFilled {
  @apply bg-secondary text-secondary-text;
}
.bookmark {
  @apply self-start mx-1;
}
button:focus {
  outline: 0 !important;
}
</style>

