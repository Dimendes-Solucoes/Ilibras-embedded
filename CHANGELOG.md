# 📝 Changelog - iLibras Widget

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

---

## [1.1.0] - 2026-02-18

### 🚀 Mudanças Importantes

#### Formato de Envio de Dados
- **BREAKING CHANGE:** Alterado de `JSON` para `FormData`
- Os dados agora são enviados como `multipart/form-data` em vez de `application/json`
- Compatível com APIs PHP que usam `$_POST`

**Antes:**
```javascript
Content-Type: application/json
body: JSON.stringify({nome, cpf, telefone, token})
```

**Agora:**
```javascript
Content-Type: multipart/form-data
body: FormData com campos: nome, cpf, telefone, token
```

#### Formato de Resposta da API
- **NOVO:** Suporte ao campo `link_fila` (prioridade máxima)
- Mantém compatibilidade com `link`, `url`, `redirect`

**Resposta Esperada:**
```json
{
  "status": "OK",
  "link_fila": "https://sistema.ilibras.com.br/acesso.php?token=...",
  "codigo": "...",
  "id_atendimento": "717",
  "id_surdo": 417
}
```

#### Comportamento de Redirecionamento
- **MUDANÇA:** Redirecionamento agora abre em **nova aba**
- Usa `window.open(url, '_blank')` em vez de `window.location.href`
- Modal do widget fecha automaticamente após envio bem-sucedido
- Usuário permanece na página original

### 🐛 Correções

#### Content Security Policy (CSP)
- Adicionada solução para CSP via Nginx
- Documentação atualizada com configuração de servidor
- Suporte a múltiplos ambientes (Apache + Nginx)

**Configuração Nginx:**
```nginx
add_header Content-Security-Policy "connect-src 'self' wss://backend.smart2doc.com.br:6000 https://sistema.ilibras.com.br;";
```

#### Estilos do Botão Close
- Corrigido problema de cor do botão de fechar em sites com CSS global
- Adicionado `!important` para forçar cor branca
- Adicionado `pointer-events: none` em SVGs

### 📚 Documentação

- ✅ Atualizado README.md com novo formato de requisição/resposta
- ✅ Atualizado WORDPRESS.md com soluções de CSP específicas
- ✅ Documentado comportamento de nova aba
- ✅ Adicionados exemplos práticos de integração

---

## [1.0.0] - 2025-XX-XX

### ✨ Lançamento Inicial

#### Funcionalidades
- Widget flutuante similar ao WhatsApp
- Formulário com validação de CPF e Telefone
- Máscaras de entrada automáticas
- Tema azul (#4A90E2)
- Posicionamento configurável (4 posições)
- Envio via POST para API
- Validação de token obrigatório
- Suporte a WordPress
- Responsivo e acessível

#### Campos do Formulário
- Nome completo
- CPF (com validação de dígitos verificadores)
- Telefone (10-11 dígitos)
- Checkbox de consentimento

#### Configurações
- `position`: Posição do widget na tela
- `primaryColor`: Cor principal do tema
- `title`: Título do modal
- `message`: Mensagem de boas-vindas
- `buttonText`: Texto do botão de envio
- `token`: Token de autenticação (obrigatório)
- `zIndex`: Controle de sobreposição

---

## 🔮 Próximas Atualizações (Roadmap)

### Em Desenvolvimento
- [ ] Modo escuro automático
- [ ] Suporte a múltiplos idiomas
- [ ] Analytics integrado
- [ ] Callbacks personalizados
- [ ] Temas pré-definidos

### Considerando
- [ ] Suporte a anexos
- [ ] Chat em tempo real
- [ ] Histórico de conversas
- [ ] Notificações push

---

## 📋 Notas de Migração

### Migração de 1.0.0 para 1.1.0

Se você já usa o widget versão 1.0.0, siga estas etapas:

1. **Atualizar arquivos:**
   - Baixe `ilibras-widget.js` e `ilibras-widget.css` mais recentes
   - Substitua os arquivos antigos

2. **Verificar API:**
   - Certifique-se que sua API aceita `FormData` (multipart/form-data)
   - Campos disponíveis: `$_POST['nome']`, `$_POST['cpf']`, `$_POST['telefone']`, `$_POST['token']`

3. **Atualizar resposta da API (opcional):**
   - Adicione campo `link_fila` na resposta JSON
   - Mantenha `link`, `url` ou `redirect` para compatibilidade

4. **Configurar CSP (se necessário):**
   - Se tiver erro de CSP, adicione `https://sistema.ilibras.com.br` nos domínios permitidos
   - Veja [WORDPRESS.md](WORDPRESS.md) para soluções específicas

5. **Testar:**
   - Limpe cache do navegador
   - Teste envio de formulário
   - Verifique se abre em nova aba
   - Confirme que modal fecha após envio

---

## 🤝 Contribuindo

Encontrou um bug? Tem uma sugestão? 

1. Abra uma issue descrevendo o problema/sugestão
2. Se possível, envie um PR com a correção
3. Documente qualquer mudança no comportamento

---

## 📞 Suporte

Para dúvidas sobre:
- **Integração**: Consulte [README.md](README.md)
- **WordPress**: Consulte [WORDPRESS.md](WORDPRESS.md)
- **Token**: Consulte [TOKEN.md](TOKEN.md)
- **CSP**: Entre em contato com suporte técnico

---

**Legenda:**
- ✨ Nova funcionalidade
- 🐛 Correção de bug
- 🚀 Melhoria de performance
- 📚 Documentação
- ⚠️ Breaking change
- 🔒 Segurança
