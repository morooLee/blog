---
title: 'QA 관점에서 바라 본 QA와 Developer 밈들'
description: 'QA와 Developer의 이해 관계를 보여주는 밈들에 대해서 QA 관점에서 가볍게 바라본 지극히 개인적인 이야기입니다.'
createdAt: '2022-02-16'
updatedAt: '2022-02-16'
coverImagePath: null
coverImageUrl: null
coverBackgroundColor: null
category: { main: 'SQA', sub: 'Etc' }
tags: ['sqa', 'meme', 'qa', 'developer', '개발자', '밈']
series: null
published: true
---

최근에 `QA와 Developer의 이해 관계` 와 관련된 밈들을 많이 보게 되었습니다.  
대부분의 밈들이 해학적으로 잘 풀어내서 공감도 많이 받고 즐겁게 봤었는데요.

그 중에 몇몇 밈들은 개발자 관점에서 그려지거나 QA 역할과는 모순된 부분들이 있어서 어떤 점이 문제로 생각되었는 지와 QA 관점에서 어떤 밈이 제일 괜찮았는지에 대해 가볍게 얘기해 보려 합니다.

<mark>
들어가기 앞서, 이 포스트의 내용은 제 관점에서 가볍게 바라본 지극히 개인적인 이야기임을 밝힙니다.
</mark>

## Meme #1 - 방탄 조끼

<div className="video-container">
  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/6s2UJBFDCoA?autoplay=0&start=25" title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="video-youtube"></iframe>
</div>

> This is the original Developper vs QA Engineer meme  
> Subscribe: https://bit.ly/2MZmvXg  
> https://www.facebook.com/lolcomediha

### 제품에 대한 파악 및 테스트 범위 산정에 대한 문제

위 영상을 보면서 제품의 목적에 대해 QA가 전혀 인지를 하지 못한다는 생각이 들었습니다.

방탄 조끼 같은 경우 피탄에 의한 주요 장기들의 치명상을 줄이는게 주 목적이라 생각합니다.  
물론 수납성과 같은 목적도 필요하고 중요하지만 이는 보조적인 성격을 띄므로 이러한 것들은 차치하고, 주 목적만을 고려한다고 하면 아래와 같다고 할 수 있습니다.

1. 조끼라는 의복으로써의 역할
2. 방탄의 성능 및 범위

**조끼라는 의복으로써의 역할**

방탄 조끼라는 이름에서 알 수 있듯이 이것은 의복중에 상의, 그 중에 조끼 형태의 의복임을 알 수 있습니다. 따라서, 의복 본연의 기능에 얼마나 충실한지도 주요 목적 중에 하나라고 생각합니다.

- 움직임에 불편함은 없는지...
- 입고 벗기가 수월한지...
- 보온, 보습 등에 문제가 없는지...

**방탄의 성능 및 범위**

방탄의 성능 및 범위가 요구사항에 적합한지

- 방탄력
- 방탄 범위
- 방탄 재질
- 방잔 무게

위의 영상에서 허벅지에 피탄이 되었다고 방탄 조끼에 결함이 있다고 할 수 있을까요?  
그리고, 허벅지에 권총을 쏜 QA는 결함을 발견한거라고 말할 수 있을까요?  
아마 대다수가 "아니오"라고 말할 듯 싶네

허벅지에 총을 쏘는 행위는(테스팅) 제품의 목적과 맞지 않으며 테스트 범위에도 벗어나는 행동으로 불필요한 인력 및 시간을 낭비하는 결과를 초래 할 뿐입니다.

### QA 관점에서의 Meme #1 - 방탄 조끼

제가 QA 관점으로 위의 상황을 토대로 밈을 다시 만든다면 허벅지에 권총을 쏘는 대신 아래와 같은 행동을 취할 것 같습니다.

- ~~대물 저격총을 꺼내들어 쏜다.~~ _(부하 테스트)_
  - 권총을 이미 손에 쥐었으므로 제외
- ~~개틀링건과 같은 기관총으로 한곳에 여러발을 쏜다.~~ _(스트레스 테스트)_
  - 권총을 이미 손에 쥐었으므로 제외
- 옆구리, 어깨와 같이 방탄에 취약해 보이는 부위에 쏜다. _(취약점 테스트)_
- 겨드랑이 주변과 같은 조끼 끝부분에 쏜다. _(경계값 테스트)_

## Meme #2 - 술집

<blockquote className="twitter-tweet"><p lang="en" dir="ltr">A QA engineer walks into a bar. Orders a beer. Orders 0 beers. Orders 99999999999 beers. Orders a lizard. Orders -1 beers. Orders a ueicbksjdhd. <br/><br/>First real customer walks in and asks where the bathroom is. The bar bursts into flames, killing everyone.</p>&mdash; Brenan Keller (@brenankeller) <a href="https://twitter.com/brenankeller/status/1068615953989087232?ref_src=twsrc%5Etfw">November 30, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>

> QA 엔지니어가 술집에 들어왔습니다.  
> 맥주를 1개 주문합니다.  
> 맥주를 0개도 주문해 봅니다.  
> 99999999999개도 주문해 봅니다.  
> 도마뱀도 주문해 보고, 맥주도 -1개 주문해 보고, #ㄸㄴㄹㅇ@$ㄴ도 주문해 봅니다.  
> 드디어 첫번째 손님이 들어왔고, 그는 화장실이 어디에 있는지 물어봤습니다.  
> 술집은 불길에 휩쌓였고, 모두 죽었습니다.

