# Customer Management API

Este projeto é uma API para gerenciar clientes. Ela permite cadastrar, visualizar e excluir clientes, além de calcular rotas otimizadas para visitar clientes.
Este projeto foi realizado para trabalhar em conjunto à uma aplicação [front-end](https://github.com/gabriel-ramos44/customer-management-frontend).
 

## Ferramentas Utilizadas

-   Node.js (v14.17.0)
-   PostgreSQL (v13.3)

## Instalação

1.  Clone este repositório:
        

-   `git clone https://github.com/seu-usuario/customer-management-api.git` 
    
-   Instale as dependências:

-   `cd customer-management-api
    ` 
     `npm install` 
    
-   Configuração do Banco de Dados:
    
    -   Certifique-se de ter o PostgreSQL instalado e em execução.
    -   Crie um banco de dados chamado `customer-management-db`.
    - Crie a tabela e colunas necessárias:

        CREATE TABLE IF NOT EXISTS public.customers
    (
        id integer NOT NULL DEFAULT nextval('customers_id_seq'::regclass),
        fullname character varying(50) COLLATE pg_catalog."default" NOT NULL,
        email character varying(50) COLLATE pg_catalog."default" NOT NULL,
        phone character varying(12) COLLATE pg_catalog."default" NOT NULL,
        coordx double precision NOT NULL,
        coordy double precision NOT NULL,
        CONSTRAINT customers_pkey PRIMARY KEY (id)
    )
    
	    TABLESPACE pg_default;
	    
	    ALTER TABLE IF EXISTS public.customers
	        OWNER to postgres;


  


-   Configure as credenciais de acesso no arquivo `.env` de acordo com o exemplo  dado no arquivo `.env.example`.

-   Execute o servidor:
    
	   Em modo de desenvolvimento (com `nodemon`):
        
	`npm run dev` 
    
	Em modo de produção:
`	npm start` 
        
2.  Acesse a API em [http://localhost:3030](http://localhost:3030).
    

## Rotas da API

-   `GET /api/customers`: Obtém a lista de todos os clientes.
-   `POST /api/customers`: Cria um novo cliente.
-   `PUT /api/customers/:id`: Atualiza os dados de um cliente pelo ID.
-   `DELETE /api/customers/:id`: Exclui um cliente pelo ID.
-   `GET /api/customers/calculate-route`: Calcula uma rota otimizada para visitar os clientes.  
