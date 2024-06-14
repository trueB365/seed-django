# Setting up and using SCRAM authentication in PostgreSQL
SCRAM (Salted Challenge Response Authentication Mechanism) is a modern, more secure alternative to MD5 for password-based authentication in PostgreSQL. To use SCRAM for connecting to a PostgreSQL database, you need to configure both the PostgreSQL server and the client. Here's how to set it up:

### Configuring the PostgreSQL Server

1. **Ensure PostgreSQL Version**: SCRAM authentication is supported in PostgreSQL version 10 and above. Make sure you are running a compatible version.

2. **Set Password Encryption Method**:
   - Modify the `postgresql.conf` file (typically found in the data directory of PostgreSQL) to set the password encryption method to `scram-sha-256`.
     ```conf
     password_encryption = scram-sha-256
     ```
   - Restart the PostgreSQL server for the changes to take effect.

3. **Update User Passwords**:
   - For SCRAM to work, you need to set or update the user passwords after changing the password encryption method. This ensures that the passwords are stored using SCRAM-SHA-256.
     ```sql
     ALTER USER your_user_name WITH PASSWORD 'new_password';
     ```

4. **Configure `pg_hba.conf`**:
   - Edit the `pg_hba.conf` file to use `scram-sha-256` for host-based authentication.
     ```conf
     # TYPE  DATABASE        USER            ADDRESS                 METHOD
     host    all             all             0.0.0.0/0               scram-sha-256
     ```
   - Reload the PostgreSQL configuration or restart the PostgreSQL server.

### Configuring the Client

1. **Client Compatibility**:
   - Ensure that the client you are using to connect to the PostgreSQL server supports SCRAM-SHA-256. Most modern PostgreSQL clients support this.

2. **Connection String**:
   - Use a connection string or client configuration that specifies the PostgreSQL server, database, user, and password. The client should automatically negotiate SCRAM-SHA-256 authentication if the server requires it.

   Example in `psql`:
   ```bash
   psql "host=your_server_address dbname=your_db user=your_user_name password=your_password"
   ```

   Or using environment variables:
   ```bash
   export PGHOST=your_server_address
   export PGDATABASE=your_db
   export PGUSER=your_user_name
   export PGPASSWORD=your_password
   psql
   ```

### Testing the Connection

- Test the connection with the client to ensure that the SCRAM-SHA-256 authentication works correctly.

### Notes

- **Security**: Although SCRAM is more secure than MD5, it's still important to follow best practices for database security, such as using strong passwords and secure connections (e.g., SSL/TLS).
- **Client Support**: If a client doesn't support SCRAM, it will not be able to connect to the PostgreSQL server configured for SCRAM authentication.
- **Firewall and Network Security**: Ensure proper firewall configurations and network security measures are in place, especially if the database server is accessible over the internet.

By following these steps, you can configure SCRAM authentication for your PostgreSQL server and connect securely using a compatible client.