export interface NogiMemberInfo {
  name: string;
  birthday: string
  home: string
  bloodType: 'A' | 'O' | 'B' | 'AB' | 'U'
  height: number
  generate: number
  graduate: string
  kakusu: number[]
  firstNameLen: number
}

export interface NogiMemberScore {
  name: string;
  score: number
}