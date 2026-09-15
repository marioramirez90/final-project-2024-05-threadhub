<template>
  <div class="post-list-container">
    <div class="post" v-for="post of posts" :key="post.id">
      <div class="tags-container">
        <p class="tags" v-for="tag in post.tags" :key="tag">{{ tag }}</p>
      </div>
      <div class="post-header">
        <p class="title">{{ post.title }}</p>
        <button @click="confirmDelete(post.id)" class="delete-button">Delete</button>
      </div>
    </div>
  </div>
  <div v-if="showConfirmation" class="popup-confirm">
    <div class="popup">
      <p>Möchten sie diesen Thead wirklich löschen ?</p>
      <button @click="deletePost" class="confirm-button">Ja</button>
      <button @click="cancelDelete" class="cancel-button">Nein</button>
    </div>
  </div>
</template>
<script>
import { useUserStore } from '@/stores/user';
import { API_URL } from '@/config/api.js';
export default {
  data() {
    return {
      posts: [],
      filterMyPost: [],
      postIdToDelete: null,
      showConfirmation: false,
    };
  },
  async created() {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    const res = await fetch(`${API_URL}/posts`);
    const data = await res.json();
    console.log(data);
    const filterPost = data.filter((post) => post.userId === userId);

    this.posts = filterPost;
  },

  methods: {
    confirmDelete(postId) {
      this.postIdToDelete = postId;
      this.showConfirmation = true;
    },
    async deletePost() {
      const userStore = useUserStore();

      try {
        await userStore.deletePost(this.postIdToDelete);

        this.$emit('delete-post', this.postIdToDelete);
      } catch (error) {
        alert('Es gab ein problem beim löschen des Thread.');
      } finally {
        this.showConfirmation = false;
        this.postIdToDelete = null;
      }
    },
    cancelDelete() {
      this.showConfirmation = false;
      this.postIdToDelete = null;
    },
  },
};
</script>
<style scoped>
.post-list-container {
  padding: 1.5rem;
  max-width: 670px;
  border-radius: 1.3rem;

  overflow-y: auto;
  margin: 1rem auto;
  padding: 2rem;
}

.post {
  display: grid;
  grid-template-rows: 2;
  grid-template-columns: 1;

  gap: 0.25rem;

  background-color: var(--background-inputfield);
  border: 1px solid #ccc;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
}

.title {
  grid-row-start: 2;
  grid-row-end: 3;
  font-size: 1.25rem;
  margin: 0;
}

.tags-container {
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 0.25rem;
}
.tags {
  font-size: 0.66rem;
  background-color: var(--header-color);
  color: var(--font-color);
  padding: 0.15rem 0.35rem;
  border-radius: 10px;
  margin: 0;
}

.delete-button {
  background-color: rgb(192, 31, 31);
  color: var(--font-color);
  border: none;
  padding: 0.2rem 0.8rem;
  border-radius: 0.2rem;
  cursor: pointer;
  max-height: 25px;
  margin-top: 0.25rem;
}

.popup-confirm {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: white;
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
}
.confirm-button {
  background-color: #28a745;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  margin-right: 0.5rem;
  cursor: pointer;
}
.cancel-button {
  background-color: red;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
}

.post-header {
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-header p {
  font-size: 1rem;
  font-weight: 600;
}

@media (min-width: 900px) and (max-width: 1920px) {
  .post-header p {
    font-size: 1.5rem;
  }
}
</style>
