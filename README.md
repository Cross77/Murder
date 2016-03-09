# Murder
It is my "hello world" in typescript

# commands
help - list of helps

help add - how to add person

help person - get information of person

help persons - persons list with uid

help kill - how to kill person

cls | clear - clear screen

add <firstname> <lastname> <age> <sex>(true/false) - add person

person <uid> get ( fullname | firstname | lastname | killer | sex | age | kill )

person <murder_uid> kill <victim_uid> - kill person

# commands in js
app.send( <command : string> ) => void // send command
app.last() => string // get last command

# interfaces
interface PersonInterface{</br>
    firstname: string;</br>
    lastname?: string;</br>
    age: number;</br>
    male: boolean;</br>
}

# compile
Typescript :
tsc core/src/main.ts --out  core/murder.js --removeComments
Sass :
node-sass ./css/src/style.scss ./css/murder.css
Sass Compressed :
node-sass --output-style compressed ./css/src/style.scss ./css/murder.min.css
