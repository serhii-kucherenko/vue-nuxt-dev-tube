<template>
    <div>
        <div class="container center">
            <br><br>
            <div class="row">
                <div class="input-field col s12 m6">
                    <input 
                        type="text" 
                        v-model="query" 
                        @keyup.enter="find"
                    >
                    <label for="find-video">Type Video Title</label>
                </div>                
                 <div class="input-field col s12 m6">
                    <select v-model="amount">
                        <option value="" disabled selected>Max results amount</option>
                        <option :value="10">10</option>
                        <option :value="30">30</option>
                        <option :value="50">50</option>
                        <option :value="80">80</option>
                        <option :value="100">100</option>
                        <option :value="150">150</option>
                        <option :value="200">200</option>
                    </select>
                </div>
                <div class="col s12 m12 center">
                    <a @click="find" class="waves-effect waves-light btn-large">
                        <i class="material-icons right">search</i>Search
                    </a>
                </div>
            </div>
            <div class="row hide-on-small-only videos">
                <transition-group name="zoom" mode="in-out">
                    <div v-show="!loading" @click="$router.push(`/profile/videos/${video.id}`)" class="col s12" v-for="(video, index) in videos" :key="`${video}-${index}`">
                        <div class="card small horizontal">
                            <div class="card-image">
                                <img :src="video.thumbnails.high.url">
                            </div>
                            <div class="card-stacked">
                                <div class="card-content">
                                <p>
                                    <b>{{ video.title }}</b>
                                    <br/> 
                                    {{ video.description }}
                                </p>
                                </div>
                                <div class="card-action">
                                    <a @click.stop :href="`https://www.youtube.com/watch?v=${video.id}`" target="_blank">Watch on Youtube</a>
                                    <nuxt-link :to="`/videos/${video.id}`">Learn Now</nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition-group>
            </div>
            <div class="row show-on-small hide-on-med-and-up videos">
                <transition-group name="zoom" mode="in-out">
                    <div v-show="!loading" @click="$router.push(`/profile/videos/${video.id}`)" class="col s12" v-for="(video, index) in videos" :key="`${video}-${index}`">
                        <div class="card big">
                            <div class="card-image">
                                <img :src="video.thumbnails.high.url">
                            </div>
                            <div class="card-stacked">
                                <div class="card-content">
                                <p>
                                    <b>{{ video.title }}</b>
                                    <br/> 
                                    {{ video.description }}
                                </p>
                                </div>
                                <div class="card-action">
                                    <a @click.stop :href="`https://www.youtube.com/watch?v=${video.id}`" target="_blank">Watch on Youtube</a>
                                    <nuxt-link :to="`/videos/${video.id}`">Learn Now</nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      query: "",
      amount: 1
    };
  },
  mounted() {
    $("select").formSelect();
  },
  computed: {
    ...mapState(["videos", "loading"])
  },
  methods: {
    ...mapActions(["findVideos"]),
    find() {
      this.findVideos({ query: this.query, amount: this.amount });
    }
  }
};
</script>

<style lang="scss" scoped>
.videos {
  padding-bottom: 70px;

  & .col {
    cursor: pointer;
  }
}
</style>