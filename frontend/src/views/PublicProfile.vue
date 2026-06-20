<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 selection:bg-blue-500 selection:text-white">
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
    </div>
    
    <div v-else-if="error" class="flex flex-col justify-center items-center min-h-screen text-center p-4">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Profile Not Found</h1>
      <p class="text-gray-500 dark:text-gray-400 mb-6">{{ error }}</p>
      <router-link to="/" class="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
        Go Home
      </router-link>
    </div>

    <div v-else class="max-w-3xl mx-auto px-4 py-12 md:py-24 animate-fade-in-up">
      <!-- Profile Header -->
      <div class="text-center mb-12">
        <div class="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-blue-500 to-blue-500 p-1 mb-6 shadow-xl shadow-blue-500/20">
          <div class="w-full h-full bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-4xl font-bold text-blue-500">
            {{ user.name?.charAt(0) || user.username?.charAt(0) }}
          </div>
        </div>
        <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
          {{ user.name || user.username }}
        </h1>
        <p class="text-xl text-blue-600 dark:text-blue-400 font-medium mb-4">
          {{ profile.headline || 'Digital Professional' }}
        </p>
        
        <div class="flex justify-center gap-4 mt-6">
          <button @click="saveContact" class="px-6 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold shadow-lg hover:-translate-y-1 transition-transform">
            Save Contact
          </button>
          <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank" class="px-6 py-3 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
            LinkedIn
          </a>
        </div>
      </div>

      <!-- Bio -->
      <div v-if="profile.bio" class="prose prose-lg dark:prose-invert max-w-none text-center mb-16">
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
          {{ profile.bio }}
        </p>
      </div>

      <!-- Experience (Stub) -->
      <div v-if="profile.experiences?.length" class="space-y-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white text-center">Experience</h2>
        <div class="space-y-6">
          <div v-for="exp in profile.experiences" :key="exp.id" class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ exp.title }}</h3>
            <p class="text-blue-600 dark:text-blue-400 font-medium">{{ exp.company }}</p>
            <p class="text-gray-500 text-sm mt-2">{{ exp.description }}</p>
          </div>
        </div>
      </div>

      <!-- Footer Branding & QR -->
      <div class="mt-24 text-center pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col items-center">
        <div class="mb-8 p-4 bg-white rounded-2xl shadow-sm inline-block">
          <qrcode-vue :value="currentUrl" :size="120" level="H" />
          <p class="text-gray-500 text-xs mt-2 font-medium">Scan to view profile</p>
        </div>
        <router-link to="/" class="inline-flex items-center gap-3 text-sm text-gray-400 hover:text-blue-500 transition-colors">
          <img src="https://i.ibb.co/bjF2sM35/Telko-logo-Update-1-jpg-1.png" alt="Telko Logo" class="h-8 object-contain" />
          <span>Create your own</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { API_URL } from '../services/api';
import QrcodeVue from 'qrcode.vue';

const route = useRoute();
const user = ref({});
const profile = ref({});
const loading = ref(true);
const error = ref('');

const currentUrl = computed(() => window.location.href);

onMounted(async () => {
  const username = route.params.username;
  try {
    const res = await fetch(`${API_URL}/profile/${username}`);
    if (!res.ok) throw new Error('Profile not found');
    const data = await res.json();
    user.value = data.user;
    profile.value = data.profile || {};
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

const saveContact = () => {
  // Simple vCard generation stub
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:;${user.value.name || user.value.username};;;
FN:${user.value.name || user.value.username}
TITLE:${profile.value.headline || ''}
URL:${window.location.href}
END:VCARD`;

  const blob = new Blob([vcard], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${user.value.username}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
</script>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}
</style>
