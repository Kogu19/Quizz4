const express = require('express');
const mysql = require('mysql2');

const app = express ();
const PORT = 3000;

app.use(express.json());
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sports_cars_db'
});

db.connect((err) => {
    if (err){
        console.error('Failed to connect to Mysql :', err);
        return;
    }
    console.log('Connect to Mysql (sports_cars_db)');
});

app.post('/add', (req,res) => {
    const { brand, model, year, horsepower, price} = req.body;
    
    if(!brand || !model || !year || !horsepower || !price){
        return res.status(400).json({
            message: 'brand, model, year, horsepower and price are needed'
        });
    }
    
    const sql = `
    INSERT INTO sport_cars (brand, model, year, horsepower, price)
    VALUES (?, ?, ?, ?, ?)
  `;
    
    db.query(sql, [brand, model, year, horsepower, price], (err, result) => {
        if(err){
            console.error('Error while insertion:', err);
            return res.status(500).json({message : 'Server Error'});
        }
        
        res.status(201).json({
            message: 'Sportive car has been successfully added',
            insertID: result.insertID
        });
    });
});

app.get('/records', (req, res) => {
    const sql = 'SELECT * FROM sport_cars';
    
    db.query(sql, (err, rows) => {
        if (err){
            console.error('Error retrieving cars:', err);
            return res.status(500).json({ message: 'Server Error'});
        }
        
        res.json(rows);
    
    });
});

app.get('/record/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM sport_cars WHERE id = ?';
    
    db.query(sql, [id], (err, rows) => {
        if(err){
            console.error('Error retrieving cars:', err);
            return res.status(500).json({ message: 'Sever Error'});
        }
        res.json(rows[0]);
    });
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { brand, model, year, horsepower, price } = req.body;
    
    if(!brand && !model && !year && !horsepower && !price){
        return res.status(400).json({
            message: 'At least one field (brand, model, year, horsepower, price) has to be filled'
        });
    }
    
    let fields = [];
    let values = [];
    
    if(brand){
        fields.push('brand = ?');
        values.push(brand);
    }
    
    if(model){
        fields.push('model = ?');
        values.push(model);
    }
    
    if(year) {
        fields.push('year = ?');
            values.push(year);
    }
    
    if(horsepower) {
        fields.push('horsepower = ?');
        values.push(horsepower);
    }
    
    if(price) {
        fields.push('price = ?');
        values.push(price);
    }
    
    values.push(id);
    
    const sql = `UPDATE sport_cars SET ${fields.join(', ')} WHERE id = ?`;
    
    db.query(sql, values, (err, result) => {
        if (err){
            console.error('Error while updating:', err);
            return res.status(500).json({message: 'Server Error'});
        }
        
        if(result.affectedRows === 0){
            return res.status(404).json({ message : 'Car not found'});
        }
        
        res.json({ message: 'Car succesfully updated'});
    });
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM sport_cars WHERE id = ?';
    
    db.query(sql, [id], (err, result) => {
        if(err) {
            console.error('Error while deleting', err);
            return res.status(500).json({ message: 'Server Error'});
        }
        
        if(result.affectedRows === 0) {
            return res.status(404).json({message: 'Car not found' });
        }
        
        res.json({message : 'Car successfully detelted'});
    });
});


app.listen(PORT, () => {
    console.log(`Server starting on http://localhost:${PORT}`);
});