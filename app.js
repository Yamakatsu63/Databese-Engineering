$('#submit').click(function() {
  console.log($('#date').val())
  if($('#date').val() == ""){
    alert("誕生日を入力してください")
  } else {
    $( '#result-table' ).empty()
    $( '#result-table' ).append( $( '<pre>' ).text("検索中..."))
    // 誕生日フィルターの追加
    var filter = "FILTER("
    var date = $('#date').val().substring(5)
    // 1950年から2010年までの同じ誕生日でフィルタリング
    for(var i=1950;i<2010;i++){
      filter += 'xsd:date(?birth) = "' + i + '-' + date + '"^^xsd:date || '
    }
    filter = filter.substring(0, filter.length-4) + ')\n'
    var query = sparqlQueryFirst + filter + sparqlQueryEnd
    // クエリの実行
    makeSPARQLQuery( endpointUrl, query, function( data ) {
      $( '#result-table' ).empty()
      for(var i=0;i<data.results.bindings.length;i++) {
        var result = data.results.bindings[i]
        $('#result-table').append('<tr><td>' + result.name.value + '</td><td>' + new Date(result.birth.value).getFullYear() + '</td></tr>');
      }
    });
  }
})