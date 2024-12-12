<h1 align="center"> Jogo da Velha <img align='center' width='100px' height='100px' src="https://github.com/user-attachments/assets/980d9e00-b40c-4bb0-8489-67604e06dc06" /> </h1> 

<h3 align="left">
  Sobre o projeto:
</h3>

Este projeto consiste no desenvolvimento de um jogo da velha utilizando as linguagens, ferramentas, frameworks e tecnologias empregadas na Capim, como Docker, Ruby, Ruby on Rails e Vue.js. Além do jogo em si, foi implementado um sistema CRUD para a visualização e manipulação dos dados dos jogos em uma tabela. O objetivo principal é demonstrar habilidades em desenvolvimento full-stack, integração de diversas tecnologias e construção de interfaces dinâmicas e interativas.

<h3 align="left">
  Como a aplicação funciona:
</h3>

A aplicação se inicia em uma página introdutória Home, onde é apresentada uma breve descrição do projeto, uma foto minha, dois botões para as principais páginas da aplicação e um logo da Capim no topo.

Ao clicar no botão Novo Jogo, o usuário é direcionado à página principal do jogo da velha, onde é possível visualizar o tabuleiro do jogo e um botão para Recomeçar a partida, que reinicia o jogo. Quando a partida termina, seja com um dos jogadores (X ou O) vencendo, ou em empate (quando o tabuleiro está completo e não há uma sequência de vitória), um modal aparece no centro da tela indicando o resultado. Nesta tela, o usuário poderá ver quem ganhou ou se houve empate, além de botões para iniciar um Novo Jogo e para acessar o Histórico de Jogos.

Na página de Histórico de Jogos, o usuário pode visualizar todas as partidas registradas, ver como um determinado jogo terminou, solicitar uma revanche de um jogo específico e deletar um jogo do banco de dados. Para todas essas ações, será aberto um modal para confirmar a ação ou, no caso de visualizar uma partida, mostrar o estado final do tabuleiro.

Nas duas páginas principais, Game (o tabuleiro do jogo) e TableGames (o histórico de partidas), será renderizado um Header no topo de ambas, oferecendo opções de navegação, incluindo o logo da Capim, que redireciona para a página principal Home, e dois botões para navegação até a página do jogo ou o histórico de partidas.


<h3 align="left">
  Como rodar a aplicação:
</h3>

#### 1. Baixando o Projeto:

* Primeiro, você precisa obter uma cópia do projeto em sua máquina. Existem duas maneiras de fazer isso:

1. Download do ZIP: Acesse o repositório do projeto no GitHub, clique em "Code" e, em seguida, selecione "Download ZIP". Após o download, extraia o conteúdo em uma pasta de sua escolha.
2. Git Clone: Se preferir, você pode clonar o repositório diretamente usando o comando a seguir no terminal: </br> </br>
``` git clone https://github.com/giovanibaldan/jogo-velha-frontend.git ```

#### 2. Pré-requisitos:

- Certifique-se de ter o npm ou yarn instalado na sua máquina. Esses gerenciadores de pacotes são essenciais para instalar as dependências do projeto.

#### 3. Instalação das Dependências:

* Navegue até o diretório do projeto, \apiGithub, usando o terminal.
* Execute um dos seguintes comandos para instalar as dependências necessárias: </br> </br>
`npm install` ou `yarn install`
</br> </br>
Isso irá baixar e configurar todos os pacotes necessários para o funcionamento da aplicação.

#### 4. Inicialização do Projeto:

- Após a instalação das dependências, inicie a aplicação com um dos seguintes comandos: </br> </br>
`npm run dev`  ou  `yarn dev`
</br> </br>
Isso irá iniciar o servidor de desenvolvimento, hospedando o projeto localmente na porta 5173.

#### 5. Acesso à Aplicação:

- Abra o navegador e acesse o seguinte endereço para visualizar e utilizar o site localmente: </br> </br>
```http://localhost:5173``` </br> </br>

<h3 align="left">
    Tecnologias utilizadas:
  </h3>
   <table >
       <td align="center">
            <img src="https://skillicons.dev/icons?i=js" width="65px" alt="C icon" /><br>
            <pre><b>Javascript</b></pre>
        </td>
       <td align="center">
            <img src="https://skillicons.dev/icons?i=html" width="65px" alt="C icon" /><br>
            <pre><b>HTML</b></pre>
        </td>
       <td align="center">
            <img src="https://skillicons.dev/icons?i=css" width="65px" alt="C icon" /><br>
            <pre><b>CSS</b></pre>
        </td>
       <td align="center">
            <img src="https://skillicons.dev/icons?i=vue" width="65px" alt="C icon" /><br>
            <pre><b>Vue.js</b></pre>
        </td>
       <td align="center">
            <img src="https://skillicons.dev/icons?i=ruby" width="65px" alt="C icon" /><br>
            <pre><b>Ruby</b></pre>
        </td>
       <td align="center">
            <img src="https://skillicons.dev/icons?i=rubyonrails" width="65px" alt="C icon" /><br>
            <pre><b>Ruby on Rails</b></pre>
        </td>
       <td align="center">
            <img src="https://skillicons.dev/icons?i=git" width="65px" alt="C icon" /><br>
            <pre><b>Git</b></pre>
        </td>
       <td align="center">
            <img src="https://skillicons.dev/icons?i=docker" width="65px" alt="C icon" /><br>
            <pre><b>Docker</b></pre>
        </td>
       <td align="center">
            <img src="https://skillicons.dev/icons?i=postgresql" width="65px" alt="C icon" /><br>
            <pre><b>PostgreSQL</b></pre>
        </td>
       <td align="center">
            <img src="https://skillicons.dev/icons?i=yarn" width="65px" alt="C icon" /><br>
            <pre><b>Yarn</b></pre>
        </td>
       <td align="center">
            <img src="https://skillicons.dev/icons?i=vite" width="65px" alt="C icon" /><br>
            <pre><b>Vite</b></pre>
        </td>
       <td align="center">
            <img src="https://skillicons.dev/icons?i=markdown" width="65px" alt="C icon" /><br>
            <pre><b>Markdown</b></pre>
        </td>
  </table>
</br>

<h3 align="left"> Levantamento de Requisitos: </h3>
<h4 align="left"> Requisitos Funcionais do Front-end: </h4>

##### 1. Criar tabuleiro do jogo
##### 2. Permitir que o tabuleiro seja jogado
##### 3. Mostrar o histórico de jogos
##### 4. Mostrar como foi um jogo específico
##### 5. Possibilitar a exclusão de um jogo
##### 6. Permitir o rematch do jogo
##### 7. Conectar o front com o back
##### Bônus 1: Implementar testes no front-end
##### Bonus 2: Readme bonitinho
</br>

<h4 align="left"> Requisitos Funcionais do Back-end: </h4>

##### 1. Criar CRUD para o model de Game
##### 2. Configurar rotas para os métodos do CRUD
##### Regras:
    - Create: salvar o jogo no banco com quem ganhou (X ou O), e quando foi jogado
    - Read: conseguir mostrar quem venceu o jogo, a data e (bônus) mostrar como ficou a tabuleiro
    - Update: rematch do jogo, ou seja, que o jogo tenha uma revanche
    - Delete: apagar o jogo do histórico
##### 3. Realizar a API com Rails
##### 4. Criar e subir o banco de dados com PostgreSQL
##### 5. Estrutura a infra com Docker
##### 6. Realizar o versionamento de código pelo GIT
##### Bônus 1: Implementar testes no back-end
