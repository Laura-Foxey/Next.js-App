import { useState, useEffect } from "react"
import Image from 'next/image';
import Link from 'next/link';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [category, setCategory] =useState([]);
    const [isLoading, setLoading] = useState(false)
    const [filter, setFilter] = useState('');

    useEffect(() => {
        setLoading(true)
        fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((data) => {
          setProducts(data)
        })
        fetch('https://fakestoreapi.com/products/categories')
        .then((res) => res.json())
        .then((data) => {
          setCategory(data)
          setLoading(false)
        })
    }, []);

    console.log(filter);
    

    if (isLoading) return <p>Loading...</p>
    if (!products) return <p>No profile data</p>
    return (
        <>
        <ul>
            <li onClick={() => setFilter('')}> All products </li>
            {category.map(cat => 
                <li key={cat} onClick={() => setFilter(cat)}>
                    {cat}
                </li>)}
        </ul>
        <h1> List of products: </h1>
        <ul>
            {products
            .filter(list => {
                if (filter === "") {
                return list; 
                } else if (list.category.includes(filter)){
                    return list; 
                }
            })
            .map(product =>
            <li key={product.id}> 
            <Link href={`/products/${product.id}`}>
                <a>
                    <h3>{product.title}</h3>
                    <Image src={product.image} alt='product image' width={500} height={500} />
                </a>
            </Link>
            </li>)}
            </ul>
        </>
    )
}

export default Products;