use shoppy;
select database();
show tables;
select * from information_schema.views where table_schema = 'shoppy';
select * from member;
select * from product;

desc product;

select * from product ;
-- 전체 상품 조회
select pid, concat('images/', image) as image from product;
-- 상품 상세 조회
select pid, name, price, info, rate, 
			concat('/images/', image) AS image, img_list as imgList from product where pid = 1;

-- product + product_detailinfo 테이블 조인
select pid, name, price, info, rate, 
			concat('/images/', image) AS image, img_list as imgList from product where pid = 1;
		
select * from product_detailinfo;

select 
	p.pid, p.name, p.price, p.info, p.rate, 
			concat('/images/', p.image) AS image, p.img_list as imgList,
            json_object("title_en", pd.title_en, 
						"title_ko" ,pd.title_ko, 
                        "list", pd.list) as detailInfo,
			json_array(pd.title_en, pd.title_ko) as testArray
		from product p inner join product_detailinfo pd on p.pid = pd.pid and p.pid = 1;

select * from product_qna;

select qid, title, content, is_complete as isComplete, is_lock as isLock, pid, cdate
	from product_qna where pid = 1;


desc product_return;
select * from product_return;

select rid, title, description, list from product_return;

select * from member;
desc member;

select * from member;

select count(id) as isFInd from member where id = 'test';

-- select count(*) from member where id = 'test' and pwd = '1234';

select pwd, role from member where id = 'test';

show tables;
desc cart;
select * from cart;
select * from member;
select * from product;

-- 어떤 고객이 어떤 상품을 몇 개 구입했는지
select * from view_cartlist;

select * from support;




































