import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, merge, forkJoin } from 'rxjs';
import { TvInfo } from './tv-info';
import { NogiMemberService } from '../service/nogi-member/nogi-member.service'
import { MyLibService } from '../service/mylib/my-lib.service'

@Injectable({
  providedIn: 'root'
})
export class NogiTvService {
  private apiKey = `BqUdXrklFeqSi8PJIowkyCa1CKFFZ1Sg`
  private area = '270'
  private dateFormat = `YYYY-MM-DD`
  private urlFormat = `https://api.nhk.or.jp/v2/pg/list/${this.area}/tv/${this.dateFormat}.json?key=${this.apiKey}`
//  private urlFormat = `assets/test-${this.dateFormat}.json`
  private isSetupFin = false
  private oneWeekDay = 5

  tvInfoBody: TvInfo[] = []

  // コンストラクタ
  constructor(
    private http: HttpClient, 
    private nogiMemnber: NogiMemberService,
    private myLib: MyLibService,
    )
    {
      this.setupTvInfoEntry()
    }

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
      return (this.nogiMemnber.SerchMemnber(actName) != null)
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
  private setupTvInfoEntry() : void {
    let retVal = this.myLib.HttpGetApiMutliJoin(this.oneWeekDay, (cnt) => {
      return this.getUrl(cnt)
    })

    retVal.subscribe( res => {
      this.isSetupFin = true
      for (let one of res) {
        this.setupTvInfoSub(one)
      }
      //console.log(`初回取得成功`)
    },
    error => {
      console.error(`初回取得失敗[${error}]`)
    })
  }

  // セットアップすみか
  public IsSetupFin() : boolean {
    return this.isSetupFin;
  }
 
  // テレビ情報実体取得
  public GetTvInfoBody(): TvInfo[] {
    return this.tvInfoBody
  }
}
