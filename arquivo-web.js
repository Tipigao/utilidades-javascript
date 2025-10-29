
/**
 * Baixa imagens de um site por um seletor css.
 */
(async () => {
  // 🔹 1. Carrega a biblioteca JSZip dinamicamente`para gerar um pacote ZIP das imagens
  if (typeof JSZip === "undefined") {
    await import("https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js");
  }

  // 🔹 2. Seleciona as imagens da página por um seletor CSS
  const imagens = Array.from(document.querySelectorAll("img"));
  const urls = [...new Set(imagens.map(img => img.src.replace(/\?.+/gi, '')))];

  // 🔹 3. Cria o ZIP
  const zip = new JSZip();

  console.log(`Encontradas ${urls.length} imagens.`);

  for (const [i, url] of urls.entries()) {
    try {
      const resposta = await fetch(url);
      const blob = await resposta.blob();
      const nomeArquivo = `imagem_${i + 1}${url.endsWith(".png") ? ".png" : ".jpg"}`;
      zip.file(nomeArquivo, blob);
      console.log(`✅ Adicionada: ${nomeArquivo}`);
    } catch (erro) {
      console.error(`❌ Falha ao obter ${url}`, erro);
    }
  }

  // 🔹 4. Gera o ZIP final
  const conteudoZip = await zip.generateAsync({ type: "blob" });

  // 🔹 5. Cria um link para baixar o ZIP
  const link = document.createElement("a");
  link.href = URL.createObjectURL(conteudoZip);
  link.download = "imagens.zip";
  link.click();
  URL.revokeObjectURL(link.href);

  console.log("🎉 ZIP gerado e download iniciado!");
})();