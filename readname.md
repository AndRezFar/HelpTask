# ✅ HelpTask — Gerenciador de Tarefas Inteligente

O **HelpTask** é um sistema web desenvolvido para ajudar usuários a **organizar suas tarefas diárias**, oferecendo uma experiência simples, rápida e eficiente.  
Foi criado como parte de um projeto acadêmico, mas pensado para uso real, com funcionalidades completas de criação, listagem, filtragem e gestão de tarefas.

---

## 🎯 **Objetivo do Projeto**

O intuito do HelpTask é proporcionar uma ferramenta visual e intuitiva que auxilie usuários a:

- Criar tarefas facilmente  
- Acompanhar pendências  
- Organizar rotinas  
- Priorizar atividades  
- Manter histórico de concluídas e excluídas  

Tudo isso com uma interface simples e um back-end robusto, conectado ao banco de dados na nuvem.

---

# Diagramas: [Acesse o Google Drive.](https://drive.google.com/drive/folders/1vg0qnecJ2nsG9PvSJICh5MTciWigMms1?usp=sharing)

---
# 🛠️ **Tecnologias Utilizadas**

### **Front-End**
- HTML5  
- CSS3  
- JavaScript (ES6+)  
- Layout responsivo

### **Back-End**
- Python  
- Flask  
- Gunicorn (produção)

### **Banco de Dados**
- MongoDB Atlas (nuvem)

### **Testes**
- Pytest  
- Mongomock (mock da base de dados)

---

# ⚙️ **Funcionalidades**

### ✔ Criar tarefas  
Inclui título, prioridade, prazo e data de criação automatizada.

### ✔ Listar tarefas  
Apenas tarefas pendentes aparecem na lista principal.

### ✔ Filtrar tarefas  
Por:
- Data de criação  
- Prazo  
- Prioridade  

### ✔ Marcar como concluída  
Move automaticamente para o histórico (status: "concluida").

### ✔ Excluir tarefa  
Move para histórico com status "excluida".

### ✔ Histórico de ações  
Cada tarefa guarda:
- dataCriacao  
- dataConclusao  
- dataExclusao  

### ✔ API REST própria  
Endpoints em Flask.

---

# 🔌 **API — Endpoints**

### ➕ Criar tarefa
POST /tarefas


### 📄 Listar tarefas pendentes


GET /tarefas


### ✔ Concluir tarefa


PUT /tarefas/<id>


### ❌ Excluir tarefa


DELETE /tarefas/<id>


Retornos sempre em JSON.

---

# 🧱 **Arquitetura do Projeto**



/HelpTask
│
├── front-end/
│ ├── index.html
│ ├── style.css
│ └── app.js
│
├── back-end/
│ ├── app.py
│ ├── controllers/
│ │ └── tarefaController.py
│ ├── models/
│ │ └── tarefa.py
│ ├── database/
│ │ ├── connection.py
│ └── testes/
│ | ├── test_tarefa.py
│ └── conftest.py
│
└── README.md


---

# 🧪 **Testes Automatizados**

O projeto possui testes para:

- Criar tarefa  
- Listar tarefas  
- Concluir tarefa  
- Excluir tarefa  

Testes utilizam `pytest` + `mongomock` para simular o banco de dados sem tocar no MongoDB real.

Para rodar:



pytest -vv


---

# 🚀 **Deploy**

### **Back-end hospedado em:**
Render.com (Web Service – grátis)

### **Front-end hospedado em:**
Netlify (arquivos estáticos – grátis)

### Como rodar localmente:



cd back-end
pip install -r requirements.txt
python app.py


---

# 👨‍💻 **Autor**

**Andrews Rezende**

Estudante de Desenvolvimento de Software  
Focado em tecnologia, dados e projetos digitais.

---

# 📄 **Licença**
Este projeto é de uso acadêmico e livre para fins educacionais.