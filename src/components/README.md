TaskFlow - My Task Manager App

This is my TaskFlow application built with React Native, Expo, and TypeScript. It helps to manage tasks, see analytics, and manage profile settings.

Features

Home screen to view and add tasks.

Explore screen with interactive charts and analytics.

Profile screen for app settings and clear task options.

Dark theme support.

Folder Structure

src/app/(tabs)/index.tsx: Main home screen for task management.

src/app/(tabs)/explore.tsx: Analytics dashboard screen.

src/app/(tabs)/profile.tsx: User profile screen.

src/app/(tabs)/_layout.tsx: Tab navigation layout.

src/components/: Reusable components used across pages.

How Navigation Works

Navigation is handled using Expo Router (file-based routing). All screens inside the (tabs) folder automatically render as tabs in the bottom navigation bar, making it simple to switch between Home, Explore, and Profile.