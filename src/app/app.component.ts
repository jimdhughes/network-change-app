import { Component, OnInit } from '@angular/core';
import { NetworkChangeService } from './services/network-change.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  changes: any[] = [];

  ngOnInit(): void {
    this.service.networkChange.subscribe(change => {
      this.changes.push(change);
    });
  }
  constructor(private service: NetworkChangeService) {}
}
