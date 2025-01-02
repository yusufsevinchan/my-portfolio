export const handler = async (event) => {
  // CORS kontrolü ile sadece belirli domainlerin bu fonksiyonu kullanmasına izin ver
  const allowedOrigins = ["chrome-extension://gmpkpoccbompnndpfkijbcpgjaenekla"];
  const origin = event.headers.origin;

  if (!allowedOrigins.includes(origin)) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: "Erişim engellendi" }),
    };
  }

  // CORS kontrolü başarılı ise, keyleri döndür
  const keys = {
    geoapifyApiKey: process.env.GEOAPIFY_API_KEY,
    locationiqApiKey: process.env.LOCATIONIQ_API_KEY,
    openWeatherApiKey: process.env.OPENWEATHERMAP_API_KEY,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(keys),
  };
};
