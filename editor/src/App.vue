<template>
  <v-app fill-height>
    <v-snackbar
      v-model="snackbar.active"
      color="success"
      :timeout="2000"
      >
      <span><v-icon dark left>check</v-icon>{{ snackbar.text }}</span>
    </v-snackbar>
    <v-app-bar
    scroll-off-screen
    dense app
    color="primary"
    class="octocat-padding"
    >
    <v-app-bar-nav-icon
    class="hidden-md-and-up"
    @click="showNavdrawer = !showNavdrawer"
    ></v-app-bar-nav-icon>
      <a href="https://github.com/anoff/devradar" class="github-corner" aria-label="View source on GitHub" target="_blank"><svg width="80" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: fixed; top: 0; border: 0; right: 0; z-index: 999" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a>
      <v-toolbar-title>
        <img src="devradar-b.svg"
        v-bind:class="{ 'invert-image': darkMode }"
        width="140rem">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="hidden-xs-only">
        <span class="radar-title">{{ meta.title }} </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text
        v-for="elm in getNavEntries()"
        v-bind:key="elm.title"
        v-bind:href="elm.url"
        target="_blank"
        >
          <v-icon left>{{elm.icon}}</v-icon>
          <span class="hidden-md-only">{{elm.title}}</span>
        </v-btn>
        <v-btn text
        v-for="elm in getMenuItems('toolbar')"
        v-bind:key="elm.title"
        router
        v-bind:to="elm.rootPath"
        >
          <v-icon left>{{elm.icon}}</v-icon>
          <span class="hidden-md-only">{{elm.title}}</span>
        </v-btn>
        <v-menu bottom left
        v-if="getMenuItems('toolbar-menu').length">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon :dark="darkMode"
              v-bind="attrs"
              v-on="on">
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="elm in getMenuItems('toolbar-menu')" v-bind:key="elm.title" v-bind:to="elm.rootPath" router>
              <v-list-item-title>
                <v-icon left>{{elm.icon}}</v-icon>
                {{ elm.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
    
      <v-navigation-drawer
        v-model="showNavdrawer"
        app temporary
        :dark="darkMode"
      >
        <v-list>
          <v-list-item v-for="elm in getNavEntries()"
            v-bind:key="elm.title"
            v-bind:href="elm.url"
            target="_blank">
            <v-list-item-action>
              <v-icon left>{{elm.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ elm.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-for="elm in (getMenuItems('toolbar').concat(getMenuItems('toolbar-menu')))" v-bind:key="elm.title" v-bind:to="elm.rootPath" router>
            <v-list-item-action>
              <v-icon left>{{elm.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ elm.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-content>
      <v-dialog
        v-model="isLoading"
        hide-overlay
        persistent
        width="300"
      >
        <v-card
          color="primary"
          dark
        >
          <v-card-text>
            Loading radar..
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
  <cookie-law theme="devradar">
    <div slot="message">
      This website uses cookies to ensure you get the best experience on our website. <a href="https://www.cookiesandyou.com/" target="_blank">Learn more</a>
    </div>
  </cookie-law>
  <v-footer :dark="darkMode" >
    <v-col
      class="text-center"
      cols="12"
    >
    <span v-for="elm in footerEntries" v-bind:key="elm.text"
      class="entry" color="accent">
      <a v-if="elm.link" :href="elm.link" target="_blank">{{ elm.text }}</a>
      <span v-else>{{ elm.text }}</span>
    </span>
    </v-col>
  </v-footer>
  </v-app>
</template>

<script lang="ts">
import lzs from 'lz-string'
import copy from 'clipboard-copy'
import CookieLaw from 'vue-cookie-law'
import { Component, Vue } from 'vue-property-decorator'
import { Blip, Meta } from '@/types/domain'
import appConfig from './config'

@Component({
  computed: {
    isLoading () {
      return this.$store.getters['blips/isLoading']
    },
    meta () {
      return this.$store.getters['blips/meta']
    },
    blips () {
      return this.$store.getters['blips/blipsClean']
    },
    snackbar () {
      return this.$store.getters['comm/snackbar']
    }
  },
  components: { CookieLaw }
})
export default class App extends Vue {
  showNavdrawer: boolean = false
  darkMode: boolean = appConfig.theme.dark
  footerEntries: object[] = appConfig.footer
  // computed
  isLoading: boolean
  meta: Meta
  blips: Blip[]
  snackbar: {
    active: boolean;
    text: string;
  };

  public getMenuItems (location) {
    const user = this.$store.getters['user/user'] || {}
    const items = appConfig.routes
    return items
      .filter(i => i.validator(user))
      .filter(i => i.location.indexOf(location) > -1)
  }

  public getNavEntries () {
    const user = this.$store.getters['user/user'] || {}
    const items = appConfig.navEntries
    return items
      .filter(i => i.validator(user))
  }

  public copyURL () {
    const obj = {
      meta: this.meta,
      blips: this.blips
    }
    const string = JSON.stringify(obj)
    const contentEncoded = lzs.compressToEncodedURIComponent(string)
    const b = window.location.origin + '/#/?load=' + contentEncoded
    const success = copy(b)
    if (success) {
      this.$store.dispatch('comm/showSnackbar', 'URL copied to clipboard')
    } else {
      console.error(success)
    }
  }
}
</script>

<style lang="scss">
nav.v-toolbar {
  z-index: 10;
  padding-right: 3rem !important;
}
#progressContainer {
  min-height: 20px;
}
.progress-linear {
  margin: 0;
}
.github-corner:hover .octo-arm{
  animation:octocat-wave 560ms ease-in-out
}
@keyframes octocat-wave{
  0%,100%{transform:rotate(0)}
  20%,60%{transform:rotate(-25deg)}
  40%,80%{transform:rotate(10deg)}
}
@media (max-width:500px){
  .github-corner:hover .octo-arm{animation:none}
  .github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}
}
span.radar-title {
  font-style: italic;
  padding-right: 0.2rem;
}
.invert-image {
  filter: invert(1);
}

footer .entry:after {
  text-align : center;
  margin : 0 1rem;
  content: "—";
}
footer .entry:last-child:after {
  content: "";
}
.octocat-padding {
  padding-right: 80px;
}
// cookie consent component
.Cookie--devradar {
  background: #0ddd0d;
  color: #000;
  padding: 1rem;
  font-size: 1.4rem;
  min-height: 6rem;
}
.Cookie--devradar a {
  color: #000;
}
.Cookie--devradar .Cookie__button {
  background: #000;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0;
  border: 0;
  font-size: 1em;
  font-weight: bold;
}
.Cookie--devradar div.Cookie__button:hover {
  background: darken(#000, 10%);
}
</style>
