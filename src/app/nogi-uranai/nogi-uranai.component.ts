import { Component, OnInit } from '@angular/core';
import { NogiTvService } from '../nogi-tv/nogi-tv.service';
import { NogiMemberScore } from '../service/nogi-member/nogi-member'
import { NogiMemberService } from '../service/nogi-member/nogi-member.service'
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, merge, forkJoin } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NameKakusuService } from '../service/nama-kakusu/name-kakusu.service'

@Component({
  selector: 'app-nogi-uranai',
  templateUrl: './nogi-uranai.component.html',
  styleUrls: ['./nogi-uranai.component.css']
})
export class NogiUranaiComponent implements OnInit {
  public myControl: FormGroup
  public memberName: string
  public memberScore: NogiMemberScore[] = []
  private dispNum = 3
  public isDispEnable

  constructor(
    private nogiMemnber: NogiMemberService,
    private http: HttpClient,
    private nameKakusu: NameKakusuService,
  ) { }

  ngOnInit(): void {
    this.isDispEnable = false
    this.myControl = new FormGroup({
      birthday: new FormControl('1985-01-01'),
      boold: new FormControl(),
      name: new FormControl('乃木太郎'),
    })
  }

  onSubmit(val: any) {
   this.nameKakusu.GetNameKakusu(val.name)
    .subscribe(
      res => {
        let kakusu = 0
        for (let one of res) {
          if ("success" === one["status"]) {
            if (one["find"]) {
              kakusu += one["results"][0]["総画数"]
            }
          }
        }
        this.memberScore = this.nogiMemnber.GetMemnberScore(kakusu, val.boold, val.birthday, this.dispNum)
        this.isDispEnable = true
      },
      error => {
        console.error(`取得失敗[${error}]`)
        this.memberScore = this.nogiMemnber.GetMemnberScore(0, val.boold, val.birthday, this.dispNum)
        this.isDispEnable = true
      }
    )
  }
}
