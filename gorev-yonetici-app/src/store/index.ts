import {createStore} from 'vuex';
import db from '@/firebase/config';

const store=createStore({
    state:{
        gorevler:Array<any>(),
        bugunMu:(tarih: any)=>{

            const simdikiTarih=new Date();

            return tarih.getDate()==simdikiTarih.getDate() && tarih.getMonth()==simdikiTarih.getMonth() && tarih.getFullYear()==simdikiTarih.getFullYear()
        }
    },
    getters:{
        gelen:(state)=>{
            return (gelenGorev: Array<any>)=>gelenGorev.filter((item: any)=>{
                return new Date(item.tarih).getTime()>new Date().getTime() && item.tamamlanma==false
            })
        },
        bugun:(state)=>{
            return (bugunGorev: Array<any>)=>bugunGorev.filter((item: any)=>{
                return state.bugunMu(new Date(item.tarih)) && item.tamamlanma==false
            })
        },
        yapilan:(state)=>{
            return (yapilanGorev: Array<any>)=>yapilanGorev.filter((item: any)=>{
                return item.tamamlanma==true
            })
        },
        gecen:(state)=>{
            return (gecenGorev: Array<any>)=>gecenGorev.filter((item: any)=>{
                return new Date(item.tarih).getTime()<new Date().getTime() && state.bugunMu(new Date(item.tarih))==false && item.tamamlanma==false
            })
        },
        kategoriyeGoreGorevGetir:(state)=>{
            return (kategori: any)=>state.gorevler.filter((item: any)=>{
                return item.kategori==kategori;
            })
        },
        kategoriyeGoreToplamGorevSayisiGetir:(state)=>{
            return (kategori: any)=>state.gorevler.filter((item: any)=>{
                return item.kategori==kategori;
            }).length;
        }

    },
    mutations:{
        gorevlerGetir:(state)=>{
            state.gorevler=[];

            db.collection('gorevler').onSnapshot((snap: any)=>{
                state.gorevler=[];

                snap.forEach((doc: any)=>{
                    state.gorevler.push({
                        id:doc.id,
                        gorevAd:doc.data().gorevAd,
                        aciklama:doc.data().aciklama,
                        kategori:doc.data().kategori,
                        tarih:new Date(doc.data().tarih).toLocaleDateString('en-TR'),
                        tamamlanma:doc.data().tamamlanma

                    })

                    console.log(doc.id , "=>" ,doc.data());
                    
                })
            })
        },
        gorevTamamla:(state,payload: any)=>{

            if(payload.tamamlanma==false){
                db.collection('gorevler').doc(payload.id).update({
                    tamamlanma:true
                }).then(()=>{
                    console.log('görev tamamlandı');
                }).catch((err)=>{
                    console.log('bir hata oluştu görev tamamlanmadı');
                    
                })
            }
        },
        gorevTamamlama:(state,payload: any)=>{

            if(payload.tamamlanma==true){
                db.collection('gorevler').doc(payload.id).update({
                    tamamlanma:false
                }).then(()=>{
                    console.log('görev tamamlanmadı');
                }).catch((err)=>{
                    console.log('bir hata oluştu');
                    
                })
            }
        },
        gorevSil:(state,payload: any)=>{
            db.collection('gorevler').doc(payload.id).delete().then(()=>{
                console.log('görev silindi');
                
            })
        }

    }
});

export default store;