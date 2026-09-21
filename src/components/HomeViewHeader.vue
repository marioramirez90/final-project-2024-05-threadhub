<template>
  <header class="homeview-header">
    <RouterLink class="logo" :to="{ name: 'home' }">ThreadHub</RouterLink>
    <div class="dropdown">
      <button class="dropdown-button">
        <img src="../assets/images/threadhub.png" alt="Logo der ThreadHub App" />
      </button>
      <div class="dropdown-content">
        <RouterLink :to="{ name: 'profile' }">Mein Profil</RouterLink>
        <RouterLink :to="{ name: 'mypostview' }">Meine Threads</RouterLink>
        <a href="#">Einstellungen</a>
        <a href="#" @click="logout">Ausloggen</a>
      </div>
    </div>
  </header>
</template>

<script>
import { useUserStore } from '@/stores/user';

export default {
  name: 'HomeViewHeader',
  setup() {
    const userStore = useUserStore();
    const logout = () => {
      userStore.logout();
    };
    return {
      logout,
    };
  },
};
</script>

<style scoped>
.homeview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 3rem;
}

img {
  height: 1.75rem;
  margin-top: 0.2rem;
}

.logo {
  text-decoration: none;
  color: var(--header-color);
  font-weight: 700;
  font-size: 1.5rem;
}

.dropdown-button {
  background-color: var(--background-inputfield);
  border: none;
  cursor: pointer;
  border-radius: 9px;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 1rem;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 9px;
}

.dropdown-content a {
  color: var(--header-color);
  padding: 8px 14px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: var(--background-inputfield);
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropdown-button {
  background-color: var(--background-inputfield);
}
@media (min-width: 1000px) and (max-width: 1920px) {
  .logo {
    font-size: 2rem;
  }
  .dropdown-content {
    font-size: 1.25rem;
    right: 1rem;
  }
}
</style>
