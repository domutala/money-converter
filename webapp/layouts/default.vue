<script lang="ts" setup>
import Appbar from "~/components/appbar.vue";
import ThemeSwitcher from "~/components/theme-switcher.vue";

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});
</script>

<template>
  <Head>
    <template v-for="link in head.link" :key="link.id">
      <Link
        :id="link.id"
        :rel="link.rel"
        :href="link.href"
        :hreflang="link.hreflang"
      />
    </template>
    <template v-for="meta in head.meta" :key="meta.id">
      <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
    </template>
  </Head>

  <v-app>
    <appbar />

    <slot />

    <v-footer class="d-flex align-end pa-0">
      <div class="d-flex border-t w-100 py-5 px-10">
        <div class="d-flex align-center ga-2">
          <a
            href="https://codia.sn"
            class="text-primary text-decoration-none"
            target="_blank"
          >
            Codia
          </a>
          © {{ new Date().getFullYear() }}
        </div>

        <div class="ml-auto">
          <theme-switcher />
          <ui-lang-selecter />
        </div>
      </div>
    </v-footer>
  </v-app>
</template>
