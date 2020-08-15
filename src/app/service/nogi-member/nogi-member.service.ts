import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NogiMemberInfo, NogiMemberScore } from './nogi-member'
import { stringify } from '@angular/compiler/src/util';
import { Observable, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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
    ).subscribe()
  }
 
  // コンストラクタ
  constructor(
    private http: HttpClient 
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

  // 誕生日のメンバ名を取得
  public GetBirthdayMember(date : Date): [string, number][] {
    let month_str = (1 + date.getMonth()).toString();
    let day_str = date.getDate().toString();
    let dateStr = month_str + "月" + day_str + "日"
    let ret : [string, number][] = []
    for (let one of this.memberArray) {
      let withoutYear = one.birthday.substr(5) 
      if (withoutYear == dateStr) {
        let age = date.getFullYear() - Number(one.birthday.substr(0, 4))
        ret.push([one.name, age])
      }
    }
    return ret
  }

  // メンバの情報を取得
  public serchMemnber(name: string) : NogiMemberInfo | null {
    let ret : NogiMemberInfo = null
    for (let memberOne of this.memberMap) {
      if (name.indexOf(memberOne[0]) != -1) {
        ret = memberOne[1]
        break
      }
    }
    return ret
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
  private getBloodScore(blood1: string, blood2: string): number {
    let score
    if (blood1 == null || blood2 == null) {
      score = 5
    } else {
      if (blood1 == blood2) {
        score = 10
      } else if (blood1 == 'U' || blood2 == 'U') {
        score = 5
      } else {
        score = 0
      }
    }
    return score
  }

  // スコア順にならんだ名前を取得する
  public GetMemnberScore(srcKakusu: number, srcBlood: string, srcBirthDay: string, maxMemberNum: number) : NogiMemberScore[] {
    let scoreMap : Map<string, {kakusuu: number, srcBlood: string, birthday: string}>
    let scoreArray : NogiMemberScore[] = []
    
    for (let memberOne of this.memberMap) {
      let dstKakusu = 0
      let infoBody = memberOne[1]
      if (infoBody.graduate.length != 0) continue

      if (0 < srcKakusu) {
        dstKakusu = 10 - Math.abs(infoBody.kakusu[0] % 10 - srcKakusu % 10)
      }
      let dstBlood = this.getBloodScore(srcBlood, infoBody.bloodType)
      let dstBirthday = 0
      let totalScore = dstKakusu + dstBlood + dstBirthday

      totalScore = Math.floor(Math.random() * 10000000) % 100 // 仮
      scoreArray.push({score: totalScore, name: memberOne[0]})
    }
    scoreArray.sort((a, b) => b.score - a.score)
    return scoreArray.filter((val, idx) => (idx < maxMemberNum));
  }
}
