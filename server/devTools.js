const fs = require("fs")

function read_file(file_name) {
    return JSON.parse(fs.readFileSync(`./DB/${file_name}`, "utf-8"))
}

function write_file(file_name, data) {
    return fs.writeFileSync(`./DB/${file_name}`, JSON.stringify(data, null, 4))
}

module.exports = {
    read_file,
    write_file
}