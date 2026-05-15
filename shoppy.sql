use shoppy;
select database();
show tables;
select * from information_schema.views where table_schema = 'shoppy';
select * from member;
select * from product;

desc product;

select * from product ;
select pid, concat('images/', image) as image from product;

select pid, name, price, info, concat('images/', image) as image, img_list from product;