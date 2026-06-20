<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
    <div class="max-w-3xl mx-auto">
      <header class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Edit Profile</h1>
          <p class="text-gray-500 dark:text-gray-400 mt-1">Update your professional identity.</p>
        </div>
        <router-link to="/dashboard" class="text-blue-600 dark:text-blue-400 hover:underline">
          &larr; Back to Dashboard
        </router-link>
      </header>

      <form @submit.prevent="saveProfile" class="space-y-6">
        
        <!-- Basic Info -->
        <section class="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h2>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Headline</label>
            <input v-model="form.headline" type="text" class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 transition-all" placeholder="e.g. Senior Software Engineer">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
            <textarea v-model="form.bio" rows="4" class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Tell us about yourself..."></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn URL</label>
            <input v-model="form.linkedin" type="url" class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 transition-all" placeholder="https://linkedin.com/in/username">
          </div>
        </section>

        <!-- Submit -->
        <div class="flex items-center gap-4">
          <button type="submit" :disabled="saving" class="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-lg hover:shadow-blue-500/30 disabled:opacity-70">
            <span v-if="saving">Saving...</span>
            <span v-else>Publish Profile</span>
          </button>
          <span v-if="success" class="text-green-500 font-medium">Profile saved successfully!</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { apiFetch } from '../services/api';

const form = reactive({
  headline: '',
  bio: '',
  linkedin: ''
});

const loading = ref(true);
const saving = ref(false);
const success = ref(false);

onMounted(async () => {
  try {
    const res = await apiFetch('/my-profile');
    if (res.profile) {
      form.headline = res.profile.headline || '';
      form.bio = res.profile.bio || '';
      form.linkedin = res.profile.linkedin || '';
    }
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const saveProfile = async () => {
  saving.value = true;
  success.value = false;
  try {
    await apiFetch('/profile/update', {
      method: 'PUT',
      body: JSON.stringify(form)
    });
    success.value = true;
    setTimeout(() => success.value = false, 3000);
  } catch (err) {
    alert('Failed to save profile: ' + err.message);
  } finally {
    saving.value = false;
  }
};
</script>
