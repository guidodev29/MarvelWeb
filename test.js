import fetch from 'node-fetch';
import crypto from 'crypto';

const ts = Date.now().toString();
const publicKey = "ff61696962bd932de5d15ef152fb6e2f";
const privateKey = "927b46ce3ac71b2a77f9d48798b53ff39f75b3f2";

const hash = crypto.createHash("md5").update(ts + privateKey + publicKey).digest("hex");

const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

console.log("➡️ URL:", url);

fetch(url)
  .then(res => res.json())
  .then(data => console.log("✅ DATA:", data))
  .catch(err => console.error("❌ ERROR:", err));
