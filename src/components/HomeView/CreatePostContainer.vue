<template>
  <div class="create-post-container" @click.self="close">
    <div class="create-post">
      <button class="close-button" type="button" @click="close">&times;</button>
      <form @submit.prevent="createPost">
        <div class="create-post-title">
          <input v-model="title" class="text" type="text" id="title" placeholder="Title..." />
        </div>
        <div class="create-post-content">
          <textarea
            v-model="text"
            id="text"
            class="content"
            placeholder="Dein fragwürdiger Senf..."
          ></textarea>
        </div>
        <div class="create-post-tags">
          <input v-model="tag1" class="tag" type="text" id="tag1" placeholder="Tag" />
          <input v-model="tag2" class="tag" type="text" id="tag1" placeholder="Tag" />
        </div>

        <div class="action-button">
          <button class="create-button" type="submit">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { API_URL } from '@/config/api.js';

export default {
  data() {
    return {
      title: '',
      text: '',
      tag1: '',
      tag2: '',
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },

    async createPost() {
      const userId = localStorage.getItem('userId');
      const createdAt = Date.now();

      const newPost = {
        title: this.title,
        text: this.text,
        tags: [this.tag1, this.tag2],
        createdAt,
        userId,
        upvotes: 0,
        downvotes: 0,
      };

      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      if (response.ok) {
        await response.json();
        this.close();
        this.$emit('postCreated');
      }
    },
  },
};
</script>

<style scoped>
.create-post-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  height: 100%;
  width: 100%;
  padding: 3rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
}

.close-button {
  background: rgba(255, 255, 255, 0);
  border: none;
  font-size: 3rem;
  color: var(--background-inputfield);
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0rem;
  margin-top: -1rem;
}
.create-post {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 100%;
  padding: 1rem;
  background-color: var(--header-color);
  border-radius: 1rem;
}
.create-post-title {
  margin-bottom: 1rem;
}
.create-post-title .text {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 600;
  color: black;
  background-color: var(--background-inputfield);
}
.create-post-content {
  margin-bottom: 1rem;
}
.create-post-content .content {
  width: 100%;
  height: 20rem;
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 16px;
  font-size: 1rem;

  color: black;
  background-color: var(--background-inputfield);
}

.create-post-tags {
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
}
.create-post-tags .tag {
  width: 15vh;
  border: 1px solid #ccc;
  border-radius: 16px;
  padding: 0.3rem;
  text-align: center;
  color: black;
  background-color: var(--background-inputfield);
}
.action-button {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.create-button {
  border: 1px solid #ccc;
  border-radius: 16px;
  padding: 0.5rem 2rem;
  text-align: center;
  color: black;
  background-color: var(--background-inputfield);
}

@media (min-width: 100px) and (max-width: 1920px) {
  .create-post {
    max-width: 600px;
    max-height: 1000px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
