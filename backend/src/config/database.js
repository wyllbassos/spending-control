module.exports = {
  dialect: 'sqlite',
  storage: 'src/database/database.sqlite',

  //dialect: 'postgres',
  // username: 'pcm',
  // database: 'pcm',

  // host: 'localhost',
  // password: '123456',

  // port: '5432',

  define: {
    timestamps: true, // Define que as tabelas tem creat_at e update_at
    underscored: true, //formato dos campos Snake Case (Separado Por Underline)
  },
};