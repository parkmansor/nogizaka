import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, generate } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TvInfo } from '../tv-info';
import { NogiTvService } from '../nogi-tv.service';
import { NogiMemberInfo } from '../nogi-member'
import { NogiMemberService } from '../nogi-member.service'

@Component({
  selector: 'app-nogi-tv',
  templateUrl: './nogi-tv.component.html',
  styleUrls: ['./nogi-tv.component.css']
})

export class NogiTvComponent implements OnInit {
  private backUpFilePath = `assets/test2.json`
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
    }),
  };
  
  // 実体
  public tvInfoBody: TvInfo[] = []
  public nowClass:any
  public checkBoxList : {name: string, initCheck: string, isDisp: boolean}[] = [
    {name: '1期生', initCheck: "checked", isDisp: true},
    {name: '2期生', initCheck: "checked", isDisp: true},
    {name: '3期生', initCheck: "checked", isDisp: true},
    {name: '4期生', initCheck: "checked", isDisp: true},
    {name: '卒業生', initCheck: "",       isDisp: true},
  ]

  // コンストラクタ
  constructor(
    private nogiTv: NogiTvService,
    private nogiMemnber: NogiMemberService,
    private http: HttpClient
  )
  { }

  // ファイル保存
  private saveBackUpFile(body: any): void {
    this.http.put(this.backUpFilePath, body, this.httpOptions).
      pipe(
        tap((res: any) => {
          debugger;
          console.log(res)
        })
      )
      .subscribe();
  }

  // 初期化
  ngOnInit(): void {
    // 初期値
    this.nowClass = {
      '1期生': true,
      '2期生': true,
      '3期生': true,
      '4期生': true,
      '卒業生': true,
    }

    // Httpで情報取得
    if (this.nogiTv.GetTvInfoBody().length == 0) {
      this.nogiTv.SetupTvInfoEntry()
      .subscribe(
        res => {
          this.tvInfoBody = this.nogiTv.GetTvInfoBody()
          // this.saveBackUpFile(res)
        },
        error => {
          console.error(error)
        }
      )
    } else {
      this.tvInfoBody = this.nogiTv.GetTvInfoBody()
    }
  }

  // メンバー選択のチェックボックス
  public checkboxSelectMember(isDisp : boolean, boxName: string) {
    // 更新
    for (let boxOne of this.checkBoxList) {
      if (boxName === boxOne.name) {
        boxOne.isDisp = isDisp;
        break;
      }
    }
    
    // 情報作り直し
    this.tvInfoBody = []
    for (let tvOne of this.nogiTv.GetTvInfoBody()) {
      for (let memberName of tvOne.act) {
        let generateNo =this.nogiMemnber.getGenerateNotGraduate(memberName)
        let isTarget
        if (generateNo == -1) {
          isTarget = true
        } else {
          if (generateNo == 0) { 
            generateNo = 4
          } else {
            generateNo--
          }
          isTarget = this.checkBoxList[generateNo].isDisp
        }
        if (isTarget) {
          this.tvInfoBody.push(tvOne)
          break;
        }
      }
    }
  }
}
