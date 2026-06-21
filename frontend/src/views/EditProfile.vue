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

        <!-- Professional Details -->
        <section class="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Professional Details</h2>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avatar URL</label>
            <input v-model="form.avatar_url" type="url" class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 transition-all" placeholder="https://example.com/avatar.jpg">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Theme Color</label>
            <div class="flex items-center gap-3">
              <input v-model="form.theme_color" type="color" class="h-10 w-10 rounded cursor-pointer border-0 p-0">
              <input v-model="form.theme_color" type="text" class="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 transition-all" placeholder="#3B82F6">
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Email</label>
              <input v-model="form.contact_email" type="email" class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 transition-all" placeholder="hello@example.com">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Phone</label>
              <input v-model="form.contact_phone" type="text" class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 transition-all" placeholder="+1 234 567 8900">
            </div>
          </div>
        </section>

        <!-- Skills & Projects -->
        <section class="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Portfolio</h2>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skills (Comma separated)</label>
            <input v-model="skillsInput" type="text" class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Vue.js, Laravel, TailwindCSS">
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Projects</label>
              <button type="button" @click="addProject" class="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">+ Add Project</button>
            </div>
            <div class="space-y-4">
              <div v-for="(project, index) in form.projects" :key="index" class="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 relative">
                <button type="button" @click="removeProject(index)" class="absolute top-2 right-2 text-red-500 hover:text-red-700">&times;</button>
                <input v-model="project.title" type="text" placeholder="Project Title" class="w-full px-3 py-2 mb-2 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 text-sm">
                <input v-model="project.url" type="url" placeholder="Project URL (optional)" class="w-full px-3 py-2 mb-2 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 text-sm">
                <textarea v-model="project.description" placeholder="Short description..." rows="2" class="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 text-sm"></textarea>
              </div>
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Social Links</label>
              <button type="button" @click="addSocialLink" class="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">+ Add Link</button>
            </div>
            <div class="space-y-3">
              <div v-for="(link, index) in form.social_links" :key="index" class="flex gap-2 items-center">
                <input v-model="link.platform" type="text" placeholder="Platform (e.g. GitHub)" class="w-1/3 px-3 py-2 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 text-sm">
                <input v-model="link.url" type="url" placeholder="URL" class="flex-1 px-3 py-2 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 text-sm">
                <button type="button" @click="removeSocialLink(index)" class="text-red-500 hover:text-red-700 p-2">&times;</button>
              </div>
            </div>
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
  linkedin: '',
  avatar_url: '',
  theme_color: '#3B82F6',
  contact_email: '',
  contact_phone: '',
  skills: [],
  projects: [],
  social_links: []
});

const skillsInput = ref('');

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
      form.avatar_url = res.profile.avatar_url || '';
      form.theme_color = res.profile.theme_color || '#3B82F6';
      form.contact_email = res.profile.contact_email || '';
      form.contact_phone = res.profile.contact_phone || '';
      form.skills = res.profile.skills || [];
      form.projects = res.profile.projects || [];
      form.social_links = res.profile.socialLinks || [];
      skillsInput.value = form.skills.join(', ');
    }
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const addProject = () => form.projects.push({ title: '', url: '', description: '' });
const removeProject = (index) => form.projects.splice(index, 1);

const addSocialLink = () => form.social_links.push({ platform: '', url: '' });
const removeSocialLink = (index) => form.social_links.splice(index, 1);

const saveProfile = async () => {
  saving.value = true;
  success.value = false;
  try {
    form.skills = skillsInput.value.split(',').map(s => s.trim()).filter(s => s);
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
