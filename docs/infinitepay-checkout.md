# InfinitePay Checkout Integrado

Este projeto usa a InfinitePay como provider do fluxo de pagamento do agendamento.

Fonte oficial usada para esta adaptacao:
- [Checkout da InfinitePay](https://ajuda.infinitepay.io/pt-BR/articles/10766888-como-usar-o-checkout-da-infinitepay)
- [Documentacao interativa do Checkout](https://www.infinitepay.io/checkout)

## Variaveis de ambiente

Obrigatorias:

- `INFINITEPAY_HANDLE`
  Motivo: identifica a conta da InfinitePay no endpoint oficial do checkout integrado.

- `APP_URL`
  Motivo: define a `redirect_url` usada no retorno para `/agenda?payment_intent=...`.

Obrigatoria para webhook publico:

- `INFINITEPAY_WEBHOOK_PUBLIC_URL`
  Motivo: a InfinitePay precisa alcancar uma URL publica para confirmar o pagamento de forma assincrona.

Opcionais:

- `INFINITEPAY_API_BASE_URL`
  Default: `https://api.infinitepay.io`
  Motivo: facilita testes e futuros ambientes sem reescrever o adapter.

- `INFINITEPAY_WEBHOOK_SECRET`
  Motivo: camada extra do proprio app para endurecer o webhook via token na URL.
  Observacao: isso nao substitui assinatura oficial do provider. A documentacao publica atual nao descreve um header de assinatura equivalente ao do Mercado Pago.

## Endpoints oficiais usados

- Criar checkout:
  `POST https://api.infinitepay.io/invoices/public/checkout/links`

- Consultar pagamento:
  `POST https://api.infinitepay.io/invoices/public/checkout/payment_check`

## Mapeamento no dominio

- `order_nsu`: usamos o `payment.id` interno
- `transaction_nsu`: persiste em `providerPaymentId`
- `invoice_slug` / `slug`: persiste em `providerCheckoutId`

## Fluxo atual

1. O backend cria um link do checkout integrado da InfinitePay.
2. O cliente vai para a URL retornada pelo provider.
3. O retorno da InfinitePay cai em `/agenda` com `payment_intent`, `transaction_nsu` e `slug`.
4. O backend reconcilia o pagamento por `payment_check` e/ou webhook.
5. O dominio de `appointments` continua sendo a fonte de verdade das transicoes operacionais.

## Webhook local

Com a app rodando em `localhost:3000`:

```bash
npm run webhook:tunnel
```

O script:

- abre um tunel publico
- grava `INFINITEPAY_WEBHOOK_PUBLIC_URL=<url>/api/webhooks/payments` em `.env.local`
- deve ficar aberto durante os testes

## Importante

- O frontend nao precisa de `Public Key` no fluxo atual.
- A documentacao publica da InfinitePay mostra um checkout redirecionado por link, nao um fluxo client-side com chave publica.
- Se a InfinitePay passar a exigir autenticacao adicional alem do `handle`, o adapter pode absorver isso sem mudar a UI ou a state machine.
