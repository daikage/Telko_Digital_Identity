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
        <div class="w-32 h-32 mx-auto rounded-full p-1 mb-6 shadow-xl" :style="{ background: `linear-gradient(to top right, ${profile.theme_color || '#3B82F6'}, ${profile.theme_color || '#3B82F6'}88)` }">
          <img v-if="profile.avatar_url" :src="profile.avatar_url" alt="Avatar" class="w-full h-full object-cover rounded-full bg-white dark:bg-gray-800" />
          <div v-else class="w-full h-full bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-4xl font-bold" :style="{ color: profile.theme_color || '#3B82F6' }">
            {{ user.name?.charAt(0) || user.username?.charAt(0) }}
          </div>
        </div>
        <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
          {{ user.name || user.username }}
        </h1>
        <p class="text-xl font-medium mb-4" :style="{ color: profile.theme_color || '#3B82F6' }">
          {{ profile.headline || 'Digital Professional' }}
        </p>
        
        <div class="flex justify-center flex-wrap gap-4 mt-6">
          <button @click="saveContact" class="px-6 py-3 rounded-full text-white font-bold shadow-lg hover:-translate-y-1 transition-transform" :style="{ backgroundColor: profile.theme_color || '#111827' }">
            Save Contact
          </button>
          <button @click="shareProfile" class="px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            Share
          </button>
        </div>
      </div>

      <!-- Social Grid -->
      <div v-if="profile.socialLinks?.length || profile.linkedin" class="flex flex-wrap justify-center gap-3 mb-12">
        <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank" class="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow font-medium text-gray-700 dark:text-gray-300">
          LinkedIn
        </a>
        <a v-for="(link, i) in profile.socialLinks" :key="i" :href="link.url" target="_blank" class="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow font-medium text-gray-700 dark:text-gray-300">
          {{ link.platform }}
        </a>
      </div>

      <!-- Bio -->
      <div v-if="profile.bio" class="prose prose-lg dark:prose-invert max-w-none text-center mb-16">
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
          {{ profile.bio }}
        </p>
      </div>

      <!-- Skills Badges -->
      <div v-if="profile.skills?.length" class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">Skills</h2>
        <div class="flex flex-wrap justify-center gap-2">
          <span v-for="(skill, i) in profile.skills" :key="i" class="px-4 py-1.5 rounded-full text-sm font-semibold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
            {{ skill }}
          </span>
        </div>
      </div>

      <!-- Projects Gallery -->
      <div v-if="profile.projects?.length" class="mb-16 space-y-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white text-center">Projects</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a v-for="(project, i) in profile.projects" :key="i" :href="project.url || '#'" :target="project.url ? '_blank' : '_self'" class="block p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all group">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:underline" :style="{ textDecorationColor: profile.theme_color || '#3B82F6' }">{{ project.title }}</h3>
            <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm">{{ project.description }}</p>
          </a>
        </div>
      </div>

      <!-- Experience (Stub) -->
      <div v-if="profile.experiences?.length" class="space-y-8 mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white text-center">Experience</h2>
        <div class="space-y-6">
          <div v-for="exp in profile.experiences" :key="exp.id" class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ exp.title }}</h3>
            <p class="font-medium" :style="{ color: profile.theme_color || '#3B82F6' }">{{ exp.company }}</p>
            <p class="text-gray-500 text-sm mt-2">{{ exp.description }}</p>
          </div>
        </div>
      </div>

      <!-- Footer Branding & QR -->
      <div class="mt-16 text-center pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col items-center">
        <div class="mb-8 p-4 bg-white rounded-2xl shadow-sm inline-block border border-gray-100">
          <qrcode-vue :value="currentUrl" :size="120" level="H" foreground="#000000" />
          <p class="text-gray-500 text-xs mt-2 font-medium">Scan to view profile</p>
        </div>
        <router-link to="/" class="inline-flex items-center gap-3 text-sm text-gray-400 hover:text-blue-500 transition-colors">
          <img src="https://i.ibb.co/chrxq5jh/Gemini-Generated-Image-k6n1txk6n1txk6n1.png" alt="Telko Logo" class="h-14 object-contain" />
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
  let vcard = `BEGIN:VCARD
VERSION:3.0
N:;${user.value.name || user.value.username};;;
FN:${user.value.name || user.value.username}
TITLE:${profile.value.headline || ''}
URL:${window.location.href}
`;
  if (profile.value.contact_email) vcard += `EMAIL:${profile.value.contact_email}\n`;
  if (profile.value.contact_phone) vcard += `TEL:${profile.value.contact_phone}\n`;
  vcard += `END:VCARD`;

  const blob = new Blob([vcard], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${user.value.username}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const shareProfile = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: `${user.value.name || user.value.username}'s Digital Profile`,
        text: profile.value.headline || 'Check out my professional profile.',
        url: window.location.href,
      });
    } catch (err) {
      console.log('Error sharing', err);
    }
  } else {
    // Fallback
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  }
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
