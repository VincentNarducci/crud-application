let basecamp = 'https://crudcrud.com/api/6037074e32e2401a8ed8fcaa37252853/festivals'

function makeInitial() {
    let lollapalooza = new Festival( "Lollapalooza" );
    let spoon = new Band( "Spoon", "7:00 PM" );
    let wilco = new Band( "Wilco", "8:00 PM" );
    lollapalooza.bands.push ( spoon );
    lollapalooza.bands.push ( wilco );
    let coachella = new Festival("Coachella");
    let nin = new Band( "Nine Inch Nails", "9:30 PM" );
    let ratm = new Band ( "Rage Against The Machine", "11:00 PM")
    coachella.bands.push ( nin );
    coachella.bands.push ( ratm );
    console.log( lollapalooza );
    console.log ( coachella );
    myPost ( basecamp, lollapalooza )
    .then ( ( response ) => console.log ( response ) );
    myPost ( basecamp, coachella )
    .then ( ( response ) => console.log ( response ) );
}

function myPost ( url, stuff ) {
    return $.ajax( {
        url: url,
        type: "POST",
        dataType: "json",
        data: JSON.stringify( stuff ),
        contentType: "application/json"
    });
}