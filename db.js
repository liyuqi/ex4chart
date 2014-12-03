var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var eventsSchema = new Schema({
    level:  String,
    message: String,
    timestamp:   { type: Date }
});

mongoose.model('events', eventsSchema);
//mongoose.model( 'Todo', Todo );
mongoose.connect( 'mongodb://localhost/events' );

