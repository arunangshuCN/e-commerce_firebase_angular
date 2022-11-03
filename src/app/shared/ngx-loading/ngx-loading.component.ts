import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngx-loading',
  templateUrl: './ngx-loading.component.html',
  styleUrls: ['./ngx-loading.component.css']
})
export class NgxLoadingComponent implements OnInit {

  public loading = false;
  constructor() { }

  ngOnInit(): void {
  }

}