### 테스트 계획 및 전략 수립에 대한 문제

위의 글을 보면 결말에 도달하기까지 사건의 흐름 사이에 개연성이 전혀 없습니다.

이 말인 즉슨, "결함은 언제 어디서든 생각치 못한 곳에서 발생할 수 있다." 라는 뜻으로도 해석될 수 있으며 이것은 테스팅의 7가지 기본 원칙 중 하나인 `완벽한 테스팅은 불가능하다.` 에 대한 적절한 예시 일 수도 있습니다.

하지만, QA 관점에서 바라보자면 위 영상에서 실행한 테스팅 방식에 대해 의구점이 듭니다.

**테스트 계획**

- 수행한 테스트를 보면 주문에 대해서만 진행했습니다. 따라서, 테스트 계획이 잘못되었다고 생각합니다.

**테스트 전략**

- Software QA가 아닌 관점에서 보자면 0개, -1개의 주문은 불필요한 테스트로 테스트 전략을 잘못 수립했다고 판단됩니다.
- Software QA 관점에서 봐도 도마뱀(없는 메뉴로 가정) 주문이나 #ㄸㄴㄹㅇ@$ㄴ 주문은 동일한 테스트로 보여지며 이 또한 불필요한 테스트라 생각합니다.

테스트 계획 및 전략을 제대로 수립했다고 해도 `완벽한 테스팅은 없는 것` 처럼 결함은 언제 어디서든 발견될 수 있습니다.  
하지만, 이를 뒷바침 해주는 근거로 삼기에는 영상에서의 테스팅 과정이 너무 부실하다고 생각들었습니다.

### QA 관점에서의 Meme #2 - 술집

위의 글을 토대로 QA 관점으로 작성해 본다면 아래와 같을 것 같네요.

> QA 엔지니어가 술집에 들어왔습니다.  
> 맥주를 1개 주문합니다.  
> 맥주 99999999999개도 주문해 봅니다.  
> 도마뱀도 주문해 보고, 한번에 여러개 주문도 해봅니다.  
> 의자에 앉아도 보고 주방에도 들어가 보고 여기저기 기웃거리며 둘러 봅니다.  
> 드디어 첫번째 손님이 들어왔고, 그는 화장실이 어디에 있는지 물어봤습니다.  
> 그리곤 주문도 하지 않은체 나가버렸고, 그 손님은 그 술집의 첫번째이자 마지막 손님이 되었습니다.

혹은,

> QA 엔지니어가 술집에 들어왔습니다.  
> 맥주를 1개 주문합니다.  
> 맥주 99999999999개도 주문해 봅니다.  
> 도마뱀도 주문해 보고, 한번에 여러개 주문도 해봅니다.  
> 의자에 앉아도 보고 주방에도 들어가 보고 여기저기 기웃거리며 둘러 봅니다.  
> 드디어 첫번째 손님이 들어왔고, 그는 자리에 앉자마자 TV를 켰습니다.  
> TV에서는 금주령에 대한 소식을 속보로 전하고 있었고, 그 손님은 그 술집의 첫번째이자 마지막 손님이 되었습니다.

## Meme #3 - 모양 맞추기 (`BEST`)

<div className="video-container">
  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/baY3SaIhfl0?autoplay=0" title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="video-youtube"></iframe>
</div>

> All credit goes to the talented actor, Alison Burke. Check out hers  
> TikTok: https://www.tiktok.com/@tired_actor

위의 동영상을 보시면 QA가 제품의 목적 및 의도를 잘 파악하고 있다는 생각이 들었습니다.
그로 인해, 결함이 발생될 수 있는 부분을 잘 도출해 냈으며, 이를 아주 효과적으로 보여주었다고 생각합니다.

겉으로 봐서는 요구사항에 맞게 실제 작동도 되지만, 시점을 달리 하면 의도와는 전혀 다르게 작동할 수도 있다는 것을 잘 보여준 것 같습니다. (~~그리고 개발자의 반응까지도...~~)

이제까지 본 밈들 중에서 `QA와 Developer와의 이해 관계` 에 대해 제일 잘 표현했다고 느꼈던 밈입니다.

## 마치며...

모든 밈들이 재미 있었고, 공감도 많이 되었습니다.

밈이라는 것이 즐거움을 통해 공감대를 형성하다보니 다소 과장된 부분이 있는 것은 사실입니다. 그리고 저는 이를 지적하고자 본 포스트를 작성한 것도 아닙니다.  
그저 이러한 밈들을 보면서 느꼈던 생각을 글로 표현해 보고자 하였습니다.

테스팅은 결함을 발견하는 일입니다.  
그러다 보니 QA는 사용자의 입장과 부정적인 시각으로 제품을 바라봅니다.

이는 일상 생활에도 많은 영향을 끼치며,  
그러다보니 이렇게 밈에서도 문제점을 찾고 있는 **`제 자신에 대한 회고이기도 합니다.`**

## 참고한 사이트

> - Youtube: [Developper vs QA Engineer // LOL ComediHa!](https://www.youtube.com/watch?v=6s2UJBFDCoA)
> - Twitter: [@brenankeller](https://twitter.com/brenankeller/status/1068615953989087232?s=20&t=WBFGuqbflcdFYoiNwOEsEw)
> - Youtube: [Devs watching QA test the product](https://www.youtube.com/watch?v=baY3SaIhfl0)
