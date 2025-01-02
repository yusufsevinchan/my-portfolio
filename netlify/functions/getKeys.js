export const handler = async (event) => {
  // CORS kontrolü ile sadece belirli domainlerin bu fonksiyonu kullanmasına izin ver
  const allowedOrigins = [
    "chrome-extension://gmpkpoccbompnndpfkijbcpgjaenekla",
  ];
  const origin = event.headers.origin;

  // OPTIONS request ise CORS kontrolü yapma
  if (event.httpMethod === "OPTIONS") {
    if (allowedOrigins.includes(origin)) {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
      },
        body: JSON.stringify({ message: "CORS başarılı" }),
      };
    } else {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: "Cors başarısız" }),
      };
    }
  }

  // CORS kontrolü başarısız ise, erişimi engelle
  if (!allowedOrigins.includes(origin)) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        error: "Erişim engellendi: Origin izinli değil.",
      }),
    };
  }

  // CORS kontrolü başarılı ise, keyleri döndür
  const keys = {
    GEOAPIFY_API_KEY: process.env.GEOAPIFY_API_KEY,
    LOCATIONIQ_API_KEY: process.env.LOCATIONIQ_API_KEY,
    OPENWEATHERMAP_API_KEY: process.env.OPENWEATHERMAP_API_KEY,
  };

  if (
    !keys.GEOAPIFY_API_KEY ||
    !keys.LOCATIONIQ_API_KEY ||
    !keys.OPENWEATHERMAP_API_KEY
  ) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "API key bulunamadı" }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      message: "API Keys erişimi başarılı",
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify(keys),
  };
};
