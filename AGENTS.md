# AGENTS.md — Pet Shop Laikão

## 1) Missão do projeto

Construir do zero um site/plataforma premium para o **Pet Shop Laikão**, com aparência e ambição de marca grande no nível de **Petz / Cobasi**, mas com identidade própria, forte presença mobile, PWA, agenda online, e-commerce, automações e admin robusto.

Este projeto **não** deve ser tratado como “site simples de pet shop”.  
A referência de produto é de **plataforma comercial completa**, escalável, intuitiva, visualmente forte e operacionalmente confiável.

---

## 2) Regra principal

**Não entregar soluções “mais ou menos”, genéricas, improvisadas ou superficiais.**

Toda decisão deve priorizar:

1. **experiência mobile excelente**
2. **clareza de navegação**
3. **conversão**
4. **facilidade operacional para a dona**
5. **base escalável para crescimento**
6. **acabamento visual profissional**
7. **consistência ponta a ponta**
8. **zero gaps óbvios entre front, backend, pagamentos, agenda, admin e notificações**

Se houver dúvida entre “rápido” e “bem feito”, priorizar **bem feito**, com arquitetura correta.

---

## 3) Contexto da marca

### Nome
**Pet Shop Laikão**

### Identidade atual
Usar o logo fornecido como ponto de partida.

### Direção de marca desejada
O negócio hoje é pequeno, mas o site deve posicionar a marca como **grande, confiável, profissional, organizada e aspiracional**.

### Sensação desejada
- pet shop completo
- confiável
- amigável
- profissional
- fácil de usar
- forte no celular
- visual polido
- moderno
- acolhedor sem parecer amador
- premium popular: acessível, mas muito bem resolvido

---

## 4) Direção visual obrigatória

### Base visual
- **fundo roxo** como cor estrutural da marca/site
- identidade forte, viva e memorável
- visual moderno, limpo e comercial
- aparência de empresa consolidada

### O visual deve evitar
- cara de template barato
- one page improvisada
- excesso de informação bagunçada
- layout “quadradão” sem respiro
- aparência infantil demais
- cores jogadas sem sistema
- componentes inconsistentes
- UX fraca no celular
- páginas quebradas ou mal pensadas

### O visual deve buscar
- contraste bom
- leitura fácil
- botões claros
- CTAs fortes
- cards bonitos
- fotos e banners bem valorizados
- hierarquia clara
- experiência fluida no touch
- sensação de loja séria e grande

---

## 5) Arquitetura do produto

O projeto deve ser **multi-page / multi-route**, e **não one page**.

Estruturar como plataforma com rotas claras.

### Rotas públicas mínimas
- `/` — Home
- `/servicos` — serviços (banho, tosa, etc.)
- `/agenda` — agendamento online
- `/produtos` — vitrine / catálogo / loja
- `/produto/[slug]` — página individual de produto
- `/sobre`
- `/contato`
- `/carrinho`
- `/checkout`
- `/minha-conta` (se houver login cliente)
- `/politicas` ou rotas separadas para termos, privacidade, trocas, etc.

### Rotas administrativas mínimas
- `/admin`
- `/admin/dashboard`
- `/admin/agendamentos`
- `/admin/pedidos`
- `/admin/produtos`
- `/admin/clientes`
- `/admin/servicos`
- `/admin/calendario`
- `/admin/cupons`
- `/admin/notificacoes`
- `/admin/configuracoes`
- `/admin/banners`
- `/admin/financeiro` (se possível)
- `/admin/automacoes`

---

## 6) Objetivos de negócio

O sistema deve resolver ao mesmo tempo:

### A) Presença institucional forte
O site deve fazer o pet shop parecer sério e grande.

### B) Conversão em serviços
O cliente deve conseguir:
- ver serviços
- entender preços/regras
- consultar agenda
- escolher data e horário
- pagar 50% ou 100% no ato
- receber confirmação clara

### C) Conversão em produtos
O cliente deve conseguir:
- navegar por categorias
- filtrar produtos
- ver detalhes
- adicionar ao carrinho
- comprar com fluxo claro e rápido

### D) Operação simples para a dona
A mãe da usuária precisa conseguir usar o admin sem sofrer.

