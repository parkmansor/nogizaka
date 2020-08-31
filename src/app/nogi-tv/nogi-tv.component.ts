import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, generate } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TvInfo } from './tv-info';
import { NogiTvService } from './nogi-tv.service';
import { NogiMemberInfo } from '../service/nogi-member/nogi-member';
import { NogiMemberService } from '../service/nogi-member/nogi-member.service';
import { async } from 'rxjs/internal/scheduler/async';
import { MyLibService } from '../service/mylib/my-lib.service';

@Component({
  selector: 'app-nogi-tv',
  templateUrl: './nogi-tv.component.html',
  styleUrls: ['./nogi-tv.component.css']
})

export class NogiTvComponent implements OnInit {
  private backUpFilePath = `assets/test1.json`
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
    private http: HttpClient,
    private myLib: MyLibService,
  )
  { 
  }

  // ファイル保存
  private saveBackUpFile(body: any): void {
    this.http.post(this.backUpFilePath, body, this.httpOptions).
      pipe(
        tap((res: any) => {
          debugger;
          console.log(res)
        })
      )
      .subscribe();
  }

  // 情報の初期化
  private async setupWait() {
    for (let i = 0; i < 1000; i++) {
      if (this.nogiTv.IsSetupFin()) {
        //this.uploadS3File("abc")
        this.saveBackUpFile("abc")
        this.tvInfoBody = this.nogiTv.GetTvInfoBody()
        break
      }
      await this.myLib.BusyWaitTime(10)
    }
  }

  // 初期化
  ngOnInit(): void {
    this.setupWait()
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
