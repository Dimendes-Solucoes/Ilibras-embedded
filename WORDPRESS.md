# 🔌 Integrando iLibras Widget no WordPress

Guia completo para adicionar o widget iLibras ao seu site WordPress.

## ⚠️ IMPORTANTE - Token Obrigatório

Antes de instalar, você precisa ter em mãos o **token de autenticação** fornecido pela equipe iLibras. 

**O widget NÃO funcionará sem o token configurado.**

Para obter seu token:
- Entre em contato com a equipe iLibras
- Informe o domínio do seu site WordPress
- Você receberá um token único no formato: `abc123xyz789...`

---

## 🎯 Comportamento Após Envio

Quando o usuário preenche e envia o formulário:

1. ✅ **Dados são enviados para a API** (via FormData)
2. 🔗 **Link da fila é retornado** pela API
3. 🪟 **Nova aba é aberta automaticamente** com o link para atendimento
4. ❌ **Modal do widget fecha sozinho**
5. 📍 **Usuário permanece na página atual**

**Vantagem:** O usuário não perde o contexto da navegação e pode continuar explorando seu site enquanto aguarda o atendimento na nova aba.

---

## 📋 Métodos de Instalação

### ⚡ Método 1: Via Tema (Recomendado)

Adicione o código diretamente no arquivo `footer.php` do seu tema.

#### Passo 1: Fazer Upload dos Arquivos

1. Acesse via FTP ou Gerenciador de Arquivos
2. Navegue até: `/wp-content/themes/SEU-TEMA/`
3. Crie uma pasta chamada `ilibras-widget`
4. Faça upload dos arquivos:
   - `ilibras-widget.js`
   - `ilibras-widget.css`

#### Passo 2: Editar o `footer.php`

1. Acesse: **Aparência → Editor de Temas**
2. Selecione o arquivo `footer.php`
3. **IMPORTANTE:** Substitua `SEU_TOKEN_AQUI` pelo token fornecido pela equipe iLibras
4. Adicione antes do `</body>`:

```php
<!-- iLibras Widget -->
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/ilibras-widget/ilibras-widget.css">
<script src="<?php echo get_template_directory_uri(); ?>/ilibras-widget/ilibras-widget.js"></script>
<script>
  new ILibrasWidget({
    position: 'bottom-right',
    primaryColor: '#4A90E2',
    title: 'iLibras',
    message: 'Olá! Estamos aqui para ajudar você! 😊',
    buttonText: 'Iniciar atendimento',
    token: 'SEU_TOKEN_AQUI'
  });
</script>
```

> ⚠️ **ATENÇÃO:** O parâmetro `token` é **obrigatório**. Sem ele, o widget não funcionará. Entre em contato com a equipe iLibras para obter seu token de autenticação.

---

### 🎨 Método 2: Via Plugin Code Snippets

Use um plugin para adicionar código sem modificar arquivos do tema.

#### Passo 1: Instalar Plugin

1. Acesse: **Plugins → Adicionar Novo**
2. Pesquise por: **Code Snippets** ou **Insert Headers and Footers**
3. Instale e ative

#### Passo 2: Fazer Upload dos Arquivos

1. Via FTP, faça upload para: `/wp-content/uploads/ilibras-widget/`
   - `ilibras-widget.js`
   - `ilibras-widget.css`

#### Passo 3: Adicionar Código

**Se usar Code Snippets:**
1. Vá em: **Snippets → Add New**
2. Cole o código:

```php
function ilibras_widget_scripts() {
    wp_enqueue_style('ilibras-widget', content_url('/uploads/ilibras-widget/ilibras-widget.css'));
    wp_enqueue_script('ilibras-widget', content_url('/uploads/ilibras-widget/ilibras-widget.js'), array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'ilibras_widget_scripts');

function ilibras_widget_init() {
    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        new ILibrasWidget({
            position: 'bottom-right',
            primaryColor: '#4A90E2',
            title: 'iLibras',
            message: 'Olá! Estamos aqui para ajudar você! 😊',
            buttonText: 'Iniciar atendimento',
            token: 'SEU_TOKEN_AQUI'
        });
    });
    </script>
    <?php
}
add_action('wp_footer', 'ilibras_widget_init');
```

> ⚠️ Substitua `SEU_TOKEN_AQUI` pelo seu token real.

3. Marque: **Run snippet everywhere**
4. Salve

**Se usar Insert Headers and Footers:**
1. Vá em: **Configurações → Insert Headers and Footers**
2. Na seção **Footer**, cole:

