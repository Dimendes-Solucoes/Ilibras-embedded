(function() {
  'use strict';

  const defaultConfig = {
    position: 'bottom-right',
    redirectUrl: 'https://teste.com.br',
    primaryColor: '#4A90E2',
    title: 'iLibras',
    message: 'Olá, somos a equipe iLibras e estamos aqui para ajudar você! 😊',
    buttonText: 'Iniciar atendimento',
    zIndex: 9999
  };

  class ILibrasWidget {
    constructor(config = {}) {
      this.config = { ...defaultConfig, ...config };
      this.isOpen = false;
      this.init();
    }

    init() {
      this.injectStyles();
      this.createWidget();
      this.attachEventListeners();
    }

    injectStyles() {
      if (document.getElementById('ilibras-widget-styles')) return;

      const link = document.createElement('link');
      link.id = 'ilibras-widget-styles';
      link.rel = 'stylesheet';
      link.href = this.getStylesheetUrl();
      document.head.appendChild(link);
    }

    getStylesheetUrl() {
      const scripts = document.getElementsByTagName('script');
      for (let script of scripts) {
        if (script.src.includes('ilibras-widget.js')) {
          return script.src.replace('.js', '.css');
        }
      }
      return 'ilibras-widget.css';
    }

    createWidget() {
      const container = document.createElement('div');
      container.id = 'ilibras-widget-container';
      container.className = `ilibras-widget-${this.config.position}`;
      container.style.zIndex = this.config.zIndex;
      
      container.innerHTML = `
        <div id="ilibras-widget-button" class="ilibras-widget-button">
          <svg viewBox="0 0 64 64" width="36" height="36" fill="white">
            <path d="M32 8c-2.2 0-4 1.8-4 4v12c0 2.2 1.8 4 4 4s4-1.8 4-4V12c0-2.2-1.8-4-4-4zm-12 4c-2.2 0-4 1.8-4 4v8c0 2.2 1.8 4 4 4s4-1.8 4-4v-8c0-2.2-1.8-4-4-4zm24 0c-2.2 0-4 1.8-4 4v8c0 2.2 1.8 4 4 4s4-1.8 4-4v-8c0-2.2-1.8-4-4-4zM8 20c-2.2 0-4 1.8-4 4v4c0 2.2 1.8 4 4 4s4-1.8 4-4v-4c0-2.2-1.8-4-4-4zm48 0c-2.2 0-4 1.8-4 4v4c0 2.2 1.8 4 4 4s4-1.8 4-4v-4c0-2.2-1.8-4-4-4zM20 28v0c0 2.2-1.8 4-4 4v4c0 8.8 7.2 16 16 16s16-7.2 16-16v-4c-2.2 0-4-1.8-4-4v0"/>
            <circle cx="32" cy="54" r="3" fill="white"/>
          </svg>
        </div>

        <div id="ilibras-widget-modal" class="ilibras-widget-modal">
          <div class="ilibras-widget-header" style="background-color: ${this.config.primaryColor}">
            <div class="ilibras-widget-header-content">
              <div class="ilibras-widget-logo">
                <svg viewBox="0 0 64 64" width="44" height="44" fill="white">
                  <path d="M32 8c-2.2 0-4 1.8-4 4v12c0 2.2 1.8 4 4 4s4-1.8 4-4V12c0-2.2-1.8-4-4-4zm-12 4c-2.2 0-4 1.8-4 4v8c0 2.2 1.8 4 4 4s4-1.8 4-4v-8c0-2.2-1.8-4-4-4zm24 0c-2.2 0-4 1.8-4 4v8c0 2.2 1.8 4 4 4s4-1.8 4-4v-8c0-2.2-1.8-4-4-4zM8 20c-2.2 0-4 1.8-4 4v4c0 2.2 1.8 4 4 4s4-1.8 4-4v-4c0-2.2-1.8-4-4-4zm48 0c-2.2 0-4 1.8-4 4v4c0 2.2 1.8 4 4 4s4-1.8 4-4v-4c0-2.2-1.8-4-4-4zM20 28v0c0 2.2-1.8 4-4 4v4c0 8.8 7.2 16 16 16s16-7.2 16-16v-4c-2.2 0-4-1.8-4-4v0"/>
                  <circle cx="32" cy="54" r="3" fill="white"/>
                </svg>
              </div>
              <div class="ilibras-widget-title">${this.config.title}</div>
            </div>
            <button id="ilibras-widget-close" class="ilibras-widget-close" aria-label="Fechar">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="white">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          <div class="ilibras-widget-body">
            <div class="ilibras-widget-message">
              ${this.config.message}
            </div>

            <form id="ilibras-widget-form" class="ilibras-widget-form">
              <div class="ilibras-widget-form-group">
                <label for="ilibras-name">Nome*</label>
                <input 
                  type="text" 
                  id="ilibras-name" 
                  name="name" 
                  placeholder="Digite seu nome"
                  required
                  autocomplete="name"
                />
              </div>

              <div class="ilibras-widget-form-group">
                <label for="ilibras-cpf">CPF*</label>
                <input 
                  type="text" 
                  id="ilibras-cpf" 
                  name="cpf" 
                  placeholder="000.000.000-00" 
                  required
                  maxlength="14"
                  autocomplete="off"
                />
              </div>

              <div class="ilibras-widget-form-group">
                <label for="ilibras-consent" class="ilibras-widget-checkbox-label">
                  <input 
                    type="checkbox" 
                    id="ilibras-consent" 
                    name="consent" 
                    required
                  />
                  <span>Aceito receber contato comercial</span>
                </label>
              </div>

              <button 
                type="submit" 
                class="ilibras-widget-submit"
                style="background-color: ${this.config.primaryColor}"
              >
                ${this.config.buttonText}
              </button>
            </form>
          </div>
        </div>
      `;

      document.body.appendChild(container);
    }

    attachEventListeners() {
      const button = document.getElementById('ilibras-widget-button');
      const closeBtn = document.getElementById('ilibras-widget-close');
      const form = document.getElementById('ilibras-widget-form');
      const modal = document.getElementById('ilibras-widget-modal');

      button.addEventListener('click', () => this.toggleWidget());
      closeBtn.addEventListener('click', () => this.closeWidget());
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeWidget();
        }
      });

      this.setupInputMasks();

      form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    setupInputMasks() {
      const cpfInput = document.getElementById('ilibras-cpf');

      cpfInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        
        e.target.value = value;
      });
    }

    toggleWidget() {
      if (this.isOpen) {
        this.closeWidget();
      } else {
        this.openWidget();
      }
    }

    openWidget() {
      const modal = document.getElementById('ilibras-widget-modal');
      const button = document.getElementById('ilibras-widget-button');
      
      modal.classList.add('ilibras-widget-modal-open');
      button.classList.add('ilibras-widget-button-open');
      this.isOpen = true;

      setTimeout(() => {
        document.getElementById('ilibras-name').focus();
      }, 300);
    }

    closeWidget() {
      const modal = document.getElementById('ilibras-widget-modal');
      const button = document.getElementById('ilibras-widget-button');
      
      modal.classList.remove('ilibras-widget-modal-open');
      button.classList.remove('ilibras-widget-button-open');
      this.isOpen = false;
    }

    async handleSubmit(e) {
      e.preventDefault();

      const formData = new FormData(e.target);
      const nome = formData.get('name').trim();
      const cpf = formData.get('cpf').replace(/\D/g, '');
      const consentimento = formData.get('consent') === 'on';

      if (!this.validateCPF(cpf)) {
        alert('CPF inválido. Por favor, verifique o número digitado.');
        return;
      }

      if (nome.length < 3) {
        alert('Por favor, digite seu nome.');
        return;
      }

      if (!consentimento) {
        alert('Você precisa aceitar receber contato comercial para continuar.');
        return;
      }

      const submitButton = e.target.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Aguarde...';

      try {
        const response = await fetch('https://sistema.ilibras.com.br/administrativo/api/clientes/cadastrar.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cpf: cpf,
            nome_usuario: nome,
            nome: nome
          })
        });

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }

        const result = await response.json();

        if (result.link || result.url || result.redirect) {
          const redirectUrl = result.link || result.url || result.redirect;
          window.location.href = redirectUrl;
        } else if (result.success && result.message) {
          alert(result.message);
          if (this.config.redirectUrl) {
            window.location.href = this.config.redirectUrl;
          }
        } else {
          throw new Error(result.error || result.message || 'Resposta inesperada da API');
        }

      } catch (error) {
        console.error('Erro ao enviar dados:', error);
        
        alert('Erro ao processar sua solicitação. Por favor, tente novamente.');
        
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    }

    validateCPF(cpf) {
      cpf = cpf.replace(/\D/g, '');
      
      if (cpf.length !== 11) return false;
      
      if (/^(\d)\1{10}$/.test(cpf)) return false;
      
      let sum = 0;
      for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
      }
      
      let remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== parseInt(cpf.substring(9, 10))) return false;

      sum = 0;
      for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
      }
      
      remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== parseInt(cpf.substring(10, 11))) return false;

      return true;
    }

    destroy() {
      const container = document.getElementById('ilibras-widget-container');
      if (container) {
        container.remove();
      }
      
      const styles = document.getElementById('ilibras-widget-styles');
      if (styles) {
        styles.remove();
      }
    }
  }

  window.ILibrasWidget = ILibrasWidget;

  if (window.iLibrasWidgetConfig) {
    window.iLibrasWidgetInstance = new ILibrasWidget(window.iLibrasWidgetConfig);
  }
})();
