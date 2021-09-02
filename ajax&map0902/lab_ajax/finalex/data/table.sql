use ssafy;

create table ssafy_cafe
(
	idx int not null auto_increment,
    pid varchar(5) unique,
    pname varchar(20) not null,
    price int,
    picture varchar(30) default 'noimg.png',
    cnt int default 0,
    constraint ssafy_cafe_idx_pk primary key (idx)
);

insert into ssafy_cafe (pid, pname, price, picture, cnt)
values ('h0001', '아메리카노', 4000, 'hot/americano.jpg', 112);

insert into ssafy_cafe (pid, pname, price, picture, cnt)
values ('h0002', '카페라떼', 4500, 'hot/cafelatte.jpg', 101);

insert into ssafy_cafe (pid, pname, price, picture, cnt)
values ('h0003', '카페모카', 5000, 'hot/cafemocha.jpg', 123);

insert into ssafy_cafe (pid, pname, price, picture, cnt)
values ('h0004', '카푸치노', 4500, 'hot/capuccino.jpg', 113);

insert into ssafy_cafe (pid, pname, price, picture, cnt)
values ('h0005', '카라멜마끼야또', 5500, 'hot/caramelmacchiato.jpg', 93);

insert into ssafy_cafe (pid, pname, price, picture, cnt)
values ('h0006', '에스프레소', 4800, 'hot/esspresso.jpg', 56);

insert into ssafy_cafe (pid, pname, price, picture, cnt)
values ('h0007', '바닐라라떼', 5200, 'hot/vanillalatte.jpg', 77);

insert into ssafy_cafe (pid, pname, price, picture, cnt)
values ('h0008', '화이트초코모카', 6000, 'hot/whitechocolatemocha.jpg', 45);

insert into ssafy_cafe (pid, pname, price, picture, cnt)
values ('i0001', '아이스 아메리카노', 4300, 'ice/ice_americano.jpg', 127);

insert into ssafy_cafe (pid, pname, price, picture, cnt)
values ('i0002', '아이스 카페라떼', 4700, 'ice/ice_cafelatte.jpg', 98);

insert into ssafy_cafe (pid, pname, price, picture, cnt)
values ('i0003', '아이스 카페모카', 5500, 'ice/ice_cafemocha.jpg', 111);

insert into ssafy_cafe (pid, pname, price, picture, cnt)
values ('i0004', '아이스 카푸치노', 4900, 'ice/ice_capuccino.jpg', 117);

insert into ssafy_cafe (pid, pname, price, picture, cnt)
values ('i0005', '아이스 카라멜마끼야또', 6200, 'ice/ice_caramelmacchiato.jpg', 96);

insert into ssafy_cafe (pid, pname, price, picture, cnt)
values ('i0006', '아이스 에스프레소', 5000, 'ice/ice_esspresso.jpg', 67);

insert into ssafy_cafe (pid, pname, price, picture, cnt)
values ('i0007', '아이스 바닐라라떼', 5500, 'ice/ice_vanillalatte.jpg', 87);

insert into ssafy_cafe (pid, pname, price, picture, cnt)
values ('i0008', '아이스 화이트초코모카', 6600, 'ice/ice_whitechocolatemocha.jpg', 108);

# 메뉴검색	


# 인기메뉴
select idx, pid, pname, price, picture, cnt
from ssafy_cafe
order by cnt desc limit 0, 4;