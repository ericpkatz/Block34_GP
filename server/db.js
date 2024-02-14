const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_travel_db');
const uuid = require('uuid');

const createTables = async()=> {
    const SQL = `
        DROP TABLE IF EXISTS vacations;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS places;
        CREATE TABLE users(
            id UUID PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE
        );
        CREATE TABLE places(
            id UUID PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE
        );
        CREATE TABLE vacations(
            id UUID PRIMARY KEY,
            departure_date DATE,
            user_id UUID REFERENCES users(id) NOT NULL,
            place_id UUID REFERENCES places(id) NOT NULL
        );
    `;
    
    await client.query(SQL);
};

const createUser = async({ name })=> {
    const SQL = `
        INSERT INTO users(id, name)
        VALUES ($1, $2)
        RETURNING *
    `;
    const response = await client.query(SQL, [uuid.v4(), name ]);
    return response.rows[0];
}

const createPlace = async({ name })=> {
    const SQL = `
        INSERT INTO places(id, name)
        VALUES ($1, $2)
        RETURNING *
    `;
    const response = await client.query(SQL, [uuid.v4(), name ]);
    return response.rows[0];
}

const fetchPlaces = async()=> {
    const SQL = `
        SELECT *
        FROM places
    `;
    const response = await client.query(SQL);
    return response.rows;
}

const fetchUsers = async()=> {
    const SQL = `
        SELECT *
        FROM users
    `;
    const response = await client.query(SQL);
    return response.rows;
}

module.exports = {
    client,
    createTables,
    createUser,
    createPlace,
    fetchPlaces,
    fetchUsers
};