import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  private userSub!:Subscription;
  isAuthenticated=false;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.userSub=this.authService.user.subscribe(user=>{
      this.isAuthenticated=!!user
      console.log(user);
      
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

}
