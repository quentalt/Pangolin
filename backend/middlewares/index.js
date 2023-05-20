const ObjectId  = require('mongoose')
const {Types} = require("mongoose");

const validateDbId = (req,res, next) => {
    if(!Types.ObjectId.isValid(req.params.id))
    {
        res.status(400).json({
            error: "invalid id" + req.params.id
          })
    }
    else
    next()
}

const raiseRecordNotFound = (req,res, next) => {
    res.status(404).json({
        error: "record not found" + req.params.id
      })
}

const errorHandler = (err, req, res, next) => {
    res.status(500).json({
        error: err.message
      })
}

module.exports = {
    validateDbId,
    raiseRecordNotFound,
    errorHandler
}