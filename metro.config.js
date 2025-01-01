const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

module.exports = withNativeWind(
  (() => {
    const config = getDefaultConfig(__dirname);
    const { transformer, resolver } = config;

    // Add SVG transformer configuration
    config.transformer = {
      ...transformer,
      babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
    };

    config.resolver = {
      ...resolver,
      assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...resolver.sourceExts, "svg"],
    };

    return config;
  })(),
  { input: "./global.css" } // NativeWind Tailwind CSS configuration
);
