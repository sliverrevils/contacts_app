import { useEffect, useState } from "react";


export function useShowMessage(text:string,delay:number):{state:string}{
    const [state,setState]=useState(text);

    useEffect(()=>{
        const timeout=setTimeout(()=>setState(text),delay);
        return()=>clearTimeout(timeout);
    },[text,delay])

    return {state}
    
}