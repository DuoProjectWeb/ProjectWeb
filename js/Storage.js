var Storage = {

    putInt: function (key, value) {
        localStorage.setItem(key, value);
        
    },

    getInt: function (key) {
        return parseInt(localStorage.getItem(key));
    },

    putFloat: function (key, value) {
        localStorage.setItem(key, value);
    },

    getFloat: function (key) {
        return parseFloat(localStorage.getItem(key));
    },

    putObject: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    getObject: function (key) {
        return JSON.parse(localStorage.getItem(key));
    },

    clear: function () {
        localStorage.clear();
    }

    };