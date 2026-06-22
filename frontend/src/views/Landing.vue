<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
    <div class="max-w-3xl w-full text-center space-y-8 animate-fade-in-up">
      <div class="flex justify-center items-center">
        <img src="https://i.ibb.co/chrxq5jh/Gemini-Generated-Image-k6n1txk6n1txk6n1.png" alt="Telko Logo" class="h-48 md:h-56 object-contain drop-shadow-2xl" />
      </div>
      <p class="text-xl md:text-2xl text-gray-300 font-light">
        One profile. One identity. Share anywhere.
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <router-link to="/signup" class="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-lg hover:shadow-blue-500/50 hover:-translate-y-1">
          Create Profile
        </router-link>
        <router-link to="/login" class="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-md transition-all hover:-translate-y-1 border border-white/10">
          Login
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-gray-400">
        <div class="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-blue-500/30 transition-colors">
          <div class="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 mx-auto">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
          </div>
          <h3 class="text-xl font-medium text-gray-200 mb-2">Share</h3>
          <p class="text-sm">Generate QR codes and share your identity instantly.</p>
        </div>
        <div class="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-blue-500/30 transition-colors">
          <div class="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 mx-auto">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h3 class="text-xl font-medium text-gray-200 mb-2">Connect</h3>
          <p class="text-sm">Let others save your contact details with one tap.</p>
        </div>
        <div class="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-blue-500/30 transition-colors">
          <div class="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 mx-auto">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
          </div>
          <h3 class="text-xl font-medium text-gray-200 mb-2">Grow</h3>
          <p class="text-sm">Track your profile views and connections over time.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}
</style>
