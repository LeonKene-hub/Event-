--DQL Data Querry Language

USE [Event+_Manha]

--Consulta simples
SELECT * FROM Comentario
SELECT * FROM Evento
SELECT * FROM Instituicao
SELECT * FROM PresencaEvento
SELECT * FROM TipoDeEvento
SELECT * FROM TipoDeUsuario
SELECT * FROM Usuario

--Consulta complexa e completa
SELECT
	Usuario.Nome AS Usuario,
	TipoDeUsuario.TituloTipoUsuario AS Permissão,
	Evento.DataEvento AS [Data do evento],
	Instituicao.NomeFantasia AS [Local],
	Evento.NomeEvento AS [Nome Evento],
	Evento.Descricao AS Descrição,
	CASE WHEN PresencaEvento.Situacao = 1 THEN 'Confirmado' ELSE 'Nao confirmada' END AS Situacao,
	Comentario.Descrição AS Comentario
FROM 
	Usuario LEFT JOIN TipoDeUsuario ON Usuario.IdTipoUsuario = TipoDeUsuario.IdTipoUsuario,
	Evento LEFT JOIN Instituicao ON Evento.IdInstituicao = Instituicao.IdInstituicao,
	PresencaEvento LEFT JOIN Comentario ON Comentario.IdUsuario = PresencaEvento.IdUsuario