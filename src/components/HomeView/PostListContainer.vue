<template>
  <div class="post-list-container">
    <div v-for="post in filteredPosts" :key="post.id" class="post" :id="post.id">
      <div class="title" @click="linkMyPost(post.id)">{{ post.title }}</div>

      <div class="tags-container">
        <div v-for="tag in post.tags" :key="tag" class="tags">
          {{ tag }}
        </div>
      </div>
      <div v-if="adminChoice()" class="btn-delete" @click="toggleDelete(post.id)">
        <button>x</button>
      </div>
    </div>
    <div class="popup" v-if="deleteDiv">
      <div class="delete-popup">
        <p>Are u sure?</p>
        <div>
          <button class="yes" @click="clickToDelete">Yes</button>
          <button class="no" @click="deleteDiv = false">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deleteDiv: false,
      deleteId: null,
    };
  },
  props: {
    posts: Array,
    selectedFilter: String,
    wordSearch: String,
  },
  methods: {
    toggleDelete(postId) {
      this.deleteDiv = !this.deleteDiv;
      this.deleteId = postId;
    },
    linkMyPost(postId) {
      this.$router.push({ name: 'postview', params: { postId } });
    },
    adminChoice() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.isAdmin === true) {
        return true;
      } else {
        return false;
      }
    },
    onPostDelete(postId) {
      this.$emit('postDelete', postId);
    },
    clickToDelete() {
      this.onPostDelete(this.deleteId);
      this.deleteDiv = !this.deleteDiv;
    },
  },
  computed: {
    filteredPosts() {
      let result = [...this.posts];

      if (this.wordSearch) {
        return result.filter(
          (post) =>
            post.title.toLowerCase().includes(this.wordSearch.toLowerCase()) ||
            post.text.toLowerCase().includes(this.wordSearch.toLowerCase()) ||
            post.tags.some((tag) => tag.toLowerCase().includes(this.wordSearch.toLowerCase())),
        );
      }

      if (this.selectedFilter === 'filter-likes') {
        return result.sort((a, b) => b.upvotes - a.upvotes);
      } else if (this.selectedFilter === 'filter-new') {
        return result.sort((a, b) => b.createdAt - a.createdAt);
      }

      return this.posts;
    },
  },
};
</script>
<style scoped>
.post-list-container {
  padding: 1.5rem;
  background-color: var(--header-color);
  border-radius: 1.3rem;

  overflow-y: auto;
  margin: 1rem;
}
.post {
  display: grid;
  grid-template-rows: 2;
  grid-template-columns: 2;
  gap: 0.25rem;

  background-color: var(--background-inputfield);
  border: 1px solid #ccc;
  padding: 0.4rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
}

.title {
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 3;
  font-size: 1.25rem;
  cursor: pointer;
}

.tags-container {
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 2;
  grid-column-end: 3;

  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 0.25rem;
}

.tags {
  font-size: 0.66rem;
  background-color: var(--header-color);
  color: var(--font-color);

  padding: 0.15rem 0.5rem;
  border-radius: 10px;
}

.btn-delete {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
}

.btn-delete button {
  background-color: var(--header-color);
  border: 2px solid var(--background-color);
  border-radius: 8px;

  cursor: pointer;

  color: var(--font-color);
}

.popup {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: rgb(255, 255, 255, 0.1);
  backdrop-filter: blur(2px);
  top: 0;
  left: 0;
}

.delete-popup {
  width: 60%;
  height: 30%;

  background-color: var(--header-color);
  border-radius: 10px;
  border: 2px solid var(--background-inputfield);
  box-shadow: 1px 0px 8px 2px black;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.delete-popup p {
  font-size: 2rem;
  margin-top: -0.5rem;

  color: var(--font-color);
}

.delete-popup div {
  display: flex;
  gap: 1rem;
}

.delete-popup button {
  width: 5.5rem;
  height: 2.5rem;

  font-size: 1.5rem;
  color: var(--header-color);

  background-color: var(--background-inputfield);
  border-radius: 10px;
}

@media (min-width: 900px) and (max-width: 1920px) {
  .post-list-container {
    max-height: 700px;
  }
  .delete-popup {
    width: 20%;
  }
}
</style>
