import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatMessage } from '../core/models';

const APP_ROOT_COLLECTIONS = {
  PRODUCTS: 'products',
  USERS: 'appusers',
  CHATS: 'appchats',
};


@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private chatroomPath: string;
  private chatRoomRef: AngularFirestoreCollection<ChatMessage>;
  FooditemID$: BehaviorSubject<string>;
  chatMessages$: BehaviorSubject<ChatMessage[]>;
  roomID$: BehaviorSubject<any>;
  currentChatPath: any;

  constructor(
    private afs: AngularFirestore
  ) {
    // afs.firestore.settings({ timestampsInSnapshots: true });
    this.FooditemID$ = new BehaviorSubject(null);
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

  async createChatMessages(message: ChatMessage, roomID: string) {
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
