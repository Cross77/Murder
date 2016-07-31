# Murder app

It is my "hello world" in typescript

## Commands list

```
help           # list of helps

help add       # how to add person

help person    # get information of person

help persons   # persons list with uid

help kill      # how to kill person

cls | clear    # clear screen

persons        # get persons list with uid

person <murder_uid> kill <victim_uid>              # kill person

add <firstname> <lastname> <age> <sex>(true/false) # add person

person <uid> get <get_option>                      # get information about person
```

get_option :

```
    fullname
    firstname
    lastname
    killer
    sex
    age
    killer
    all
```

## Commands in JavaScript

Send command :

```
app.send( <command : string> ) => void  # send command
```

Get last command :

```
app.last() => string # get last command
```

## Compile

Typescript :

```
tsc core/src/main.ts --out  core/murder.js --removeComments
```

Sass :

```
node-sass ./css/src/style.scss ./css/murder.css<br/>
```
Sass Compressed :
```
node-sass --output-style compressed ./css/src/style.scss ./css/murder.min.css
```

## Demo
http://cross77.github.io/murder/
