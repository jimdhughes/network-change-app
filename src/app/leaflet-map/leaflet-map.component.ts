import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng } from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit {
  options = {
    layers: [tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')],
    zoom: 12,
    center: latLng(53.631611, -113.323975)
  };
  constructor() {}

  ngOnInit() {
    window.resizeTo(window.innerWidth, window.innerHeight);
  }

  onAddPin() {}
}
