<template>
  <div id="home">
    <header><HomeViewHeader /></header>
    <div class="filter">
      <ProfileViewFilter
        @updateFilter="updateSelectedFilter"
        @updateSearch="updateWordSearch"
        @postCreated="fetchPosts"
      />

      <PostListContainer
        :posts="posts"
        :selectedFilter="selectedFilter"
        :wordSearch="wordSearch"
        @postDelete="postDelete"
      />
    </div>
  </div>
</template>

<script>
import HomeViewHeader from '@/components/HomeViewHeader.vue';
import ProfileViewFilter from '@/components/HomeView/ProfileViewFilter.vue';
import PostListContainer from '@/components/HomeView/PostListContainer.vue';
import { API_URL } from '@/config/api.js';

export default {
  data() {
    return {
      posts: [],
      apiUrl: API_URL,
      selectedFilter: 'all',
      wordSearch: '',
    };
  },
  methods: {
    async fetchPosts() {
      const response = await fetch(`${this.apiUrl}/posts`);
      this.posts = await response.json();
    },
    async postDelete(postId) {
      await fetch(`${this.apiUrl}/posts/${postId}`, {
        method: 'DELETE',
      });
      await this.fetchPosts();
    },

    updateWordSearch(word) {
      this.wordSearch = word;
    },

    updateSelectedFilter(filter) {
      this.selectedFilter = filter;
    },
  },
  components: { ProfileViewFilter, HomeViewHeader, PostListContainer },
  async created() {
    await this.fetchPosts();
  },
};
</script>

<style scoped>
#home {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.filter {
  margin-top: 1rem;
  margin-bottom: -1rem;
}

.post-list-container {
  flex: 1;
  max-height: 70vh;
}

@media (min-width: 900px) and (max-width: 1920px) {
  .filter {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 1000px;
    min-height: 750px;
    align-self: center;
  }
}
</style>
