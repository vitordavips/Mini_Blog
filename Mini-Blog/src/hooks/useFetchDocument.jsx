// hook de resgate de dados

import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where, collection, QuerySnapshot } from "firebase/firestore";

export const useFetchDocuments = (docColletion, search = null, uid = null) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    //deal with memory leak
    const [canceled, setCancelled] = useState(false);

    useEffect(() => {
        async function loadData(){
            setLoading(true)

            const collectionRef = await collection(db, docColletion)

            try{
                let q;

                //busca
                //dashboard

                q = await query(collectionRef, orderBy("createdAt", "desc"))

                // função que vai mapear os docs do firebase
                await onSnapshot(q, (QuerySnapshot) => {

                    setDocuments(
                        QuerySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                });

                setLoading(false)

            } catch(error){
                console.log(error);
                setError(error.message);

                setLoading(false)
            }
        }

        loadData();
    }, [docColletion, search, uid, canceled])

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return documents, loading, error;
};