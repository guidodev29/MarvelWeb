import crypto from "crypto";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const endpoint = searchParams.get("endpoint") || "characters";
  const limit = searchParams.get("limit") || "20";
  const offset = searchParams.get("offset") || "0";
  const id = searchParams.get("id");

  // Filtrar solo los filtros personalizados
  const filters = new URLSearchParams(searchParams);
  filters.delete("endpoint");
  filters.delete("limit");
  filters.delete("offset");
  filters.delete("id");

  const ts = Date.now().toString();
  const publicKey = process.env.MARVEL_PUBLIC_KEY;
  const privateKey = process.env.MARVEL_PRIVATE_KEY;
  const hash = crypto.createHash("md5").update(ts + privateKey + publicKey).digest("hex");

  const baseUrl = `https://gateway.marvel.com/v1/public`;
  let url = `${baseUrl}/${endpoint}${id ? `/${id}` : ""}?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

  const filterString = filters.toString();
  if (filterString) {
    url += `&${filterString}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      return new Response(JSON.stringify(data), { status: res.status });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
