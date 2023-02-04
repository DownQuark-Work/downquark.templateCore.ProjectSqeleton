TODO: move the wiki / blog / forum into it's own repo and refernce it here when ready

I chose this repo to allow multiple versions of PHP to be runable:
- https://github.com/shivammathur/homebrew-php
 
 1. Follow the instructions on that page to install PHP
  - **STOP** before linking php to homebrew
  - Add it to your path instead
```
export PATH="/opt/homebrew/opt/php@7.4/bin:$PATH"
export PATH="/opt/homebrew/opt/php@7.4/sbin:$PATH"
  # below should only be needed when compiling for the first run
export LDFLAGS="-L/opt/homebrew/opt/php@7.4/lib"
export CPPFLAGS="-I/opt/homebrew/opt/php@7.4/include"
```

 1. Install the following package through homebrew so everything is compatible:
 ```
  % brew install httpd
  % which httpd
    # /opt/homebrew/bin/httpd
      # verify apachectl came along as a dependency
  % which apachectl
    # /opt/homebrew/bin/apachectl
 ```

 1. For virtual hosts to function correctly, update `/etc/host` to include `127.0.0.1  dq.local`

 1. replace:
    - `/opt/homebrew/etc/httpd/httpd.conf`
    - `/opt/homebrew/etc/httpd/extra/httpd-vhosts.conf`
  with what is included in this directory
    - update the absolute path to work for your current coniguration
  1. spin it up:
    - `% brew services start php@7.4` <- should only be needed on the first run for code compilation
      - and can be killed after it fully starts: `% brew services stop php@7.4`
    - `% httpd -k restart` <- this will restart apachectl as well
  1. view the httpd logs for verification:
    - `% tail -f /opt/homebrew/var/log/httpd/error_log`
  
  1. verify all is correct by navigating to:
    - http://dq.local:8080/
    - http://dq.local:8080/test.html
    - http://down.dq.local:8080/
    - http://down.dq.local:8080//test.html

  1. If anything is changed within the `.conf` files you will need to restarrt the server:
    - `% httpd -k restart`