///<reference path='cmd.ts' />

module Murder{
    export class init{
        private base: BaseImplementation;
        private cmd: CMDImplementation;
        private log: LogImplementation;
        constructor(log: (string) => void){
            this.log = new Murder.LogImplementation(log);
            this.base = new BaseImplementation();
            this.cmd = new CMDImplementation(this.base, this.log);
        }
        public send(text: string): void{
            this.cmd.send(text);
        }
        public last(): string{
            return this.cmd.getLastCMD();
        }
    }
}