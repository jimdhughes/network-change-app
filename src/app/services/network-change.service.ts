import { Injectable, Output, EventEmitter } from '@angular/core';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkChangeService {
  connection: any;

  @Output()
  networkChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private db: DbService) {
    this.connection =
      navigator['connection'] || navigator['mozConnection'] || navigator['webkitConnection'];
    this.connection.addEventListener('change', this.handleNetworkChange.bind(this));
    this.handleNetworkChange();
  }

  log(x: string) {
    console.log(x);
  }

  async handleNetworkChange() {
    const con = {
      saveData: this.connection.saveData,
      effectiveType: this.connection.effectiveType,
      downlinkMax: this.connection.downlinkMax,
      downlink: this.connection.downlink,
      rtt: this.connection.rtt,
      type: this.connection.type
    };
    window.navigator.geolocation.getCurrentPosition(async coords => {
      await this.db.addUpdate({
        ...con,
        coords: {
          lat: coords.coords.latitude,
          lon: coords.coords.longitude,
          accuracy: coords.coords.accuracy
        }
      });
      this.networkChange.next({
        ...con,
        coords: {
          lat: coords.coords.latitude,
          lon: coords.coords.longitude,
          accuracy: coords.coords.accuracy
        }
      });
    });
  }
}
