# Persistence

## IndexedDB \[browser]
> can run on any port that a FE is running on
- `ViewTest.js` is a pseudo-business-layer
## MariaDB \[relational]
> https://mariadb.com/kb/en/getting-started-with-the-nodejs-connector/
> > **_https://deno.land/x/mysql@v2.10.2/mod.ts_**
```
% brew install mariadb
% brew services run mariadb
% sudo mysql -u root # IMPORTANT: first login must be done through sudo
% GRANT ALL PRIVILEGES on *.* to 'root'@'localhost' IDENTIFIED BY '<PASSWORD>'; # replace <PASSWORD> with desired mysql root password
% FLUSH PRIVILEGES;
% exit
% sudo service mysql restart # good to go

% # recommended to launch mariadb on another part to avoid namespace conflicts when working on this architecture
% /opt/homebrew/opt/mariadb/bin/mysqld_safe --datadir=/opt/homebrew/var/mysql --port 3366
% mysql -u root -p -h localhost -P 3366 --protocol tcp
% # at this point you can also access the db via a GUI
% # to kill the above instance:
% pkill -f mariadb

# extra info
% brew services --help 
% brew services list
% brew services info mariadb
% brew services run mariadb
% brew services info mariadb 
% brew services stop mariadb
% brew services list

# check which ports are being used
% nmap -p 1-65535 --open localhost
% sudo lsof -P -i -n -sTCP:LISTEN
```
## ArangoDb \[graph]
## QuestDB \[time-series]

## Bus/Queue \[optional]