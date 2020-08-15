import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, merge, forkJoin } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class NameKakusuService {

  constructor(
    private http: HttpClient 
  ) { }

  private urlFormat = `https://mojikiban.ipa.go.jp/mji/q?UCS=0x`
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'text/plain',
    }),
  };
   
  // エラー通知
  private handleError<T>(operation = `operation`, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
  
  //　名前の画数を取得する(漢字のみが対象）
  public GetNameKakusu(name: string) : Observable<any> {
    let objAll :Observable<any>[] = []

    for (let strCnt = 0; strCnt < name.length; strCnt++) {
      let targetUrl = this.urlFormat + name.charCodeAt(strCnt).toString(16)
      let objOne = this.http.get(targetUrl, this.httpOptions).pipe(
        tap((res) => {
          console.log(`HTTP成功[${targetUrl}]`)
        }),
        catchError(this.handleError(`HTTP失敗[${targetUrl}][${name.charAt(strCnt)}]`))
      )
      objAll.push(objOne)
    }

    let retVal = forkJoin(objAll)
    return retVal;
  }
}
