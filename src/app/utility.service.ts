import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of} from 'rxjs';
import { catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private http: HttpClient, private router: Router) { }

  doLogin(data): Observable<any>{
      return this.http.post('http://localhost:5000/login',data)
  }

  logout(data){
    return this.http.post('http://localhost:5000/logout',data)
  }

  getNamespace(){
    return this.http.get('http://localhost:5000/list_namespaces?hostname='+localStorage.getItem('hostname'));
  }

  getPods(namespace){
    return this.http.get('http://localhost:5000/list_pods?hostname='+localStorage.getItem('hostname')+'&namespace='+namespace);
  }

  processLogs(namespace,podname,loglevel){
    return this.http.get('http://localhost:5000/process_logs?hostname='+localStorage.getItem('hostname')+'&namespace='+namespace+'&podname='+podname+'&loglevel='+loglevel);
  }

  checkLogin(): Observable<any> {
    return this.http.get('http://localhost:5000/login_check?hostname='+localStorage.getItem('hostname'))
    .pipe( map( data => {
      let res = data.valueOf()
      if(res['status'])
        return true;
      else{
        this.router.navigate(['login'])
        return of(false)
      }
      
    }), catchError ((err: HttpErrorResponse) => {
      this.router.navigate(['login'])
      return of(false)
    }));
  }
}