```html
<link rel="stylesheet" href="<?php echo content_url('/uploads/ilibras-widget/ilibras-widget.css'); ?>">
<script src="<?php echo content_url('/uploads/ilibras-widget/ilibras-widget.js'); ?>"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    new ILibrasWidget({
        position: 'bottom-right',
        primaryColor: '#4A90E2',
        title: 'iLibras',
        message: 'Olá! Estamos aqui para ajudar você! 😊',
        buttonText: 'Iniciar atendimento',
        token: 'SEU_TOKEN_AQUI'
    });
});
</script>
```

> ⚠️ Substitua `SEU_TOKEN_AQUI` pelo seu token real.

3. Clique em **Save**

---

### 📁 Método 3: Via functions.php (Para Desenvolvedores)

Adicione diretamente no arquivo `functions.php` do tema.

#### Código Completo

```php
// Enfileira scripts e estilos do iLibras Widget
function ilibras_widget_enqueue() {
    // Estilos
    wp_enqueue_style(
        'ilibras-widget',
        get_template_directory_uri() . '/ilibras-widget/ilibras-widget.css',
        array(),
        '1.0.0'
    );
    
    // Script
    wp_enqueue_script(
        'ilibras-widget',
        get_template_directory_uri() . '/ilibras-widget/ilibras-widget.js',
        array(),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'ilibras_widget_enqueue');

// Inicializa o widget
function ilibras_widget_init() {
    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        new ILibrasWidget({
            position: 'bottom-right',
            primaryColor: '#4A90E2',
            title: 'iLibras',
            message: 'Olá! Estamos aqui para ajudar você! 😊',
            buttonText: 'Iniciar atendimento',
            token: 'SEU_TOKEN_AQUI'
        });
    });
    </script>
    <?php
}
add_action('wp_footer', 'ilibras_widget_init', 100);
```

---

### 🔒 Método 4: Criar Plugin Personalizado

Crie um plugin standalone para fácil ativação/desativação.

#### Passo 1: Criar Estrutura

Via FTP, crie:
```
/wp-content/plugins/ilibras-widget/
    ilibras-widget.php
    assets/
        ilibras-widget.js
        ilibras-widget.css
```

#### Passo 2: Criar arquivo `ilibras-widget.php`

```php
<?php
/**
 * Plugin Name: iLibras Widget
 * Description: Widget de atendimento iLibras para WordPress
 * Version: 1.0.0
 * Author: iLibras
 * Text Domain: ilibras-widget
 */

if (!defined('ABSPATH')) {
    exit;
}

class ILibras_Widget_Plugin {
    
    public function __construct() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_footer', array($this, 'render_widget'));
    }
    
    public function enqueue_scripts() {
        wp_enqueue_style(
            'ilibras-widget',
            plugin_dir_url(__FILE__) . 'assets/ilibras-widget.css',
            array(),
            '1.0.0'
        );
        
        wp_enqueue_script(
            'ilibras-widget',
            plugin_dir_url(__FILE__) . 'assets/ilibras-widget.js',
            array(),
            '1.0.0',
            true
        );
    }
    
    public function render_widget() {
        ?>
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            new ILibrasWidget({
                position: 'bottom-right',
                primaryColor: '#4A90E2',
                title: 'iLibras',
                message: 'Olá! Estamos aqui para ajudar você! 😊',
                buttonText: 'Iniciar atendimento',
                token: 'SEU_TOKEN_AQUI'
            });
        });
        </script>
        <?php
    }
}

new ILibras_Widget_Plugin();
```

#### Passo 3: Ativar Plugin

1. Coloque `ilibras-widget.js` e `ilibras-widget.css` na pasta `assets/`
2. Acesse: **Plugins** no WordPress
3. Ative **iLibras Widget**

---

## 🎨 Personalização Avançada

### Alterar Cores do Tema WordPress

```php
function ilibras_widget_init() {
    // Pega a cor principal do tema (se configurada)
    $primary_color = get_theme_mod('primary_color', '#4A90E2');
    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        new ILibrasWidget({
            position: 'bottom-right',
            primaryColor: '<?php echo esc_js($primary_color); ?>',
            title: 'iLibras',
            message: 'Olá! Estamos aqui para ajudar você! 😊',
            buttonText: 'Iniciar atendimento'
        });
    });
    </script>
    <?php
}
```

### Exibir Apenas em Páginas Específicas

```php
function ilibras_widget_init() {
    // Exibe apenas na página inicial
    if (!is_front_page()) {
        return;
    }
    
    // Ou exibe apenas em páginas específicas
    // if (!is_page(array('contato', 'ajuda', 'suporte'))) {
    //     return;
    // }
    
    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        new ILibrasWidget();
    });
    </script>
    <?php
}
add_action('wp_footer', 'ilibras_widget_init', 100);
```

