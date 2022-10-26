
import Quote from "./Quote";
import { addDoc, doc, getDoc, getDocs, collection, query, setDoc, where} from "firebase/firestore";
import { useEffect, useState } from "react";

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
    // const docRef = doc(db, "votes", "xLNByuipSF-Ib2rNmuk3PQ");
    // getDoc(docRef).then((data) => console.log(data.data().id));

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
            {quotes.result.map(quote => <Quote quote={quote} key={quote.id}/>)}
        </>
    )
}

export default Quotes;