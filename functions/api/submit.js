export async function onRequestPost(context) {
  try {
    let input = await context.request.formData();
    const env = context.env;
    let {name, email, message} = Object.fromEntries(input);
    
    let reqBody = {
      records: [{
        fields: {
          "Name": name,
          "Email": email,
          "Message": message
        }
      }]
    };
    
    // 發送到 Airtable
    return fetch(`https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${env.AIRTABLE_TABLE_ID}`, {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        Authorization: `Bearer ${env.AIRETABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
  } catch (err) {
    console.error(err);
    return new Response('錯誤', { status: 400 });
  }
}

