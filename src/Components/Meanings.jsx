export default function Meanings(props) {
    let {meanings} = props;
    return <>
        {meanings.map((element) => {
            return <div>
                <h2>{element?.word}</h2>
                {element?.meanings.map((mean) => {
                    return <><p>{mean?.partOfSpeech} : </p>
                        {mean.definitions.map(el => <p>{el?.definition}</p>)}
                    </>
                })}
            </div>
        })}
    </>
}