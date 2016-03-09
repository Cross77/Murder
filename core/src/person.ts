///<reference path='log.ts' />

module Murder{
    export interface PersonInterface{
        firstname: string;
        lastname?: string;
        age: number;
        male: boolean;
    }

    export class PersonImplementation{
        protected person: PersonInterface;
        private alive: boolean;
        private killer: PersonImplementation;
        private victims: Array<PersonImplementation>;
        private log: LogImplementation;
        constructor(person : PersonInterface, log: LogImplementation){
            this.person = this.createPerson(person);
            this.alive = true;
            this.victims = [];
            this.log = log;
            this.log.send("New person " + this.getFullname());
        }
        public getKiller() : PersonImplementation{
            return this.killer;
        }
        public isAlive() : boolean{
            return this.alive;
        }
        private createPerson(data: PersonInterface){
            var newPerson : PersonInterface= {
                firstname: "Unkown",
                lastname: "Unkown",
                age: -1,
                male: true // because first was Adam
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
        }
        public kill(killer: PersonImplementation) : boolean{
            if(!this.alive){
                this.log.send('You cannot kill ' + killer.getFirstname() + ' again.');
                return false;
            }
            this.log.send(this.getFullname() + " was killed by " + killer.getFullname());
            this.killer = killer;
            this.alive = false;
            return true;
        }
        public killPerson(victim: PersonImplementation) : boolean{
            if(!this.alive){
                var sex = 'she';
                if(this.person.male) sex = 'he';
                this.log.send(this.getFirstname() + ' cannot kill anybody because ' + sex + ' is dead.');
                return false;
            }
            victim.kill(this);
            this.victims.push(victim);
        }
        public getLastname() : string{
            return this.person.lastname;
        }
        public getFirstname() : string{
            return this.person.firstname;
        }
        public getSex() : string{
            if(this.person.male) return 'male';
            else return 'female';
        }
        public getAge() : number{
            return this.person.age;
        }
        public getFullname() : string{
            var fn = this.getFirstname() + ' ' + this.getLastname();
            if(!this.alive) fn += ' ( Dead ) '; 
            return fn;
        }
    }
}