# Luppa_api
Desafio backend --> Análise de documentos

<h4 align="center">
  🚧  Cache + Testes + Build --> Em construção...  🚧
</h4>

### Features

- [x] Criar análise
- [x] Listar todas análises
- [x] Buscar uma análise
- [ ] Cache
- [x] Tratamento de Erros
- [ ] Testes automatizados
- [ ] Build para produção


### Pré-requisitos

Para executar a aplicação, precisaremos instalar as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e [Yarn](https://yarnpkg.com/).

O projeto foi desenvolvido no sistema operacional [Linux Mint 20.0](https://linuxmint.com/) com o editor [VSCode](https://code.visualstudio.com/).


### 🎲 Rodando a api (servidor)

```bash
# Crie o container para o banco de dados Postgres:
$ docker run --name luppa_api -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

# Crie o container para o cache Redis:
$ docker run --name luppa_cache -p 6379:6379 -d -t redis:alpine

# Clone este repositório:
$ git clone <https://github.com/RoberManuki/Luppa_api.git>

# Acesse a pasta do projeto no terminal/cmd:
$ cd Luppa_api

# Dentro da pasta raiz, instale as dependências:
$ yarn

# Execute o servidor:
$ yarn dev:server

# O servidor inciará na porta:3333 - acesse <http://localhost:3333> para fazer as requisições.
```

### :star: Exemplos de requisições

```bash
# Crar análise
POST --> https://localhost:3333/analysis/
Body --> JSON
    {
      "fullName": "Robson da Silva Oliveira",
      "cpf": "13223653694",
      "documents": [
		"https://document.com/example/Luppa_1",
		"https://document.com/example/Luppa_2",
		"https://document.com/example/Luppa_3"
       ]
    }

# Listar todas análises
GET --> https://localhost:3333/analysis/list
No Body

# Listar uma análise
GET --> https://localhost:3333/analysis/list
Body --> JSON
    {
      "analyze_id": "id retornado na criação",
    }
```


### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Express](https://expressjs.com/pt-br/)
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redis](https://redis.io/)
- [Postgres](https://www.postgresql.org/)
- [Typeorm](https://typeorm.io/#/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Jest](https://jestjs.io/pt-BR/)
- [Docker](https://www.docker.com/)

### Autor

Robson da Silva Oliveira

- [LinkedIn](https://www.linkedin.com/in/robson-da-silva/)

### Informações Adicionais

Este projeto foi baseado no GoBarber_api, que é usado pela RocketSeat para ensinar Node, React e React-Native.

- [GoBarber_api](https://github.com/RoberManuki/GoBarber-api.git)

### Conclusão e Principais Dificuldades encontradas

Em modo geral, o desafio foi MUITO proveitoso.

Foi a primeira vez que participei de um exercício nesse formato, e ele realmente colocou meus conhecimentos à prova.

Ou seja, além de ser útil para me avaliarem, ele também serviu para minha auto avaliação, deixando evidente os pontos em que preciso me aperfeiçoar.

Tecnicamente, tive dificuldade em:

- Resgatar os dados do cache, quando em Array;
- Criação e configuração do relacionamentos;
- Montar corretamente a estrutura dos testes automatizados

Enfim, agradeço a oportunidade de participar desse desafio!
Procuro uma organização que possibilite um desenvolvedor iniciante a tornar-se um grande desenvolvedor, podem me ajudar!?!?
