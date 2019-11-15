import { Injectable, Output, EventEmitter } from '@angular/core';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkChangeService {
  connection: any;

  @Output()
  networkChange: EventEmitter<any> = new EventEmitter<any>();
  location: Coordinates;

  constructor(private db: DbService) {
    this.connection =
      navigator['connection'] || navigator['mozConnection'] || navigator['webkitConnection'];
    this.connection.addEventListener('change', () => this.handleNetworkChange());
    window.navigator.geolocation.watchPosition(coords => {
      this.location = coords.coords;
    });
  }

  async handleNetworkChange() {
    console.log('got network change');
    const id = new Date().toUTCString();
    const con = {
      _id: id,
      saveData: this.connection.saveData,
      effectiveType: this.connection.effectiveType,
      downlinkMax: this.connection.downlinkMax,
      downlink: this.connection.downlink,
      rtt: this.connection.rtt,
      type: this.connection.type,
      coords: {
        lat: this.location ? this.location.latitude : 0,
        lon: this.location ? this.location.longitude : 0
      }
    };
    await this.db.addUpdate(con);
    this.networkChange.next(con);
  }
}
