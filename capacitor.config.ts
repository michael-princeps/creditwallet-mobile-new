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
    SplashScreen: {
      backgroundColor: "#F56B2A",
      androidScaleType: "CENTER_CROP",
      launchAutoHide: false,
      launchShowDuration: 7000,
      splashFullScreen: true,
      splashImmersive: true,
    }
  }
};

export default config;
