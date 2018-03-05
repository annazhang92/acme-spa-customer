const conn = require('./conn');
const Sequelize = conn.Sequelize;


const Email = conn.define('email',{
    emailadress:{type:Sequelize.STRING},
})

const sync =()=>{
    return conn.sync({force:true});
}

const seed =()=>{
    return Promise.all([
    Email.create({emailadress:'annazhang@hotmail.com'}),
    Email.create({emailadress:'jankohle@gmail.com'}),
    ])
}

module.exports ={
    sync,
    seed,
    models:{
        Email
    }
};