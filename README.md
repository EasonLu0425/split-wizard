# Split Wizard 分帳魔法師

與朋友出遊卻因為分帳事宜鬧得不愉快嗎? 讓分帳魔法師來幫你搞清楚來龍去脈! 
本軟體為Split Wizard 前端Web App 程式，使用React為框架，並運用各項功能完成分帳難題!
後續會持續更新，並且部屬到伺服器上，出門外出旅遊就可以使用了!

## 核心功能: 
  - 可註冊帳號並且登入，透過JWT Token登入驗證機制確保安全性，密碼透過bycrypt加密，安全不遺漏!
  - 可創建多個行程並邀請同伴進入群組，並發出通知，讓同伴知道我們是一夥的!
  - 可於行程中建立共同消費的項目，讓共同消費的項目清清楚楚，紀錄支出者及使用者有哪些人。
  - 編輯或刪除錯誤的消費項目，不讓輸入錯誤的項目金額困擾著你!
  - 行程完美結束，該結算了，分帳小幫手幫你自動算好錢，並且可查看明細，讓使用者體會不再一筆一筆計算到頭痛!
  - 確認都支付完成可以封存行程，讓過去的行程保留在美好的記憶中
  - 不論新增、刪除、更改項目，都有即時通知所有旅伴，公開透明不讓小人作祟。
  - 支付完成可記錄於app中，讓支付者知道你已經付錢了，不再為有沒有還錢吵架!

## 如何在本地端運行?
### 此專案需搭配後端伺服器共同運行:
運行環境擇一使用即可。
- JS Express 後端Git 連結: https://github.com/EasonLu0425/split-wizard
- Java Spring-Boot 後端Git 連結: https://github.com/PH010546/Split-Wizard-Spring-Boot


1. 先將專案clone到本地端，後端程式也必須安裝完成。
```
git clone https://github.com/EasonLu0425/split-wizard.git
```
3. 安裝此專案套件
```
npm install
```
3. 啟用專案
```
npm run start
```
4. 進入 http://localhost:3000/splitWizard/login 開始你的旅程吧!

## React 套件說明如下:
## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
