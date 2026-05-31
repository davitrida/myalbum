# MyAlbum — Gerenciador de Figurinhas da Copa do Mundo

> Gerencie sua coleção de figurinhas, acompanhe seu progresso e nunca mais perca o controle das repetidas.

---

## Funcionalidades

- **994 figurinhas** organizadas em 50 seções:
  - FWP — Especiais (figurinhas 000–019)
  - Coca-Cola (14 figurinhas com jogadores patrocinados)
  - 48 seleções nacionais divididas em 12 grupos (A–L), 20 figurinhas cada
- **Coletar figurinha** com um clique ou arrastando o mouse sobre várias bolinhas de uma vez
- **Marcar repetidas** com contador por figurinha (botões + e −)
- **Descoletar** figurinha individualmente
- **Tooltip no hover** mostrando nome do jogador, seleção e código da figurinha
- **Barra de progresso** com total coletado e percentual
- **Página de Estatísticas** com:
  - Gráfico donut com percentual de conclusão animado
  - Total de figurinhas do álbum
  - Total coletadas
  - Total faltando
  - Quantidade de repetidas
- **Página Sobre** com descrição do projeto e links sociais do criador
- Navegação entre páginas sem recarregar (SPA)
- Atualizações otimistas — interface responde instantaneamente ao clique, sincroniza com o servidor em segundo plano

---

## Tecnologias

### Backend
Desenvolvido **à mão** por Davi Trida.

| Tecnologia | Versão | Uso |
|---|---|---|
| Python | 3.11+ | Linguagem base |
| FastAPI | 0.136 | Framework da API REST |
| SQLAlchemy | 2.0 | ORM e gerenciamento do banco |
| SQLite | — | Banco de dados local |
| Uvicorn | 0.46 | Servidor ASGI |
| Pydantic | 2.x | Validação de dados |

### Frontend
Desenvolvido com **Claude (Anthropic)** e **Vercel v0**.

| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js | 16.2 | Framework React com roteamento SPA |
| React | 19 | Biblioteca de UI |
| TypeScript | 5.7 | Tipagem estática |
| Tailwind CSS | 4.x | Estilização |
| Recharts | 2.15 | Gráfico de estatísticas |
| Lucide React | 0.564 | Ícones |
| shadcn/ui | — | Componentes base de UI |

---

## Estrutura do Projeto

```
myalbum/
├── main.py                  # Endpoints da API (FastAPI)
├── models.py                # Modelos do banco (SQLAlchemy)
├── database.py              # Conexão com o SQLite
├── crud.py                  # Operações no banco
├── services.py              # Lógica de negócio
├── seed.py                  # Importa figurinhas dos JSONs para o banco
├── requirements.txt         # Dependências Python
├── stickers.db              # Banco de dados SQLite (gerado pelo seed)
├── data/                    # JSONs com dados das figurinhas
│   ├── FWP.json
│   ├── COCA.json
│   ├── GRP_A.json/
│   │   ├── CZE.json
│   │   └── ...
│   └── GRP_L.json/
└── frontend_myalbum/        # Aplicação Next.js
    ├── app/
    │   ├── page.tsx             # Página principal do álbum
    │   ├── estatisticas/        # Página de estatísticas
    │   └── sobre/               # Página sobre
    ├── components/
    │   ├── country-section.tsx  # Seção por seleção
    │   ├── sticker-circle.tsx   # Bolinha de figurinha
    │   ├── progress-bar.tsx     # Barra de progresso
    │   └── header.tsx           # Navegação
    └── context/
        └── album-context.tsx    # Estado global do álbum
```

---

## API — Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/users/me` | Retorna (ou cria) o usuário padrão |
| GET | `/stickers` | Lista todas as figurinhas |
| GET | `/album/{user_id}` | Retorna o álbum do usuário |
| POST | `/album/add` | Adiciona/incrementa figurinha no álbum |
| POST | `/album/remove` | Decrementa quantidade de uma figurinha |
| DELETE | `/album/entry` | Remove figurinha do álbum completamente |

A documentação interativa completa da API está disponível em `http://localhost:8000/docs` após iniciar o servidor.

---

## Como rodar localmente

### Pré-requisitos

- Python 3.11 ou superior
- Node.js 18 ou superior
- npm

---

### 1. Clone o repositório

```bash
git clone https://github.com/davitrida/myalbum.git
cd myalbum
```

---

### 2. Configure o Backend

**Crie e ative o ambiente virtual:**

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

**Instale as dependências:**

```bash
pip install -r requirements.txt
```

**Popule o banco de dados:**

```bash
python seed.py
```

> Isso lê todos os JSONs da pasta `data/` e insere as 994 figurinhas no banco `stickers.db`.

**Inicie o servidor:**

```bash
uvicorn main:app --port 8000 --reload
```

O backend estará disponível em `http://localhost:8000`.  
Documentação interativa da API: `http://localhost:8000/docs`

---

### 3. Configure o Frontend

Em outro terminal, dentro da pasta do projeto:

```bash
cd frontend_myalbum
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:3000`.

---

### 4. Abra no navegador

```
http://localhost:3000
```

---

Obs: Se não der certo por aqui, ou se o servidor estiver com falhas, tente iniciar pelo arquivo start.sh

## Criado por

**Davi Trida**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/davi-trida-0b1083264)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/davitrida)
