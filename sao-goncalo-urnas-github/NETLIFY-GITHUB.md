# Publicar no GitHub e Netlify

## 1. Criar o repositório no GitHub

Crie um repositório vazio no GitHub, sem README, `.gitignore` ou licença. Depois, na pasta do projeto:

```bash
git init
git add .
git commit -m "Site São Gonçalo Urnas Funerárias"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
git push -u origin main
```

Se o projeto já estiver versionado, use apenas:

```bash
git add .
git commit -m "Preparar deploy no Netlify"
git push
```

## 2. Conectar ao Netlify

1. Acesse https://app.netlify.com/.
2. Clique em **Add new project** → **Import an existing project**.
3. Escolha **GitHub** e autorize o acesso.
4. Selecione o repositório.
5. Use estas configurações:

- **Build command:** `pnpm run build`
- **Publish directory:** `dist/public`
- **Node version:** `20`

6. Clique em **Deploy**.

O projeto já usa imagens locais em `client/public/images`, então não depende dos caminhos privados do WebDev e pode ser publicado diretamente no Netlify.

## 3. Atualizar o site depois

Sempre que alterar o projeto:

```bash
git add .
git commit -m "Atualizar catálogo"
git push
```

O Netlify fará um novo deploy automaticamente.
