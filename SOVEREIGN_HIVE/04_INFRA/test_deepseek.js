require('dotenv').config();
const { DEEPSEEK_API_KEY, DEEPSEEK_BASE_URL } = process.env;

async function testDeepSeek() {
  if (!DEEPSEEK_API_KEY) {
    console.error("❌ DEEPSEEK_API_KEY is not set in .env");
    process.exit(1);
  }

  console.log("📡 Testing DeepSeek API Connection...");
  try {
    const response = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: "Hello, verify Sovereign Hive connection." }],
        max_tokens: 50
      })
    });

    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      console.log("✅ DeepSeek Online:", data.choices[0].message.content);
    } else {
      console.error("❌ DeepSeek Error:", data);
    }
  } catch (err) {
    console.error("❌ Connection Failed:", err.message);
  }
}

testDeepSeek();
