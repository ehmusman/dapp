import dotenv from "dotenv";

dotenv.config();

const fetchNgrokUrl = async (retries: number = 5, delay: number = 5000): Promise<string> => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(process.env.NGROK_TUNNEL!);
      if (res.ok) {
        const data = await res.json();
        if (data.tunnels && data.tunnels.length > 0) {
          return data.tunnels[0].public_url;
        }
      }
    } catch (error) {
      console.error("Error fetching ngrok URL, retrying...", error);
    }
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  throw new Error("Failed to fetch ngrok URL after several attempts.");
};


const init = async () => {
  try {
    const publicUrl = await fetchNgrokUrl();
    const botSetEndPoint = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/setWebhook?url=${publicUrl}/api/data/save/bot${process.env.TELEGRAM_BOT_TOKEN}`;
    const tgRes = await fetch(botSetEndPoint, { method: "POST" });
    const tgData = await tgRes.json();
    console.table({...tgData, publicUrl});
  } catch (error) {
    throw new Error("Error in setting webhook. please try again later");
  }
};
init();

