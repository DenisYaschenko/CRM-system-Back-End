Here you can see my Front-End for CRM-system: https://github.com/DenisYaschenkoCntu/CRM-system-Front-End/tree/master

How to use?
1. You must create in root of this directory "config/keys.js", which will contain next:
"
module.exports = {
    mongoURI: '',
    jwt: ''
}
"
First field - for connect to mongoDB on mlab.com. Second field - text for add salt to password.
