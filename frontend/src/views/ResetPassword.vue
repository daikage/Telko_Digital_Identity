<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="brand">
        <div class="logo">TDI</div>
        <h1>Reset Password</h1>
        <p>Enter your new password below.</p>
      </div>

      <form @submit.prevent="handleResetPassword" class="auth-form">
        <div class="form-group">
          <label for="password">New Password</label>
          <div class="input-wrapper">
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              required 
              placeholder="Min 8 characters"
            >
          </div>
        </div>

        <div class="form-group">
          <label for="password_confirmation">Confirm Password</label>
          <div class="input-wrapper">
            <input 
              type="password" 
              id="password_confirmation" 
              v-model="password_confirmation" 
              required 
              placeholder="Confirm new password"
            >
          </div>
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        
        <div v-if="success" class="success-message">
          {{ success }}
        </div>

        <button type="submit" class="submit-btn" :disabled="loading">
          <span v-if="!loading">Reset Password</span>
          <span v-else class="loader"></span>
        </button>

        <div class="auth-links" v-if="success">
          <router-link to="/login">Proceed to Login</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { resetPassword } from '../services/api';

const route = useRoute();
const router = useRouter();

const password = ref('');
const password_confirmation = ref('');
const error = ref('');
const success = ref('');
const loading = ref(false);
const email = ref('');
const token = ref('');

onMounted(() => {
  email.value = route.query.email || '';
  token.value = route.query.token || '';

  if (!email.value || !token.value) {
    error.value = 'Invalid password reset link.';
  }
});

const handleResetPassword = async () => {
  if (password.value !== password_confirmation.value) {
    error.value = 'Passwords do not match.';
    return;
  }

  if (!email.value || !token.value) {
    error.value = 'Invalid password reset link.';
    return;
  }

  error.value = '';
  success.value = '';
  loading.value = true;
  
  try {
    const response = await resetPassword({
      email: email.value,
      token: token.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    });
    success.value = response.message || 'Your password has been reset successfully.';
    password.value = '';
    password_confirmation.value = '';
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  } catch (err) {
    error.value = err.message || 'An error occurred. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
}

.auth-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(124, 58, 237, 0.1) 0%, transparent 50%);
  animation: rotate 30s linear infinite;
  z-index: 0;
}

.auth-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 3rem;
  width: 100%;
  max-width: 440px;
  position: relative;
  z-index: 1;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.brand {
  text-align: center;
  margin-bottom: 2.5rem;
}

.logo {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  margin: 0 auto 1.5rem;
  box-shadow: 0 10px 20px rgba(124, 58, 237, 0.3);
}

h1 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #fff, #a78bfa);
  -webkit-background-clip: text;
  color: transparent;
}

p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-left: 0.25rem;
}

.input-wrapper {
  position: relative;
}

input {
  width: 100%;
  padding: 1rem 1.25rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.2);
  background: rgba(0, 0, 0, 0.3);
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 52px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(124, 58, 237, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.auth-links {
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-top: 1rem;
}

.auth-links a {
  color: var(--accent-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.auth-links a:hover {
  color: var(--accent-secondary);
  text-decoration: underline;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  text-align: center;
  padding: 0.75rem;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.success-message {
  color: #10b981;
  font-size: 0.875rem;
  text-align: center;
  padding: 0.75rem;
  background: rgba(16, 185, 129, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.loader {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 480px) {
  .auth-card {
    padding: 2rem;
  }
}
</style>