### E) Relacionamento e automação
O sistema deve avisar automaticamente sobre:
- novo agendamento
- nova venda
- mudança de status
- confirmação de pagamento
- lembretes operacionais

---

## 7) Funcionalidades obrigatórias

## 7.1 Home
A home deve ser forte, comercial e clara.

Precisa ter, no mínimo:
- hero/banner principal
- destaque de serviços
- destaque de produtos
- CTA para agendamento
- prova de confiança / diferenciais
- atalhos rápidos
- bloco de contato / WhatsApp
- chamada para promoções se houver
- navegação intuitiva

A home não deve ser confusa nem excessivamente longa.

---

## 7.2 Agenda online
A agenda é uma das partes mais importantes do produto.

### Requisitos obrigatórios
- calendário mensal visível para o cliente
- opção de alternar visualização para **mensal / semanal / diária**
- exibição de datas e horários disponíveis
- bloqueio de horários indisponíveis
- fluxo simples e intuitivo
- mobile excelente
- confirmação visual clara de data/hora escolhida

### Fluxo esperado
1. cliente escolhe serviço
2. escolhe pet / informações necessárias
3. escolhe data
4. escolhe horário
5. vê resumo
6. escolhe forma de pagamento
7. paga 50% ou 100%
8. recebe confirmação
9. mãe recebe e-mail e admin é atualizado

### Regras desejáveis
- configurar duração por serviço
- configurar intervalos
- bloquear dias/horários
- limite de encaixes por período
- reagendamento
- cancelamento com regras
- observações do cliente
- confirmação do pet e tutor
- histórico de agendamentos

---

## 7.3 Pagamento para agendamento
O site deve permitir pagar:

- **50% via Pix** para reservar
- **100% via Pix**
- **cartão de crédito**
- idealmente possibilidade de pagar total no cartão também

### Requisitos
- pagamento integrado ao fluxo do agendamento
- não separar agenda de pagamento de forma confusa
- confirmação clara
- falha de pagamento bem tratada
- status no admin
- status para o cliente
- registro do valor pago e restante pendente quando for 50%

### Regra operacional
Se o cliente pagar 50%, o sistema deve marcar que:
- o horário foi reservado
- existe saldo restante
- isso precisa aparecer no admin

---

## 7.4 Loja / vitrine de produtos
A loja deve ser real, não só catálogo.

### Requisitos
- grid de produtos bonito e responsivo
- busca
- filtros
- categorias
- página individual de produto
- preço
- estoque
- fotos
- descrição
- variações, se houver
- carrinho
- checkout

### A vitrine deve parecer grande
Mesmo começando pequena, o sistema deve ser preparado para:
- crescimento de catálogo
- destaques
- promoções
- combos
- categorias
- banners
- produtos recomendados

---

## 7.5 Carrinho e checkout
O fluxo de compra deve ser claro e bom no celular.

### Requisitos
- adicionar/remover item
- ajustar quantidade
- cálculo de subtotal
- frete/retirada (se existir)
- cupom (se for implementar)
- pagamento
- confirmação de pedido
- status do pedido

### UX
- checkout sem atrito
- leitura boa
- botões claros
- não exigir passos desnecessários

---

## 7.6 PWA
O sistema precisa ser um **PWA muito bem feito**.

### Requisitos obrigatórios
- instalável no celular
- responsivo de verdade
- bom desempenho
- ícone próprio
- splash / experiência adequada
- navegação confortável no touch
- sem bugs de viewport
- sem problemas com safe area
- usável como app

### Notificações no PWA
O PWA deve suportar notificações para:
- promoções
- status de pedido
- confirmação de agendamento
- lembretes

Se houver limitação de plataforma, estruturar a base para o melhor suporte possível sem prometer comportamento que o navegador não entrega.

---

## 7.7 E-mails automáticos
Enviar e-mail para a mãe/gestora assim que houver:

- novo agendamento
- nova venda
- pagamento confirmado
- cancelamento
- reagendamento

### O e-mail deve incluir
- nome do cliente
- contato
- serviço ou pedido
- data/hora
- valor
- status
- link rápido para abrir no admin, se aplicável

Também considerar e-mails para o cliente:
- confirmação de agendamento
- confirmação de compra
- atualização de status

---

## 7.8 WhatsApp automation
Integrar automação de WhatsApp para o fluxo de agendamento.

