import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  private userSub!:Subscription;
  isAuthenticated=false;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.userSub=this.authService.user.subscribe((user:any)=>{
      this.isAuthenticated=!!user
      console.log(user);
      
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }

}
