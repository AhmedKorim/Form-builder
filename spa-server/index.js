const Express = require( 'express' );
const path = require( 'path' );
const fs = require( 'fs' )
const app = Express()

app.use( Express.static( path.join( __dirname, '..', 'build' ) ) )
app.get( '*', ( req, res ) => {
    const fileStream = fs.createReadStream( path.join( __dirname, '..', 'build', 'index.html' ) )
    res.contentType( 'text/html' )
    fileStream.pipe( res )
} )
app.listen( 8055 )
