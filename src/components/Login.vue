<template>
  <div class="login">
    <div class="container my-5">
    <h2>Admin Login</h2>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" id="username" v-model="username" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <p v-if="error" class="text-danger mt-3">{{ error }}</p>
  </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
  login() {
    // Simulated admin credentials
    const adminUsername = 'admin';
    const adminPassword = 'password';

    // Tekshirishdan oldin, foydalanuvchi ma'lumotlarini o'qib oling
    const enteredUsername = this.username.trim();
    const enteredPassword = this.password.trim();

    // Tekshirish
    if (enteredUsername === adminUsername && enteredPassword === adminPassword) {
      // Redirect to admin page
      localStorage.setItem('isAdminLoggedIn', true); // isAdminLoggedIn ni true ga sozlash
      this.$router.push('/admin');
    } else {
      this.error = 'Invalid username or password';
    }
  }
}

};
</script>

<style scoped>
.login{
    height: calc(100vh - 212px);
}
</style>