### Excluir de Páginas Específicas

```php
function ilibras_widget_init() {
    // Não exibe em páginas de checkout do WooCommerce
    if (is_checkout() || is_cart()) {
        return;
    }
    
    // Não exibe no painel administrativo
    if (is_admin()) {
        return;
    }
    
    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        new ILibrasWidget();
    });
    </script>
    <?php
}
```

---

## 🔍 Verificando a Instalação

1. Abra seu site no navegador
2. Verifique se o botão azul aparece no canto inferior direito
3. Clique no botão para abrir o formulário
4. Teste o preenchimento e envio

### Verificar Console do Navegador

Pressione `F12` e vá em **Console**. Não deve haver erros relacionados ao widget.

---

## ⚠️ Problemas Comuns

### Widget não aparece

1. **Verifique os caminhos dos arquivos** - Certifique-se que `ilibras-widget.js` e `.css` estão acessíveis
2. **Limpe o cache** - Use Ctrl+F5 ou limpe cache de plugins (WP Super Cache, W3 Total Cache, etc)
3. **Verifique conflitos JavaScript** - Abra Console (F12) e veja se há erros

### Estilos não aplicados

1. **Ordem de carregamento** - CSS deve vir antes do JavaScript
2. **Cache de CSS** - Limpe cache do navegador e plugins
3. **Conflito de CSS** - Adicione `!important` se necessário (último recurso)

### ⚠️ Erro: "Violates Content Security Policy"

Se aparecer este erro no Console do navegador:
```
Connecting to 'https://sistema.ilibras.com.br/...' violates the following Content Security Policy directive
```

**Causa:** Seu site WordPress tem uma Content Security Policy (CSP) que está bloqueando a conexão com a API.

---

#### 🔍 PRIMEIRO: Descubra onde a CSP está sendo configurada

Pressione **F12** no navegador → Aba **Network** → Recarregue a página → Clique no primeiro item (sua página HTML) → Vá em **Headers** → Procure por `content-security-policy`

A CSP pode estar vindo de:
- ✅ Plugin de segurança (Wordfence, iThemes, etc)
- ✅ Arquivo .htaccess
- ✅ Configuração do servidor/hospedagem
- ✅ Outro plugin (Cloudflare, Sucuri, etc)

---

**Soluções:**

#### Opção 1: Plugin de Segurança (Recomendado para WordPress)

Se você usa **Wordfence**, **iThemes Security** ou **All In One WP Security**:

1. Vá em **Configurações de Segurança**
2. Procure por **Content Security Policy** ou **CSP** ou **Security Headers**
3. Adicione `https://sistema.ilibras.com.br` na lista de domínios permitidos em **connect-src**

**Passo a passo detalhado por plugin:**

- **Wordfence**: Firewall → Firewall Options → Web Application Firewall Status
- **iThemes Security**: Security → Settings → Advanced → Security Headers
- **All In One WP Security**: WP Security → Firewall → Internet Bots

💡 **Dica:** Procure por campos relacionados a "CSP", "Security Headers" ou "HTTP Headers"

#### Opção 2: Código no functions.php

**Método 2A - Via wp_headers (Prioridade Alta):**

```php
function ilibras_add_csp_header() {
    if (!is_admin()) {
        header("Content-Security-Policy: connect-src 'self' wss://backend.smart2doc.com.br:6000 https://sistema.ilibras.com.br;", false);
    }
}
add_action('send_headers', 'ilibras_add_csp_header', 1);
```

**Método 2B - Via Meta Tag no wp_head (Alternativa):**

Se o método acima não funcionar, use meta tag:

```php
function ilibras_add_csp_meta() {
    if (!is_admin()) {
        echo '<meta http-equiv="Content-Security-Policy" content="connect-src \'self\' wss://backend.smart2doc.com.br:6000 https://sistema.ilibras.com.br;">';
    }
}
add_action('wp_head', 'ilibras_add_csp_meta', 1);
```

**Método 2C - Modificar CSP Existente (Mais Avançado):**

```php
function ilibras_modify_csp_headers($headers) {
    if (!is_admin() && isset($headers['Content-Security-Policy'])) {
        // Se já existe CSP, adiciona o domínio do iLibras
        $csp = $headers['Content-Security-Policy'];
        if (strpos($csp, 'connect-src') !== false) {
            // Adiciona ao connect-src existente
            $headers['Content-Security-Policy'] = str_replace('connect-src', 'connect-src https://sistema.ilibras.com.br', $csp);
        }
    }
    return $headers;
}
add_filter('wp_headers', 'ilibras_modify_csp_headers', 999);
```

