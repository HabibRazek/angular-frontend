import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDrugsComponent } from './add-drugs/add-drugs.component';
import { DrugsGuard } from './drugs.guard';
import { DrugsComponent } from './drugs/drugs.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { UpdateDrugComponent } from './update-drug/update-drug.component';
import { SearchDrugsClassComponent } from './search-drugs-class/search-drugs-class.component';
import { SearchNameComponent } from './search-name/search-name.component';
import { ListeDrugsClassComponent } from './liste-drugs-class/liste-drugs-class.component';
import { ListeUsersComponent } from './liste-users/liste-users.component';
import { AddRoleUserComponent } from './add-role-user/add-role-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { VerificationcodeComponent } from './verificationcode/verificationcode.component';

const routes: Routes = [
  { path: 'drugs', component: DrugsComponent },
  {
    path: 'add-drugs',
    component: AddDrugsComponent,
    canActivate: [DrugsGuard],
  },
  { path: '', redirectTo: '/drugs', pathMatch: 'full' },
  {
    path: 'update-drug/:id',
    component: UpdateDrugComponent,
    canActivate: [DrugsGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'app-forbidden', component: ForbiddenComponent },
  { path: 'search-drugs-class', component: SearchDrugsClassComponent },
  { path: 'search-name', component:SearchNameComponent},
  { path: 'liste-drugs-class', component:ListeDrugsClassComponent, canActivate: [DrugsGuard] },
  { path: 'liste-users' , component:ListeUsersComponent, canActivate: [DrugsGuard]},
  { path: 'add-role-user/:id', component: AddRoleUserComponent },
  {path:"ajouterUser",component:AddUserComponent},
  {path: "verificationcode", component: VerificationcodeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
