![Major Image](/client/public/apple-touch-icon.png)
# Major Image

A web based tool for generating descriptions for use in tabletop rpgs.  

The aim of this tool is to quickly provide GMs with sample descriptions to spark their imagination and keep the pace of play going at the table.  

### Setup
Host and populate your own data set in MongoDB.  
Sample data is included in `/data`.

Create a `.env` file in the project's root directory with the following variable:  
`MONGO_URI = <your mongodb connection string here>`

Install dependencies:  
`npm i`

Run client and server in dev mode:  
`npm run dev`  

