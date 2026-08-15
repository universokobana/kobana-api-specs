# 🚀 Kobana API Specs

## 📖 Sobre este repositório

Este repositório contém os arquivos com as especificações mais recentes da API da Kobana, mantidas e atualizadas para uso no Swagger e Postman.
Para visualizar a documentação navegável, acesse [docs.banking.kobana.com.br](https://docs.banking.kobana.com.br)

## 🌟 O que é a Kobana?

A Kobana é uma plataforma abrangente de automação financeira brasileira que conecta empresas diretamente a mais de 40 bancos através de uma API unificada. Nós simplificamos e automatizamos operações bancárias como cobranças, pagamentos, consultas de extrato e transferências.

**Kobana NÃO é um banco, conta digital ou intermediador.** Conectamos sua empresa diretamente aos bancos, permitindo que os valores caiam direto na sua conta e os títulos sejam emitidos em nome da sua empresa.

Para conhecer mais sobre nossas soluções, visite [www.kobana.com.br](https://www.kobana.com.br).

## 📁 Estrutura do repositório

```
kobana-api-specs/
├── postman/          # Coleções do Postman para testes de API
│   └── v1_0/         # Versão 1.0 da API
│   └── v2_0/         # Versão 2.0 da API
├── swagger/          # Especificações Swagger/OpenAPI
│   └── v1_0/         # Versão 1.0 da API
│   └── v2_0/         # Versão 2.0 da API
├── docs/             # Site da documentação (Docusaurus) — docs.banking.kobana.com.br
└── README.md         # Este arquivo
```

## 📚 Site da documentação

A pasta [`docs/`](./docs) contém o site da documentação em Docusaurus
publicado em `docs.banking.kobana.com.br`: os guias, as páginas conceituais da API e a
referência de endpoints gerada automaticamente a partir dos arquivos OpenAPI acima.

```bash
cd docs
npm install
npm run gen-api-docs:all   # gera a referência a partir de swagger/
npm start
```

Quando os specs em `swagger/` mudam no `main`, o workflow
[`.github/workflows/regenerate-docs.yml`](./.github/workflows/regenerate-docs.yml) regenera a
documentação com o Claude Code CLI e commita os ajustes direto no `main`.

Veja [`docs/README.md`](./docs/README.md) para detalhes.

## 🏦 Bancos Suportados

A Kobana está conectada a **34+ bancos e instituições financeiras** brasileiras, incluindo:

### Grandes Bancos
- Banco do Brasil
- Bradesco
- Caixa Econômica Federal
- Itaú
- Santander
- Banrisul
- Sicoob
- Sicredi

## 🛠️ Como utilizar esse repositório

### Postman
1. Importe a coleção localizada em `postman/v1_0/`
2. Configure as variáveis de ambiente necessárias
3. Comece a testar os endpoints da API

[Mais informações sobre as coleções do postman disponíveis na documentação da API](https://docs.banking.kobana.com.br/api/postman).

### Swagger
1. Acesse as especificações na pasta `swagger/`
2. Utilize um visualizador Swagger para explorar a documentação interativa
3. Teste os endpoints diretamente pela interface Swagger

## 🔄 Atualizações

Este repositório é atualizado automaticamente toda vez que a documentação é atualizada.

## 🤝 Estamos aqui para ajudar
Se você tiver qualquer dúvida sobre a API, fique a vontade para ativar o chat no canto inferior direito da sua conta, ou enviar um email para o suporte que ajudamos no que for preciso.

Você também pode visitar a nossa [Central de Ajuda](https://ajuda.kobana.com.br) e consultar centenas de artigos onde ensinamos como lidar com os bancos e como usar a plataforma.

## 🐞 Encontrou um bug?
Caso você tenha achado algum erro da documentação ou até mesmo algum bug na API, basta mandar um email para suporte@kobana.com.br que a gente corrige rapidinho, ok?

## 🔐 Segurança

Lembre-se de nunca compartilhar suas chaves de API ou credenciais de acesso. Mantenha sempre suas informações de autenticação em local seguro.

---

💡 **Dica**: Para começar rapidamente, importe nossa coleção Postman e explore os exemplos de requisições disponíveis!

❤️ Desenvolvido com carinho pela equipe Kobana