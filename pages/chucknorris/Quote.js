import { db } from "../../firebaseConfig"
import { addDoc, doc, getDoc, getDocs, collection, query, setDoc, where} from "firebase/firestore";
import { useEffect, useState } from "react";

const Quote = ({quote}) => {

    const [vote, setVote] =useState(0);
    // const docRef = doc(db, "votes", "xLNByuipSF-Ib2rNmuk3PQ");
    // getDoc(docRef).then((data) => console.log(data.data().id));
    useEffect(() => {
            const docRef = doc(db, "votes", quote.id);
            getDoc(docRef).then((data) => setVote(data.data().votes))
        }, [quote.id])

    useEffect(() => {} , [vote])

    const updateVote = () => {
        setDoc(doc(db, "votes", quote.id), {
            id: quote.id,
            votes: vote,
          });
    }

    const upvoting = () => {
        setVote( vote + 1);
        updateVote();
    }

    const downvoting = () => {
        if (vote !== 0) {
            setVote( vote - 1); 
            updateVote();
        }
        return;
    }

    return (
        <>
            <h3> {quote.value} </h3>
            <h5> Votes: {vote} </h5>
            <h5 onClick={() => upvoting()} > + </h5>
            <h5 onClick={() => downvoting()} > - </h5>
            
        </>
    )
}

export default Quote;