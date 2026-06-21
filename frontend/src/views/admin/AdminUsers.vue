<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
    <div class="max-w-6xl mx-auto space-y-8">
      
      <!-- Header -->
      <header class="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Admin Users</h1>
          <p class="text-gray-500 dark:text-gray-400 mt-1">Manage and view all registered digital identities.</p>
        </div>
        <router-link to="/dashboard" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
          &larr; Back to Dashboard
        </router-link>
      </header>

      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>

      <div v-else-if="error" class="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl">
        {{ error }}
      </div>

      <div v-else class="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                <th class="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">User</th>
                <th class="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">Contact</th>
                <th class="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">Joined</th>
                <th class="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
              <template v-for="user in users" :key="user.id">
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                        {{ user.name?.charAt(0) || user.username?.charAt(0) }}
                      </div>
                      <div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ user.name || user.username }}</div>
                        <div class="text-sm text-gray-500">@{{ user.username }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900 dark:text-gray-300">{{ user.email }}</div>
                    <div class="text-xs text-gray-500" v-if="user.profile?.contact_phone">{{ user.profile.contact_phone }}</div>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {{ new Date(user.created_at).toLocaleDateString() }}
                  </td>
                  <td class="px-6 py-4 text-right">
                    <button @click="toggleExpand(user.id)" class="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                      {{ expandedUserId === user.id ? 'Hide Details' : 'View Details' }}
                    </button>
                    <a :href="`/@${user.username}`" target="_blank" class="ml-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm font-medium">
                      Public Profile &nearr;
                    </a>
                  </td>
                </tr>
                
                <!-- Expanded Details Row -->
                <tr v-if="expandedUserId === user.id" class="bg-gray-50/50 dark:bg-gray-800/20">
                  <td colspan="4" class="px-6 py-6 border-b border-gray-100 dark:border-gray-700">
                    <div v-if="user.profile" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      
                      <div>
                        <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Professional</h4>
                        <div class="space-y-2">
                          <p class="text-sm"><span class="font-medium text-gray-900 dark:text-gray-200">Headline:</span> {{ user.profile.headline || 'N/A' }}</p>
                          <p class="text-sm"><span class="font-medium text-gray-900 dark:text-gray-200">Bio:</span> {{ user.profile.bio || 'N/A' }}</p>
                          <p class="text-sm"><span class="font-medium text-gray-900 dark:text-gray-200">Theme Color:</span> 
                            <span class="inline-block w-4 h-4 rounded-full align-middle ml-1" :style="{ backgroundColor: user.profile.theme_color || '#3B82F6' }"></span>
                            {{ user.profile.theme_color || '#3B82F6' }}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Skills & Projects</h4>
                        <div class="space-y-2">
                          <div v-if="user.profile.skills?.length" class="flex flex-wrap gap-1">
                            <span v-for="(s, i) in user.profile.skills" :key="i" class="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded">{{ s }}</span>
                          </div>
                          <div v-else class="text-sm text-gray-500">No skills added.</div>
                          
                          <div class="mt-2 text-sm text-gray-900 dark:text-gray-200 font-medium">Projects: {{ user.profile.projects?.length || 0 }}</div>
                        </div>
                      </div>

                      <div>
                        <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Social Links</h4>
                        <ul class="space-y-1 text-sm">
                          <li v-if="user.profile.linkedin">
                            <a :href="user.profile.linkedin" target="_blank" class="text-blue-500 hover:underline">LinkedIn</a>
                          </li>
                          <li v-for="(link, i) in user.profile.socialLinks" :key="i">
                            <a :href="link.url" target="_blank" class="text-blue-500 hover:underline">{{ link.platform }}</a>
                          </li>
                          <li v-if="!user.profile.linkedin && (!user.profile.socialLinks || !user.profile.socialLinks.length)" class="text-gray-500">
                            No links added.
                          </li>
                        </ul>
                      </div>

                    </div>
                    <div v-else class="text-center text-sm text-gray-500 py-4">
                      This user has not set up a profile yet.
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { apiFetch } from '../../services/api';

const users = ref([]);
const loading = ref(true);
const error = ref(null);
const expandedUserId = ref(null);

onMounted(async () => {
  try {
    const res = await apiFetch('/admin/users');
    users.value = res;
  } catch (err) {
    error.value = 'Failed to load users or you are not authorized.';
  } finally {
    loading.value = false;
  }
});

const toggleExpand = (id) => {
  expandedUserId.value = expandedUserId.value === id ? null : id;
};
</script>
