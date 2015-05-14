'use strict';

var Superbox = 
{

    input: null,
    type_select: null,

    fields: {
        image: {},
        gallery: {},
        tag: {},
        storage: {},
    },

    init: function()
    {
        $('.superbox').SuperBox();
    }, // end init
    
    openCatalog: function(id) 
    {
    }, // end openCatalog
    
    uploadSingleImage: function(context, type, idImage)
    {
        var data = new FormData();
        data.append("image", context.files[0]);
        data.append('query_type', 'image_storage');
        data.append('storage_type', 'upload_single_image');
        data.append('__node', TableBuilder.getUrlParameter('node'));
        data.append('type', type);
        data.append('id', idImage);

        jQuery.ajax({
            data: data,
            type: "POST",
            url: TableBuilder.getActionUrl(),
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                if (response.status) {
                    $(context).parent().parent().parent().parent().find('.superbox-current-img').prop('src', response.src);
                } else {
                    TableBuilder.showErrorNotification("Ошибка при загрузке изображения");
                }
            }
        });
    }, // end uploadSingleImage
    
    showGalleryEditInput: function(context)
    {
        var $td = $(context).closest('td');
        
        $td.find('.b-value').hide();
        $td.find('.b-input').show();
    }, // end showGalleryEditInput
    
    closeGalleryEditInput: function(context)
    {
        var $td = $(context).closest('td');
        
        var value = $td.find('.b-value').show().find('a').text().trim();
        $td.find('.b-input').hide().find('input').val(value);
    }, // end closeGalleryEditInput
    
    saveGalleryEditInput: function(context, idGallery)
    {
        var $td = $(context).closest('td');
        var value = $td.find('.b-input').hide().find('input').val();
        
        jQuery.ajax({
            type: "POST",
            url: TableBuilder.getActionUrl(),
            data: { query_type: 'image_storage', storage_type: 'rename_gallery', title: value, id: idGallery, '__node': TableBuilder.getUrlParameter('node') },
            dataType: 'json',
            success: function(response) {
                if (response.status) {
                    $td.find('.b-value').show().find('a').text(value);
                } else {
                    TableBuilder.showErrorNotification('Что-то пошло не так');
                }
            }
        });
    }, // end saveGalleryEditInput
    
    showTagEditInput: function(context)
    {
        var $td = $(context).closest('td');
        
        $td.find('.b-value').hide();
        $td.find('.b-input').show();
    }, // end showGalleryEditInput
    
    closeTagEditInput: function(context)
    {
        var $td = $(context).closest('td');
        
        var value = $td.find('.b-value').show().find('a').text().trim();
        $td.find('.b-input').hide().find('input').val(value);
    }, // end closeTagEditInput
    
    saveTagEditInput: function(context, idTag)
    {
        var $td = $(context).closest('td');
        var value = $td.find('.b-input').hide().find('input').val();
        
        jQuery.ajax({
            type: "POST",
            url: TableBuilder.getActionUrl(),
            data: { query_type: 'image_storage', storage_type: 'rename_tag', title: value, id: idTag, '__node': TableBuilder.getUrlParameter('node') },
            dataType: 'json',
            success: function(response) {
                if (response.status) {
                    $td.find('.b-value').show().find('a').text(value);
                } else {
                    TableBuilder.showErrorNotification('Что-то пошло не так');
                }
            }
        });
    }, // end saveTagEditInput
    
    deleteImage: function(context)
    {
        jQuery.SmartMessageBox({
            title : "Удалить изображение?",
            content : "Эту операцию нельзя будет отменить.",
            buttons : '[Нет][Да]'
        }, function(ButtonPressed) {
            if (ButtonPressed === "Да") {
                jQuery.ajax({
                    type: "POST",
                    url: TableBuilder.getActionUrl(),
                    data: { query_type: 'image_storage', storage_type: 'delete_image', id: $(context).data('id'), '__node': TableBuilder.getUrlParameter('node') },
                    dataType: 'json',
                    success: function(response) {
                        if (response.status) {
                            $('.superbox .superbox-show', '.b-j-images').remove();
                            $('.superbox .superbox-list.active', '.b-j-images').remove();
                            
                            Superbox.init();
                            TableBuilder.showSuccessNotification('Изображение удалено');
                        } else {
                            TableBuilder.showErrorNotification('Что-то пошло не так');
                        }
                    }
                });
            }
        });
    }, // end deleteImage
    
    selectTag: function(context, idTag)
    {
        Superbox.input.val(idTag);
        TableBuilder.closeImageStorageModal();
    }, // end selectTag
    
    selectGallery: function(context, idGallery)
    {
        Superbox.input.val(idGallery);
        TableBuilder.closeImageStorageModal();
    }, // end selectTag
    
    uploadImage: function(context)
    {
        var $titleInput = $(context).parent().parent().find('.j-image-title');
        
        var data = new FormData();
        for (var x = 0; x < context.files.length; x++) {
            data.append("images[]", context.files[x]);
        }
        data.append('query_type', 'image_storage');
        data.append('storage_type', 'upload_image');
        data.append('title', $titleInput.val());
        data.append('__node', TableBuilder.getUrlParameter('node'));
        // FIXME: catalog
        data.append('id_catalog', 1);

        jQuery.ajax({
            data: data,
            type: "POST",
            url: TableBuilder.getActionUrl(),
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                console.log(response);
                if (response.status) {
                    $titleInput.val('');
                    $('.superbox').prepend(response.html);
                    Superbox.init();
                } else {
                    TableBuilder.showErrorNotification("Ошибка при загрузке изображения");
                }
            }
        });
    }, // end uploadFile
    
    saveImageInfo: function(context)
    {
        var $context = $(context);
        var data = $context.parent().parent().find('form').serializeArray();
        data.push({ name: 'id', value: $context.data('id') });
        data.push({ name: 'query_type', value: 'image_storage' });
        data.push({ name: 'storage_type', value: 'save_image_info' });
        data.push({ name: '__node', value: TableBuilder.getUrlParameter('node') });
        
        jQuery.ajax({
            type: "POST",
            url: TableBuilder.getActionUrl(),
            data: data,
            dataType: 'json',
            success: function(response) {
                console.log(response);
                if (response.status) {
                    $('.superbox .superbox-list.active .superbox-img', '.b-j-images').data('info', JSON.stringify(response.info).replace(/"/g, '~'));
                    TableBuilder.showSuccessNotification('Сохранено');
                } else {
                    TableBuilder.showErrorNotification('Что-то пошло не так');
                }
            }
        });
        
        console.table(data);
    }, // end saveImageInfo
    
    selectImage: function(context)
    {
        var value = $('.superbox .superbox-list.active .superbox-img', '.b-j-images').data('id');
        
        Superbox.input.val(value);
        TableBuilder.closeImageStorageModal();
    }, // end selectImage
    
    showGalleries: function(context)
    {
        var $context = $(context);
        if ($context.hasClass('active')) {
            return;
        }
        
        $('.b-j-galleries').show();
        $('.b-j-images').hide();
        $('.b-j-tags').hide();
        
        $context.parent().find('.active').removeClass('active');
        $context.addClass('active');
    }, // end showGalleries
    
    showImages: function(context)
    {
        var $context = $(context);
        if ($context.hasClass('active')) {
            return;
        }
        
        $('.b-j-galleries').hide();
        $('.b-j-images').show();
        $('.b-j-tags').hide();
        
        $context.parent().find('.active').removeClass('active');
        $context.addClass('active');
    }, // end showImages
    
    showTags: function(context)
    {
        var $context = $(context);
        if ($context.hasClass('active')) {
            return;
        }
        
        $('.b-j-galleries').hide();
        $('.b-j-images').hide();
        $('.b-j-tags').show();
        
        $context.parent().find('.active').removeClass('active');
        $context.addClass('active');
    }, // end showTags
    
    addTag: function(context)
    {
        var $input = $(context).parent().parent().find('input');
        
        jQuery.ajax({
            type: "POST",
            url: TableBuilder.getActionUrl(),
            data: { query_type: 'image_storage', storage_type: 'add_tag', type: Superbox.type_select, title: $input.val(), '__node': TableBuilder.getUrlParameter('node') },
            dataType: 'json',
            success: function(response) {
                console.log(response);
                if (response.status) {
                    $('tbody', '.j-tags-table').prepend(response.html);
                    $input.val('');
                } else {
                    TableBuilder.showErrorNotification('Что-то пошло не так');
                }
            }
        });
    }, // end addTag
    
    deleteTag: function(id, context)
    {
        jQuery.SmartMessageBox({
            title : "Удалить тег?",
            content : "Эту операцию нельзя будет отменить.",
            buttons : '[Нет][Да]'
        }, function(ButtonPressed) {
            if (ButtonPressed === "Да") {
                jQuery.ajax({
                    type: "POST",
                    url: TableBuilder.getActionUrl(),
                    data: { query_type: 'image_storage', storage_type: 'delete_tag', id: id, '__node': TableBuilder.getUrlParameter('node') },
                    dataType: 'json',
                    success: function(response) {
                        console.log(response);
                        if (response.status) {
                            $(context).parent().parent().remove();
                        } else {
                            TableBuilder.showErrorNotification('Что-то пошло не так');
                        }
                    }
                });
            }
        });
    }, // end deleteTag
    
    addGallery: function(context)
    {
        var $input = $(context).parent().parent().find('input');
        
        jQuery.ajax({
            type: "POST",
            url: TableBuilder.getActionUrl(),
            data: { query_type: 'image_storage', storage_type: 'add_gallery', type: Superbox.type_select, title: $input.val(), '__node': TableBuilder.getUrlParameter('node') },
            dataType: 'json',
            success: function(response) {
                console.log(response);
                if (response.status) {
                    $('tbody', '.j-galleries-table').prepend(response.html);
                    $input.val('');
                } else {
                    TableBuilder.showErrorNotification('Что-то пошло не так');
                }
            }
        });
    }, // end addGallery
    
    deleteGallery: function(id, context)
    {
        jQuery.SmartMessageBox({
            title : "Удалить галерею?",
            content : "Эту операцию нельзя будет отменить.",
            buttons : '[Нет][Да]'
        }, function(ButtonPressed) {
            if (ButtonPressed === "Да") {
                jQuery.ajax({
                    type: "POST",
                    url: TableBuilder.getActionUrl(),
                    data: { query_type: 'image_storage', storage_type: 'delete_gallery', id: id, '__node': TableBuilder.getUrlParameter('node') },
                    dataType: 'json',
                    success: function(response) {
                        console.log(response);
                        if (response.status) {
                            $(context).parent().parent().remove();
                        } else {
                            TableBuilder.showErrorNotification('Что-то пошло не так');
                        }
                    }
                });
            }
        });
    }, // end deleteGallery
    
};

$(document).ready(function() {
    //Superbox.init();
});
