<template>
  <div class="login-container">
    <div class="login-username">
      <label for="username">Benutzername:</label>
      <input type="text" id="username" placeholder="" v-model="username" />
    </div>
    <div class="login-password">
      <label for="password">Password:</label>
      <input type="password" id="password" placeholder="" v-model="password" />
    </div>
    <div class="login">
      <a href="#">Regristrierung</a>
      <button @click="checkUser()">Login</button>

      <div v-if="showErrorMassages" class="massages">
        <div class="error-massages">
          <span class="close-button" @click="showErrorMassages = false">&times;</span>
          <img src="/src/assets/images/erro.png" alt="logo" class="logo" />
          <p>{{ errorMessages }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessages: 'Benutzername oder Passwort ist falsch!',
      showErrorMassages: false,
      user: {},
    };
  },

  methods: {
    async checkUser() {
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();
      const foundUser = users.find(
        (user) => user.username === this.username && user.password === this.password,
      );
      this.user = foundUser;
      // this.checkAdmin();

      if (foundUser) {
        localStorage.setItem('userId', foundUser.id);
        console.log(foundUser);
        const userStore = useUserStore();
        console.log(userStore);
        await userStore.getUserInfo();

        this.$router.push('/home');
      } else {
        this.errorMessage = 'Benutzername oder Passwort ist falsch';
        this.showErrorMassages = true;
        this.username = '';
        this.password = '';
      }
    },
    // checkAdmin() {
    //   if (this.isAdmin) {
    //     localStorage.setItem('isAdmin', true);
    //   } else {
    //     localStorage.setItem('isAdmin', false);
    //   }
    // },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: left;
  padding: 2rem;
  border-radius: 2rem;
  flex-direction: column;
  margin: 2rem;
  background-color: var(--header-color);
  max-width: 320px;
}
.login-username {
  margin-bottom: 2rem;
}

.login-username label {
  color: var(--font-color);
  display: block;
  margin-left: 0.7rem;
  margin-bottom: 0.1rem;
  font-size: 0.8rem;
}
.login-username input {
  width: 100%;
  padding: 0.9rem;

  box-sizing: border-box;
  border-radius: 1rem;
  border: none;
  background-color: var(--background-inputfield);
}

.login-password {
  margin-bottom: 1rem;
}

.login-password label {
  color: var(--font-color);
  display: block;
  margin-left: 0.7rem;
  margin-bottom: 0.1rem;
  font-size: 0.8rem;
}
.login-password input {
  width: 100%;
  padding: 0.9rem;
  box-sizing: border-box;
  border-radius: 1rem;
  border: none;
  background-color: var(--background-inputfield);
}

.login {
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.login button {
  padding: 0.5rem 2rem;
  border-radius: 0.7rem;
  border: none;
  cursor: not-allowed;
  background-color: var(--background-inputfield);
  color: black;
}

.login a {
  font-size: 13px;
  margin-top: 0.5rem;
  text-decoration: none;
  color: var(--font-color);
  margin-left: 0.7rem;
}

.massages {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-content: center;
}

.error-massages {
  background: white;
  gap: 0.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 30%;
  margin-top: 20rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}
.error-massages p {
  color: red;
}
.close-button {
  position: absolute;
  right: 0.5rem;
  top: 0.5px;
  padding: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
}

.logo {
  height: 50px;
  width: 50px;
}
</style>
