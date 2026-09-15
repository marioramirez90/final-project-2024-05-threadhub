import { defineStore } from 'pinia';
import router from '@/router/index.js';

export const useUserStore = defineStore('user', {
  state() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || null,
      api: import.meta.env.VITE_API_URL,
      editDisabled: false,
    };
  },

  getters: {
    isLoggedIn() {
      return this.user !== null;
    },
  },

  actions: {
    async getUserInfo() {
      const id = localStorage.getItem('userId');
      console.log(id);
      if (id === null) return;

      const res = await fetch(import.meta.env.VITE_API_URL + 'users/' + id);
      const data = await res.json();

      this.user = {
        username: data.username,
        isAdmin: data.isAdmin,
        id: data.id,
        email: data.email,
        upvotes: [],
        downvotes: [],
      };

      console.log(this.user);

      localStorage.setItem('user', JSON.stringify(this.user));

      if (router.currentRoute.value.path === '/login') {
        router.push('/home');
      }
    },

    logout() {
      localStorage.clear();

      this.user = null;

      router.push('/login');
    },

    setEditDisabled(value) {
      this.editDisabled = value;
      localStorage.setItem('editDisabled', JSON.stringify(this.editDisabled));
    },

    resetEditDisabled() {
      this.editDisabled = false;
    },

    deletePostFromLocalStorage(postId) {
      let posts = JSON.parse(localStorage.getItem('posts'));
      if (posts) {
        posts = posts.filter((post) => post.id !== postId);
        localStorage.setItem('posts', JSON.stringify(posts));
      }
    },
    async deletePost(postId) {
      try {
        const res = await fetch(`${this.api}posts/${postId}`, {
          method: 'DELETE',
        });
        if (!res.ok) {
          throw new Error('Fehler beim Löschen des thread in der API');
        }

        this.deletePostFromLocalStorage(postId);
      } catch (error) {
        console.error('Error Löschen des Threads:', error);
      }
    },

    upvote(postId) {
      this.user.upvotes.push(postId);
    },

    removeUpvote(postId) {
      const index = this.user.upvotes.indexOf(postId);
      this.user.upvotes.splice(index, 1);
    },

    downvote(postId) {
      this.user.downvotes.push(postId);
    },

    removeDownvote(postId) {
      const index = this.user.downvotes.indexOf(postId);
      this.user.downvotes.splice(index, 1);
    },
  },
});