### Objetivo
Quando o cliente marcar banho/tosa/serviço, o sistema deve conseguir acionar comunicação por WhatsApp com contexto útil.

### Exemplos de uso
- confirmação do agendamento
- lembrete do dia/horário
- mensagens operacionais
- comunicação com a mãe

### Importante
Projetar isso de forma organizada, sem gambiarra.  
Se houver dependência de provedor/API, deixar arquitetura pronta e fluxo bem definido.

---

## 7.9 Admin “foda”
O admin é parte crítica do produto.

Ele deve ser poderoso, intuitivo e completo.

### O admin precisa permitir mexer em tudo isso:
- produtos
- categorias
- estoque
- pedidos
- banners
- textos
- serviços
- agenda
- horários disponíveis
- bloqueios de calendário
- clientes
- pagamentos
- cupons
- notificações
- automações
- conteúdo institucional
- configurações gerais

### O admin precisa ter
- dashboard claro
- visão de vendas
- visão de agendamentos
- visão de próximos atendimentos
- atalhos rápidos
- filtros
- busca
- status visuais claros
- bom mobile/tablet se possível
- ótima usabilidade desktop

### O admin deve evitar
- confusão
- excesso de cliques
- telas quebradas
- dependência técnica para tarefas simples

---

## 8) UX / UI obrigatórios

### Mobile-first real
O projeto deve ser pensado primeiro para celular, sem ficar com cara de desktop espremido.

### Regras de UX
- navegação clara
- cabeçalho bem resolvido
- menu intuitivo
- CTAs evidentes
- formulários fáceis
- calendário fácil de usar
- carrinho simples
- checkout fluido
- textos legíveis
- contraste bom
- feedback visual de loading, sucesso e erro

### Estados obrigatórios
Cada fluxo deve ter estados claros de:
- carregando
- vazio
- erro
- sucesso
- indisponível
- confirmação

---

## 9) SEO e performance

O site deve nascer já com base boa de performance e descoberta.

### Requisitos
- carregamento rápido
- imagens otimizadas
- metadados corretos
- estrutura indexável
- títulos e descrições por página
- páginas de produto amigáveis
- boas práticas de Core Web Vitals
- performance mobile forte

---

## 10) Stack e arquitetura técnica (orientação)

O agente pode propor stack, mas precisa respeitar a ambição do produto.

### Direção recomendada
- frontend moderno com foco em UX, performance e PWA
- backend confiável
- autenticação admin segura
- banco estruturado
- storage para imagens/produtos/banners
- pagamentos integrados
- envio de e-mail transacional
- base pronta para automações
- deploy estável

### Preferência
Não escolher stack “fácil” só por ser fácil.  
Escolher stack que permita produto sério, admin forte e escala.

---

## 11) Segurança e confiabilidade

Tratar como produto comercial real.

### Exigir
- autenticação admin segura
- regras de permissão
- validação no servidor
- proteção de rotas admin
- integridade de pagamentos
- consistência entre agenda e pagamento
- logs mínimos úteis
- prevenção de falhas óbvias
- tratamento de erro real

---

## 12) O que o agente NÃO deve fazer

- não reduzir o projeto a landing page
- não transformar tudo em one page
- não fazer layout genérico
- não ignorar mobile
- não ignorar admin
- não fazer agenda superficial
- não fazer e-commerce fake
- não esquecer automações
- não deixar pagamentos mal amarrados
- não separar arquitetura de forma incoerente
- não entregar “MVP ruim” disfarçado de pronto
- não tomar atalhos que criem retrabalho grande depois
- não presumir que “depois arruma”
- não deixar fluxos centrais sem estado de erro/sucesso
- não criar produto bonito e operacionalmente fraco
- não criar produto funcional e visualmente pobre

---

## 13) Fases obrigatórias de trabalho

O agente deve trabalhar em fases claras e sempre explicitar o que está fazendo.

## Fase 1 — Product framing
Consolidar tudo o que foi pedido e transformar em escopo organizado:
- visão do produto
- páginas
- fluxos
- módulos
- prioridades
- entidades principais
- integrações

## Fase 2 — Arquitetura
Definir arquitetura técnica de forma sólida:
- frontend
- backend
- banco
- pagamentos
- agenda
- notificações
- automações
- admin
- PWA

