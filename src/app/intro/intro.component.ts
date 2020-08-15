import { Component, OnInit } from '@angular/core';
import { NogiMemberService } from '../service/nogi-member/nogi-member.service'
import { Observable } from 'rxjs';
import { timeInterval } from 'rxjs/operators';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  public todayDate : string;
  public birthDayMemberName: [string, number][] = []

  constructor(
    private nogiMemnber: NogiMemberService,
  )
  { 
    let date = new Date()
    this.todayDate = date.toDateString()
  }

  // 初期化
  private setupLocalInfo() {
    this.birthDayMemberName = this.nogiMemnber.GetBirthdayMember(new Date())
  }

  // 初期化
  ngOnInit(): void {
    if (this.nogiMemnber.IsSetupFin()) {
      this.setupLocalInfo()
    } else {
      let timerId = setInterval(()=>{
        if (this.nogiMemnber.IsSetupFin()) {
          this.setupLocalInfo()
          clearInterval(timerId)
        }
      }, 100)
    }
  }
}
