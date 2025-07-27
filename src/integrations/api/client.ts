const API_BASE_URL = 'http://localhost:3001/api';

// Interfejs dla użytkownika (symulacja Supabase auth)
export interface User {
  id: string;
  email?: string;
  created_at: string;
}

// Symulacja aktualnego użytkownika
let currentUser: User | null = {
  id: 'local-user-id',
  email: 'gianni@example.com',
  created_at: new Date().toISOString()
};

// Klasyczny klient API z metodami podobnymi do Supabase
export class APIClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
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

  // Metoda do wykonywania zapytań HTTP
  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Metoda do pobierania danych z tabeli (podobna do Supabase)
  from(table: string) {
    return {
      select: (columns: string = '*') => ({
        eq: (column: string, value: any) => ({
          order: (column: string, options?: { ascending?: boolean }) => ({
            then: async () => {
              try {
                const data = await this.request(`/${table}`);
                const filteredData = data.filter((item: any) => item[column] === value);
                const sortedData = filteredData.sort((a: any, b: any) => {
                  const aVal = a[column];
                  const bVal = b[column];
                  const order = options?.ascending === false ? -1 : 1;
                  return aVal < bVal ? -order : aVal > bVal ? order : 0;
                });
                return { data: sortedData, error: null };
              } catch (error) {
                return { data: null, error };
              }
            }
          }),
          then: async () => {
            try {
              const data = await this.request(`/${table}`);
              const filteredData = data.filter((item: any) => item[column] === value);
              return { data: filteredData, error: null };
            } catch (error) {
              return { data: null, error };
            }
          }
        }),
        order: (column: string, options?: { ascending?: boolean }) => ({
          then: async () => {
            try {
              const data = await this.request(`/${table}`);
              const sortedData = data.sort((a: any, b: any) => {
                const aVal = a[column];
                const bVal = b[column];
                const order = options?.ascending === false ? -1 : 1;
                return aVal < bVal ? -order : aVal > bVal ? order : 0;
              });
              return { data: sortedData, error: null };
            } catch (error) {
              return { data: null, error };
            }
          }
        }),
        then: async () => {
          try {
            const data = await this.request(`/${table}`);
            return { data, error: null };
          } catch (error) {
            return { data: null, error };
          }
        }
      }),
      insert: (data: any[]) => ({
        then: async () => {
          try {
            const promises = data.map(item => 
              this.request(`/${table}`, {
                method: 'POST',
                body: JSON.stringify(item)
              })
            );
            const results = await Promise.all(promises);
            return { data: results, error: null };
          } catch (error) {
            return { data: null, error };
          }
        }
      }),
      update: (data: any) => ({
        eq: (column: string, value: any) => ({
          then: async () => {
            try {
              // Najpierw pobierz wszystkie rekordy
              const allData = await this.request(`/${table}`);
              const targetItem = allData.find((item: any) => item[column] === value);
              
              if (!targetItem) {
                return { data: null, error: 'Nie znaleziono' };
              }

              // Zaktualizuj rekord
              const updatedData = await this.request(`/${table}/${targetItem.id}`, {
                method: 'PUT',
                body: JSON.stringify(data)
              });
              
              return { data: updatedData, error: null };
            } catch (error) {
              return { data: null, error };
            }
          }
        })
      }),
      delete: () => ({
        eq: (column: string, value: any) => ({
          then: async () => {
            try {
              // Najpierw pobierz wszystkie rekordy
              const allData = await this.request(`/${table}`);
              const targetItem = allData.find((item: any) => item[column] === value);
              
              if (!targetItem) {
                return { data: null, error: 'Nie znaleziono' };
              }

              // Usuń rekord
              await this.request(`/${table}/${targetItem.id}`, {
                method: 'DELETE'
              });
              
              return { data: null, error: null };
            } catch (error) {
              return { data: null, error };
            }
          }
        })
      })
    };
  }
}

// Eksportuj instancję klienta
export const api = new APIClient();

// Eksportuj również jako 'supabase' dla kompatybilności
export const supabase = api;