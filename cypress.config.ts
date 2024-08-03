import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'isysfr',
  e2e: {
    setupNodeEvents(on, config) {
      // 實現節點事件監聽器
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});