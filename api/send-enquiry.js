export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, country, message } = req.body;

  const text = `New enquiry from website:
Name: ${name}
Email: ${email}
Country: ${country || 'N/A'}
Message: ${message}`;

  try {
    const response = await fetch("https://api.africastalking.com/version1/messaging", {
      method: "POST",
      headers: {
        "apiKey": "atsk_8cfabef87abc100870ab89907c2a388c47c365599ee3a6574222697cad9e728394c1aaf9",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        username: "sandbox",
        to: "254758130962",
        message: text
      })
    });

    if (!response.ok) {
      throw new Error("Failed to send SMS");
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error: "Failed to send message" });
  }
}