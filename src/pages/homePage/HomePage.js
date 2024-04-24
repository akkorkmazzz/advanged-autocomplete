import React, { useEffect, useState } from 'react';
import { RickIcon, MortyIcon } from '../../utils/IconsUtils';
import AdvangedAutocomplete from '../../components/advangedAutocomplete/AdvangedAutocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../../redux/reducers/CharactersSlice';
import { motion } from "framer-motion";
import Loading from '../../components/loading/Loading';

import styles from './HomePage.module.scss';

const HomePage = () => {

    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const characters = useSelector(state => state.character);
    const dispatch = useDispatch();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        dispatch(fetchCharacters(page))
    },[])

    useEffect(() => {
        if(characters.data.length > 0 || (characters.data.results && characters.data.results.length > 0 && !characters.loading) ){
            setData([...data, ...characters.data.results])
        }
    },[characters])

    const getContent = (loading) => {
        if(loading){
            return(
                <Loading />
            )
        }else{
            return(
                <>
                    <div className={styles.titleContainer}>
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ ease: "easeOut", duration: 2 }}
                        >
                            <RickIcon />
                        </motion.div>
                        <h1>And</h1>
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ ease: "easeOut", duration: 2 }}
                        >
                            <MortyIcon />
                        </motion.div>
                    </div>
                    <div>
                        <AdvangedAutocomplete data={data} page={page} setPage={setPage} />
                    </div>
                </>
            )
        }

    }
  
    return (
        <div className={styles.container}>
            <div className={styles.mainContainer}>
                {getContent(loading)}
            </div>
        </div>
    )
}

export default HomePage