import * as firebase from 'firebase';
import { v4 } from 'uuid';

export default class Database<Model> {
  constructor(private database: firebase.firestore.Firestore, private collectionName: string) {}

  get collection() {
    return this.database.collection(this.collectionName);
  }

  async get() {
    return this.collection.get();
  }

  add(dto: Model) {
    return this.collection.add({ ...dto, id: v4() });
  }
}
