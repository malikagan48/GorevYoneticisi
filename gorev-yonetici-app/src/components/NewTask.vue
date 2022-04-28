<template>
    <ion-page>
        <div class="mt-2">
            <h2 class="text-center text-2xl font-semibold">Yeni Görev
            </h2>
        </div>

        <ion-fab vertical="top" horizontal="end" :slot="fixed" class="cursor-pointer" @click="$emit('close-modal')">
            <ion-icon :icon="close" class="text-3xl"></ion-icon>
        </ion-fab>

        <Form class="flex flex-col justify-center h-full" @submit="gorevEkle">
            <div>
                <ion-item>
                    <Field v-slot="{field}" name="gorevField" :rules="kontrolEt" v-model="gorev">
                        <ion-input v-bind="field" type="text" name="gorevField" placeholder="Yeni Göreviniz"></ion-input>
                    </Field>
                </ion-item>
                <ion-item lines="none">
                    <ErrorMessage v-slot="{message}" name="gorevField">
                        <ion-text color="danger" v-if="message">{{message}}</ion-text>
                    </ErrorMessage>
                </ion-item>
            </div>

            <div>
                <ion-item>
                    <ion-icon :icon="notifications" color="primary" slot="start"></ion-icon>
                    <Field v-slot="{field}" name="tarihField" :rules="kontrolEt">
                        <ion-datetime v-bind="field" v-model="tarih"
                        display-format="MMM DD, YYYY" display-timezone="utc" max="2030-12-31" value="2021-05-20" placeholder="Tarih Seçiniz" month-short-names="Ocak, Şubat, Mart, Nisan, Mayıs, Haziran, Temmuz, Ağustos, Eylül, Ekim, Kasım, Aralık">

                        </ion-datetime>
                    </Field>
                </ion-item>
                <ion-item lines="none">
                    <ErrorMessage v-slot="{message}" name="tarihField">
                        <ion-text color="danger" v-if="message">{{message}}</ion-text>
                    </ErrorMessage>
                </ion-item>

                <ion-item>
                    <ion-icon :icon="document" color="primary" slot="start"></ion-icon>
                    <ion-textarea v-model="aciklama" placeholder="Açıklama Giriniz"></ion-textarea>
                </ion-item>

                <ion-item>
                    <ion-icon :icon="grid" color="primary" slot="start"></ion-icon>
                    <ion-label>Kategori Seçiniz</ion-label>
                    <Field v-model="kategori" :rules="kontrolEt" v-slot="{field}" name="kategoriField">
                        <ion-select v-bind="field" placeholder="Lütfen Kategori Seçiniz">
                            <ion-select-option value="İş">İş</ion-select-option>
                            <ion-select-option value="Müzik">Müzik</ion-select-option>
                            <ion-select-option value="Yolculuk">Yolculuk</ion-select-option>
                            <ion-select-option value="Ders">Ders</ion-select-option>
                            <ion-select-option value="Alışveriş">Alışveriş</ion-select-option>
                            <ion-select-option value="Spor">Spor</ion-select-option>
                        </ion-select>
                    </Field>
                </ion-item>

                <ion-item lines="none">
                    <ErrorMessage v-slot="{message}" name="kategoriField">
                        <ion-text color="danger" v-if="message">{{message}}</ion-text>
                    </ErrorMessage>
                </ion-item>
            </div>

            <div class="mt-8">
                <ion-button expand="block" type="submit" color="success">Oluştur</ion-button>
            </div>
        </Form>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
import IonComp from '../shared/IonComp';
import {close,notifications,grid,document} from 'ionicons/icons';

import {Form,Field,ErrorMessage} from 'vee-validate';
import db from '@/firebase/config';

export default defineComponent({
    components:{
        ...IonComp,Form,Field,ErrorMessage
    },
    setup (props,context) {

        const gorev=ref('');
        const tarih=ref('');
        const aciklama=ref('');
        const kategori=ref('');
        const kontrolEt=(value: any)=>{
            if(!value){
                return "Bu alan zorunludur"
            }
            return true
        }

        const gorevEkle=()=>{
            //console.log(gorev.value,tarih.value,aciklama.value,kategori.value);
            
            db.collection('gorevler').doc('8lpaaUgcgoNwtVJicu9k').collection('isler').add({
                name:'iş ad'
            })

            db.collection('gorevler').add({
                gorevAd:gorev.value,
                aciklama:aciklama.value,
                tarih:tarih.value,
                kategori:kategori.value,
                tamamlanma:false
            }).then(()=>{
                gorev.value='';
                aciklama.value='';
                tarih.value='';
                kategori.value='';

                context.emit('close-modal');
                console.log('görev eklendi');
                
            }).catch((error)=>{
                console.log('hata oluştu:',error);
                
            })
            
            
        }
        

        return {close,kontrolEt,gorev,notifications,grid,document,gorevEkle,tarih,aciklama,kategori}
    }
})
</script>

<style scoped>

</style>