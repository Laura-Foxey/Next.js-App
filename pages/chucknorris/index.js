import { db } from "../../firebaseConfig"
import { addDoc, doc, getDoc, getDocs, collection, query} from "firebase/firestore";
import { useEffect } from "react";

export async function getServerSideProps() {
    const res = await fetch('https://api.chucknorris.io/jokes/search?query=triangle');
    const quotes = await res.json();
    if (!quotes) return { notFound: true }
    return {
        props: {
            quotes
        }, // will be passed to the page component as props
    }
}

const Quotes = ({quotes}) => {
    console.log(quotes);

    //--used--
    // const populateDB = () => {
    //     const databaseName = collection(db, "votes");
    //     for(let i = 0; i < quotes.result.length; i++)
    //         {
    //             console.log(i);
    //             addDoc(databaseName, {
    //             id: quotes.result[i].id,
    //             votes: 0
    //         });
    //         }
    //     }
    return (
        <>
            <h3> Quotes: </h3>
            <ul>
                {quotes.result.map(quote =>
                    <li key={quote.id}>
                        <h3>{quote.value}</h3>
                        <div>
                            <h3> + </h3>
                            <h3> </h3>
                            <h3> - </h3>
                        </div>
                    </li>)}
            </ul>
        </>
    )
}

export default Quotes;