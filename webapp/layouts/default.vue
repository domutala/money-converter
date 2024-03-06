<script lang="ts" setup>
import Appbar from "~/components/appbar.vue";

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

    <v-footer class="d-flex flex-column justify-end" color="background">
      <div class="mb-5 mt-5">© {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>
