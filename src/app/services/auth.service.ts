import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from 'src/model/role.model';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private helper = new JwtHelperService();

  apiURL: string = 'http://localhost:8081/users';
  token!:string;

  public  loggedUser!:string;
  public isloggedIn: Boolean = false;
  public roles!:string[];

  constructor(private router: Router , private http : HttpClient) {}

  login(user : User)
  {
  return this.http.post<User>(this.apiURL+'/login', user , {observe:'response'});
  }


  saveToken(jwt:string){
    localStorage.setItem('jwt',jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
}

getToken():string {
  return this.token;
}

decodeJWT()
{   if (this.token == undefined)
          return;
  const decodedToken = this.helper.decodeToken(this.token);
  this.roles = decodedToken.roles;
  this.loggedUser = decodedToken.sub;
}

isAdmin():Boolean{
  if (!this.roles) //this.roles== undefiened
  return false;
  return (this.roles.indexOf('ADMIN') >-1) ;
  ;
}

isUser():Boolean{
  if (!this.roles) //this.roles== undefiened
  return false;
  return (this.roles.indexOf('USER') >-1) ;
  ;
}

isRole(roles: string[]): Boolean {
  if (!this.roles) 
    return false;

  return roles.some(role => this.roles.indexOf(role.toUpperCase()) > -1);
}



logout() {
  this.loggedUser = undefined!;
  this.roles = undefined!;
  this.token= undefined!;
  this.isloggedIn = false;
  localStorage.removeItem('jwt');
  this.router.navigate(['/login']);
  }




  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
   // this.getUserRoles(login);
  }

  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }

  isTokenExpired(): Boolean
  {
    return  this.helper.isTokenExpired(this.token);
  }






  deleteUser(id: number) {
    let jwt=this.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt})
    const url=`${this.apiURL}/deleteUserById/${id}`
    return this.http.delete(url,{headers:httpHeaders});
    }





    AddRoleForUser(id:number,r:Role):Observable<User>
    {
      let jwt = this.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      const url=`${this.apiURL}/addRole/${id}`
      return this.http.post<User>(url,r, {headers:httpHeaders});

    }

    removeRoleFromUser(id:number,r:Role):Observable<User>
    {
      let jwt = this.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      const url=`${this.apiURL}/removeRoleFromUer/${id}`
      return this.http.post<User>(url,r, {headers:httpHeaders});

    }

    consulterUser(id: number): Observable<User> {
      let jwt = this.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      const url = `${this.apiURL + '/findUserById'}/${id}`;
      return this.http.get<User>(url,{headers:httpHeaders});
      }

      ajouterUser(user: { password: any; confirmPassword: any; email: any; username: any }): Observable<User> {
        return this.http.post<User>(this.apiURL + "/add", user);
    }

      activateUser(username: string, verificationCode: string): Observable<User> {
        const url = `${this.apiURL}/activateUser/${username}/${verificationCode}`;
        const body = { verification_code: verificationCode };
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        console.log(url);
        return this.http.post<User>(url, { headers });
      }


}
