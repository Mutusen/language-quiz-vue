<template>
  <h2>{{ $t("about.title") }}</h2>
  <p>{{ $t("about.reasons") }}</p>
  <ul>
    <i18n-t keypath="about.reasons1" tag="li">
      <template v-slot:link>
        <a
          href="https://www.apprenti-polyglotte.net/"
          lang="fr"
          target="_blank"
          >{{ $t("about.reasons1Website") }}</a
        >
      </template>
    </i18n-t>
    <li>
      {{ $t("about.reasons2") }}
    </li>
    <i18n-t keypath="about.reasons3" tag="li">
      <template v-slot:django>
        <a href="https://www.djangoproject.com/" target="_blank">Django</a>
      </template>
      <template v-slot:vuejs>
        <a href="https://v3.vuejs.org/" target="_blank">Vue.js</a>
      </template>
    </i18n-t>
  </ul>
  <p>{{ $t("about.inspiration") }}</p>
  <ul>
    <li>
      <a href="https://greatlanguagegame.com/" target="_blank"
        >The Great Language Game</a
      >
    </li>
    <li>
      <a href="https://lingyourlanguage.com/" target="_blank"
        >LingYourLanguage</a
      >
    </li>
    <li>
      <a href="https://languageguesser.com/" target="_blank">LanguageGuesser</a>
    </li>
    <li>
      <a href="https://www.languagesquad.com/" target="_blank"
        >Language Squad</a
      >
    </li>
  </ul>

  <i18n-t keypath="about.github" tag="p">
    <template v-slot:on_github>
      <a
        href="https://github.com/Mutusen/language-quiz-vue"
        target="_blank"
        >{{ $t("about.githubLink") }}</a
      >
    </template>
  </i18n-t>


  <h2>{{ $t("about.support") }}</h2>
  <i18n-t keypath="about.supportText" tag="p">
    <template v-slot:paypal>
      <a
        href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=DBVWGAYLEVZ3N&amp;source=url"
        target="_blank"
        >{{ $t("about.supportTextPaypal") }}</a
      >
    </template>
  </i18n-t>
  <form action="https://www.paypal.com/donate" method="post" target="_top" class="has-text-centered mt-4">
    <input type="hidden" name="business" value="matmututu@gmail.com">
    <input type="hidden" name="currency_code" value="EUR">
    <input
      type="image"
      src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
      border="0"
      name="submit"
      title="PayPal - The safer, easier way to pay online!"
      alt="Donate with PayPal button"
    />
    <img
      alt=""
      border="0"
      src="https://www.paypal.com/en_FR/i/scr/pixel.gif"
      width="1"
      height="1"
    />
  </form>

  <h2>{{ $t("about.privacy") }}</h2>
  <p>{{ $t("about.privacyText") }}</p>
</template>
