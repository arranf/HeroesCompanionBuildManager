<template>
  <div>
    <!-- hero, tagline, talents, source, description, url -->
    <b-form @submit="onSubmit" @reset="onReset" >
      <b-form-group id="hero"
                    label="Hero"
                    label-for="hero">
        <b-form-select
                      :options="heroes"
                      required
                      v-model="hero">
        </b-form-select>
      </b-form-group>

      <!-- Talents -->
      <!-- <v-for level in [1, 4, 7, 10, 13, 16, 20]>
        <b-form-group label="Using <code>options</code> array:">
           <b-form-radio-group id="radios1" v-model="selected" :options="options" name="radioOpenions">
           </b-form-radio-group>
        </b-form-group>
      </v-for> -->
      
      <!-- <b-form-group id="exampleInputGroup3"
                    label="Food:"
                    label-for="exampleInput3">
        <b-form-select id="exampleInput3"
                      :options="foods"
                      required
                      v-model="form.food">
        </b-form-select>
      </b-form-group> -->

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
                      v-model="url"
                      required>
        </b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
  export default {
    name: 'home',
    components: { },
    data () {
      return {
        name: 'Arran',
        heroes: [],
        hero: null,
        tagline: '',
        source: '',
        url: '',
        description: ''
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      onSubmit () {},
      onReset () {}
    }
  }
</script>