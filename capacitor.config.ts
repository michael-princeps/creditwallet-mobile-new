import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.princepsfinance.creditwallet',
  appName: 'creditwallet-mobile',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    Keyboard: {
      resize: "body",
      resizeOnFullScreen: true,
    },
  }
};

export default config;
