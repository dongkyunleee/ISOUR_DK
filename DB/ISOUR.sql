CREATE TABLE I_MEMBER (
    
    ID      VARCHAR2(30) PRIMARY KEY,
    PWD     VARCHAR2(20),
    NAME    VARCHAR2(30),
    GENDER  VARCHAR2(10),
    BIRTH   VARCHAR2(20),
    REGION1  VARCHAR2(20),
    REGION2  VARCHAR2(20)
);

INSERT INTO I_MEMBER VALUES('LEEMH', 'SPHB8250', '�̹���', '1', '96/01/4', '', '');
INSERT INTO I_MEMBER VALUES('JEONKH', '1234567', '������', '1', '96/01/4', '', '');
INSERT INTO I_MEMBER VALUES('JOHK', '1234567', '������', '1', '96/01/4', '', '');
INSERT INTO I_MEMBER VALUES('WOOHJ', '1234567', '������', '1', '96/01/4', '', '');
INSERT INTO I_MEMBER VALUES('LEEDK', '12345612', '�̵���', '1', '96/01/4', '', '');
INSERT INTO I_MEMBER VALUES('admin', 'admin1234', '������', '1', '96/01/4', '', '');
INSERT INTO I_MEMBER VALUES('newbi', 'newbi1234', '����', '��', '96/01/4', '', '');

INSERT INTO I_MEMBER(ID, PWD, NAME, GENDER, BIRTH, REGION) VALUES(?, ?, ?, ?, ?, ?);

SELECT *
FROM I_MEMBER;

COMMIT;

drop table i_member;

SELECT * FROM I_MEMBER WHERE ID = 'admin';




