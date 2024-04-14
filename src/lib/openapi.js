import axios from "axios"; // ES6のインポートスタイルを使用

class OpenapiClient {
  constructor() {
    this.apiKey = process.env.REACT_APP_OPEN_API_KEY; // 環境変数からAPIキーを取得
  }

  async completion(messages) {
    const requestData = {
      model: "gbt-3.5-turbo",
      messages
    };

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        });

      // APIからのレスポンスデータ構造に基づいて適切にデータを取得
      return response.data.choices[0].message; // .contentを削除（response.data.choices[0].messageが正しい形式である場合）
    } catch (error) {
      console.error("Error during API call:", error);
      return null; // エラーが発生した場合はnullを返すか、適切なエラーハンドリングを行う
    }
  }
}

const openai = new OpenapiClient();

export default openai;
