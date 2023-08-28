import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenAuthService {

  constructor(private router: Router) { }
  intercept(req: { clone: (arg0: { setHeaders: { Authorization: string; }; }) => any; }, next: { handle: (arg0: any) => any; }) {
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `${localStorage.getItem('_token')}`
      }
    })

    return next.handle(tokenizedReq).pipe(
      tap(
        () => { },
        err => {
          localStorage.removeItem('_token');
          this.router.navigateByUrl('/login');
        }

      )
    );
  }
}
