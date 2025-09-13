# 🚀 **GUIA DE DEPLOY - ENVIMERSE**

## 🔐 **VARIÁVEIS DE AMBIENTE - COMO FUNCIONA**

### **📂 LOCAL (.env.local)**
- ✅ **Fica só no seu computador**
- ❌ **NÃO vai para o GitHub/Vercel**
- 🔒 **Seguro para chaves secretas**

### **☁️ PRODUÇÃO (Vercel)**
- ✅ **Configurado no painel do Vercel**
- ✅ **Seguro e criptografado**
- 🌐 **Usado pelo site em produção**

---

## ⚡ **DIFERENÇA IMPORTANTE:**

### **🌐 NEXT_PUBLIC_*** (Público)
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=abc123...
```
- ✅ **Vai para o frontend** (navegador do usuário)
- ✅ **É SEGURO** expor (são chaves públicas)
- 🔍 **Qualquer um pode ver** no código

### **🔒 Sem NEXT_PUBLIC_** (Secreto)
```bash
STRIPE_SECRET_KEY=sk_test_...
DATABASE_URL=postgres://...
```
- ❌ **NÃO vai para o frontend**
- 🔒 **Fica só no servidor**
- 🚨 **NUNCA deve vazar**

---

## 🚀 **PROCESSO DE DEPLOY**

### **1. Fazer Push para GitHub**
```bash
git add .
git commit -m "🚀 Deploy: Site completo com comissões"
git push origin main
```

### **2. Conectar ao Vercel**
- Acesse: https://vercel.com/
- Importe o repositório GitHub
- Vercel detecta Next.js automaticamente

### **3. Configurar Variáveis no Vercel**
No painel do Vercel → Settings → Environment Variables:

```bash
# ESSENCIAIS (coloque as suas)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=sua_chave_real
NEXT_PUBLIC_ALCHEMY_API_KEY=sua_chave_real

# STRIPE (já temos ✅)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51RziTv...
STRIPE_SECRET_KEY=sk_test_51RziTv...

# ANALYTICS (se tiver)
NEXT_PUBLIC_MIXPANEL_TOKEN=seu_project_token

# APP CONFIG
NEXT_PUBLIC_APP_URL=https://envimerse.com
NEXT_PUBLIC_APP_NAME=Envimerse
```

### **4. Deploy Automático**
- Vercel faz deploy automaticamente
- ✅ Build + Deploy em ~2min
- 🌐 Site fica online

---

## 🧪 **TESTANDO EM PRODUÇÃO**

### **✅ O que deve funcionar:**
- 🌐 Site carrega
- 🎬 Vídeo de fundo na hero
- 🌌 Galáxia CSS (fallback)
- 🔗 Navegação entre páginas
- 💳 Botão "Connect Wallet" (se tiver WalletConnect)

### **❌ O que pode não funcionar (sem chaves):**
- 🔗 Conexão de carteira (precisa WalletConnect)
- ⛓️ Dados da blockchain (precisa Alchemy)
- 📊 Analytics (precisa GA/Mixpanel)

---

## 🎯 **STATUS ATUAL:**

### **✅ FUNCIONANDO:**
- 💳 **Stripe**: Configurado com chaves de teste
- 📊 **Mixpanel**: Project token configurado
- 🎨 **Frontend**: 100% funcional
- 📱 **Responsive**: Mobile + Desktop

### **❓ FALTANDO (você precisa conseguir):**
- 🔗 **WalletConnect**: Project ID
- ⛓️ **Alchemy**: API Key

### **❌ REMOVIDO (muito caro):**
- 🪙 **Onramper**: Não incluído por enquanto

---

## 🚨 **SEGURANÇA:**

### **✅ PODE expor (público):**
- Stripe Publishable Key (pk_test_...)
- WalletConnect Project ID
- Google Analytics ID
- Mixpanel Project Token

### **❌ NUNCA expor (secreto):**
- Stripe Secret Key (sk_test_...)
- Database URLs
- API Secrets

---

## 📞 **PRÓXIMOS PASSOS:**

1. **🔑 Conseguir chaves essenciais:**
   - WalletConnect Project ID
   - Alchemy API Key

2. **🚀 Fazer deploy:**
   ```bash
   git push origin main
   ```

3. **⚙️ Configurar no Vercel:**
   - Adicionar variáveis de ambiente
   - Confirmar deploy

4. **🧪 Testar:**
   - www.envimerse.com
   - Wallet connection
   - Navegação

**🎯 Com Stripe já funcionando, o site estará 80% operacional!**
