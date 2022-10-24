import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Product = () => {
    const router = useRouter();
    const {id} = router.query;
    const [product, setProduct] = useState('')
    const [isLoading, setLoading] = useState(false)

     useEffect(() => {
        if(router.isReady) {
            setLoading(true)
            fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data)
                setLoading(false)
            })}
    }, [router.isReady, id]);

    if (isLoading) return <p> Loading... </p>
    if (!product) return <p> No profile data </p>

    return (
    <> 
        <Image src={product.image} alt='product image' width={500} height={500} />
        <h1> {product.title} </h1>
        <h5> Description: {product.description} </h5>
        <h5>Price: {product.price} </h5>
        <h5>Reviews: {product.rating.count} Score: {product.rating.rate}</h5>
    </>
    )
}

export default Product;