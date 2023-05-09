drop database littleprincequotes;

create database littleprincequotes
with encoding = 'UTF8';

create table quotes(
    id serial primary key,
    language char(2),
    chapter char(2),
    quote text
);

insert into quotes (language, chapter, quote) values
    ('FR', '0', 'Toutes les grandes personnes ont d''abord été des enfants. (Mais peu d''entre elles s''en souviennent.)'),
('EN', '0', 'All grown-ups were once children, although few of them remember it.'),
('ES', '0', 'Todos los adultos alguna vez fueron niños (aunque pocos de ellos lo recuerdan)'),
('EN','1','In the course of this life I have had a great many encounters with a great many people who have been concerned with matters of consequence. I have lived a great deal among grown-ups. I have seen them intimately, close at hand. And that hasn''t much improved my opinion of them');

delete from quotes;



