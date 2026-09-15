<template>
  <div v-if="!isEdit" class="click-comment">
    <p @click="showContainBox">Kommentare folgen hier...</p>
  </div>
  <div class="comments" v-show="showComments">
    <div class="on-comment" v-for="comment in comments" :key="comment.id">
      <p>{{ comment.text }}</p>
      <p class="user">{{ comment.username }}</p>
    </div>
  </div>
</template>
<script>
import { API_URL } from '@/config/api.js';

export default {
  props: {
    isEdit: Boolean,
    postId: String,
  },
  data() {
    return {
      showComments: false,
      comments: null,
      user: null,
    };
  },
  methods: {
    showContainBox() {
      this.showComments = !this.showComments;
      // console.log(this.comments);
    },
  },
  async created() {
    // const res = await fetch(`${API_URL}/comments`);
    // const data = await res.json();
    // // console.log(data);
    // const filter = data.filter((comment) => comment.postId === this.postId);
    // this.comments = filter;
    // // console.log(this.comments);
    const res = await fetch(`${API_URL}/comments`);
    const data = await res.json();

    const filteredComments = data.filter((comment) => comment.postId === this.postId);

    const response = await fetch(`${API_URL}/users`);
    const file = await response.json();
    const commentsWithUsernames = filteredComments.map((comment) => {
      const user = file.find((user) => user.id === comment.userId);
      return {
        ...comment,
        username: user ? user.username : 'Unbekannt',
      };
    });
    this.comments = commentsWithUsernames;
    this.user = file;
  },
};
</script>
<style scoped>
.click-comment {
  color: var(--font-color);
  padding-left: 1rem;
  cursor: pointer;
  text-decoration: underline;
}

.comments {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem 0 1rem;
}

.on-comment {
  color: var(--font-color);
  display: flex;
  flex-direction: column;
  outline: 2px solid var(--header-color);
  border-radius: 8px;
}

.user {
  font-size: 0.75rem;
  text-decoration: underline;
  align-self: end;
  padding-right: 1rem;
}

.on-comment p {
  margin: 0.25rem;
}
</style>
