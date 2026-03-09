# Restaurant Chooser App

This is a React Native application for choosing restaurants. Follow the steps below to set up and run the app on iOS and Android.

## Features

1. People management
   1. Add people with first name, last name, relationships
   2. Delete persons
2. Restaurant management
   1. Add restaurant with name, cuisine, price range, stars rating, phone number, address, web site, delivery option
   2. Delete restaurant
3. Dinning decision
   1. Choose members, who will go on dinner
   2. Filter restaurants
   3. Select random restaurant
   4. Veto/accept for persons
   5. Chosen result

## Expo installation

https://expo.dev/accounts/anemon/projects/restaurant-chooser/builds/f1a960cb-16e7-4fdb-883a-fcac71dd0b9e

## Prerequisites

Before starting, ensure you have the following installed on your system:

1. **Node.js** (LTS version recommended) and `npm` or `yarn`
2. **React Native CLI**: Install it globally using:

   ```bash
   npm install -g react-native-cli
   ```

3. **Xcode** (for iOS): Install it from the Mac App Store and ensure the Command Line Tools are installed.
4. **Android Studio** (for Android): Install it and configure the Android SDK and emulator.

## Getting Started

1. **Clone the Repository**:
2. **Install Dependencies**:
   Use `npm` or `yarn` to install the required dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Start the Metro Bundler**:
   Run the following command to start the Metro bundler:

   ```bash
   npm start
   ```

   or

   ```bash
   yarn start
   ```

## Running the App

### On iOS

Open a new terminal and run:

```bash
  npx react-native run-ios
```

This will build the app and launch it in the iOS Simulator.

### On Android

1. Start an Android emulator from Android Studio or connect a physical Android device.
2. Open a new terminal and run:

```bash
   npx react-native run-android
```

This will build the app and launch it on the Android emulator or connected device.

## Troubleshooting

### iOS

- If the app doesn't launch in the simulator, ensure Xcode is installed and properly configured.

### Android

- Ensure the Android emulator is running or a physical device is connected.
- If you encounter issues with the Android build, ensure the Android SDK is installed and properly configured in Android Studio.
- Check that the `ANDROID_HOME` environment variable is set correctly.

## Additional Notes

- To run the app on a physical device, ensure your device is connected and trusted, and follow the instructions in the [React Native documentation](https://reactnative.dev/docs/running-on-device).
- For any issues, check the React Native [troubleshooting guide](https://reactnative.dev/docs/troubleshooting).

## License

This project is licensed under the MIT License.
