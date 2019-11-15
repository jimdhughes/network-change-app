import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb/dist/pouchdb';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  localDb: PouchDB.Database = new PouchDB('network-db');
  constructor() {}

  async addUpdate(change: any) {
    await this.localDb.put({ _id: new Date().toUTCString(), ...change });
  }
}
