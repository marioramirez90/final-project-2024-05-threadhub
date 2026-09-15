<template>
  <div>
    <header><HomeViewHeader /></header>
    <main>
      <TitlePostView
        :post="post"
        :is-closed="isClosed"
        :is-edit="isEdit"
        @update-title="updateTitle"
      />
      <PostPictureName :userId="post.userId" />
      <PostViewMenu
        :userId="post.userId"
        @toggle-editing="toggleEditing"
        @close-thread="closeThread"
        :post="post"
      />
      <PostViewPostContent :post="post" :is-edit="isEdit" @update-text="updateText" />
      <div class="save-button"><button v-if="isEdit" @click="savePost">Save Changes</button></div>
      <InteraktionPostView :is-closed="isClosed" :post="post" :is-edit="isEdit" />
      <CommentSectionPostView :isEdit="isEdit" :postId="post.id" />
    </main>
  </div>
</template>

<script>
import HomeViewHeader from '@/components/HomeViewHeader.vue';
import TitlePostView from '@/components/Postview/TitlePostView.vue';
import PostViewPostContent from '@/components/Postview/PostViewPostContent.vue';
import CommentSectionPostView from '@/components/Postview/CommentSectionPostView.vue';
import PostPictureName from '@/components/Postview/PostPictureName.vue';
import InteraktionPostView from '@/components/Postview/InteraktionPostView.vue';
import PostViewMenu from '@/components/Postview/PostViewMenu.vue';
import { API_URL } from '@/config/api.js';
export default {
  components: {
    HomeViewHeader,
    TitlePostView,
    PostViewPostContent,
    CommentSectionPostView,
    PostPictureName,
    InteraktionPostView,
    PostViewMenu,
  },
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      post: {},
      isEdit: false,
      isClosed: null,
    };
  },
  methods: {
    closeThread() {
      this.isClosed = !this.isClosed;
      localStorage.setItem('isClosed', JSON.stringify(this.isClosed));
    },
    toggleEditing() {
      const user = localStorage.getItem('userId');
      if (this.post.userId === user) {
        this.isEdit = !this.isEdit;
      }
      return;
    },
    updateTitle(newtitle) {
      this.post.title = newtitle;
    },
    updateText(newText) {
      this.post.text = newText;
    },
    async savePost() {
      const response = await fetch(`${API_URL}/posts/${this.postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.post),
      });

      const data = await response.json();
      this.post = data;
      this.isEdit = false;
      this.editField = null;
    },
  },
  async created() {
    const response = await fetch(`${API_URL}/posts/${this.postId}`);
    this.post = await response.json();
    console.log(this.post);

    this.isClosed = JSON.parse(localStorage.getItem('isClosed'));
  },
};
</script>
<style scoped>
.save-button {
  display: flex;

  padding: 1rem;
  justify-content: center;
}

button {
  width: 6rem;
  height: 1.75rem;
  font-size: 0.75rem;
  color: var(--font-color);
  border: none;
  border-radius: 10px;
  background-color: var(--header-color);
}

button:hover {
  background-color: var(--background-inputfield);
  color: black;
}
</style>
