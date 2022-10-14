module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@Tools": "./src/components/tools",
            "@Assets": "./src/assets",
            "@Types": "./src/components/types",
            "@Views": "./src/components/views",
            "@Store": "./src/store",
            "@Styles": "./src/styles",
            "@Api": "./src/api",
          },
          extensions: [".ts", ".tsx", ".svg", ".png"],
        },
      ],
    ],
  };
};
