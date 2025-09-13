# 🔑 **GUIA DE CONFIGURAÇÃO DAS CHAVES API**

## 📍 **ONDE COLOCAR AS CHAVES**

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```bash
# 📂 Localização: /envimerse/.env.local
```

---

## 🔧 **CHAVES ESSENCIAIS (OBRIGATÓRIAS)**

### **1. 🌐 WalletConnect (Para conexão de carteiras)**
```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=seu_wallet_connect_project_id
```
**Como obter:**
1. Acesse: https://cloud.walletconnect.com/
2. Crie uma conta/faça login
3. Crie um novo projeto
4. Copie o Project ID

### **2. ⛓️ Alchemy (Para blockchain)**
```bash
NEXT_PUBLIC_ALCHEMY_API_KEY=sua_alchemy_api_key
```
**Como obter:**
1. Acesse: https://www.alchemy.com/
2. Crie uma conta
3. Crie uma nova app
4. Copie a API Key

---

## 💳 **CHAVES DE PAGAMENTO (IMPORTANTES)**

### **3. 💳 Stripe (Para pagamentos fiat)**
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
```
**Como obter:**
1. Acesse: https://stripe.com/
2. Crie conta e complete verificação
3. Vá em "Developers" > "API Keys"
4. Copie as chaves (use test primeiro)

### **4. 🪙 Crypto (Para pagamentos crypto)**
```bash
NEXT_PUBLIC_ONRAMPER_API_KEY=sua_onramper_key
```
**Como obter:**
1. Acesse: https://onramper.com/
2. Crie conta de desenvolvedor
3. Solicite API key

---

## 📊 **CHAVES DE ANALYTICS (OPCIONAIS)**

### **5. 📈 Google Analytics**
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```
**Como obter:**
1. Acesse: https://analytics.google.com/
2. Crie propriedade para envimerse.com
3. Copie o Measurement ID

### **6. 📊 Mixpanel (Para eventos Web3)**
```bash
NEXT_PUBLIC_MIXPANEL_TOKEN=seu_mixpanel_token
```
**Como obter:**
1. Acesse: https://mixpanel.com/
2. Crie projeto
3. Copie o Project Token

---

## 🤖 **CHAVES FUTURAS (PARA DEPOIS)**

### **7. 🧠 OpenAI (Para features IA)**
```bash
OPENAI_API_KEY=sk-sua_openai_key
```

### **8. 📦 IPFS/Pinata (Para NFTs)**
```bash
PINATA_API_KEY=sua_pinata_key
PINATA_SECRET_KEY=sua_pinata_secret
```

---

## 🔧 **EXEMPLO COMPLETO DO .env.local**

```bash
# ===== CHAVES ESSENCIAIS =====
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=a1b2c3d4e5f6g7h8i9j0
NEXT_PUBLIC_ALCHEMY_API_KEY=alch_1234567890abcdef

# ===== PAGAMENTOS =====
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_ONRAMPER_API_KEY=onramper_789xyz

# ===== ANALYTICS =====
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-ABC123DEF4
NEXT_PUBLIC_MIXPANEL_TOKEN=1234567890abcdef

# ===== CONFIGURAÇÕES =====
NEXT_PUBLIC_APP_URL=https://envimerse.com
NEXT_PUBLIC_APP_NAME=Envimerse
```

---

## ⚡ **COMO APLICAR AS MUDANÇAS**

1. **Criar/editar arquivo:**
   ```bash
   nano .env.local
   ```

2. **Adicionar as chaves**

3. **Reiniciar servidor:**
   ```bash
   npm run dev
   ```

4. **Verificar se funcionou:**
   - Wallet connection deve funcionar
   - Pagamentos devem aparecer
   - Analytics deve trackear

---

## 🔒 **SEGURANÇA**

- ❌ **NUNCA** commitar `.env.local` no Git
- ✅ **SÓ** variáveis `NEXT_PUBLIC_*` vão para o frontend
- 🔐 Chaves `SECRET` ficam só no servidor
- 🧪 Use chaves de **teste** primeiro

---

## 🚀 **PRIORIDADES**

### **Agora (essencial):**
1. WalletConnect Project ID
2. Alchemy API Key

### **Em breve (importante):**
3. Stripe Keys
4. Google Analytics

### **Depois (nice to have):**
5. Mixpanel
6. Onramper
7. OpenAI
8. Pinata

---

**🎯 Com WalletConnect + Alchemy, o site já fica 100% funcional para Web3!**
