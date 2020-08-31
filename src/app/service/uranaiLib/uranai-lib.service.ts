import { Injectable } from '@angular/core';

// 星座の情報
interface SeizaInfo { 
  stMonth: number
  stDay: number
  endMonth: number
  endDay: number
  japan: string
  laten: string
  english: string
}

@Injectable({
  providedIn: 'root'
})

export class UranaiLibService {

  constructor() { }

  /*　女性の外格の端数 to 男性の地格の端数　*/
  private femaleToMale: number[][] = [
    [1, 5, 7],
    [2, 6, 8],
    [2, 5, 6, 8, 0],
    [1, 5, 6, 8],
    [2, 6, 7],
    [4, 7, 0],
    [2, 3, 5],
    [1, 3, 4],
    [1, 5, 7, 0],
    [1, 3, 6],
  ]

  /* 男性の地格の端数 to 女性の外格の端数 */
  private maleToFemale: number[][] = [
    [1, 5, 9],
    [1, 2, 8],
    [3, 6, 0],
    [4, 5, 9],
    [3, 6, 7],
    [2, 8, 0],
    [1, 2, 5],
    [4, 6, 7],
    [1, 5, 9],
    [3, 4, 8],
  ]
 
  // マッチ度合いを取得
  public GetNameMatching(maleNameLen1st: number, maleKakusu: number[], femaleNameLen1st: number, femaleKakusu: number[]) {
    let maleChikaku = (maleKakusu.filter((val, idx) => maleNameLen1st <= idx)).reduce((sum, val) => sum += val)
    let femaleGaikaku = femaleKakusu[0] + femaleKakusu[femaleKakusu.length - 1]
    maleChikaku %= 10;
    femaleGaikaku %= 10;
    let res = 0;
    if (this.femaleToMale[femaleGaikaku].indexOf(maleChikaku) != -1) res++
    if (this.maleToFemale[maleChikaku].indexOf(femaleGaikaku) != -1) res++
    return res
  } 

  // 星座一覧
  private seizaInfo: SeizaInfo[] = [
    {stMonth: 1  ,stDay: 20, endMonth: 2 , endDay: 18, japan: "水瓶座" ,laten: "Aquarius"    ,english: "The Water Bearer"},
    {stMonth: 2  ,stDay: 19, endMonth: 3 , endDay: 20, japan: "魚座  " ,laten: "Pisces"      ,english: "The Fish"},
    {stMonth: 3  ,stDay: 21, endMonth: 4 , endDay: 19, japan: "牡羊座" ,laten: "Aries"       ,english: "The Ram"},
    {stMonth: 4  ,stDay: 20, endMonth: 5 , endDay: 20, japan: "牡牛座" ,laten: "Taurus"      ,english: "The Bull"},
    {stMonth: 5  ,stDay: 21, endMonth: 6 , endDay: 21, japan: "双子座" ,laten: "Gemini"      ,english: "The Twins"},
    {stMonth: 6  ,stDay: 22, endMonth: 7 , endDay: 22, japan: "蟹座  " ,laten: "Cancer"      ,english: "The Crab"},
    {stMonth: 7  ,stDay: 23, endMonth: 8 , endDay: 22, japan: "獅子座" ,laten: "Leo"         ,english: "The Lion"},
    {stMonth: 8  ,stDay: 23, endMonth: 9 , endDay: 22, japan: "乙女座" ,laten: "Virgo"       ,english: "The Virgin"},
    {stMonth: 9  ,stDay: 23, endMonth: 10, endDay: 23, japan: "天秤座" ,laten: "Libra"       ,english: "The Scales"},
    {stMonth: 10 ,stDay: 24, endMonth: 11, endDay: 22, japan: "蠍座  " ,laten: "Scorpio"     ,english: "The Scorpion"},
    {stMonth: 11 ,stDay: 23, endMonth: 12, endDay: 21, japan: "射手座" ,laten: "Sagittarius" ,english: "The Archer"},
    {stMonth: 12 ,stDay: 22, endMonth: 1 , endDay: 19, japan: "山羊座" ,laten: "Capricorn"   ,english: "The Goat"},
  ]

  // 星座を探す
  private getSeizaInfo(month : number, day: number) : SeizaInfo {
    let cnvDayToMsExec = (month : number, day : number) : Number => {
      return new Date(2020, month, day).getTime()
    }
    let srcMs = cnvDayToMsExec(month, day)
    for (let seizaOne of this.seizaInfo) {
      let startMs = cnvDayToMsExec(seizaOne.stMonth, seizaOne.stDay)
      let endMs = cnvDayToMsExec(seizaOne.endMonth, seizaOne.stDay)
      if (startMs <= srcMs && srcMs <= endMs) {
         return seizaOne
      }
    }
    return this.seizaInfo[this.seizaInfo.length - 1]
  }

  // 日本語の星座名を取得
  public GetSeizaNameJpn(month : number, day: number) : string {
    return this.getSeizaInfo(month, day).japan
  }  

  // 日本語の星座名を取得
  public GetSeizaNameEnglish(month : number, day: number) : string {
    return this.getSeizaInfo(month, day).english
  }  
}
