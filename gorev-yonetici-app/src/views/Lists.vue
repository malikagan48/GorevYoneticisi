<template>
    <ion-page>
        <div class="flex w-full flex-col overflow-auto">
            <div class="mt-2">
                <h1 class="text-4xl pl-5 font-semibold">Görev Listesi</h1>
            </div>
            <div class="flex w-full flex-row flex-wrap justify-around mt-2">
                <ion-card class="w-3/5">
                    <router-link :to="{name:'All'}">
                    <ion-card-header class="text-center">
                        <ion-icon :icon="clipboard" class="text-blue-500" size="large"></ion-icon>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-card-title class="text-2xl">Bütün Görevler</ion-card-title>
                        <ion-card-subtitle>
                            {{state.butunGorevlerSayisi}} tane görev var
                        </ion-card-subtitle>
                    </ion-card-content>
                    </router-link>
                </ion-card>

                <ion-card class="w-2/5">
                <router-link :to="{name:'Work'}">
                    <ion-card-header class="text-center">
                        <ion-icon :icon="briefcase" class="text-yellow-600" size="large"></ion-icon>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-card-title class="text-2xl">İş</ion-card-title>
                        <ion-card-subtitle>
                            {{state.kategoriGorevlerSayisi('İş')}} tane görev var
                        </ion-card-subtitle>
                    </ion-card-content>
                </router-link>
                </ion-card>

                 <ion-card class="w-2/5">
                 <router-link :to="{name:'Music'}">
                    <ion-card-header class="text-center">
                        <ion-icon :icon="headset" class="text-red-400" size="large"></ion-icon>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-card-title class="text-2xl">Müzik</ion-card-title>
                        <ion-card-subtitle>
                            {{state.kategoriGorevlerSayisi('Müzik')}} tane görev var
                        </ion-card-subtitle>
                    </ion-card-content>
                 </router-link>
                </ion-card>

                <ion-card class="w-2/5">
                <router-link :to="{name:'Travel'}">
                    <ion-card-header class="text-center">
                        <ion-icon :icon="airplane" class="text-green-600" size="large"></ion-icon>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-card-title class="text-2xl">Yolculuk</ion-card-title>
                        <ion-card-subtitle>
                            {{state.kategoriGorevlerSayisi('Yolculuk')}} tane görev var
                        </ion-card-subtitle>
                    </ion-card-content>
                </router-link>
                </ion-card>

                 <ion-card class="w-2/5">
                 <router-link :to="{name:'Study'}">
                    <ion-card-header class="text-center">
                        <ion-icon :icon="book" class="text-pink-400" size="large"></ion-icon>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-card-title class="text-2xl">Ders</ion-card-title>
                        <ion-card-subtitle>
                            {{state.kategoriGorevlerSayisi('Ders')}} tane görev var
                        </ion-card-subtitle>
                    </ion-card-content>
                 </router-link>
                </ion-card>

                <ion-card class="w-2/5">
                <router-link :to="{name:'Sport'}">
                    <ion-card-header class="text-center">
                        <ion-icon :icon="footballSharp" class="text-purple-400" size="large"></ion-icon>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-card-title class="text-2xl">Spor</ion-card-title>
                        <ion-card-subtitle>
                            {{state.kategoriGorevlerSayisi('Spor')}} tane görev var
                        </ion-card-subtitle>
                    </ion-card-content>
                </router-link>
                </ion-card>

                 <ion-card class="w-2/5">
                 <router-link :to="{name:'Shopping'}">
                    <ion-card-header class="text-center">
                        <ion-icon :icon="cardOutline" class="text-yellow-400" size="large"></ion-icon>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-card-title class="text-2xl">Alışveriş</ion-card-title>
                        <ion-card-subtitle>
                            {{state.kategoriGorevlerSayisi('Alışveriş')}} tane görev var
                        </ion-card-subtitle>
                    </ion-card-content>
                 </router-link>
                </ion-card>
            </div>

            <div>
                <ion-fab @click="modalKontrol=true" vertical="bottom" horizontal="end" :slot="fixed">
                    <ion-fab-button>
                        <ion-icon :icon="add"> </ion-icon>
                    </ion-fab-button>
                </ion-fab>

                <ion-modal :is-open="modalKontrol" :backdrop-dismiss="false">
                    <NewTask @closeModal="modalKontrol=false" />
                </ion-modal>
            </div>
            
        </div>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent,ref,reactive, computed, onMounted } from 'vue'
import IonComp from '../shared/IonComp';
import {clipboard,briefcase,headset,airplane,book,footballSharp,cardOutline,add} from 'ionicons/icons';
import {useStore} from 'vuex';

import NewTask from '@/components/NewTask.vue';


export default defineComponent({
    components:{
        ...IonComp,NewTask
    },
    setup () {

        const store=useStore();
        const state=reactive({
            butunGorevlerSayisi:computed(()=>{
                return store.state.gorevler.length;
            }),

            kategoriGorevlerSayisi:(item: any)=>{
                return store.getters.kategoriyeGoreToplamGorevSayisiGetir(item)
            }
        })

        function gorevlerGetir(){
            store.commit('gorevlerGetir');
        }
        onMounted(()=>{
                gorevlerGetir()
        })
        
        const modalKontrol=ref(false);
        return {clipboard,briefcase,headset,airplane,book,footballSharp,cardOutline,add,modalKontrol,store,state}
    }
})
</script>

<style scoped>

</style>