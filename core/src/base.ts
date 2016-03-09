///<reference path='person.ts' />

module Murder{
    export class BaseImplementation{
        private persons : Array<PersonImplementation>;
        private log: LogImplementation;
        constructor(){
            this.persons = [];
        }
        public add(p : PersonInterface, log: LogImplementation): void{
            var temp = new PersonImplementation(p, log);
            this.log = log;
            this.persons.push(temp);
        }
        public person(uid: number): PersonImplementation{
            if(uid < 0 || uid > this.persons.length){
                this.log.send('Person error: Bad uid');
                return this.persons[0];
            } 
            return this.persons[uid];
        }
        public show_list(): void{
            var uid: number = 0;
            var temp: string;
            this.persons.forEach(function(person : PersonImplementation){
                temp = uid.toString() + ' : ' + person.getFullname();
                this.log.send(temp);
                uid++;
            });
        }
    }
}