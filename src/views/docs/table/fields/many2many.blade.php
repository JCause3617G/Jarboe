<p>
    Отображение связи многое-ко-многим.<br>
    Пример:
</p>

<p class="alert alert-danger">Для <code>many2many</code> вместо идентификатора поля пишется любое значение, начинающееся с <code>many2many</code>, чтобы импользовать несколько <code>many2many</code> в одной форме.</p>

<pre>
<code class="php">
// текущая таблица filials
'many2many' => array(
    'caption'   => 'Предоставляемые услуги',
    'type'      => 'many_to_many',
    'show_type' => 'select2',
    'hide_list' => true,
    'mtm_table'                      => 'filials2services',
    'mtm_key_field'                  => 'id_filial',  // filials2catalog.id_filial
    'mtm_external_foreign_key_field' => 'id',         // services.id
    'mtm_external_key_field'         => 'id_service', // filials2services.id_service
    'mtm_external_value_field'       => 'name',       // services.name
    'mtm_external_table'             => 'services',
    'divide_columns'   => 3,
    'additional_where' => array(
        'services.is_active' => array(
            'sign'  => '=',
            'value' => '1'
        )
    )
),
</code>
</pre>

<dl class="dl-horizontal">
  <dt>show_type</dt>
  <dd>Тип отображения поля (<code>checkbox|select2</code>). <span class="label bg-color-blueLight pull-right">checkbox</span></dd>
  <dt>divide_columns</dt>
  <dd>Количество колонок для внешних ключей (применимо для <code>show_type = checkbox</code>). <span class="label bg-color-blueLight pull-right">2</span></dd>
  <dt>additional_where</dt>
  <dd>Дополнительные <code>WHERE</code> запросы для выборки. <span class="label bg-color-blueLight pull-right">без доп.условий</span></dd>
  <dt>mtm_table</dt>
  <dd>Таблица связей. <span class="label bg-color-red pull-right">обязательно</span></dd>
  <dt>mtm_key_field</dt>
  <dd>Название ключа таблицы связей, ссылающийся на текущее поле. <span class="label bg-color-red pull-right">обязательно</span></dd>
  <dt>mtm_external_foreign_key_field</dt>
  <dd>Внешний ключ из таблицы <code>mtm_external_table</code> на который ссылается <code>mtm_external_key_field</code>. <span class="label bg-color-red pull-right">обязательно</span></dd>
  <dt>mtm_external_key_field</dt>
  <dd>Название ключа таблицы связей, ссылающийся на поле из второй таблицы связей <code>mtm_external_table</code>. <span class="label bg-color-red pull-right">обязательно</span></dd>
  <dt>mtm_external_value_field</dt>
  <dd>Значение, которое подтянется на фронтенд из таблицы <code>mtm_external_table</code> по полю <code>mtm_external_foreign_key_field</code>. <span class="label bg-color-red pull-right">обязательно</span></dd>
  <dt>mtm_external_table</dt>
  <dd>Название таблицы, на которую ссылается внешний ключ таблицы связей, который не является текущей таблицей.<span class="label bg-color-red pull-right">обязательно</span></dd>
</dl>

<p>Слегка мутно. Строения таблиц из примера:</p>
<code>
<pre>
filials          - |id|...|
services         - |id|name|...|
filials2services - |id|id_filial|id_service|
</pre>
</code>