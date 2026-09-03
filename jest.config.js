module.exports = {
  preset: 'react-native',
  // Mocks the native RNGestureHandlerModule / gesture components so tests that
  // render a Swipeable don't try to invoke real native code.
  setupFiles: ['react-native-gesture-handler/jestSetup'],
  // The base react-native preset only allows transforming react-native's own
  // node_modules packages (they ship ESM). Several other dependencies added since
  // then also ship ESM and need to go through Babel too, or Jest fails to parse
  // their `import`/`export` syntax.
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|@ui-kitten|@eva-design|@d11|@reduxjs|react-redux|redux|immer|react-native-reanimated|react-native-svg|react-native-screens|react-native-safe-area-context|react-native-mmkv|react-native-eva-icons|react-native-gesture-handler)/)',
  ],
};
