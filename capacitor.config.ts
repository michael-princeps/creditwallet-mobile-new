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
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    CodePush: {
      //can be found in your appcenter Demo-ios app dashboard
      "IOS_DEPLOY_KEY": "5p0WHe6vmQXpJRyJ_o3WQrcEKCrxo_5tfDfjX", 
      "ANDROID_DEPLOY_KEY": "_13xB7QLr7NTl4NeaMbrUj9QcksKS0jdAoDMx",
      "SERVER_URL": "https://codepush.appcenter.ms/"
    }
  }
};

export default config;
