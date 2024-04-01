export async function POST(request: Request) {
    const data = await request.json();

    const result = await fetch(
        "https://api-inference.huggingface.co/models/facebook/nllb-200-distilled-1.3B",
        {
            method: "POST",
            headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}` },
            body: JSON.stringify({ inputs: `${data.text}`, parameters: { src_lang: "eng_Latn", tgt_lang: "prs_Arab" } })
        }
    )
        .then(res => res.json())
        .catch(err => console.log("Error : ", err))

    return Response.json(result, {
        status: 200
    });
}
