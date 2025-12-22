# 📸 ENVIMERSE - GUIA DE IMAGENS

## 🎯 Estrutura de Diretórios

```
public/
├── bg-envi.mp4              ✅ Video de background (já existe)
├── logo.png                 ✅ Logo principal (já existe)
├── grid.svg                 ✅ Grid de fundo (já existe)
├── icons/                   ✅ Ícones (já existem)
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   └── ...
│
├── partners/                🆕 ADICIONAR
│   ├── rayban-meta.png
│   ├── apple-vision-pro.png
│   ├── oakley-prizm.png
│   └── meta-logo.png
│
├── events/                  🆕 ADICIONAR
│   ├── concert-1.jpg
│   ├── concert-2.jpg
│   ├── concert-3.jpg
│   ├── sports-1.jpg
│   ├── fashion-1.jpg
│   └── ...
│
├── smart-glasses/           🆕 ADICIONAR
│   ├── rayban-meta-demo.jpg
│   ├── vision-pro-demo.jpg
│   ├── oakley-sport.jpg
│   └── pov-demonstration.jpg
│
├── venues/                  🆕 ADICIONAR
│   ├── madison-square-garden.jpg
│   ├── sydney-opera-house.jpg
│   ├── fabric-london.jpg
│   └── ...
│
├── team/                    🆕 ADICIONAR
│   ├── bruno-briote.jpg
│   └── team-photo.jpg
│
└── technology/              🆕 ADICIONAR
    ├── blockchain.png       ✅ (já existe)
    ├── streaming-tech.jpg
    ├── vr-headset.png
    └── multi-pov-demo.jpg
```

---

## 🖼️ IMAGENS NECESSÁRIAS POR SEÇÃO

### 1️⃣ **Hero Section**
- ✅ `bg-envi.mp4` - Video de background (EXISTE)
- ⚠️ Considerar adicionar imagens estáticas como fallback

### 2️⃣ **Parcerias Estratégicas** (Nova Seção)
**Necessário:**
- `partners/rayban-meta.png` - Logo Ray-Ban Meta
- `partners/apple-vision-pro.png` - Logo/Imagem Apple Vision Pro
- `partners/oakley-prizm.png` - Logo Oakley Prizm
- `partners/meta-logo.png` - Logo Meta

**Sugestão de placeholders:**
Atualmente usando emojis (🕶️ 🥽 🏃). Substituir por imagens reais dos produtos.

### 3️⃣ **POV Section**
**Necessário:**
- `smart-glasses/rayban-meta-demo.jpg` - Pessoa usando Ray-Ban Meta
- `smart-glasses/vision-pro-demo.jpg` - Pessoa usando Vision Pro
- `smart-glasses/oakley-sport.jpg` - Pessoa usando Oakley em evento esportivo
- `smart-glasses/pov-demonstration.jpg` - Demonstração visual de múltiplos POVs

### 4️⃣ **Events Showcase**
**Necessário:**
- `events/concert-electronic.jpg` - Festival eletrônico
- `events/tennis-championship.jpg` - Campeonato de tênis
- `events/fashion-week.jpg` - Fashion Week

**Atualmente:** Usando gradientes CSS coloridos como placeholder.

### 5️⃣ **For Venues Page**
**Necessário:**
- `venues/madison-square-garden.jpg`
- `venues/sydney-opera-house.jpg`
- `venues/fabric-london.jpg`

### 6️⃣ **About Page - Team**
**Necessário:**
- `team/bruno-briote.jpg` - Foto profissional do Bruno
- `team/team-photo.jpg` - Foto da equipe (opcional)

**Atualmente:** Usando ícone `Award` como placeholder.

### 7️⃣ **Marketplace**
**Necessário:**
- Imagens de experiências VR (serão carregadas dinamicamente)
- `marketplace/placeholder.jpg` - Placeholder genérico

---

## 📐 ESPECIFICAÇÕES TÉCNICAS

### **Logos de Parceiros**
- **Formato:** PNG com transparência
- **Tamanho:** 400x200px (proporção 2:1)
- **Resolução:** 2x para Retina (800x400px)

### **Smart Glasses - Fotos de Produto**
- **Formato:** WEBP com fallback JPG
- **Tamanho:** 1200x800px (3:2)
- **Qualidade:** Alta (min 90%)

### **Event Cards**
- **Formato:** WEBP com fallback JPG
- **Tamanho:** 800x600px (4:3)
- **Qualidade:** Média-Alta (85%)

### **Team Photos**
- **Formato:** WEBP com fallback JPG
- **Tamanho:** 600x600px (1:1 quadrado)
- **Qualidade:** Alta (90%)

### **Background Images**
- **Formato:** WEBP com fallback JPG
- **Tamanho:** 1920x1080px (Full HD)
- **Qualidade:** Média (75% - otimizar para web)

---

## 🎨 ONDE ADICIONAR AS IMAGENS NO CÓDIGO

### **POVSection.tsx**
```tsx
<div className="h-48 rounded-lg overflow-hidden">
  <Image 
    src="/smart-glasses/rayban-meta-demo.jpg"
    alt="Ray-Ban Meta Smart Glasses"
    width={400}
    height={192}
    className="w-full h-full object-cover"
  />
</div>
```

### **HomePage - Partners Section**
```tsx
<Image 
  src="/partners/rayban-meta.png"
  alt="Ray-Ban Meta"
  width={200}
  height={100}
  className="mx-auto"
/>
```

### **Event Cards**
```tsx
<Image 
  src="/events/concert-electronic.jpg"
  alt="Electronic Festival"
  width={800}
  height={600}
  className="w-full h-48 object-cover"
/>
```

---

## 🔧 OTIMIZAÇÃO

### **Next.js Image Optimization**
O Next.js já otimiza automaticamente as imagens usando o componente `<Image>`:
- ✅ Lazy loading
- ✅ Responsive images
- ✅ WebP conversion
- ✅ CDN delivery

### **Compressão Recomendada**
Use ferramentas como:
- **TinyPNG** - https://tinypng.com
- **Squoosh** - https://squoosh.app
- **ImageOptim** (Mac) - https://imageoptim.com

---

## 📝 NOTAS IMPORTANTES

1. **Direitos de Imagem**: Certifique-se de ter direitos ou licença para usar todas as imagens de parceiros (Ray-Ban Meta, Apple, Oakley).

2. **Placeholders Atuais**: O site está usando emojis e gradientes CSS como placeholders. Funcionam bem mas imagens reais vão melhorar muito a apresentação.

3. **Alt Text**: Sempre adicione alt text descritivo para acessibilidade e SEO.

4. **Performance**: Use WEBP quando possível, com JPG como fallback para navegadores antigos.

5. **Próximos Passos**:
   - Coletar imagens dos parceiros (solicitar assets oficiais)
   - Contratar fotógrafo para foto profissional do Bruno
   - Criar mockups de eventos usando IA ou banco de imagens (Unsplash, Pexels)

---

## 🚀 FONTES DE IMAGENS (TEMPORÁRIAS)

Enquanto não tiver imagens oficiais, pode usar:

- **Unsplash** (https://unsplash.com) - Fotos gratuitas de alta qualidade
- **Pexels** (https://pexels.com) - Fotos e vídeos gratuitos
- **DALL-E / Midjourney** - Gerar imagens com IA
- **Figma Mockups** - Criar mockups de produtos

---

**Status Atual**: ✅ Estrutura documentada, aguardando imagens reais para implementação.

