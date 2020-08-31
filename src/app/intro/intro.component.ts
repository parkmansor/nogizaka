import { Component, OnInit } from '@angular/core';
import { NogiMemberService } from '../service/nogi-member/nogi-member.service'
import { MyLibService } from '../service/mylib/my-lib.service'
import { WeatherService } from '../service/Weather/Weather.service'
import { UranaiLibService } from '../service/uranaiLib/uranai-lib.service'

interface weatherInfo {
  name: string;
  desc: string;
  templature: number;
  humidity: number;
}

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})

export class IntroComponent implements OnInit {

  public todayDate : Date;
  public todaySeiza : string;
  public todayBirthDayMemberName: [string, number][] = []
  public nearBirthDayMemberName: [string, number][] = []
  public weatherInfoList: weatherInfo[] = []
  private dispBirthdayLength = 120

   // コンストラクタ
  constructor(
    private nogiMemnber: NogiMemberService,
    private myLib: MyLibService,
    private uranalLib: UranaiLibService,
    private weather: WeatherService,
  )
  { 
    let date = new Date()
    this.todaySeiza = uranalLib.GetSeizaNameJpn(date.getMonth(), date.getDay())
    this.todayDate = date
  }

  // ビジー待ち
  private async setupLocalInfoWait() {
    for (let i = 0; i < 1000; i++) {
      if (this.nogiMemnber.IsSetupFin()) {
        break;
      }
      await this.myLib.BusyWaitTime(10);
    }
    this.todayBirthDayMemberName = this.nogiMemnber.GetMemberBirthdayRange(0, 7)
    this.nearBirthDayMemberName = this.nogiMemnber.GetMemberBirthdayRange(9, this.dispBirthdayLength)

    // 一つ分セット
    let weatherExecOne = (resOne: any, placeName: string) => {
      let weatherOne : weatherInfo = {name: placeName, desc: "", templature: 0, humidity: 0}
      weatherOne.templature = Math.floor(resOne.current.temp * 10) / 10 
      weatherOne.desc = resOne.current.weather[0].description
      weatherOne.humidity = resOne.current.humidity
      this.weatherInfoList.push(weatherOne)
    }

    let placeName : string[] = ["東京", "大阪", "福岡"]
    for (let one of placeName) {
      let obj = this.weather.GetWeatherInfo(one);
      await obj.toPromise().then((res : any) => weatherExecOne(res, one))
    }
  }

  // 初期化
  ngOnInit(): void {
    this.setupLocalInfoWait()
  }
}
