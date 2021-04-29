const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

function generateSlug (title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

const Page = db.define('page', {
  title:{
    type: Sequelize.STRING,
    allowNull: false
  },
  slug:{
    type: Sequelize.STRING,
    allowNull: false
  },
  content:{
    type: Sequelize.TEXT,
    allowNull: false
  },
  status:{
    type: Sequelize.ENUM('open', 'closed')
  }
})
// Page.beforeValidate( async (page) => {
//   const slug = await generateSlug(page.title);
//   page.slug = slug;
// })

Page.addHook('beforeValidate', (page, options) => {
  page.slug = generateSlug(page.title);
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

module.exports = {
  db,
  Page,
  User
}
