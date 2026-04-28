# Admin Subdomain Preparation (`admin.petlaikao.com.br`)

## O que ja ficou pronto nesta etapa
- Rotas admin centralizadas em `/admin/*` e APIs admin em `/api/admin/*`.
- Protecao por sessao segura (cookie `httpOnly`) para rotas web e API do admin.
- Login real em `/admin/login`.
- Middleware preparado para detectar `ADMIN_HOST` e redirecionar raiz do subdominio para `/admin/dashboard`.

## Variaveis de ambiente
- `PUBLIC_HOST=petlaikao.com.br`
- `ADMIN_HOST=admin.petlaikao.com.br`
- `ADMIN_EMAIL=admin@petlaikao.com.br`
- `ADMIN_PASSWORD=<senha forte>`

## Passos de VPS/Nginx para ativar subdominio depois
1. Criar DNS A/CNAME para `admin.petlaikao.com.br` apontando para a mesma VPS do dominio publico.
2. No Nginx, criar `server_name admin.petlaikao.com.br` e fazer proxy para a aplicacao Next.js.
3. Garantir encaminhamento do header `Host` original (`proxy_set_header Host $host;`) para o middleware detectar o host admin.
4. Configurar HTTPS (certbot ou equivalente) para os dois dominos.
5. Em producao, definir `ADMIN_HOST` e `PUBLIC_HOST` no ambiente da aplicacao.
6. Validar fluxo:
   - `admin.petlaikao.com.br/` redireciona para `/admin/dashboard`.
   - `admin.petlaikao.com.br/admin/login` abre login.
   - APIs `/api/admin/*` retornam `401` sem sessao.

## Observacao de arquitetura
Mesmo antes da separacao fisica dos dominos, a aplicacao ja esta organizada para split publico/admin sem espalhar regras na UI.
