<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
      <div class="p-8">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-6">
            <img src="https://i.ibb.co/chrxq5jh/Gemini-Generated-Image-k6n1txk6n1txk6n1.png" alt="Telko Logo" class="h-28 object-contain" />
          </div>
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Welcome Back</h2>
          <p class="text-gray-500 dark:text-gray-400">Log in to manage your identity.</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div v-if="error" class="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm text-center">
            {{ error }}
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input v-model="form.email" type="email" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="john@example.com">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input v-model="form.password" type="password" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="••••••••">
          </div>

          <button type="submit" :disabled="loading" class="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-lg hover:shadow-blue-500/30 disabled:opacity-70">
            <span v-if="loading">Logging in...</span>
            <span v-else>Log In</span>
          </button>
        </form>
        
        <div class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account? 
          <router-link to="/signup" class="text-blue-600 dark:text-blue-400 font-medium hover:underline">Sign up</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { apiFetch } from '../services/api';

const router = useRouter();
const form = reactive({
  email: '',
  password: ''
});
const loading = ref(false);
const error = ref('');

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  try {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(form)
    });
    localStorage.setItem('auth_token', data.access_token);
    router.push('/dashboard');
  } catch (err) {
    error.value = err.message || 'Invalid credentials. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>
