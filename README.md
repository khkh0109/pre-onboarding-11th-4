# 4주차 과제: 검색창 구현 

## 페이지 
|검색창|
|:---:|
|![검색창](https://github.com/khkh0109/frontend-mentor-challenges/assets/77181642/a665bfd8-b922-48a4-bab3-491f7af0d4a5)|

<br/>

## 기술스택 
* TypeScript
* React
* tailwindcss

<br/>

## 설치 및 실행
```
$ npm install
$ npm start
```

## 구현목록 
* 검색창
* 검색어 추천 기능
* 캐싱

### API 호출별 로컬 캐싱 구현 
* 동일한 검색어 api 요청을 줄이기 위해 Cache Storage에 API 호출 별 데이터를 저장함 
* 사용자가 검색어를 입력하면 api 요청을 보내는데, api 요청 전 CacheStorage 메서드 중 `match()`를 사용해서 Cache Storage에 동일한 요청이 있는지 확인함
  * 만약 있고 만료일이 지나지 않았으면 Cache Storage에 있는 데이터를 보여줌
  * 없으면 api 요청 후 데이터를 Cache Storage에 `put()` 메서드를 사용해 만료일과 함께 저장함
  * Cache Storage에 데이터가 있지만 만료일이 지났으면 `delete()` 메서드를 사용해 삭제 후 다시 api 요청을 보냄 

### API 호출 횟수 줄이기 
* 사용자가 검색어를 입력할때는 api 호출을 하지 않고, 검색어 입력 후 일정 시간이 지났으면 api를 호출하는 방식으로 요청 횟수를 줄이려고 함 
* 짧은 시간동안 이벤트가 연속해서 발생하면 이벤트를 호출하지 않고, 일정 시간 이후 이벤트를 한 번만 호출하기 위해 디바운스를 사용했음
* `setTimeout()`을 사용해서 디바운스 구현
  * `setTimeout()`은 타이머 id를 반환함
  * 이벤트 핸들러를 호출했는데 만약 타이머 id가 있으면 `clearTimeout()`을 사용해서 타이머를 취소함
  * 타이머 id가 없으면 `setTimeout()`을 실행시킴 

### 키보드 방향키로 추천 검색어 이동하기 
* `ul`의 자식 요소로 `li` 태그가 있다는 점을 이용해 구현함
* `useState`로 `li`의 인덱스 숫자와 비교할 숫자를 관리함 (liIndex)
* `input`에서 `onKeyDown` 이벤트가 발생할때 누른 키가 ArrowUp이면 liIndex를 하나씩 빼고, ArrowDown이면 하나씩 더함
* 만약 liIndex가 `li`의 인덱스와 같다면 배경 색을 회색으로 바꿈 


