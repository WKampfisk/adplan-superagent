import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kampfisk.adplan',
  appName: 'AdPlan',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: '#0c0b10',
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0c0b10',
    },
    Keyboard: {
      resize: 'body',
    },
  },
};

export default config;
