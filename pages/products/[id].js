import { useRouter } from 'next/router'

const Product = () => {
    const router = useRouter();
    const {id} = router.query;
    return (
    <p> 
        This is product id: {id} 
    </p>
    )
}

export default Product;