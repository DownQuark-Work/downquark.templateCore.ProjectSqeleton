# Persistence

## IndexedDB \[browser]
> can run on any port that a FE is running on
- `ViewTest.js` is a pseudo-business-layer

## MariaDB \[relational]
> https://mariadb.com/kb/en/getting-started-with-the-nodejs-connector/
> > **_https://deno.land/x/mysql@v2.10.2/mod.ts_**
# # start server with the following
 `% /opt/homebrew/opt/mariadb/bin/mysqld_safe --datadir=/opt/homebrew/var/mysql --port 3366 --log-bin`

## ArangoDb \[graph]
> currently (M1 machines) must be launched from application
`% /Applications/ArangoDB3-CLI.app/Contents/Resources/arangosh'`
# webconsole accessible at: http://127.0.0.1:8529/


## QuestDB \[time-series]
> https://questdb.io/
`% /opt/homebrew/opt/questdb/bin/questdb start -d /opt/homebrew/var/questdb -n -f`
# webconsole accessible at: http://127.0.0.1:9000/

## Bus/Queue \[optional]

---

Demo concept for bus completion:
- https://dbdiagram.io/d/630c565df1a9b01b0ffd2f7c
  - Incorporate:
    - https://www.arangodb.com/learn/search/tutorial/
    - RelationalDB `SYSTEM VERSIONING` (and _view_) on **comments** table and show how it tracks edits