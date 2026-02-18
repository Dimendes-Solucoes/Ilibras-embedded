# 🚀 Guia Rápido de Instalação - iLibras Widget

## Instalação em 3 Passos

### 1️⃣ Baixe os Arquivos

Copie estes 2 arquivos para o seu projeto:
- `ilibras-widget.js`
- `ilibras-widget.css`

### 2️⃣ Adicione ao seu HTML

Cole este código antes da tag `</body>`:

```html
<!-- iLibras Widget -->
<link rel="stylesheet" href="ilibras-widget.css">
<script src="ilibras-widget.js"></script>
<script>
  new ILibrasWidget();
</script>
```

### 3️⃣ Pronto! ✅

O widget já está funcionando no canto inferior direito da sua página.

---

## Personalizações Comuns

### Mudar a Posição

```javascript
new ILibrasWidget({
  position: 'bottom-left'  // ou 'top-right', 'top-left'
});
```

### Mudar a URL de Destino

```javascript
new ILibrasWidget({
  redirectUrl: 'https://meusite.com.br/atendimento'
});
```

### Mudar a Cor

```javascript
new ILibrasWidget({
  primaryColor: '#0066CC'  // Qualquer cor em hexadecimal
});
```

### Personalizar Textos

```javascript
new ILibrasWidget({
  title: 'Minha Empresa',
  message: 'Olá! Precisa de ajuda?',
  buttonText: 'Iniciar Conversa'
});
```

### Exemplo Completo

```javascript
new ILibrasWidget({
  position: 'bottom-right',
  redirectUrl: 'https://minhaplataforma.com/chat',
  primaryColor: '#FF5722',
  title: 'Suporte 24h',
  message: 'Nossa equipe está pronta para ajudar você!',
  buttonText: 'Falar com Atendente'
});
```

---

## Testando Localmente

1. Abra o arquivo `exemplo.html` no navegador
2. Clique no botão verde no canto da tela
3. Preencha o formulário
4. Clique em "Iniciar atendimento"

---

## Precisa de Ajuda?

📖 Leia a documentação completa no [README.md](README.md)

🐛 Encontrou um problema? Abra uma issue no GitHub

💬 Dúvidas? Entre em contato: suporte@ilibras.com.br

---

**Desenvolvido com ❤️ pela equipe iLibras**
