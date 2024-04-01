export async function POST(request: Request) {
    const data = await request.json();

    const response = await fetch(
        "https://api-inference.huggingface.co/models/openai-community/openai-gpt",
        {
            headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}` },
            method: "POST",
            body: JSON.stringify({ "inputs": `${data.text}` }),
        }
    )
        .then(async (res) => {
            const data = await res.json()
            return { generated_text: data[0]?.generated_text?.split('"')[0] }
        })
        .catch(err => console.log("Error : ", err))

    return Response.json(response, {
        status: 200
    });
}
