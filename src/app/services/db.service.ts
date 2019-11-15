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

  async getAllData() {
    const docs = await this.localDb.allDocs({ include_docs: true });
    return docs.rows.map(x => x.doc);
  }

  async deleteAll() {
    await this.localDb
      .allDocs({ include_docs: true })
      .then(allDocs => {
        return allDocs.rows.map(row => {
          return { _id: row.id, _rev: row.doc._rev, _deleted: true };
        });
      })
      .then(deleteDocs => {
        return this.localDb.bulkDocs(deleteDocs);
      });
  }
}
