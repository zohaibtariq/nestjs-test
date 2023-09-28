const FilmsIndex:  { index: string; settings: any, mappings: any } = {
    "index": "",
    "settings": {
        "analysis": {
            "filter": {
                "stop_filter": {
                    "type": "stop",
                    "stopwords": ["the", "a", "of"]
                }
            },
            "analyzer": {
                "stop_words_analyzer": {
                    "tokenizer": "standard",
                    "filter": ["lowercase", "stop_filter"]
                }
            }
        }
    },
    "mappings": {
        "properties": {
            "name": {
                "type": "text",
                "analyzer": "stop_words_analyzer"
            },
            "description": {
                "type": "text",
                "analyzer": "stop_words_analyzer"
            },
            "genre": {
                "type": "text",
                "analyzer": "stop_words_analyzer"
            }
        }
    }
}

export default FilmsIndex