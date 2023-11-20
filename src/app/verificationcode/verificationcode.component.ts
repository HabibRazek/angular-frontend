import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verificationcode',
  templateUrl: './verificationcode.component.html',
  styleUrls: ['./verificationcode.component.css']
})
export class VerificationcodeComponent {
  
  verificationCode!: string; // Using ! to indicate it will be initialized later
  username!: string;
  constructor(private authService: AuthService, private  routerr : ActivatedRoute, private router: Router) {
    this.username=this.routerr.snapshot.paramMap.get('username')!;
    console.log(this.routerr.snapshot.paramMap.get('username'))
  }

  activateUser(username: string, verificationCode: string) {
    this.authService.activateUser(username, verificationCode).subscribe(
      (user) => {
        console.log('User activated successfully:', user);
        this.router.navigate(['/login']);
        // Handle success
      },
      (error) => {
        console.error('User activation failed:', error);
        // Handle error
      }
    );
  }

}