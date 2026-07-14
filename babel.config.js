module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    // Reanimated 4 requires the worklets plugin; it must be listed last.
    plugins: ["react-native-worklets/plugin"],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
};
