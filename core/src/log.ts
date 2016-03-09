module Murder{
    export class LogImplementation{
        private cb: (string) => void;
        constructor(cb: (string) => void ){
            this.cb = cb;
        }
        public send(text: string, cmd: boolean = false): void{
            if(cmd) text = '> ' + text;
            text = text
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
            this.cb(text);
        }
    }
}