import axios from "axios";
export async function createPayment(data: {plan_id:number, user_id:number} , token:string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/payment`,{method: "POST", headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        } } );
        const data = await response.json();
        console.log(data);
        
        return data;
    }
    catch (error:any) {
        console.error("Error fetching stores:", error.response);
        return {};
    }
}