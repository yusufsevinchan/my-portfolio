export const handler = async (event) => {
    console.log("Event received:", event);

    // CORS kontrolü ile sadece belirli domainlerin bu fonksiyonu kullanmasına izin ver
    const allowedOrigins = ["chrome-extension://gmpkpoccbompnndpfkijbcpgjaenekla"];
    const origin = event.headers.origin;

    console.log("Origin:", origin);

    if (!allowedOrigins.includes(origin)) {
        console.log("Origin not allowed:", origin);
        return {
            statusCode: 403,
            body: JSON.stringify({ message: "Erişim engellendi" }),
        };
    }

    // CORS kontrolü başarılı ise, keyleri döndür
    const keys = {
        GEOAPIFY_API_KEY: process.env.GEOAPIFY_API_KEY,
        LOCATIONIQ_API_KEY: process.env.LOCATIONIQ_API_KEY,
        OPENWEATHERMAP_API_KEY: process.env.OPENWEATHERMAP_API_KEY,
    };

    console.log("Keys:", keys);

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
