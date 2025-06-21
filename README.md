# Template RECV

[網頁客戶端](https://github.com/web-tech-tw/template.inte) | 伺服器端


一個功能齊全、為敏捷開發而生的 Node.js 專案範本。

---

我們厭倦了每次開啟新專案，都要重新設定 Express、資料庫連線、身份驗證、測試環境、CORS、API 文件...？

**Template RECV** 為我們解決了這些煩惱。
這是一個「功能齊全 (batteries-included)」的專案範本，整合了現代後端服務所需的各種核心工具，讓您可以跳過繁瑣的初始設定，**專注於實現您的業務邏輯**。

## ✨ 設計理念

* **開箱即用 (Out-of-the-Box):** 只需幾個簡單指令，即可擁有一個功能完善的開發環境。
* **整合最佳實踐:** 內建測試、容器化、API 文件、CI/CD 流程，引導您採用業界優良的開發實踐。
* **高度可擴充:** 提供清晰的專案結構，您可以輕易地加入自己的業務邏輯或替換任何內建模組。

## 🛠️ 技術棧與特色 (What's Inside?)

本範本底層採用 Node.js 和 Express.js，並為您精心整合了以下生態系工具：

* **🚀 核心框架:**
    * **Express.js:** 成熟穩定的 Node.js Web 框架。
    * **CommonJS:** 擁有龐大生態系支援的模組系統。

* **🗃️ 資料庫與快取:**
    * **Mongoose:** 優雅、強大的 MongoDB ODM (物件資料模型) 工具。
    * **node-cache:** 輕量級的**程序內 (in-process)** 快取，適用於單體應用。

* **🔒 安全性與驗證:**
    * **jsonwebtoken (JWT):** 實現無狀態 (stateless) 的 API 權杖驗證。
    * **express-validator:** 強大且易於使用的請求驗證中介軟體。
    * **cors:** 輕鬆處理跨來源資源共用設定。

* **🛠️ 開發與除錯:**
    * **Nodemon:** 監控程式碼變更並自動重啟伺服器，提升開發效率。
    * **dotenv:** 透過 `.env` 檔案輕鬆管理環境變數。

* **🧪 自動化測試:**
    * **Mocha:** 靈活的 JavaScript 測試框架。

* **📄 API 文件:**
    * **Swagger (OpenAPI):** 透過程式碼註解自動生成互動式 API 文件。

* **📦 容器化與部署:**
    * **Dockerfile:** 內建優化的容器映像檔設定，方便部署。
    * **VScode DevContainer:** 提供一致的容器化開發環境。
    * **GitHub Actions:** 預設 CI/CD 工作流程，自動化測試與映像檔建置。

## 系統需求

* **Node.js:** `v20.x` 或更高版本。
* **MongoDB:** 需要一個可用的 MongoDB 資料庫實例。

## 🚀 快速開始 (Getting Started)

只需五個步驟，即可啟動您的專案：

1.  **使用此範本建立新專案**
    點擊頁面右上角的 `Use this template` > `Create a new repository`。

2.  **複製 (Clone) 您的新專案至本地**
    ```sh
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
    cd YOUR_REPOSITORY
    ```

3.  **安裝相依套件**
    ```sh
    npm install
    ```

4.  **設定環境變數**
    複製範例設定檔，並根據您的環境（特別是資料庫連線 `MONGODB_URI`）進行修改。
    ```sh
    cp .env.sample .env
    ```

5.  **啟動開發模式！**
    ```sh
    npm run dev
    ```
    現在，您的後端伺服器已在 `http://127.0.0.1:3000` (預設) 啟動，並會在您修改程式碼時自動重載。

## 📜 常用指令 (Available Scripts)

| 指令 | 說明 |
| :--- | :--- |
| `npm run dev` | 啟動開發模式 (使用 nodemon)。 |
| `npm start` | 啟動正式產品模式。 |
| `npm test` | 執行所有自動化測試。 |
| `npm run lint` | 檢查程式碼風格。 |
| `npm run lint:fix` | 自動修復可修正的程式碼風格問題。 |
| `npm run export-openapi` | 將 Swagger API 文件匯出成 JSON 檔案。 |

## 💡 關於「微服務」的說明

您可能會注意到本專案的原始描述中提到了「微服務」。為了避免混淆，我們在此做出澄清：

本專案是一個**高效的單一服務開發範本**。您可以利用它來建構一個**大型微服務系統中的「某一個」服務**。

然而，本範本的設計是**單體式 (Monolithic)** 的，它本身**不包含**建構一個完整微服務**系統**所需的服務發現、服務間通訊 (如 Message Queue)、分散式追蹤等機制。其核心限制「單機模式」也與微服務強調的「分散式」和「可擴展性」有所不同。

如果您正在尋找一個能夠快速啟動、功能完整的**單一後端應用**，那麼本範本將是您的絕佳選擇。

## 📄 開放原始碼授權

本專案採用 **MIT License** 授權。

---

&copy; [Taiwan Web Technology Promotion Organization](https://web-tech.tw)
