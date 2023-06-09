<template>
    <q-page>
        <div class="spa-posts">
            <div class="spa-post-add justify-end" v-if="isLoggedIn">
                <q-btn icon="mdi-plus" flat class="spa-text-light" @click="addPost"/>
            </div>
            <div>
                <q-table grid
                         :data="posts"
                         :columns="columns"
                         colu
                         :rows-per-page-options="[3, 5, 10, 15, 30, 50]"
                         hide-header>

                    <template v-slot:item="props">
                        <div class="q-pa-xs col-12 grid-style-transition">
                            <q-card class="spa-post">
                                <div class="full-width">
                                    <p class="spa-title">{{ props.row.title }}</p>
                                </div>
                                <div class="full-width">
                                    <p class="spa-content-text">{{ props.row.body }}</p>
                                </div>
                                <div class="full-width post-written-by">
                                    <p>Written by - {{ getAuthorName(props.row) }} </p>
                                </div>
                                <div class="full-width spa-post-actions spa-text-light justify-end" v-if="isLoggedIn">
                                    <q-btn icon="mdi-magnify-plus-outline" size="md" flat @click="viewPost(props.row.id)"/>
                                    <q-btn icon="mdi-pencil-outline" size="md" flat @click="editPost(props.row.id)"/>
                                    <q-btn icon="mdi-trash-can-outline" size="md" @click="deletePostPressed(props.row)" flat/>
                                </div>
                            </q-card>
                        </div>
                    </template>

                </q-table>
            </div>
        </div>

        <q-dialog v-model="postModal">
            <q-card class="spa-post-details">
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

        <q-dialog v-model="deleteModal">
            <q-card class="spa-delete-modal">
                <q-card-section>
                    <p class="spa-title q-ma-none">Are you sure you want to delete?</p>
                </q-card-section>
                <q-separator class="q-pa-none"/>
                <q-card-section>
                    <p class="q-ma-none">Delete post - {{ post.title }}</p>
                </q-card-section>

                <div class="q-card-actions-bottom">
                    <q-btn label="Close" @click="toggleDeleteModal" flat class="spa-text-light" />
                    <q-btn label="Delete" @click="deletePost" flat class="spa-text-light" />
                </div>
            </q-card>
        </q-dialog>

    </q-page>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {RestService} from "src/services/rest.service";
import {mapGetters} from "vuex";
import {Notify} from "quasar";

const columns = [
        { name: 'title', field: 'title' },
        { name: 'body', field: 'body' },
        { name: 'actions', field: 'actions' }
];

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
            isCreate: false,
            columns: columns,
            deleteModal: false
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
                Notify.create({
                    color: 'secondary',
                    textColor: 'white',
                    message: 'Successfully saved post',
                    position: 'bottom-right'
                })
                await this.getPosts()
            } catch (error) {
                console.log('Failed to save post', error)
            }
        },

        async deletePost() {
            if (!this.post) return
            try {
                await RestService.deletePost(this.post.id)
                this.toggleDeleteModal()
                Notify.create({
                    color: 'secondary',
                    textColor: 'white',
                    message: 'Successfully deleted',
                    position: 'bottom-right'
                })
            } catch (error) {
                console.log('Failed to delete post', error)
            }
        },

        async getPosts() {
            this.$q.loading.show()
            this.posts = await this.$store.dispatch('fetchPosts');
            this.$q.loading.hide()
        },

        deletePostPressed(post: Post) {
            this.post = post
            this.toggleDeleteModal()
        },

        toggleDeleteModal() {
            this.deleteModal = !this.deleteModal
        }
    },
});
</script>

<style scoped>

.spa-post {
    padding: 10px;
    margin-bottom: 10px;
}

.spa-post-actions {
    display: flex;
    margin-top: 10px;
}

.spa-post-details {
    max-width: 90vw !important;
    max-height: 70vh !important;
    width: 90vw !important;
    height: 70vh !important;
    display: flex;
    flex-direction: column;
}

.spa-post-add {
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
