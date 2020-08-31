import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NogiMemberInfo, NogiMemberScore } from './nogi-member'
import { tap } from 'rxjs/operators';
import { UranaiLibService } from '../uranaiLib/uranai-lib.service'

@Injectable({
  providedIn: 'root'
})
export class NogiMemberService {

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'text/plain',
    }),
  };
 
  private memberMap : Map<string, NogiMemberInfo>
  private memberArray : NogiMemberInfo[]
  private memberJSON : any
  private isSetupFin : boolean

    // 内部用のデータに変換
  private setupMemberMap(obj : any) {
    for (let oneMember of obj) {
      let info : NogiMemberInfo = {
        name:     oneMember.name,
        birthday: oneMember.birthday,
        home:     oneMember.home,
        bloodType:oneMember.bloodType,
        height:   oneMember.height,
        kakusu:   oneMember.kakusu,
        generate: oneMember.generate,
        graduate: oneMember.graduate,
        firstNameLen: oneMember.firstNameLen,
      }
      this.memberMap.set(oneMember.name, info)
      this.memberArray.push(info)
    }
  }

  // JSON読み出し
  private setupMemberInfo() : void {
    if (this.memberJSON.length != 0) {
      return null
    }
    let urlFormat = `assets/nogiMemberInfo.json`
    this.http.get(urlFormat, this.httpOptions).pipe(
      tap((res) => {
        this.memberJSON = res
        this.setupMemberMap(res)
        this.isSetupFin = true
        console.log(`メンバ情報取得[${urlFormat}]`)
      })
    ).subscribe();
  }
 
  // コンストラクタ
  constructor(
    private http: HttpClient,
    private uranalLib: UranaiLibService,
  ) 
  { 
    this.isSetupFin = false
    this.memberMap  = new Map<string, NogiMemberInfo>()
    this.memberArray  = []
    this.memberJSON  = []
    this.setupMemberInfo()
  }

  // セットアップすみか
  public IsSetupFin() : boolean {
    return this.isSetupFin
  }

  private getMemberAge(date: Date, birthday: string): number {
    return date.getFullYear() - Number(birthday.substr(0, 4))
  }

  // 誕生日のメンバ名を取得
  public GetMemberBirthdayRange(startDay: number, endDay: number): [string, number][] {
    let ret : [string, number][] = []
    for (let passDay = startDay; passDay <= endDay; passDay++) {
      let date : Date = new Date();
      
      date.setDate(date.getDate() + passDay)
      let month_str = (1 + date.getMonth()).toString();
      let day_str = date.getDate().toString();
      let dateStr = month_str + "月" + day_str + "日"
      for (let one of this.memberArray) {
        if (one.graduate.length != 0) continue;
        let withoutYear = one.birthday.substr(5) 
        if (withoutYear == dateStr) {
          let age = this.getMemberAge(date, one.birthday)
          ret.push([one.name, age])
        }
      }
    }
    return ret
  }

  // メンバの情報を取得
  public SerchMemnber(name: string) : NogiMemberInfo | null {
    let ret : NogiMemberInfo = null
    for (let memberOne of this.memberMap) {
      if (name.indexOf(memberOne[0]) != -1) {
        ret = memberOne[1]
        break
      }
    }
    return ret
  }

  // メンバの年齢を取得
  public GetMemberAge(name: string) : number {
    let ret = this.SerchMemnber(name);
    if (ret != null) return this.getMemberAge(new Date(), ret.birthday)
    return -1
  }

  // メンバの誕生日を取得
  public GetMemberBirthdayFromName(name: string) : string {
    let ret = this.SerchMemnber(name);
    if (ret != null) return ret.birthday
    return "Not found"
  }

  // メンバの星座を取得
  public GetMemberSeiza(name: string) : string {
    let ret = this.SerchMemnber(name);
    if (ret != null) return this.getMemberSeiza(ret.birthday)
    return "Not found"
  }
  
  // メンバ名を抽出
  public extractMemnberName(name: string) : string[] {
    let ret : string[] = []
    for (let memberOne of this.memberMap) {
      if (name.indexOf(memberOne[0]) != -1) {
        ret.push(memberOne[0]) 
      }
    }

    return ret
  }

  // 何期生か
  public getGenerateNotGraduate(name: string) : number {
    if (this.memberMap.has(name)) {
      let memberInfo : NogiMemberInfo = this.memberMap.get(name)
      if (memberInfo.generate == 0) {
        return -1
      } else {
        if (memberInfo.graduate.length == 0) {
          return memberInfo.generate
        } else {
          return 0
        }
      }
    }
    return -1
  }

  // 血液型のスコアを取得
  private getBloodScore(srcBlood: string, dstBlood: string): number {
    let score

    if (srcBlood == null || srcBlood == 'U') {
      return 0
    }
    
    if (srcBlood == dstBlood) {
      score = 2
    } else {
      score = 0
    }

    return score
  }

  // 誕生日を抽出
  private extactBirthdayNumber(birthdayStr: string) : [number, number, number] {
    birthdayStr = birthdayStr.replace('年', '-')
    birthdayStr = birthdayStr.replace('月', '-')
    birthdayStr = birthdayStr.replace('日', '')
    let year  = birthdayStr.substr(0, 4)
    let month = birthdayStr[6] == '-' ? birthdayStr.substr(5, 1) :  birthdayStr.substr(5, 2)
    let day   = birthdayStr[6] == '-' ? birthdayStr.substr(7, 2) :  birthdayStr.substr(8, 2)
    return [Number(year), Number(month), Number(day)]
  }

  // 星座を取得
  public getMemberSeiza(birthday : string) {
    let [year, month, day] = this.extactBirthdayNumber(birthday)
    return this.uranalLib.GetSeizaNameJpn(month, day);
  }
 
  // スコア順にならんだ名前を取得する
  public GetMemnberScore(nameLen1st: number, nameKakusu: number[], srcBlood: string, srcBirthDay: string, maxMemberNum: number) : NogiMemberScore[] {
    
    // 星座取得
    let srcSeiza = this.getMemberSeiza(srcBirthDay);
    let scoreArray : NogiMemberScore[] = []

    // 名前相性が良いものだけ
    // 血液型と星座が一致するのものだけ
    for (let memberOne of this.memberArray) {
      if (memberOne.graduate.length != 0) continue;
      let score = this.getBloodScore(srcBlood, memberOne.bloodType);
      let memSeiza = this.getMemberSeiza(memberOne.birthday);
      if (memSeiza == srcSeiza) {
        score += 3
      }

      score += this.uranalLib.GetNameMatching(nameLen1st, nameKakusu, memberOne.firstNameLen, memberOne.kakusu)
      scoreArray.push({score: score, name: memberOne.name})
    }

    scoreArray.sort((a, b) => b.score - a.score)
    return scoreArray.filter((val, idx) => (idx < maxMemberNum));
  }
}
