import "./Search.css"
export default function Suggestions (props) {
    const {suggestions, setInput} = props;
    return <>
        <div id={"suggestionBox"}>
            {
                suggestions?.map((word)=>{
                    return <div onClick={(e)=>{
                        setInput(word)
                    }}>{word}</div>
                })
            }
        </div>
    </>
}