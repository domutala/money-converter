import languages from "./languages";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: languages,
}));
