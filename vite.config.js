import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages 部署时需要设置 base 为仓库名
  // 如果使用 username.github.io 仓库则设为 '/'
  base: '/',
})
