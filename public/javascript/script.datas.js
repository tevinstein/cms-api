$(document).ready(function() {
    // get all datas
    getAllDatas()

    // hide add form
    $('#add-data').hide()

    // search function
    $('input[name=search-data-letter], input[name=search-data-frequency]').on('keyup', function() {
        getAllDatas()
    })

    //must be upper case
    $('.uppercase').keyup(function() {
        this.value = this.value.toUpperCase();
    });

    //must be number

})

function getAllDatas() {
    $.ajax({
        url: "/api/datas",
        type: 'GET',
        data: {
            letter: $("input[name=search-data-letter]").val().toUpperCase(),
            frequency: $("input[name=search-data-frequency]").val()
        },
        dataType: 'json',
        success: function(results) {
            listData(results)
        }
    })
}

function listData(results) {
    $('.table-data tbody').empty()

    for (var i = 0; i < results.length; i++) {
        $('.table-data tbody').append('\
            <tr>\
                <td>' + (i + 1) + '</td>\
                <td class="data-letter">' + results[i].letter + '</td>\
                <td class="data-frequency">' + results[i].frequency + '</td>\
                <td>\
                    <button onclick="editData(this,event)" id="edit-data-button" data-id="' + results[i]._id + '" class="btn btn-sm btn-default"><span class="fa fa-pencil"></span></button>\
                    <button id="delete-data-button" class="btn btn-sm btn-default" data-toggle="modal" data-target="#deleteDataModal" onclick="showDeleteData(this)" data-id="' + results[i]._id + '"><span class="fa fa-trash"></span></button>\
                </td>\
            </tr>\
            ')
    }
}

function showDeleteData(pointer) {
    $('#process-delete-data').removeAttr('data-id')

    var id = $(pointer).attr('data-id')
    $('#process-delete-data').attr('data-id', id)
}

function deleteData(pointer, event) {
    event.preventDefault()

    var id = $(pointer).attr('data-id')
    $.ajax({
        url: "/api/datas/" + id,
        type: 'DELETE',
        success: function() {
            $(pointer).closest('tr').remove()
            $('#data-message').empty()
            $('#data-message').append('<div class="alert alert-info">Data is deleted</div>')
            getAllDatas()
            $('#deleteDataModal').modal('toggle');
        }
    })
}

function addData(event) {
    event.preventDefault()
    var id = $('#add-data-button').attr('data-id')

    if ($('#add-data-button').attr('data-id')) {
        $.ajax({
            url: "/api/datas/" + id,
            type: 'PUT',
            data: { letter: $("input[name=data-letter]").val().toUpperCase(), frequency: $("input[name=data-frequency]").val() },
            success: function() {
                $('#data-message').empty()
                $('#data-message').append('<div class="alert alert-info">Data is edited!</div>')
                $('#add-data-button').removeAttr('data-id');
                getAllDatas()

                $("input[name=data-letter]").val('');
                $("input[name=data-frequency]").val('');
            }
        })
    } else {
        $.ajax({
            url: "/api/datas",
            type: 'POST',
            data: { letter: $("input[name=data-letter]").val().toUpperCase(), frequency: $("input[name=data-frequency]").val() },
            success: function() {
                $('#data-message').empty()
                $('#data-message').append('<div class="alert alert-info">Data is added!</div>')
                $('#add-data-button').removeAttr('data-id');

                getAllDatas()
                $("input[name=data-letter]").val('');
                $("input[name=data-frequency]").val('');
            }
        })
    }
}

function editData(pointer, event) {
    var id = $(pointer).attr('data-id')
    var letter = $(pointer).closest('tr').find('.data-letter').text()
    var frequency = $(pointer).closest('tr').find('.data-frequency').text()

    $("input[name=data-letter]").val(letter);
    $("input[name=data-frequency]").val(frequency);

    $('#add-data-button').attr('data-id', id)
    $('#add-data').show()
}

function showAddData() {
    $('#add-data').toggle()
    $('#data-message').empty()
    if ($('#add-data-button').attr('data-id')) {
        $('#add-data-button').removeAttr('data-id');
    }
}
