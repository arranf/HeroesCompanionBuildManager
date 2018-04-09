<template>
  <div style="margin: 3em;">

    <div v-if="loading" style="height: 80vh;" class="d-flex align-items-center justify-content-center" >
       <div class="loader">
         <div id="largeBox"></div>
         <div id="smallBox"></div>
       </div>
    </div>
    <!-- hero, tagline, talents, source, description, url -->
    <b-form v-else @submit="onSubmit" @reset="onReset" >
      <b-form-group id="hero"
                    label="Hero"
                    label-for="hero">
        <b-form-select
                      :options="heroOptions"
                      required
                      v-model="hero">
        </b-form-select>
      </b-form-group>

      <div v-if="hero">
        <!-- Talents -->
        <template v-for="level in levels">
          <b-form-group :label="`Level ${level}`" :key="level">
            <b-form-radio-group :id="'radio_level_'+level" v-model="chosenTalents[level]" 
                :options="talentOptions(level)" :name="'radio_level_'+level" required>
            </b-form-radio-group>
          </b-form-group>
        </template>
      </div>

      <!-- tagline -->
      <b-form-group id="taglineGroup"
                    label="Tagline"
                    label-for="tagline"
                    description="A short description of the build.">
        <b-form-input id="tagline"
                      type="text"
                      v-model="tagline"
                      required>
        </b-form-input>
      </b-form-group>

      <!-- description -->
      <b-form-group id="descriptionGroup"
                    label="Description"
                    label-for="description">
        <b-form-textarea id="description"
                     v-model="description"
                     placeholder=""
                     :rows="3"
                     :max-rows="6">
        </b-form-textarea>
      </b-form-group>

      <b-form-group id="sourceGroup"
                    label="Source"
                    label-for="source"
                    description="Where the build was obtained from.">
        <b-form-input id="source"
                      type="text"
                      v-model="source"
                      required>
        </b-form-input>
      </b-form-group>
        

        <b-form-group id="urlGroup"
                    label="Url"
                    label-for="url"
                    description="If the build is from the internet, then provide a link.">
        <b-form-input id="url"
                      type="url"
                      v-model="url">
        </b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: 'home',
    components: { },
    data () {
      return {
        name: 'Create Build',
        heroes: [],
        hero: null,
        tagline: '',
        source: '',
        url: '',
        description: '',
        chosenTalents: {},
        levels: [1, 4, 7, 10, 13, 16, 20],
        loading: false
      }
    },
    methods: {
      ...mapActions(['fetchHeroes']),
      talentOptions (level) {
        return this.getTalentsByHeroIdAndLevel(this.hero, level).map(t => ({value: t.TalentTreeId, text: t.Name}))
      },
      onSubmit () {
        let build = {
          HeroId: this.hero,
          Tagline: this.tagline,
          Source: this.source,
          Talents: []
        }
        Object.keys(this.chosenTalents).forEach(function (key) {
          build.Talents.push(this.chosenTalents[key])
        })

        // VALIDATION

        this.$http.post('https://data.heroescompanion.com/v1/builds', build)
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.error(error)
          })
      },
      onReset () {}
    },
    computed: {
      ...mapGetters(['getHeroes', 'getTalentsByHeroIdAndLevel']),
      heroOptions () {
        if (this.getHeroes) {
          return this.getHeroes.map(h => ({value: h.HeroId, text: h.Name}))
        }
        return []
      }
    },
    created () {
      this.loading = true
      this.fetchHeroes()
        .then(() => { this.loading = false })
    }
  }
</script>


<style scoped >
body {
  background-color: #34495e;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  margin: 0;
}

.loader {
  width: 12em;
  height: 12em;
  animation: loaderAnim 1.25s infinite ease-in-out;
  outline: 1px solid transparent;
}
.loader #largeBox {
  height: 12em;
  width: 12em;
  background-color: #ECECEC;
  outline: 1px solid transparent;
  position: fixed;
}
.loader #smallBox {
  height: 12em;
  width: 12em;
  background-color: #34495e;
  position: fixed;
  z-index: 1;
  outline: 1px solid transparent;
  animation: smallBoxAnim 1.25s alternate infinite ease-in-out;
}

@keyframes smallBoxAnim {
  0% {
    transform: scale(0.2);
  }
  100% {
    transform: scale(0.75);
  }
}
@keyframes loaderAnim {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(90deg);
  }
}
</style>
