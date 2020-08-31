import { Injectable } from '@angular/core';
import { MyLibService } from '../mylib/my-lib.service'
import { Observable } from 'rxjs';

// 緯度経度
interface placeVal {
  ido: string;
  keido: string;
}

// MAP構造
interface weatherPlace {
  [place: string]: placeVal
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherPlaceBody : weatherPlace = {}
  constructor(
      private myLib: MyLibService,
  ) {
    this.weatherPlaceBody["東京"] = {ido: '35.681236', keido: '139.767125'}
    this.weatherPlaceBody["大阪"] = {ido: '34.702427', keido: '135.495285'}
    this.weatherPlaceBody["福岡"] = {ido: '33.589640', keido: '130.420479'}
  }

  private weatherKey  = '32b5551ba54050754d1d3b2bf382bd47'
  private formatKeido  = 'XXXXXXXXXX'
  private formatIdo    = 'YYYYYYYYY'
  private weatherUrl  = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.formatIdo}&lon=${this.formatKeido}&units=metric&lang=ja&appid=${this.weatherKey}`

  // すべての天気情報を取得する
  public GetWeatherInfo(place : string) : Observable<any>  {
    let one : placeVal = this.weatherPlaceBody[place]
    let url = this.weatherUrl.replace(this.formatIdo, one.ido)
    url = url.replace(this.formatKeido, one.keido)
    return this.myLib.HttpGetApiOne(url)
  }
}
