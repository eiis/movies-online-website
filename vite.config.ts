import { defineConfig,loadEnv } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log('env',env.VITE_API_PREFIX);
  
  return {
    resolve: {
      alias: {
        // 将 `@` 解析为 `/src` 目录
        '@': path.resolve(__dirname, 'src'),
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },

    plugins: [vue()],
  }
})
