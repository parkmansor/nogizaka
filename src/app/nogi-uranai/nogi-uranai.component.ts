import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { NogiMemberScore } from '../service/nogi-member/nogi-member'
import { NogiMemberService } from '../service/nogi-member/nogi-member.service'
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NameKakusuService } from '../service/nama-kakusu/name-kakusu.service'

@Component({
  selector: 'app-nogi-uranai',
  templateUrl: './nogi-uranai.component.html',
  styleUrls: ['./nogi-uranai.component.css']
})
export class NogiUranaiComponent implements OnInit {
  public firstName : string
  public lastName : string
  public myControl: FormGroup
  public isDispEnable
  public firstNameMsg: string = "first name"
  public lastNameMsg: string = "last name"
  public selectedBloodType: string = ""
  public memberScore: NogiMemberScore[] = []
  public bloodInfo = [
    { name : 'A' },
    { name : 'O' },
    { name : 'B' },
    { name : 'AB' },
    { name : 'Unknown' },
  ]

  constructor(
    private nogiMemnber: NogiMemberService,
    private http: HttpClient,
    private nameKakusu: NameKakusuService,
  ) { }

  ngOnInit(): void {
    this.isDispEnable = false
    this.firstName = ""
    this.lastName = ""
    this.myControl = new FormGroup({
      birthday: new FormControl('2000-01-01'),
    })
  }

  // スコアを計算する
  private async calcScoreWait(val: any) {
    const dispNum = 3
    let nameTotalStr : string = this.firstName + this.lastName;
    let nameTotalKakusu :number[] = []

    // 画数取得
    for (let strOne of nameTotalStr) {
      await this.nameKakusu.GetNameKakusu(strOne).toPromise()
      .then(resp => {
        let nameLen = this.nameKakusu.GetKakusu(resp)
        nameTotalKakusu.push(nameLen)
        // console.log(strOne, nameLen)
      })
      .catch(error => (console.log(error)))
    }

    // 計算
    this.memberScore = this.nogiMemnber.GetMemnberScore(this.firstName.length, nameTotalKakusu, this.selectedBloodType, val.birthday, dispNum)
    console.log(this.memberScore)
    this.isDispEnable = true
  }

  // 初期化
  onSubmit(val: any) {
    this.calcScoreWait(val)
  }

  editedFirstName(text : string) {
    this.firstName = text
  }
  editedLastName(text : string) {
    this.lastName = text
  }

  selectBloodType(text : string) {
    this.selectedBloodType = text
  }
}
