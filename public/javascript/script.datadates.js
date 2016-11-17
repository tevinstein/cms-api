$(document).ready(function() {
    getAllDataDates()
    $('#add-data-date').hide()
    $(function() {
        $("#datepicker").datepicker();
        $("#datepicker2").datepicker();
    })
    searchDataDates()
})

function searchDataDates() {
    $('input[name=search-data-date-letter], input[name=search-data-date-frequency]').on('keyup', function() {
        getAllDataDates()
    })
}

function getAllDataDates() {
    $.ajax({
        url: "/api/datadates",
        type: 'GET',
        data: {
            letter: $("input[name=search-data-date-letter]").val(),
            frequency: $("input[name=search-data-date-frequency]").val()
        },
        dataType: 'json',
        success: function(results) {
            listDataDate(results)
        }
    })
}

function listDataDate(results) {
    $('.table-data-date tbody').empty()

    for (var i = 0; i < results.length; i++) {
        $('.table-data-date tbody').append('\
            <tr>\
                <td>' + (i + 1) + '</td>\
                <td class="data-date-letter">' + results[i].letter + '</td>\
                <td class="data-date-frequency">' + results[i].frequency + '</td>\
                <td>\
                <button onclick="editDataDate(this,event)" data-id="' + results[i]._id + '" class="btn btn-sm btn-default"><span class="fa fa-pencil"></span></button>\
                <button id="delete-data-date-button" onclick="showDeleteDataDate(this)" data-toggle="modal" data-target="#deleteDataDateModal" class="btn btn-sm btn-default" data-id="' + results[i]._id + '"><span class="fa fa-trash"></span></button>\
                </td>\
            </tr>\
            ')
    }
}

function showDeleteDataDate(pointer) {
    $('#process-delete-data-date').removeAttr('data-id')

    var id = $(pointer).attr('data-id')
    $('#process-delete-data-date').attr('data-id', id)
}

function deleteDataDate(pointer,event) {
    event.preventDefault()

    var id = $(pointer).attr('data-id')
    $.ajax({
        url: "/api/datadates/" + id,
        type: 'DELETE',
        success: function() {
            $(pointer).closest('tr').remove()
            $('#data-date-message').empty()
            $('#data-date-message').append('<div class="alert alert-warning">Data is deleted</div>')
            getAllDataDates()
            $('#deleteDataDateModal').modal('toggle');
        }
    })
}

function addDataDate(event) {
    event.preventDefault()

    var id = $('#add-data-date-button').attr('data-id')

    if ($('#add-data-date-button').attr('data-id')) {
        $.ajax({
            url: "/api/datadates/" + id,
            type: 'PUT',
            data: { letter: $("input[name=data-date-letter]").val(), frequency: $("input[name=data-date-frequency]").val() },
            success: function() {
                $('#data-date-message').empty()
                $('#data-date-message').append('<div class="alert alert-warning">Data date is edited!</div>')
                $('#add-data-date-button').removeAttr('data-id');
                getAllDataDates()

                $("input[name=data-date-letter]").val('');
                $("input[name=data-date-frequency]").val('');
            }
        })
    } else {
        $.ajax({
            url: "/api/datadates",
            type: 'POST',
            data: { letter: $("input[name=data-date-letter]").val(), frequency: $("input[name=data-date-frequency]").val() },
            success: function() {
                $('#data-date-message').empty()
                $('#data-date-message').append('<div class="alert alert-warning">Data date is added!</div>')
                $('#add-data-date-button').removeAttr('data-id');
                getAllDataDates()

                $("input[name=data-date-letter]").val('');
                $("input[name=data-date-frequency]").val('');
            }
        })
    }
}

function editDataDate(pointer, event) {
    var id = $(pointer).attr('data-id')
    var letter = $(pointer).closest('tr').find('.data-date-letter').text()
    var frequency = $(pointer).closest('tr').find('.data-date-frequency').text()

    $("input[name=data-date-letter]").val(letter);
    $("input[name=data-date-frequency]").val(frequency);

    $('#add-data-date-button').attr('data-id', id)
    $('#add-data-date').show()
}

function showAddDataDate() {
    $('#add-data-date').toggle()
    $('#data-date-message').empty()
    if ($('#add-data-date-button').attr('data-id')) {
        $('#add-data-date-button').removeAttr('data-id');
    }
}
