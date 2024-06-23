const { promises } = require('original-fs');
const db = require('../database/db');
const { resolve } = require('path');

function addToCart(userId , productId , quantity){
    return new Promise((resolve,reject)=>{
        const query = `INSERT INTO Cart (user_id,product_id,quantity) VALUES (?,?,?)`;
        db.run(query,[userId,productId,quantity],function(err){
            if(err)
                {
                    reject(err);
                    return;
                }
                else{
                    resolve(this.lastID);
                }
        });
    });
}

function getCartItems(userId){
    return new Promise((resolve,reject)=>{
        const query = `SELECT * FROM Cart where user_id = ?`;
        db.all(query,[userId],(err,rows)=>{
            if(err)
                {
                    reject(err);
                    return ;
                }
                else{
                    resolve(rows);
                }
        });
    });
}

function removeCartItems(cartItemId){
    return new Promise((resolve,reject)=>{
        const query = `DELETE FROM Cart where id = ?`;
        db.run(query , [cartItemId], function(err){
            if(err)
                {
                    reject(err);
                    return ;
                }
                else{
                    resolve();
                }
        });
    });
}


module.exports={
    addToCart,
    getCartItems,
    removeCartItems
}
