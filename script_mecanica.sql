
create table clients(
id_clients serial primary key,
nome_user varchar(255) not null,
email varchar(255) not null,
senha varchar(255) not null,
cpf varchar(100) unique not null,
telefone varchar(100) not null unique,
endereco varchar(255) not null,
cargo varchar(20) default 1
);
create table carros(
id_car serial primary key,
modelo varchar(255) not null, 
marca varchar(255) not null, 
placa_veiculo varchar(255) unique not null,
cor varchar(50) not null,
id_proprietario int references clients(id_clients)
);
create table services(
id_service serial primary key,
dat_entrada DATE DEFAULT CURRENT_DATE,
dat_saida DATE,
descricao text,
tipo_servico varchar(255) not null,
situacao varchar(255),
valor DECIMAL(10,2) not null,
id_veiculo int references carros(id_car)
);

INSERT INTO clients (
    nome_user,
    email,
    senha,
    cpf,
    telefone,
    endereco
) VALUES (
    'Anderson Felipe',
    'anderson@gmail.com',
    '123456',
    '123.456.789-00',
    '(17) 99999-9999',
    'Rua das Flores, 123'
);

INSERT INTO carros (
    modelo,
    marca,
    placa_veiculo,
    cor,
    id_proprietario
) VALUES (
    'BMW X6',
    'BMW',
    'ijadiwjn718',
    'Ciano',
    2
);
INSERT INTO carros (
    modelo,
    marca,
    placa_veiculo,
    cor,
    id_proprietario
) VALUES (
    'Civic',
    'honda',
    'abcd1234',
    'preto',
    1
);
INSERT INTO services (
    descricao,
    tipo_servico,
    situacao,
    valor,
    id_veiculo
) VALUES (
    'Troca de óleo e filtro',
    'Manutenção',
    'Concluído',
    250.00,
    1
);

select * from carros;
select * from services
select * from clients;

drop table clients;
drop table carros;
drop table services;

           
