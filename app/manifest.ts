import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pet Shop Laikão",
    short_name: "Laikão",
    description: "Plataforma premium de agenda, loja e operação para pet shop.",
    start_url: "/",
    display: "standalone",
    background_color: "#170723",
    theme_color: "#170723",
    lang: "pt-BR",
    icons: []
  };
}
