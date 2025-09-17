export const handler = async (event) => {
  // Uzantı ID'sini (origin) al
  const origin =
    event.headers.origin || event.headers.Origin || event.headers.referer || "";

  // Proje yapılandırması
  const projectConfig = {
    "chrome-extension://gcgpnfhacjjppkbdbpicobofgbfnjalj": {
      projectType: "weather",
      name: "Weather Extension (Test)",
      keyPrefix: "WEATHER",
    },
    "chrome-extension://dpnppkohaamjanddepocpipmjmlmobbp": {
      projectType: "weather",
      name: "Weather Extension (Production)",
      keyPrefix: "WEATHER",
    },
    "chrome-extension://dhllapabilifefloclfigcgmidpjfofc": {
      projectType: "prayer",
      name: "Prayer Times Extension (Test)",
      keyPrefix: "PRAYER",
    },
  };

  const allowedOrigins = Object.keys(projectConfig);

  // CORS: Sadece tanımlı uzantı ID'leri erişebilsin
  if (!allowedOrigins.includes(origin)) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        error: "Erişim engellendi: Origin izinli değil.",
      }),
    };
  }

  // OPTIONS isteği ise CORS başlıklarını döndür
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ message: "CORS başarılı" }),
    };
  }

  // Proje tipine göre anahtarları hazırla
  const config = projectConfig[origin];
  let keys = {};

  if (config.projectType === "weather") {
    keys = {
      GEOAPIFY_API_KEY: process.env.WEATHER_GEOAPIFY_API_KEY,
      LOCATIONIQ_API_KEY: process.env.WEATHER_LOCATIONIQ_API_KEY,
      OPENWEATHERMAP_API_KEY: process.env.WEATHER_OPENWEATHERMAP_API_KEY,
    };
  } else if (config.projectType === "prayer") {
    keys = {
      GEOAPIFY_API_KEY: process.env.PRAYER_GEOAPIFY_API_KEY,
      LOCATIONIQ_API_KEY: process.env.PRAYER_LOCATIONIQ_API_KEY,
      OPENWEATHERMAP_API_KEY: process.env.PRAYER_OPENWEATHERMAP_API_KEY,
    };
  }

  // Anahtarlar eksikse hata döndür
  const missingKeys = Object.values(keys).some((v) => !v);
  if (missingKeys) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "API key bulunamadı" }),
    };
  }

  // Başarılı yanıt
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify(keys),
  };
};
