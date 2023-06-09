<template>
    <q-page>
        <div class="posts">
            <div class="post-add justify-end" v-if="isLoggedIn">
                <q-btn icon="mdi-plus" flat class="spa-text-light" @click="addPost"/>
            </div>
            <div>
                <q-card v-for="post in posts" :key="post.id" class="post">
                    <div class="row">
                        <div class="col-12">
                            <p class="spa-title">{{ post.title }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <p class="spa-content-text">{{ post.body }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-2 post-written-by">
                            <p>Written by - {{ getAuthorName(post) }} </p>
                        </div>
                        <div class="col-10 post-actions spa-text-light justify-end" v-if="isLoggedIn">
                            <q-btn icon="mdi-magnify-plus-outline" size="md" flat @click="viewPost(post.id)"/>
                            <q-btn icon="mdi-pencil-outline" size="md" flat @click="editPost(post.id)"/>
                            <q-btn icon="mdi-trash-can-outline" size="md" @click="deletePost(post.id)" flat/>
                        </div>
                    </div>
                </q-card>
            </div>
        </div>

        <q-dialog v-model="postModal">
            <q-card class="post-details">
                <q-card-section>
                    <p class="spa-title q-ma-none">{{ getPostModalTitle() }}</p>
                </q-card-section>
                <q-separator class="q-pa-none"/>
                <q-card-section>
                    <div class="spa-post-title">
                        <q-editor v-if="isEdit || isCreate" placeholder="Title"
                                  v-model="post.title" :auto-grow="true"
                                  :toolbar="[]" class="spa-editor"/>
                        <p class="spa-title" v-else>{{ post.title }}</p>
                    </div>

                    <div class="spa-post-body">
                        <q-editor v-if="isEdit || isCreate"
                                  v-model="post.body" placeholder="Body"
                                  :toolbar="[]" class="spa-editor"/>
                        <p v-else>{{post.body}}</p>
                    </div>
                </q-card-section>

                <div class="q-card-actions-bottom">
                    <q-btn label="Close" @click="togglePostModal" flat class="spa-text-light" />
                    <q-btn label="Save" v-if="isEdit" @click="savePost" flat class="spa-text-light" />
                    <q-btn label="Create" v-if="isCreate" @click="createPost" flat class="spa-text-light" />
                </div>
            </q-card>
        </q-dialog>

    </q-page>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {RestService} from "src/services/rest.service";
import {mapGetters} from "vuex";

export default defineComponent({
    computed: {
        ...mapGetters(['isLoggedIn']),
    },

    data() {
        return {
            posts: [] as Post[],
            post: {} as Post,
            postModal: false,
            postId: 0,
            isEdit: false,
            isCreate: false
        };
    },
    mounted() {
        this.getPosts();
    },
    methods: {
        getAuthorName(post: Post) {
            const user = this.$store.getters.getUserById(post.userId);
            return user ? user.name : '';
        },

        getPostModalTitle() {
            if (this.isEdit) return 'Edit post'
            else if (this.isCreate) return 'Create post'
            else return 'View post'
        },

        async viewPost(id: number) {
            if (!id) return;
            try {
                this.post = await RestService.getPost(id)
            } catch (error) {
                console.error('Failed to fetch single post', error)
            }
            this.togglePostModal()
        },

        editPost(id: number) {
            this.isEdit = true
            this.viewPost(id)
        },

        addPost() {
            this.isCreate = true
            this.post = {body: '', title: ''} as Post
            this.togglePostModal()
        },

        async createPost() {
            try {
                await RestService.createPost(this.post)
                this.togglePostModal()
            } catch (error) {
                console.log('Error at creating post', error)
            }
        },

        togglePostModal() {
            this.postModal = !this.postModal;
            if (!this.postModal) {
                this.isEdit = false
                this.isCreate = false
            }
        },

        async savePost() {
            try {
                await RestService.updatePost(this.post)
                this.togglePostModal()
                await this.getPosts()
            } catch (error) {
                console.log('Failed to save post', error)
            }
        },

        async deletePost() {
            if (!this.post) return
            try {
                 await RestService.deletePost(this.post.id)
            } catch (error) {
                console.log('Failed to delete post', error)
            }
        },

        async getPosts() {
            this.posts = await this.$store.dispatch('fetchPosts');
        },
    },
});
</script>

<style scoped>

.post {
    padding: 10px;
    margin-bottom: 10px;
}

.post-actions {
    display: flex;
    margin-top: 10px;
}

.post-details {
    max-width: 90vw !important;
    max-height: 70vh !important;
    width: 90vw !important;
    height: 70vh !important;
    display: flex;
    flex-direction: column;
}

.post-add {
    display: flex;
    margin-bottom: 20px;
}

.spa-editor {
    height: auto !important;
    max-height: none !important;
}

.spa-post-title {
    margin-bottom: 10px;
}

.q-card-section {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.q-card-actions-bottom {
    margin-top: auto;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
}

.post-written-by {
    display: flex;
    align-items: flex-end;
    margin-top: 10px;
    font-size: 12px;
}

.post-written-by p{
    margin-bottom: 0;
}


</style>
