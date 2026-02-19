# 🔑 Configuração de Token - iLibras Widget

## O que é o Token?

O **token de autenticação** é um código único que identifica e autoriza seu site a usar a API do iLibras. É como uma chave de acesso personalizada para garantir segurança na comunicação entre seu site e nossos servidores.

## ⚠️ Por que o Token é Obrigatório?

- **Segurança:** Impede uso não autorizado da API
- **Rastreabilidade:** Permite identificar qual site está enviando dados
- **Controle:** Possibilita ativar/desativar acesso quando necessário
- **Personalização:** Permite configurações específicas por cliente

## 📞 Como Obter seu Token

### 1. Entre em Contato

Entre em contato com a equipe iLibras através de:
- Email: contato@ilibras.com.br
- WhatsApp: (11) 98765-4321
- Portal do Cliente: https://sistema.ilibras.com.br

### 2. Forneça as Informações

Você precisará informar:
- **Nome da Empresa/Pessoa**
- **Domínio do Site** (ex: www.meusite.com.br)
- **CNPJ/CPF** (para identificação)
- **Email de Contato**

### 3. Receba seu Token

Você receberá um email com:
- Seu token único (ex: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)
- Instruções de instalação
- Link para documentação

## 🔧 Como Configurar o Token

### Instalação Básica

```javascript
new ILibrasWidget({
  token: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'
});
```

### Instalação Completa

```javascript
new ILibrasWidget({
  position: 'bottom-right',
  primaryColor: '#4A90E2',
  title: 'iLibras',
  message: 'Olá! Como podemos ajudar?',
  buttonText: 'Iniciar atendimento',
  token: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
  redirectUrl: 'https://meusite.com.br/obrigado'
});
```

## 🔒 Segurança do Token

### Boas Práticas

✅ **Faça:**
- Mantenha o token em local seguro
- Use HTTPS no seu site
- Configure CORS adequadamente

❌ **Não Faça:**
- Compartilhe seu token publicamente
- Commit em repositórios públicos (use variáveis de ambiente)
- Use o mesmo token em múltiplos domínios

### Token Comprometido?

Se você acredita que seu token foi exposto:

1. Entre em contato imediatamente com o suporte
2. Solicite a revogação do token antigo
3. Um novo token será gerado
4. Atualize sua instalação

## 🌐 Configuração por Ambiente

### Desenvolvimento Local

```javascript
// Para testes locais, use um token de desenvolvimento
new ILibrasWidget({
  token: 'TOKEN_DE_DESENVOLVIMENTO',
  // ...outras configurações
});
```

### Produção

```javascript
// Em produção, use o token real
new ILibrasWidget({
  token: 'SEU_TOKEN_DE_PRODUCAO',
  // ...outras configurações
});
```

### Usando Variáveis de Ambiente (Recomendado)

**WordPress (no functions.php):**
```php
function ilibras_widget_init() {
    $token = get_option('ilibras_api_token'); // Armazenado no banco
    ?>
    <script>
    new ILibrasWidget({
        token: '<?php echo esc_js($token); ?>'
    });
    </script>
    <?php
}
```

**JavaScript Moderno (com build):**
```javascript
new ILibrasWidget({
  token: process.env.ILIBRAS_TOKEN
});
```

## ❓ Problemas Comuns

### "Token de autenticação não configurado"

**Causa:** O parâmetro `token` não foi passado ou está vazio.

**Solução:**
```javascript
// ❌ Errado
new ILibrasWidget();

// ✅ Correto
new ILibrasWidget({
  token: 'seu_token_aqui'
});
```

### "Token inválido" ou "Token expirado"

**Causa:** Token incorreto, revogado ou expirado.

**Solução:**
1. Verifique se copiou o token corretamente
2. Confirme se não há espaços extras
3. Entre em contato com o suporte para validar

### Widget não envia dados para API

**Causa:** Token não autorizado para o domínio atual.

**Solução:**
- Verifique se informou o domínio correto ao solicitar o token
- Tokens são vinculados a domínios específicos
- Entre em contato para adicionar novos domínios

## 📊 Monitoramento

Você pode monitorar o uso da API através do:

- **Portal do Cliente:** https://sistema.ilibras.com.br
- **Dashboard:** Visualize estatísticas de uso
- **Logs:** Histórico de requisições
- **Alertas:** Notificações de problemas

## 🆘 Suporte

### Suporte Técnico

- **Email:** suporte@ilibras.com.br
- **WhatsApp:** (11) 98765-4321
- **Horário:** Segunda a Sexta, 9h às 18h

### Documentação

- [README.md](README.md) - Documentação completa
- [INSTALACAO.md](INSTALACAO.md) - Guia de instalação
- [WORDPRESS.md](WORDPRESS.md) - Integração WordPress

### FAQ Rápido

**P: O token expira?**
R: Não, tokens são permanentes até serem revogados.

**P: Posso usar o mesmo token em vários sites?**
R: Não recomendado. Solicite um token por domínio.

**P: Como testar sem um token real?**
R: Solicite um token de desenvolvimento/sandbox.

**P: Preciso pagar pelo token?**
R: Depende do seu plano. Consulte o comercial.

---

**📧 Dúvidas?** Entre em contato: contato@ilibras.com.br
