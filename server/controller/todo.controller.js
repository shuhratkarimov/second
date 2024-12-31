const {write_file, read_file} = require("../devTools")
const data = read_file("database.json")
const {v4} = require("uuid");
const bodyParser = require("body-parser");

///////////////////////// get

const getData = async (req, res) => {
        res.status(200).send(data)
}

/////////////////////////////// post

const addData = async (req, res) => {
    data.push({
        id: v4(),
        ...req.body
    })
    write_file("database.json", data)
    res.status(201).send({
        message: "added new data"
    })
}

/////////////////////////////// update

const updateData = async (req, res) => {
    const {id} = req.params
    const {todo, exec} = req.body
    const foundData = data.find(item => item.id === id)
    if (!foundData) {
        return res.status(404).send({
        message: "data not found!"
    })}
    data.forEach(item => {
        if (item.id === id) {
            item.todo = todo?todo: item.todo,
            item.exec = exec?exec: item.exec
        }
    });
    write_file("database.json", data)
    res.status(201).send({
        message: "data edited!"
    })
}

///////////////////////////// delete

const deleteData = async (req, res) => {
    const {id} = req.params
    const foundData = data.find(item => item.id === id)
    if (!foundData) {
        return res.status(404).send({
        message: "data not found!"
    })}
    data.forEach((item, idx) => {
        if (item.id === id) {
            data.splice(idx, 1)
        }
    })
    write_file("database.json", data)
    res.status(201).send({
        message: "data deleted!"
    })
}

module.exports = {
    addData,
    getData,
    updateData,
    deleteData
}