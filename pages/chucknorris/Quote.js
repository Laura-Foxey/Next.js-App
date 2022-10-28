import { db, auth } from "../../firebaseConfig"
import { addDoc, doc, getDoc, getDocs, collection, query, setDoc, where} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';


const Quote = ({quote}) => {
    const [user, loading] = useAuthState(auth);
    const [vote, setVote] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    //fetch comments from db and store in state
    const getDocuments = useMemo (() => {
        const q = query(collection(db, "comments"), where("id", "==", quote.id));
        getDocs(q).then((data) => data.forEach((d) => 
            setComments(prev =>[...prev, {comment: d.data().comment, user: d.data().user, createdAt: d.data().createdAt, id: quote.id, clicked: false}])))
    }, [quote.id]);

    //fetch votes from db and store in state
    useEffect(() => {
            const docRef = doc(db, "votes", quote.id);
            getDoc(docRef).then((data) => setVote(data.data().votes));
        }, [vote])

    //update votes from db
    const updateVote = () => {
        setDoc(doc(db, "votes", quote.id), {
            id: quote.id,
            votes: vote,
          });
    }

    //change vote and updates to db
    const upvoting = () => {
        setVote(prev => prev + 1);
        updateVote();
    }

    const downvoting = () => {
        if (vote > 0) {
            setVote(prev => prev - 1); 
            updateVote();
        }
        return;
    }

    //comment form
    const submitComment = async (event) => {
        event.preventDefault();
        alert(`This is your comment: ${event.target.comment.value}`);
        //add comment to DB
        addDoc(collection(db, "comments"), {comment: event.target.comment.value, user: user.email, createdAt: Date.now(), id: quote.id})
        //temporarily stores it in local state until refresh when it fetches from DB
        setComments(prev =>[...prev, {comment: event.target.comment.value, user: user.email, createdAt: Date.now(), id: quote.id, clicked:false}])
        setNewComment('');
      };


    //sets clicked to true on user click to expand comment details
    const itemDetails = (id) => {
        setComments(
          comments.map((com) =>
            com.createdAt === id ? { ...com, clicked: !com.clicked } : com
          )
        );
    };
    
    if (loading) return (<p> Please stand by. </p>)
    
    return (
        <>
            <h3> {quote.value} </h3>
            <h5> Votes: {vote} </h5>
            <h5 onClick={() => upvoting()} > + </h5>
            <h5 onClick={() => downvoting()} > - </h5>
            <form onSubmit={submitComment}>
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
                <p>People who commented: {comments.length}</p> 
                <ul>{comments.map((com) => <li key={com.createdAt+com.user} onClick={() => itemDetails(com.createdAt)}> 
                    {com.user} at {new Date(com.createdAt).getDate()}.{new Date(com.createdAt).getMonth() + 1}.
                    {new Date(com.createdAt).getFullYear()} {new Date(com.createdAt).getHours()}:{new Date(com.createdAt).getMinutes()}
                    {com.clicked && <div> {com.comment} </div>}
                </li>)}
                </ul>
            </div>
        </>
    )
}

export default Quote;