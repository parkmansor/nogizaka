import { Injectable } from '@angular/core';
import { Observable, of, merge, forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyLibService {

  constructor(
    private http: HttpClient 
  ) { 
  }

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'text/plain',
    }),
  };

  // ビジー待ち
  public async BusyWaitTime(waitTimeMs : number) {
    return new Promise<void>((resolve, reject) =>{
      setTimeout(resolve, waitTimeMs);
    })
  }

  // エラー通知
  private handleError<T>(operation = `operation`, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
  
  // API用HTTP通信
  public HttpGetApiOne(url: string) : Observable<any> {
    return this.http.get(url, this.httpOptions).pipe(
      tap((res) => {
        //console.log(`HTTP成功[${url}]`)
      }),
      catchError(this.handleError(`HTTP失敗[${url}]`))
    )
  }

  // API用HTTP通信(複数)
  public HttpGetApiMutliJoin(apiNum: number, urlMakeFunc: (idx: number)=>string) : Observable<any> {
    let objAll :Observable<any>[] = []
    for (let cnt = 0; cnt < apiNum; cnt++) {
      let targetUrl = urlMakeFunc(cnt);
      let objOne = this.HttpGetApiOne(targetUrl);
      objAll.push(objOne)
    }

    let retVal = forkJoin(objAll);
    return retVal;
  }
}
