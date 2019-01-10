import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import LocalStorageUtil from '../util/StorageUtil';

@Injectable()
export class AuthRouteGuardService implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.canLogin()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  private canLogin() {
    return LocalStorageUtil.getCurrentUserId(); // edit for real login
  }


}
