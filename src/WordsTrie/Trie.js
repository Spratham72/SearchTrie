const jsonData = require("./words_dictionary.json")
let Node = function () {
    this.keys = new Array(26).fill(false)
    this.end  = false
    this.setEnd = function () {
        this.end = true
    }
    this.isEnd = function (){
        return this.end
    }
    this.isCharPresent = function (char){
        return this.keys[char.charCodeAt() - "a".charCodeAt()]
    }
    this.addChar = function (char, node){
        this.keys[char.charCodeAt() - "a".charCodeAt()] = node
    }
    this.getCurrNode = function (char) {
        return this.keys[char.charCodeAt() - "a".charCodeAt()]
    }
}

let Trie = function () {
    this.root = new Node()
    this.addWord = function (word, node = this.root) {
        for (const char of word){
            if (!node.isCharPresent(char)){
                node.addChar(char, new Node())
            }
            node = node.getCurrNode(char)
        }
        node.setEnd()
    }
    this.getMatchingWords = function(word, node = this.root){
        let matchingWords = []
        let str = ""
        for (const char of word) {
            if (!node.isCharPresent(char)){
                return matchingWords
            }
            node = node.getCurrNode(char)
            str += char
        }
        this.collectWordWithSamePrefix(str, node, matchingWords)
        return matchingWords

    }
    this.collectWordWithSamePrefix = function (prefix, node, matchingWords) {
        if(node.isEnd()){
            matchingWords.push(prefix)
        }
        for (let i=0; i<26; i++){
            if(node.keys[i]) {
                const nextChar = String.fromCharCode("a".charCodeAt() + i);
                this.collectWordWithSamePrefix(prefix+nextChar,node.keys[i], matchingWords)
            }
        }
    }
}


function insertDictionaryToTrie (trie){
    const words = jsonData.data;
    console.log(words)
    // const trie = new Trie()
    for (const key in words){
        trie.addWord(key)
    }
}

export {Trie, insertDictionaryToTrie}

// console.log(trie)
