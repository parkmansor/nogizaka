import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-required-text',
  templateUrl: './required-text.component.html',
  styleUrls: ['./required-text.component.css']
})
export class RequiredTextComponent implements OnInit {
  @Input() inputName: string
  @Output() edited = new EventEmitter<string>()
  public msgClass: string
  public textClass: string
  public msgBody: string
 
  constructor() { }

  ngOnInit(): void {
    this.textClass = `form-control is-invalid`
    this.msgClass = `invalid-feedback`
    this.msgBody = `Please enter a ${this.inputName}.`    
  }

  textInput(val : string) {
    if (0 < val.length) {
      this.textClass = `form-control is-valid`
      this.msgClass = `valid-feedback`
      this.msgBody = `OK`
    } else {
      this.textClass = `form-control is-invalid`
      this.msgClass = `invalid-feedback`
      this.msgBody = `Please enter a ${this.inputName}.`
    }
    this.edited.emit(val)
  }
}
