## Required Setup

Install nodemon using  
`npm install -g nodemon`  

Create config directory `config/` and config file `config.json` inside that directory.  
Structure `config.json` as follows to allow db connection:  
```
{  
  "db": {  
    "connection_string" : "<YOUR DB CONNECTION STRING HERE>"  
  }  
}  
```


### `nodemon app`

Runs the node/graphql server.<br>
Open [http://localhost:4000/graphql](http://localhost:4000/graphql) to view it in the browser.

The server will reload if you make edits.<br>