/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request, env, ctx) {
    // URL dari Google Apps Script
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbxVkqmJ60yeB-Evb_9EpzB2RqHLMcjyBUcj0qu4XudKzfCXS2SWQigDpyavC1Jsg4fb/exec';

    // Ambil konten dari URL tersebut
    const response = await fetch(scriptUrl);

    // Periksa apakah respons berhasil
    if (!response.ok) {
      return new Response('Error fetching content', { status: 500 });
    }

    // Ambil body respons
    const content = await response.text();

    // Tambahkan tag verifikasi Pinterest ke dalam konten
    const pinterestMetaTag = '<meta name="p:domain_verify" content="47016700309ddf5b097603dbede60c2d"/>';
    const modifiedContent = content.replace(
      '</head>',
      `${pinterestMetaTag}</head>`
    );

    // Kembalikan konten yang telah dimodifikasi sebagai respons
    return new Response(modifiedContent, {
      headers: {
        'Content-Type': 'text/html', // Ganti sesuai dengan tipe konten jika diperlukan
        'Cache-Control': 'no-cache', // Menghindari cache untuk memastikan Pinterest mendapatkan versi terbaru
        'Access-Control-Allow-Origin': '*', // Pastikan CORS diizinkan untuk akses
      }
    });
  },
};
