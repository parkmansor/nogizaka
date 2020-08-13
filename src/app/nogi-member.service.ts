import { Injectable } from '@angular/core';
import { NogiMemberInfo } from './nogi-member'

@Injectable({
  providedIn: 'root'
})
export class NogiMemberService {
  // マップ構造
  private memberMap = new Map<string, NogiMemberInfo>([
    ['乃木坂46'   ,{ name: '乃木坂46'	  ,birthday: '2011年2月22日'	,	home: '乃木坂'	,	bloodType: 'U',	height: 0,	  generate: 0,	graduate: ''}],
    ['乃木坂４６' ,{ name: '乃木坂４６' ,birthday: '2011年2月22日'	,	home: '乃木坂'	,	bloodType: 'U',	height: 0,	  generate: 0,	graduate: ''}],
    ['秋元真夏' 	,{ name: '秋元真夏'   ,birthday: '1993年8月20日'	,	home: '埼玉県'	,	bloodType: 'B',	height: 154,	generate: 1,	graduate: ''}],
    ['生田絵梨花' ,{ name: '生田絵梨花' ,birthday: '1997年1月22日'	,	home: '東京都'	,	bloodType: 'A',	height: 160,	generate: 1,	graduate: ''}],
    ['伊藤純奈'	  ,{ name: '伊藤純奈'   ,birthday: '1998年11月30日'	,	home: '神奈川県',	bloodType: 'A',	height: 166,	generate: 2,	graduate: ''}],
    ['伊藤理々杏' ,{ name: '伊藤理々杏' ,birthday: '2002年10月8日'	,	home: '沖縄県'	,	bloodType: 'B',	height: 154,	generate: 3,	graduate: ''}],
    ['岩本蓮加'	  ,{ name: '岩本蓮加'	  ,birthday: '2004年2月2日'	  ,	home: '東京都'	,	bloodType: 'B',	height: 157,	generate: 3,	graduate: ''}],
    ['梅澤美波'	  ,{ name: '梅澤美波'	  ,birthday: '1999年1月6日'	  ,	home: '神奈川県',	bloodType: 'A',	height: 170,	generate: 3,	graduate: ''}],
    ['大園桃子'	  ,{ name: '大園桃子'	  ,birthday: '1999年9月13日'	,	home: '鹿児島県',	bloodType: 'O',	height: 156,	generate: 3,	graduate: ''}],
    ['北野日奈子' ,{ name: '北野日奈子' ,birthday: '1996年7月17日'	,	home: '北海道'	,	bloodType: 'O',	height: 158,	generate: 2,	graduate: ''}],
    ['久保史緒里' ,{ name: '久保史緒里' ,birthday: '2001年7月14日'	,	home: '宮城県'	,	bloodType: 'O',	height: 159,	generate: 3,	graduate: ''}],
    ['齋藤飛鳥'	  ,{ name: '齋藤飛鳥'	  ,birthday: '1998年8月10日'	,	home: '東京都'	,	bloodType: 'O',	height: 158,	generate: 1,	graduate: ''}],
    ['阪口珠美'	  ,{ name: '阪口珠美'	  ,birthday: '2001年11月10日'	,	home: '東京都'	,	bloodType: 'A',	height: 161,	generate: 3,	graduate: ''}],
    ['佐藤楓'   	,{ name: '佐藤楓'     ,birthday: '1998年3月23日'	,	home: '愛知県'	,	bloodType: 'A',	height: 161,	generate: 3,	graduate: ''}],
    ['白石麻衣'	  ,{ name: '白石麻衣'	  ,birthday: '1992年8月20日'	,	home: '群馬県'	,	bloodType: 'A',	height: 162,	generate: 1,	graduate: ''}],
    ['新内眞衣'	  ,{ name: '新内眞衣'	  ,birthday: '1992年1月22日'	,	home: '埼玉県'	,	bloodType: 'B',	height: 165,	generate: 2,	graduate: ''}],
    ['鈴木絢音'	  ,{ name: '鈴木絢音'	  ,birthday: '1999年3月5日'	  ,	home: '秋田県'	,	bloodType: 'O',	height: 160,	generate: 2,	graduate: ''}],
    ['高山一実'	  ,{ name: '高山一実'	  ,birthday: '1994年2月8日'	  ,	home: '千葉県'	,	bloodType: 'A',	height: 162,	generate: 1,	graduate: ''}],
    ['寺田蘭世'	  ,{ name: '寺田蘭世'	  ,birthday: '1998年9月23日'	,	home: '東京都'	,	bloodType: 'U',	height: 155,	generate: 2,	graduate: ''}],
    ['中田花奈'	  ,{ name: '中田花奈'	  ,birthday: '1994年8月6日'	  ,	home: '埼玉県'	,	bloodType: 'A',	height: 158,	generate: 1,	graduate: ''}],
    ['中村麗乃'	  ,{ name: '中村麗乃'	  ,birthday: '2001年9月27日'	,	home: '東京都'	,	bloodType: 'U',	height: 167,	generate: 3,	graduate: ''}],
    ['樋口日奈'	  ,{ name: '樋口日奈'	  ,birthday: '1998年1月31日'	,	home: '東京都'	,	bloodType: 'A',	height: 159,	generate: 1,	graduate: ''}],
    ['星野みなみ' ,{ name: '星野みなみ' ,birthday: '1998年2月6日'	  ,	home: '千葉県'	,	bloodType: 'B',	height: 155,	generate: 1,	graduate: ''}],
    ['堀未央奈'	  ,{ name: '堀未央奈'	  ,birthday: '1996年10月15'	  ,	home: '岐阜県'	,	bloodType: 'O',	height: 160,	generate: 2,	graduate: ''}],
    ['松村沙友理' ,{ name: '松村沙友理' ,birthday: '1992年8月27日'	,	home: '大阪府'	,	bloodType: 'B',	height: 164,	generate: 1,	graduate: ''}],
    ['向井葉月'	  ,{ name: '向井葉月'	  ,birthday: '1999年8月23日'	,	home: '東京都'	,	bloodType: 'A',	height: 152,	generate: 3,	graduate: ''}],
    ['山崎怜奈'	  ,{ name: '山崎怜奈'	  ,birthday: '1997年5月21日'	,	home: '東京都'	,	bloodType: 'B',	height: 164,	generate: 2,	graduate: ''}],
    ['山下美月'	  ,{ name: '山下美月'	  ,birthday: '1999年7月26日'	,	home: '東京都'	,	bloodType: 'O',	height: 159,	generate: 3,	graduate: ''}],
    ['吉田綾乃'	  ,{ name: '吉田綾乃'	  ,birthday: '1995年9月6日'	  ,	home: '大分県'	,	bloodType: 'A',	height: 161,	generate: 3,	graduate: ''}],
    ['与田祐希'	  ,{ name: '与田祐希'	  ,birthday: '2000年5月5日'	  ,	home: '福岡県'	,	bloodType: 'O',	height: 152,	generate: 3,	graduate: ''}],
    ['和田まあや' ,{ name: '和田まあや' ,birthday: '1998年4月23日'	,	home: '広島県'	,	bloodType: 'O',	height: 160,	generate: 1,	graduate: ''}],
    ['渡辺みり愛' ,{ name: '渡辺みり愛' ,birthday: '1999年11月1日'	,	home: '東京都'	,	bloodType: 'O',	height: 153,	generate: 2,	graduate: ''}],
    ['遠藤さくら' ,{ name: '遠藤さくら' ,birthday: '2001年10月3日'	,	home: '愛知県'	,	bloodType: 'U',	height: 160,	generate: 4,	graduate: ''}],
    ['賀喜遥香'	  ,{ name: '賀喜遥香'	  ,birthday: '2001年8月8日'	  ,	home: '栃木県'	,	bloodType: 'A',	height: 166,	generate: 4,	graduate: ''}],
    ['掛橋沙耶香' ,{ name: '掛橋沙耶香' ,birthday: '2002年11月20'	  ,	home: '岡山県'	,	bloodType: 'B',	height: 156,	generate: 4,	graduate: ''}],
    ['金川紗耶'	  ,{ name: '金川紗耶'	  ,birthday: '2001年10月31' 	,	home: '北海道'	,	bloodType: 'O',	height: 164,	generate: 4,	graduate: ''}],
    ['北川悠理'	  ,{ name: '北川悠理'	  ,birthday: '2001年8月8日'	  ,	home: '東京都'	,	bloodType: 'U',	height: 163,	generate: 4,	graduate: ''}],
    ['柴田柚菜'	  ,{ name: '柴田柚菜'	  ,birthday: '2003年3月3日'	  ,	home: '千葉県'	,	bloodType: 'A',	height: 160,	generate: 4,	graduate: ''}],
    ['清宮レイ'	  ,{ name: '清宮レイ'	  ,birthday: '2003年8月1日'	  ,	home: '埼玉県'	,	bloodType: 'O',	height: 162,	generate: 4,	graduate: ''}],
    ['田村真佑'	  ,{ name: '田村真佑'	  ,birthday: '1999年1月12日'	,	home: '埼玉県'	,	bloodType: 'A',	height: 158,	generate: 4,	graduate: ''}],
    ['筒井あやめ' ,{ name: '筒井あやめ' ,birthday: '2004年6月8日'	  ,	home: '愛知県'	,	bloodType: 'O',	height: 160,	generate: 4,	graduate: ''}],
    ['早川聖来'	  ,{ name: '早川聖来'	  ,birthday: '2000年8月24日'	,	home: '大阪府'	,	bloodType: 'A',	height: 164,	generate: 4,	graduate: ''}],
    ['矢久保美緒' ,{ name: '矢久保美緒' ,birthday: '2002年8月14日'	,	home: '東京都'	,	bloodType: 'B',	height: 152,	generate: 4,	graduate: ''}],
    ['黒見明香'	  ,{ name: '黒見明香'	  ,birthday: '2004年1月19日'	,	home: '東京都'	,	bloodType: 'O',	height: 162,	generate: 4,	graduate: ''}],
    ['佐藤璃果'	  ,{ name: '佐藤璃果'	  ,birthday: '2001年8月9日'	  ,	home: '岩手県'	,	bloodType: 'B',	height: 158,	generate: 4,	graduate: ''}],
    ['林瑠奈'	    ,{ name: '林瑠奈'	    ,birthday: '2003年10月2日'	,	home: '神奈川県',	bloodType: 'O',	height: 163,	generate: 4,	graduate: ''}],
    ['松尾美佑'	  ,{ name: '松尾美佑'	  ,birthday: '2004年1月3日'	  ,	home: '千葉県'	,	bloodType: 'O',	height: 165,	generate: 4,	graduate: ''}],
    ['弓木奈於'	  ,{ name: '弓木奈於'	  ,birthday: '1999年2月3日'	  ,	home: '京都府'	,	bloodType: 'A',	height: 165,	generate: 4,	graduate: ''}],
    ['山本穂乃香' ,{ name: '山本穂乃香' ,birthday: '1998年3月31日'	,	home: '愛知県'	,	bloodType: 'O',	height: 162,	generate: 1,	graduate: '2011年9月22日'  }],
    ['吉本彩華'	  ,{ name: '吉本彩華'	  ,birthday: '1996年8月18日'	,	home: '熊本県'	,	bloodType: 'A',	height: 147,	generate: 1,	graduate: '2011年9月22日'  }],
    ['岩瀬佑美子' ,{ name: '岩瀬佑美子' ,birthday: '1990年6月12日'	,	home: '埼玉県'	,	bloodType: 'A',	height: 153,	generate: 1,	graduate: '2012年11月18日' }],
    ['安藤美雲'	  ,{ name: '安藤美雲'	  ,birthday: '1993年5月21日'	,	home: '神奈川県',	bloodType: 'O',	height: 156,	generate: 1,	graduate: '2013年6月16日'  }],
    ['柏幸奈'	    ,{ name: '柏幸奈'	    ,birthday: '1994年8月12日'	,	home: '神奈川県',	bloodType: 'B',	height: 158,	generate: 1,	graduate: '2013年11月17日]'}],
    ['宮澤成良'	  ,{ name: '宮澤成良'	  ,birthday: '1993年10月29日'	,	home: '千葉県'	,	bloodType: 'O',	height: 166,	generate: 1,	graduate: '2013年11月17日' }],
    ['市來玲奈'	  ,{ name: '市來玲奈'	  ,birthday: '1996年1月22日'	,	home: '千葉県'	,	bloodType: 'A',	height: 153,	generate: 1,	graduate: '2014年7月21日'  }],
    ['伊藤寧々'	  ,{ name: '伊藤寧々'	  ,birthday: '1995年12月12日'	,	home: '岐阜県'	,	bloodType: 'B',	height: 148,	generate: 1,	graduate: '2014年10月19日' }],
    ['大和里菜'	  ,{ name: '大和里菜'	  ,birthday: '1994年12月14日'	,	home: '宮城県'	,	bloodType: 'O',	height: 162,	generate: 1,	graduate: '2014年12月15日' }],
    ['畠中清羅'	  ,{ name: '畠中清羅'	  ,birthday: '1995年12月5日'	,	home: '大分県'	,	bloodType: 'B',	height: 150,	generate: 1,	graduate: '2015年4月4日'   }],
    ['松井玲奈'	  ,{ name: '松井玲奈'	  ,birthday: '1991年7月27日'	,	home: '愛知県'	,	bloodType: 'O',	height: 162,	generate: 1,	graduate: '2015年5月14日'  }],
    ['永島聖羅'	  ,{ name: '永島聖羅'	  ,birthday: '1994年5月19日'	,	home: '愛知県'	,	bloodType: 'O',	height: 158,	generate: 1,	graduate: '2016年3月20日'  }],
    ['深川麻衣'	  ,{ name: '深川麻衣'	  ,birthday: '1991年3月29日'	,	home: '静岡県'	,	bloodType: 'O',	height: 162,	generate: 1,	graduate: '2016年6月16日'  }],
    ['橋本奈々未' ,{ name: '橋本奈々未' ,birthday: '1993年2月20日'	,	home: '北海道'	,	bloodType: 'B',	height: 163,	generate: 1,	graduate: '2017年2月20日'  }],
    ['中元日芽香' ,{ name: '中元日芽香' ,birthday: '1996年4月13日'	,	home: '広島県'	,	bloodType: 'O',	height: 161,	generate: 1,	graduate: '2017年11月19日' }],
    ['伊藤万理華' ,{ name: '伊藤万理華' ,birthday: '1996年2月20日'	,	home: '神奈川県',	bloodType: 'O',	height: 156,	generate: 1,	graduate: '2017年12月23日' }],
    ['川村真洋'	  ,{ name: '川村真洋'	  ,birthday: '1995年7月23日'	,	home: '大阪府'	,	bloodType: 'A',	height: 157,	generate: 1,	graduate: '2018年3月31日'  }],
    ['生駒里奈'	  ,{ name: '生駒里奈'	  ,birthday: '1995年12月29日'	,	home: '秋田県'	,	bloodType: 'AB',height: 153,	generate: 1,	graduate: '2018年5月6日'   }],
    ['斎藤ちはる' ,{ name: '斎藤ちはる' ,birthday: '1997年2月17日'	,	home: '埼玉県'	,	bloodType: 'A',	height: 166,	generate: 1,	graduate: '2018年7月16日'  }],
    ['相楽伊織'	  ,{ name: '相楽伊織'	  ,birthday: '1997年11月26日'	,	home: '埼玉県'	,	bloodType: 'O',	height: 164,	generate: 2,	graduate: '2018年7月16日'  }],
    ['若月佑美'	  ,{ name: '若月佑美'	  ,birthday: '1994年6月27日'	,	home: '静岡県'	,	bloodType: 'O',	height: 157,	generate: 1,	graduate: '2018年11月30日' }],
    ['能條愛未'	  ,{ name: '能條愛未'	  ,birthday: '1994年10月18日'	,	home: '神奈川県',	bloodType: 'A',	height: 162,	generate: 1,	graduate: '2018年12月15日' }],
    ['川後陽菜'	  ,{ name: '川後陽菜'	  ,birthday: '1998年3月22日'	,	home: '長崎県'	,	bloodType: 'O',	height: 161,	generate: 1,	graduate: '2018年12月20日' }],
    ['西野七瀬'	  ,{ name: '西野七瀬'	  ,birthday: '1994年5月25日'	,	home: '大阪府'	,	bloodType: 'O',	height: 159,	generate: 1,	graduate: '2018年12月31日' }],
    ['衛藤美彩'	  ,{ name: '衛藤美彩'	  ,birthday: '1993年1月4日'	  ,	home: '大分県'	,	bloodType: 'AB',height: 163,	generate: 1,	graduate: '2019年3月31日'  }],
    ['伊藤かりん' ,{ name: '伊藤かりん' ,birthday: '1993年5月26日'	,	home: '神奈川県',	bloodType: 'O',	height: 153,	generate: 2,	graduate: '2019年5月24日'  }],
    ['斉藤優里'	  ,{ name: '斉藤優里'	  ,birthday: '1993年7月20日'	,	home: '東京都'	,	bloodType: 'O',	height: 157,	generate: 1,	graduate: '2019年6月30日'  }],
    ['桜井玲香'	  ,{ name: '桜井玲香'	  ,birthday: '1994年5月16日'	,	home: '神奈川県',	bloodType: 'A',	height: 155,	generate: 1,	graduate: '2019年9月1日'   }],
    ['佐々木琴子' ,{ name: '佐々木琴子' ,birthday: '1998年8月28日'	,	home: '埼玉県'	,	bloodType: 'A',	height: 163,	generate: 2,	graduate: '2020年3月31日'  }],
    ['井上小百合' ,{ name: '井上小百合' ,birthday: '1994年12月14日',	home: '埼玉県'	,	bloodType: 'B',	height: 156,	generate: 1,	graduate: '2020年4月27日'  }],
  ]);

