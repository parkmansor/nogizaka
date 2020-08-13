import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, merge } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TvInfo } from './tv-info';
import { NogiMemberInfo } from './nogi-member'
import { NogiMemberService } from './nogi-member.service'

@Injectable({
  providedIn: 'root'
})
export class NogiTvService {
  private apiKey = `BqUdXrklFeqSi8PJIowkyCa1CKFFZ1Sg`
  private area = '270'
  private targetActName = '乃木坂'
  private dateFormat = `YYYY-MM-DD`
  private urlFormat = `https://api.nhk.or.jp/v2/pg/list/${this.area}/tv/${this.dateFormat}.json?key=${this.apiKey}`
//  private urlFormat = `assets/test-${this.dateFormat}.json`
  private oneWeekDay = 7
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'text/plain',
//      'Content-Type': 'application/json'
//      'Access-Control-Allow-Origin': '*',
//      'Access-Control-Allow-Credentials': 'true',
//      'Cross-Origin-Resource-Policy': 'same-site | same-origin | cross-origin'
    }),
  };

  tvInfoBody: TvInfo[] = []

  // コンストラクタ
  constructor(
    private http: HttpClient, 
    private nogiMemnber: NogiMemberService
    )
    { }

  // URLの文字列生成
  private getUrl(index : number) : string {
    let date = new Date()
    date.setDate(date.getDate() + index)

    let year_str = date.getFullYear().toString();
    let month_str = (1 + date.getMonth()).toString();
    let day_str = date.getDate().toString();

    month_str = ('0' + month_str).slice(-2);
    day_str = ('0' + day_str).slice(-2);
    
    let res = this.urlFormat;
    res = res.replace(/YYYY/g, year_str);
    res = res.replace(/MM/g, month_str);
    res = res.replace(/DD/g, day_str);
    
    return res
  }

  // エラー通知
  private handleError<T>(operation = `operation`, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
  // JSONの時刻を表示用の文字列に変換
  private convJsonTimeStrToDisp(src: string) : string {
    let dst =  src.substr(5, 2) + '/' + src.substr(8, 2) + ' ' + src.substr(11, 5);
    return dst;
  }

  // 時刻情報を作成する(1番組分)
  private getTvInfoPrgramOne(prgOne: any) : void {
    let infoOne: TvInfo = new TvInfo()
    infoOne.start_time = this.convJsonTimeStrToDisp(prgOne.start_time)
    infoOne.end_time = this.convJsonTimeStrToDisp(prgOne.end_time)
    infoOne.title = prgOne.title
    infoOne.act = this.nogiMemnber.extractMemnberName(prgOne.act)
    infoOne.chName = prgOne.service.name
    this.tvInfoBody.push(infoOne)
    // console.log(infoOne)
  }

  // 時刻情報を作成する(1チャンネル分)
  private getTvInfoChannelOne(prgAll: any) : void {
    let prgPart = prgAll.filter((elm : any) => {
      let actName: string = elm.act
      return (actName.indexOf(this.targetActName) != -1) || this.nogiMemnber.serchMemnber(actName) != null
    })

    for (let prgOne of prgPart) {
      this.getTvInfoPrgramOne(prgOne)
    }
  }

  // 時刻情報を作成する
  private setupTvInfoSub(prgOrg : any) : void {
    // 1Ch分づつ
    const channelNameList: string[] = ['g1', 'g2', 'e1', 'e2', 'e3', 's1', 's2', 's3', 's4']
    for (let channelOne of channelNameList) {
      if (channelOne in prgOrg.list) {
        this.getTvInfoChannelOne(prgOrg['list'][channelOne])
      }
    }

    // 開始時刻順にソート
    this.tvInfoBody.sort((a, b) => {
       return a.start_time > b.start_time ? 1 : -1
    })
  }

  // 番組情報作成を作成する
  public SetupTvInfoEntry() : Observable<any> {
    let objAll :Observable<any>[] = []
    for (let cnt = 0; cnt < this.oneWeekDay; cnt++) {
      let targetUrl = this.getUrl(cnt)
      let objOne = this.http.get(targetUrl, this.httpOptions).pipe(
        tap((res) => {
          this.setupTvInfoSub(res)
          console.log(`HTTP成功[${targetUrl}]`)
        }),
        catchError(this.handleError(`HTTP失敗[${targetUrl}]`))
      )
      objAll.push(objOne)
    }

    let retVal = merge(objAll[0], objAll[1], objAll[2], objAll[3], objAll[4], objAll[5], objAll[6]);
//    let retVal = merge(objAll[0], objAll[1], objAll[2]);
    return retVal;
  }

  // テレビ情報実体取得
  public GetTvInfoBody(): TvInfo[] {
    return this.tvInfoBody
  }
}
