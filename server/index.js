const {
    client,
    createTables,
    createUser,
    createPlace,
    createVacation,
    fetchUsers,
    fetchPlaces,
    fetchVacations,
    destroyVacation
} = require('./db');
const init = async()=> {
    console.log('connecting to database');
    await client.connect();
    console.log('connected to database');
    await createTables();
    console.log('created tables');
    const [moe, lucy, larry, ethyl, paris, london, nyc] = await Promise.all([
        createUser({ name: 'moe'}),
        createUser({ name: 'lucy'}),
        createUser({ name: 'larry'}),
        createUser({ name: 'ethyl'}),
        createPlace({ name: 'paris'}),
        createPlace({ name: 'london'}),
        createPlace({ name: 'nyc'}),
    ]);
    console.log(await fetchUsers());
    console.log(await fetchPlaces());
    
    const vacation = await createVacation({
        user_id: moe.id,
        place_id: nyc.id,
        departure_date: '02/14/2024'
    });
    console.log(await fetchVacations());
    await destroyVacation({ id: vacation.id, user_id: vacation.user_id});
    console.log(await fetchVacations());
};

init();