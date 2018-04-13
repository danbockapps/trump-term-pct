create table generic_ballot (
  id int not null primary key auto_increment,
  date date not null,
  dem_estimate float not null,
  rep_estimate float not null,
  timestamp timestamp
);