> **⚠️ Importante:** Tente os métodos na ordem. Se um não funcionar, remova-o e tente o próximo.

#### Opção 3: .htaccess

Adicione no arquivo `.htaccess` na raiz do WordPress:

```apache
<IfModule mod_headers.c>
    Header set Content-Security-Policy "connect-src 'self' wss://backend.smart2doc.com.br:6000 https://sistema.ilibras.com.br;"
</IfModule>
```

#### Opção 4: Remover CSP Existente e Adicionar Nova (Solução Forçada)

Se nada funcionar, force a remoção da CSP antiga e adicione a nova:

```php
function ilibras_force_csp_header() {
    if (!is_admin()) {
        // Remove qualquer CSP anterior
        header_remove('Content-Security-Policy');
        header_remove('X-Content-Security-Policy');
        
        // Adiciona a CSP correta
        header("Content-Security-Policy: connect-src 'self' wss://backend.smart2doc.com.br:6000 https://sistema.ilibras.com.br; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';");
    }
}
add_action('send_headers', 'ilibras_force_csp_header', 9999);
```

> ⚠️ **Use esta opção apenas se as anteriores falharem**, pois ela remove qualquer CSP existente do site.

#### Opção 5: Desativar CSP Temporariamente (Para Teste)

Para testar se o problema é realmente a CSP:

```php
function ilibras_disable_csp_for_test() {
    header_remove('Content-Security-Policy');
}
add_action('send_headers', 'ilibras_disable_csp_for_test', 9999);
```

Se o widget funcionar após isso, você confirma que é problema de CSP. Depois remova este código e use uma das soluções acima.

📖 **[Guia completo sobre CSP](CSP.md)** com todas as soluções detalhadas

### Não envia para API

**Diagnóstico completo:**

1. **Abra o Console do navegador (F12)**
2. **Vá na aba Console** - veja se há erros
3. **Vá na aba Network** - veja se a requisição está sendo bloqueada
4. **Veja a mensagem de erro específica**:
   - `CSP violation` → Problema de Content Security Policy (siga soluções acima)
   - `CORS error` → A API precisa permitir seu domínio
   - `404 Not Found` → Endpoint da API incorreto
   - `403 Forbidden` → Firewall bloqueando
   - `500 Internal Server Error` → Erro no servidor da API

**Soluções por tipo de erro:**

- **CSP/CORS**: Use as soluções de CSP acima
- **Firewall/WAF**: Verifique Cloudflare, Sucuri ou firewall da hospedagem
- **Token inválido**: Verifique se configurou o token correto
- **Endpoint errado**: Confirme que a URL da API está correta no código

---

## 🚀 Otimizações

### Carregar Apenas Quando Necessário

```php
function ilibras_widget_enqueue() {
    // Não carregar em páginas admin
    if (is_admin()) {
        return;
    }
    
    wp_enqueue_style('ilibras-widget', /* ... */);
    wp_enqueue_script('ilibras-widget', /* ... */);
}
```

### Minificar e Combinar

Use plugins como **Autoptimize** ou **WP Rocket** para minificar automaticamente.

### Lazy Loading

```php
wp_enqueue_script(
    'ilibras-widget',
    get_template_directory_uri() . '/ilibras-widget/ilibras-widget.js',
    array(),
    '1.0.0',
    true // Carrega no footer
);
wp_script_add_data('ilibras-widget', 'async', true); // Carrega assíncrono
```

---

## 📞 Suporte

Para problemas de integração, verifique:
- Console do navegador (F12)
- Compatibilidade do tema WordPress
- Conflitos com outros plugins

---

## 📝 Checklist de Instalação

- [ ] Token de autenticação obtido da equipe iLibras
- [ ] Upload dos arquivos `.js` e `.css`
- [ ] Código adicionado ao tema/plugin com token configurado
- [ ] Token substituído (não deixar `SEU_TOKEN_AQUI`)
- [ ] Cache limpo (navegador e WordPress)
- [ ] Widget visível no site
- [ ] Formulário abre ao clicar
- [ ] Campos Nome, CPF e Telefone aparecem
- [ ] Validação de CPF funcionando
- [ ] Validação de Telefone funcionando
- [ ] **Content Security Policy (CSP)** configurada se necessário
- [ ] Envio para API funcionando (teste com dados reais)
- [ ] Link da fila abre em **nova aba** após envio
- [ ] Modal do widget fecha automaticamente após envio bem-sucedido
- [ ] Usuário permanece na página original

---

**🎉 Pronto! Seu widget iLibras está instalado e funcionando no WordPress!**
