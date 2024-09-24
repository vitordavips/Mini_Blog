import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";

export const useFetchDocuments = (docColletion, search = null, uid = null) => {
  const [documents, setDocuments] = useState([]); // Inicialize com array vazio
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // Deal with memory leak
  const [canceled, setCancelled] = useState(false);

  useEffect(() => {
    const loadData = async () =>{
      if (canceled) return; // Se estiver cancelado, não faça nada

      setLoading(true);
      const collectionRef = collection(db, docColletion);

      try {
        let q;
        
        if(search){
          q = await query(collectionRef, where("tags", "array-contains", search), orderBy("createdAt", "desc"))
        } else{
          q = await query(collectionRef, orderBy("createdAt", "desc"));
        }

        // Função que mapeia os docs do Firestore
        const unsub = onSnapshot(q, (QuerySnapshot) => {
          if (!canceled) {
            const docs = QuerySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setDocuments(docs);
            setLoading(false);
          }
        }, (error) => {
          if (!canceled) {
            console.log(error);
            setError(error.message);
            setLoading(false);
          }
        });

        // Limpa a subscrição para evitar vazamento de memória
        return () => unsub();

      } catch (error) {
        if (!canceled) {
          console.log(error);
          setError(error.message);
          setLoading(false);
        }
      }
    };

    loadData();

  }, [docColletion, canceled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};

