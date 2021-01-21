<template>
  <h2>{{ $t("contact.title") }}</h2>
  <i18n-t keypath="contact.contact" tag="p">
    <template v-slot:contactForm>
      <a href="https://www.apprenti-polyglotte.net/contact/" target="_blank">{{
        $t("contact.form")
      }}</a>
    </template>
  </i18n-t>
</template>
