import axios from "axios";
import { useEffect, useState } from "react"
import HistoryItem from "./HistoryItem";
import type { HistoryItem as HistoryItemType } from "../../types/history.interface";




const HistoryList = () => {
    const [history, setHistory] = useState<HistoryItemType[]>([]);
    
    useEffect(() => {
        const fetchHistory = async () => {
            const response = await axios.get('http://localhost:8000/api/history');
            setHistory(response.data);
        }
        fetchHistory();
    }, [])
    

    return (
    <div className="flex flex-col">
        <h2 className="text-left text-lg font-bold mb-2">Recent</h2>
        {history.map((item) => <HistoryItem key={item.id} history={item} />)}
    </div>
  )
}

export default HistoryList