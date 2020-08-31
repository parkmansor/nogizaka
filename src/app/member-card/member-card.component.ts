import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NogiMemberService } from '../service/nogi-member/nogi-member.service'
import { NogiMemberInfo } from '../service/nogi-member/nogi-member'

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() memberName: string
  @Input() isPrimary: boolean
  @Output() edited = new EventEmitter<string>()
  public memberInfo: NogiMemberInfo
  public memberSeiza: string
  public memberAge: number
  public cardBodyClass: string
  public cardBorderClass: string
  public topMessage: string
  public btnClass: string

  constructor(
    private nogiMemnber: NogiMemberService,
  ) { }

  ngOnInit(): void {
    this.memberInfo = this.nogiMemnber.SerchMemnber(this.memberName);
    if (this.memberInfo.bloodType === 'U') {
      this.memberInfo.bloodType = "不明"
    }
    this.memberSeiza = this.nogiMemnber.GetMemberSeiza(this.memberName);
    this.memberAge = this.nogiMemnber.GetMemberAge(this.memberName);
    if (this.isPrimary) {
      this.cardBorderClass = "card bg-dark mb-4"
      this.cardBodyClass = "card-body text-white"
      this.btnClass = "btn btn-primary"
      this.topMessage = "Happy Birthday!"
    } else {
      this.cardBorderClass = "card border-dark mb-3"
      this.cardBodyClass = "card-body text-dark"
      this.btnClass = "btn btn-primary btn-sm"
      this.topMessage = "Coming soon"
    }
  }
}
