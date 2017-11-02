
module.exports = [
    {
        pattern: /hello/, // using RegEx
        template: "hi {{from.first_name}}" // placeholder from the message object
    },
    {
        pattern: "how are you", // matching plain text
        template: "I am fine, thanks! How are you today, {{from.first_name}}?"
    }
]