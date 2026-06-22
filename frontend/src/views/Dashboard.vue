<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
    <div class="max-w-4xl mx-auto space-y-8">
      
      <!-- Header -->
      <header class="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-800">
        <router-link to="/dashboard" class="flex items-center gap-2">
          <img src="https://i.ibb.co/chrxq5jh/Gemini-Generated-Image-k6n1txk6n1txk6n1.png" alt="Telko Logo" class="h-16 object-contain" />
        </router-link>
        <button @click="logout" class="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors">
          Logout
        </button>
      </header>

      <div v-if="loading" class="animate-pulse flex space-x-4">
        <div class="flex-1 space-y-4 py-1">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>

      <div v-else class="space-y-8">
        
        <!-- Welcome Section -->
        <section class="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Welcome back, {{ user?.name || user?.username }}!</h2>
            <p class="text-gray-500 dark:text-gray-400 mt-1">Manage your digital identity and network effectively.</p>
          </div>
          <div class="flex gap-3 w-full md:w-auto">
            <router-link to="/profile/edit" class="flex-1 md:flex-none text-center px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium transition-colors">
              Edit Profile
            </router-link>
            <router-link v-if="user?.username" :to="`/@${user.username}`" class="flex-1 md:flex-none text-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg hover:shadow-blue-500/30 transition-all">
              View Public
            </router-link>
            <router-link v-if="user?.is_admin" to="/admin/users" class="flex-1 md:flex-none text-center px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-lg hover:shadow-purple-500/30 transition-all">
              Admin Panel
            </router-link>
          </div>
        </section>

        <!-- Analytics Grid -->
        <section>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Analytics overview</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Views</div>
              <div class="text-3xl font-bold text-gray-900 dark:text-white">{{ analytics.views }}</div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Times Shared</div>
              <div class="text-3xl font-bold text-gray-900 dark:text-white">{{ analytics.shares }}</div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Connections</div>
              <div class="text-3xl font-bold text-gray-900 dark:text-white">{{ analytics.connections }}</div>
            </div>
          </div>
        </section>
        
        <!-- Quick Share -->
        <section class="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 class="text-2xl font-bold mb-2">Share your ProfileCard</h3>
            <p class="text-blue-200 mb-6">Generate a QR code to let others connect with you instantly.</p>
            <button @click="shareLink" class="px-6 py-3 rounded-xl bg-white text-blue-900 hover:bg-gray-100 font-bold transition-colors whitespace-nowrap inline-flex items-center gap-2">
              Copy Link
            </button>
          </div>
          <div class="p-4 bg-white rounded-2xl flex-shrink-0" v-if="user?.username">
            <qrcode-vue :value="profileUrl" :size="150" level="H" />
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { apiFetch, getMyProfile, logout as apiLogout } from '../services/api';
import QrcodeVue from 'qrcode.vue';

const router = useRouter();
const user = ref(null);
const profile = ref(null);
const analytics = ref({ views: 0, shares: 0, connections: 0 });
const loading = ref(true);

const profileUrl = computed(() => {
  if (!user.value?.username) return '';
  return `${window.location.origin}/@${user.value.username}`;
});

onMounted(async () => {
  try {
    const profileRes = await getMyProfile();
    user.value = profileRes.user;
    profile.value = profileRes.profile;
    
    const analyticsRes = await apiFetch('/analytics');
    analytics.value = analyticsRes;
  } catch (err) {
    console.error(err);
    if (err.message.includes('Unauthenticated')) {
      router.push('/login');
    }
  } finally {
    loading.value = false;
  }
});

const logout = async () => {
  try {
    await apiLogout();
  } catch (err) {
    console.error('Logout failed on server', err);
  } finally {
    localStorage.removeItem('auth_token');
    router.push('/');
  }
};

const shareLink = () => {
  if (user.value?.username) {
    const url = `${window.location.origin}/@${user.value.username}`;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  }
};
</script>
