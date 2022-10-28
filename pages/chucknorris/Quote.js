import { db } from "../../firebaseConfig"
import { addDoc, doc, getDoc, getDocs, collection, query, setDoc, where} from "firebase/firestore";
import { useEffect, useState } from "react";
import {auth} from "./../../firebaseConfig";
import { useAuthState } from 'react-firebase-hooks/auth';


const Quote = ({quote}) => {

    const [user, loading] = useAuthState(auth);
    const [vote, setVote] =useState(0);
    const [comments, setComments] = useState([{comment: '', user: '', id: ''}]);
    const [newComment, setNewComment] = useState('');

    // const docRef = doc(db, "votes", "xLNByuipSF-Ib2rNmuk3PQ");
    // getDoc(docRef).then((data) => console.log(data.data().id));


    useEffect(() => {
        const setArrayCondition = (d) => 
        {
            if (comments[0].comment === '' && comments[0].user === '') { setComments([{comment: d.data().comment, user: d.data().user, id: quote.id}])}
            else {setComments(prev =>[...prev, {comment: d.data().comment, user: d.data().user, id: quote.id}])}
        }

            const docRef = doc(db, "votes", quote.id);
            getDoc(docRef).then((data) => setVote(data.data().votes));
            const q = query(collection(db, "comments"), where("id", "==", quote.id));
            getDocs(q).then((data) => data.forEach((d) => 
                setArrayCondition(d)))
        }, [quote.id])

    useEffect(() => {} , [vote])

    console.log(comments)

    const updateVote = () => {
        setDoc(doc(db, "votes", quote.id), {
            id: quote.id,
            votes: vote,
          });
    }

    const upvoting = () => {
        setVote(vote = vote + 1);
        updateVote();
    }

    const downvoting = () => {
        if (vote > 0) {
            setVote(vote = vote - 1); 
            updateVote();
        }
        return;
    }

    const submitComment = async (event) => {
        event.preventDefault();
        alert(`So your comment is ${event.target.comment.value}?`);
        setComments(prev =>[...prev, {comment: event.target.comment.value, user: user.email, id: quote.id}])
        setNewComment('');

      };

    return (
        <>
            <h3> {quote.value} </h3>
            <h5> Votes: {vote} </h5>
            <h5 onClick={() => upvoting()} > + </h5>
            <h5 onClick={() => downvoting()} > - </h5>
            <form className="flex flex-col" onSubmit={submitComment}>
            <textarea
                id="comment"
                value={newComment}
                onChange={(e)=>{setNewComment(e.target.value)}}
                type="text"
                required
            />
            <button
                type="submit"
            >
                Add comment
            </button>
            </form>
            <div> 
                <p>People who commented: </p> 
                {/* <ul>{comments.map((com) => <li key={com.comment}>{com.user}</li>)}
                </ul> */}
            </div>
        </>
    )
}

export default Quote;