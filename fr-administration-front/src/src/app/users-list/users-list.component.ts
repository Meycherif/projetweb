import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-users-list',
  imports: [MatTableModule], 
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
    displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
    dataSource = [];

    constructor(
      private http: HttpClient
    ) { }

    ngOnInit() {
      const request: Observable<any> = this.http.get('http://localhost:3000/users', { observe: 'response' });
      lastValueFrom(request).then(response => this.dataSource = response.body);
    }

    

}


