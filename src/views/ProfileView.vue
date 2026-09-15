<template>
  <div class="container">
    <HomeViewHeader />
    <ProfileViewHeader />
    <div class="content">
      <ProfileViewStatus :totalVotes="totalVotes" :totalPosts="totalPosts" />
      <LastPostListContainer :filteredPosts="idFilterPost" />
    </div>
  </div>
</template>

<script>
import LastPostListContainer from '@/components/ProfileView/LastPostListContainer.vue';
import ProfileViewHeader from '@/components/ProfileView/ProfileViewHeader.vue';
import ProfileViewStatus from '@/components/ProfileView/ProfileViewStatus.vue';
import HomeViewHeader from '@/components/HomeViewHeader.vue';
import { API_URL } from '@/config/api.js';

export default {
  components: { ProfileViewHeader, ProfileViewStatus, LastPostListContainer, HomeViewHeader },
  data() {
    return {
      currentUserId: '',
      posts: [],
      totalVotes: 0,
      totalPosts: 0,
    };
  },
  methods: {
    upVotesCounter() {
      this.totalVotes = this.idFilterPost.reduce((total, post) => total + post.upvotes, 0);
    },

    postsCounter() {
      this.totalPosts = this.idFilterPost.length;
    },
  },
  computed: {
    idFilterPost() {
      return this.posts.filter((post) => post.userId === this.currentUserId);
    },
  },

  async created() {
    this.currentUserId = localStorage.getItem('userId');

    const response = await fetch(`${API_URL}/posts`);
    const data = await response.json();
    // console.log(data);

    this.posts = data;
    this.postsCounter();
    this.upVotesCounter();
  },
};
</script>

<style scoped></style>
