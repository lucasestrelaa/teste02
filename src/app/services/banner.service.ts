import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
 
@Injectable({
  providedIn: 'root'
})
export class BannerService {
  
  constructor(private ada: AngularFirestoreDocument) { }
}
