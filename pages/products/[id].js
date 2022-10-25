import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Home.module.css'

export async function getStaticPaths() {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();
    const paths = products.map((product) => ({
        params: { id: product.id.toString() },
    }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    // the params comes from getStaticPath
    const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
    const product = await res.json();
    return { props: { product } }
}

const Product = ({product}) => {
    const router = useRouter();
    const {id} = router.query;

    //-------------old fetch data:--------------
    // const [product, setProduct] = useState('')
    // const [isLoading, setLoading] = useState(false)

    //  useEffect(() => {
    //     if(router.isReady) {
    //         setLoading(true)
    //         fetch(`https://fakestoreapi.com/products/${id}`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setProduct(data)
    //             setLoading(false)
    //         })}
    // }, [router.isReady, id]);

    // if (isLoading) return <p> Loading... </p>
    // if (!product) return <p> No profile data </p>

    return (
    <> 
        <Image src={product.image} alt='product image' width={500} height={500} />
        <h1> {product.title} </h1>
        <h5> Description: {product.description} </h5>
        <h5>Price: {product.price} </h5>
        <h5>Reviews: {product.rating.count} Score: {product.rating.rate}</h5>
        <Link href={"/products"}>
          <a className={styles.category}> Back </a>
        </Link>
    </>
    )
}

export default Product;