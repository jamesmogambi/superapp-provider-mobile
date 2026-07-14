# Cabs&More Provider

The **provider-facing** mobile application for the Cabs&More super-app platform. This app is used by service providers (vendors, merchants, professionals) to manage their business on the go — receiving and fulfilling live orders, managing services and packages, chatting with customers and admins, and handling their wallet and payouts.

Built with **React Native** and **Expo**.

## Features

- **Authentication** — Login, registration, and OTP verification flows.
- **Live Orders** — Real-time order management across a tabbed workflow: `New → Accepted → In Process → Completed`.
- **Order Details & History** — View full order information and browse past orders.
- **Services & Packages** — Manage the services offered and create/edit packages.
- **Service Time / Slots** — Configure availability and bookable time slots.
- **Documents & Image Uploads** — Upload verification documents and images (via `expo-image-picker`).
- **Wallet** — View balance, transaction history, top up, and transfer funds to other users (search by contact/email).
- **Chat & Support** — Live chat with customers, chat with admin, and a support ticket flow.
- **Notifications** — In-app notification center.
- **Profile** — Edit provider profile.

## Tech Stack

| Area | Library |
|------|---------|
| Framework | [React Native](https://reactnative.dev/) `0.86` + [Expo](https://expo.dev/) `57` |
| Navigation | [React Navigation](https://reactnavigation.org/) (native-stack, drawer, material-top-tabs) |
| UI | [React Native Paper](https://reactnativepaper.com/), [NativeWind](https://www.nativewind.dev/) (Tailwind CSS) |
| Forms & Validation | [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) |
| Media | `expo-image-picker` |
| Misc | `react-native-confirmation-code-field`, `react-native-select-dropdown`, `react-native-pager-view` |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) / `npx expo`
- The [Expo Go](https://expo.dev/go) app on a physical device, or an Android/iOS emulator

### Installation

```bash
# Install dependencies
npm install

# Start the Expo development server
npm start
```

### Running the app

```bash
npm run android   # Open on Android device/emulator
npm run ios       # Open on iOS simulator (macOS only)
npm run web       # Open in the browser
```

Or scan the QR code from `npm start` using the Expo Go app.

## Project Structure

```
.
├── App.js                # App entry — wires PaperProvider + NavigationContainer + RootStack
├── app.json              # Expo configuration
├── assets/               # Icons, splash screen, images
├── components/           # Reusable UI components (forms, order/chat/wallet widgets, etc.)
├── constants/            # Shared constants (colors, drawer menu items)
├── fixtures/             # Mock/sample data (orders, transactions, chats, services…)
├── navigation/           # Navigation setup
│   ├── RootStack.js      # Root switch between Auth and App
│   ├── AuthStack.js      # Login / Register / OTP
│   ├── HomeStack.js      # Main app screens (native stack)
│   ├── AppDrawer.js      # Drawer with the custom menu
│   └── HomeTabs.js       # Live-order status tabs
├── screens/              # Screen components
├── tailwind.config.js    # NativeWind / Tailwind config
└── babel.config.js
```

## Navigation Overview

- **`RootStack`** decides between the auth flow and the main app.
- **`AuthStack`** → `Login`, `OTP`, `Register`.
- **`HomeStack`** hosts the drawer (`Root`) plus stacked screens (Order Details, Wallet, Services, Chats, Support, etc.).
- **`AppDrawer`** exposes the side menu (Profile, Order History, Services & Package, Wallet, Notifications, Support, Live Chat…).
- **`HomeTabs`** drives the live-orders board: **New / Accepted / In Process / Completed**.

## Notes

- The app currently renders the `AuthStack` by default. Authentication wiring is a **TODO** in [`navigation/RootStack.js`](navigation/RootStack.js) — once implemented, `RootStack` should switch to `HomeStack` after login.
- Screens are currently driven by mock data in [`fixtures/`](fixtures/); these should be replaced with live API calls as the backend integration lands.

## Related

This is one part of the **Cabs&More** super-app ecosystem (provider app). It is intended to work alongside the customer app and admin/backend services.
