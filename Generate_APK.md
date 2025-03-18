### **1. Generate a Release APK (Android)**

Since Viro React is a React Native project, you need to generate an Android release build.

#### **Step 1: Navigate to Your Android Folder**

Open a terminal and go to your project’s Android directory:

```sh
cd android
```

#### **Step 2: Clean and Prepare the Build**

Run:

```sh
./gradlew clean
```

This ensures there are no leftover build files.

#### **Step 3: Generate a Release APK**

Run:

```sh
./gradlew assembleRelease
```

This process takes some time. Once completed, your APK will be located at:

```
android/app/build/outputs/apk/release/app-release.apk
```

This is the APK file you can install on your device.

---

### **2. Sign the APK (Optional but Recommended)**

To distribute the app on the Play Store, you need to sign the APK.

#### **Step 1: Generate a Keystore**

If you don’t have one, generate a keystore file using:

```sh
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

- **Remember your password and alias!**
- The keystore file will be created in your home directory unless you specify a path.

#### **Step 2: Configure the Keystore in Gradle**

Move the `my-release-key.jks` file into your `android/app/` directory.

Edit `android/gradle.properties` and add:

```
MYAPP_RELEASE_STORE_FILE=my-release-key.jks
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=your-password
MYAPP_RELEASE_KEY_PASSWORD=your-password
```

Edit `android/app/build.gradle`, inside `android { ... }`:

```gradle
signingConfigs {
    release {
        storeFile file(MYAPP_RELEASE_STORE_FILE)
        storePassword MYAPP_RELEASE_STORE_PASSWORD
        keyAlias MYAPP_RELEASE_KEY_ALIAS
        keyPassword MYAPP_RELEASE_KEY_PASSWORD
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
    }
}
```

#### **Step 3: Build the Signed APK**

Now, generate the signed APK:

```sh
cd android
./gradlew assembleRelease
```

The signed APK will be available in:

```
android/app/build/outputs/apk/release/app-release.apk
```

---

### **3. Install the APK on Your Device**

After generating the APK, install it on your device using:

```sh
adb install android/app/build/outputs/apk/release/app-release.apk
```

Or, transfer the APK file to your phone and install it manually.

---

### **4. Generating an AAB (For Play Store)**

If you plan to upload your app to the Google Play Store, build an **AAB (Android App Bundle)** instead:

```sh
./gradlew bundleRelease
```

The AAB file will be located at:

```
android/app/build/outputs/bundle/release/app-release.aab
```

This is the preferred format for Play Store uploads.

---

After following these steps, you’ll have a working APK or AAB file for installation or distribution! 🚀
