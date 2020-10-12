const fs = require("fs");
const { nanoid } = require("nanoid");

const fileName = "./db.json";
let data = [];

module.exports = {
    init() {
        try {
            data = JSON.parse(fs.readFileSync(fileName));
        } catch (e) {
            data = [];
        }
    },
    getItems() {
        let dataCopy = [];
        if (data.length > 30) {
            for (let i = data.length - 1; i >= data.length - 30; i--) {
                dataCopy.push(data[i]);
            };
            return dataCopy;
        } else {
            return data;
        };
    },
    save() {
        fs.writeFileSync(fileName, JSON.stringify(data));
    },
    addItem(item) {
        item.id = nanoid();
        item.dateTime = (new Date()).toISOString();
        data.push(item);
        this.save();
        return item;
    }
};