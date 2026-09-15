<template>
  <div id="pic-name-container">
    <img src="@/assets/images/minion.png" alt="Poriflbild" />
    <div>{{ user }}</div>
  </div>
</template>

<script>
import { API_URL } from '@/config/api.js';

export default {
  props: {
    userId: null,
  },
  data() {
    return {
      user: '',
    };
  },
  watch: {
    userId: {
      immediate: true,
      handler() {
        this.fetchUser();
      },
    },
  },
  methods: {
    async fetchUser() {
      if (this.userId) {
        const response = await fetch(`${API_URL}/users/${this.userId}`);
        const data = await response.json();
        this.user = data.username;
        console.log(this.user);
        console.log(this.userId);
      }
    },
  },
};
</script>

<style scoped>
#pic-name-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--font-color);
  font-size: 1.2rem;
  padding: 0 0 1rem 1rem;
}

img {
  width: 3rem;
  border-radius: 50%;
}
</style>
