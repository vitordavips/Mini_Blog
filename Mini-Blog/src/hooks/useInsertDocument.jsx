import { useState, useEffect, useReducer } from "react";
import {db} from '../firebase/config';
// funções do firebase
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialstate = {
    loading: null,
    error: null,
}

const insertReducer = (state, action) => {
    switch(action.type){
        case "LOADING":
            return {loading: true, error: null}
        case "INSERTED_DOC":
            return {loading: false, error: null}
        case "ERROR":
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export const useInsertDocument = (docColletion) => {

    const [response, dispatch] = useReducer(insertReducer, initialstate)

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled) {
            dispatch(action)
        }
    };

    const insertDocument = async(document) => {
        checkCancelBeforeDispatch({
            type: "LOADING",
        });

        try {
            const newDocument = {...document, createdAt: Timestamp.now()}

            const insertDocument = await addDoc(
                collection(db, docColletion),
                newDocument
            )

            checkCancelBeforeDispatch({
                type:"INSERT_DOC",
                payload: insertDocument
            })
        } catch (error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.mesage,
            });
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {insertDocument, response};
};