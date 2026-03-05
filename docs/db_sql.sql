CREATE DATABASE escola;
USE escola;

CREATE TABLE alunos (
	idAluno INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nomeAluno VARCHAR(100) NOT NULL,
    emailAluno VARCHAR(128) NOT NULL,
    matricula VARCHAR(10) NOT NULL,
    curso VARCHAR(50) NOT NULL,
    mediaFinal DECIMAL(2,2) NOT NULL
);

CREATE TABLE professores (
	idProfessor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nomeProfessor VARCHAR(100) NOT NULL,
    emailProfessor VARCHAR(128) NOT NULL,
	disciplina VARCHAR(100) NOT NULL,
	cargaHoraria INT NOT NULL
);

SELECT * FROM alunos;
SELECT * FROM professores;