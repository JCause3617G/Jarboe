<?php

class TableAdminController extends BaseController
{
    
    public function showSettings()
    {
        $options = array(
            'url'      => '/admin/settings',
            'def_name' => 'settings',
        );
        list($table, $form) = Jarboe::table($options);

        $view = View::make('admin::table', compact('table', 'form'));

        return $view;
    } // end showSettings
    
    public function handleSettings()
    {
        $options = array(
            'url'      => '/admin/settings',
            'def_name' => 'settings',
        );
        return Jarboe::table($options);
    } // end handleSettings  
    
}
