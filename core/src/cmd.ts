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
        private help(cmd: Array<string>){
            if(cmd.length == 1){
                this.log.send('Enter : help person');
                this.log.send('Enter : help persons');
                this.log.send('Enter : help add');
                this.log.send('Enter : help kill');
                this.log.send('Enter : ( clear | cls ) - for clear logs');
            }else{
                switch(cmd[1]){
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
        
        private kill(cmd: Array<string>){
            var uid_murder : number =  parseInt(cmd[1]);
            var uid_victim : number =  parseInt(cmd[3]);
            this.app.person(uid_murder).killPerson(this.app.person(uid_victim));
        }
        
        private persons(cmd: Array<string>){
            this.app.show_list();
        }
        private get_info(cmd: Array<string>){
            var uid : number =  parseInt(cmd[1]);
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
        }
        private person(cmd: Array<string>){
            switch(cmd[2]){
                case 'kill':
                    this.kill(cmd);
                    break;
                case 'get':
                    this.get_info(cmd);
                    break;
                default:
                    this.log.send('Person error : cant find function ' + cmd[2]);
            }
        }
        private add(cmd: Array<string>){
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
        }
        public getLastCMD(): string{
            return this.last_cmd;
        }
    }
}