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
        // Use process.env if you set it up in Vercel, otherwise paste the NEW key here for a quick test
        "apiKey": "atsk_a4a3fd4d9f1a9ecf44a91ee5f315df4ee4f2fef3a1fd20b8fcfec206b484625b4852f3c7", 
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        username: "sandbox", // Double check this matches your dashboard exactly
        to: "254758130962",
        message: text
      })
    });

    const result = await response.text(); // Capture the actual error message from AT
    
    if (!response.ok) {
      console.error("AfricasTalking Error:", result);
      return res.status(response.status).json({ error: result });
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: error.message });
  }
}