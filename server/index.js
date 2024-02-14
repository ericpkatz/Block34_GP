const {
    client,
    createTables,
    createUser,
    createPlace,
    fetchUsers,
    fetchPlaces,
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
};

init();