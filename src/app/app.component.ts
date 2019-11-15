import { Component, OnInit } from '@angular/core';
import { NetworkChangeService } from './services/network-change.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs';
import { DbService } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns = ['Date', 'EffectiveType', 'DL', 'RTT', 'Coords'];
  dataSource: ChangesDataSource = new ChangesDataSource();
  changes: any[] = [];
  ngOnInit(): void {
    this.loadData();
    this.service.networkChange.subscribe(change => {
      this.changes.push(change);
      this.dataSource.subject.next(this.changes);
    });
  }

  async loadData() {
    const data = await this.db.getAllData();
    this.changes = [...this.changes, ...data];
    this.dataSource.subject.next(this.changes);
  }

  async onDelete() {
    await this.db.deleteAll();
    this.changes = [];
    this.dataSource.subject.next(this.changes);
    this.loadData();
  }
  constructor(private service: NetworkChangeService, private db: DbService) {}
}

class ChangesDataSource implements DataSource<any> {
  subject = new BehaviorSubject<any[]>([]);

  connect(
    collectionViewer: import('@angular/cdk/collections').CollectionViewer
  ): import('rxjs').Observable<any[] | readonly any[]> {
    return this.subject.asObservable();
  }
  disconnect(collectionViewer: import('@angular/cdk/collections').CollectionViewer): void {
    this.subject.complete();
  }
}
