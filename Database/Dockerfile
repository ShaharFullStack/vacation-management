# Inherit image from MySQL image on Linux Debian OS (I think)
FROM mysql:9

# Copy vacatier.sql into special folder for running this script once: 
COPY ./vacatier.sql /docker-entrypoint-initdb.d
