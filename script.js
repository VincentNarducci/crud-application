class Festival {
    constructor(name){
        this.name = name;
        this.bands = [];
    }

    addBand(name, time){
        this.bands.push(new Band(name, time));
    }
}

class Band {
    constructor(name, time){
        this.name = name;
        this.time = time;
    }
}

class FestivalService{
    static url = 'https://crudcrud.com/api/6037074e32e2401a8ed8fcaa37252853/festivals'

    static getAllFestivals(){
        return $.get(this.url);
    }

    static getFestival(id){
        return $.get(this.url + `/${id}`);
    }

    static createFestival(festival){
        return $.ajax( {
            url: this.url,
            type: "POST",
            dataType: "json",
            data: JSON.stringify( festival ),
            contentType: "application/json"
        });
    }

    static updateFestival(festivalId, festival){
        return $.ajax({
            url: this.url + `/${festivalId}`,
           // dataType: 'json',
            data: JSON.stringify(festival),
            contentType: 'application/json',
            type: 'PUT'
    });
}

    static deleteFestival(id){
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }
}

class DOMManager {
    static festivals;

    static getAllFestivals() {
        FestivalService.getAllFestivals().then(festivals => this.render(festivals));
    }

    static createFestival(name){
        FestivalService.createFestival(new Festival(name))
        .then( () => {
            return FestivalService.getAllFestivals();
        })
        .then((festivals) => this.render(festivals));
    }

    static deleteFestival(id){
        FestivalService.deleteFestival(id)
        .then(() => {
            return FestivalService.getAllFestivals();
        })
        .then((festivals) => this.render(festivals));
    }

    static addBand(id) {
        
            for (let festival of this.festivals){
            if (festival._id == id){
                console.log(festival);
                festival.bands.push(new Band($(`#${festival._id}-band-name`).val(), $(`#${festival._id}-band-time`).val()));
                let festivalId = festival._id;
                delete festival._id;
                console.log(festivalId);
                
                FestivalService.updateFestival(festivalId, festival) 
                .then(() => {
                    return FestivalService.getAllFestivals();
                })
                .then((festivals) => this.render(festivals));
            }
        } 
    }

    static render(festivals){
        this.festivals = festivals;
        $('#app').empty();
        for (let festival of festivals){
            $('#app').prepend(
                `<div id='${festival._id}' class='card'>
                    <div class='card-header'>
                        <div class="row">
                        <div class="col-sm-11">
                        <h2>${festival.name}</h2>
                        </div>
                        <div class="col-sm-1">
                        <button class='btn btn-danger btn-right' onclick="DOMManager.deleteFestival('${festival._id}')"><i class="fas fa-trash-alt"></i></button>
                    </div>
                    </div>
                    </div>
                    <div class='card-body'>
                        <div class='card' id='band-inputs'>
                            <div class='row'>
                                <div class='col-sm-5'>
                                    <input type='text' id='${festival._id}-band-name' class='form-control' placeholder='Add Band'>
                                </div>
                                <div class='col-sm-4'>
                                    <input type='text' id='${festival._id}-band-time' class='form-control' placeholder='Add Time'>
                                </div>
                                <div class="col-sm-3">
                                <button id='${festival._id}-new-band' onclick="DOMManager.addBand('${festival._id}')" class='btn btn-primary form-control'><i class="fas fa-plus-circle"></i></button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div><br />`
            );
            for (let band of festival.bands){
                $(`#${festival._id}`).find('.card-body').append(
                 `<div class="row">
                 <div class="col-sm-11">
                   
                    <span id='name-${band._id}'><h3> ${band.name}</h3></span>
                    <span id='time-${band._id}'><p> ${band.time}</p></span>
                    </div>
                    <div class="col-sm-1">
                    <button class='btn btn-danger btn-right' onclick="DOMManager.deleteBand('${festival._id}', '${band._id}')"><i class="fas fa-trash-alt"></i></button>
                    </div>
                    </div>`   
                )
            }
        }
    }


}

$('#create-new-festival').on("click", function(e) {
    DOMManager.createFestival($('#new-festival-name').val());
    $('#new-festival-name').val('');
})

DOMManager.getAllFestivals();