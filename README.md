---
title : "Smart Home Application in Lambda"
category :
    - project
tag : 
    - AWS
    - start
    - cloud computing
    - lambda
    - smart city
    - smart home
toc : true
use_math : true
---

## Introduction

> Build a Test Smart Home Application in Lambda

본 프로젝트의 주제는 클라우드 컴퓨팅(Cloud Computing) 기술의 일종인 AWS을 활용해보는 것이다. 이에 대한 시나리오로 스마트 홈서비스를 선택하였다. Lambda, S3, DB를 연동하여 프로젝트를 진행해보는 것이 이번 프로젝트의 목표이다.

## Project Design

가정에 있는 가전제품이 원격으로 조정되는 상황에 대해 가정하여 각 가전 하나를 람다 함수로 나타내고 변화가 있을 때 디비의 데이터가 변하도록 설정하였다. 데이터베이스와 Lambda, S3를 연동하여 S3에 새로운 데이터를 입력하였을 때 Lambda에 의해 특정 동작을 하여 데이터베이스의 자료가 변경된다.
여기서 데이터베이스는 DynamoDB를 활용하였다.

![project design](/images/project-module.png )
<div style="text-align: center">fig. 1 프로젝트 관계도</div>  

<br> 

기본 Application이란 모듈이 있고 각 모듈은 해당 모듈을 상속받아 구성된다. 특히 Speaker와 TV의 경우 작동 방식이 매우 유사하여 확장하여 활용하였다.

![system model](/images/project-archi.png )
<div style="text-align: center">fig. 2 프로젝트 설계도 </div>

## DB Design

### Window
 
스마트 창문으로 원격으로 창문을 여닫을 수 있다.

key | value | 기능 
--- | --- | ---
id | string | 기기의 고유 정보로 식별자 역할을 한다.
onOff | boolean | 기기의 On/Off 상태를 나타낸다. (On: true, Of: false)

### Lamp

스마트 조명으로 원격으로 전원, 모드 등을 작동시킬 수 있다.

key | value | 기능 
--- | --- | ---
id | string | 기기의 고유 정보로 식별자 역할을 한다.
onOff | boolean | 기기의 On/Off 상태를 나타낸다. (On: true, Off: false)
mode | integer | 조명의 밝기 정도를 저장한다. (기본: 0, 어둡게 : 1)

### Speaker

스마트 스피커로 주요 기능은 음악을 재생하는 것이다.

key | value | 기능 
--- | --- | ---
id | string | 기기의 고유 정보로 식별자 역할을 한다.
onOff | boolean | 기기의 On/Off 상태를 나타낸다. (On: true, Off: false)
mode | integer | 음악 실행, 중단, 일시정지의 상태를 저장한다. (0: 중단, 1: 실행, 2: 일시정지)
channel | integer | 실행 중이거나 실행 할 채널 번호를 저장한다.
mute | boolean | 음소거 실행 여부를 저장한다. (음소거: true)
volume | integer | 실행 중이거나 실행 할 음량을 저장한다.

### TV

스마트 TV로 Speaker의 모든 속성을 동일하게 사용한다.

key | value | 기능 
--- | --- | ---
id | string | 기기의 고유 정보로 식별자 역할을 한다.
onOff | boolean | 기기의 On/Off 상태를 나타낸다. (On: true, Off: false)
mode | integer | 음악 실행, 중단, 일시정지의 상태를 저장한다. (0: 중단, 1: 실행, 2: 일시정지)
channel | integer | 실행 중이거나 실행 할 채널 번호를 저장한다.
mute | boolean | 음소거 실행 여부를 저장한다. (음소거: true)
volume | integer | 실행 중이거나 실행 할 음량을 저장한다.

### AirConditioner

스마트 에어컨으로 원격으로 온도, 바람 세기, 팬의 움직임 등을 조정할 수 있다.

key | value | 기능 
--- | --- | ---
id | string | 기기의 고유 정보로 식별자 역할을 한다.
onOff | boolean | 기기의 On/Off 상태를 나타낸다. (On: true, Off: false)
mode | integer | 바람의 세기를 저장한다. (0: 보통, 1: 강함, 2: 약함)
move | boolean | 팬의 움직임 여부를 저장한다. (동작: true, 정지: false)
temp | integer | 희망 온도를 저장한다.

## Testing

### Lambda Function에 S3 연동
![lambda linking](/images/lambda-linking.png )

### Lambda Function, S3, DynamoDB
![module check](/images/check.png )

### 초기 DB 테이블
![first db table](/images/first-db.png )

### S3에 json file upload
![s3 upload](/images/s3-upload.png )

### 변경된 DB 테이블
![updated db](/images/updated-db.png )
