import { ProductCard } from "@/components/catalog/product-card";
import { InlineNotice } from "@/components/feedback/inline-notice";
import { ContactBlock } from "@/components/marketing/contact-block";
import { HeroBanner } from "@/components/marketing/hero-banner";
import { PracticalLinksGrid } from "@/components/marketing/practical-links-grid";
import { TrustBlock } from "@/components/marketing/trust-block";
import { siteConfig } from "@/config/site";
import { mockProducts } from "@/domains/catalog/constants";

export default function HomePage() {
  return (
    <div className="bg-transparent">
      <HeroBanner />

      <section className="content-container py-12 sm:py-16">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="eyebrow">Atalhos e informacoes praticas</p>
            <h2 className="section-title">Tudo o que ajuda a cliente a decidir rapido agora fica mais visivel e mais facil de usar.</h2>
          </div>
        </div>

        <PracticalLinksGrid className="mb-6" />

        <div className="grid gap-4 lg:grid-cols-3">
          <InlineNotice
            title="WhatsApp facil de achar"
            description={`Contato principal em destaque: ${siteConfig.whatsappNumber}.`}
          />
          <InlineNotice
            tone="success"
            title="Endereco e mapa no fluxo"
            description="A cliente consegue sair do site ja sabendo onde fica e como chegar."
          />
          <InlineNotice
            tone="warning"
            title="iFood preparado sem remendo"
            description="O placeholder ja entra no layout para receber o link real depois sem refazer a interface."
          />
        </div>
      </section>

      <section className="content-container py-4 pb-16">
        <div className="mb-6 space-y-2">
          <p className="eyebrow">Produtos em destaque</p>
          <h2 className="section-title">A loja continua forte, mas agora respirando melhor e com leitura mais leve.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <TrustBlock />
      <ContactBlock />
    </div>
  );
}
