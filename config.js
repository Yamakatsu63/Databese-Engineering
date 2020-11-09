function makeSPARQLQuery( endpointUrl, sparqlQuery, doneCallback ) {
	var settings = {
		headers: { Accept: 'application/sparql-results+json' },
		data: { query: sparqlQuery }
	};
	return $.ajax( endpointUrl, settings ).then( doneCallback );
}

const endpointUrl = 'https://query.wikidata.org/sparql';
var sparqlQueryFirst = "SELECT ?who ?whoDescription ?name ?birth\n" +
  "WHERE {\n" +
  "  ?who wdt:P27 wd:Q17;\n" +
  "       wdt:P1559 ?name;\n" +
  "       wdt:P569 ?birth.\n"+
  "SERVICE wikibase:label { bd:serviceParam wikibase:language 'ja' }";

var sparqlQueryEnd = "} LIMIT 100";