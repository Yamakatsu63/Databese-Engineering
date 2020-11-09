$('#submit').click(function() {
  console.log($('#date').val())
  var birth = $('#date').val()
  if(birth == ""){
    alert("誕生日を入力してください")
  } else {
    $('#result-title').empty()
    $( '#result-table' ).empty()
    $( '#result-title' ).append( $( '<pre>' ).text("検索中..."))
    // 誕生日フィルターの追加
    var filter = "FILTER("
    var date = birth.substring(5)
    // 1950年から2010年までの同じ誕生日でフィルタリング
    for(var i=1950;i<2010;i++){
      filter += 'xsd:date(?birth) = "' + i + '-' + date + '"^^xsd:date || '
    }
    filter = filter.substring(0, filter.length-4) + ')\n'
    var query = sparqlQueryFirst + filter + sparqlQueryEnd
    // クエリの実行
    makeSPARQLQuery( endpointUrl, query, function( data ) {
      $( '#result-table' ).empty()
      $('#result-title').empty()
      $('#result-title').append('<p>' + parseDate(birth) + '生まれの有名人</p>')
      for(var i=0;i<data.results.bindings.length;i++) {
        var result = data.results.bindings[i]
        console.log(result)
        if(result.whoDescription == null){
          $('#result-table').append('<tr><td>' + result.name.value + '</td><td>' + 
            new Date(result.birth.value).getFullYear() + '年生まれ</td>' + 
            '<td>' + " " + '</td></tr>'
            );
        } else {
          $('#result-table').append('<tr><td>' + result.name.value + '</td><td>' + 
            new Date(result.birth.value).getFullYear() + '年生まれ</td>' + 
            '<td>' + result.whoDescription.value + '</td></tr>'
            );
        }
      }
    });
  }
})

function parseDate(birth){
  var dateOfBirth = new Date(birth)
  return dateOfBirth.getMonth()+1 + "月" + dateOfBirth.getDate() + "日"
}