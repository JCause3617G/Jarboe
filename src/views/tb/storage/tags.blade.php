
<div class="row">


<table class="j-tags-table table table-bordered table-striped">
    <thead>
        <tr>
            <th style="text-align: right;"><input style="width:30%;" type="text" name="title" /></th>
            <th width="1%">
                <a href="javascript:void(0);" class="btn btn-default btn-sm" 
                   onclick="Superbox.addTag(this);">
                    <i class="fa fa-plus"></i>
                </a>
            </th>
        </tr>
    </thead>
    <tbody>
        @foreach ($tags as $tag)
            @include('admin::tb.storage.tag_row')
        @endforeach
    </tbody>
</table>
    

</div>