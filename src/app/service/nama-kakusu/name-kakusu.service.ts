import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyLibService } from '../mylib/my-lib.service'
 
@Injectable({
  providedIn: 'root'
})
export class NameKakusuService {

  constructor(
    private http: HttpClient,
    private myLib: MyLibService,
  ) { }

  private urlFormat = `https://mojikiban.ipa.go.jp/mji/q?UCS=0x`
  
  //　名前の画数を取得する(漢字のみが対象）
  public GetNameKakusu(name: string) : Observable<any> {
    let retVal = this.myLib.HttpGetApiMutliJoin(name.length, (strCnt) => {
      return this.urlFormat + name.charCodeAt(strCnt).toString(16)
    })
    return retVal;
  }

  // 画数を取得
  public GetKakusu(resp: any) : number {
    let kakusu = 0
    for (let one of resp) {
      if ("success" === one["status"]) {
        if (one["find"]) {
          kakusu += one["results"][0]["総画数"]
        }
      }
    }
    return kakusu
  }


}