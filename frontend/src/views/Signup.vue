<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
      <div class="p-8">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-6">
          <img src="https://i.ibb.co/chrxq5jh/Gemini-Generated-Image-k6n1txk6n1txk6n1.png" alt="Telko Logo" class="h-28 object-contain" />
        </div>
        <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Create Your Profile
        </h2>
        <p class="text-gray-500 dark:text-gray-400 mt-2">Enter your details to get started. No password required!</p>
        </div>

        <form @submit.prevent="handleSignup" class="space-y-5">
          <div v-if="error" class="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm text-center">
            {{ error }}
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
            <input v-model="form.username" type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="johndoe">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input v-model="form.email" type="email" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="john@example.com">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Headline</label>
            <input v-model="form.headline" type="text" class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="e.g. Full Stack Developer">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
            <textarea v-model="form.bio" rows="3" class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Tell us a little about yourself..."></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avatar URL</label>
            <input v-model="form.avatar_url" type="url" class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="https://example.com/avatar.jpg">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skills (Comma separated)</label>
            <input v-model="skillsInput" type="text" class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Vue, Laravel, Tailwind">
          </div>

          <button type="submit" :disabled="loading" class="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-lg hover:shadow-blue-500/30 disabled:opacity-70">
            <span v-if="loading">Creating Profile...</span>
            <span v-else>Create Profile</span>
          </button>
        </form>
        
        <div class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account? 
          <router-link to="/login" class="text-blue-600 dark:text-blue-400 font-medium hover:underline">Log in</router-link>
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
const skillsInput = ref('');
const form = reactive({
  email: '',
  username: '',
  headline: '',
  bio: '',
  avatar_url: '',
  skills: []
});
const loading = ref(false);
const error = ref('');

const handleSignup = async () => {
  loading.value = true;
  error.value = '';
  try {
    // Process skills into array
    form.skills = skillsInput.value.split(',').map(s => s.trim()).filter(s => s);
    
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(form)
    });
    localStorage.setItem('auth_token', data.access_token);
    router.push('/dashboard');
  } catch (err) {
    error.value = err.message || 'Failed to create account. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>
