import './Search.css'
import Suggestions from "./Suggestions";
import {useEffect, useState} from "react";
import {insertDictionaryToTrie, Trie} from "../WordsTrie/Trie";
import Meanings from "./Meanings";
export default function Search() {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [wordsTrie, setWordsTrie] = useState(null)
    const [meanings, setMeanings] = useState([])
    useEffect(() => {
        if (input.length){
            if (!wordsTrie) {
                const trie = new Trie()
                insertDictionaryToTrie(trie)
                setWordsTrie(trie)
            } else {
                const suggestion = wordsTrie.getMatchingWords(input)
                setSuggestions(suggestion)
            }
        }
    }, [input]);
     async function searchMeaning() {
        if (input.length) {
            try {
                const response = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + input)
                const data = await response.json();
                setMeanings(data)
            } catch (e) {
                console.log(e)
            }
        }
    }
    return <>
        <div id={"container"}>
            <div>
                <div id={"searchContainer"}>
                    <input value={input}
                           type={"text"}
                           id={"searchBox"}
                           onChange={(e)=> {
                            setInput(e.target.value.trim().toLowerCase())
                            setMeanings([])
                                }
                            }
                           onKeyDown={async (e) => {
                               if (e.key === "Enter")
                                   await searchMeaning()
                           }}
                    />
                    <div id={"button"} onClick={async ()=> {await searchMeaning()}}></div>
                </div>
                {
                    input.length && !(meanings.length || meanings.message) ?
                    <Suggestions suggestions = {suggestions} setInput={setInput}/>
                    : null
                }
                {
                    meanings.length ?
                    <Meanings meanings={meanings}/>:
                    meanings.message ?
                        <div>{meanings.message}</div> : null
                }
            </div>
            <div>

            </div>
        </div>
    </>
}