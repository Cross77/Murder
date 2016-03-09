var Murder;
(function (Murder) {
    var LogImplementation = (function () {
        function LogImplementation(cb) {
            this.cb = cb;
        }
        LogImplementation.prototype.send = function (text, cmd) {
            if (cmd === void 0) { cmd = false; }
            if (cmd)
                text = '> ' + text;
            text = text
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
            this.cb(text);
        };
        return LogImplementation;
    }());
    Murder.LogImplementation = LogImplementation;
})(Murder || (Murder = {}));
var Murder;
(function (Murder) {
    var PersonImplementation = (function () {
        function PersonImplementation(person, log) {
            this.person = this.createPerson(person);
            this.alive = true;
            this.victims = [];
            this.log = log;
            this.log.send("New person " + this.getFullname());
        }
        PersonImplementation.prototype.getKiller = function () {
            return this.killer;
        };
        PersonImplementation.prototype.isAlive = function () {
            return this.alive;
        };
        PersonImplementation.prototype.createPerson = function (data) {
            var newPerson = {
                firstname: "Unkown",
                lastname: "Unkown",
                age: -1,
                male: true
            };
            if (data.firstname) {
                newPerson.firstname = data.firstname;
            }
            if (data.lastname) {
                newPerson.lastname = data.lastname;
            }
            if (data.age) {
                newPerson.age = data.age;
            }
            if (data.male) {
                newPerson.male = data.male;
            }
            return newPerson;
        };
        PersonImplementation.prototype.kill = function (killer) {
            if (!this.alive) {
                this.log.send('You cannot kill ' + killer.getFirstname() + ' again.');
                return false;
            }
            this.log.send(this.getFullname() + " was killed by " + killer.getFullname());
            this.killer = killer;
            this.alive = false;
            return true;
        };
        PersonImplementation.prototype.killPerson = function (victim) {
            if (!this.alive) {
                var sex = 'she';
                if (this.person.male)
                    sex = 'he';
                this.log.send(this.getFirstname() + ' cannot kill anybody because ' + sex + ' is dead.');
                return false;
            }
            victim.kill(this);
            this.victims.push(victim);
        };
        PersonImplementation.prototype.getLastname = function () {
            return this.person.lastname;
        };
        PersonImplementation.prototype.getFirstname = function () {
            return this.person.firstname;
        };
        PersonImplementation.prototype.getSex = function () {
            if (this.person.male)
                return 'male';
            else
                return 'female';
        };
        PersonImplementation.prototype.getAge = function () {
            return this.person.age;
        };
        PersonImplementation.prototype.getFullname = function () {
            var fn = this.getFirstname() + ' ' + this.getLastname();
            if (!this.alive)
                fn += ' ( Dead ) ';
            return fn;
        };
        return PersonImplementation;
    }());
    Murder.PersonImplementation = PersonImplementation;
})(Murder || (Murder = {}));
var Murder;
(function (Murder) {
    var BaseImplementation = (function () {
        function BaseImplementation() {
            this.persons = [];
        }
        BaseImplementation.prototype.add = function (p, log) {
            var temp = new Murder.PersonImplementation(p, log);
            this.log = log;
            this.persons.push(temp);
        };
        BaseImplementation.prototype.person = function (uid) {
            if (uid < 0 || uid > this.persons.length) {
                this.log.send('Person error: Bad uid');
                return this.persons[0];
            }
            return this.persons[uid];
        };
        BaseImplementation.prototype.show_list = function () {
            var uid = 0;
            var temp;
            this.persons.forEach(function (person) {
                temp = uid.toString() + ' : ' + person.getFullname();
                this.log.send(temp);
                uid++;
            });
        };
        return BaseImplementation;
    }());
    Murder.BaseImplementation = BaseImplementation;
})(Murder || (Murder = {}));
var Murder;
(function (Murder) {
    var CMDImplementation = (function () {
        function CMDImplementation(app, log) {
            this.last_cmd = 'help';
            this.app = app;
            this.log = log;
        }
        CMDImplementation.prototype.help = function (cmd) {
            if (cmd.length == 1) {
                this.log.send('Enter : help person');
                this.log.send('Enter : help persons');
                this.log.send('Enter : help add');
                this.log.send('Enter : help kill');
                this.log.send('Enter : ( clear | cls ) - for clear logs');
            }
            else {
                switch (cmd[1]) {
                    case 'person':
                        this.log.send('Enter: person <uid> get ( fullname | firstname | lastname | killer | sex | age | kill | all ) ');
                        break;
                    case 'add':
                        this.log.send('Enter: add <firstname> <lastname> <age> <sex>(true/false)');
                        break;
                    case 'kill':
                        this.log.send('Enter: person <murder_id> kill <victim_id> ');
                        break;
                    default:
                        this.log.send('Error help : cant find help for ' + cmd[1]);
                }
            }
        };
        CMDImplementation.prototype.kill = function (cmd) {
            var uid_murder = parseInt(cmd[1]);
            var uid_victim = parseInt(cmd[3]);
            this.app.person(uid_murder).killPerson(this.app.person(uid_victim));
        };
        CMDImplementation.prototype.persons = function (cmd) {
            this.app.show_list();
        };
        CMDImplementation.prototype.get_info = function (cmd) {
            var uid = parseInt(cmd[1]);
            switch (cmd[3]) {
                case 'fullname':
                    this.log.send('Fullname : ' + this.app.person(uid).getFullname());
                    break;
                case 'firstname':
                    this.log.send('Firstname : ' + this.app.person(uid).getFirstname());
                    break;
                case 'lastname':
                    this.log.send('Lastname : ' + this.app.person(uid).getLastname());
                    break;
                case 'killer':
                    this.log.send('Firstname : ' + this.app.person(uid).getKiller());
                    break;
                case 'sex':
                    this.log.send('Sex : ' + this.app.person(uid).getSex());
                    break;
                case 'age':
                    this.log.send('Age : ' + this.app.person(uid).getAge());
                    break;
                case 'all':
                    this.log.send('All information : ' + this.app.person(uid).getAge());
                    break;
                default:
                    this.log.send('Get info error: cant find element ' + cmd[3]);
            }
        };
        CMDImplementation.prototype.person = function (cmd) {
            switch (cmd[2]) {
                case 'kill':
                    this.kill(cmd);
                    break;
                case 'get':
                    this.get_info(cmd);
                    break;
                default:
                    this.log.send('Person error : cant find function ' + cmd[2]);
            }
        };
        CMDImplementation.prototype.add = function (cmd) {
            var firstname = cmd[1];
            var lastname = cmd[2];
            var age = parseInt(cmd[3]);
            var sex = Boolean(cmd[4]);
            this.app.add({
                firstname: firstname,
                lastname: lastname,
                age: age,
                male: sex
            }, this.log);
        };
        CMDImplementation.prototype.clear = function () {
            document.getElementById('log').innerHTML = '';
        };
        CMDImplementation.prototype.send = function (cmd) {
            this.log.send(cmd, true);
            this.last_cmd = cmd;
            var a_cmd = cmd.split(' ');
            switch (a_cmd[0]) {
                case 'persons':
                    this.persons(a_cmd);
                    break;
                case 'person':
                    this.person(a_cmd);
                    break;
                case 'add':
                    this.add(a_cmd);
                    break;
                case 'kill':
                    this.kill(a_cmd);
                    break;
                case 'help':
                    this.help(a_cmd);
                    break;
                case 'clear':
                case 'cls':
                    this.clear();
                    break;
                default:
                    this.log.send('Error : Bad command. Enter \'help\'');
            }
        };
        CMDImplementation.prototype.getLastCMD = function () {
            return this.last_cmd;
        };
        return CMDImplementation;
    }());
    Murder.CMDImplementation = CMDImplementation;
})(Murder || (Murder = {}));
var Murder;
(function (Murder) {
    var init = (function () {
        function init(log) {
            this.log = new Murder.LogImplementation(log);
            this.base = new Murder.BaseImplementation();
            this.cmd = new Murder.CMDImplementation(this.base, this.log);
        }
        init.prototype.send = function (text) {
            this.cmd.send(text);
        };
        init.prototype.last = function () {
            return this.cmd.getLastCMD();
        };
        return init;
    }());
    Murder.init = init;
})(Murder || (Murder = {}));
