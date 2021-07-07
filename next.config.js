const withPWA = require("next-pwa");
const { i18n } = require("./next-i18next.config");

module.exports = withPWA({
  i18n,
  pwa: {
    dest: "public",
  },
});
