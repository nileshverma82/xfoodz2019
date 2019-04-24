import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
// rxjs imports
import { BehaviorSubject, Observable } from 'rxjs';
// local imports
import { ChatMessage, ChatRoomInfo } from '../core/models';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';





const APP_ROOT_COLLECTIONS = {
  PRODUCTS: 'products',
  USERS: 'appusers',
  CHATS: 'appchats',
};


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private appUserPath: string;
  private chatroomPath: string;
  private chatMessages: Observable<ChatMessage[]>;
  private chatRoomRef: AngularFirestoreCollection<ChatMessage>;
  FooditemID$: BehaviorSubject<string>;
  chatMessages$: BehaviorSubject<ChatMessage[]>;
  


  roomID$: BehaviorSubject<any>;

  ccc: any;

  currentChatPath: any;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
  ) {
    // afs.firestore.settings({ timestampsInSnapshots: true });
    this.FooditemID$ = new BehaviorSubject(null);

    this.appUserPath = APP_ROOT_COLLECTIONS.USERS;
    this.chatroomPath = APP_ROOT_COLLECTIONS.CHATS;

    this.chatRoomRef = this.createFirestoreCollectionRef(APP_ROOT_COLLECTIONS.CHATS);

  }

  createFirestoreCollectionRef(collectionPath: string): AngularFirestoreCollection<any> {
    return this.afs.collection<any>(collectionPath);
  }

  getFirebaseDocumentKey(): string {
    return this.afs.createId();
  }

  get serverTimestampFromFirestore() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  async createChatMessages( message: ChatMessage, roomID: string) {
    const batch = this.afs.firestore.batch();
    message.msgCreatedAt = this.serverTimestampFromFirestore;
    const roomRef = this.afs.firestore.collection(APP_ROOT_COLLECTIONS.CHATS).doc(roomID).collection('conversation').doc();
    batch.set(roomRef, message);
    batch.set(this.afs.firestore.collection('checkout').doc(roomID), { isRead: false }, { merge: true });
    batch.commit();


  }

  getChatRoomMetaData(sellerID: string): Observable<any> {
    return this.afs.collection<any>
      ('appchats', ref => ref.where('sellerID', '==', sellerID))
      .valueChanges();
  }

  getChatRoomMessages(chatRoomID: any): Observable<ChatMessage[]> {
    this.chatRoomRef.valueChanges().subscribe(docs => {
    });
    // Stored the roomID for further reference
    this.roomID$ = chatRoomID;

    return this.chatRoomRef.
      doc(chatRoomID).
      collection<ChatMessage>('conversation', ref => ref.orderBy('msgCreatedAt')).
      valueChanges();
  }


  removeRoom(chatroom: ChatMessage): Promise<any> {
    const roomPath = `${this.chatroomPath}/${chatroom.createdByUserId}`;
    return this.afs.doc<ChatMessage>(roomPath).delete();
  }

}
  // getRoomID(fooditem: Fooditem): Observable<any[]> {
  //   const fooditemId = fooditem.id;
  //   return this.afs.collection<any>('appchats', ref => ref.where('fooditemID', '==', fooditemId)).valueChanges();
  // }

  // getSellerMessages(fooditem: Fooditem): Observable < any > {
  //  const sellerId = fooditem.createdBy;
  //  const fooditemId = fooditem.id;
  //   console.log('seller id from Chatservice', sellerId);

  //   return this.afs.collection<any>('appchats').valueChanges().pipe(
  //     flatMap(res => res),
  //     filter(item => item.fooditemID === fooditemId),
  //     switchMap(s => {
  //       console.log('seller filtered data', s);
  //       this.currentChatPath = `${s.roomID}`;
  //       console.log('this.currentChatPath: ', this.currentChatPath);
  //       this.roomID$ = this.currentChatPath;
  //       return this.chatRoomRef.doc(s.roomID).collection('conversation', ref => ref.orderBy('msgCreatedAt')).valueChanges();
  //     }
  //     )
  //   );
  // }


