<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Login</h2>
      <div class="form-group">
        <input type="email" v-model="email" placeholder="Email" required>
      </div>
      <div class="form-group">
        <input type="password" v-model="password" placeholder="Password" required>
      </div>
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.get('http://148.135.137.88:8000/api/User/', {
          headers: {
            'Authorization': 'Bearer n9fEPYjy.h2T5ml78PhVpsjfWDTbzXkjR9BEL2ifh'
          }
        })
        
        const user = response.data.find(u => u.email === this.email && u.password === this.password)
        
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          this.$router.push(user.role === 'admin' ? '/admin' : '/dashboard')
        } else {
          this.error = 'Email atau password salah!'
        }
      } catch (err) {
        this.error = 'Gagal login, coba lagi!'
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  width: 300px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 10px;
}
</style> 