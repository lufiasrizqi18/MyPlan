import firebase from 'firebase'
import "@firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyCis2S3bBEwdhNpWEdp_QEKYaxBgIo7njE",
    authDomain: "data-13b36.firebaseapp.com",
    databaseURL: "https://data-13b36-default-rtdb.firebaseio.com",
    projectId: "data-13b36",
    storageBucket: "data-13b36.appspot.com",
    messagingSenderId: "436844344145",
    appId: "1:436844344145:web:bed08f4e44144813ed1970"
};
class Fire {
    constructor(callback){
        this.init(callback)
         
}
init(callback) {
    if(!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);  
    }

firebase.auth().onAuthStateChanged(user => {
    if(user) {
        callback(null,user);
    }else{
        firebase
        .auth()
        .signInAnonymously()
        .catch(error => {
            callback(error);
        });
    }
    });
}
    getLists(callback) {
        let ref = this.ref.orderBy("name");


        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = []

            snapshot.forEach(doc => {
                lists.push({id: doc.id, ...doc.data()});
            })
            callback(lists);
        });
}

addList(list) {
    let ref = this.ref;

    ref.add(list);
}

updateList(list) {
    let ref = this.ref

    ref.doc(list.id).update(list)
}

get userId() {
    return firebase.auth().currentUser.uid
}


get ref() {
    return firebase
    .firestore()
    .collection("users")
    .doc(this.userId)
    .collection("lists");
}

detach() {
    this.unsubscribe()
}
}

export default Fire;
