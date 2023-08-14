USE [Event+_Manha]

--INSERIR DAODS NAS TABELAS

INSERT INTO TipoDeUsuario (TituloTipoUsuario)
VALUES('Adiministrador'), ('Comum')

INSERT INTO TipoDeEvento (TituloTipoEvento)
VALUES('SQL Server')

INSERT INTO Instituicao(CNPJ, NomeFantasia, Endereco)
VALUES('1234567890', 'DevSchool', 'Rua Niteroi 180')

INSERT INTO Evento(IdInstituicao, IdTipoEvento, NomeEvento, Descricao, DataEvento)
VALUES(1, 1, 'Banco de Dados SQL Server','aula pratica','2023-08-10 10:00:00')

INSERT INTO Usuario(IdTipoUsuario, Nome, Email, Senha)
VALUES(1,'Carlos', 'admin@gmail.com', 'admin123')

INSERT INTO PresencaEvento(IdEvento, IdUsuario, Situacao)
VALUES(3, 1, 1)

INSERT INTO Comentario(IdEvento, IdUsuario, Descrição, Exibe)
VALUES (3, 1, 'OLA',1)