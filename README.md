# Template RECV

[網頁客戶端](https://github.com/web-tech-tw/template.inte) | 伺服器端

一個小型卻強大的微服務框架。 A tiny but powerful microservice framework.

本系統為本組織的通用伺服器端範本，為敏捷開發而生。提供了一個簡單的架構，讓開發者可以快速開發出一個微服務。

本系統架構預設為 **單機模式** 設計。若有需求可自行擴充修改為 **分散式模式**。

## 系統架構

本系統採用 node.js 打造，使用 express.js 作為基礎框架，並擴充了許多功能。

推薦運行於 `node.js 18` 以上版本。自帶 docker 範本，可快速部署。

- 基於 express.js 擴充的微服務框架，可相容 express.js 的所有功能及生態系統。
- 內建 node-cache 作為快取系統，可快速存取資料。
- 內建 mongoose 作為資料庫系統，可快速存取資料庫。
- 自帶 GitHub Actions 範本，可快速進行自動化測試、組建容器、部署容器等功能。
- 具有快速驗證、快速授權、快速存取資料庫、快速存取快取等功能。
- 具有快速開發、快速測試、快速部署等功能。
- 高擴充性，可自行擴充功能。

## 系統設定

### 安裝相依套件

本專案使用 Node.js 作為開發環境，請先安裝 Node.js。

該指令會安裝專案所需的相依套件。

```sh
npm install
```

### 自動化測試

本專案採用 Mocha 作為自動化測試框架。

該指令會執行所有測試案例。

```sh
npm run test
```

### 開發除錯模式

本專案採用 Nodemon 作為開發除錯工具。

該指令會啟動伺服器，並在程式碼變更時自動重啟伺服器。

```sh
npm run dev
```

### 正式產品模式

該指令會啟動伺服器。

```sh
npm start
```

## 開放原始碼授權

本專案採用 MIT 開放原始碼授權。

詳細可參閱 [LICENSE](LICENSE) 檔案。

---

&copy; [Taiwan Web Technology Promotion Organization](https://web-tech.tw)