  // 配列
  private memberList : NogiMemberInfo[] = [
    { name: '乃木坂46'	,birthday: '2011年2月22日'	,	home: '乃木坂'	,	bloodType: 'U',	height: 0,	  generate: 0,	graduate: ''},
    { name: '乃木坂４６',birthday: '2011年2月22日'	,	home: '乃木坂'	,	bloodType: 'U',	height: 0,	  generate: 0,	graduate: ''},
    { name: '秋元真夏'	,birthday: '1993年8月20日'	,	home: '埼玉県'	,	bloodType: 'B',	height: 154,	generate: 1,	graduate: ''},
    { name: '生田絵梨花',birthday: '1997年1月22日'	,	home: '東京都'	,	bloodType: 'A',	height: 160,	generate: 1,	graduate: ''},
    { name: '伊藤純奈'	,birthday: '1998年11月30日'	,	home: '神奈川県',	bloodType: 'A',	height: 166,	generate: 2,	graduate: ''},
    { name: '伊藤理々杏',birthday: '2002年10月8日'	,	home: '沖縄県'	,	bloodType: 'B',	height: 154,	generate: 3,	graduate: ''},
    { name: '岩本蓮加'	,birthday: '2004年2月2日'	  ,	home: '東京都'	,	bloodType: 'B',	height: 157,	generate: 3,	graduate: ''},
    { name: '梅澤美波'	,birthday: '1999年1月6日'	  ,	home: '神奈川県',	bloodType: 'A',	height: 170,	generate: 3,	graduate: ''},
    { name: '大園桃子'	,birthday: '1999年9月13日'	,	home: '鹿児島県',	bloodType: 'O',	height: 156,	generate: 3,	graduate: ''},
    { name: '北野日奈子',birthday: '1996年7月17日'	,	home: '北海道'	,	bloodType: 'O',	height: 158,	generate: 2,	graduate: ''},
    { name: '久保史緒里',birthday: '2001年7月14日'	,	home: '宮城県'	,	bloodType: 'O',	height: 159,	generate: 3,	graduate: ''},
    { name: '齋藤飛鳥'	,birthday: '1998年8月10日'	,	home: '東京都'	,	bloodType: 'O',	height: 158,	generate: 1,	graduate: ''},
    { name: '阪口珠美'	,birthday: '2001年11月10日'	,	home: '東京都'	,	bloodType: 'A',	height: 161,	generate: 3,	graduate: ''},
    { name: '佐藤楓'   	,birthday: '1998年3月23日'	,	home: '愛知県'	,	bloodType: 'A',	height: 161,	generate: 3,	graduate: ''},
    { name: '白石麻衣'	,birthday: '1992年8月20日'	,	home: '群馬県'	,	bloodType: 'A',	height: 162,	generate: 1,	graduate: ''},
    { name: '新内眞衣'	,birthday: '1992年1月22日'	,	home: '埼玉県'	,	bloodType: 'B',	height: 165,	generate: 2,	graduate: ''},
    { name: '鈴木絢音'	,birthday: '1999年3月5日'	  ,	home: '秋田県'	,	bloodType: 'O',	height: 160,	generate: 2,	graduate: ''},
    { name: '高山一実'	,birthday: '1994年2月8日'	  ,	home: '千葉県'	,	bloodType: 'A',	height: 162,	generate: 1,	graduate: ''},
    { name: '寺田蘭世'	,birthday: '1998年9月23日'	,	home: '東京都'	,	bloodType: 'U',	height: 155,	generate: 2,	graduate: ''},
    { name: '中田花奈'	,birthday: '1994年8月6日'	  ,	home: '埼玉県'	,	bloodType: 'A',	height: 158,	generate: 1,	graduate: ''},
    { name: '中村麗乃'	,birthday: '2001年9月27日'	,	home: '東京都'	,	bloodType: 'U',	height: 167,	generate: 3,	graduate: ''},
    { name: '樋口日奈'	,birthday: '1998年1月31日'	,	home: '東京都'	,	bloodType: 'A',	height: 159,	generate: 1,	graduate: ''},
    { name: '星野みなみ',birthday: '1998年2月6日'	  ,	home: '千葉県'	,	bloodType: 'B',	height: 155,	generate: 1,	graduate: ''},
    { name: '堀未央奈'	,birthday: '1996年10月15'	  ,	home: '岐阜県'	,	bloodType: 'O',	height: 160,	generate: 2,	graduate: ''},
    { name: '松村沙友理',birthday: '1992年8月27日'	,	home: '大阪府'	,	bloodType: 'B',	height: 164,	generate: 1,	graduate: ''},
    { name: '向井葉月'	,birthday: '1999年8月23日'	,	home: '東京都'	,	bloodType: 'A',	height: 152,	generate: 3,	graduate: ''},
    { name: '山崎怜奈'	,birthday: '1997年5月21日'	,	home: '東京都'	,	bloodType: 'B',	height: 164,	generate: 2,	graduate: ''},
    { name: '山下美月'	,birthday: '1999年7月26日'	,	home: '東京都'	,	bloodType: 'O',	height: 159,	generate: 3,	graduate: ''},
    { name: '吉田綾乃'	,birthday: '1995年9月6日'	  ,	home: '大分県'	,	bloodType: 'A',	height: 161,	generate: 3,	graduate: ''},
    { name: '与田祐希'	,birthday: '2000年5月5日'	  ,	home: '福岡県'	,	bloodType: 'O',	height: 152,	generate: 3,	graduate: ''},
    { name: '和田まあや',birthday: '1998年4月23日'	,	home: '広島県'	,	bloodType: 'O',	height: 160,	generate: 1,	graduate: ''},
    { name: '渡辺みり愛',birthday: '1999年11月1日'	,	home: '東京都'	,	bloodType: 'O',	height: 153,	generate: 2,	graduate: ''},
    { name: '遠藤さくら',birthday: '2001年10月3日'	,	home: '愛知県'	,	bloodType: 'U',	height: 160,	generate: 4,	graduate: ''},
    { name: '賀喜遥香'	,birthday: '2001年8月8日'	  ,	home: '栃木県'	,	bloodType: 'A',	height: 166,	generate: 4,	graduate: ''},
    { name: '掛橋沙耶香',birthday: '2002年11月20'	  ,	home: '岡山県'	,	bloodType: 'B',	height: 156,	generate: 4,	graduate: ''},
    { name: '金川紗耶'	,birthday: '2001年10月31' 	,	home: '北海道'	,	bloodType: 'O',	height: 164,	generate: 4,	graduate: ''},
    { name: '北川悠理'	,birthday: '2001年8月8日'	  ,	home: '東京都'	,	bloodType: 'U',	height: 163,	generate: 4,	graduate: ''},
    { name: '柴田柚菜'	,birthday: '2003年3月3日'	  ,	home: '千葉県'	,	bloodType: 'A',	height: 160,	generate: 4,	graduate: ''},
    { name: '清宮レイ'	,birthday: '2003年8月1日'	  ,	home: '埼玉県'	,	bloodType: 'O',	height: 162,	generate: 4,	graduate: ''},
    { name: '田村真佑'	,birthday: '1999年1月12日'	,	home: '埼玉県'	,	bloodType: 'A',	height: 158,	generate: 4,	graduate: ''},
    { name: '筒井あやめ',birthday: '2004年6月8日'	  ,	home: '愛知県'	,	bloodType: 'O',	height: 160,	generate: 4,	graduate: ''},
    { name: '早川聖来'	,birthday: '2000年8月24日'	,	home: '大阪府'	,	bloodType: 'A',	height: 164,	generate: 4,	graduate: ''},
    { name: '矢久保美緒',birthday: '2002年8月14日'	,	home: '東京都'	,	bloodType: 'B',	height: 152,	generate: 4,	graduate: ''},
    { name: '黒見明香'	,birthday: '2004年1月19日'	,	home: '東京都'	,	bloodType: 'O',	height: 162,	generate: 4,	graduate: ''},
    { name: '佐藤璃果'	,birthday: '2001年8月9日'	  ,	home: '岩手県'	,	bloodType: 'B',	height: 158,	generate: 4,	graduate: ''},
    { name: '林瑠奈'	  ,birthday: '2003年10月2日'	,	home: '神奈川県',	bloodType: 'O',	height: 163,	generate: 4,	graduate: ''},
    { name: '松尾美佑'	,birthday: '2004年1月3日'	  ,	home: '千葉県'	,	bloodType: 'O',	height: 165,	generate: 4,	graduate: ''},
    { name: '弓木奈於'	,birthday: '1999年2月3日'	  ,	home: '京都府'	,	bloodType: 'A',	height: 165,	generate: 4,	graduate: ''},
    { name: '山本穂乃香',birthday: '1998年3月31日'	,	home: '愛知県'	,	bloodType: 'O',	height: 162,	generate: 1,	graduate: '2011年9月22日'  },
    { name: '吉本彩華'	,birthday: '1996年8月18日'	,	home: '熊本県'	,	bloodType: 'A',	height: 147,	generate: 1,	graduate: '2011年9月22日'  },
    { name: '岩瀬佑美子',birthday: '1990年6月12日'	,	home: '埼玉県'	,	bloodType: 'A',	height: 153,	generate: 1,	graduate: '2012年11月18日' },
    { name: '安藤美雲'	,birthday: '1993年5月21日'	,	home: '神奈川県',	bloodType: 'O',	height: 156,	generate: 1,	graduate: '2013年6月16日'  },
    { name: '柏幸奈'	  ,birthday: '1994年8月12日'	,	home: '神奈川県',	bloodType: 'B',	height: 158,	generate: 1,	graduate: '2013年11月17日' },
    { name: '宮澤成良'	,birthday: '1993年10月29日'	,	home: '千葉県'	,	bloodType: 'O',	height: 166,	generate: 1,	graduate: '2013年11月17日' },
    { name: '市來玲奈'	,birthday: '1996年1月22日'	,	home: '千葉県'	,	bloodType: 'A',	height: 153,	generate: 1,	graduate: '2014年7月21日'  },
    { name: '伊藤寧々'	,birthday: '1995年12月12日'	,	home: '岐阜県'	,	bloodType: 'B',	height: 148,	generate: 1,	graduate: '2014年10月19日' },
    { name: '大和里菜'	,birthday: '1994年12月14日'	,	home: '宮城県'	,	bloodType: 'O',	height: 162,	generate: 1,	graduate: '2014年12月15日' },
    { name: '畠中清羅'	,birthday: '1995年12月5日'	,	home: '大分県'	,	bloodType: 'B',	height: 150,	generate: 1,	graduate: '2015年4月4日'   },
    { name: '松井玲奈'	,birthday: '1991年7月27日'	,	home: '愛知県'	,	bloodType: 'O',	height: 162,	generate: 1,	graduate: '2015年5月14日'  },
    { name: '永島聖羅'	,birthday: '1994年5月19日'	,	home: '愛知県'	,	bloodType: 'O',	height: 158,	generate: 1,	graduate: '2016年3月20日'  },
    { name: '深川麻衣'	,birthday: '1991年3月29日'	,	home: '静岡県'	,	bloodType: 'O',	height: 162,	generate: 1,	graduate: '2016年6月16日'  },
    { name: '橋本奈々未',birthday: '1993年2月20日'	,	home: '北海道'	,	bloodType: 'B',	height: 163,	generate: 1,	graduate: '2017年2月20日'  },
    { name: '中元日芽香',birthday: '1996年4月13日'	,	home: '広島県'	,	bloodType: 'O',	height: 161,	generate: 1,	graduate: '2017年11月19日' },
    { name: '伊藤万理華',birthday: '1996年2月20日'	,	home: '神奈川県',	bloodType: 'O',	height: 156,	generate: 1,	graduate: '2017年12月23日' },
    { name: '川村真洋'	,birthday: '1995年7月23日'	,	home: '大阪府'	,	bloodType: 'A',	height: 157,	generate: 1,	graduate: '2018年3月31日'  },
    { name: '生駒里奈'	,birthday: '1995年12月29日'	,	home: '秋田県'	,	bloodType: 'AB',height: 153,	generate: 1,	graduate: '2018年5月6日'   },
    { name: '斎藤ちはる',birthday: '1997年2月17日'	,	home: '埼玉県'	,	bloodType: 'A',	height: 166,	generate: 1,	graduate: '2018年7月16日'  },
    { name: '相楽伊織'	,birthday: '1997年11月26日'	,	home: '埼玉県'	,	bloodType: 'O',	height: 164,	generate: 2,	graduate: '2018年7月16日'  },
    { name: '若月佑美'	,birthday: '1994年6月27日'	,	home: '静岡県'	,	bloodType: 'O',	height: 157,	generate: 1,	graduate: '2018年11月30日' },
    { name: '能條愛未'	,birthday: '1994年10月18日'	,	home: '神奈川県',	bloodType: 'A',	height: 162,	generate: 1,	graduate: '2018年12月15日' },
    { name: '川後陽菜'	,birthday: '1998年3月22日'	,	home: '長崎県'	,	bloodType: 'O',	height: 161,	generate: 1,	graduate: '2018年12月20日' },
    { name: '西野七瀬'	,birthday: '1994年5月25日'	,	home: '大阪府'	,	bloodType: 'O',	height: 159,	generate: 1,	graduate: '2018年12月31日' },
    { name: '衛藤美彩'	,birthday: '1993年1月4日'	  ,	home: '大分県'	,	bloodType: 'AB',height: 163,	generate: 1,	graduate: '2019年3月31日'  },
    { name: '伊藤かりん',birthday: '1993年5月26日'	,	home: '神奈川県',	bloodType: 'O',	height: 153,	generate: 2,	graduate: '2019年5月24日'  },
    { name: '斉藤優里'	,birthday: '1993年7月20日'	,	home: '東京都'	,	bloodType: 'O',	height: 157,	generate: 1,	graduate: '2019年6月30日'  },
    { name: '桜井玲香'	,birthday: '1994年5月16日'	,	home: '神奈川県',	bloodType: 'A',	height: 155,	generate: 1,	graduate: '2019年9月1日'   },
    { name: '佐々木琴子',birthday: '1998年8月28日'	,	home: '埼玉県'	,	bloodType: 'A',	height: 163,	generate: 2,	graduate: '2020年3月31日'  },
    { name: '井上小百合',birthday: '1994年12月14日'	,	home: '埼玉県'	,	bloodType: 'B',	height: 156,	generate: 1,	graduate: '2020年4月27日'  },
  ];
     
  constructor() { }

  // メンバの情報を取得
  public serchMemnber(name: string) : NogiMemberInfo | null {
    let ret : NogiMemberInfo = null
    for (let memberOne of this.memberMap) {
      if (name.indexOf(memberOne[0]) != -1) {
        ret = memberOne[1]
        break
      }
    }
    return ret
  }

  // メンバ名を抽出
  public extractMemnberName(name: string) : string[] {
    let ret : string[] = []
    for (let memberOne of this.memberMap) {
      if (name.indexOf(memberOne[0]) != -1) {
        ret.push(memberOne[0]) 
      }
    }

    return ret
  }

  // 何期生か
  public getGenerateNotGraduate(name: string) : number {
    if (this.memberMap.has(name)) {
      let memberInfo : NogiMemberInfo = this.memberMap.get(name)
      if (memberInfo.generate == 0) {
        return -1
      } else {
        if (memberInfo.graduate.length == 0) {
          return memberInfo.generate
        } else {
          return 0
        }
      }
    }
    return -1
  }
}