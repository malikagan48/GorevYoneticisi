<template>
    <ion-page>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button default-href="/lists" text="Geri"></ion-back-button>
            </ion-buttons>
            <ion-icon :icon="ellipsisVertical" slot="end" class="text-2xl"></ion-icon>
        </ion-toolbar>

        <ion-content class="overflow-auto">
            <div class="flex flex-col justify-center items-center mt-2">
                <div class="text-center">
                    <ion-icon :icon="book" size="large" class="text-pink-400"></ion-icon>
                </div>
                <div class="text-center">
                    <ion-card-title>Ders Görevleri</ion-card-title>
                </div>
            </div>
            <div>
                <ion-list>
                    <ion-list-header>
                        <ion-label class="text-yellow-600">Gelen Yapılacaklar <span class="text-gray-600 text-base">{{state.gelen.length}} tane</span></ion-label>
                    </ion-list-header>
                    <ion-item-sliding v-for="item in state.gelen" :key="item.id">
                        <ion-item-options side="start">
                            <ion-item-option @click="gorevSil(item)" color="danger" expandable>
                                <ion-icon :icon="trash" size="large"></ion-icon>
                            </ion-item-option>
                        </ion-item-options>
                        <ion-item detail="true">
                            <ion-label>
                                <h2>{{item.gorevAd}}</h2>
                                <p style="color:red">{{item.tarih}}</p>
                            </ion-label>
                        </ion-item>
                         <ion-item-options side="end">
                            <ion-item-option @click="gorevTamamla(item)" color="primary" expandable>
                                <ion-checkbox :checked="item.tamamlanma"></ion-checkbox>
                            </ion-item-option>
                        </ion-item-options>
                    </ion-item-sliding>
                </ion-list>

                <ion-list>
                    <ion-list-header>
                        <ion-label class="text-red-600">Bugün Yapılacaklar <span class="text-gray-600 text-base">{{state.bugun.length}} tane</span></ion-label>
                    </ion-list-header>
                    <ion-item-sliding v-for="item in state.bugun" :key="item.id">
                        <ion-item-options side="start">
                            <ion-item-option @click="gorevSil(item)" color="danger" expandable>
                                <ion-icon :icon="trash" size="large"></ion-icon>
                            </ion-item-option>
                        </ion-item-options>
                        <ion-item detail="true">
                            <ion-label>
                                <h2>{{item.gorevAd}}</h2>
                                <p style="color:red">{{item.tarih}}</p>
                            </ion-label>
                        </ion-item>
                         <ion-item-options side="end">
                            <ion-item-option @click="gorevTamamla(item)" color="primary" expandable>
                                <ion-checkbox :checked="item.tamamlanma"></ion-checkbox>
                            </ion-item-option>
                        </ion-item-options>
                    </ion-item-sliding>
                </ion-list>
                <ion-list>
                    <ion-list-header>
                        <ion-label class="text-green-600">Yapılanlar <span class="text-gray-600 text-base">{{state.yapilan.length}} tane</span></ion-label>
                    </ion-list-header>
                    <ion-item-sliding v-for="item in state.yapilan" :key="item.id">
                        <ion-item-options side="start">
                            <ion-item-option @click="gorevSil(item)" color="danger" expandable>
                                <ion-icon :icon="trash" size="large"></ion-icon>
                            </ion-item-option>
                        </ion-item-options>
                        <ion-item detail="true">
                            <ion-label class="done">
                                <h2>{{item.gorevAd}}</h2>
                                <p style="color:red">{{item.tarih}}</p>
                            </ion-label>
                        </ion-item>
                         <ion-item-options side="end">
                            <ion-item-option @click="gorevTamamlama(item)" color="primary" expandable>
                                <ion-checkbox :checked="item.tamamlanma"></ion-checkbox>
                            </ion-item-option>
                        </ion-item-options>
                    </ion-item-sliding>
                </ion-list>
                <ion-list>
                    <ion-list-header>
                        <ion-label class="text-gray-600">Geçen Yapılacaklar <span class="text-gray-600 text-base">{{state.gecen.length}} tane</span></ion-label>
                    </ion-list-header>
                    <ion-item-sliding v-for="item in state.gecen" :key="item.id">
                        <ion-item-options side="start">
                            <ion-item-option @click="gorevSil(item)" color="danger" expandable>
                                <ion-icon :icon="trash" size="large"></ion-icon>
                            </ion-item-option>
                        </ion-item-options>
                        <ion-item detail="true">
                            <ion-label>
                                <h2>{{item.gorevAd}}</h2>
                                <p style="color:red">{{item.tarih}}</p>
                            </ion-label>
                        </ion-item>
                         <ion-item-options side="end">
                            <ion-item-option @click="gorevTamamla(item)" color="primary" expandable>
                                <ion-checkbox :checked="item.tamamlanma"></ion-checkbox>
                            </ion-item-option>
                        </ion-item-options>
                    </ion-item-sliding>
                </ion-list>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent, reactive,onMounted } from 'vue'
import IonComp from '../shared/IonComp';
import {ellipsisVertical,book,trash} from 'ionicons/icons';
import {useStore} from 'vuex';

export default defineComponent({
    components:{
        ...IonComp
    },
    setup () {
        const store=useStore();
        const state: any=reactive({

            dersGorev:computed(()=>{
                return store.getters.kategoriyeGoreGorevGetir('Ders');
            }),
            gelen:computed(()=>{
                return store.getters.gelen(state.dersGorev);
            }),
            bugun:computed(()=>{
                return store.getters.bugun(state.dersGorev);
            }),
            yapilan:computed(()=>{
                return store.getters.yapilan(state.dersGorev);
            }),
            gecen:computed(()=>{
                return store.getters.gecen(state.dersGorev);
            }),
        })

        function gorevlerGetir(){
            store.commit('gorevlerGetir');
        }

        function gorevTamamla(item: any){
            store.commit('gorevTamamla',item);
        }

        function gorevTamamlama(item: any){
            store.commit('gorevTamamlama',item);
        }

        function gorevSil(item: any){
            store.commit('gorevSil',item);
        }

        onMounted(()=>{
            gorevlerGetir();
        })


        return {ellipsisVertical,book,trash,state,gorevTamamla,gorevTamamlama,gorevSil}
    }
})
</script>

<style scoped>
.done{
    text-decoration: line-through;
}
</style>