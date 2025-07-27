import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Konfiguracja PostgreSQL
const pool = new Pool({
  user: 'gianni',
  host: 'localhost',
  database: 'gianni_mind_weave',
  password: 'password',
  port: 5432,
});

// Test połączenia
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Błąd połączenia z PostgreSQL:', err);
  } else {
    console.log('Połączono z PostgreSQL:', res.rows[0]);
  }
});

// API Routes

// GET /api/finances - Pobierz finanse
app.get('/api/finances', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM finances WHERE user_id = $1 ORDER BY date DESC',
      ['d2c925fa-0c96-44a2-8251-58f9e2d17b78']
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Błąd pobierania finansów:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// POST /api/finances - Dodaj finanse
app.post('/api/finances', async (req, res) => {
  try {
    const { title, amount, type, category, date, description, recurring, recurring_period } = req.body;
    const result = await pool.query(
      `INSERT INTO finances (user_id, title, amount, type, category, date, description, recurring, recurring_period)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      ['d2c925fa-0c96-44a2-8251-58f9e2d17b78', title, amount, type, category, date, description, recurring, recurring_period]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Błąd dodawania finansów:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// PUT /api/finances/:id - Aktualizuj finanse
app.put('/api/finances/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, type, category, date, description, recurring, recurring_period } = req.body;
    const result = await pool.query(
      `UPDATE finances SET title = $1, amount = $2, type = $3, category = $4, date = $5, description = $6, recurring = $7, recurring_period = $8
       WHERE id = $9 AND user_id = $10 RETURNING *`,
      [title, amount, type, category, date, description, recurring, recurring_period, id, 'd2c925fa-0c96-44a2-8251-58f9e2d17b78']
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Nie znaleziono' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Błąd aktualizacji finansów:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// DELETE /api/finances/:id - Usuń finanse
app.delete('/api/finances/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM finances WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, 'd2c925fa-0c96-44a2-8251-58f9e2d17b78']
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Nie znaleziono' });
    } else {
      res.json({ message: 'Usunięto' });
    }
  } catch (error) {
    console.error('Błąd usuwania finansów:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// GET /api/friends - Pobierz znajomych
app.get('/api/friends', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM friends WHERE user_id = $1 ORDER BY name',
      ['d2c925fa-0c96-44a2-8251-58f9e2d17b78']
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Błąd pobierania znajomych:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// POST /api/friends - Dodaj znajomego
app.post('/api/friends', async (req, res) => {
  try {
    const { name, email, phone, birthday, notes, status, relationship_type, favorite } = req.body;
    const result = await pool.query(
      `INSERT INTO friends (user_id, name, email, phone, birthday, notes, status, relationship_type, favorite)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      ['local-user-id', name, email, phone, birthday, notes, status, relationship_type, favorite]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Błąd dodawania znajomego:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// PUT /api/friends/:id - Aktualizuj znajomego
app.put('/api/friends/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, birthday, notes, status, relationship_type, favorite } = req.body;
    const result = await pool.query(
      `UPDATE friends SET name = $1, email = $2, phone = $3, birthday = $4, notes = $5, status = $6, relationship_type = $7, favorite = $8
       WHERE id = $9 AND user_id = $10 RETURNING *`,
      [name, email, phone, birthday, notes, status, relationship_type, favorite, id, 'local-user-id']
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Nie znaleziono' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Błąd aktualizacji znajomego:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// DELETE /api/friends/:id - Usuń znajomego
app.delete('/api/friends/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM friends WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, 'local-user-id']
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Nie znaleziono' });
    } else {
      res.json({ message: 'Usunięto' });
    }
  } catch (error) {
    console.error('Błąd usuwania znajomego:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// GET /api/subjects - Pobierz przedmioty
app.get('/api/subjects', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM subjects WHERE user_id = $1 ORDER BY name',
      ['local-user-id']
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Błąd pobierania przedmiotów:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// POST /api/subjects - Dodaj przedmiot
app.post('/api/subjects', async (req, res) => {
  try {
    const { name, code, description, credits, semester, academic_year, professor, room, schedule, status, color } = req.body;
    const result = await pool.query(
      `INSERT INTO subjects (user_id, name, code, description, credits, semester, academic_year, professor, room, schedule, status, color)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      ['local-user-id', name, code, description, credits, semester, academic_year, professor, room, schedule, status, color]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Błąd dodawania przedmiotu:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// PUT /api/subjects/:id - Aktualizuj przedmiot
app.put('/api/subjects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, description, credits, semester, academic_year, professor, room, schedule, status, color } = req.body;
    const result = await pool.query(
      `UPDATE subjects SET name = $1, code = $2, description = $3, credits = $4, semester = $5, academic_year = $6, professor = $7, room = $8, schedule = $9, status = $10, color = $11
       WHERE id = $12 AND user_id = $13 RETURNING *`,
      [name, code, description, credits, semester, academic_year, professor, room, schedule, status, color, id, 'local-user-id']
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Nie znaleziono' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Błąd aktualizacji przedmiotu:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// DELETE /api/subjects/:id - Usuń przedmiot
app.delete('/api/subjects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM subjects WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, 'local-user-id']
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Nie znaleziono' });
    } else {
      res.json({ message: 'Usunięto' });
    }
  } catch (error) {
    console.error('Błąd usuwania przedmiotu:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// GET /api/assignments - Pobierz zadania
app.get('/api/assignments', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT a.*, s.name as subject_name, s.color as subject_color 
       FROM assignments a 
       JOIN subjects s ON a.subject_id = s.id 
       WHERE a.user_id = $1 
       ORDER BY a.due_date ASC`,
      ['local-user-id']
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Błąd pobierania zadań:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// POST /api/assignments - Dodaj zadanie
app.post('/api/assignments', async (req, res) => {
  try {
    const { subject_id, title, description, due_date, due_time, priority, status, assignment_type, max_points, earned_points, weight_percentage, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO assignments (subject_id, user_id, title, description, due_date, due_time, priority, status, assignment_type, max_points, earned_points, weight_percentage, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [subject_id, 'local-user-id', title, description, due_date, due_time, priority, status, assignment_type, max_points, earned_points, weight_percentage, notes]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Błąd dodawania zadania:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// PUT /api/assignments/:id - Aktualizuj zadanie
app.put('/api/assignments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { subject_id, title, description, due_date, due_time, priority, status, assignment_type, max_points, earned_points, weight_percentage, notes } = req.body;
    const result = await pool.query(
      `UPDATE assignments SET subject_id = $1, title = $2, description = $3, due_date = $4, due_time = $5, priority = $6, status = $7, assignment_type = $8, max_points = $9, earned_points = $10, weight_percentage = $11, notes = $12
       WHERE id = $13 AND user_id = $14 RETURNING *`,
      [subject_id, title, description, due_date, due_time, priority, status, assignment_type, max_points, earned_points, weight_percentage, notes, id, 'local-user-id']
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Nie znaleziono' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Błąd aktualizacji zadania:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// DELETE /api/assignments/:id - Usuń zadanie
app.delete('/api/assignments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM assignments WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, 'local-user-id']
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Nie znaleziono' });
    } else {
      res.json({ message: 'Usunięto' });
    }
  } catch (error) {
    console.error('Błąd usuwania zadania:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(port, () => {
  console.log(`Serwer API uruchomiony na porcie ${port}`);
});

export default app;