## Fase 3 — Design system e UX
Definir:
- paleta
- tipografia
- componentes
- navegação
- mobile behavior
- estrutura visual das páginas

## Fase 4 — Implementação base
Construir:
- app shell
- rotas
- layout
- home
- páginas principais
- base de componentes

## Fase 5 — Módulos críticos
Implementar com prioridade:
1. agenda
2. pagamentos do agendamento
3. loja/produtos
4. checkout
5. admin
6. e-mails
7. notificações
8. automações WhatsApp
9. PWA final

## Fase 6 — QA e hardening
Verificar:
- fluxos quebrados
- mobile
- estados vazios
- validações
- acessibilidade básica
- performance
- consistência visual
- erros de integração
- experiência real de uso

## Fase 7 — Polimento
Somente depois de tudo funcional:
- refinamento visual
- microinterações
- cópia
- banners
- ajustes finos
- otimizações

---

## 14) Como o agente deve responder durante o projeto

Sempre responder de forma estruturada.

### Ao iniciar qualquer etapa:
- dizer o objetivo da etapa
- listar o que vai fazer
- apontar riscos ou decisões
- não pular direto para código sem enquadramento quando o assunto for amplo

### Ao propor arquitetura:
- explicar por que a stack escolhida serve para este produto
- justificar agenda, pagamentos, admin e PWA

### Ao implementar:
- não misturar mudanças demais sem organização
- preservar coerência entre front e back
- explicar o impacto das mudanças

### Ao finalizar uma etapa:
- resumir o que foi feito
- listar o que ficou pendente
- indicar a próxima etapa lógica

---

## 15) Critério de qualidade

O projeto só é considerado bom se entregar simultaneamente:

- visual forte
- navegação clara
- experiência mobile excelente
- agenda realmente utilizável
- pagamento bem integrado
- loja convincente
- admin robusto
- automações úteis
- sensação de produto profissional
- base pronta para crescer

Se uma parte estiver boa e outra crítica estiver fraca, o projeto **não** está bom.

---

## 16) Prioridades absolutas

Em caso de conflito, priorizar nesta ordem:

1. arquitetura certa
2. mobile UX
3. agenda + pagamento confiáveis
4. admin robusto
5. loja / catálogo / checkout
6. notificações e automações
7. polimento visual final

---

## 17) Primeira entrega esperada do agente

Antes de começar a codar pesado, a primeira entrega deve ser:

1. **resumo estruturado do que entendeu**
2. **arquitetura proposta**
3. **mapa completo de páginas**
4. **mapa de módulos**
5. **entidades do banco**
6. **fluxos principais do cliente**
7. **fluxos principais do admin**
8. **ordem de implementação**
9. **riscos e decisões**
10. **plano para PWA, agenda, pagamentos, e-mails e WhatsApp**

Não pular essa fase.

---

## 18) Checklist de entendimento obrigatório

O agente precisa demonstrar que entendeu que o site deve ter:

- fundo roxo / identidade forte
- múltiplas páginas
- visual de pet shop grande
- agenda online séria
- calendário mensal com visão semanal e diária
- pagamento de 50% ou 100%
- Pix e cartão
- vitrine de produtos
- compra online
- admin forte
- PWA
- notificações
- e-mails automáticos
- automação WhatsApp
- mobile excelente
- sem gaps entre os módulos

Se algum desses pontos for ignorado, o entendimento está incompleto.

---

## 19) Tom de execução

Executar como produto sério, não como exercício.  
Assumir padrão alto.  
Pensar como:
- product designer
- arquiteto de software
- engenheiro full-stack
- operador do negócio

Tudo precisa conversar com tudo.

---

## 20) Comando operacional inicial para o agente

Ao começar, faça exatamente nesta ordem:

1. consolidar o entendimento do projeto
2. transformar em PRD enxuto porém completo
3. propor stack e arquitetura
4. desenhar sitemap e módulos
5. definir entidades de banco
6. definir fluxo de agenda e pagamentos
7. definir fluxo da loja e checkout
8. definir arquitetura do admin
9. definir estratégia PWA + notificações
10. só depois começar implementação

Não começar pela estética isoladamente e não começar por código solto sem arquitetura.
