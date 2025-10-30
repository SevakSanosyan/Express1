const express = require('express')

const getNameMDLWR = function (req, res, next) {

    const {name} = req.query

        if (name) {
            res.send(`hello ${name}`);
            return
          }
          next()
}

const getageMDLWR = function (req, res, next) {

    const { age} = req.query

        if (age) {
            res.send(`im ${age} years old`);
            return
          }
          next()
}



exports.getNameMDLWR = getNameMDLWR
exports.getageMDLWR = getageMDLWR