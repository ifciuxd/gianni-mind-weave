import { Pool, PoolClient } from 'pg';

// Konfiguracja połączenia z PostgreSQL
const pool = new Pool({
  user: 'gianni',
  host: 'localhost',
  database: 'gianni_mind_weave',
  password: 'password', // Hasło dla lokalnego użytkownika
  port: 5432,
});

// Interfejs dla użytkownika (symulacja Supabase auth)
export interface User {
  id: string;
  email?: string;
  created_at: string;
}

// Symulacja aktualnego użytkownika (w prawdziwej aplikacji byłaby autentykacja)
let currentUser: User | null = {
  id: 'local-user-id',
  email: 'gianni@example.com',
  created_at: new Date().toISOString()
};

// Klasyczny klient PostgreSQL z metodami podobnymi do Supabase
export class PostgreSQLClient {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  // Pobierz aktualnego użytkownika
  async getUser(): Promise<{ data: { user: User | null } }> {
    return { data: { user: currentUser } };
  }

  // Symulacja autentykacji
  async signIn(email: string, password: string): Promise<{ data: { user: User } }> {
    currentUser = {
      id: 'local-user-id',
      email,
      created_at: new Date().toISOString()
    };
    return { data: { user: currentUser } };
  }

  // Symulacja wylogowania
  async signOut(): Promise<void> {
    currentUser = null;
  }

  // Metoda do wykonywania zapytań
  async query(text: string, params?: any[]): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } finally {
      client.release();
    }
  }

  // Metoda do pobierania danych z tabeli (podobna do Supabase)
  from(table: string) {
    return {
      select: (columns: string = '*') => ({
        eq: (column: string, value: any) => ({
          order: (column: string, options?: { ascending?: boolean }) => ({
            then: async () => {
              const orderClause = options?.ascending === false ? 'DESC' : 'ASC';
              const query = `SELECT ${columns} FROM ${table} WHERE ${column} = $1 ORDER BY ${column} ${orderClause}`;
              const result = await this.query(query, [value]);
              return { data: result.rows, error: null };
            }
          }),
          then: async () => {
            const query = `SELECT ${columns} FROM ${table} WHERE ${column} = $1`;
            const result = await this.query(query, [value]);
            return { data: result.rows, error: null };
          }
        }),
        order: (column: string, options?: { ascending?: boolean }) => ({
          then: async () => {
            const orderClause = options?.ascending === false ? 'DESC' : 'ASC';
            const query = `SELECT ${columns} FROM ${table} ORDER BY ${column} ${orderClause}`;
            const result = await this.query(query);
            return { data: result.rows, error: null };
          }
        }),
        then: async () => {
          const query = `SELECT ${columns} FROM ${table}`;
          const result = await this.query(query);
          return { data: result.rows, error: null };
        }
      }),
      insert: (data: any[]) => ({
        then: async () => {
          if (data.length === 0) return { error: 'No data to insert' };
          
          const columns = Object.keys(data[0]);
          const values = data.map(row => Object.values(row));
          const placeholders = values.map((_, rowIndex) => 
            `(${columns.map((_, colIndex) => `$${rowIndex * columns.length + colIndex + 1}`).join(', ')})`
          ).join(', ');
          
          const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES ${placeholders} RETURNING *`;
          const flatValues = values.flat();
          
          try {
            const result = await this.query(query, flatValues);
            return { data: result.rows, error: null };
          } catch (error) {
            return { data: null, error };
          }
        }
      }),
      update: (data: any) => ({
        eq: (column: string, value: any) => ({
          then: async () => {
            const setColumns = Object.keys(data).map((key, index) => `${key} = $${index + 2}`);
            const query = `UPDATE ${table} SET ${setColumns.join(', ')} WHERE ${column} = $1 RETURNING *`;
            const values = [value, ...Object.values(data)];
            
            try {
              const result = await this.query(query, values);
              return { data: result.rows, error: null };
            } catch (error) {
              return { data: null, error };
            }
          }
        })
      }),
      delete: () => ({
        eq: (column: string, value: any) => ({
          then: async () => {
            const query = `DELETE FROM ${table} WHERE ${column} = $1`;
            
            try {
              await this.query(query, [value]);
              return { data: null, error: null };
            } catch (error) {
              return { data: null, error };
            }
          }
        })
      })
    };
  }

  // Metoda do zamykania połączenia
  async end(): Promise<void> {
    await this.pool.end();
  }
}

// Eksportuj instancję klienta
export const postgresql = new PostgreSQLClient();

// Eksportuj również jako 'supabase' dla kompatybilności
export const supabase = postgresql;