///<reference path='base.ts' />

module Murder{
    export class CMDImplementation{
        private last_cmd: string;
        private app: BaseImplementation;
        private log: LogImplementation;
        constructor(app: BaseImplementation, log: LogImplementation){
            this.last_cmd = 'help';
            this.app = app;
            this.log = log;
        }
        private help(cmd: Array<string>): void{
            if(cmd.length == 1){
                this.log.send('Enter : help person');
                this.log.send('Enter : help persons');
                this.log.send('Enter : help add');
                this.log.send('Enter : help kill');
                this.log.send('Enter : ( clear | cls ) - for clear logs');
            }else{
                switch(cmd[1]){
                    case 'persons':
                        this.log.send('Enter: persons for get persons list with uid');
                        break;
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
        }
        
        private kill(cmd: Array<string>): void{
            if(typeof cmd[1] == 'undefined'){
                this.log.send('Kill error: you must enter uid of murder.');
                return;
            }
            if(typeof cmd[3] == 'undefined'){
                this.log.send('Kill error: you must enter uid of victim.');
                return;
            }
            var uid_murder : number =  parseInt(cmd[1]);
            var uid_victim : number =  parseInt(cmd[3]);
            this.app.person(uid_murder).killPerson(this.app.person(uid_victim));
        }
        private persons(cmd: Array<string>): void{
            this.app.show_list();
        }
        private getAll(uid: number): void{
            this.log.send('Fullname : ' + this.app.person(uid).getFullname());
            this.log.send('Firstname : ' + this.app.person(uid).getFirstname());
            this.log.send('Lastname : ' + this.app.person(uid).getLastname());
            this.log.send('Sex : ' + this.app.person(uid).getSex());
            this.log.send('Age : ' + this.app.person(uid).getAge());
            this.log.send('Killer : ' + this.app.person(uid).getKiller().getFullname());
        }
        private get_info(cmd: Array<string>): void{
            var uid : number =  parseInt(cmd[1]);
            if(typeof cmd[3] == 'undefined'){
                this.log.send('Get info error: what do you want get?');
                return;
            }
            switch(cmd[3]){
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
                    this.log.send('Killer : ' + this.app.person(uid).getKiller().getFullname());
                    break;
                case 'sex':
                    this.log.send('Sex : ' + this.app.person(uid).getSex());
                    break;
                case 'age':
                    this.log.send('Age : ' + this.app.person(uid).getAge());
                    break;
                case 'all':
                    this.getAll(uid);
                    break;
                default:
                    this.log.send('Get info error: cant find element ' + cmd[3]);
            }
        }
        private person(cmd: Array<string>): void{
            if(typeof cmd[1] == 'undefined'){
                this.log.send('Person error: you must enter uid of person.');
                return;
            }
            if(typeof cmd[2] == 'undefined'){
                this.log.send('Person error: you must enter function.');
                return;
            }
            switch(cmd[2]){
                case 'kill':
                    this.kill(cmd);
                    break;
                case 'get':
                    this.get_info(cmd);
                    break;
                default:
                    this.log.send('Person error: cant find function ' + cmd[2]);
            }
        }
        private add(cmd: Array<string>): void{
            var firstname : string = cmd[1];
            var lastname : string = cmd[2];
            var age : number = parseInt(cmd[3]);
            var sex : boolean = Boolean(cmd[4]);
            this.app.add({
                firstname: firstname,
                lastname: lastname,
                age: age,
                male: sex
            }, this.log);
        }
        private clear(){
            document.getElementById('log').innerHTML = '';
        }
        public send(cmd: string): void{
            this.log.send(cmd, true);
            this.last_cmd = cmd;
            var a_cmd : Array<string> = cmd.split(' ');
            switch(a_cmd[0]){
                case 'persons':
                    this.persons(a_cmd);
                    break;
                case 'person':
                    this.person(a_cmd);
                    break;
                case 'add':
                    this.add(a_cmd);
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
        }
        public getLastCMD(): string{
            return this.last_cmd;
        }
    }
}